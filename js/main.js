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

  // 1.5 Render Chuyên Đề Phong Thủy Thờ Cúng (Lần 1 / 10)
  const worshipContainer = document.getElementById('worship-part1-container');
  if (worshipContainer && typeof WORSHIP_FENGSHUI_PART_1 !== 'undefined') {
    const data = WORSHIP_FENGSHUI_PART_1;
    worshipContainer.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">CHUYÊN KHẢO TẾ TỰ CHÁNH TÔNG</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">LẦN 1 / 10</span>
        </div>

        <!-- 1. Bản thể luận -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data.ontology.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data.ontology.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data.ontology.quote_source}</strong></div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
            ${data.ontology.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--jade-cyan); font-size:0.9rem; display:block; margin-bottom:0.3rem;">• ${p.name}:</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Tọa cát hướng cát -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.4rem;">${data.orientation_rules.title}</h4>
          <p style="font-size:0.88rem; color:var(--gold-primary); line-height:1.6; margin-bottom:1rem; background:rgba(0,0,0,0.4); padding:0.8rem 1rem; border-radius:8px;">
            ⚠️ <strong>Quy tắc phân biệt cốt tử:</strong> ${data.orientation_rules.comparison_with_kitchen}
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
            ${data.orientation_rules.palace_requirements.map(req => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.3rem;">📌 ${req.palace}:</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${req.requirement}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Loan Đầu Phòng Thờ -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data.loan_dau_rules.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem;">
            ${data.loan_dau_rules.rules.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <h5 style="font-size:0.95rem; color:var(--jade-cyan); margin-bottom:0.4rem;">🏛️ ${r.aspect}</h5>
                <div style="font-size:0.85rem; color:var(--text-pure); margin-bottom:0.6rem;"><strong>Tiêu chuẩn:</strong> ${r.standard}</div>
                <div style="background:rgba(239,68,68,0.08); border-left:3px solid #EF4444; padding:0.6rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#FCA5A5; line-height:1.5;">
                  ${r.prohibitions}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Bảng tra cứu 8 Quái -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">4. Bảng Tra Phương Vị Tọa Cát Hướng Cát Theo 8 Mệnh Quái:</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem;">
            ${data.battrach_worship_matrix.map(m => `
              <div style="background:rgba(13,17,26,0.8); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem 1rem;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.2rem;">Quẻ ${m.gua}</strong>
                <div style="font-size:0.85rem; color:var(--text-pure); margin-bottom:0.3rem;">👉 <strong>Tọa vị:</strong> ${m.best_pos}</div>
                <div style="font-size:0.78rem; color:var(--jade-cyan);">${m.note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
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
