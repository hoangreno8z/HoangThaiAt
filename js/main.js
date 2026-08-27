/**
 * BỘ ĐIỀU PHỐI ĐẠI BÁCH KHOA ĐỊA LÝ PHONG THỦY HỌC & THUẬT TOÁN CÀN KHÔN
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
      console.warn("Audio requires user interaction first.");
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

  // 1. Chuông Đồng Thanh Tịnh (Bật / Tắt)
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    const updateAudioBtnUI = () => {
      audioBtn.innerHTML = soundCtrl.enabled
        ? `${renderIcon('bellOn', 16, '#E5C07B')} <span>Chuông Đồng: BẬT</span>`
        : `${renderIcon('bellOff', 16, '#94A3B8')} <span>Chuông Đồng: TẮT</span>`;
      audioBtn.style.borderColor = soundCtrl.enabled ? 'var(--gold-primary)' : 'var(--border-subtle)';
    };
    updateAudioBtnUI();

    audioBtn.addEventListener('click', () => {
      soundCtrl.toggle();
      updateAudioBtnUI();
      if (soundCtrl.enabled) soundCtrl.playBell(528);
    });
  }

  // 2. MẠCH 1: Render Thư Tịch Cốt Lõi Địa Lý Phong Thủy
  const treatisesGrid = document.getElementById('geographic-treatises-grid');
  if (treatisesGrid && COSMIC_DATA.geographic_treatises) {
    treatisesGrid.innerHTML = COSMIC_DATA.geographic_treatises.map(t => `
      <div class="treatise-card active" style="margin-bottom:1.5rem;">
        <div class="treatise-header" style="background:rgba(13,17,26,0.85); border-bottom:1px solid var(--border-subtle);">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); background:rgba(45,212,191,0.1); padding:0.2rem 0.6rem; border-radius:10px; text-transform:uppercase;">${t.school}</span>
            <h3 class="treatise-title" style="margin-top:0.4rem; color:var(--gold-primary);">${t.title}</h3>
            <span class="treatise-author">${t.author} • ${t.role}</span>
          </div>
        </div>
        <div class="treatise-body" style="max-height:none; padding:1.5rem 2rem;">
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:1rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1.2rem;">
            <div style="font-size:0.75rem; color:var(--gold-primary); font-weight:700; text-transform:uppercase; margin-bottom:0.2rem;">Khẩu Quyết Kinh Điển:</div>
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic; line-height:1.6;">"${t.famous_quote}"</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">👉 ${t.quote_trans}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.88rem; color:var(--text-pure); line-height:1.7;">
            ${t.core_principles.map(p => `<div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.8rem 1rem; border-radius:8px;">• ${p}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 3. MẠCH 2: Khởi tạo Bộ Tính Toán Bát Trạch & Huyền Không Phi Tinh
  const batTrachEngine = new BatTrachEngine({
    year: 'battrach-year',
    gender: 'battrach-gender',
    direction: 'battrach-dir',
    btn: 'battrach-calc-btn'
  }, 'battrach-result-display');
  window.batTrachEngine = batTrachEngine;

  const huyenKhongEngine = new HuyenKhongEngine({
    period: 'huyenkhong-period',
    mountain: 'huyenkhong-mountain',
    btn: 'huyenkhong-calc-btn'
  }, 'huyenkhong-result-display');
  window.huyenKhongEngine = huyenKhongEngine;

  // 4. Càn Khôn Đồ Hình (Mạng Lưới Tri Thức Phong Thủy D3.js)
  const antigravityGraph = new AntigravityGraph('graph-container', 'graph-drawer');
  window.antigravityGraph = antigravityGraph;

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

  // 5. Điều Hướng & Scroll Spy
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
