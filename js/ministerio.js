// Sistema Litúrgico - Ministério de Música
class SistemaLiturgico {
    constructor() {
        this.config = null;
        this.missas = [];
        this.musicas = [];
        this.currentMissa = null;
        this.currentPage = 'home';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadConfig();
        await this.loadAllMissas();
        await this.loadAllMusicas();
        this.updateUI();
        this.showPage('home');
    }

    // Carregar configurações
    async loadConfig() {
        try {
            const response = await fetch('ministerioconfiguracoes.json');
            this.config = await response.json();
            this.applyTheme(this.config.theme || 'light');
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            this.config = {
                theme: 'light',
                colors: {
                    branco: '#FFFFFF',
                    vermelho: '#FF0000',
                    verde: '#008000',
                    roxo: '#800080',
                    rosa: '#FFC0CB',
                    preto: '#000000'
                }
            };
        }
    }

    // Carregar todas as missas
    async loadAllMissas() {
        try {
            const response = await fetch('missas/index.json');
            const data = await response.json();
            this.missas = data.missas || [];
            
            // Atualizar contadores
            document.getElementById('total-missas').textContent = this.missas.length;
            
            if (this.missas.length > 0) {
                const nextMissa = this.missas[0]; // Simplificado - ordenar por data
                document.getElementById('proxima-missa').textContent = 
                    `${nextMissa.data} - ${nextMissa.titulo}`;
            }
        } catch (error) {
            console.error('Erro ao carregar missas:', error);
            this.missas = [];
        }
    }

    // Carregar todas as músicas
    async loadAllMusicas() {
        try {
            const response = await fetch('musicas-todas/index.json');
            const data = await response.json();
            this.musicas = data.musicas || [];
            
            // Atualizar contador
            document.getElementById('total-musicas').textContent = this.musicas.length;
            
            // Popular filtros
            this.populateFilters();
        } catch (error) {
            console.error('Erro ao carregar músicas:', error);
            this.musicas = [];
        }
    }

    // Carregar missa específica
    async loadMissa(date) {
        try {
            const formattedDate = date.replace(/\//g, '');
            const response = await fetch(`missas/${formattedDate}/config.json`);
            const missaData = await response.json();
            
            this.currentMissa = missaData;
            this.displayMissa(missaData);
            
            // Carregar liturgia
            await this.loadLiturgia(formattedDate);
            
            // Carregar músicas da missa
            await this.loadMusicasMissa(formattedDate);
        } catch (error) {
            console.error('Erro ao carregar missa:', error);
            this.showNotification('Erro ao carregar missa', 'error');
        }
    }

    async loadLiturgia(date) {
        try {
            const response = await fetch(`missas/${date}/liturgia.json`);
            const liturgia = await response.json();
            this.displayLiturgia(liturgia);
        } catch (error) {
            console.error('Erro ao carregar liturgia:', error);
        }
    }

    async loadMusicasMissa(date) {
        try {
            const response = await fetch(`missas/${date}/musicas/index.json`);
            const musicas = await response.json();
            this.displayMusicasMissa(musicas);
        } catch (error) {
            console.error('Erro ao carregar músicas:', error);
        }
    }

    // Display functions
    displayMissa(missaData) {
        const colorElement = document.getElementById('liturgical-color-indicator');
        const colorName = missaData.cor_liturgica || 'branco';
        const colorValue = this.config.colors[colorName] || '#FFFFFF';
        
        // Atualizar indicador de cor
        colorElement.style.backgroundColor = colorValue;
        colorElement.querySelector('#color-name').textContent = colorName;
        
        // Atualizar informações
        document.getElementById('missa-title').textContent = missaData.titulo;
        document.getElementById('missa-subtitle').textContent = missaData.subtitulo;
        document.getElementById('missa-data').textContent = missaData.data;
        document.getElementById('missa-cor').textContent = colorName;
        document.getElementById('missa-tipo').textContent = missaData.tipo;
    }

    displayLiturgia(liturgia) {
        const container = document.getElementById('liturgia-content');
        container.innerHTML = '';
        
        liturgia.momentos.forEach(momento => {
            const momentoDiv = document.createElement('div');
            momentoDiv.className = 'liturgia-momento';
            
            momentoDiv.innerHTML = `
                <div class="momento-header" onclick="this.classList.toggle('expanded')">
                    <h4>${momento.titulo}</h4>
                    <span class="momento-arrow">▼</span>
                </div>
                <div class="momento-content">
                    ${momento.conteudo.replace(/\n/g, '<br>')}
                </div>
            `;
            
            container.appendChild(momentoDiv);
        });
    }

    async displayMusicasMissa(musicasList) {
        const container = document.getElementById('musicas-missa');
        container.innerHTML = '';
        
        for (const musicaFile of musicasList.files) {
            try {
                const response = await fetch(`missas/${this.currentMissa.data.replace(/\//g, '')}/musicas/${musicaFile}`);
                const musica = await response.json();
                
                const musicaDiv = document.createElement('div');
                musicaDiv.className = 'musica-item';
                musicaDiv.innerHTML = `
                    <div class="musica-header" onclick="this.parentElement.querySelector('.musica-lyrics').classList.toggle('show')">
                        <div class="musica-title">${musica.nomeMusica}</div>
                        <div class="musica-info">
                            <span><i class="fas fa-user"></i> ${musica.bandaCantor || ''}</span>
                            <span><i class="fas fa-music"></i> ${musica.tom}</span>
                            <span><i class="fas fa-clock"></i> ${musica.momentoMissa}</span>
                        </div>
                    </div>
                    <div class="musica-lyrics">
                        ${this.formatLyrics(musica.musica)}
                    </div>
                `;
                
                container.appendChild(musicaDiv);
            } catch (error) {
                console.error('Erro ao carregar música:', error);
            }
        }
    }

    // Mostrar todas as músicas
    displayTodasMusicas() {
        const container = document.getElementById('todas-musicas-grid');
        const searchTerm = document.getElementById('search-musica').value.toLowerCase();
        const filterMomento = document.getElementById('filter-momento').value;
        const filterTom = document.getElementById('filter-tom').value;
        
        container.innerHTML = '';
        
        const filteredMusicas = this.musicas.filter(musica => {
            const matchesSearch = 
                musica.nomeMusica.toLowerCase().includes(searchTerm) ||
                musica.bandaCantor?.toLowerCase().includes(searchTerm) ||
                musica.musica?.toLowerCase().includes(searchTerm);
            
            const matchesMomento = !filterMomento || musica.momentoMissa === filterMomento;
            const matchesTom = !filterTom || musica.tom === filterTom;
            
            return matchesSearch && matchesMomento && matchesTom;
        });
        
        filteredMusicas.forEach(musica => {
            const card = document.createElement('div');
            card.className = 'musica-card';
            card.innerHTML = `
                <h4>${musica.nomeMusica}</h4>
                <p><i class="fas fa-user"></i> ${musica.bandaCantor || 'Desconhecido'}</p>
                <p><i class="fas fa-calendar-alt"></i> ${musica.momentoMissa}</p>
                <div class="card-info">
                    <span>Tom: ${musica.tom}</span>
                    <span class="tom-badge">${musica.tom}</span>
                </div>
            `;
            
            card.addEventListener('click', () => this.showMusicModal(musica));
            container.appendChild(card);
        });
    }

    // Mostrar todas as missas
    displayTodasMissas() {
        const container = document.getElementById('missas-grid');
        container.innerHTML = '';
        
        this.missas.forEach(missa => {
            const card = document.createElement('div');
            card.className = 'missa-card';
            card.style.borderLeftColor = this.config.colors[missa.cor_liturgica] || '#FFFFFF';
            
            card.innerHTML = `
                <h4>${missa.titulo}</h4>
                <div class="missa-date">${missa.data}</div>
                <div class="missa-info">
                    <p>${missa.subtitulo}</p>
                    <p><strong>Cor:</strong> ${missa.cor_liturgica}</p>
                    <p><strong>Tipo:</strong> ${missa.tipo}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.loadMissa(missa.data);
                this.showPage('missa-hoje');
            });
            
            container.appendChild(card);
        });
    }

    // Modal para visualizar música
    showMusicModal(musica) {
        document.getElementById('modal-title').textContent = musica.nomeMusica;
        document.getElementById('modal-body').innerHTML = `
            <div class="modal-musica-info">
                <p><strong>Banda/Cantor:</strong> ${musica.bandaCantor || 'Desconhecido'}</p>
                <p><strong>Tom:</strong> ${musica.tom}</p>
                <p><strong>Momento:</strong> ${musica.momentoMissa}</p>
            </div>
            <div class="modal-musica-lyrics">
                ${this.formatLyrics(musica.musica)}
            </div>
        `;
        
        document.getElementById('music-modal').classList.add('active');
    }

    // Formatar letras com acordes
    formatLyrics(text) {
        return text
            .replace(/\[(.*?)\]/g, '<span class="chord">[$1]</span>')
            .replace(/\n/g, '<br>');
    }

    // Populate filters
    populateFilters() {
        const momentos = [...new Set(this.musicas.map(m => m.momentoMissa))];
        const filterSelect = document.getElementById('filter-momento');
        
        momentos.forEach(momento => {
            const option = document.createElement('option');
            option.value = momento;
            option.textContent = momento;
            filterSelect.appendChild(option);
        });
    }

    // Navegação entre páginas
    showPage(pageId) {
        // Remover classe active de todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Remover classe active de todos os links
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('nav-active');
        });
        
        // Adicionar classes active
        document.getElementById(pageId).classList.add('active');
        document.querySelector(`.main-nav a[href="#${pageId}"]`).classList.add('nav-active');
        
        this.currentPage = pageId;
        
        // Executar ações específicas da página
        switch(pageId) {
            case 'todas-musicas':
                this.displayTodasMusicas();
                break;
            case 'todas-missas':
                this.displayTodasMissas();
                break;
            case 'missa-hoje':
                // Carregar missa do dia atual
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('missa-date').value = today;
                this.loadMissa(today);
                break;
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Navegação
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('href').substring(1);
                this.showPage(pageId);
            });
        });
        
        // Tema
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
        });
        
        // Carregar missa
        document.getElementById('load-missa').addEventListener('click', () => {
            const date = document.getElementById('missa-date').value;
            this.loadMissa(date);
        });
        
        // Busca de músicas
        document.getElementById('search-musica').addEventListener('input', () => {
            this.displayTodasMusicas();
        });
        
        document.getElementById('filter-momento').addEventListener('change', () => {
            this.displayTodasMusicas();
        });
        
        document.getElementById('filter-tom').addEventListener('change', () => {
            this.displayTodasMusicas();
        });
        
        // Nova missa
        document.getElementById('nova-missa').addEventListener('click', () => {
            document.getElementById('new-missa-modal').classList.add('active');
        });
        
        // Fechar modais
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('active');
            });
        });
        
        // Formulário nova missa
        document.getElementById('new-missa-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewMissa();
        });
        
        // Configurações
        document.getElementById('auto-expand').addEventListener('change', (e) => {
            this.config.autoExpand = e.target.checked;
            this.saveConfig();
        });
        
        document.getElementById('show-chords').addEventListener('change', (e) => {
            this.config.showChords = e.target.checked;
            this.saveConfig();
        });
        
        document.getElementById('font-size').addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--font-size', `${e.target.value}px`);
            document.getElementById('font-size-value').textContent = `${e.target.value}px`;
            this.config.fontSize = e.target.value;
            this.saveConfig();
        });
        
        // Cores litúrgicas
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                this.config.colors[color] = option.style.backgroundColor;
                this.saveConfig();
                this.showNotification('Cor atualizada', 'success');
            });
        });
    }

    // Aplicar tema
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.config.theme = theme;
        this.saveConfig();
        
        const icon = document.querySelector('#theme-toggle i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Criar nova missa
    async createNewMissa() {
        const formData = {
            data: document.getElementById('new-missa-date').value,
            titulo: document.getElementById('new-missa-title').value,
            subtitulo: document.getElementById('new-missa-subtitle').value,
            cor_liturgica: document.getElementById('new-missa-color').value,
            tipo: document.getElementById('new-missa-type').value
        };
        
        // Aqui você implementaria a lógica para salvar no servidor
        console.log('Nova missa:', formData);
        this.showNotification('Missa criada com sucesso!', 'success');
        document.getElementById('new-missa-modal').classList.remove('active');
        
        // Recarregar lista de missas
        await this.loadAllMissas();
    }

    // Salvar configurações
    async saveConfig() {
        try {
            // Em produção, enviaria para o servidor
            localStorage.setItem('liturgy-config', JSON.stringify(this.config));
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
        }
    }

    // Notificações
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Atualizar UI
    updateUI() {
        // Data atual
        const now = new Date();
        document.getElementById('current-date').textContent = 
            now.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        
        // Configurações salvas
        if (this.config.fontSize) {
            document.documentElement.style.setProperty('--font-size', `${this.config.fontSize}px`);
            document.getElementById('font-size').value = this.config.fontSize;
            document.getElementById('font-size-value').textContent = `${this.config.fontSize}px`;
        }
        
        if (this.config.autoExpand !== undefined) {
            document.getElementById('auto-expand').checked = this.config.autoExpand;
        }
        
        if (this.config.showChords !== undefined) {
            document.getElementById('show-chords').checked = this.config.showChords;
        }
    }
}

// Inicializar sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.sistemaLiturgico = new SistemaLiturgico();
});