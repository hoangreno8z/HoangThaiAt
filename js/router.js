// =========================================================================
// HUYỀN HỌC MỤ — CLIENT-SIDE SPA ROUTER & 5-GATE SHELL CONTROLLER (PHASE 2)
// =========================================================================

class LibraryRouter {
  constructor() {
    this.currentRoute = '';
    this.currentMode = 'reading'; // 'reading' | 'research' | 'tool'
    this.routes = {
      '': () => this.renderLobby(),
      'lobby': () => this.renderLobby(),
      'learn': (params) => this.renderLearn(params),
      'library': (params) => this.renderLibrary(params),
      'search': (params) => this.renderSearch(params),
      'research': (params) => this.renderResearch(params),
      'tools': (params) => this.renderTools(params),
      'hoagiaicothu': (params) => this.renderTools({ segments: ['hoagiaicothu'] }),
      'hoa-giai': (params) => this.renderTools({ segments: ['hoagiaicothu'] }),
      'diachat64': (params) => this.renderTools({ segments: ['diachat64'] }),
      'dia-chat': (params) => this.renderTools({ segments: ['diachat64'] })
    };
    
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.handleHashChange());
    
    // Bind Mode Toggles
    const modeBtn = document.getElementById('view-mode-toggle');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => this.toggleViewMode());
    }

    // Bind Big Search in Lobby
    const bigSearch = document.getElementById('lobby-big-search');
    if (bigSearch) {
      bigSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && bigSearch.value.trim()) {
          this.navigateTo(`/search?q=${encodeURIComponent(bigSearch.value.trim())}`);
        }
      });
    }

    const groupedSearch = document.getElementById('grouped-search-input');
    if (groupedSearch) {
      groupedSearch.addEventListener('input', (e) => {
        if (typeof window.executeGroupedSearch === 'function') {
          window.executeGroupedSearch(e.target.value.trim());
        }
      });
    }

    // Bind Quick Nav items
    document.querySelectorAll('.nav-gate-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          this.navigateTo(href.substring(1));
        }
      });
    });
  }

  navigateTo(path) {
    window.location.hash = path.startsWith('/') ? path : '/' + path;
  }

  handleHashChange() {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    const [pathPart, queryPart] = rawHash.split('?');
    const segments = pathPart.split('/').filter(Boolean);
    const gate = segments[0] || 'lobby';
    const params = {
      subPath: segments.slice(1).join('/'),
      segments: segments.slice(1),
      query: new URLSearchParams(queryPart || '')
    };

    this.currentRoute = gate;
    this.updateActiveNav(gate);
    this.hideAllGates();

    if (this.routes[gate]) {
      this.routes[gate](params);
    } else {
      this.renderLobby();
    }

    // Scroll to top of main container on view change
    const mainContainer = document.querySelector('.main-wrapper') || window;
    if (mainContainer.scrollTo) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateActiveNav(gate) {
    document.querySelectorAll('.nav-gate-link').forEach(el => {
      const target = el.getAttribute('data-gate');
      if (target === gate || (gate === 'lobby' && target === '')) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  hideAllGates() {
    document.querySelectorAll('.app-gate-view').forEach(view => {
      view.style.display = 'none';
    });
  }

  showGate(gateId) {
    const el = document.getElementById(gateId);
    if (el) {
      el.style.display = 'block';
    }
  }

  toggleViewMode() {
    this.currentMode = this.currentMode === 'reading' ? 'research' : 'reading';
    const btn = document.getElementById('view-mode-toggle');
    const rightPane = document.getElementById('shell-right-pane');
    
    if (btn) {
      btn.innerHTML = this.currentMode === 'reading' 
        ? '<span>📖 Chế Độ Đọc</span>' 
        : '<span>⚖️ Chế Độ Khảo Cứu</span>';
    }

    if (rightPane) {
      rightPane.style.display = this.currentMode === 'research' ? 'block' : 'none';
    }
  }

  // GATE 0: SẢNH THƯ VIỆN (LOBBY)
  renderLobby() {
    this.showGate('gate-lobby');
    document.title = "Huyền Học Mụ — Sảnh Thư Viện Số Địa Lý & Dịch Học Cổ Điển";
  }

  // GATE 1: HỌC (LEARN)
  renderLearn(params) {
    this.showGate('gate-learn');
    document.title = "Học Tập Theo Giáo Trình — Huyền Học Mụ";
    if (typeof window.loadLearningTrack === 'function') {
      const track = (params && params.segments && params.segments[0]) ? params.segments[0] : null;
      const lesson = (params && params.segments && params.segments[1]) ? params.segments[1] : '1';
      window.loadLearningTrack(track, lesson);
    }
  }

  // GATE 2: THƯ TỊCH (LIBRARY)
  renderLibrary(params) {
    this.showGate('gate-library');
    document.title = "Thư Khố Cổ Điển — Huyền Học Mụ";
    if (typeof window.loadLibraryBook === 'function') {
      const book = (params && params.segments && params.segments[0]) ? params.segments[0] : null;
      const chapter = (params && params.segments && params.segments[1]) ? params.segments[1] : '1';
      window.loadLibraryBook(book, chapter);
    }
  }

  // GATE 3: TRA CỨU (SEARCH)
  renderSearch(params) {
    this.showGate('gate-search');
    document.title = "Tra Cứu Đa Chiều — Huyền Học Mụ";
    const q = params.query.get('q');
    if (q && typeof window.executeGroupedSearch === 'function') {
      window.executeGroupedSearch(q);
    }
  }

  // GATE 4: KHẢO CỨU (RESEARCH)
  renderResearch(params) {
    this.showGate('gate-research');
    document.title = "Khảo Cứu & Đồ Hình Tri Thức — Huyền Học Mụ";
    if (window.evidenceGraphUI && typeof window.evidenceGraphUI.render === 'function') {
      window.evidenceGraphUI.render('graph');
    } else if (window.researchUI && typeof window.researchUI.renderPanel === 'function') {
      window.researchUI.renderPanel();
    }
  }

  // GATE 5: CÔNG CỤ (TOOLS)
  renderTools(params) {
    this.showGate('gate-tools');
    document.title = "Địa Chất Đồ 64 Tỉnh Thành & Bàn Tính — Huyền Học Mụ";
    const tab = (params && params.segments && params.segments[0]) ? params.segments[0] : 'diachat64';
    if (window.toolUI && typeof window.toolUI.render === 'function') {
      window.toolUI.render(tab);
    }
  }
}

// Khởi tạo router toàn cục
window.libraryRouter = new LibraryRouter();
