import { getStore } from "@netlify/blobs";

const JSON_HEADERS = { "content-type": "application/json" };
const BLOB_KEY = "database.json";

function isAuthorized(req) {
  const password = req.headers.get("x-admin-password");
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
}

export default async (req) => {
  const store = getStore("ministerio-db");
  const url = new URL(req.url);

  // Checagem rápida de senha, usada pelo login do painel admin
  if (req.method === "GET" && url.searchParams.get("verify") === "1") {
    if (!isAuthorized(req)) {
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: JSON_HEADERS });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  if (req.method === "GET") {
    let data = await store.get(BLOB_KEY, { type: "json" });

    // Primeira execução: ainda não existe nada no Blob, usa o database.json publicado no site como semente
    if (!data) {
      try {
        const seedResponse = await fetch(`${url.origin}/database.json`);
        if (seedResponse.ok) {
          data = await seedResponse.json();
          await store.setJSON(BLOB_KEY, data);
        }
      } catch (err) {
        console.error("Falha ao semear o banco de dados a partir do database.json estático.", err);
      }
    }

    return new Response(JSON.stringify(data || null), { headers: JSON_HEADERS });
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

    await store.setJSON(BLOB_KEY, body);
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/database" };
