// ============================================================================
// DADOS DA LITURGIA DIÁRIA
// ============================================================================

const dadosLiturgia = {
    data: new Date().toISOString().split('T')[0],
    titulo: "3ª Semana do Tempo Comum | Segunda-feira",
    leituras: [
        {
            tipo: "primeira",
            titulo: "Primeira Leitura (2 Sm 7,18-19.24-29)",
            texto: `Naqueles dias, o rei Davi foi apresentar-se ao Senhor e disse: "Quem sou eu, Senhor Deus, e o que é a minha família, para que me tenhas conduzido até aqui? E ainda isto te pareceu pouco, Senhor Deus, e tu falaste também da casa do teu servo para um futuro distante, e agora me tratas segundo as riquezas de um homem ilustre, Senhor Deus! Firmaste o teu povo de Israel, para que fosse o teu povo para sempre, e tu, Senhor, te tornaste o seu Deus. Agora, pois, Senhor Deus, confirma para sempre a palavra que falaste a respeito de teu servo e de sua casa, e faze o que disseste. Que o teu nome seja engrandecido para sempre, e se diga: 'O Senhor dos exércitos é o Deus de Israel!' E a casa de teu servo Davi permanecerá firme diante de ti. Porque tu mesmo, Senhor dos exércitos, Deus de Israel, revelaste ao teu servo, dizendo: 'Edificarei uma casa para ti!' Por isso o teu servo encontrou coragem para fazer-te esta oração. Agora, Senhor Deus, tu és Deus, as tuas palavras são verdadeiras e fizeste ao teu servo todas essas promessas. Digna-te agora abençoar a casa de teu servo, para que permaneça sempre diante de ti, porque tu, Senhor Deus, o disseste; e com a tua bênção, será abençoada para sempre a casa de teu servo".`,
            referencia: "Palavra do Senhor.",
            resposta: "Graças a Deus."
        },
        {
            tipo: "salmo",
            titulo: "Salmo Responsorial (Sl 131)",
            refrao: "O Senhor lhe dará o trono de seu pai Davi.",
            versiculos: [
                "Levanta-te, Senhor, e vem para o teu repouso, vós, a arca de vossa santidade! Que teus sacerdotes se revistam de justiça, e de alegria os teus fiéis!",
                "Por amor de Davi, teu servo, não afastes de seu filho a tua face! O Senhor jurou a Davi, numa promessa que não retratará: 'Um herdeiro que é fruto do teu ventre eu colocarei sobre o teu trono!'",
                "Se teus filhos guardarem minha aliança e os preceitos que lhes hei de ensinar, também os seus filhos, para sempre, hão de sentar-se sobre o teu trono!'"
            ],
            referencia: "Palavra do Senhor.",
            resposta: "Graças a Deus."
        },
        {
            tipo: "evangelho",
            titulo: "Evangelho (Mc 4,21-25)",
            aclamacao: "Aleluia, aleluia, aleluia.",
            versiculo: "Eu sou a luz do mundo; aquele que me segue não andará nas trevas, mas terá a luz da vida.",
            texto: `Naquele tempo, disse Jesus à multidão: "Quem é que traz uma lâmpada para colocá-la debaixo de uma vasilha ou debaixo da cama? Ao contrário, não a põe no candeeiro? Assim, tudo o que está escondido deve ser revelado, e tudo o que está em segredo deve ser trazido à luz. Quem tem ouvidos para ouvir, ouça!" Jesus disse ainda: "Prestai atenção no que ouvis: com a mesma medida com que medirdes, também vós sereis medidos; e vos será dado ainda mais. Pois àquele que tem, será dado ainda mais; daquele que não tem, será tirado até mesmo o que ele tem".`,
            referencia: "Palavra da Salvação.",
            resposta: "Glória a vós, Senhor."
        }
    ]
};

// ============================================================================
// DADOS DAS MÚSICAS
// ============================================================================

const musicData = [
    {
        moment: "Entrada",
        icon: "fas fa-door-open",
        songs: [
            {
                title: "Festa do Cordeiro",
                key: "C",
                lyrics: `[Intro] D  D/C  G/B  A
        D  D/C  D/F#  G  
        A  G/B  A

   D       D/C
Cantai, cantai ao Senhor Deus
   G/B       A4
Cantai, sua glória entre as nações
  G
Entrai com alegria, dons e oferendas
    A4          A
Nos átrios do Senhor
   D       D/C
Louvai, louvai ao Senhor Deus
    G/B    A4
Louvai, aquele que venceu
   G
Na Cruz nos deua a vida, curou nossas feridas
     A4          A
Seu sangue nos lavou
   G              G   A     Bm          A4  A
Trazei o mundo inteiro    à festa do Cordeiro
G                A    G/B A/C#
Vinde, vinde celebrar

          D                     G  
Reina o Senhor, eterno é o Seu Amor
   D/F#     Em           D/F#      A G/B A/C# A
Vestido de glória e majestade está aqui
          D      D     Em  D/F# G   A Bm
Reina o Senhor, eterno é o Seu Amor
      Em          D/F#       A4  A 
Sua beleza tudo recria, tudo refaz

( D  C  C  G )  

   D       D/C
Cantai, cantai ao Senhor Deus
   G/B       A4
Cantai, sua glória entre as nações
  G
Entrai com alegria, dons e oferendas
    A4          A
Nos átrios do Senhor
   D       D/C
Louvai, louvai ao Senhor Deus
    G/B    A4
Louvai, aquele que venceu
   G
Na Cruz nos deu a vida, curou nossas feridas
     A4          A
Seu sangue nos lavou
 G            G   A   Bm            D A/C# A D/F#
Exultem de alegria os céus e toda a ter----ra
G                       A4  A
Diante do Cordeiro vencedor

          D                     G  
Reina o Senhor, eterno é o Seu Amor
   D/F#     Em           D/F#      A G/B A/C# A
Vestido de glória e majestade está aqui
          D      D     Em  D/F# G   A Bm
Reina o Senhor, eterno é o Seu Amor
      Em          D/F#       A4  A 
Sua beleza tudo recria, tudo refaz

( G  A  G/B  G  A )

          D      D    Em   D/F# G  
Reina o Senhor, eterno é o Seu Amor
   D/F#     Em           D/F#      A G/B A/C# A
Vestido de glória e majestade está aqui
          D  Em D/F#    D/A            G
Reina o Senhor,        eterno é o Seu Amor
      Em          D/F#       A4  A 
Sua beleza tudo recria, tudo refaz

          G
Reina o Senhor!
          Bm
Reina o Senhor!
          G    D/F# A   D
Reina o Senhor`
            }
        ]
    },
    {
        moment: "Ato Penitencial",
        icon: "fas fa-hands-praying",
        songs: [
            {
                title: "Kyrie Eleison - JMJ RIO 2013",
                key: "Bm",
                lyrics: `[Intro] Bm7  G7M
        Bm7  G7M

[Primeira Parte]

    Bm7       A      G7M
Senhor, que viestes salvar
        Bm7         A/C#  F#4  F#
Os corações arrependi____dos

[Refrão]

       D  D4  D  A/C#   
Kyrie  elei____son
  F#7/A#  F#7  Bm7   
Elei__________son
  E4  E  A
Elei____son

 D       D4  D  A/C#   
Kyrie  elei____son
  F#7/A#  F#7  Bm7   
Elei__________son,
  E4  E  A
Elei____son

( Bm7  F#m7  G7M )

[Segunda Parte]

     Bm7         A9        G7M
Ó, Cristo, que viestes chamar
        Bm7        A/C#  F#4  F#
Os pecadores humilhados

[Refrão 2]

      D    D4  D  A/C#   
Christe  ele____ison
  F#7/A#  F#7  Bm7   
Elei__________son
  E4  E  A  G/A  A  G/A
Ele____ison

 D         D4  D  A/C#  A/B
Christe  elei____son
  F#7/A#  F#/C#  Bm7  Bm7/A     
Ele____________ison
  E/G#  E  A
Ele______ison

( G#m7(5-)  C#7  F#m7  A/B )
( D7M(6/9)  E7(4) )

[Terceira Parte]

    F#m7            E6   D7M
Senhor, que intercedeis por nós
              F#m7           E/G#  C#4
Junto a Deus Pai que nos perdo_____a

( E/F#  F#  E/F# )

[Refrão]

    B  B/D#  E  B/D#  C#m7  C#m7/B  
Kyrie      ele______ison
  A#m11  D#7  G#m7  
Ele_________ison
  C#4  C#7  F#  E/F#  F#  E/F#
Ele_______ison

    B  B/D#  E  B/D#  C#m7  C#m7/B  
Kyrie      ele______ison
  A#m11  D#7  G#m7   
Ele_________ison
  C#4  C#7  F# 
Ele_______ison

[Final] E/F#  F#  A7M`
            }
        ]
    },
    {
        moment: "Glória",
        icon: "fas fa-hands-praying",
        songs: [
            {
                title: "Glória a Deus Nas Alturas - Eliana Ribeiro",
                key: "G",
                lyrics: `[Intro] D9  C9  D9
        C9  D9  C9

[Primeira Parte] 
  D9                 C9
Glória a Deus nas alturas
   G
E paz na Terra
                     D9   ( D4  D )
Aos homens por Ele amados
    D9        C9
Senhor Deus, rei dos céus
 G                D9
Deus Pai Todo Poderoso

[Ponte 1]
            Am  D9
Nós vos louva__mos
              Am  D9
Nós vos bendize__mos
            Am  D9
Nós vos adora__mos
                Am  D9
Nós vos glorifica__mos
                C9
Nós vos damos graças
     G             D9
Por vossa imensa glória

[Segunda Parte] 
               C9
Senhor Jesus Cristo
 G        D9    ( D4  D )
Filho Unigênito
    D9           C9
Senhor Deus, Cordeiro de Deus
 G             D9
Filho de Deus Pai

[Ponte 2]
 Am                  G
Vós, que tirais o pecado do mundo
 C9               D9
Tende piedade de nós
 Am                  G
Vós, que tirais o pecado do mundo
C9               D9
Acolhei a nossa súplica
 Am                  G
Vós, que estais à direita do Pai
 C9               D9
Tende piedade de nós

[Refrão]
               Am  D9
Só vós sois o Sa_nto
              Am  D9
Só vós, o Senhor
             C9              D9
Só vós, o Altíssimo, Jesus Cristo
 E              A
Com o Espírito Santo

[Final]
                  G       D9
Na glória de Deus   Pai amém!
                  G       D9
Na glória de Deus   Pai amém!
                  G       D9
Na glória de Deus   Pai amém!
                  G       D9
Na glória de Deus   Pai amém!`
            }
        ]
    },
    {
        moment: "Salmo",
        icon: "fas fa-book-bible",
        songs: [
            {
                title: "SALMO 48 (48) - FELIZES OS HUMILDES DE ESPÍRITO",
                key: "F",
                lyrics: `              
  F          Gm          F 
FELIZES OS HUMILDES DE ESPÍRITO, 
F/A    Bb        C7        F
PORQUE DELES É O REINO DOS CÉUS. (BIS)

   F                                C  F
1. POR QUE TEMER OS DIAS MAUS E INFELI-ZES,
Dm                             Bb    C   F
QUANDO A MALÍCIA DOS PERVERSOS ME CIRCUN-DA?
F                                  C  F
POR QUE TEMER OS QUE CONFIAM NAS RIQUEZAS 
Dm                            Bb   C  F
E SE GLORIAM NA ABUNDÂNCIA DE SEUS BE-ENS?

  F          Gm          F 
FELIZES OS HUMILDES DE ESPÍRITO, 
F/A    Bb        C7        F
PORQUE DELES É O REINO DOS CÉUS.`
            }
        ]
    },
    {
        moment: "Aclamação",
        icon: "fas fa-music",
        songs: [
            {
                title: "ACLAMAÇÃO EVANGELHO (TRADICIONAL)",
                key: "E",
                lyrics: `   
E B4 E
Aleluia, Aleluia, Aleluia,
A B4 E
Alelu____ia,
E
Meus discípulos, se alegrem
                    B4
Saltem mesmo de alegria
Pois bem grande é a recompensa
                        E E4
Que de Deus vão ter um dia!`
            }
        ]
    },
    {
        moment: "Ofertório",
        icon: "fas fa-gift",
        songs: [
            {
                title: "Venho a Ti - Eliana Ribeiro",
                key: "G",
                lyrics: `
E7+/9   E                                    F#m/Eb 
Venho a Ti e    sei que não estou mais sozinho
G#5+/7  Cº

               C#m7+  A7+               F#m  D9  A/B
Muitas vozes se elevam para o céu
               E7+/9         E                           
Venho a Ti como aqueles irmãos verdadeiros
F#m/Eb G#5+/7  Cº

            C#m7+      A7+           F#m   A/B
Que comigo dão a ti seus corações

   F#m   A/B     E7+ C#m      F#m        A/B       G#m   
E tu que és o amor,             escuta cada prece de dor 
 C#m
de amor
   A9       B/A  G#m  Gdim F#m            A/B           
E tu que és a paz                 dá-nos a esperança em 
             G#m        C#m
cada momento, Senhor
    F#m         A/B    E7+ C#m F#m     A/B     E9
E abre o paraíso a nós,       e abre o paraíso a nós.`
            }
        ]
    },
    {
        moment: "Santo",
        icon: "fas fa-church",
        songs: [
            {
                title: "Santo é o Senhor (Na dança da vida) - Comunidade Shalom",
                key: "Em",
                lyrics: `[Intro] F#m7(b5)  Em  D  G/B  C  G/B  G  Am  
        Am/G  F#m7(b5)  B4  B9  F#  A  C  E  B  

Em  D  C   G  D/F#  Em    F   C/E     D4  D#º
San___to, San_______to, Santo é o Senhor
Em  D  C   G  D/F#  Em    F   C/E     D4  D7M 
San___to, San_______to, Santo é o Senhor

Am7          Bm7                 C9  ( Am )
Céus e terra proclamam vossa glória
F#m7(b5)      B7 ( F#  A  C  E  B  )
Hosana nas alturas

( D  D  D  C  A  F )

Em  D  C   G  D/F#  Em    F   C/E     D4  D#º
San___to, San_______to, Santo é o Senhor
Em  D  C   G  D/F#  Em    F   C/E     D4  D7M 
San___to, San_______to, Santo é o Senhor

Am7               Bm7            C9  ( Am ) 
Bendito o que vem em nome do Senhor
F#m7(b5)      B7  Cº  C#7 ( F#  A  C  E  B  )
Hosana nas alturas

F#m  E  D  A  E/G#  F#m   G    D/F#    E4  Fº
San____to, San_______to, Santo é o Senhor
F#m  E  D  A  E/G#  F#m   G    D/F#    E4  E 
San____to, San_______to, Santo é o Senhor

             A9  G9/A          A9  G9/A
Santo é o Senhor  Santo é o Senhor
                  F7M   G9     A  
Santo é o Senhor  Santo é o Senhor`
            }
        ]
    },
    {
        moment: "Comunhão",
        icon: "fas fa-wine-glass-alt",
        songs: [
            {
                title: "Entre Nós - Ministério Amor e Adoração",
                key: "F",
                lyrics: `
[Intro] C  C#º  Bb/D  C/E  F  Bb/F  F

  F      C/E   Dm7    A/C#    Bb9
O Pão do céu, está aqui entre nós
      F/A  Bb    C9
É o Cordeiro de Deus
  F    C/E      Dm7   A/C#     Bb
Amor maior, não há em nenhum lugar
        F/A       Bb9    C9
Que o sacrifício deste altar

F                    Bb/F
Anjos cantando entre nós
   F                   C/E Am7  Dm7
O céu e a terra são um só  coração
      Bb   Bb/D     C C7
Nesta santa Comunhão
   F                      Bb/F
Jesus visitando a imperfeição
  F                       C/E  Am7    Dm7
O homem que encontra redenção, tudo aqui
      Bb    Dm7    C  C#º  Bb/D  C/E  Bb/F  F
Nesta santa Comunhão

   F     C/E   Dm7   A/C#     Bb
O dom do Pai, está aqui entre nós
     F/A       Bb9   C9
Neste vinho e neste pão
   F     C/E      Dm11     A/C#       Bb
Oh luz maior, se acende em nós, comunhão
      F/A    Bb   C7(4) C7
É pra nós a salvação`
            }
        ]
    },
    {
        moment: "Pós-Comunhão",
        icon: "fas fa-praying-hands",
        songs: [
            {
                title: "Deus É Bom e Fiel - Walmir Alencar",
                key: "G",
                lyrics: `[Primeira Parte]
        G
Caminharei (caminharei)
             C
Não me cansarei (não me cansarei)
        G  F         G
E seguirei  (e seguirei)
                 C
Rumo ao rei dos reis

[Refrão]
                G
Ele é minha força!
               Em7
Deus é bom e fiel
                 C7(9)
Ele está sempre perto
Deus é bom e fiel
                   G
Vou seguro em sua mão
               Em7
Deus é bom e fiel
                 C7(9)
Ele está sempre perto
Deus é bom e fiel
                      G7
Rendo a ele o meu louvor e gratidão`
            }
        ]
    },
    {
        moment: "Final",
        icon: "fas fa-flag",
        songs: [
            {
                title: "VIGIA ESPERANDO A AURORA",
                key: "D",
                lyrics: `[Intro] D  G  F#m7 Em7  
        D  G  F#m7 Em7  
        D  A4  A 

[Refrão] 
   D     G           D        
Vigia esperando a aurora  
              G          D  D7 
Qual noiva esperando o amor 
     G         F#m7    Bm7     
É assim que o servo espera  
   Em7   A         D  Em7  D/F# 
A vinda do seu Senhor 
     G         F#m7    Bm7     
É assim que o servo espera  
   Em7   A         D 
A vinda do seu Senhor`
            }
        ]
    }
];

// ============================================================================
// FUNÇÕES PARA LITURGIA
// ============================================================================

function toggleLiturgia() {
    const content = document.getElementById('liturgyContent');
    const arrow = document.getElementById('liturgyArrow');
    
    if (content && arrow) {
        content.classList.toggle('expanded');
        arrow.textContent = content.classList.contains('expanded') ? '▲' : '▼';
    }
}

function buscarLiturgia() {
    const dataInput = document.getElementById('dataLiturgia');
    const data = dataInput.value;
    
    // Simulação de busca - aqui você implementaria uma API real
    alert(`Buscar liturgia para: ${formatarData(data)}\n\nEm uma versão real, esta funcionalidade buscará a liturgia do dia em uma API.`);
    
    // Atualizar os dados da liturgia
    dadosLiturgia.data = data;
    renderizarLiturgia();
}

function renderizarLiturgia() {
    const container = document.getElementById('liturgyContent');
    
    if (!container) {
        console.error('Container da liturgia não encontrado!');
        return;
    }
    
    let html = `
        <div class="liturgia-data">
            <h3><i class="fas fa-calendar-alt"></i> ${formatarData(dadosLiturgia.data)}</h3>
        </div>
    `;
    
    dadosLiturgia.leituras.forEach(leitura => {
        html += `<div class="leitura-item">`;
        
        if (leitura.tipo === 'primeira') {
            html += `
                <div class="leitura-titulo">
                    <i class="fas fa-scroll"></i>
                    ${leitura.titulo}
                </div>
                <div class="leitura-texto">${formatarTexto(leitura.texto)}</div>
                <div class="referencia">
                    <span class="role">${leitura.referencia}</span>
                    <span class="resposta"> ${leitura.resposta}</span>
                </div>
            `;
        }
        
        else if (leitura.tipo === 'salmo') {
            html += `
                <div class="leitura-titulo">
                    <i class="fas fa-music"></i>
                    ${leitura.titulo}
                </div>
                <div class="salmo-refrao">
                    <span class="role">R.</span>
                    <span class="resposta"> ${leitura.refrao}</span>
                </div>
                <div class="versiculos-container">
                    ${leitura.versiculos.map((versiculo, index) => `
                        <div class="versiculo">
                            <span class="numero-versiculo">${index + 1}.</span>
                            ${versiculo}
                        </div>
                    `).join('')}
                </div>
                <div class="referencia">
                    <span class="role">${leitura.referencia}</span>
                    <span class="resposta"> ${leitura.resposta}</span>
                </div>
            `;
        }
        
        else if (leitura.tipo === 'evangelho') {
            html += `
                <div class="leitura-titulo">
                    <i class="fas fa-cross"></i>
                    ${leitura.titulo}
                </div>
                <div class="aclamacao">
                    <div class="aclamacao-texto">${leitura.aclamacao}</div>
                    <div class="versiculo-evangelho">${leitura.versiculo}</div>
                </div>
                <div class="leitura-texto">${formatarTexto(leitura.texto)}</div>
                <div class="referencia">
                    <span class="role">${leitura.referencia}</span>
                    <span class="resposta"> ${leitura.resposta}</span>
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    container.innerHTML = html;
    
    // Expande a liturgia automaticamente ao carregar
    container.classList.add('expanded');
    const arrow = document.getElementById('liturgyArrow');
    if (arrow) {
        arrow.textContent = '▲';
    }
}

function formatarData(dataString) {
    const data = new Date(dataString);
    const opcoes = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return data.toLocaleDateString('pt-BR', opcoes);
}

function formatarTexto(texto) {
    return texto.replace(/\.\s/g, '.<br><br>')
               .replace(/\n/g, '<br>')
               .replace(/\s\s+/g, ' ');
}

// ============================================================================
// FUNÇÕES PARA MÚSICAS
// ============================================================================

function createLiturgyLinks() {
    const liturgyContainer = document.getElementById('liturgy-links');
    if (!liturgyContainer) return;
    
    liturgyContainer.innerHTML = '';
    
    // Adicionar link para a liturgia
    const liturgyLink = document.createElement('a');
    liturgyLink.className = 'liturgy-link';
    liturgyLink.innerHTML = `
        <i class="fas fa-book-bible"></i>
        <span>Liturgia do Dia</span>
    `;
    
    liturgyLink.addEventListener('click', function(e) {
        e.preventDefault();
        const liturgySection = document.querySelector('.liturgy-section');
        if (liturgySection) {
            liturgySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Expande a liturgia
            const content = document.querySelector('.liturgy-content');
            content.classList.add('expanded');
            const arrow = document.querySelector('.liturgy-arrow');
            arrow.textContent = '▲';
        }
    });
    
    liturgyContainer.appendChild(liturgyLink);
    
    // Adicionar links para os momentos musicais
    musicData.forEach((moment, index) => {
        const link = document.createElement('a');
        link.className = 'liturgy-link';
        link.innerHTML = `
            <i class="${moment.icon}"></i>
            <span>${moment.moment}</span>
        `;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById(`moment-${index}`);
            if (targetSection) {
                // Expande a seção
                const content = targetSection.querySelector('.moment-content');
                content.classList.add('expanded');
                const arrow = targetSection.querySelector('.moment-arrow');
                arrow.textContent = '▲';

                // Rola suavemente até a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        liturgyContainer.appendChild(link);
    });
}

function renderMusicList() {
    const musicListContainer = document.getElementById('music-list');
    if (!musicListContainer) return;
    
    musicListContainer.innerHTML = '';

    musicData.forEach((moment, momentIndex) => {
        const momentSection = document.createElement('div');
        momentSection.className = 'moment-section';
        momentSection.id = `moment-${momentIndex}`;

        const momentHeader = document.createElement('div');
        momentHeader.className = 'moment-header';
        momentHeader.innerHTML = `
                <h2><i class="${moment.icon} moment-icon"></i> ${moment.moment}</h2>
                <span class="moment-arrow">▼</span>
            `;

        const momentContent = document.createElement('div');
        momentContent.className = 'moment-content';

        moment.songs.forEach((song, songIndex) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                    <div class="song-title">
                        <span>${song.title}</span>
                        <span class="song-key">${song.key}</span>
                    </div>
                    <div class="song-lyrics">${formatLyrics(song.lyrics)}</div>
                    <button class="back-to-liturgy">
                        <i class="fas fa-arrow-left"></i> Voltar para a Liturgia
                    </button>
                `;

            // Adicionar evento ao botão "Voltar para a Liturgia"
            const backButton = songItem.querySelector('.back-to-liturgy');
            backButton.addEventListener('click', scrollToLiturgy);

            momentContent.appendChild(songItem);
        });

        // Adicionar evento de clique para expandir/contrair o momento
        momentHeader.addEventListener('click', function() {
            momentContent.classList.toggle('expanded');
            const arrow = this.querySelector('.moment-arrow');
            arrow.textContent = momentContent.classList.contains('expanded') ? '▲' : '▼';
        });

        momentSection.appendChild(momentHeader);
        momentSection.appendChild(momentContent);
        musicListContainer.appendChild(momentSection);
    });
}

function scrollToLiturgy() {
    const liturgySection = document.querySelector('.liturgy-section');
    if (liturgySection) {
        liturgySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Expande a liturgia
        const liturgyContent = document.querySelector('.liturgy-content');
        if (liturgyContent) {
            liturgyContent.classList.add('expanded');
        }
        const liturgyArrow = document.querySelector('.liturgy-arrow');
        if (liturgyArrow) {
            liturgyArrow.textContent = '▲';
        }
    }
}

function formatLyrics(lyrics) {
    // Destacar acordes entre colchetes
    return lyrics.replace(/\[(.*?)\]/g, '<span class="chord">[$1]</span>');
}

// ============================================================================
// FUNÇÕES DE CONTROLE
// ============================================================================

function increaseFontSize() {
    const root = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--font-size'));
    if (currentSize < 22) {
        root.style.setProperty('--font-size', (currentSize + 1) + 'px');
    }
}

function decreaseFontSize() {
    const root = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--font-size'));
    if (currentSize > 12) {
        root.style.setProperty('--font-size', (currentSize - 1) + 'px');
    }
}

function resetFontSize() {
    document.documentElement.style.setProperty('--font-size', '16px');
}

function expandAll() {
    document.querySelectorAll('.moment-content').forEach(content => {
        content.classList.add('expanded');
    });
    document.querySelectorAll('.moment-arrow').forEach(arrow => {
        arrow.textContent = '▲';
    });
    const liturgyContent = document.querySelector('.liturgy-content');
    if (liturgyContent) {
        liturgyContent.classList.add('expanded');
    }
    const liturgyArrow = document.querySelector('.liturgy-arrow');
    if (liturgyArrow) {
        liturgyArrow.textContent = '▲';
    }
}

function collapseAll() {
    document.querySelectorAll('.moment-content').forEach(content => {
        content.classList.remove('expanded');
    });
    document.querySelectorAll('.moment-arrow').forEach(arrow => {
        arrow.textContent = '▼';
    });
    const liturgyContent = document.querySelector('.liturgy-content');
    if (liturgyContent) {
        liturgyContent.classList.remove('expanded');
    }
    const liturgyArrow = document.querySelector('.liturgy-arrow');
    if (liturgyArrow) {
        liturgyArrow.textContent = '▼';
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        document.querySelectorAll('.moment-section').forEach(section => {
            const momentHeader = section.querySelector('.moment-header h2').textContent.toLowerCase();
            const songs = section.querySelectorAll('.song-item');
            let hasMatch = false;

            songs.forEach(song => {
                const title = song.querySelector('.song-title span').textContent.toLowerCase();
                const lyrics = song.querySelector('.song-lyrics').textContent.toLowerCase();

                if (title.includes(searchTerm) || lyrics.includes(searchTerm)) {
                    song.style.display = 'block';
                    hasMatch = true;
                } else {
                    song.style.display = 'none';
                }
            });

            // Mostrar/ocultar seção baseado nos resultados
            section.style.display = hasMatch || momentHeader.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Configurar data atual
    const hoje = new Date().toISOString().split('T')[0];
    const dataInput = document.getElementById('dataLiturgia');
    if (dataInput) {
        dataInput.value = hoje;
        dadosLiturgia.data = hoje;
    }
    
    // Renderizar liturgia
    renderizarLiturgia();
    
    // Renderizar músicas
    renderMusicList();
    
    // Criar links de navegação
    createLiturgyLinks();
    
    // Configurar eventos
    const liturgyHeader = document.getElementById('liturgyHeader');
    if (liturgyHeader) {
        liturgyHeader.addEventListener('click', toggleLiturgia);
    }
    
    const buscarBtn = document.getElementById('buscarLiturgia');
    if (buscarBtn) {
        buscarBtn.addEventListener('click', buscarLiturgia);
    }
    
    // Controles de fonte
    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    const resetBtn = document.getElementById('reset-font');
    
    if (increaseBtn) increaseBtn.addEventListener('click', increaseFontSize);
    if (decreaseBtn) decreaseBtn.addEventListener('click', decreaseFontSize);
    if (resetBtn) resetBtn.addEventListener('click', resetFontSize);
    
    // Expandir/recolher tudo
    const expandBtn = document.getElementById('expand-all');
    const collapseBtn = document.getElementById('collapse-all');
    
    if (expandBtn) expandBtn.addEventListener('click', expandAll);
    if (collapseBtn) collapseBtn.addEventListener('click', collapseAll);
    
    // Configurar busca
    setupSearch();
});
