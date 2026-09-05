// =========================================================================
// HUYỀN HỌC MỤ — CLIENT-SIDE SPA ROUTER & 3-GATE SHELL CONTROLLER
// =========================================================================

class LibraryRouter {
  constructor() {
    this.currentRoute = '';
    this.routes = {
      '': () => this.renderLobby(),
      'lobby': () => this.renderLobby(),
      'learn': (params) => this.renderLearn(params),
      'thu-vien': (params) => this.renderDuongTrach(params),
      'duong-trach': (params) => this.renderDuongTrach({ ...params, segments: ['duong-trach', ...(params.segments || [])] }),
      'tools': (params) => this.renderTools(params),
      'loban': (params) => this.renderTools({ segments: ['loban'] }),
      'thuoc-lo-ban': (params) => this.renderTools({ segments: ['loban'] }),
      'thienvankymon': (params) => this.renderTools({ segments: ['thienvankymon'] }),
      'thai-duong': (params) => this.renderTools({ segments: ['thienvankymon'] }),
      'hoagiaicothu': (params) => this.renderTools({ segments: ['hoagiaicothu'] }),
      'hoa-giai': (params) => this.renderTools({ segments: ['hoagiaicothu'] }),
      'diachat64': (params) => this.renderTools({ segments: ['diachat64'] }),
      'dia-chat': (params) => this.renderTools({ segments: ['diachat64'] }),
      'goiythietke': (params) => this.renderTools({ segments: ['goiythietke'] }),
      'goi-y-thiet-ke': (params) => this.renderTools({ segments: ['goiythietke'] }),
'lakinh': (params) => this.renderTools({ segments: ['lakinhbando'] }),
      'la-kinh': (params) => this.renderTools({ segments: ['lakinhbando'] }),
      'lakinhbando': (params) => this.renderTools({ segments: ['lakinhbando'] }),
      'la-kinh-ban-do': (params) => this.renderTools({ segments: ['lakinhbando'] }),
    };
    
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.handleHashChange());

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

  // GATE 2: CÔNG CỤ (TOOLS)
  renderTools(params) {
    this.showGate('gate-tools');
    document.title = "Bàn Tính & Công Cụ Cổ Điển — Huyền Học Mụ";
    const tab = (params && params.segments && params.segments[0]) ? params.segments[0] : 'loban';
    if (window.toolUI && typeof window.toolUI.render === 'function') {
      window.toolUI.render(tab);
    }
  }

  renderDuongTrach(params) {
    this.showGate('gate-duong-trach');
    document.title = "Thư Viện Dương Trạch Có Nguồn — Huyền Học Mụ";
    if (window.duongTrachLibrary && typeof window.duongTrachLibrary.render === 'function') {
      window.duongTrachLibrary.render(params || { segments: ['duong-trach'], query: new URLSearchParams() });
    }
  }
}

// Khởi tạo router toàn cục
window.libraryRouter = new LibraryRouter();
