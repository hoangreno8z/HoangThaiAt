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

  // 1.5 Render Tiết I: Khởi Nguyên Bản Thể & Tọa Vị Gian Thờ
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
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT I</span>
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

  // 1.6 Render Tiết II: Thước Lỗ Ban 38.8cm
  const worshipPart2Container = document.getElementById('worship-part2-container');
  if (worshipPart2Container && typeof WORSHIP_FENGSHUI_PART_2 !== 'undefined') {
    const data2 = WORSHIP_FENGSHUI_PART_2;
    worshipPart2Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">KÍCH THƯỚC BÀN THỜ HOÀNG KIM</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data2.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data2.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT II</span>
        </div>

        <!-- 1. Phân biệt 3 loại thước Lỗ Ban -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data2.ruler_classification.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data2.ruler_classification.rulers.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">📏 ${r.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${r.use_case}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Tra cứu trực tiếp thước 38.8cm -->
        <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-active); border-radius:12px; padding:1.5rem; margin-bottom:1.8rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
            <div>
              <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--gold-primary); margin-bottom:0.2rem;">
                CÔNG CỤ TRA CỨU KÍCH THƯỚC LỖ BAN 38.8CM TRỰC QUAN
              </h4>
              <span style="font-size:0.8rem; color:var(--text-muted);">Nhập kích thước (cm) chiều rộng, sâu hoặc cao để kiểm tra cung Cát / Hung</span>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <input type="number" id="luban-input" value="127" step="0.5" class="custom-select" style="width:140px; padding:0.6rem 0.8rem; text-align:center; font-size:1.1rem; font-weight:700;">
              <button id="luban-btn" class="btn-primary" style="padding:0.6rem 1rem; font-size:0.85rem;">Kiểm Tra</button>
            </div>
          </div>
          <div id="luban-result"></div>
        </div>

        <!-- 3. Cấu trúc 10 Cung Thước 38.8cm -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data2.ruler_388_structure.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.8rem;">
            ${data2.ruler_388_structure.palaces.map(p => `
              <div style="background:rgba(13,17,26,0.8); border:1px solid ${p.color}; border-radius:8px; padding:0.8rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                  <strong style="color:${p.color}; font-size:1rem;">${p.name}</strong>
                  <span style="font-size:0.7rem; color:${p.color}; font-weight:700;">${p.type === 'cat' ? 'ĐỎ (CÁT)' : 'ĐEN (HUNG)'}</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem;">${p.desc}</div>
                <div style="font-size:0.7rem; color:var(--text-pure); line-height:1.4;">
                  ${p.sub_palaces.map(s => `• ${s.split(' ')[0]}`).join(', ')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Kích Thước Bàn Thờ Hoàng Kim -->
        <div>
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data2.altar_golden_dimensions.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem;">
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
              <h5 style="color:var(--gold-primary); font-size:1rem; margin-bottom:0.6rem;">🏛️ Bàn Thờ Đứng / Án Gian / Tủ Thờ Đại Cát:</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${data2.altar_golden_dimensions.standing_altars.map(a => `
                  <div style="background:rgba(0,0,0,0.3); padding:0.6rem 0.8rem; border-radius:6px; border-left:2px solid var(--gold-primary);">
                    <div style="font-size:0.88rem; color:var(--text-pure); font-weight:700;">Ngang ${a.width} x Sâu ${a.depth} x Cao ${a.height}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">👉 Phù hợp: ${a.suit_for}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
              <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.6rem;">⛩️ Bàn Thờ Treo Tường (Chung Cư / Nhà Phố):</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${data2.altar_golden_dimensions.hanging_altars.map(a => `
                  <div style="background:rgba(0,0,0,0.3); padding:0.6rem 0.8rem; border-radius:6px; border-left:2px solid var(--jade-cyan);">
                    <div style="font-size:0.88rem; color:var(--text-pure); font-weight:700;">Sâu ${a.depth} x Ngang ${a.width}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">👉 ${a.height_standard}</div>
                    <div style="font-size:0.75rem; color:var(--jade-cyan); margin-top:0.2rem;">Ứng dụng: ${a.suit_for}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Khởi tạo công cụ tra cứu Thước 38.8cm
    const luBanEngine = new LuBan388Engine('luban-input', 'luban-btn', 'luban-result');
    window.luBanEngine = luBanEngine;
  }

  // 1.7 Render Tiết III: Bài Trí Bát Hương & Ngũ Hành Đồ Thờ
  const worshipPart3Container = document.getElementById('worship-part3-container');
  if (worshipPart3Container && typeof WORSHIP_FENGSHUI_PART_3 !== 'undefined') {
    const data3 = WORSHIP_FENGSHUI_PART_3;
    worshipPart3Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">BÀI TRÍ ĐỒ THỜ CHÁNH TÔNG</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data3.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data3.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT III</span>
        </div>

        <!-- 1. Tam Cấp Thần Vị (3 Bát Hương) -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data3.incense_burners_layout.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data3.incense_burners_layout.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data3.incense_burners_layout.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data3.incense_burners_layout.burners.map(b => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; display:inline-block; margin-bottom:0.4rem;">${b.position}</span>
                <h5 style="color:var(--text-pure); font-size:1rem; margin-bottom:0.4rem;">${b.worship}</h5>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${b.specification}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Ngũ Hành Đồ Thờ Tương Sinh -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.4rem;">${data3.five_elements_worship.title}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">${data3.five_elements_worship.desc}</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.8rem;">
            ${data3.five_elements_worship.elements.map(e => `
              <div style="background:rgba(13,17,26,0.8); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;">${e.element}</strong>
                <div style="font-size:0.82rem; color:var(--text-pure); margin-bottom:0.4rem;"><strong>Vật phẩm:</strong> ${e.items}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.5;">${e.role}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Đông Bình Tây Quả -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data3.dong_binh_tay_qua.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem;">
            ${data3.dong_binh_tay_qua.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.4rem;">🌿 ${p.name}</h5>
                <p style="font-size:0.85rem; color:var(--text-pure); line-height:1.6;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Cốt Thất Bảo & Tro Nếp -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data3.that_bao_consecration.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data3.that_bao_consecration.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data3.that_bao_consecration.quote_source}</strong></div>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.6rem; margin-bottom:1rem;">
            ${data3.that_bao_consecration.seven_treasures.map(t => `
              <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:6px; padding:0.6rem 0.8rem; text-align:center;">
                <strong style="color:var(--gold-primary); font-size:0.85rem; display:block;">💎 ${t.name}</strong>
                <span style="font-size:0.7rem; color:var(--text-muted); line-height:1.3; display:block; margin-top:0.2rem;">${t.meaning}</span>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
            🌾 <strong>Quy chuẩn vật liệu tro:</strong> ${data3.that_bao_consecration.ash_rule}
          </div>
        </div>
      </div>
    `;
  }

  // 1.8 Render Tiết IV: 18 Đại Kỵ Bàn Thờ & Phép Hóa Giải
  const worshipPart4Container = document.getElementById('worship-part4-container');
  if (worshipPart4Container && typeof WORSHIP_FENGSHUI_PART_4 !== 'undefined') {
    const data4 = WORSHIP_FENGSHUI_PART_4;
    worshipPart4Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:#EF4444; text-transform:uppercase; letter-spacing:1px; font-weight:700;">TRÁNH HUNG HÓA CÁT • TRÁCH PHÒNG SÁT KHÍ</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data4.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data4.sub_title}</div>
          </div>
          <span style="background:rgba(239,68,68,0.15); color:#EF4444; border:1px solid #EF4444; font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT IV</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:1.8rem;">
          ${data4.taboo_categories.map(cat => `
            <div>
              <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--gold-primary); margin-bottom:0.8rem; border-left:3px solid var(--gold-primary); padding-left:0.6rem;">
                ${cat.category_name}
              </h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
                ${cat.items.map(item => `
                  <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                    <div style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:0.5rem;">
                      <span style="background:rgba(239,68,68,0.2); color:#EF4444; font-weight:800; font-size:0.8rem; padding:0.1rem 0.5rem; border-radius:4px; flex-shrink:0;">KỴ ${item.id}</span>
                      <strong style="color:var(--text-pure); font-size:0.95rem; line-height:1.4;">${item.name}</strong>
                    </div>
                    <div style="background:rgba(239,68,68,0.06); padding:0.6rem 0.8rem; border-radius:6px; font-size:0.82rem; color:#FCA5A5; line-height:1.5; margin-bottom:0.6rem;">
                      ⚠️ <strong>Tác hại:</strong> ${item.danger}
                    </div>
                    <div style="background:rgba(16,185,129,0.06); border-left:2px solid #10B981; padding:0.6rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#6EE7B7; line-height:1.5;">
                      ✅ <strong>Phép hóa giải:</strong> ${item.remedy}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 1.9 Render Tiết V: Nghi Thức Bao Sái & Rút Tỉa Chân Nhang
  const worshipPart5Container = document.getElementById('worship-part5-container');
  if (worshipPart5Container && typeof WORSHIP_FENGSHUI_PART_5 !== 'undefined') {
    const data5 = WORSHIP_FENGSHUI_PART_5;
    worshipPart5Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">CHU TỬ GIA LỄ • TU SÁI CHI NGHI</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data5.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data5.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT V</span>
        </div>

        <!-- 1. Thời điểm & Nước bao sái -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data5.preparation_and_timing.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data5.preparation_and_timing.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data5.preparation_and_timing.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            ${data5.preparation_and_timing.timing_rules.map(t => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.3rem;">🕒 ${t.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${t.detail}</p>
              </div>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data5.preparation_and_timing.purification_water.map(w => `
              <div style="background:rgba(45,212,191,0.04); border:1px solid rgba(45,212,191,0.3); padding:1rem; border-radius:10px;">
                <strong style="color:var(--jade-cyan); font-size:0.9rem; display:block; margin-bottom:0.3rem;">💧 ${w.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-pure); line-height:1.6;">${w.recipe}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Quy trình 5 bước -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data5.five_steps_process.title}</h4>
          <div style="display:flex; flex-direction:column; gap:0.8rem;">
            ${data5.five_steps_process.steps.map((s, idx) => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.4rem;">
                  <span style="background:var(--gold-primary); color:#000; font-weight:800; font-size:0.8rem; padding:0.1rem 0.6rem; border-radius:4px;">BƯỚC 0${idx + 1}</span>
                  <strong style="color:var(--text-pure); font-size:1rem;">${s.step.split(': ')[1] || s.step}</strong>
                </div>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.7;">${s.action}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Văn khấn bao sái -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--gold-primary);">${data5.canonical_prayer.title}</h4>
            <span style="font-size:0.75rem; color:var(--text-muted);">Văn bản chuẩn cổ truyền</span>
          </div>
          <pre style="background:rgba(0,0,0,0.5); border:1px solid var(--border-active); border-radius:10px; padding:1.5rem; color:var(--text-pure); font-size:0.88rem; line-height:1.8; white-space:pre-wrap; font-family:var(--font-sans); max-height:400px; overflow-y:auto;">${data5.canonical_prayer.invocation_text}</pre>
        </div>
      </div>
    `;
  }

  // 1.10 Render Tiết VI: Phong Thủy Bàn Thờ Thần Tài - Thổ Địa
  const worshipPart6Container = document.getElementById('worship-part6-container');
  if (worshipPart6Container && typeof WORSHIP_FENGSHUI_PART_6 !== 'undefined') {
    const data6 = WORSHIP_FENGSHUI_PART_6;
    worshipPart6Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:1px; font-weight:700;">CHIÊU TÀI TỤ BẢO • ĐỊA KHÍ THÔNG THUẬN</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data6.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data6.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT VI</span>
        </div>

        <!-- 1. Bản chất thần vị -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data6.deity_nature.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data6.deity_nature.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data6.deity_nature.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            ${data6.deity_nature.deities.map(d => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; display:inline-block; margin-bottom:0.4rem;">${d.position}</span>
                <h5 style="color:var(--text-pure); font-size:1.05rem; margin-bottom:0.3rem;">${d.name}</h5>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${d.role}</p>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
            🌍 <strong>Quy tắc nạp địa khí:</strong> ${data6.deity_nature.ground_principle}
          </div>
        </div>

        <!-- 2. Vị trí & Cung Tài Lộc -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data6.positioning_and_directions.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data6.positioning_and_directions.wealth_palaces.map(w => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--gold-primary); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:1rem; display:block; margin-bottom:0.4rem;">⭐ ${w.palace}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${w.benefit}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Quy thức bài trí -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data6.altar_layout.title}</h4>
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            ${data6.altar_layout.items_order.map(item => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem 1.2rem; display:flex; gap:1rem; align-items:center;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; flex-shrink:0;">${item.step}</strong>
                <span style="font-size:0.85rem; color:var(--text-muted);">${item.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Đại kỵ -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:#EF4444; margin-bottom:0.8rem;">${data6.taboos_wealth_altar.title}</h4>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${data6.taboos_wealth_altar.taboos.map(t => `
              <div style="background:rgba(239,68,68,0.06); border-left:3px solid #EF4444; padding:0.6rem 1rem; border-radius:0 6px 6px 0; font-size:0.85rem; color:#FCA5A5;">
                ❌ ${t}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 1.11 Render Tiết VII: Phong Thủy Bàn Thờ Phật Tại Gia
  const worshipPart7Container = document.getElementById('worship-part7-container');
  if (worshipPart7Container && typeof WORSHIP_FENGSHUI_PART_7 !== 'undefined') {
    const data7 = WORSHIP_FENGSHUI_PART_7;
    worshipPart7Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; font-weight:700;">THÍCH ĐẠO PHỐI TỰ • TIỀN PHẬT HẬU LINH</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data7.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data7.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT VII</span>
        </div>

        <!-- 1. Thứ bậc tôn ty -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data7.spiritual_hierarchy.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data7.spiritual_hierarchy.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data7.spiritual_hierarchy.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data7.spiritual_hierarchy.hierarchy_rules.map(h => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">☸️ ${h.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${h.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Mô hình bố cục -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data7.dual_altar_models.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.2rem;">
            ${data7.dual_altar_models.models.map(m => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
                <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.3rem;">🏛️ ${m.model_name}</h5>
                <span style="font-size:0.78rem; color:var(--text-muted); display:block; margin-bottom:0.6rem;">${m.suitable}</span>
                <div style="display:flex; flex-direction:column; gap:0.4rem;">
                  ${m.structure.map(s => `
                    <div style="background:rgba(0,0,0,0.3); padding:0.5rem 0.8rem; border-radius:6px; font-size:0.82rem; color:var(--text-pure); line-height:1.5; border-left:2px solid var(--gold-primary);">
                      • ${s}
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Giới luật cúng dường chay tịnh -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data7.offering_commandments.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data7.offering_commandments.rules.map(r => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;">🌸 ${r.item}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${r.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Hướng đặt & Tượng Phật -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data7.orientations_and_statues.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
            ${data7.orientations_and_statues.statues.map(st => `
              <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem 1rem;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.2rem;">✨ ${st.name}</strong>
                <span style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${st.desc}</span>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
            🧭 <strong>Phép lập hướng đại cát:</strong> ${data7.orientations_and_statues.orientation_rule}
          </div>
        </div>
      </div>
    `;
  }

  // 1.12 Render Tiết VIII: Phong Thủy Nhà Thờ Họ & Tả Chiêu Hữu Mục
  const worshipPart8Container = document.getElementById('worship-part8-container');
  if (worshipPart8Container && typeof WORSHIP_FENGSHUI_PART_8 !== 'undefined') {
    const data8 = WORSHIP_FENGSHUI_PART_8;
    worshipPart8Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:1px; font-weight:700;">KINH LỄ • TÔNG TỪ THIÊN • HUYẾT THỐNG GIA TỘC</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data8.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data8.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT VIII</span>
        </div>

        <!-- 1. Bản thể luận từ đường -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data8.ancestral_hall_ontology.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data8.ancestral_hall_ontology.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data8.ancestral_hall_ontology.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data8.ancestral_hall_ontology.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">🏛️ ${p.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Tả Chiêu Hữu Mục -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data8.chieu_muc_system.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data8.chieu_muc_system.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data8.chieu_muc_system.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
            ${data8.chieu_muc_system.generation_rules.map(g => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:1rem; display:block; margin-bottom:0.3rem;">📜 ${g.rank}</strong>
                <div style="font-size:0.85rem; color:var(--jade-cyan); margin-bottom:0.4rem;">📍 <strong>Vị trí:</strong> ${g.placement}</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">${g.symbol}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Kiến trúc 3 gian / 5 gian & Loan Đầu -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data8.architectural_loan_dau.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem; margin-bottom:1.2rem;">
            ${data8.architectural_loan_dau.bays_layout.map(b => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <h5 style="color:var(--gold-primary); font-size:1rem; margin-bottom:0.4rem;">🚪 ${b.bay}</h5>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${b.role}</p>
              </div>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem;">
            ${data8.architectural_loan_dau.landscape_features.map(f => `
              <div style="background:rgba(0,0,0,0.3); border-left:3px solid var(--jade-cyan); padding:0.8rem 1rem; border-radius:0 8px 8px 0;">
                <strong style="color:var(--jade-cyan); font-size:0.9rem; display:block; margin-bottom:0.2rem;">${f.feature}</strong>
                <span style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">${f.detail}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Thần Chủ & Hoành Phi -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data8.sacred_tablets_and_motto.title}</h4>
          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6; margin-bottom:1rem;">
            🪵 <strong>Chất liệu Thần Chủ:</strong> ${data8.sacred_tablets_and_motto.tablet_material}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.8rem;">
            ${data8.sacred_tablets_and_motto.famous_mottos.map(m => `
              <div style="background:rgba(0,0,0,0.4); border:1px solid var(--gold-primary); border-radius:8px; padding:0.8rem 1rem;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.2rem;">⚜️ ${m.motto}</strong>
                <span style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">${m.meaning}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 1.13 Render Tiết IX: Bàn Thờ Treo Tường Chung Cư & Hiện Đại
  const worshipPart9Container = document.getElementById('worship-part9-container');
  if (worshipPart9Container && typeof WORSHIP_FENGSHUI_PART_9 !== 'undefined') {
    const data9 = WORSHIP_FENGSHUI_PART_9;
    worshipPart9Container.innerHTML = `
      <div style="background:var(--bg-card); border:1px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; font-weight:700;">DƯƠNG TRẠCH TÂN THỜI • KHÔNG GIAN HẸP TỤ KHÍ</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data9.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data9.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT IX</span>
        </div>

        <!-- 1. Độ cao thước 38.8cm -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data9.hanging_altar_heights.title}</h4>
          <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data9.hanging_altar_heights.quote}"</div>
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data9.hanging_altar_heights.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data9.hanging_altar_heights.height_levels.map(lvl => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--gold-primary); border-radius:12px; padding:1.2rem;">
                <span style="color:var(--jade-cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${lvl.level}</span>
                <div style="font-size:1.3rem; font-family:var(--font-title); color:var(--gold-primary); margin:0.3rem 0;">${lvl.height_cm}</div>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">${lvl.suitable}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Giải pháp 4 lớp bảo vệ -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data9.four_layer_protection.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data9.four_layer_protection.layers.map(l => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">🛡️ ${l.layer}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${l.role}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. 6 Đại kỵ chung cư -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:#EF4444; margin-bottom:0.8rem;">${data9.apartment_taboos.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
            ${data9.apartment_taboos.taboos.map(t => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <div style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:0.4rem;">
                  <span style="background:rgba(239,68,68,0.2); color:#EF4444; font-weight:800; font-size:0.8rem; padding:0.1rem 0.5rem; border-radius:4px; flex-shrink:0;">KỴ 0${t.id}</span>
                  <strong style="color:var(--text-pure); font-size:0.95rem;">${t.title}</strong>
                </div>
                <div style="background:rgba(239,68,68,0.06); padding:0.5rem 0.8rem; border-radius:6px; font-size:0.82rem; color:#FCA5A5; line-height:1.5; margin-bottom:0.5rem;">
                  ⚠️ <strong>Hậu quả:</strong> ${t.danger}
                </div>
                <div style="background:rgba(16,185,129,0.06); border-left:2px solid #10B981; padding:0.5rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#6EE7B7; line-height:1.5;">
                  ✅ <strong>Hóa giải:</strong> ${t.solution}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 1.14 Render Tiết X: Đại Giải Mã Phù Cốt Bát Hương & Trận Đồ Càn Khôn
  const worshipPart10Container = document.getElementById('worship-part10-container');
  if (worshipPart10Container && typeof WORSHIP_FENGSHUI_PART_10 !== 'undefined') {
    const data10 = WORSHIP_FENGSHUI_PART_10;
    worshipPart10Container.innerHTML = `
      <div style="background:var(--bg-card); border:2px solid var(--gold-primary); border-radius:16px; padding:2rem; margin-bottom:2rem; box-shadow:var(--shadow-gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(229,192,123,0.2); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; font-weight:700;">ĐẠO TẠNG HUYỀN MÔN • KHOA NGHI TẾ TỰ MẬT CHỈ</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">${data10.chapter_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${data10.sub_title}</div>
          </div>
          <span style="background:rgba(229,192,123,0.2); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">TIẾT X (VIÊN MÃN)</span>
        </div>

        <!-- 1. Trực quan hình ảnh & Tổng quan -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin-bottom:2rem; align-items:center;">
          <div style="text-align:center; background:rgba(0,0,0,0.4); border:1px solid var(--gold-primary); border-radius:12px; padding:1rem;">
            <img src="${data10.image_url}" alt="Phù Cốt Bát Hương" style="max-height:480px; width:auto; max-width:100%; border-radius:8px; box-shadow:0 0 20px rgba(229,192,123,0.25);">
            <div style="font-size:0.8rem; color:var(--gold-primary); font-weight:700; margin-top:0.6rem;">Đạo Phù Cốt Bát Hương Chánh Tông (Chu Sa Hoàng Chỉ)</div>
          </div>

          <div>
            <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${data10.talisman_anatomy.title}</h4>
            <div style="background:rgba(229,192,123,0.06); border-left:3px solid var(--gold-primary); padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
              <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${data10.talisman_anatomy.quote}"</div>
              <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;">👉 Xuất xứ: <strong>${data10.talisman_anatomy.quote_source}</strong></div>
            </div>
            
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.7; margin-bottom:1rem;">
              ${data10.talisman_anatomy.overview}
            </p>

            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${data10.matrix_significance.points.map(pt => `
                <div style="background:rgba(255,255,255,0.02); border-left:2px solid var(--jade-cyan); padding:0.6rem 0.8rem; border-radius:0 6px 6px 0;">
                  <strong style="color:var(--jade-cyan); font-size:0.88rem;">⚡ ${pt.name}:</strong>
                  <span style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;"> ${pt.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 2. Giải Phẫu Chi Tiết Từng Cột Phù Văn -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.3rem; color:var(--gold-primary); margin-bottom:1rem; text-align:center;">
            GIẢI MÃ CHI TIẾT TỪNG KÝ TỰ, QUẺ BÁT QUÁI & 28 CHÒM SAO TRÊN ĐẠO PHÙ
          </h4>

          <div style="display:flex; flex-direction:column; gap:1.2rem;">
            ${data10.talisman_anatomy.five_columns.map(col => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
                <h5 style="color:var(--gold-primary); font-size:1rem; margin-bottom:0.8rem; border-bottom:1px solid rgba(229,192,123,0.15); padding-bottom:0.4rem;">
                  📜 ${col.column_name}
                </h5>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
                  ${col.character_details.map(c => `
                    <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem;">
                      <div style="font-family:var(--font-title); font-size:1.05rem; color:var(--gold-primary); margin-bottom:0.2rem;">${c.han}</div>
                      <div style="font-size:0.75rem; color:var(--jade-cyan); margin-bottom:0.3rem;">[Âm Hán Việt / Ý niệm: <strong>${c.pinyin}</strong>]</div>
                      <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">${c.meaning}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Quy Trình Nạp Cốt & An Vị Chuẩn Mật Chỉ -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data10.ritual_consecration_steps.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.8rem;">
            ${data10.ritual_consecration_steps.steps.map((st, idx) => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.8rem 1rem; border-radius:8px; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
                <span style="background:var(--gold-primary); color:#000; font-size:0.75rem; font-weight:800; padding:0.1rem 0.4rem; border-radius:4px; margin-right:0.3rem;">${idx + 1}</span>
                ${st.substring(3)}
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
