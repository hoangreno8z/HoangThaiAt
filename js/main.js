/**
 * MAIN CONTROLLER & APPLICATION ORCHESTRATOR
 * Tích hợp toàn bộ hệ thống tri thức, D3 Antigravity Graph, Trống Đồng Đông Sơn,
 * Bộ tổng hợp âm thanh Web Audio và Thư viện Icon Code (KHÔNG EMOJI).
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBell(freq = 432) {
    if (!this.enabled) return;
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    } catch (e) {
      console.warn("Web Audio context requires user touch/click interaction first.");
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const soundCtrl = new SoundController();
  window.soundCtrl = soundCtrl;

  // 1. Audio Toggle Button with SVG Icon (No Emoji)
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    const updateAudioBtnUI = () => {
      audioBtn.innerHTML = soundCtrl.enabled
        ? `${renderIcon('bellOn', 16, '#E5C07B')} <span>Âm Thanh: BẬT</span>`
        : `${renderIcon('bellOff', 16, '#94A3B8')} <span>Âm Thanh: TẮT</span>`;
      audioBtn.style.borderColor = soundCtrl.enabled ? 'var(--gold-primary)' : 'var(--border-subtle)';
    };
    updateAudioBtnUI();

    audioBtn.addEventListener('click', () => {
      soundCtrl.toggle();
      updateAudioBtnUI();
      if (soundCtrl.enabled) soundCtrl.playBell(528);
    });
  }

  // 2. Chronological Timeline Renderer (100% Tiếng Việt theo dòng thời gian)
  const timelineTrack = document.getElementById('timeline-track');
  if (timelineTrack && COSMIC_DATA.timeline) {
    timelineTrack.innerHTML = COSMIC_DATA.timeline.map((item, idx) => `
      <div class="timeline-node-card">
        <div class="timeline-marker">
          <span class="timeline-order">0${idx + 1}</span>
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content-card">
          <div class="timeline-meta-row">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-category-tag">${item.category}</span>
          </div>
          <h3 class="timeline-era-title">${item.era}</h3>
          <h4 class="timeline-node-title">${item.title}</h4>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 3. Genesis Stages Controller
  const genesisGrid = document.getElementById('genesis-grid');
  const stageDetail = document.getElementById('stage-detail');

  if (genesisGrid && stageDetail) {
    const stages = COSMIC_DATA.genesis.stages;
    genesisGrid.innerHTML = stages.map((stage, idx) => `
      <div class="genesis-card ${idx === 0 ? 'active' : ''}" data-id="${stage.id}" onclick="selectGenesisStage('${stage.id}')">
        <div class="card-step">Giai Đoạn ${idx + 1}</div>
        <div class="card-icon">
          ${stage.id === 'taiji' ? renderIcon('taiji', 42) : renderIcon('dongSonStar', 38)}
        </div>
        <div class="card-title">${stage.name}</div>
        <div class="card-hanzi">${stage.hanzi}</div>
        <div class="card-brief">${stage.title}</div>
      </div>
    `).join('');

    window.selectGenesisStage = function(stageId) {
      soundCtrl.playBell(432);
      document.querySelectorAll('.genesis-card').forEach(c => {
        c.classList.toggle('active', c.dataset.id === stageId);
      });

      const st = stages.find(s => s.id === stageId);
      if (!st) return;

      stageDetail.innerHTML = `
        <div>
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:0.5rem;">
            <div style="width:50px; height:50px; display:flex; align-items:center; justify-content:center;">
              ${renderIcon('taiji', 46)}
            </div>
            <div>
              <h3 style="font-family:var(--font-title); font-size:1.8rem; color:var(--text-pure);">${st.name} (${st.hanzi})</h3>
              <p style="color:var(--gold-primary); font-size:0.9rem;">${st.title}</p>
            </div>
          </div>
          <div class="quote-highlight">${st.quote}</div>
          <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.7; margin-bottom:1rem;">
            ${st.desc}
          </p>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:12px; padding:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1rem; color:var(--jade-cyan); margin-bottom:0.8rem; text-transform:uppercase; letter-spacing:1px;">
            Nguyên Lý Vận Hành Cốt Lõi:
          </h4>
          <p style="color:var(--text-pure); font-size:0.95rem; line-height:1.7;">
            ${st.principle}
          </p>
        </div>
      `;
    };

    window.selectGenesisStage(stages[0].id);
  }

  // 3. Đại Luận Thuyết Chuyên Sâu Renderer (6 Chương Đại Học Thuật)
  const treatisesContainer = document.getElementById('treatises-container');
  if (treatisesContainer && COSMIC_DATA.treatises) {
    treatisesContainer.innerHTML = COSMIC_DATA.treatises.map((tr, idx) => `
      <div class="treatise-card ${idx === 0 ? 'active' : ''}" id="treatise-${tr.id}">
        <div class="treatise-header" onclick="toggleTreatise('${tr.id}')">
          <div style="display:flex; align-items:center; gap:1rem;">
            <span class="treatise-number">${tr.number}</span>
            <div>
              <h3 class="treatise-title">${tr.title}</h3>
              <span class="treatise-author">${tr.author}</span>
            </div>
          </div>
          <div class="treatise-toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="treatise-body">
          <div class="treatise-content-wrap">
            ${tr.content}
          </div>
        </div>
      </div>
    `).join('');

    window.toggleTreatise = function(id) {
      soundCtrl.playBell(528);
      const card = document.getElementById(`treatise-${id}`);
      if (card) {
        card.classList.toggle('active');
      }
    };
  }

  // 4. Initialize Trống Đồng Đông Sơn Engine
  const trongDongEngine = new TrongDongEngine('trongdong-svg-wrap', 'trongdong-detail-display');
  window.trongDongEngine = trongDongEngine;

  // 4. Initialize Antigravity Knowledge Graph (D3.js)
  const antigravityGraph = new AntigravityGraph('graph-container', 'graph-drawer');
  window.antigravityGraph = antigravityGraph;

  // Antigravity Filter Buttons
  document.querySelectorAll('.graph-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      soundCtrl.playBell(480);
      document.querySelectorAll('.graph-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      antigravityGraph.filterGroup(btn.dataset.group);
    });
  });

  const resetGraphBtn = document.getElementById('btn-reset-graph');
  if (resetGraphBtn) {
    resetGraphBtn.addEventListener('click', () => {
      soundCtrl.playBell(528);
      antigravityGraph.resetView();
    });
  }

  // 5. Hà Đồ & Lạc Thư Visualizer
  const haDoCanvas = new HaDoVisualizer('hado-canvas');
  window.haDoCanvas = haDoCanvas;

  const haDoPairs = document.getElementById('hado-pairs');
  if (haDoPairs) {
    haDoPairs.innerHTML = COSMIC_DATA.ha_do.formula.map(f => `
      <div class="hado-pair-item" onclick="highlightHaDoPair('${f.pair}')" style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:0.8rem 1rem; border-radius:8px; margin-bottom:0.5rem; cursor:pointer; transition:all 0.25s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:var(--gold-primary); font-size:0.9rem;">Cặp ${f.pair} (${f.element})</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">${f.direction}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-pure); margin-top:0.2rem;">${f.text}</div>
        <div style="font-size:0.75rem; color:var(--gold-dark); font-family:'Ma Shan Zheng', cursive;">${f.hanzi}</div>
      </div>
    `).join('');

    window.highlightHaDoPair = function(pair) {
      soundCtrl.playBell(528);
      haDoCanvas.draw(pair);
    };
  }

  const lacThuCtrl = new LacThuController('lacthu-grid', 'lacthu-info');

  // 6. Bát Quái Simulator
  const baguaSim = new BatQuaiSimulator('bagua-svg-wrap', 'bagua-detail-display');
  window.baguaSim = baguaSim;

  const tabTienThien = document.getElementById('tab-tienthien');
  const tabHauThien = document.getElementById('tab-hauthien');
  if (tabTienThien && tabHauThien) {
    tabTienThien.addEventListener('click', () => {
      soundCtrl.playBell(432);
      tabTienThien.classList.add('active');
      tabHauThien.classList.remove('active');
      baguaSim.switchType('tien_thien');
    });
    tabHauThien.addEventListener('click', () => {
      soundCtrl.playBell(576);
      tabHauThien.classList.add('active');
      tabTienThien.classList.remove('active');
      baguaSim.switchType('hau_thien');
    });
  }

  // 7. Ngũ Hành Engine
  const nguHanhEngine = new NguHanhEngine('wuxing-canvas', 'wuxing-info-panel');
  window.nguHanhEngine = nguHanhEngine;

  document.querySelectorAll('.cycle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      soundCtrl.playBell(480);
      document.querySelectorAll('.cycle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      nguHanhEngine.setCycle(btn.dataset.cycle);
    });
  });

  // 8. Cát Hung Matrix Simulator
  const catHungEngine = new CatHungMatrixEngine({
    thien: 'select-thien',
    dia: 'select-dia',
    nhan: 'select-nhan'
  }, 'resonance-result-display');

  // 9. Open Data Repositories & Scraper Code Render
  const repoGrid = document.getElementById('repos-grid');
  const scraperCodeBox = document.getElementById('scraper-code-box');

  if (repoGrid) {
    repoGrid.innerHTML = COSMIC_DATA.data_sources.repositories.map((repo, idx) => `
      <div class="repo-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
          <span style="font-family:var(--font-sans); font-size:0.75rem; color:var(--jade-cyan); border:1px solid rgba(45,212,191,0.3); padding:0.2rem 0.6rem; border-radius:12px;">Kho Lưu Trữ 0${idx + 1}</span>
          <a href="${repo.url}" target="_blank" rel="noopener noreferrer" style="color:var(--gold-primary); text-decoration:none; font-size:0.8rem; display:flex; align-items:center; gap:0.3rem;">
            <span>Truy Cập</span> ${renderIcon('arrowRight', 12)}
          </a>
        </div>
        <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--text-pure); margin-bottom:0.4rem;">${repo.name}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:0.8rem;">${repo.desc}</p>
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem 0.8rem; border-radius:6px; font-size:0.8rem; color:var(--gold-primary);">
          <strong>Gợi ý API:</strong> ${repo.api_tip}
        </div>
      </div>
    `).join('');
  }

  if (scraperCodeBox) {
    scraperCodeBox.textContent = COSMIC_DATA.data_sources.scraper_example_code;
  }

  // 10. Classics Library Filter & Search
  const quotesGrid = document.getElementById('classics-grid');
  const searchInput = document.getElementById('classics-search');

  function renderClassics(filterQuery = '') {
    if (!quotesGrid) return;
    const query = filterQuery.toLowerCase().trim();
    const filtered = COSMIC_DATA.classics.filter(item => {
      return item.source.toLowerCase().includes(query) ||
             item.trans.toLowerCase().includes(query) ||
             item.meaning.toLowerCase().includes(query) ||
             item.tag.toLowerCase().includes(query);
    });

    quotesGrid.innerHTML = filtered.map(q => `
      <div class="quote-card">
        <div class="quote-source">
          <span style="display:flex; align-items:center; gap:0.4rem;">
            ${renderIcon('book', 14)} <span>${q.source}</span>
          </span>
          <span style="color:var(--jade-cyan); font-size:0.75rem; border:1px solid rgba(45,212,191,0.3); padding:0.1rem 0.5rem; border-radius:10px;">${q.tag}</span>
        </div>
        <div class="quote-hanzi">${q.original}</div>
        <div class="quote-trans">"${q.trans}"</div>
        <div class="quote-meaning">${q.meaning}</div>
      </div>
    `).join('');
  }

  renderClassics();
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderClassics(e.target.value);
    });
  }

  // 11. Mobile Navigation & Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-dock-btn');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
