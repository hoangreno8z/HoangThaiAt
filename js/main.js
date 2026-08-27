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

  // 1.6 Render Chuyên Đề Phong Thủy Thờ Cúng (Lần 2 / 10): Thước Lỗ Ban 38.8cm
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
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">LẦN 2 / 10</span>
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
            <!-- Bàn thờ đứng -->
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

            <!-- Bàn thờ treo -->
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

  // 1.7 Render Chuyên Đề Phong Thủy Thờ Cúng (Lần 3 / 10): Bài Trí Bát Hương & Ngũ Hành Đồ Thờ
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
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">LẦN 3 / 10</span>
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

  // 1.8 Render Chuyên Đề Phong Thủy Thờ Cúng (Lần 4 / 10): 18 Đại Kỵ Bàn Thờ & Phép Hóa Giải
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
          <span style="background:rgba(239,68,68,0.15); color:#EF4444; border:1px solid #EF4444; font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">LẦN 4 / 10</span>
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

  // 1.9 Render Chuyên Đề Phong Thủy Thờ Cúng (Lần 5 / 10): Nghi Thức Bao Sái & Rút Tỉa Chân Nhang
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
          <span style="background:rgba(229,192,123,0.15); color:var(--gold-primary); border:1px solid var(--gold-primary); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">LẦN 5 / 10</span>
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
