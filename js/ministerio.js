// ============================================================================
// SISTEMA DE BANCO DE DADOS LOCAL E CONTROLES DINÂMICOS - CHAVE DE DAVI
// ============================================================================

// Escala cromática de notas para transposição
const notasSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flatsMap = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

// Regex global para detectar acordes individuais
const chordTokenRegex = /^[A-G][#b]?(?:m|maj|min|sus|dim|aug|add|alt|\+)?\d*(?:b\d|#\d)?(?:\/[A-G][#b]?)?$/i;

// Roteiros Padrão por Tipo de Celebração
const DEFAULT_ROTEIRO_MISSA = [
    { id: "sec-ritos-iniciais", tipo: "titulo-secao", texto: "Ritos Iniciais" },
    { id: "lit-sinal-cruz", tipo: "liturgia", texto: "Sacerdote: Em nome do Pai, do Filho e do Espírito Santo. Povo: Amém." },
    { id: "mus-entrada", tipo: "momento-musica", momento: "Entrada", icone: "fa-door-open" },
    { id: "lit-ato-penitencial", tipo: "liturgia", texto: "Ato Penitencial: Confesso a Deus todo-poderoso... Senhor, tende piedade de nós." },
    { id: "mus-ato-penitencial", tipo: "momento-musica", momento: "Ato Penitencial", icone: "fa-hands-praying" },
    { id: "mus-gloria", tipo: "momento-musica", momento: "Glória", icone: "fa-hands" },
    { id: "sec-liturgia-palavra", tipo: "titulo-secao", texto: "Liturgia da Palavra" },
    { id: "link-cancaonova", tipo: "link-cancaonova" },
    { id: "rd-1-leitura", tipo: "leitura-texto", leituraLabel: "1ª Leitura", campoLeitura: "primeira" },
    { id: "mus-salmo", tipo: "momento-musica", momento: "Salmo", icone: "fa-book-open" },
    { id: "rd-2-leitura", tipo: "leitura-texto", leituraLabel: "2ª Leitura", campoLeitura: "segunda" },
    { id: "mus-aclamacao", tipo: "momento-musica", momento: "Aclamação", icone: "fa-music" },
    { id: "rd-evangelho", tipo: "leitura-texto", leituraLabel: "Evangelho", campoLeitura: "evangelho" },
    { id: "lit-homilia", tipo: "liturgia", texto: "Homilia e Oração dos Fiéis (Povo: Senhor, escutai a nossa prece)." },
    { id: "sec-liturgia-eucaristica", tipo: "titulo-secao", texto: "Liturgia Eucarística" },
    { id: "mus-ofertorio", tipo: "momento-musica", momento: "Ofertório", icone: "fa-gift" },
    { id: "lit-oracao-oferendas", tipo: "liturgia", texto: "Oração sobre as Oferendas. Prefácio Eucarístico." },
    { id: "mus-santo", tipo: "momento-musica", momento: "Santo", icone: "fa-church" },
    { id: "lit-consagracao", tipo: "liturgia", texto: "Consagração do Pão e do Vinho. Eis o mistério da fé!" },
    { id: "sec-rito-comunhao", tipo: "titulo-secao", texto: "Rito da Comunhão" },
    { id: "mus-pai-nosso", tipo: "momento-musica", momento: "Pai Nosso", icone: "fa-pray" },
    { id: "mus-cordeiro", tipo: "momento-musica", momento: "Cordeiro", icone: "fa-dove" },
    { id: "mus-comunhao", tipo: "momento-musica", momento: "Comunhão", icone: "fa-wine-glass" },
    { id: "mus-pos-comunhao", tipo: "momento-musica", momento: "Pós-Comunhão", icone: "fa-heart" },
    { id: "mus-adoracao", tipo: "momento-musica", momento: "Adoração", icone: "fa-sun" },
    { id: "sec-ritos-finais", tipo: "titulo-secao", texto: "Ritos Finais" },
    { id: "lit-bencao", tipo: "liturgia", texto: "Oração pós-comunhão e bênção solene de envio." },
    { id: "mus-final", tipo: "momento-musica", momento: "Final", icone: "fa-flag" }
];

const DEFAULT_ROTEIRO_GRUPO = [
    { id: "sec-acolhida", tipo: "titulo-secao", texto: "Acolhida & Louvor Inicial" },
    { id: "mus-acolhida", tipo: "momento-musica", momento: "Acolhida", icone: "fa-door-open" },
    { id: "mus-louvor", tipo: "momento-musica", momento: "Louvor", icone: "fa-music" },
    { id: "sec-oracao", tipo: "titulo-secao", texto: "Oração & Clamor ao Espírito Santo" },
    { id: "lit-clamor", tipo: "liturgia", texto: "Oração espontânea pedindo o batismo no Espírito Santo." },
    { id: "mus-espirito-santo", tipo: "momento-musica", momento: "Invocação do Espírito Santo", icone: "fa-fire" },
    { id: "sec-pregacao", tipo: "titulo-secao", texto: "Pregação da Palavra" },
    { id: "lit-tema", tipo: "liturgia", texto: "Partilha da Palavra de Deus e Pregação do dia." },
    { id: "mus-pregacao", tipo: "momento-musica", momento: "Pregação", icone: "fa-book" },
    { id: "sec-adoracao", tipo: "titulo-secao", texto: "Adoração & Clamor" },
    { id: "mus-adoracao", tipo: "momento-musica", momento: "Clamor / Adoração", icone: "fa-sun" },
    { id: "sec-final", tipo: "titulo-secao", texto: "Agradecimentos & Encerramento" },
    { id: "mus-final", tipo: "momento-musica", momento: "Final / Agradecimento", icone: "fa-heart" }
];

const DEFAULT_ROTEIRO_EVENTO = [
    { id: "sec-abertura", tipo: "titulo-secao", texto: "Abertura do Evento" },
    { id: "mus-abertura", tipo: "momento-musica", momento: "Abertura", icone: "fa-door-open" },
    { id: "mus-louvor", tipo: "momento-musica", momento: "Louvor", icone: "fa-music" },
    { id: "sec-pregacao", tipo: "titulo-secao", texto: "Momento de Formação / Pregação" },
    { id: "mus-pregacao", tipo: "momento-musica", momento: "Pregação", icone: "fa-book" },
    { id: "sec-adoracao", tipo: "titulo-secao", texto: "Momento de Oração / Adoração" },
    { id: "mus-adoracao", tipo: "momento-musica", momento: "Adoração", icone: "fa-sun" },
    { id: "sec-encerramento", tipo: "titulo-secao", texto: "Encerramento & Envio" },
    { id: "mus-encerramento", tipo: "momento-musica", momento: "Encerramento", icone: "fa-flag" }
];

// Músicas pré-carregadas (com acordes posicionados ACIMA das letras)
const DEFAULT_SONGS = [
    {
        id: "corpus-entrada",
        titulo: "Povo de Reis Assembleia Santa",
        tomPadrao: "E",
        tags: ["Entrada"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
E   A   B   E   A   B

[Refrão]
E                 A        B
Assembleia santa, povo de reis,
E                 B      A        E
Império dos sacerdotes, povo de Deus,
E             B        A         B       E
Cantai ao vosso Senhor! Cantai ao vosso Senhor!

[Estrofe 1]
C#m                         F#m           B
1. Nós vos louvamos, ó Cristo, Estrela da Manhã,
A                     F#m             B
Nós vos bendizemos, caminho da salvação.
C#m                         F#m            B
Nós vos glorificamos, ó pão da nossa vida,
A                     F#m              B
Nós vos adoramos, defensor dos pecadores.

[Estrofe 2]
C#m                        F#m             B
2. Nós vos cantamos, mediador da nova aliança,
A                        F#m               B
Nós vos louvamos, sacerdote da eterna aliança.
C#m                         F#m            B
Nós vos bendizemos, ó luz das nossas almas,
A                     F#m               B
Nós vos adoramos, pão vivo descido do céu.`
    },
    {
        id: "corpus-kyrie",
        titulo: "Senhor, Verdadeiro Corpo (Marco Frisina)",
        tomPadrao: "Em",
        tags: ["Ato Penitencial"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
Em   B7   Em   Am   Em   B7   Em

[Estrofe 1]
Em          B7      Em      Am          B7
Senhor, verdadeiro corpo nascido da Virgem Maria,
Am          Em      C                 B7
Tende piedade de nós, tende piedade de nós.
Em     Am  D   G   C      Am  B7  Em
Kyrie eleison, Kyrie eleison.

[Estrofe 2]
Em          B7         Em       Am          B7
Ó Cristo, verdadeiro pão que alimenta a nossa alma,
Am          Em      C                 B7
Tende piedade de nós, tende piedade de nós.
Em       Am  D   G   C       Am  B7  Em
Christe eleison, Christe eleison.

[Estrofe 3]
Em            B7      Em       Am           B7
Senhor, fonte de amor que nos reúne no vosso altar,
Am          Em      C                 B7
Tende piedade de nós, tende piedade de nós.
Em     Am  D   G   C      Am  B7  Em
Kyrie eleison, Kyrie eleison.`
    },
    {
        id: "corpus-gloria",
        titulo: "Glória Na Dança da Vida",
        tomPadrao: "A",
        tags: ["Glória"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
A   D   E   A   D   E

[Refrão]
A               D         E
Glória, glória a Deus nas alturas!
A                D          E
E paz na terra aos homens por Ele amados!
A               D         E
Glória, glória a Deus nas alturas!
A                D          E
E paz na terra aos homens por Ele amados!

[Estrofe 1]
F#m                        C#m             D
1. Senhor Deus, Rei dos céus, Deus Pai todo-poderoso.
                A        D              E
Nós vos louvamos, nós vos bendizemos.
F#m             C#m                   D
Nós vos adoramos, nós vos glorificamos,
                A               D        E
Nós vos damos graças por vossa imensa glória.

[Estrofe 2]
F#m                C#m             D
2. Senhor Jesus Cristo, Filho unigênito.
                  A            D         E
Senhor Deus, Cordeiro de Deus, Filho de Deus Pai.
F#m                 C#m                          D        A
Vós que tirais o pecado do mundo, tende piedade de nós.
F#m                 C#m                         D        E
Vós que tirais o pecado do mundo, acolhei a nossa súplica.`
    },
    {
        id: "corpus-oferendas",
        titulo: "A Vós Senhor Apresentamos Estes Dons",
        tomPadrao: "G",
        tags: ["Ofertório"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
G   D   C   D   G

[Estrofe 1]
G                 D            G
A vós, Senhor, apresentamos estes dons,
G             C          D        G
O pão e o vinho que vão se transformar
C             D          G   D/F#   Em
No corpo e no sangue de Jesus,
C             D         G
Nosso Salvador e Redentor.

[Estrofe 2]
Em                         Bm
1. Fruto do trabalho e do suor do homem,
C             D          G
Este pão da vida se tornará.
Em                Bm
Vinho da alegria, bebida de salvação,
C             A7         D
Para o vosso povo se alimentar.

[Estrofe 3]
Em                       Bm
2. Recebei, Senhor, a nossa própria vida,
C             D             G
Tudo o que temos e o que somos nós.
Em                  Bm
Em vossa presença, oferta agradecida,
C             A7            D
Elevamos juntos nossa voz.`
    },
    {
        id: "corpus-santo",
        titulo: "Santo Na Dança da Vida (Shalom)",
        tomPadrao: "Em",
        tags: ["Santo"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
F#m7(b5)   Em   D   G/B   C   G/B   G   Am   Am/G   F#m7(b5)   B4   B

[Estrofe 1]
Em  D   C   G  D/F#  Em    F   C/E     D4  D#dim
San---to, San-------to, Santo é o Senhor Deus do universo!
Em  D   C   G  D/F#  Em    F   C/E     D4  D
San---to, San-------to, Santo é o Senhor Deus do universo!

[Refrão]
Am7            Bm7                  C
Céus e terra proclamam vossa glória,
F#m7(b5)          B7
Hosana nas alturas!
Am7                 Bm7                 C
Bendito o que vem em nome do Senhor,
F#m7(b5)          B7
Hosana nas alturas!

[Estrofe 2]
F#m  E   D   A  E/G#  F#m   G   D/F#    E4  Fdim
San----to, San-------to, Santo é o Senhor Deus do universo!
F#m  E   D   A  E/G#  F#m   G   D/F#    E4  E
San----to, San-------to, Santo é o Senhor Deus do universo!`
    },
    {
        id: "corpus-painosso",
        titulo: "Pai Nosso (Tradicional)",
        tomPadrao: "G",
        tags: ["Pai Nosso"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `G                  C         G
Pai nosso que estais no céu,
      C                     D
Santificado seja o vosso nome.
G                      Em
Venha a nós o vosso reino,
      C              D
Seja feita a vossa vontade,
          C             G
Assim na terra como no céu.

G                        C         G
O pão nosso de cada dia nos dai hoje.
       C               D
Perdoai as nossas ofensas,
           G               Em              C
Assim como nós perdoamos a quem nos tem ofendido.
             G                  C
E não nos deixeis cair em tentação,
    G      D     G
Mas livrai-nos do mal.`
    },
    {
        id: "corpus-cordeiro",
        titulo: "Cordeiro Amor e Adoração",
        tomPadrao: "F",
        tags: ["Cordeiro"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
F   Bb   C   F

[Estrofe 1]
F           C       Dm          Am          Bb
Cordeiro de Deus, que tirais o pecado do mundo,
          F          Gm                 C
Tende piedade de nós, tende piedade de nós.
F           C       Dm          Am          Bb
Cordeiro de Deus, que tirais o pecado do mundo,
          F          Gm                 C
Tende piedade de nós, tende piedade de nós.

[Estrofe 2]
F           C       Dm          Am          Bb
Cordeiro de Deus, que tirais o pecado do mundo,
            C    F          Dm
Dai-nos a paz, dai-nos a paz,
Gm          C        F
Dai-nos a vossa paz.`
    },
    {
        id: "corpus-comunhao",
        titulo: "Verbum Panis",
        tomPadrao: "Dm",
        tags: ["Comunhão"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
Dm   Bb   Gm   A4   A

[Estrofe 1]
Dm            Bb                   Gm            A4            A
Desde o princípio, antes mesmo que a terra começasse a existir,
Dm            Bb               Gm      A4   A
O verbo estava junto a Deus,
Dm            Bb               Gm            A4            A
E por meio d'Ele tudo foi criado, toda a vida n'Ele se fez,
Dm                  Bb               Gm       A
O verbo se encarnou e habitou entre nós.

[Refrão]
F        C        Bb     C        Dm     C        Bb
Verbum panis factum est, Verbum panis laudamus te.
F        C        Bb     C        Dm     C  frater  Bb
Verbum panis factum est, Verbum panis   Jesu.

[Estrofe 2]
Dm            Bb             Gm             C              Dm
1. Antes da morte e ressurreição, Tu te entregaste na comunhão,
            Bb            Gm                   C            Dm
Partindo o pão aos teus irmãos, alimentando o nosso coração.
            Bb             Gm             C            Dm
Tu te tornaste o pão da vida, corpo e sangue de amor,
            Bb            Gm                   A4      A
Sublime entrega e doação, presença viva do Senhor.`
    },
    {
        id: "corpus-poscomunhao",
        titulo: "Sublime Silêncio",
        tomPadrao: "G",
        tags: ["Pós-Comunhão"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
G   C   G   C   D

[Estrofe 1]
G           C         G         D
Sublime silêncio, Deus presente aqui,
C           G         Am          D      G
Tua voz suave em meu peito a falar.
G           C           G         D
Na hóstia consagrada, mistério de amor,
C           G         D         G
Minha alma exulta ao te encontrar.

[Estrofe 2]
Em                 Bm                     C
1. Silêncio que fala, que acalma a tempestade,
G            D/F#       Em
Que traz ao meu peito a verdade.
           Bm                     C
Aqui me esvazio de tudo o que sou,
    Am                  D
E deixo que reines, meu Deus e Senhor.`
    },
    {
        id: "corpus-adoracao",
        titulo: "Diante do Rei",
        tomPadrao: "E",
        tags: ["Adoração"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Intro]
E   A   B   E   A   B

[Estrofe 1]
E                  B/D#              C#m         G#m
Senhor, diante de Ti, venho me prostrar,
A             E/G#        F#m            B
Diante do Rei dos reis e Senhor dos senhores.
E                  B/D#              C#m         G#m
Tua presença nos cura, nos enche de paz,
A             E/G#         F#m       B
E nos faz desejar estar perto de Ti.

[Refrão]
E             B/D#           C#m         G#m
Diante do Rei dos reis, eu me prostrarei.
A             E/G#         F#m         B
Em adoração, meu louvor entregarei.
E          B/D#          C#m         G#m
Santo, Santo é o Senhor, Deus do universo,
A          B        A         E
Toda a terra proclama o Seu amor.`
    },
    {
        id: "corpus-final",
        titulo: "Glória a Jesus Na Hóstia Santa",
        tomPadrao: "G",
        tags: ["Final"],
        linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        letra: `[Estrofe]
G          D       Em       Bm
Glória a Jesus na Hóstia santa,
C          G         A7         D
Que se consagra sobre o altar!
G          D       Em       Bm
E a nossa fé nos acompanha,
C          D       G
Para Jesus glorificar!

[Refrão]
G          C       D        G
O Céu e a Terra cantam louvores,
Em          Am           D
Ao Deus de amor na Comunhão!
G          C       D        G
Glória a Jesus na Hóstia Santa,
C          D         G
Nossa espiritual refeição!`
    },
    {
        id: "prev-festa-cordeiro",
        titulo: "Festa do Cordeiro",
        tomPadrao: "C",
        tags: ["Entrada"],
        letra: `[Intro]
D   D/C   G/B   A   D   D/C   D/F#   G   A   G/B   A

[Estrofe]
D                  D/C
Cantai, cantai ao Senhor Deus
G/B                 A4           A
Cantai, sua glória entre as nações
G
Entrai com alegria, dons e oferendas
A4                  A
Nos átrios do Senhor.

[Refrão]
D                  G            D
Reina o Senhor, eterno é o Seu Amor
D/F#        Em           D/F#            A
Vestido de glória e majestade está aqui.
D                  Em   D/F#   G   A  Bm
Reina o Senhor, eterno é o Seu Amor
      Em          D/F#           A4   A
Sua beleza tudo recria, tudo refaz.`
    },
    {
        id: "prev-kyrie-jmj",
        titulo: "Kyrie Eleison - JMJ Rio 2013",
        tomPadrao: "Bm",
        tags: ["Ato Penitencial"],
        letra: `[Intro]
Bm7   G7M   Bm7   G7M

[Estrofe]
Bm7         A       G7M
Senhor, que viestes salvar
        Bm7         A/C#    F#4   F#
Os corações arrependidos.

[Refrão]
D   D4  D  A/C#   F#7/A#  F#7  Bm7   E4  E  A
Kyrie eleison, eleison, eleison.`
    }
];

// Missas com ROTEIROS e LEITURAS completas
const DEFAULT_MASSES = [
    {
        id: "mass-corpus-christi",
        data: "2026-06-04",
        tipo: "missa",
        titulo: "Solenidade de Corpus Christi",
        local: "Paróquia Chave de Davi",
        linkPlaylist: "https://www.youtube.com/playlist?list=PL35747585",
        leituras: {
            primeira: "Primeira Leitura (Dt 8,2-3.14b-16a)\n\nLeitura do Livro do Deuteronômio.\n\nMoisés falou ao povo, dizendo: 2 Lembra-te de todo o caminho por onde o Senhor teu Deus te conduziu, esses quarenta anos, no deserto, para te humilhar e te pôr à prova, para saber o que tinhas no teu coração, e para ver se observarias ou não seus mandamentos.\n3 Ele te humilhou, fazendo-te passar fome e alimentando-te com o maná que nem tu nem teus pais conhecíeis, para te mostrar que nem só de pão vive o homem, mas de toda a palavra que sai da boca do Senhor.\n14b Não te esqueças do Senhor teu Deus que te fez sair do Egito, da casa da escravidão, 15 e que foi teu guia no vasto e terrível deserto, onde havia serpentes abrasadoras, escorpiões, e uma terra árida e sem água nenhuma.\nFoi ele que fez jorrar água para ti da pedra duríssima, 16a e te alimentou no deserto com maná, que teus pais não conheciam.\n\n- Palavra do Senhor.\n- Graças a Deus.",
            salmo: "Responsório Sl 147(147B),12-13.14-15.19-20 (R. 12)\n\nR. Glorifica o Senhor, Jerusalém; celebra teu Deus, ó Sião!\n\n- Glorifica o Senhor, Jerusalém! Ó Sião, canta louvores ao teu Deus! Pois reforçou com segurança as tuas portas, e os teus filhos em teu seio abençoou.\n\n- A paz em teus limites garantiu e te dá como alimento a flor do trigo. Ele envia suas ordens para a terra, e a palavra que ele diz corre veloz.\n\n- Anuncia a Jacó sua palavra, seus preceitos e suas leis a Israel. Nenhum povo recebeu tanto carinho, a nenhum outro revelou os seus preceitos.",
            segunda: "Segunda Leitura (1Cor 10,16-17)\n\nLeitura da Primeira Carta de São Paulo aos Coríntios.\n\nIrmãos: 16 O cálice da bênção, o cálice que abençoamos, não é comunhão com o sangue de Cristo? E o pão que partimos, não é comunhão com o corpo de Cristo?\n17 Porque há um só pão, nós todos somos um só corpo, pois todos participamos desse único pão.\n\n- Palavra do Senhor.\n- Graças a Deus.",
            evangelho: "Evangelho (Jo 6,51-58)\n\n- Aleluia, Aleluia, Aleluia.\n- Eu sou o pão vivo descido do céu; quem deste pão come, sempre há de viver!\n\nProclamação do Evangelho de Jesus Cristo segundo João.\n- Glória a vós, Senhor.\n\nNaquele tempo: disse Jesus às multidões dos judeus: 51 'Eu sou o pão vivo descido do céu. Quem comer deste pão viverá eternamente. E o pão que eu darei é a minha carne dada para a vida do mundo'.\n52 Os judeus discutiam entre si, dizendo: 'Como é que ele pode dar a sua carne a comer?'\n53 Então Jesus disse: 'Em verdade, em verdade vos digo: se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis a vida em vós.\n54 Quem come a minha carne e bebe o meu sangue tem a vida eterna, e eu o ressuscitarei no último dia.\n55 Porque a minha carne é verdadeira comida, e o meu sangue, verdadeira bebida.\n56 Quem come a minha carne e bebe o meu sangue permanece em mim e eu nele.\n57 Como o Pai, que vive, me enviou, e eu vivo por causa do Pai, assim aquele que me recebe como alimento viverá por causa de mim.\n58 Este é o pão que desceu do céu. Não é como aquele que os vossos pais comeram. Eles morreram. Aquele que come este pão viverá para sempre'.\n\n— Palavra da Salvação.\n— Glória a vós, Senhor."
        },
        musicas: [
            { momento: "Entrada", musicaId: "corpus-entrada", tomMissa: "E", cantor: "Marina (Solo)" },
            { momento: "Ato Penitencial", musicaId: "corpus-kyrie", tomMissa: "Em", cantor: "Lucas (Solo)" },
            { momento: "Glória", musicaId: "corpus-gloria", tomMissa: "A", cantor: "Todos" },
            { momento: "Salmo", musicaId: "corpus-painosso", tomMissa: "G", cantor: "Ana (Salmista)", observacoes: "Cantar o Salmo 115 adaptado" },
            { momento: "Aclamação", musicaId: "corpus-entrada", tomMissa: "E", cantor: "Lucas" },
            { momento: "Ofertório", musicaId: "corpus-oferendas", tomMissa: "G", cantor: "Cadu (Solo)" },
            { momento: "Santo", musicaId: "corpus-santo", tomMissa: "Em", cantor: "Todos" },
            { momento: "Pai Nosso", musicaId: "corpus-painosso", tomMissa: "G", cantor: "Todos" },
            { momento: "Cordeiro", musicaId: "corpus-cordeiro", tomMissa: "F", cantor: "Davi e Coro" },
            { momento: "Comunhão", musicaId: "corpus-comunhao", tomMissa: "Dm", cantor: "Marina e Lucas" },
            { momento: "Pós-Comunhão", musicaId: "corpus-poscomunhao", tomMissa: "G", cantor: "Todos" },
            { momento: "Adoração", musicaId: "corpus-adoracao", tomMissa: "E", cantor: "Marina (Solo)" },
            { momento: "Final", musicaId: "corpus-final", tomMissa: "G", cantor: "Todos (Final Festivo)" }
        ],
        observacoes: "Procissão solene com o Santíssimo Sacramento pelas ruas logo após a Comunhão. Conduzir os cantos de adoração com muito recolhimento e alternar com orações espontâneas.",
        bannerUrl: "img/banner.jpg"
    }
];

// ============================================================================
// SISTEMA DE GERENCIAMENTO DE ESTADO E INICIALIZAÇÃO
// ============================================================================

const DB_VERSION = '1.4';

let db = {
    version: DB_VERSION,
    musicas: [],
    missas: []
};

// Carrega o banco de dados do localStorage ou inicia com os dados padrão
async function initDatabase() {
    const raw = localStorage.getItem('ministerio_db');
    if (raw) {
        try {
            db = JSON.parse(raw);
            upgradeSchema();
            if (db.version !== DB_VERSION) {
                console.log("Banco de dados desatualizado localmente. Carregando padrões...");
                restoreDefaults();
            }
        } catch (e) {
            console.error("Erro ao carregar o banco local. Restaurando padrão.", e);
            restoreDefaults();
        }
    } else {
        restoreDefaults();
    }

    // Inicializa a agenda
    selectedDate = getTodayLocalDateString();
    updateTodayDateTop();
    
    const datePicker = document.getElementById('agenda-date-picker');
    if (datePicker) {
        datePicker.value = selectedDate;
    }
    
    const dateObj = new Date();
    const currentMonth = dateObj.getMonth();
    const monthSelect = document.getElementById('agenda-month-select');
    if (monthSelect) {
        monthSelect.value = currentMonth.toString();
    }
    
    // Popula o dropdown de eventos e configura os eventos do dia
    populateEventDropdown(currentMonth.toString());
    updateEventsForSelectedDate();

    // Tenta buscar a liturgia diária de hoje da API (coloca no cache e renderiza)
    try {
        dailyLiturgyData = await fetchLiturgyForDate(selectedDate);
        updateMainBannerColor();
        if (!activeMassId && currentTab === 'missas') {
            renderMissasTab();
        }
    } catch (err) {
        console.error("Erro ao carregar liturgia diária de hoje da API:", err);
    }

    // Sincroniza com o servidor central (Netlify Function + Blobs).
    // Se houver alterações locais pendentes de um admin, envia primeiro para não perdê-las,
    // e só então adota os dados do servidor como fonte da verdade.
    if (navigator.onLine) {
        const pendingPassword = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (isPendingSync() && pendingPassword) {
            await pushDatabaseToServer(pendingPassword);
        }
        await pullDatabaseFromServer();
    }
    updateSyncStatusUI();
}

// Restaura os dados padrão
function restoreDefaults() {
    db.musicas = JSON.parse(JSON.stringify(DEFAULT_SONGS));
    db.missas = JSON.parse(JSON.stringify(DEFAULT_MASSES));
    db.version = DB_VERSION;
    upgradeSchema();
    saveDatabase();
}

// Salva o banco de dados no localStorage e agenda a sincronização com o servidor central
function saveDatabase() {
    localStorage.setItem('ministerio_db', JSON.stringify(db));
    queueSyncToServer();
}

const ADMIN_SESSION_KEY = 'ministerio_admin_pass';
const PENDING_SYNC_KEY = 'ministerio_pending_sync';
let syncDebounceTimer = null;
let isSyncingNow = false;

// Garante que o usuário digitou a senha de administrador antes de abrir o Painel Geral
async function ensureAdminAccess() {
    if (sessionStorage.getItem(ADMIN_SESSION_KEY)) {
        return true;
    }

    const password = prompt("Digite a senha de administrador para acessar o Painel Geral:");
    if (!password) {
        return false;
    }

    if (!navigator.onLine) {
        // Sem internet: aceita a senha para uso offline. Ela só será validada de fato
        // quando a conexão voltar e a sincronização for tentada.
        sessionStorage.setItem(ADMIN_SESSION_KEY, password);
        alert("Sem conexão agora. Você pode editar normalmente; as alterações ficarão pendentes até a internet voltar.");
        updateSyncStatusUI();
        return true;
    }

    try {
        const response = await fetch(`/api/database?verify=1`, {
            headers: { 'X-Admin-Password': password }
        });
        if (response.ok) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, password);
            updateSyncStatusUI();
            return true;
        }
        alert("Senha incorreta.");
        return false;
    } catch (err) {
        alert("Não foi possível verificar a senha agora (sem conexão com o servidor).");
        return false;
    }
}

// Encerra a sessão de administrador neste navegador
function logoutAdmin() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    alert("Sessão de administrador encerrada.");
    switchTab('missas');
}

function isPendingSync() {
    return localStorage.getItem(PENDING_SYNC_KEY) === '1';
}

function markPendingSync() {
    localStorage.setItem(PENDING_SYNC_KEY, '1');
    updateSyncStatusUI();
}

function clearPendingSync() {
    localStorage.removeItem(PENDING_SYNC_KEY);
    updateSyncStatusUI();
}

// Atualiza o indicador visual de sincronização no Painel Geral
function updateSyncStatusUI() {
    const badge = document.getElementById('admin-mode-badge');
    if (badge) {
        badge.classList.toggle('hidden', !sessionStorage.getItem(ADMIN_SESSION_KEY));
    }

    const el = document.getElementById('sync-status-indicator');
    if (!el) return;

    if (!sessionStorage.getItem(ADMIN_SESSION_KEY)) {
        el.innerHTML = '';
        el.className = 'sync-status';
        return;
    }

    if (!navigator.onLine) {
        el.innerHTML = '<i class="fas fa-wifi"></i> Sem internet — trabalhando offline com os dados salvos no aparelho';
        el.className = 'sync-status pending';
    } else if (isPendingSync()) {
        el.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Alterações pendentes para enviar ao servidor';
        el.className = 'sync-status pending';
    } else {
        el.innerHTML = '<i class="fas fa-check-circle"></i> Tudo sincronizado com o servidor';
        el.className = 'sync-status ok';
    }
}

// Agenda o envio do banco de dados para o servidor (com debounce), marcando pendência até confirmar sucesso
function queueSyncToServer() {
    const password = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!password) return; // só administradores autenticados sincronizam com o servidor central

    markPendingSync();
    clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => pushDatabaseToServer(password), 600);
}

// Envia o banco de dados atual para o servidor (Netlify Function + Blobs). Retorna true se teve sucesso.
async function pushDatabaseToServer(password) {
    if (isSyncingNow) return false;
    isSyncingNow = true;
    try {
        const response = await fetch('/api/database', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': password
            },
            body: JSON.stringify(db)
        });

        if (response.status === 401) {
            sessionStorage.removeItem(ADMIN_SESSION_KEY);
            alert("Sessão de administrador expirada ou senha incorreta. Faça login novamente para sincronizar suas alterações.");
            return false;
        }
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        clearPendingSync();
        return true;
    } catch (err) {
        console.warn("Não foi possível sincronizar as alterações com o servidor central. Ficará pendente até a conexão voltar.", err);
        markPendingSync();
        return false;
    } finally {
        isSyncingNow = false;
    }
}

// Busca a versão central do servidor e adota como fonte da verdade,
// a menos que existam alterações locais ainda não enviadas (para não perdê-las)
async function pullDatabaseFromServer() {
    if (isPendingSync()) {
        console.log("Existem alterações locais pendentes de envio; mantendo os dados locais.");
        return false;
    }
    try {
        const response = await fetch('/api/database');
        if (response.ok) {
            const serverDb = await response.json();
            if (serverDb && Array.isArray(serverDb.musicas) && Array.isArray(serverDb.missas)) {
                db = serverDb;
                upgradeSchema();
                localStorage.setItem('ministerio_db', JSON.stringify(db));
                populateEventDropdown(document.getElementById('agenda-month-select')?.value || 'all');
                updateEventsForSelectedDate();
                renderContent();
                return true;
            }
        }
    } catch (err) {
        console.warn("Não foi possível sincronizar com o servidor central. Usando dados locais.", err);
    }
    return false;
}

// Tenta sincronizar automaticamente assim que a internet do aparelho voltar
window.addEventListener('online', async () => {
    const password = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (password && isPendingSync()) {
        await pushDatabaseToServer(password);
    }
    await pullDatabaseFromServer();
    updateSyncStatusUI();
});
window.addEventListener('offline', updateSyncStatusUI);

// Migra/Upgrade no schema do banco de dados para suportar roteiros dinâmicos e novos tipos
function upgradeSchema() {
    if (!db.missas) db.missas = [];
    db.missas.forEach(mass => {
        if (!mass.tipo) {
            mass.tipo = "missa";
        }
        if (!mass.roteiro) {
            if (mass.tipo === "missa") {
                mass.roteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_MISSA));
            } else if (mass.tipo === "grupo") {
                mass.roteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_GRUPO));
            } else {
                mass.roteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_EVENTO));
            }
            
            // Vincular qualquer música que já estava escalada para os cantos padrão
            if (mass.musicas) {
                const defaultMoments = mass.roteiro.filter(i => i.tipo === "momento-musica").map(i => i.momento);
                mass.musicas.forEach(m => {
                    if (!defaultMoments.includes(m.momento)) {
                        mass.roteiro.push({
                            id: "mus-" + Date.now() + Math.random().toString(36).substr(2, 5),
                            tipo: "momento-musica",
                            momento: m.momento,
                            icone: "fa-music"
                        });
                        defaultMoments.push(m.momento);
                    }
                });
            }
        }
    });
}

// ============================================================================
// ENGINE DE TRANSPOSIÇÃO DE ACORDES
// ============================================================================

function transposeNote(note, steps) {
    let normalized = flatsMap[note] || note;
    let idx = notasSharp.indexOf(normalized);
    if (idx === -1) return note;
    let newIdx = (idx + steps) % 12;
    if (newIdx < 0) newIdx += 12;
    return notasSharp[newIdx];
}

function transposeChord(chord, steps) {
    const parts = chord.split('/');
    const baseTransposed = parts[0].replace(/^([A-G][#b]?)/, (match, note) => {
        return transposeNote(note, steps);
    });
    if (parts.length > 1) {
        const bassTransposed = parts[1].replace(/^([A-G][#b]?)/, (match, note) => {
            return transposeNote(note, steps);
        });
        return baseTransposed + '/' + bassTransposed;
    }
    return baseTransposed;
}

// Verifica se uma linha é composta essencialmente por acordes
function isChordLine(line) {
    let trimmed = line.trim();
    if (trimmed === '') return false;
    
    // Indicações de Seção (Intro, Refrão) não são linhas de acorde
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false;
    
    let tokens = trimmed.split(/\s+/);
    let chordCount = 0;
    
    for (let token of tokens) {
        let clean = token.replace(/[\(\)\[\]]/g, '');
        if (chordTokenRegex.test(clean)) {
            chordCount++;
        }
    }
    
    return (chordCount / tokens.length) >= 0.6;
}

// Transpõe os acordes contidos no texto (tanto na linha acima quanto inline entre brackets)
function transposeLyrics(lyrics, steps) {
    if (steps === 0 || !lyrics) return lyrics;
    const lines = lyrics.split('\n');
    const transposedLines = lines.map(line => {
        // Linhas de acordes livres (acima da letra)
        if (isChordLine(line)) {
            const regex = /\b[A-G][#b]?(?:m|maj|min|sus|dim|aug|add|alt|\+)?\d*(?:b\d|#\d)?(?:\/[A-G][#b]?)?\b/g;
            return line.replace(regex, match => transposeChord(match, steps));
        }
        
        // Acordes inline em brackets
        if (line.includes('[') && line.includes(']')) {
            return line.replace(/\[([^\]]+)\]/g, (match, content) => {
                if (/^(Intro|Refra|Ponte|Solo|Primeira|Segunda|Terceira|Final|Part|Chorus|Verse|Bridge|Estrofe|Instrumental)/i.test(content)) {
                    return match;
                }
                const tokens = content.split(/(\s+)/);
                const transposed = tokens.map(t => {
                    if (t.trim() === '') return t;
                    if (/^[A-G]/.test(t)) return transposeChord(t, steps);
                    return t;
                });
                return '[' + transposed.join('') + ']';
            });
        }
        return line;
    });
    return transposedLines.join('\n');
}

// Converte letras com cifras em tags HTML
function formatLyricsHTML(lyrics, hideChords = false) {
    if (!lyrics) return '';
    const lines = lyrics.split('\n');
    const formattedLines = lines.map(line => {
        let trimmed = line.trim();
        
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            let label = trimmed.slice(1, -1);
            return `<div class="section-label">[${label}]</div>`;
        }
        
        if (isChordLine(line)) {
            if (hideChords) return ''; // Oculta a linha inteira de acordes
            const regex = /\b[A-G][#b]?(?:m|maj|min|sus|dim|aug|add|alt|\+)?\d*(?:b\d|#\d)?(?:\/[A-G][#b]?)?\b/g;
            let formattedLine = line.replace(regex, match => {
                return `<span class="chord">${match}</span>`;
            });
            return `<div class="chord-line">${formattedLine}</div>`;
        }
        
        if (line.includes('[') && line.includes(']')) {
            return `<div class="lyric-line">${line.replace(/\[([^\]]+)\]/g, (match, content) => {
                if (/^(Intro|Refra|Ponte|Solo|Primeira|Segunda|Terceira|Final|Part|Chorus|Verse|Bridge|Estrofe|Instrumental)/i.test(content)) {
                    return `<span class="section-label">[${content}]</span>`;
                }
                if (hideChords) return '';
                return `<span class="chord">${content}</span>`;
            })}</div>`;
        }
        
        return `<div class="lyric-line">${line}</div>`;
    });
    
    return formattedLines.filter(l => l !== '').join('');
}

// Calcula a distância de tons na escala cromática
function getSemitoneDistance(origem, destino) {
    const cleanOrigem = (origem || 'C').replace('m', '');
    const cleanDestino = (destino || 'C').replace('m', '');
    const oNorm = flatsMap[cleanOrigem] || cleanOrigem;
    const dNorm = flatsMap[cleanDestino] || cleanDestino;
    const idxOrigem = notasSharp.indexOf(oNorm);
    const idxDestino = notasSharp.indexOf(dNorm);
    
    if (idxOrigem === -1 || idxDestino === -1) return 0;
    
    let diff = idxDestino - idxOrigem;
    if (diff > 5) diff -= 12;
    if (diff < -6) diff += 12;
    return diff;
}

// ============================================================================
// CONFIGURAÇÕES DE ESTADO GLOBAL DO APLICATIVO
// ============================================================================

let currentTab = 'missas';
let currentFilterTag = 'Todos';
let searchQuery = '';
let activeMassId = null;            // Missa selecionada no menu
let activeMassViewMode = 'roteiro'; // 'roteiro' (folheto) ou 'musicas' (apenas lista de repertório)
let dailyLiturgyData = null;       // Dados da liturgia diária da API
let selectedDate = '';             // Data selecionada na agenda
let currentActiveEventsForSelectedDate = []; // Celebrações no dia selecionado

// Mapeamento de Cores Litúrgicas para o Banner
const corLiturgicaMap = {
    'verde': {
        background: 'linear-gradient(135deg, #1b4d22 0%, #2e7d32 100%)',
        text: '#ffffff',
        accent: '#fbc02d'
    },
    'branco': {
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        text: '#210826',
        accent: '#b28900'
    },
    'vermelho': {
        background: 'linear-gradient(135deg, #b71c1c 0%, #e53935 100%)',
        text: '#ffffff',
        accent: '#ffeb3b'
    },
    'roxo': {
        background: 'linear-gradient(135deg, #4A154B 0%, #6B2382 100%)',
        text: '#ffffff',
        accent: '#D4AF37'
    },
    'rosa': {
        background: 'linear-gradient(135deg, #f48fb1 0%, #f06292 100%)',
        text: '#210826',
        accent: '#4A154B'
    },
    'preto': {
        background: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
        text: '#ffffff',
        accent: '#ffb300'
    }
};

function getCorLiturgicaStyle(cor) {
    if (!cor) return corLiturgicaMap['roxo'];
    const normalized = cor.toLowerCase().trim();
    if (normalized.includes('verde')) return corLiturgicaMap['verde'];
    if (normalized.includes('branco')) return corLiturgicaMap['branco'];
    if (normalized.includes('vermelho')) return corLiturgicaMap['vermelho'];
    if (normalized.includes('roxo') || normalized.includes('violeta') || normalized.includes('púrpura')) return corLiturgicaMap['roxo'];
    if (normalized.includes('rosa')) return corLiturgicaMap['rosa'];
    if (normalized.includes('preto')) return corLiturgicaMap['preto'];
    return corLiturgicaMap['roxo']; // default
}

function getTodayLocalDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDayMonthFromDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length < 3) return '';
    return `${parts[2]}-${parts[1]}`;
}

function updateTodayDateTop() {
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const element = document.getElementById('today-date-top');
    if (element) {
        element.innerText = formattedDate;
    }
}

function updateMainBannerColor() {
    const mainBanner = document.querySelector('.main-banner');
    if (!mainBanner) return;
    
    if (dailyLiturgyData) {
        const styleObj = getCorLiturgicaStyle(dailyLiturgyData.cor);
        mainBanner.style.background = styleObj.background;
        mainBanner.style.color = styleObj.text;
        mainBanner.style.borderBottomColor = styleObj.accent;
        
        const h1 = mainBanner.querySelector('h1');
        const h2 = mainBanner.querySelector('h2');
        if (h1) h1.style.color = styleObj.text;
        if (h2) h2.style.color = styleObj.text;
    }
}

let dailyLiturgyCache = {};

async function fetchLiturgyForDate(dateStr) {
    const dayMonth = getDayMonthFromDate(dateStr);
    if (!dayMonth) return null;
    
    if (dailyLiturgyCache[dayMonth]) {
        return dailyLiturgyCache[dayMonth];
    }
    
    try {
        const response = await fetch(`https://liturgia.up.railway.app/v2/${dayMonth}`);
        if (response.ok) {
            const data = await response.json();
            dailyLiturgyCache[dayMonth] = data;
            return data;
        }
    } catch (err) {
        console.error(`Erro ao buscar liturgia para data ${dayMonth}:`, err);
    }
    return null;
}

function changeActiveMass(massId) {
    activeMassId = massId;
    renderContent();
}

function handleAgendaDateChange(e) {
    selectedDate = e.target.value;
    updateEventsForSelectedDate();
    renderContent();
}

function handleAgendaMonthChange(e) {
    populateEventDropdown(e.target.value);
}

function handleAgendaEventChange(e) {
    const massId = e.target.value;
    if (!massId) {
        activeMassId = null;
        updateEventsForSelectedDate();
        renderContent();
        return;
    }
    
    activeMassId = massId;
    const mass = db.missas.find(m => m.id === massId);
    if (mass) {
        selectedDate = mass.data;
        const datePicker = document.getElementById('agenda-date-picker');
        if (datePicker) {
            datePicker.value = selectedDate;
        }
        
        // Sincroniza o seletor de mês
        const dateObj = new Date(mass.data + 'T00:00:00');
        const month = dateObj.getMonth();
        const monthSelect = document.getElementById('agenda-month-select');
        if (monthSelect) {
            monthSelect.value = month.toString();
        }
        
        updateEventsForSelectedDate();
    }
    renderContent();
}

function updateEventsForSelectedDate() {
    currentActiveEventsForSelectedDate = db.missas.filter(m => m.data === selectedDate);
    if (currentActiveEventsForSelectedDate.length > 0) {
        const isCurrentlyActiveOnThisDate = currentActiveEventsForSelectedDate.some(m => m.id === activeMassId);
        if (!isCurrentlyActiveOnThisDate) {
            activeMassId = currentActiveEventsForSelectedDate[0].id;
        }
        const eventSelect = document.getElementById('agenda-event-select');
        if (eventSelect) {
            eventSelect.value = activeMassId;
        }
    } else {
        activeMassId = null;
        const eventSelect = document.getElementById('agenda-event-select');
        if (eventSelect) {
            eventSelect.value = "";
        }
        
        fetchLiturgyForDate(selectedDate).then(data => {
            const picker = document.getElementById('agenda-date-picker');
            if (picker && selectedDate === picker.value) {
                dailyLiturgyData = data;
                updateMainBannerColor();
                if (currentTab === 'missas') {
                    renderMissasTab();
                }
            }
        });
    }
}

function populateEventDropdown(selectedMonth = 'all') {
    const eventSelect = document.getElementById('agenda-event-select');
    if (!eventSelect) return;
    
    eventSelect.innerHTML = '<option value="">Selecione um evento...</option>';
    
    let filteredEvents = db.missas;
    if (selectedMonth !== 'all') {
        const monthIndex = parseInt(selectedMonth);
        filteredEvents = db.missas.filter(m => {
            const dateObj = new Date(m.data + 'T00:00:00');
            return dateObj.getMonth() === monthIndex;
        });
    }
    
    filteredEvents.sort((a, b) => a.data.localeCompare(b.data));
    
    filteredEvents.forEach(m => {
        const dateObj = new Date(m.data + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        eventSelect.innerHTML += `<option value="${m.id}">${formattedDate} - ${m.titulo}</option>`;
    });
    
    if (activeMassId && filteredEvents.some(m => m.id === activeMassId)) {
        eventSelect.value = activeMassId;
    }
}

// Estado do Visualizador de Cifras
let currentSongId = null;
let currentSongMassContextId = null;
let currentSongTranspositionOffset = 0;
let hideChords = false;
let autoScrollInterval = null;
let autoScrollSpeed = 2;
let isStageMode = false;
let fontSizeMultiplier = 1.0;
let wakeLock = null;

// ============================================================================
// CONTROLE DE NAVEGAÇÃO E INICIALIZAÇÃO
// ============================================================================

function setupGlobalEvents() {
    // Configura botões das abas principais
    document.getElementById('tab-btn-missas').addEventListener('click', () => switchTab('missas'));
    document.getElementById('tab-btn-musicas').addEventListener('click', () => switchTab('musicas'));
    document.getElementById('tab-btn-admin').addEventListener('click', async () => {
        const allowed = await ensureAdminAccess();
        if (allowed) switchTab('admin');
    });

    // Configura eventos da Agenda e Calendário
    const datePicker = document.getElementById('agenda-date-picker');
    if (datePicker) {
        datePicker.addEventListener('change', handleAgendaDateChange);
    }
    const monthSelect = document.getElementById('agenda-month-select');
    if (monthSelect) {
        monthSelect.addEventListener('change', handleAgendaMonthChange);
    }
    const eventSelect = document.getElementById('agenda-event-select');
    if (eventSelect) {
        eventSelect.addEventListener('change', handleAgendaEventChange);
    }

    // Configura evento de busca global
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderContent();
        });
    }

    // Configura botões de criar
    document.getElementById('btn-add-missa-topo').addEventListener('click', () => openMassForm());
    document.getElementById('btn-add-musica-topo').addEventListener('click', () => openSongForm());
    document.getElementById('btn-format-cifraclub').addEventListener('click', formatCifraClubPaste);

// Configura botões do visualizador de cifras (Leitor Atualizado)
    document.getElementById('reader-close').addEventListener('click', closeSongReader);
    document.getElementById('btn-reader-prev-song').addEventListener('click', () => navigateReaderSong(-1));
    document.getElementById('btn-reader-next-song').addEventListener('click', () => navigateReaderSong(1));
    document.getElementById('btn-transp-down').addEventListener('click', () => adjustTransposition(-1));
    document.getElementById('btn-transp-up').addEventListener('click', () => adjustTransposition(1));
    document.getElementById('btn-transp-reset').addEventListener('click', () => resetTransposition());
    document.getElementById('btn-use-my-key').addEventListener('click', useMyKey);
    document.getElementById('btn-use-ministry-key').addEventListener('click', useMinistryKey);
    document.getElementById('btn-hide-chords').addEventListener('click', toggleChordsVisibility);
    document.getElementById('btn-font-down').addEventListener('click', () => adjustFontSize(-0.1));
    document.getElementById('btn-font-up').addEventListener('click', () => adjustFontSize(0.1));
    document.getElementById('btn-stage-toggle').addEventListener('click', toggleStageMode);
    document.getElementById('btn-edit-song-from-reader').addEventListener('click', () => {
        if (currentSongId) {
            // Fecha a barra lateral antes de abrir o modal de edição
            document.getElementById('reader-sidebar-menu').classList.add('sidebar-hidden');
            openSongForm(currentSongId);
        }
    });
    
    // Controles do Menu Lateral Hambúrguer
    const sidebarMenu = document.getElementById('reader-sidebar-menu');
    document.getElementById('reader-menu-toggle').addEventListener('click', () => {
        sidebarMenu.classList.remove('sidebar-hidden');
    });
    document.getElementById('reader-sidebar-close').addEventListener('click', () => {
        sidebarMenu.classList.add('sidebar-hidden');
    });
    
    // Auto-scroll
    document.getElementById('btn-scroll-toggle').addEventListener('click', toggleAutoScroll);
    document.getElementById('scroll-speed').addEventListener('input', (e) => {
        autoScrollSpeed = parseFloat(e.target.value);
        if (autoScrollInterval) {
            stopAutoScroll();
            startAutoScroll();
        }
    });
    // Modais e Fechamentos
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.add('hidden'));
        });
    });

    // Submissão de Formulários
    document.getElementById('form-song').addEventListener('submit', handleSongSubmit);
    document.getElementById('form-mass').addEventListener('submit', handleMassSubmit);

    // Backup e Configurações
    document.getElementById('btn-export-db').addEventListener('click', exportDatabase);
    document.getElementById('btn-import-db').addEventListener('click', importDatabase);
    document.getElementById('btn-logout-admin').addEventListener('click', logoutAdmin);
    document.getElementById('btn-sync-now').addEventListener('click', async () => {
        const password = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (!password) {
            alert("Faça login como administrador primeiro.");
            return;
        }
        if (!navigator.onLine) {
            alert("Sem conexão com a internet no momento.");
            return;
        }
        const success = await pushDatabaseToServer(password);
        alert(success ? "Sincronizado com sucesso!" : "Não foi possível sincronizar agora. Vai continuar tentando quando a conexão estiver estável.");
    });
    document.getElementById('btn-download-db').addEventListener('click', downloadDatabase);
    document.getElementById('btn-restore-defaults').addEventListener('click', () => {
        if (confirm("Deseja realmente apagar todas as alterações e restaurar os dados originais?")) {
            restoreDefaults();
            // Reseta a missa selecionada para Corpus Christi
            activeMassId = "mass-corpus-christi";
            alert("Dados originais restaurados com sucesso!");
            renderContent();
        }
    });

    // Configura o seletor de missas
    document.getElementById('select-active-mass').addEventListener('change', (e) => {
        activeMassId = e.target.value;
        renderMissasTab();
    });

    // Botões de alternância de modo (Folheto vs Apenas Músicas vs Liturgia)
    document.getElementById('btn-mode-roteiro').addEventListener('click', () => switchMassViewMode('roteiro'));
    document.getElementById('btn-mode-musicas').addEventListener('click', () => switchMassViewMode('musicas'));
    document.getElementById('btn-mode-liturgia').addEventListener('click', () => switchMassViewMode('liturgia'));
}

function switchTab(tabName) {
    currentTab = tabName;
    renderTabs();
    renderContent();

    // Mostrar ou ocultar elementos conforme a aba ativa
    document.getElementById('btn-add-musica-topo').style.display = tabName === 'musicas' ? 'block' : 'none';

    if (tabName === 'admin') {
        updateSyncStatusUI();
    }
}

function switchMassViewMode(mode) {
    activeMassViewMode = mode;
    document.getElementById('btn-mode-roteiro').classList.toggle('active', mode === 'roteiro');
    document.getElementById('btn-mode-musicas').classList.toggle('active', mode === 'musicas');
    document.getElementById('btn-mode-liturgia').classList.toggle('active', mode === 'liturgia');
    renderMissasTab();
}

function renderTabs() {
    const tabs = ['missas', 'musicas', 'admin'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        if (btn) {
            btn.classList.toggle('active', tab === currentTab);
        }
    });
}

function populateMassDropdown() {
    const select = document.getElementById('select-active-mass');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione para gerenciar...</option>';
    
    if (db.missas.length === 0) {
        select.innerHTML = `<option value="">Nenhuma missa cadastrada</option>`;
        return;
    }

    const sorted = [...db.missas].sort((a, b) => new Date(a.data) - new Date(b.data));
    sorted.forEach(m => {
        const dateObj = new Date(m.data + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${formattedDate} - ${m.titulo}`;
        select.appendChild(opt);
    });

    if (activeMassId) {
        select.value = activeMassId;
    } else {
        select.value = "";
    }
}

function renderContent() {
    document.getElementById('pane-missas').classList.add('hidden');
    document.getElementById('pane-musicas').classList.add('hidden');
    document.getElementById('pane-admin').classList.add('hidden');
    
    updateMainBannerColor();

    if (currentTab === 'missas') {
        document.getElementById('pane-missas').classList.remove('hidden');
        renderMissasTab();
    } else if (currentTab === 'musicas') {
        document.getElementById('pane-musicas').classList.remove('hidden');
        renderMusicasTab();
    } else if (currentTab === 'admin') {
        document.getElementById('pane-admin').classList.remove('hidden');
        populateMassDropdown();
    }
}

// ============================================================================
// ABA: MISSAS (FOLHETO INTEGRADO / APENAS MÚSICAS)
// ============================================================================

function renderDailyLiturgyOnly(container) {
    const dayMonth = getDayMonthFromDate(selectedDate);
    const dayLiturgy = dailyLiturgyCache[dayMonth];
    
    if (!dayLiturgy) {
        container.innerHTML = `
            <div class="empty-state text-center padding-20">
                <i class="fas fa-spinner fa-spin size-40 text-primary margin-bottom-10"></i>
                <p>Buscando Liturgia Diária...</p>
            </div>
        `;
        fetchLiturgyForDate(selectedDate).then(data => {
            const picker = document.getElementById('agenda-date-picker');
            if (picker && selectedDate === picker.value) {
                dailyLiturgyData = data;
                updateMainBannerColor();
                if (currentTab === 'missas') {
                    renderMissasTab();
                }
            }
        });
        return;
    }

    let liturgiaHTML = '';
    
    // 1. Primeira Leitura
    const prim = dayLiturgy.leituras?.primeiraLeitura?.[0];
    if (prim) {
        liturgiaHTML += `
            <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-15" style="border-left: 4px solid var(--primary); background: rgba(74, 21, 75, 0.02);">
                <span class="bold text-primary size-14 block margin-bottom-5 uppercase">
                    <i class="fas fa-scroll"></i> Primeira Leitura (${prim.referencia || ''})
                </span>
                <span class="bold size-13 text-secondary block margin-bottom-10">${prim.titulo || ''}</span>
                <p class="size-13 text-justify line-height-1-6 whitespace-pre-wrap">${prim.texto || ''}</p>
            </div>
        `;
    }

    // 2. Salmo Responsorial
    const sal = dayLiturgy.leituras?.salmo?.[0];
    if (sal) {
        liturgiaHTML += `
            <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-15" style="border-left: 4px solid var(--accent); background: rgba(212, 175, 55, 0.02);">
                <span class="bold text-primary size-14 block margin-bottom-5 uppercase">
                    <i class="fas fa-music"></i> Salmo Responsorial (${sal.referencia || ''})
                </span>
                <p class="size-13 bold text-secondary margin-bottom-10" style="font-style: italic; color: var(--secondary);">Refrão: ${sal.refrao || ''}</p>
                <p class="size-13 text-justify line-height-1-6 whitespace-pre-wrap">${sal.texto || ''}</p>
            </div>
        `;
    }

    // 3. Segunda Leitura (se houver)
    const seg = dayLiturgy.leituras?.segundaLeitura?.[0];
    if (seg) {
        liturgiaHTML += `
            <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-15" style="border-left: 4px solid var(--primary); background: rgba(74, 21, 75, 0.02);">
                <span class="bold text-primary size-14 block margin-bottom-5 uppercase">
                    <i class="fas fa-scroll"></i> Segunda Leitura (${seg.referencia || ''})
                </span>
                <span class="bold size-13 text-secondary block margin-bottom-10">${seg.titulo || ''}</span>
                <p class="size-13 text-justify line-height-1-6 whitespace-pre-wrap">${seg.texto || ''}</p>
            </div>
        `;
    }

    // 4. Evangelho
    const ev = dayLiturgy.leituras?.evangelho?.[0];
    if (ev) {
        liturgiaHTML += `
            <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-15" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.02);">
                <span class="bold text-primary size-14 block margin-bottom-5 uppercase">
                    <i class="fas fa-book-open"></i> Evangelho (${ev.referencia || ''})
                </span>
                <span class="bold size-13 text-secondary block margin-bottom-10">${ev.titulo || ''}</span>
                <p class="size-13 text-justify line-height-1-6 whitespace-pre-wrap">${ev.texto || ''}</p>
            </div>
        `;
    }

    const dateObj = new Date(selectedDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Se houver múltiplas celebrações cadastradas para o mesmo dia, renderiza botões de escolha rápida
    let multiEventSelectorHTML = '';
    if (currentActiveEventsForSelectedDate.length > 1) {
        let buttonsHTML = '';
        currentActiveEventsForSelectedDate.forEach(evt => {
            const isSelected = evt.id === activeMassId;
            buttonsHTML += `
                <button class="btn btn-small ${isSelected ? 'btn-primary' : 'btn-secondary'}" onclick="changeActiveMass('${evt.id}')" style="border-radius: 12px; font-size: 0.8rem; padding: 6px 12px;">
                    ${evt.titulo}
                </button>
            `;
        });
        multiEventSelectorHTML = `
            <div class="flex align-center gap-10 margin-bottom-15 padding-10 bg-light-trans border-radius-8 flex-wrap">
                <span class="size-12 bold text-secondary"><i class="fas fa-list text-gold"></i> Outras Celebrações do Dia:</span>
                <div class="flex gap-5 flex-wrap">${buttonsHTML}</div>
            </div>
        `;
    }

    container.innerHTML = `
        ${multiEventSelectorHTML}
        <div class="mass-card glass-panel">
            <div class="mass-card-header flex flex-between align-center padding-15 border-bottom">
                <div class="flex align-center gap-10">
                    <span class="text-secondary bold uppercase size-12"><i class="fas fa-bible text-gold"></i> Liturgia Diária</span>
                </div>
            </div>
            <div class="mass-card-body padding-20">
                <!-- Detalhes no topo do Roteiro -->
                <div class="mass-card-header-details margin-bottom-15 padding-10 bg-light-trans border-radius-8" style="border-left: 4px solid var(--primary); background: rgba(74, 21, 75, 0.02);">
                    <h2 class="text-primary font-700 size-20">${dayLiturgy.liturgia || "Sem Celebração Cadastrada"}</h2>
                    <div class="flex gap-15 text-secondary size-13 bold margin-top-5">
                        <span><i class="fas fa-calendar-day text-gold"></i> ${formattedDate}</span>
                        <span><i class="fas fa-palette text-gold"></i> Cor: ${dayLiturgy.cor || "Verde"}</span>
                    </div>
                </div>
                
                <div class="pamphlet-container">
                    ${liturgiaHTML || '<p class="gray text-center padding-20">Nenhuma leitura encontrada.</p>'}
                </div>
            </div>
        </div>
    `;
}

function renderMissasTab() {
    const container = document.getElementById('missas-list');
    container.innerHTML = '';

    // Sincroniza os controles da Agenda no HTML para refletir o estado correto
    const datePicker = document.getElementById('agenda-date-picker');
    if (datePicker && datePicker.value !== selectedDate) {
        datePicker.value = selectedDate;
    }
    
    // Atualiza o dropdown de eventos selecionado
    const eventSelect = document.getElementById('agenda-event-select');
    if (eventSelect && activeMassId) {
        eventSelect.value = activeMassId;
    }

    if (!activeMassId) {
        document.getElementById('mass-view-mode-selector').classList.add('hidden');
        renderDailyLiturgyOnly(container);
        return;
    }

    // Se houver activeMassId, garante que o seletor de modo está visível e ativo no botão correspondente
    document.getElementById('mass-view-mode-selector').classList.remove('hidden');
    document.getElementById('btn-mode-roteiro').classList.toggle('active', activeMassViewMode === 'roteiro');
    document.getElementById('btn-mode-musicas').classList.toggle('active', activeMassViewMode === 'musicas');
    document.getElementById('btn-mode-liturgia').classList.toggle('active', activeMassViewMode === 'liturgia');

    if (activeMassViewMode === 'liturgia') {
        renderDailyLiturgyOnly(container);
        return;
    }

    const mass = db.missas.find(m => m.id === activeMassId);
    if (!mass) {
        container.innerHTML = `<p class="text-center pad-20">Celebração não encontrada.</p>`;
        return;
    }

    // Exibe os controles de visualização (Roteiro vs Repertório)
    document.getElementById('mass-view-mode-selector').classList.remove('hidden');

    let playlistHTML = mass.linkPlaylist ? 
        `<a href="${mass.linkPlaylist}" target="_blank" class="btn btn-small btn-secondary youtube-link border-radius-20"><i class="fab fa-youtube text-red"></i> Playlist do Ensaio</a>` : '';

    let observacoesHTML = mass.observacoes ? 
        `<div class="pamphlet-liturgy-prayer padding-10 bg-light-trans border-radius-8 margin-bottom-15 size-13 text-secondary italic font-500" style="border-left: 3px solid var(--accent); background: rgba(212, 175, 55, 0.05);"><i class="fas fa-info-circle"></i> <strong>Observações:</strong> ${mass.observacoes}</div>` : '';

    // Se houver múltiplas celebrações cadastradas para o mesmo dia, renderiza botões de escolha rápida
    let multiEventSelectorHTML = '';
    if (currentActiveEventsForSelectedDate.length > 1) {
        let buttonsHTML = '';
        currentActiveEventsForSelectedDate.forEach(evt => {
            const isSelected = evt.id === activeMassId;
            buttonsHTML += `
                <button class="btn btn-small ${isSelected ? 'btn-primary' : 'btn-secondary'}" onclick="changeActiveMass('${evt.id}')" style="border-radius: 12px; font-size: 0.8rem; padding: 6px 12px;">
                    ${evt.titulo}
                </button>
            `;
        });
        multiEventSelectorHTML = `
            <div class="flex align-center gap-10 margin-bottom-15 padding-10 bg-light-trans border-radius-8 flex-wrap">
                <span class="size-12 bold text-secondary"><i class="fas fa-list text-gold"></i> Outras Celebrações do Dia:</span>
                <div class="flex gap-5 flex-wrap">${buttonsHTML}</div>
            </div>
        `;
    }

    const dateObj = new Date(mass.data + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const innerHeaderHTML = `
        <!-- Detalhes no topo do Roteiro -->
        <div class="mass-card-header-details margin-bottom-15 padding-15 bg-light-trans border-radius-8" style="border-left: 4px solid var(--accent); background: rgba(212, 175, 55, 0.03);">
            <h2 class="text-primary font-700 size-20">${mass.titulo}</h2>
            <div class="flex gap-15 text-secondary size-13 bold margin-top-5">
                <span><i class="fas fa-calendar-day text-gold"></i> ${formattedDate}</span>
                <span><i class="fas fa-map-marker-alt text-gold"></i> ${mass.local}</span>
            </div>
        </div>
    `;

    if (activeMassViewMode === 'musicas') {
        // --- MODO: APENAS MÚSICAS (REPERTÓRIO SIMPLES) ---
        let musicasListHTML = '';
        if (mass.musicas && mass.musicas.length > 0) {
            mass.musicas.forEach((mom, index) => {
                const song = db.musicas.find(s => s.id === mom.musicaId);
                const originalKey = song ? song.tomPadrao : '*';
                const massKey = mom.tomMissa || originalKey;
                const singer = mom.cantor ? `<span class="singer-tag"><i class="fas fa-microphone"></i> ${mom.cantor}</span>` : '';
                const songTitle = song ? song.titulo : 'Música não encontrada';
                const hasYoutube = song && song.linkYoutube ? 
                    `<i class="fab fa-youtube text-red pointer" onclick="event.stopPropagation(); openYoutubePlayer('${song.linkYoutube}')" title="Assistir vídeo de referência" style="margin-left: 5px; cursor: pointer;"></i>` : '';

                musicasListHTML += `
                    <div class="mass-song-item flex flex-between align-center border-bottom-dash padding-10">
                        <div class="song-details flex flex-column">
                            <span class="moment-label uppercase">${mom.momento}</span>
                            <span class="song-link-open text-primary pointer bold flex align-center gap-5" onclick="openSongReader('${mom.musicaId}', '${mass.id}')">
                                ${songTitle} ${hasYoutube}
                            </span>
                            ${singer}
                            ${mom.observacoes ? `<span class="song-obs"><i class="fas fa-info-circle"></i> ${mom.observacoes}</span>` : ''}
                        </div>
                        <div class="song-key-role flex gap-5 align-center">
                            <span class="song-key-badge cursor-help" title="Tom para esta celebração (Original: ${originalKey})">${massKey}</span>
                            <button class="btn btn-small btn-secondary" onclick="openEditSongInMassModal('${mass.id}', ${index})" title="Editar escala/cantor" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px;"><i class="fas fa-edit"></i> Alterar</button>
                            <button class="btn btn-small btn-danger" onclick="removeSongFromMass('${mass.id}', ${index})" title="Remover música" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px; background: #ffebee; color: #c62828;"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                `;
            });
        } else {
            musicasListHTML = '<p class="gray text-center padding-10">Nenhuma música escalada para esta celebração.</p>';
        }

        container.innerHTML = `
            ${multiEventSelectorHTML}
            <div class="mass-card glass-panel">
                <div class="mass-card-header flex flex-between align-center padding-15 border-bottom">
                    <div class="flex align-center gap-10">
                        <span class="text-secondary bold uppercase size-12"><i class="fas fa-music text-gold"></i> Repertório Completo</span>
                    </div>
                    <div class="flex gap-5">
                        <button class="btn btn-small" onclick="openMassForm('${mass.id}')" title="Editar Evento"><i class="fas fa-edit"></i> Editar Info</button>
                        <button class="btn btn-small btn-danger" onclick="deleteMass('${mass.id}')" title="Excluir Evento"><i class="fas fa-trash"></i> Excluir</button>
                    </div>
                </div>
                <div class="mass-card-body padding-15">
                    ${innerHeaderHTML}
                    ${observacoesHTML}
                    <div class="flex flex-between align-center margin-bottom-15 border-bottom padding-bottom-5">
                        <h4 class="text-secondary font-600 uppercase size-13"><i class="fas fa-music"></i> Músicas do Repertório</h4>
                        ${playlistHTML}
                    </div>
                    <div class="mass-songs-container margin-bottom-15">
                        ${musicasListHTML}
                    </div>
                    <div class="flex flex-center">
                        <button class="btn btn-small btn-secondary border-radius-20" onclick="openAddSongToMassModal('${mass.id}')">
                            <i class="fas fa-plus"></i> Vincular Louvor
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        // --- MODO: ROTEIRO DINÂMICO ---
        let roteiroHTML = '';
        if (mass.roteiro && mass.roteiro.length > 0) {
            mass.roteiro.forEach((step, index) => {
                if (step.tipo === "titulo-secao") {
                    roteiroHTML += `
                        <div class="roteiro-drag-item" data-roteiro-step-id="${step.id}">
                        <i class="fas fa-grip-vertical roteiro-drag-handle" title="Arraste para reordenar"></i>
                        <div class="pamphlet-section-title uppercase bold font-700 text-gold margin-top-20 margin-bottom-10 border-bottom padding-bottom-5 size-14 flex flex-between align-center">
                            <span><i class="fas fa-bookmark"></i> ${step.texto}</span>
                            <div class="flex gap-10 no-shrink" style="align-items: center;">
                                <i class="fas fa-arrow-up move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', -1)" title="Subir"></i>
                                <i class="fas fa-arrow-down move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', 1)" title="Descer"></i>
                                <i class="fas fa-pencil-alt edit-roteiro-item text-muted size-12" onclick="editRoteiroItem('${mass.id}', '${step.id}')" title="Editar Título"></i>
                                <i class="fas fa-trash-alt delete-roteiro-item text-red size-12" onclick="deleteRoteiroItem('${mass.id}', '${step.id}')" title="Remover Seção"></i>
                            </div>
                        </div>
                        </div>`;
                }
                else if (step.tipo === "liturgia") {
                    roteiroHTML += `
                        <div class="roteiro-drag-item" data-roteiro-step-id="${step.id}">
                        <i class="fas fa-grip-vertical roteiro-drag-handle" title="Arraste para reordenar"></i>
                        <div class="pamphlet-liturgy-prayer padding-10 bg-light-trans border-radius-8 margin-bottom-10 size-13 text-secondary italic font-500 flex flex-between align-center gap-10">
                            <span class="flex-grow">${step.texto}</span>
                            <div class="flex gap-10 no-shrink" style="align-items: center; flex-shrink: 0;">
                                <i class="fas fa-arrow-up move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', -1)" title="Subir"></i>
                                <i class="fas fa-arrow-down move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', 1)" title="Descer"></i>
                                <i class="fas fa-pencil-alt edit-roteiro-item text-muted size-12" onclick="editRoteiroItem('${mass.id}', '${step.id}')" title="Editar Texto"></i>
                                <i class="fas fa-trash-alt delete-roteiro-item text-red size-12" onclick="deleteRoteiroItem('${mass.id}', '${step.id}')" title="Remover Texto"></i>
                            </div>
                        </div>
                        </div>`;
                }
                else if (step.tipo === "link-cancaonova") {
                    roteiroHTML += `
                        <div class="roteiro-drag-item" data-roteiro-step-id="${step.id}">
                        <i class="fas fa-grip-vertical roteiro-drag-handle" title="Arraste para reordenar"></i>
                        <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-10 flex flex-between align-center flex-wrap gap-10" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.03);">
                            <div class="flex flex-column gap-5 flex-grow" style="min-width: 200px;">
                                <span class="bold text-primary size-13 uppercase"><i class="fas fa-book-bible text-secondary"></i> Liturgia Diária</span>
                                <span class="size-12 text-muted">Acompanhe as leituras completas e orações de hoje diretamente no portal Canção Nova.</span>
                            </div>
                            <div class="flex align-center gap-10">
                                <i class="fas fa-arrow-up move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', -1)" title="Subir"></i>
                                <i class="fas fa-arrow-down move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', 1)" title="Descer"></i>
                                <i class="fas fa-trash-alt delete-roteiro-item text-red size-12" onclick="deleteRoteiroItem('${mass.id}', '${step.id}')" title="Remover Bloco"></i>
                                <a href="https://liturgia.cancaonova.com/pb/" target="_blank" class="btn btn-small btn-secondary border-radius-20 text-secondary" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); text-decoration: none;">
                                    <i class="fas fa-external-link-alt"></i> Canção Nova
                                </a>
                            </div>
                        </div>
                        </div>
                    `;
                }
                else if (step.tipo === "leitura-texto") {
                    // Primeiro tenta o texto salvo manualmente no evento
                    let textoLeitura = mass.leituras?.[step.campoLeitura] || '';
                    let tituloLeitura = '';
                    let referenciaLeitura = '';
                    
                    // Se estiver vazio, tenta pegar da API litúrgica para a data da missa
                    if (!textoLeitura) {
                        const massDateDayMonth = getDayMonthFromDate(mass.data);
                        const apiLiturgy = dailyLiturgyCache[massDateDayMonth];
                        if (apiLiturgy) {
                            const campoMap = {
                                'primeira': apiLiturgy.leituras?.primeiraLeitura?.[0],
                                'segunda': apiLiturgy.leituras?.segundaLeitura?.[0],
                                'evangelho': apiLiturgy.leituras?.evangelho?.[0]
                            };
                            const apiEntry = campoMap[step.campoLeitura];
                            if (apiEntry) {
                                textoLeitura = apiEntry.texto || '';
                                tituloLeitura = apiEntry.titulo || '';
                                referenciaLeitura = apiEntry.referencia || '';
                            }
                        } else if (massDateDayMonth) {
                            // Se não estiver no cache, dispara a busca assíncrona
                            fetchLiturgyForDate(mass.data).then(data => {
                                if (data && currentTab === 'missas' && activeMassId === mass.id) {
                                    renderMissasTab();
                                }
                            });
                        }
                    }

                    const isApiText = !mass.leituras?.[step.campoLeitura] && textoLeitura;
                    const apiBadge = isApiText ? `<span style="font-size: 9px; background: rgba(16,185,129,0.12); color: #10b981; padding: 1px 6px; border-radius: 10px; font-weight: 600; margin-left: 6px; vertical-align: middle;">API</span>` : '';
                    const refSpan = referenciaLeitura ? `<span class="size-11 text-muted" style="font-weight:400;">(${referenciaLeitura})</span> ` : '';
                    const subtitleSpan = tituloLeitura ? `<span class="bold size-12 text-secondary block margin-bottom-8" style="font-style: italic;">${tituloLeitura}</span>` : '';
                    
                    roteiroHTML += `
                        <div class="roteiro-drag-item" data-roteiro-step-id="${step.id}">
                        <i class="fas fa-grip-vertical roteiro-drag-handle" title="Arraste para reordenar"></i>
                        <div class="pamphlet-reading-box glass-panel padding-15 margin-bottom-10" style="${!textoLeitura ? 'border: 1px dashed rgba(107, 35, 130, 0.3); opacity: 0.7;' : ''}">
                            <span class="bold text-primary size-14 block margin-bottom-5 uppercase flex flex-between align-center">
                                <span><i class="fas fa-scroll"></i> ${refSpan}${step.leituraLabel}${apiBadge}</span>
                                <div class="flex gap-10">
                                    <i class="fas fa-arrow-up move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', -1)" title="Subir"></i>
                                    <i class="fas fa-arrow-down move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', 1)" title="Descer"></i>
                                    <i class="fas fa-pencil-alt edit-roteiro-item text-muted size-12" onclick="editRoteiroItem('${mass.id}', '${step.id}')" title="Editar Leitura"></i>
                                </div>
                            </span>
                            ${subtitleSpan}
                            <p class="size-13 text-justify line-height-1-6 whitespace-pre-wrap">${textoLeitura || '<i>Buscando leitura da API...</i>'}</p>
                        </div>
                        </div>
                    `;
                }
                else if (step.tipo === "momento-musica") {
                    const vMusicas = mass.musicas ? mass.musicas.filter(m => m.momento === step.momento) : [];
                    let momentoHTML = '';

                    if (vMusicas.length > 0) {
                        vMusicas.forEach(vMus => {
                            const song = db.musicas.find(s => s.id === vMus.musicaId);
                            const songTitle = song ? song.titulo : 'Sem título';
                            const originalKey = song ? song.tomPadrao : '*';
                            const massKey = vMus.tomMissa || originalKey;
                            const hasYoutube = song && song.linkYoutube ?
                                `<i class="fab fa-youtube text-red pointer" onclick="event.stopPropagation(); openYoutubePlayer('${song.linkYoutube}')" title="Assistir vídeo de referência" style="margin-left: 5px; cursor: pointer;"></i>` : '';
                            const indexInMass = mass.musicas.indexOf(vMus);
                            const singer = vMus.cantor ? `<span class="singer-tag"><i class="fas fa-microphone"></i> ${vMus.cantor}</span>` : '';

                            momentoHTML += `
                                <div class="pamphlet-song-card flex flex-between align-center margin-bottom-10 padding-15 pointer-hover" style="border-left: 4px solid var(--accent); background: rgba(212, 175, 55, 0.05); border-radius: 8px;">
                                    <div class="flex flex-column gap-5 flex-grow" onclick="openSongReader('${vMus.musicaId}', '${mass.id}')">
                                        <span class="moment-label uppercase text-gold bold"><i class="fas ${step.icone || 'fa-music'}"></i> Canto de ${step.momento}</span>
                                        <span class="song-title text-primary bold size-16">${songTitle} ${hasYoutube}</span>
                                        ${singer}
                                        ${vMus.observacoes ? `<span class="song-obs"><i class="fas fa-info-circle"></i> ${vMus.observacoes}</span>` : ''}
                                    </div>
                                    <div class="flex align-center gap-10">
                                        <span class="song-key-badge">${massKey}</span>
                                        <div class="flex gap-5 align-center">
                                            <button class="btn btn-small btn-secondary" onclick="openEditSongInMassModal('${mass.id}', ${indexInMass})" title="Editar escala" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px;"><i class="fas fa-edit"></i> Alterar</button>
                                            <button class="btn btn-small btn-danger" onclick="removeSongFromMass('${mass.id}', ${indexInMass})" title="Remover" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px; background: #ffebee; color: #c62828;"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                    } else {
                        momentoHTML += `
                            <div class="pamphlet-song-empty flex flex-between align-center margin-bottom-10 padding-10 border-radius-8" style="border: 1px dashed rgba(107, 35, 130, 0.2); background: rgba(255,255,255,0.3);">
                                <span class="size-12 uppercase text-muted font-600"><i class="fas fa-minus-circle"></i> Canto de ${step.momento} (Não Escaldo)</span>
                                <div class="flex gap-5 align-center">
                                    <button class="btn btn-small btn-secondary border-radius-20" onclick="openAddSongToMassModal('${mass.id}', '${step.momento}');">
                                        <i class="fas fa-plus"></i> Escalar
                                    </button>
                                </div>
                            </div>
                        `;
                    }

                    roteiroHTML += `
                        <div class="roteiro-drag-item" data-roteiro-step-id="${step.id}">
                        <i class="fas fa-grip-vertical roteiro-drag-handle" title="Arraste para reordenar o momento inteiro"></i>
                        <div class="flex align-center gap-10" style="justify-content: flex-end; margin-bottom: 4px;">
                            <i class="fas fa-arrow-up move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', -1)" title="Subir momento"></i>
                            <i class="fas fa-arrow-down move-roteiro-item text-muted size-12" onclick="moveRoteiroItem('${mass.id}', '${step.id}', 1)" title="Descer momento"></i>
                            <i class="fas fa-trash-alt delete-roteiro-item text-red size-12" onclick="deleteRoteiroItem('${mass.id}', '${step.id}')" title="Remover Momento"></i>
                        </div>
                        ${momentoHTML}
                        </div>
                    `;
                }
            });

            roteiroHTML = `<div class="roteiro-drag-zone">${roteiroHTML}</div>`;

            // Add custom action buttons at the bottom of the roteiro (fora da zona de arrastar)
            roteiroHTML += `
                <div class="flex flex-center gap-10 margin-top-20 flex-wrap" style="justify-content: center; margin-top: 25px; border-top: 1px dashed var(--border-color); padding-top: 15px;">
                    <button class="btn btn-small btn-secondary border-radius-20" onclick="addRoteiroItemModal('${mass.id}')">
                        <i class="fas fa-plus"></i> Adicionar Texto/Seção
                    </button>
                    <button class="btn btn-small btn-secondary border-radius-20" onclick="addCustomMusicMomentModal('${mass.id}')">
                        <i class="fas fa-plus-circle"></i> Adicionar Canto
                    </button>
                </div>
            `;
        } else {
            roteiroHTML = '<p class="gray text-center padding-20">Este roteiro está vazio.</p>';
        }

        container.innerHTML = `
            ${multiEventSelectorHTML}
            <div class="mass-card glass-panel">
                <div class="mass-card-header flex flex-between align-center padding-15 border-bottom">
                    <div class="flex align-center gap-10">
                        <span class="text-secondary bold uppercase size-12"><i class="fas fa-bookmark text-gold"></i> Roteiro da Celebração</span>
                    </div>
                    <div class="flex gap-5">
                        <button class="btn btn-small" onclick="openMassForm('${mass.id}')" title="Editar Evento"><i class="fas fa-edit"></i> Editar Info</button>
                        <button class="btn btn-small btn-danger" onclick="deleteMass('${mass.id}')" title="Excluir Evento"><i class="fas fa-trash"></i> Excluir</button>
                    </div>
                </div>
                <div class="mass-card-body padding-20">
                    ${innerHeaderHTML}
                    ${observacoesHTML}
                    <div class="flex flex-between align-center border-bottom padding-bottom-5 margin-bottom-10">
                        <h4 class="text-primary font-600 uppercase size-13"><i class="fas fa-book-open"></i> Folheto da Celebração</h4>
                        ${playlistHTML}
                    </div>
                    
                    <div class="pamphlet-container">
                        ${roteiroHTML}
                    </div>
                </div>
            </div>
        `;
        setupRoteiroDragAndDrop(mass.id);
    }
}

// Habilita arrastar-e-soltar (mouse e toque) para reordenar os momentos do roteiro
function setupRoteiroDragAndDrop(massId) {
    const zone = document.querySelector('.roteiro-drag-zone');
    if (!zone) return;

    zone.querySelectorAll('.roteiro-drag-handle').forEach(handle => {
        handle.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            const dragEl = handle.closest('.roteiro-drag-item');
            if (!dragEl) return;

            const startOrder = Array.from(zone.querySelectorAll('.roteiro-drag-item')).map(el => el.dataset.roteiroStepId);
            handle.setPointerCapture(e.pointerId);
            dragEl.classList.add('dragging');

            const onMove = (ev) => {
                const afterEl = getRoteiroDragAfterElement(zone, ev.clientY);
                if (afterEl == null) {
                    zone.appendChild(dragEl);
                } else {
                    zone.insertBefore(dragEl, afterEl);
                }
            };

            const onUp = () => {
                handle.releasePointerCapture(e.pointerId);
                handle.removeEventListener('pointermove', onMove);
                handle.removeEventListener('pointerup', onUp);
                dragEl.classList.remove('dragging');

                const newOrder = Array.from(zone.querySelectorAll('.roteiro-drag-item')).map(el => el.dataset.roteiroStepId);
                const changed = newOrder.length === startOrder.length && newOrder.some((id, i) => id !== startOrder[i]);
                if (changed) {
                    finishRoteiroReorder(massId, newOrder);
                }
            };

            handle.addEventListener('pointermove', onMove);
            handle.addEventListener('pointerup', onUp);
        });
    });
}

function getRoteiroDragAfterElement(zone, clientY) {
    const items = [...zone.querySelectorAll('.roteiro-drag-item:not(.dragging)')];
    return items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

// Aplica a nova ordem ao roteiro salvo e pergunta se deve atualizar online agora
function finishRoteiroReorder(massId, newOrderIds) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro) return;

    const stepMap = new Map(mass.roteiro.map(s => [s.id, s]));
    const reordered = newOrderIds.map(id => stepMap.get(id)).filter(Boolean);
    if (reordered.length !== mass.roteiro.length) {
        renderMissasTab();
        return;
    }

    mass.roteiro = reordered;
    localStorage.setItem('ministerio_db', JSON.stringify(db));

    const password = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (password && navigator.onLine && confirm("Ordem atualizada! Deseja atualizar online agora para todos verem?")) {
        pushDatabaseToServer(password).then(success => {
            if (!success) alert("Não foi possível enviar agora. Vai continuar tentando quando a conexão estiver estável.");
        });
    } else {
        markPendingSync();
    }

    renderMissasTab();
}

function renderMusicasTab() {
    const listContainer = document.getElementById('musicas-list');
    listContainer.innerHTML = '';
    
    renderTagFilters();

    const filteredSongs = db.musicas.filter(song => {
        const matchesQuery = song.titulo.toLowerCase().includes(searchQuery) || 
                             song.letra.toLowerCase().includes(searchQuery);
        const matchesTag = currentFilterTag === 'Todos' || song.tags.includes(currentFilterTag);
        return matchesQuery && matchesTag;
    }).sort((a, b) => a.titulo.localeCompare(b.titulo));

    if (filteredSongs.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state text-center padding-20">
                <i class="fas fa-music size-40 gray margin-bottom-10"></i>
                <p>Nenhuma música cadastrada ou encontrada com esses filtros.</p>
            </div>
        `;
        return;
    }

    filteredSongs.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card glass-panel flex flex-between align-center padding-15 margin-bottom-10 pointer-hover';
        
        const tagsBadge = song.tags.map(t => `<span class="tag-badge uppercase size-10">${t}</span>`).join(' ');
        const hasYoutube = song.linkYoutube ? `<i class="fab fa-youtube text-red" title="Vídeo de referência"></i>` : '';

        songCard.innerHTML = `
            <div class="song-card-info flex flex-column gap-5 flex-grow" onclick="openSongReader('${song.id}')">
                <span class="song-card-title text-primary bold size-16 flex align-center gap-10">${song.titulo} ${hasYoutube}</span>
                <div class="flex align-center gap-10 flex-wrap">
                    <span class="song-card-key uppercase size-12 font-700 text-gold bg-dark-trans padding-horizontal-8 border-radius-20">${song.tomPadrao}</span>
                    <div class="song-card-tags flex gap-5">${tagsBadge}</div>
                </div>
            </div>
            <div class="song-card-actions flex gap-5">
                <button class="btn-icon" onclick="openSongForm('${song.id}')" title="Editar música"><i class="fas fa-edit"></i></button>
                <button class="btn-icon text-red" onclick="deleteSong('${song.id}')" title="Excluir música"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        
        listContainer.appendChild(songCard);
    });
}

function renderTagFilters() {
    const tags = ['Todos', 'Entrada', 'Ato Penitencial', 'Glória', 'Salmo', 'Aclamação', 'Ofertório', 'Santo', 'Pai Nosso', 'Cordeiro', 'Comunhão', 'Pós-Comunhão', 'Adoração', 'Final'];
    const container = document.getElementById('musicas-tag-filters');
    container.innerHTML = '';
    
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = `btn btn-small filter-btn border-radius-20 ${currentFilterTag === tag ? 'active' : 'btn-secondary'}`;
        btn.textContent = tag;
        btn.onclick = () => {
            currentFilterTag = tag;
            renderMusicasTab();
        };
        container.appendChild(btn);
    });
}

// ============================================================================
// VISUALIZADOR DE CIFRAS INTERATIVO (LEITOR DE CIFRAS)
// ============================================================================

function openSongReader(songId, massContextId = null) {
    currentSongId = songId;
    currentSongMassContextId = massContextId;
    currentSongTranspositionOffset = 0;
    hideChords = false;
    fontSizeMultiplier = 1.0;
    
    const song = db.musicas.find(s => s.id === songId);
    if (!song) {
        alert("Música não encontrada!");
        return;
    }

    let currentKey = song.tomPadrao;
    if (massContextId) {
        const mass = db.missas.find(m => m.id === massContextId);
        if (mass) {
            const mom = mass.musicas.find(m => m.musicaId === songId);
            if (mom && mom.tomMissa && mom.tomMissa !== song.tomPadrao) {
                currentSongTranspositionOffset = getSemitoneDistance(song.tomPadrao, mom.tomMissa);
                currentKey = mom.tomMissa;
            }
        }
    }

    document.getElementById('reader-song-title').textContent = song.titulo;
    document.getElementById('reader-song-orig-key').textContent = song.tomPadrao;
    document.getElementById('reader-song-key-current').textContent = currentKey;

    const capoContainer = document.getElementById('reader-scale-info-container');
    if (capoContainer) {
        capoContainer.innerHTML = song.capotraste
            ? `<span class="size-12 bold text-gold"><i class="fas fa-guitar"></i> Capotraste na ${song.capotraste}ª casa</span>`
            : '';
    }

    const ytContainer = document.getElementById('reader-youtube-container');
    if (song.linkYoutube) {
        ytContainer.innerHTML = `<button onclick="openYoutubePlayer('${song.linkYoutube}')" class="btn btn-small btn-secondary border-radius-20" style="cursor: pointer;"><i class="fab fa-youtube text-red"></i> Assistir no YouTube</button>`;
        ytContainer.classList.remove('hidden');
    } else {
        ytContainer.classList.add('hidden');
    }

    renderReaderLyrics();
    updateReaderNavButtons();
    updateMyKeyToggle();
    document.getElementById('song-reader-overlay').classList.remove('hidden');
    requestWakeLock();
}

// Mostra/oculta e sincroniza o toggle "Ministério" / "Meu Tom" conforme a música atual
function updateMyKeyToggle() {
    const group = document.getElementById('my-key-toggle-group');
    const ministryBtn = document.getElementById('btn-use-ministry-key');
    const myKeyBtn = document.getElementById('btn-use-my-key');
    if (!group || !ministryBtn || !myKeyBtn) return;

    const song = db.musicas.find(s => s.id === currentSongId);
    if (!song || !song.tomPessoal) {
        group.classList.add('hidden');
        return;
    }

    group.classList.remove('hidden');
    ministryBtn.textContent = `Ministério (${song.tomPadrao})`;
    myKeyBtn.textContent = `Meu Tom (${song.tomPessoal})`;

    const currentChord = transposeChord(song.tomPadrao, currentSongTranspositionOffset);
    const isMyKey = currentChord === song.tomPessoal;
    myKeyBtn.classList.toggle('active', isMyKey);
    ministryBtn.classList.toggle('active', !isMyKey);
}

// Alterna a transposição atual para o "Meu Tom" cadastrado na música
function useMyKey() {
    const song = db.musicas.find(s => s.id === currentSongId);
    if (!song || !song.tomPessoal) return;

    currentSongTranspositionOffset = getSemitoneDistance(song.tomPadrao, song.tomPessoal);
    renderReaderLyrics();
    persistCurrentTranspositionToMass();
    updateMyKeyToggle();
}

// Alterna a transposição atual de volta para o tom oficial do ministério (Tom Padrão)
function useMinistryKey() {
    currentSongTranspositionOffset = 0;
    renderReaderLyrics();
    persistCurrentTranspositionToMass();
    updateMyKeyToggle();
}

// Retorna a sequência de IDs de música na ordem em que aparecem no roteiro da missa
function getMassSongSequence(massId) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro || !mass.musicas) return [];

    const sequence = [];
    mass.roteiro.forEach(step => {
        if (step.tipo === 'momento-musica') {
            mass.musicas
                .filter(m => m.momento === step.momento)
                .forEach(m => sequence.push(m.musicaId));
        }
    });
    return sequence;
}

// Mostra/oculta os botões de Anterior/Próxima conforme a posição da música atual no roteiro
function updateReaderNavButtons() {
    const prevBtn = document.getElementById('btn-reader-prev-song');
    const nextBtn = document.getElementById('btn-reader-next-song');
    if (!prevBtn || !nextBtn) return;

    if (!currentSongMassContextId) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        return;
    }

    const sequence = getMassSongSequence(currentSongMassContextId);
    const index = sequence.indexOf(currentSongId);

    prevBtn.classList.toggle('hidden', index <= 0);
    nextBtn.classList.toggle('hidden', index === -1 || index >= sequence.length - 1);
}

// Navega para a música anterior/próxima do roteiro sem sair do leitor
function navigateReaderSong(direction) {
    if (!currentSongMassContextId) return;
    const sequence = getMassSongSequence(currentSongMassContextId);
    const index = sequence.indexOf(currentSongId);
    if (index === -1) return;

    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sequence.length) return;

    stopAutoScroll();
    openSongReader(sequence[targetIndex], currentSongMassContextId);
}

function renderReaderLyrics() {
    const song = db.musicas.find(s => s.id === currentSongId);
    if (!song) return;

    const transposed = transposeLyrics(song.letra, currentSongTranspositionOffset);
    const formattedHTML = formatLyricsHTML(transposed, hideChords);
    
    const lyricsBox = document.getElementById('reader-lyrics-box');
    lyricsBox.innerHTML = formattedHTML;
    lyricsBox.style.fontSize = `calc(var(--font-size) * ${fontSizeMultiplier})`;
    
    const currentKeyDisplay = document.getElementById('reader-song-key-current');
    currentKeyDisplay.textContent = transposeChord(song.tomPadrao, currentSongTranspositionOffset);
}

// Salva o tom transposto atual como o tom desta música para a celebração em andamento (se houver contexto de missa)
function persistCurrentTranspositionToMass() {
    if (!currentSongMassContextId) return;
    const mass = db.missas.find(m => m.id === currentSongMassContextId);
    if (!mass || !mass.musicas) return;
    const mom = mass.musicas.find(m => m.musicaId === currentSongId);
    if (!mom) return;
    const song = db.musicas.find(s => s.id === currentSongId);
    if (!song) return;

    mom.tomMissa = transposeChord(song.tomPadrao, currentSongTranspositionOffset);
    saveDatabase();
}

function adjustTransposition(steps) {
    currentSongTranspositionOffset += steps;
    renderReaderLyrics();
    persistCurrentTranspositionToMass();
    updateMyKeyToggle();
}

function resetTransposition() {
    currentSongTranspositionOffset = 0;
    renderReaderLyrics();
    updateMyKeyToggle();
}

function toggleChordsVisibility() {
    hideChords = !hideChords;
    const btn = document.getElementById('btn-hide-chords');
    if (hideChords) {
        btn.classList.add('active');
        btn.innerHTML = `<i class="fas fa-eye-slash"></i> Ocultando Cifras`;
    } else {
        btn.classList.remove('active');
        btn.innerHTML = `<i class="fas fa-eye"></i> Exibindo Cifras`;
    }
    renderReaderLyrics();
}

function adjustFontSize(delta) {
    fontSizeMultiplier = Math.max(0.6, Math.min(2.5, fontSizeMultiplier + delta));
    renderReaderLyrics();
}

function toggleStageMode() {
    isStageMode = !isStageMode;
    const overlay = document.getElementById('song-reader-overlay');
    const btn = document.getElementById('btn-stage-toggle');
    
    if (isStageMode) {
        overlay.classList.add('stage-mode');
        btn.classList.add('active');
        btn.innerHTML = `<i class="fas fa-moon"></i> Modo Palco: Ativo`;
    } else {
        overlay.classList.remove('stage-mode');
        btn.classList.remove('active');
        btn.innerHTML = `<i class="fas fa-mobile-alt"></i> Modo Palco`;
    }
}

function closeSongReader() {
    if (autoScrollInterval && !confirm("A rolagem automática está ativa. Tem certeza que deseja fechar o leitor?")) {
        return;
    }

    document.getElementById('song-reader-overlay').classList.add('hidden');
    document.getElementById('reader-sidebar-menu').classList.add('sidebar-hidden'); // <-- Adicione esta linha
    stopAutoScroll();
    releaseWakeLock();
    
    if (isStageMode) {
        toggleStageMode();
    }
}

// ============================================================================
// LOGICA DE ROLAGEM AUTOMÁTICA
// ============================================================================

function toggleAutoScroll() {
    if (autoScrollInterval) {
        stopAutoScroll();
    } else {
        startAutoScroll();
        const btn = document.getElementById('btn-scroll-toggle');
        btn.classList.add('active');
        btn.innerHTML = `<i class="fas fa-pause"></i>`;
        btn.title = 'Pausar Rolagem';
    }
}

function startAutoScroll() {
    const scrollable = document.getElementById('reader-lyrics-scrollable');
    if (!scrollable) return;
    
    autoScrollInterval = setInterval(() => {
        scrollable.scrollTop += autoScrollSpeed;
    }, 50);
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    const btn = document.getElementById('btn-scroll-toggle');
    if (btn) {
        btn.classList.remove('active');
        btn.innerHTML = `<i class="fas fa-play"></i>`;
        btn.title = 'Rolar Cifra';
    }
}

// ============================================================================
// CONTROLE DE TELA ATIVA (WAKE LOCK API)
// ============================================================================

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log("Wake Lock ativado!");
        } catch (err) {
            console.warn("Erro ao solicitar bloqueio de tela ativa:", err);
        }
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
            console.log("Wake Lock desativado!");
        });
    }
}

// ============================================================================
// CADASTRO/EDIÇÃO DE MÚSICA (MODAL)
// ============================================================================

function openSongForm(songId = null, returnToVincMassId = null) {
    const modal = document.getElementById('modal-song-editor');
    const formTitle = document.getElementById('song-form-title');
    
    document.getElementById('form-song-id').value = '';
    document.getElementById('song-title').value = '';
    document.getElementById('song-key').value = 'C';
    document.getElementById('song-key-personal').value = '';
    document.getElementById('song-capo').value = '';
    document.getElementById('song-youtube').value = '';
    document.getElementById('song-lyrics').value = '';
    document.getElementById('cifraclub-paste-input').value = '';
    
    // Salva contexto de retorno para quando fechar este modal re-abrir o vinc
    document.getElementById('modal-song-editor').dataset.returnToVincMassId = returnToVincMassId || '';
    
    // Desmarca todos os checkboxes
    document.querySelectorAll('#song-tags-checkboxes input[type="checkbox"]').forEach(cb => cb.checked = false);

    if (songId) {
        const song = db.musicas.find(s => s.id === songId);
        if (!song) return;
        
        formTitle.textContent = "Editar Música";
        document.getElementById('form-song-id').value = song.id;
        document.getElementById('song-title').value = song.titulo;
        document.getElementById('song-key').value = song.tomPadrao;
        document.getElementById('song-key-personal').value = song.tomPessoal || '';
        document.getElementById('song-capo').value = song.capotraste || '';
        document.getElementById('song-youtube').value = song.linkYoutube || '';
        document.getElementById('song-lyrics').value = song.letra;
        
        // Marca as tags correspondentes nos checkboxes
        const songTags = song.tags || [];
        document.querySelectorAll('#song-tags-checkboxes input[type="checkbox"]').forEach(cb => {
            cb.checked = songTags.includes(cb.value);
        });
    } else {
        formTitle.textContent = "Nova Música";
    }

    modal.classList.remove('hidden');
}

function openSongFormFromVinc(returnToVincMassId) {
    openSongForm(null, returnToVincMassId);
}

// ============================================================================
// CONVERSOR DE CIFRA COLADA DO CIFRACLUB
// ============================================================================

// Remove ruído típico do CifraClub (tom, capotraste, tablatura, textos do site)
// e normaliza cabeçalhos de seção sem colchetes para o padrão [Refrão] do app.
// O formato de acorde-acima-da-letra do CifraClub já é entendido nativamente pelo app,
// então não é necessário reescrever para colchetes inline.
function cleanCifraClubPaste(rawText) {
    let detectedTom = null;
    let detectedCapo = null;

    const junkPatterns = [
        /^cifra\s*club/i,
        /^cifraclub\.com/i,
        /^ver\s+(esta\s+)?cifra/i,
        /^mostrar\s+(acordes|cifra)/i,
        /^ocultar\s+(acordes|cifra)/i,
        /^transportar/i,
        /^afina[çc][ãa]o/i,
        /^coment[aá]rios/i,
        /^enviad[ao]\s+por/i,
        /^\d+\s+(pessoas?|visualiza)/i,
        /^avalia[çc][ãa]o/i,
        /^compositor/i,
        /^int[eé]rprete/i,
    ];

    const tomRegex = /^tom\s*:?\s*([A-G][#b]?m?)\b/i;
    const capoRegex = /^capo(traste)?\s*:?\s*(?:na\s*)?(\d+)/i;
    const tabLineRegex = /^[eEbBgGdDaA]\|[-0-9|~hp/\\]{5,}/;
    const dashHeavyRegex = /^[-\s]{6,}$/;
    const sectionHeaderRegex = /^\(?\s*(Intro|Introdu[çc][ãa]o|Primeira\s+Parte|Segunda\s+Parte|Terceira\s+Parte|Refr[ãa]o|Ponte|Solo|Final|Estrofe\s*\d*|Verso\s*\d*|Interl[uú]dio|Cod[aá])\s*\)?\s*:?$/i;

    const cleaned = [];
    rawText.replace(/\r\n/g, '\n').split('\n').forEach(rawLine => {
        const line = rawLine.replace(/\s+$/g, ''); // remove só espaços do fim, preserva alinhamento dos acordes
        const trimmed = line.trim();

        if (trimmed === '') {
            cleaned.push('');
            return;
        }

        const tomMatch = trimmed.match(tomRegex);
        if (tomMatch) {
            detectedTom = tomMatch[1];
            return;
        }

        const capoMatch = trimmed.match(capoRegex);
        if (capoMatch) {
            detectedCapo = capoMatch[2];
            return;
        }

        if (junkPatterns.some(re => re.test(trimmed))) return;
        if (tabLineRegex.test(trimmed)) return;
        if (dashHeavyRegex.test(trimmed)) return;

        const sectionMatch = trimmed.match(sectionHeaderRegex);
        if (sectionMatch) {
            cleaned.push(`[${sectionMatch[1]}]`);
            return;
        }

        cleaned.push(line);
    });

    // Colapsa 3+ linhas em branco seguidas em no máximo 1
    const collapsed = [];
    let blankStreak = 0;
    cleaned.forEach(l => {
        if (l === '') {
            blankStreak++;
            if (blankStreak <= 1) collapsed.push(l);
        } else {
            blankStreak = 0;
            collapsed.push(l);
        }
    });

    return { text: collapsed.join('\n').trim(), tom: detectedTom, capo: detectedCapo };
}

// Converte um tom em bemol (ex: Bb, Ebm) para o padrão em sustenido usado no seletor de Tom
function normalizeChordToAppFormat(chord) {
    const match = chord.match(/^([A-G])(#|b)?(m)?$/i);
    if (!match) return null;
    const note = match[1].toUpperCase();
    const accidental = match[2] || '';
    const minor = match[3] || '';
    let full = note + accidental;
    if (flatsMap[full]) full = flatsMap[full];
    return full + minor;
}

function formatCifraClubPaste() {
    const rawInput = document.getElementById('cifraclub-paste-input');
    const raw = rawInput.value;
    if (!raw.trim()) {
        alert("Cole o texto copiado do CifraClub primeiro.");
        return;
    }

    const lyricsField = document.getElementById('song-lyrics');
    if (lyricsField.value.trim() && !confirm("Isso vai substituir o conteúdo atual do campo de Letra/Cifra. Continuar?")) {
        return;
    }

    const { text, tom, capo } = cleanCifraClubPaste(raw);
    lyricsField.value = text;

    if (tom) {
        const normalizedTom = normalizeChordToAppFormat(tom);
        const keySelect = document.getElementById('song-key');
        const optionExists = normalizedTom && Array.from(keySelect.options).some(o => o.value === normalizedTom);
        if (optionExists) {
            keySelect.value = normalizedTom;
        }
    }

    if (capo) {
        const capoSelect = document.getElementById('song-capo');
        const capoOptionExists = Array.from(capoSelect.options).some(o => o.value === capo);
        if (capoOptionExists) {
            capoSelect.value = capo;
        }
    }

    rawInput.value = '';
    alert("Cifra formatada! Revise o resultado abaixo antes de salvar (principalmente os cabeçalhos de seção).");
}

function handleSongSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('form-song-id').value;
    const titulo = document.getElementById('song-title').value.trim();
    const tomPadrao = document.getElementById('song-key').value;
    const tomPessoal = document.getElementById('song-key-personal').value;
    const capotraste = document.getElementById('song-capo').value;
    const linkYoutube = document.getElementById('song-youtube').value.trim();
    const letra = document.getElementById('song-lyrics').value;

    if (!titulo || !letra) {
        alert("Preencha o Título e a Letra/Acordes.");
        return;
    }

    const tags = [];
    document.querySelectorAll('#song-tags-checkboxes input[type="checkbox"]:checked').forEach(cb => {
        tags.push(cb.value);
    });

    let savedId = id;
    if (id) {
        const songIndex = db.musicas.findIndex(s => s.id === id);
        if (songIndex !== -1) {
            db.musicas[songIndex] = { id, titulo, tomPadrao, tomPessoal, capotraste, tags, linkYoutube, letra };
        }
    } else {
        const newId = 'song-' + Date.now();
        db.musicas.push({ id: newId, titulo, tomPadrao, tomPessoal, capotraste, tags, linkYoutube, letra });
        savedId = newId;
    }

    saveDatabase();
    
    const returnMassId = document.getElementById('modal-song-editor').dataset.returnToVincMassId;
    document.getElementById('modal-song-editor').classList.add('hidden');
    
    if (returnMassId) {
        openAddSongToMassModal(returnMassId);
        setTimeout(() => {
            const item = document.querySelector(`.vinc-musica-item[data-song-id="${savedId}"]`);
            if (item) item.click();
        }, 100);
    } else {
        renderContent();
    }
    
    alert("Música salva com sucesso!");

    const overlay = document.getElementById('song-reader-overlay');
    if (overlay && !overlay.classList.contains('hidden') && currentSongId === savedId) {
        const song = db.musicas.find(s => s.id === savedId);
        if (song) {
            document.getElementById('reader-song-title').textContent = song.titulo;
            document.getElementById('reader-song-orig-key').textContent = song.tomPadrao;
            
            const ytContainer = document.getElementById('reader-youtube-container');
            if (song.linkYoutube) {
                ytContainer.innerHTML = `<button onclick="openYoutubePlayer('${song.linkYoutube}')" class="btn btn-small btn-secondary border-radius-20" style="cursor: pointer;"><i class="fab fa-youtube text-red"></i> Assistir no YouTube</button>`;
                ytContainer.classList.remove('hidden');
            } else {
                ytContainer.classList.add('hidden');
            }
            
            renderReaderLyrics();
        }
    }
}

function deleteSong(songId) {
    if (confirm("Deseja realmente excluir esta música? Ela será desvinculada de qualquer missa que a utilize.")) {
        db.musicas = db.musicas.filter(s => s.id !== songId);
        db.missas.forEach(mass => {
            if (mass.musicas) {
                mass.musicas = mass.musicas.filter(m => m.musicaId !== songId);
            }
        });
        saveDatabase();
        renderContent();
        alert("Música excluída com sucesso.");
    }
}

// ============================================================================
// CADASTRO/EDIÇÃO DE MISSA (MODAL)
// ============================================================================

function openMassForm(massId = null) {
    const modal = document.getElementById('modal-mass-editor');
    const formTitle = document.getElementById('mass-form-title');
    
    document.getElementById('form-mass-id').value = '';
    document.getElementById('mass-title').value = '';
    document.getElementById('mass-type').value = 'missa';
    document.getElementById('mass-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('mass-location').value = '';
    document.getElementById('mass-playlist').value = '';
    document.getElementById('mass-banner').value = '';
    document.getElementById('mass-notes').value = '';

    if (massId) {
        const mass = db.missas.find(m => m.id === massId);
        if (!mass) return;

        formTitle.textContent = "Editar Celebração";
        document.getElementById('form-mass-id').value = mass.id;
        document.getElementById('mass-title').value = mass.titulo;
        document.getElementById('mass-type').value = mass.tipo || 'missa';
        document.getElementById('mass-date').value = mass.data;
        document.getElementById('mass-location').value = mass.local;
        document.getElementById('mass-playlist').value = mass.linkPlaylist || '';
        document.getElementById('mass-banner').value = mass.bannerUrl || '';
        document.getElementById('mass-notes').value = mass.observacoes || '';
    } else {
        formTitle.textContent = "Nova Celebração";
    }

    modal.classList.remove('hidden');
}

function handleMassSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('form-mass-id').value;
    const titulo = document.getElementById('mass-title').value.trim();
    const tipo = document.getElementById('mass-type').value;
    const data = document.getElementById('mass-date').value;
    const local = document.getElementById('mass-location').value.trim();
    const linkPlaylist = document.getElementById('mass-playlist').value.trim();
    const bannerUrl = document.getElementById('mass-banner').value.trim();
    const observacoes = document.getElementById('mass-notes').value.trim();

    if (!titulo || !local || !data) {
        alert("Preencha o Título, Local e Data da celebração.");
        return;
    }

    if (id) {
        const massIndex = db.missas.findIndex(m => m.id === id);
        if (massIndex !== -1) {
            const oldMass = db.missas[massIndex];
            const oldMusicas = oldMass.musicas || [];
            const oldLeituras = oldMass.leituras || null;
            let roteiroToSave = oldMass.roteiro || null;
            
            if (oldMass.tipo !== tipo) {
                if (confirm("Você alterou o Tipo de Celebração. Deseja redefinir o roteiro para o padrão do novo tipo? Isso apagará as customizações deste roteiro.")) {
                    if (tipo === 'missa') {
                        roteiroToSave = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_MISSA));
                    } else if (tipo === 'grupo') {
                        roteiroToSave = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_GRUPO));
                    } else {
                        roteiroToSave = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_EVENTO));
                    }
                }
            }
            
            db.missas[massIndex] = { id, data, tipo, titulo, local, linkPlaylist, leituras: oldLeituras, musicas: oldMusicas, roteiro: roteiroToSave, observacoes, bannerUrl };
        }
    } else {
        const newId = 'mass-' + Date.now();
        let defaultRoteiro = [];
        if (tipo === 'missa') {
            defaultRoteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_MISSA));
        } else if (tipo === 'grupo') {
            defaultRoteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_GRUPO));
        } else {
            defaultRoteiro = JSON.parse(JSON.stringify(DEFAULT_ROTEIRO_EVENTO));
        }
        db.missas.push({ id: newId, data, tipo, titulo, local, linkPlaylist, leituras: null, musicas: [], roteiro: defaultRoteiro, observacoes, bannerUrl });
        activeMassId = newId; // Auto-seleciona a nova missa
    }

    saveDatabase();
    document.getElementById('modal-mass-editor').classList.add('hidden');
    renderContent();
    alert("Celebração salva com sucesso!");
}

function deleteMass(massId) {
    if (confirm("Deseja realmente excluir esta celebração?")) {
        db.missas = db.missas.filter(m => m.id !== massId);
        if (activeMassId === massId) {
            activeMassId = db.missas.length > 0 ? db.missas[0].id : null;
        }
        saveDatabase();
        renderContent();
        alert("Celebração excluída com sucesso.");
    }
}

// ============================================================================
// VINCULAR MÚSICA À MISSA (MODAL)
// ============================================================================

let currentLinkingMassId = null;
let editingLinkedSongIndex = null;
let vincSelectedSongId = null;
let vincSearchQuery = '';
let vincFilterTag = 'Todos';

function populateVincMomentoDropdown(mass) {
    const select = document.getElementById('vinc-momento');
    select.innerHTML = '';
    
    if (mass && mass.roteiro) {
        const musicMoments = mass.roteiro.filter(item => item.tipo === "momento-musica");
        musicMoments.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.momento;
            opt.textContent = m.momento;
            select.appendChild(opt);
        });
    }
}

function renderVincSongSelectorList() {
    const listContainer = document.getElementById('vinc-musica-lista');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    const filteredSongs = db.musicas.filter(song => {
        const matchesQuery = song.titulo.toLowerCase().includes(vincSearchQuery) || 
                             song.letra.toLowerCase().includes(vincSearchQuery);
        const matchesTag = vincFilterTag === 'Todos' || song.tags.includes(vincFilterTag);
        return matchesQuery && matchesTag;
    }).sort((a, b) => a.titulo.localeCompare(b.titulo));

    if (filteredSongs.length === 0) {
        listContainer.innerHTML = `<p class="size-13 gray text-center padding-10">Nenhuma música encontrada.</p>`;
        return;
    }

    filteredSongs.forEach(song => {
        const item = document.createElement('div');
        item.className = `vinc-musica-item ${song.id === vincSelectedSongId ? 'selected' : ''}`;
        item.dataset.songId = song.id;
        item.onclick = (e) => {
            e.preventDefault();
            vincSelectedSongId = song.id;
            document.getElementById('vinc-musica-id').value = song.id;
            const items = listContainer.querySelectorAll('.vinc-musica-item');
            items.forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            
            const currentTom = document.getElementById('vinc-tom').value.trim();
            if (!currentTom || currentTom === '*') {
                document.getElementById('vinc-tom').value = song.tomPadrao;
            }
        };

        const tagsBadge = song.tags.map(t => `<span class="tag-badge uppercase size-9" style="padding: 2px 5px; background: rgba(74,21,75,0.08); border-radius: 10px; margin-right: 3px; font-size: 8px;">${t}</span>`).join('');

        item.innerHTML = `
            <div class="song-title-col">
                <span class="song-title">${song.titulo}</span>
                <div class="song-tags">${tagsBadge}</div>
            </div>
            <div class="song-meta">
                <span class="song-key">${song.tomPadrao}</span>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function initVincularSongSelector(activeSongId = null) {
    vincSelectedSongId = activeSongId;
    document.getElementById('vinc-musica-id').value = activeSongId || '';
    vincSearchQuery = '';
    vincFilterTag = 'Todos';
    document.getElementById('vinc-musica-busca').value = '';
    
    const tags = ['Todos', 'Entrada', 'Ato Penitencial', 'Glória', 'Salmo', 'Aclamação', 'Ofertório', 'Santo', 'Pai Nosso', 'Cordeiro', 'Comunhão', 'Pós-Comunhão', 'Adoração', 'Final'];
    const filtersContainer = document.getElementById('vinc-musica-filtros');
    filtersContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `btn btn-small filter-btn border-radius-20 ${vincFilterTag === tag ? 'active' : 'btn-secondary'}`;
        btn.style.padding = '3px 8px';
        btn.style.fontSize = '10px';
        btn.textContent = tag;
        btn.onclick = (e) => {
            e.preventDefault();
            vincFilterTag = tag;
            filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.toggle('active', b.textContent === tag);
                if (b.textContent !== tag) {
                    b.classList.add('btn-secondary');
                } else {
                    b.classList.remove('btn-secondary');
                }
            });
            renderVincSongSelectorList();
        };
        filtersContainer.appendChild(btn);
    });

    const searchInput = document.getElementById('vinc-musica-busca');
    searchInput.oninput = (e) => {
        vincSearchQuery = e.target.value.toLowerCase();
        renderVincSongSelectorList();
    };

    renderVincSongSelectorList();
}

function openSongFormFromVinc() {
    // Salva o massId em contexto para re-abrir depois
    const returnMassId = currentLinkingMassId || '';
    // Fecha o vinc modal temporariamente
    document.getElementById('modal-add-song-to-mass').classList.add('hidden');
    openSongForm(null, returnMassId);
}

function openAddSongToMassModal(massId, presetMoment = null) {
    // Sincroniza o db com o localStorage mais recente (para pegar músicas de outras abas)
    const raw = localStorage.getItem('ministerio_db');
    if (raw) {
        try { db = JSON.parse(raw); } catch(e) {}
    }
    
    currentLinkingMassId = massId;
    editingLinkedSongIndex = null;
    const modal = document.getElementById('modal-add-song-to-mass');
    
    const mass = db.missas.find(m => m.id === massId);
    if (!mass) return;

    document.getElementById('vinc-cantor').value = '';
    document.getElementById('vinc-obs').value = '';
    document.getElementById('vinc-tom').value = '';
    
    populateVincMomentoDropdown(mass);
    
    if (presetMoment) {
        document.getElementById('vinc-momento').value = presetMoment;
    }

    initVincularSongSelector(null);

    modal.querySelector('h3').textContent = "Vincular Música à Celebração";
    modal.classList.remove('hidden');
}

function openEditSongInMassModal(massId, index) {
    currentLinkingMassId = massId;
    editingLinkedSongIndex = index;
    const modal = document.getElementById('modal-add-song-to-mass');
    
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.musicas || !mass.musicas[index]) return;

    const mom = mass.musicas[index];
    const song = db.musicas.find(s => s.id === mom.musicaId);

    populateVincMomentoDropdown(mass);

    document.getElementById('vinc-momento').value = mom.momento;
    document.getElementById('vinc-cantor').value = mom.cantor || '';
    document.getElementById('vinc-obs').value = mom.observacoes || '';
    // Mostra o tom que está realmente em uso (o específico da celebração, ou o padrão da música como referência)
    document.getElementById('vinc-tom').value = mom.tomMissa || (song ? song.tomPadrao : '');
    
    initVincularSongSelector(mom.musicaId);

    modal.querySelector('h3').textContent = "Editar Música na Celebração";
    modal.classList.remove('hidden');
}

function saveVincularMusica() {
    const selectMoment = document.getElementById('vinc-momento');
    const selectSongVal = document.getElementById('vinc-musica-id').value;
    const keyInput = document.getElementById('vinc-tom').value.trim();
    const singerInput = document.getElementById('vinc-cantor').value.trim();
    const obsInput = document.getElementById('vinc-obs').value.trim();

    if (!currentLinkingMassId) return;
    
    const mass = db.missas.find(m => m.id === currentLinkingMassId);
    if (!mass) return;

    if (!selectSongVal) {
        alert("Selecione uma música.");
        return;
    }

    const linkedSong = {
        momento: selectMoment.value,
        musicaId: selectSongVal,
        tomMissa: keyInput,
        cantor: singerInput,
        observacoes: obsInput
    };

    if (!mass.musicas) mass.musicas = [];
    
    if (editingLinkedSongIndex !== null) {
        mass.musicas[editingLinkedSongIndex] = linkedSong;
        alert("Escala da música atualizada!");
    } else {
        mass.musicas.push(linkedSong);
        alert("Música vinculada à celebração!");
    }
    
    saveDatabase();
    document.getElementById('modal-add-song-to-mass').classList.add('hidden');
    renderMissasTab();
}

function removeSongFromMass(massId, index) {
    if (confirm("Deseja realmente remover esta música desta celebração?")) {
        const mass = db.missas.find(m => m.id === massId);
        if (mass && mass.musicas) {
            mass.musicas.splice(index, 1);
            saveDatabase();
            renderMissasTab();
            alert("Música removida!");
        }
    }
}

// Funções de manipulação dinâmica do Roteiro
function editRoteiroItem(massId, itemId) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro) return;
    const item = mass.roteiro.find(i => i.id === itemId);
    if (!item) return;
    
    let newText = prompt(`Editar texto de "${item.tipo === 'titulo-secao' ? 'Título' : 'Liturgia'}":`, item.texto || item.textoLeitura || '');
    if (newText !== null) {
        newText = newText.trim();
        if (item.tipo === 'titulo-secao' || item.tipo === 'liturgia') {
            item.texto = newText;
        } else if (item.tipo === 'leitura-texto') {
            if (!mass.leituras) mass.leituras = {};
            mass.leituras[item.campoLeitura] = newText;
        }
        saveDatabase();
        renderMissasTab();
    }
}

function deleteRoteiroItem(massId, itemId) {
    if (confirm("Deseja realmente remover este item do roteiro?")) {
        const mass = db.missas.find(m => m.id === massId);
        if (mass && mass.roteiro) {
            // Se for do tipo momento-musica, também desvincula a música
            const item = mass.roteiro.find(i => i.id === itemId);
            if (item && item.tipo === 'momento-musica') {
                mass.musicas = mass.musicas.filter(m => m.momento !== item.momento);
            }
            mass.roteiro = mass.roteiro.filter(i => i.id !== itemId);
            saveDatabase();
            renderMissasTab();
        }
    }
}

function moveRoteiroItem(massId, itemId, direction) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro) return;
    
    const index = mass.roteiro.findIndex(i => i.id === itemId);
    if (index === -1) return;
    
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= mass.roteiro.length) return;
    
    const temp = mass.roteiro[index];
    mass.roteiro[index] = mass.roteiro[targetIndex];
    mass.roteiro[targetIndex] = temp;
    
    saveDatabase();
    renderMissasTab();
}

function addRoteiroItemModal(massId) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro) return;
    
    const typeChoice = prompt("Selecione o tipo de item:\n1 - Título de Seção (Ex: Ritos Iniciais)\n2 - Texto Litúrgico / Prece (Ex: Ato Penitencial: Confesso...)");
    if (!typeChoice) return;
    
    if (typeChoice === '1') {
        const titleText = prompt("Digite o Título da Seção:");
        if (titleText && titleText.trim()) {
            const newItem = {
                id: "sec-" + Date.now(),
                tipo: "titulo-secao",
                texto: titleText.trim()
            };
            mass.roteiro.push(newItem);
            saveDatabase();
            renderMissasTab();
        }
    } else if (typeChoice === '2') {
        const liturgiaText = prompt("Digite o Texto Litúrgico / Prece:");
        if (liturgiaText && liturgiaText.trim()) {
            const newItem = {
                id: "lit-" + Date.now(),
                tipo: "liturgia",
                texto: liturgiaText.trim()
            };
            mass.roteiro.push(newItem);
            saveDatabase();
            renderMissasTab();
        }
    } else {
        alert("Opção inválida.");
    }
}

function addCustomMusicMomentModal(massId) {
    const mass = db.missas.find(m => m.id === massId);
    if (!mass || !mass.roteiro) return;
    
    const momentName = prompt("Digite o nome do novo Momento de Canto (Ex: Entrada da Imagem, Canto de Agradecimento):");
    if (momentName && momentName.trim()) {
        const name = momentName.trim();
        const newItem = {
            id: "mus-" + Date.now(),
            tipo: "momento-musica",
            momento: name,
            icone: "fa-music"
        };
        mass.roteiro.push(newItem);
        saveDatabase();
        renderMissasTab();
        alert(`Momento "${name}" adicionado ao roteiro! Use o botão "Escalar" para vincular um canto a ele.`);
    }
}

// ============================================================================
// PANEL DE ADMINISTRAÇÃO E BACKUP JSON
// ============================================================================

function exportDatabase() {
    const textOutput = document.getElementById('textarea-db-backup');
    textOutput.value = JSON.stringify(db, null, 2);
    textOutput.select();
    alert("Código JSON gerado. Copie e cole em outro aparelho para sincronizar!");
}

function downloadDatabase() {
    // Incrementa a versão do banco de dados em 0.1 para que outros aparelhos detectem a atualização
    let currentVersion = parseFloat(db.version) || 1.4;
    let nextVersion = (currentVersion + 0.1).toFixed(1);
    db.version = nextVersion;

    saveDatabase();

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "database.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    alert(`Arquivo 'database.json' baixado com sucesso!\n\nVersão gerada: ${nextVersion}\n\nSuba este arquivo no seu GitHub para atualizar o site de todos os integrantes.`);
}

function importDatabase() {
    const textInput = document.getElementById('textarea-db-backup').value.trim();
    if (!textInput) {
        alert("Cole o código JSON gerado para importar.");
        return;
    }

    try {
        const parsed = JSON.parse(textInput);
        if (parsed.musicas && parsed.missas) {
            if (confirm("Deseja substituir as informações locais pelas importadas?")) {
                db = parsed;
                activeMassId = db.missas.length > 0 ? db.missas[0].id : null;
                saveDatabase();
                renderContent();
                alert("Banco de dados importado com sucesso!");
            }
        } else {
            alert("JSON inválido. Certifique-se de que copiou o código completo.");
        }
    } catch (e) {
        alert("Erro ao ler JSON.");
        console.error(e);
    }
}

// Inicializador automático do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    setupGlobalEvents();
    renderTabs();
    renderContent();
});

// Registra o Service Worker para permitir que o app abra offline (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.warn('Não foi possível registrar o Service Worker.', err);
        });
    });
}

// ============================================================================
// POPUP DE REPRODUÇÃO DO YOUTUBE
// ============================================================================
function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function openYoutubePlayer(url) {
    const videoId = getYoutubeId(url);
    if (!videoId) {
        window.open(url, '_blank');
        return;
    }
    const container = document.getElementById('youtube-player-container');
    container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border: none;"></iframe>`;
    document.getElementById('modal-youtube-player').classList.remove('hidden');
}

function closeYoutubePlayer() {
    document.getElementById('youtube-player-container').innerHTML = '';
    document.getElementById('modal-youtube-player').classList.add('hidden');
}
