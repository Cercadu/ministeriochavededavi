import { getStore } from "@netlify/blobs";

const JSON_HEADERS = { "content-type": "application/json" };
const BLOB_KEY = "database.json";

function getValidPasswords() {
  return (process.env.ADMIN_PASSWORDS || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
}

function isAuthorized(req) {
  const password = req.headers.get("x-admin-password");
  if (!password) return false;
  return getValidPasswords().includes(password);
}

export default async (req) => {
  const store = getStore({ name: "ministerio-db", consistency: "strong" });
  const url = new URL(req.url);

  // Checagem rápida de senha, usada pelo login do painel admin
  if (req.method === "GET" && url.searchParams.get("verify") === "1") {
    if (!isAuthorized(req)) {
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: JSON_HEADERS });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  if (req.method === "GET") {
    let result = await store.getWithMetadata(BLOB_KEY, { type: "json" });

    // Primeira execução: ainda não existe nada no Blob, usa o database.json publicado no site como semente
    if (!result || !result.data) {
      try {
        const seedResponse = await fetch(`${url.origin}/database.json`);
        if (seedResponse.ok) {
          const seedData = await seedResponse.json();
          const updatedAt = String(Date.now());
          await store.setJSON(BLOB_KEY, seedData, { metadata: { updatedAt } });
          result = { data: seedData, metadata: { updatedAt } };
        }
      } catch (err) {
        console.error("Falha ao semear o banco de dados a partir do database.json estático.", err);
      }
    }

    const updatedAt = result?.metadata?.updatedAt || "";
    return new Response(JSON.stringify(result?.data || null), {
      headers: { ...JSON_HEADERS, "X-Updated-At": updatedAt },
    });
  }

  if (req.method === "POST") {
    if (!isAuthorized(req)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: JSON_HEADERS });
    }

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400, headers: JSON_HEADERS });
    }

    if (!body || !Array.isArray(body.musicas) || !Array.isArray(body.missas)) {
      return new Response(JSON.stringify({ error: "invalid_schema" }), { status: 400, headers: JSON_HEADERS });
    }

    // Controle de concorrência: só aceita a gravação se o dispositivo partiu da versão mais recente do servidor.
    // Evita que um aparelho com dados antigos em cache sobrescreva alterações mais novas feitas por outra pessoa.
    const expectedUpdatedAt = req.headers.get("x-expected-updated-at") || "";
    const current = await store.getWithMetadata(BLOB_KEY, { type: "json" });
    const currentUpdatedAt = current?.metadata?.updatedAt || "";

    if (currentUpdatedAt && currentUpdatedAt !== expectedUpdatedAt) {
      return new Response(
        JSON.stringify({ error: "conflict", serverData: current.data, updatedAt: currentUpdatedAt }),
        { status: 409, headers: JSON_HEADERS }
      );
    }

    const newUpdatedAt = String(Date.now());
    await store.setJSON(BLOB_KEY, body, { metadata: { updatedAt: newUpdatedAt } });
    return new Response(JSON.stringify({ ok: true, updatedAt: newUpdatedAt }), { headers: JSON_HEADERS });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/database" };
