# Ministério de Música Chave de Davi - Portal de Cifras & Celebrações

Este é o portal oficial do **Ministério de Música Chave de Davi**, desenvolvido para gerenciar e visualizar as escalas de cantos, roteiros de celebrações e cifras das músicas utilizadas nas missas e eventos da comunidade. O sistema foi projetado para ser leve, rápido, responsivo e extremamente funcional tanto para o administrador (quem monta as escalas) quanto para os músicos no altar (que executam os cantos).

---

## 📋 Regras de Negócio e Comportamento

### 1. Data e Agenda (Calendário)
- **Data do Dia Inicial**: Ao abrir o site, a agenda sempre carrega configurada na data atual do dia local.
- **Fidelidade à Liturgia da API**: Se o dia selecionado não possuir nenhuma celebração customizada cadastrada, o portal exibirá automaticamente a **Liturgia Diária da Igreja** (obtida de forma dinâmica e assíncrona da API).
- **Alternador de Modos em Dias de Eventos**: Caso haja uma celebração cadastrada na data selecionada (por exemplo, a *Solenidade de Corpus Christi* em 04/06):
  - O portal exibirá o **Roteiro da Celebração** customizado criado pelo ministério.
  - O usuário poderá alternar entre 3 visões do evento:
    1. **Folheto / Roteiro da Missa** (escala completa com textos, orações e links).
    2. **Apenas Músicas (Repertório)** (lista condensada de cantos, tons e cantores escalados).
    3. **Liturgia Diária (API)** (permite consultar as leituras bíblicas oficiais da API daquele dia sem perder a escala do evento).
- **Filtro Anual de Eventos**: No filtro de meses da agenda, a opção **"Todos"** lista todos os eventos cadastrados no ano inteiro no dropdown de escolhas rápidos.

### 2. Cores e Identidade Visual (Cores Litúrgicas)
- O banner principal da página inicial é **dinâmico** e adapta suas cores (fundo, texto e detalhes) conforme a cor litúrgica oficial retornada pela API de Liturgia para o dia selecionado:
  - **Verde**: Tempo Comum (fundo verde escuro com detalhes em dourado).
  - **Branco/Dourado**: Solenidades, Festas e Tempo Pascal (fundo branco/creme com textos escuros e detalhes dourados).
  - **Vermelho**: Domingos da Paixão, Sexta-feira Santa, Pentecostes e Mártires (fundo vermelho escuro com detalhes dourados).
  - **Roxo**: Quaresma e Advento (fundo roxo escuro com detalhes dourados).
  - **Rosa**: Domingos Gaudete e Laetare (fundo rosa antigo/queimado com textos escuros).
  - **Preto**: Missa de Defuntos (fundo escuro de alto contraste).

### 3. Visualizador de Cifras (Leitor de Cifras)
- **Wake Lock**: Quando uma cifra é aberta para leitura, o sistema solicita a ativação do *Wake Lock* do dispositivo, impedindo que a tela do tablet ou celular apague ou bloqueie durante a execução da música.
- **Transposição de Tom**: O usuário pode transpor o tom da cifra para cima ou para baixo (ex: subir meio tom ou descer um tom) dinamicamente na tela através dos botões `+` e `-`. Isso é temporário para a visualização atual do músico e não altera o tom padrão cadastrado no banco de dados.
- **Ajustes de Visualização**: É possível aumentar/diminuir o tamanho da fonte e ocultar totalmente os acordes cifrados (modo apenas letra).
- **Rolagem Automática (Auto-scroll)**: Possui funcionalidade de rolagem de tela inteligente com controle de velocidade deslizante para que o músico toque sem precisar usar as mãos para rolar a tela.
- **Modo Palco (Stage Mode)**: Alterna o visualizador para um tema escuro absoluto de alto contraste (letras claras em fundo preto), minimizando a emissão de luz no presbitério e poupando bateria.

### 4. Persistência de Dados (Banco de Dados)
- O portal utiliza um banco de dados local armazenado no navegador (`localStorage`) sob a chave `ministerio_db` para salvar as edições rápidas do usuário de forma offline.
- Caso o `localStorage` esteja vazio, o portal carrega os dados originais de exemplo definidos em `database.json`.
- O administrador tem controle total sobre os dados, podendo realizar exportação (`backup`), importação (`restore`) ou redefinir tudo para os padrões de fábrica.

---

## 🛠️ Funcionalidades Implementadas

### 💻 Página Inicial & Agenda
- Cabeçalho de agenda em formato **inline de linha única** (Data, Mês, Evento) otimizado para economizar espaço de tela em computadores e tablets.
- Exibição de leituras bíblicas completas (1ª Leitura, Salmo, 2ª Leitura e Evangelho) com quebra de linha correta e espaçamento elegante.
- Cores litúrgicas dinâmicas mapeadas nos banners e cartões.

### 🎶 Repertório de Músicas
- Visualização de todas as músicas cadastradas com pesquisa em tempo real por título, tom ou tags.
- Cadastro e edição de músicas completas contendo título, tom padrão, tags (ex: Entrada, Comunhão), link do YouTube e letra com acordes no padrão de colchetes `[C] [G]` para facilitar a renderização e transposição.

### ⛪ Painel Administrativo
- **Nova Celebração**: Formulário para criar novas missas especificando data, título, local, playlist de ensaio e observações.
- **Editor de Roteiro**:
  - Ordenação arrastável/clicável (subir e descer momentos da missa).
  - Adicionar/Remover momentos litúrgicos personalizados.
  - Escalar cantores, instrumentos ou observações para cada canto da missa.
  - Modificar localmente as leituras bíblicas associadas àquela missa em específico.
- **Backup e Restauração**:
  - Botão de exportar dados atuais em formato `.json`.
  - Botão de importar arquivo `.json` externo.
  - Botão de resetar dados para os padrões de fábrica do ministério.

---

## 📂 Estrutura do Projeto

O projeto é construído em HTML5 sem frameworks pesados, garantindo carregamento instantâneo e facilidade de manutenção:

```
ministerio-chave-de-davi/
├── css/
│   └── style.css          # Estilos globais, painéis, modais e transições
├── js/
│   └── ministerio.js     # Lógica do app, gerenciamento do estado, cifra e API
├── database.json          # Banco de dados inicial padrão do sistema
├── index.html             # Estrutura principal da página única (Single Page App)
└── README.md              # Este manual de referência do projeto
```

---

## 🌐 Tecnologias Utilizadas
- **HTML5 & CSS3 Vanilla** (Variáveis CSS estruturadas para suportar dark-mode e cores litúrgicas).
- **JavaScript ES6** (Manipulação assíncrona da DOM, APIs de Fetch e Wake Lock).
- **FontAwesome Icons** (Biblioteca de ícones vetorizados para interface premium).
- **API Litúrgica** (`https://liturgia.up.railway.app/v2/`): Fornece os textos diários e cores oficiais de cada dia do ano civil católico.
