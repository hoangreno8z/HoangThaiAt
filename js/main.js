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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data.ontology.quote_source}</strong></div>
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
             <strong>Quy tắc phân biệt cốt tử:</strong> ${data.orientation_rules.comparison_with_kitchen}
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
            ${data.orientation_rules.palace_requirements.map(req => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.3rem;"> ${req.palace}:</strong>
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
                <h5 style="font-size:0.95rem; color:var(--jade-cyan); margin-bottom:0.4rem;"> ${r.aspect}</h5>
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
                <div style="font-size:0.85rem; color:var(--text-pure); margin-bottom:0.3rem;"> <strong>Tọa vị:</strong> ${m.best_pos}</div>
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
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;"> ${r.name}</strong>
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
              <h5 style="color:var(--gold-primary); font-size:1rem; margin-bottom:0.6rem;"> Bàn Thờ Đứng / Án Gian / Tủ Thờ Đại Cát:</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${data2.altar_golden_dimensions.standing_altars.map(a => `
                  <div style="background:rgba(0,0,0,0.3); padding:0.6rem 0.8rem; border-radius:6px; border-left:2px solid var(--gold-primary);">
                    <div style="font-size:0.88rem; color:var(--text-pure); font-weight:700;">Ngang ${a.width} x Sâu ${a.depth} x Cao ${a.height}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;"> Phù hợp: ${a.suit_for}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
              <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.6rem;">️ Bàn Thờ Treo Tường (Chung Cư / Nhà Phố):</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${data2.altar_golden_dimensions.hanging_altars.map(a => `
                  <div style="background:rgba(0,0,0,0.3); padding:0.6rem 0.8rem; border-radius:6px; border-left:2px solid var(--jade-cyan);">
                    <div style="font-size:0.88rem; color:var(--text-pure); font-weight:700;">Sâu ${a.depth} x Ngang ${a.width}</div>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;"> ${a.height_standard}</div>
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data3.incense_burners_layout.quote_source}</strong></div>
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
                <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.4rem;"> ${p.name}</h5>
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data3.that_bao_consecration.quote_source}</strong></div>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.6rem; margin-bottom:1rem;">
            ${data3.that_bao_consecration.seven_treasures.map(t => `
              <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:6px; padding:0.6rem 0.8rem; text-align:center;">
                <strong style="color:var(--gold-primary); font-size:0.85rem; display:block;"> ${t.name}</strong>
                <span style="font-size:0.7rem; color:var(--text-muted); line-height:1.3; display:block; margin-top:0.2rem;">${t.meaning}</span>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
             <strong>Quy chuẩn vật liệu tro:</strong> ${data3.that_bao_consecration.ash_rule}
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
                       <strong>Tác hại:</strong> ${item.danger}
                    </div>
                    <div style="background:rgba(16,185,129,0.06); border-left:2px solid #10B981; padding:0.6rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#6EE7B7; line-height:1.5;">
                       <strong>Phép hóa giải:</strong> ${item.remedy}
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data5.preparation_and_timing.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            ${data5.preparation_and_timing.timing_rules.map(t => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem; border-radius:10px;">
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.3rem;"> ${t.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${t.detail}</p>
              </div>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data5.preparation_and_timing.purification_water.map(w => `
              <div style="background:rgba(45,212,191,0.04); border:1px solid rgba(45,212,191,0.3); padding:1rem; border-radius:10px;">
                <strong style="color:var(--jade-cyan); font-size:0.9rem; display:block; margin-bottom:0.3rem;"> ${w.name}</strong>
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data6.deity_nature.quote_source}</strong></div>
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
             <strong>Quy tắc nạp địa khí:</strong> ${data6.deity_nature.ground_principle}
          </div>
        </div>

        <!-- 2. Vị trí & Cung Tài Lộc -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${data6.positioning_and_directions.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data6.positioning_and_directions.wealth_palaces.map(w => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--gold-primary); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:1rem; display:block; margin-bottom:0.4rem;"> ${w.palace}</strong>
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
                 ${t}
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data7.spiritual_hierarchy.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data7.spiritual_hierarchy.hierarchy_rules.map(h => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">️ ${h.name}</strong>
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
                <h5 style="color:var(--jade-cyan); font-size:1rem; margin-bottom:0.3rem;"> ${m.model_name}</h5>
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
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${r.item}</strong>
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
                <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.2rem;"> ${st.name}</strong>
                <span style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${st.desc}</span>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10B981; padding:0.8rem 1rem; border-radius:0 8px 8px 0; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
             <strong>Phép lập hướng đại cát:</strong> ${data7.orientations_and_statues.orientation_rule}
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data8.ancestral_hall_ontology.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${data8.ancestral_hall_ontology.principles.map(p => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;"> ${p.name}</strong>
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data8.chieu_muc_system.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
            ${data8.chieu_muc_system.generation_rules.map(g => `
              <div style="background:rgba(13,17,26,0.85); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:1rem; display:block; margin-bottom:0.3rem;"> ${g.rank}</strong>
                <div style="font-size:0.85rem; color:var(--jade-cyan); margin-bottom:0.4rem;"> <strong>Vị trí:</strong> ${g.placement}</div>
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
                <h5 style="color:var(--gold-primary); font-size:1rem; margin-bottom:0.4rem;"> ${b.bay}</h5>
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
             <strong>Chất liệu Thần Chủ:</strong> ${data8.sacred_tablets_and_motto.tablet_material}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.8rem;">
            ${data8.sacred_tablets_and_motto.famous_mottos.map(m => `
              <div style="background:rgba(0,0,0,0.4); border:1px solid var(--gold-primary); border-radius:8px; padding:0.8rem 1rem;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.2rem;">️ ${m.motto}</strong>
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
            <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data9.hanging_altar_heights.quote_source}</strong></div>
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
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;">️ ${l.layer}</strong>
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
                   <strong>Hậu quả:</strong> ${t.danger}
                </div>
                <div style="background:rgba(16,185,129,0.06); border-left:2px solid #10B981; padding:0.5rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#6EE7B7; line-height:1.5;">
                   <strong>Hóa giải:</strong> ${t.solution}
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
              <div style="font-size:0.75rem; color:var(--gold-primary); margin-top:0.2rem;"> Xuất xứ: <strong>${data10.talisman_anatomy.quote_source}</strong></div>
            </div>
            
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.7; margin-bottom:1rem;">
              ${data10.talisman_anatomy.overview}
            </p>

            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${data10.matrix_significance.points.map(pt => `
                <div style="background:rgba(255,255,255,0.02); border-left:2px solid var(--jade-cyan); padding:0.6rem 0.8rem; border-radius:0 6px 6px 0;">
                  <strong style="color:var(--jade-cyan); font-size:0.88rem;"> ${pt.name}:</strong>
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
                   ${col.column_name}
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

  // 1.15 Render Đại Chuyên Đề: Phần "Linh" (Mật Giáo & Phù Chú Khoa Nghi Bát Hương Chánh Tông)
  const worshipEsotericContainer = document.getElementById('worship-esoteric-container');
  if (worshipEsotericContainer && typeof WORSHIP_ESOTERIC_RITUALS !== 'undefined') {
    const eso = WORSHIP_ESOTERIC_RITUALS;
    worshipEsotericContainer.innerHTML = `
      <div style="background:linear-gradient(135deg, rgba(20,20,30,0.95), rgba(10,12,18,0.98)); border:2px solid #D97706; border-radius:16px; padding:2rem; margin-bottom:2.5rem; box-shadow:0 0 30px rgba(217,119,6,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(217,119,6,0.3); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:#F59E0B; text-transform:uppercase; letter-spacing:1px; font-weight:800;"> HUYỀN MÔN BÍ CHỈ • MẬT TẠNG KHOA NGHI CHÁNH TÔNG</span>
            <h3 style="font-family:var(--font-title); font-size:1.6rem; color:#F59E0B; margin:0.2rem 0;">${eso.section_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${eso.sub_title}</div>
          </div>
          <span style="background:rgba(245,158,11,0.15); color:#F59E0B; border:1px solid #F59E0B; font-size:0.85rem; font-weight:800; padding:0.4rem 1rem; border-radius:20px;">MẬT TRUYỀN PHẦN LINH</span>
        </div>

        <!-- 1. Bản thể luận Hình - Khí - Thần -->
        <div style="margin-bottom:2rem;">
          <h4 style="font-family:var(--font-title); font-size:1.25rem; color:var(--text-pure); margin-bottom:0.6rem;">${eso.esoteric_ontology.title}</h4>
          <div style="background:rgba(245,158,11,0.06); border-left:3px solid #F59E0B; padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${eso.esoteric_ontology.quote}"</div>
            <div style="font-size:0.75rem; color:#F59E0B; margin-top:0.2rem;"> Xuất xứ: <strong>${eso.esoteric_ontology.quote_source}</strong></div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${eso.esoteric_ontology.concepts.map(c => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(245,158,11,0.2); padding:1.2rem; border-radius:12px;">
                <strong style="color:#F59E0B; font-size:1rem; display:block; margin-bottom:0.4rem;"> ${c.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${c.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Quy trình 7 bước khởi linh bát hương -->
        <div style="margin-bottom:2rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.25rem; color:var(--text-pure); margin-bottom:1rem;">${eso.seven_consecration_steps.title}</h4>
          <div style="display:flex; flex-direction:column; gap:0.9rem;">
            ${eso.seven_consecration_steps.steps.map((st, idx) => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.4rem;">
                  <span style="background:#F59E0B; color:#000; font-weight:800; font-size:0.8rem; padding:0.15rem 0.6rem; border-radius:4px;">BƯỚC ${idx + 1}</span>
                  <strong style="color:var(--text-pure); font-size:1.05rem;">${st.step.split(': ')[1] || st.step}</strong>
                </div>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.7;">${st.action}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Hệ thống 4 Chân ngôn Mật chú -->
        <div style="margin-bottom:2rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.25rem; color:#F59E0B; margin-bottom:1rem;">${eso.four_sacred_mantras.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
            ${eso.four_sacred_mantras.mantras.map(m => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(245,158,11,0.25); border-radius:12px; padding:1.2rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                  <strong style="color:var(--text-pure); font-size:0.95rem;"> ${m.name}</strong>
                  <span style="font-size:0.75rem; color:#F59E0B; font-weight:700;">${m.count}</span>
                </div>
                <div style="background:rgba(0,0,0,0.5); border-left:3px solid #F59E0B; padding:0.8rem; border-radius:0 6px 6px 0; margin:0.6rem 0;">
                  <div style="font-size:0.75rem; color:var(--jade-cyan); margin-bottom:0.2rem;">Chân ngôn Phạn / Mật âm:</div>
                  <div style="font-family:var(--font-title); font-size:1rem; color:#FCD34D;">"${m.phonetic}"</div>
                </div>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;"> <strong>Công năng:</strong> ${m.effect}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Hệ thống 3 Thủ ấn -->
        <div style="margin-bottom:2rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.25rem; color:var(--text-pure); margin-bottom:1rem;">${eso.mudras_system.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
            ${eso.mudras_system.mudras.map(mu => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1.2rem; border-radius:12px;">
                <strong style="color:var(--jade-cyan); font-size:1rem; display:block; margin-bottom:0.3rem;"> ${mu.name}</strong>
                <div style="font-size:0.85rem; color:var(--text-pure); margin-bottom:0.4rem;"><strong>Thao tác kết ấn:</strong> ${mu.gesture}</div>
                <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;"> <strong>Ý nghĩa khoa nghi:</strong> ${mu.role}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. Dấu hiệu Đắc linh & Phương pháp hồi linh -->
        <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.25rem; color:var(--text-pure); margin-bottom:1rem;">${eso.signs_and_remedies.title}</h4>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem; margin-bottom:1rem;">
            <!-- Đắc linh -->
            <div style="background:rgba(16,185,129,0.05); border:1px solid #10B981; border-radius:10px; padding:1.2rem;">
              <h5 style="color:#10B981; font-size:1rem; margin-bottom:0.6rem;"> Dấu Hiệu Bát Hương "Đắc Linh":</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${eso.signs_and_remedies.signs_dac_linh.map(s => `
                  <div style="font-size:0.85rem; color:var(--text-pure); line-height:1.5;">
                    • <strong>${s.name}:</strong> <span style="color:var(--text-muted);">${s.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Mất linh -->
            <div style="background:rgba(239,68,68,0.05); border:1px solid #EF4444; border-radius:10px; padding:1.2rem;">
              <h5 style="color:#EF4444; font-size:1rem; margin-bottom:0.6rem;"> Dấu Hiệu Bị "Mất Linh / Nhiễm Tà":</h5>
              <div style="display:flex; flex-direction:column; gap:0.5rem;">
                ${eso.signs_and_remedies.signs_mat_linh.map(s => `
                  <div style="font-size:0.85rem; color:var(--text-pure); line-height:1.5;">
                    • <strong>${s.name}:</strong> <span style="color:var(--text-muted);">${s.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div style="background:rgba(245,158,11,0.08); border-left:3px solid #F59E0B; padding:1rem 1.2rem; border-radius:0 8px 8px 0; font-size:0.88rem; color:var(--text-pure); line-height:1.7;">
             <strong>Phương pháp Tái Tịnh Hóa (Hồi Linh Chi Pháp):</strong> ${eso.signs_and_remedies.remedy_protocol}
          </div>
        </div>
      </div>
    `;
  }

  // 1.16 Render Đại Chuyên Đề Tối Hậu I: Khai Quang Điểm Nhãn Thất Khiếu Tượng Thờ & Linh Vật
  const worshipStatuesContainer = document.getElementById('worship-statues-container');
  if (worshipStatuesContainer && typeof WORSHIP_KHAI_QUANG_STATUES !== 'undefined') {
    const st = WORSHIP_KHAI_QUANG_STATUES;
    worshipStatuesContainer.innerHTML = `
      <div style="background:var(--bg-card); border:2px solid #EC4899; border-radius:16px; padding:2rem; margin-bottom:2.5rem; box-shadow:0 0 25px rgba(236,72,153,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(236,72,153,0.3); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:#F472B6; text-transform:uppercase; letter-spacing:1px; font-weight:800;">️ HÔ THẦN NHẬP TƯỢNG • ĐIỂM NHÃN KHOA NGHI</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:#F472B6; margin:0.2rem 0;">${st.section_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${st.sub_title}</div>
          </div>
          <span style="background:rgba(236,72,153,0.15); color:#F472B6; border:1px solid #F472B6; font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">CHUYÊN ĐỀ ĐIỂM NHÃN</span>
        </div>

        <!-- 1. Bản thể luận -->
        <div style="margin-bottom:1.8rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.6rem;">${st.statue_consecration_doctrine.title}</h4>
          <div style="background:rgba(236,72,153,0.06); border-left:3px solid #EC4899; padding:0.8rem 1.2rem; border-radius:0 8px 8px 0; margin-bottom:1rem;">
            <div style="font-size:0.95rem; color:var(--text-pure); font-style:italic;">"${st.statue_consecration_doctrine.quote}"</div>
            <div style="font-size:0.75rem; color:#F472B6; margin-top:0.2rem;"> Xuất xứ: <strong>${st.statue_consecration_doctrine.quote_source}</strong></div>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.7;">${st.statue_consecration_doctrine.desc}</p>
        </div>

        <!-- 2. Điểm nhãn Thất Khiếu -->
        <div style="margin-bottom:1.8rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.4rem;">${st.seven_apertures_ceremony.title}</h4>
          <span style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:1rem;">️ ${st.seven_apertures_ceremony.preparation}</span>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem;">
            ${st.seven_apertures_ceremony.incantations.map(ap => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem 1.2rem;">
                <strong style="color:#F472B6; font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${ap.organ}</strong>
                <div style="background:rgba(0,0,0,0.5); border-left:2px solid #EC4899; padding:0.5rem 0.8rem; font-family:var(--font-title); font-size:0.88rem; color:#FBCFE8; margin-bottom:0.4rem;">
                  "${ap.incantation}"
                </div>
                <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;"> <strong>Tác dụng:</strong> ${ap.role}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Mở khăn đỏ và gương soi -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:0.8rem;">${st.mirror_and_cloth_ritual.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.8rem;">
            ${st.mirror_and_cloth_ritual.steps.map((stStep, idx) => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.8rem 1rem; border-radius:8px; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
                <span style="background:#EC4899; color:#fff; font-size:0.75rem; font-weight:800; padding:0.1rem 0.4rem; border-radius:4px; margin-right:0.3rem;">${idx + 1}</span>
                ${stStep.substring(9)}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 1.17 Render Đại Chuyên Đề Tối Hậu II: Toàn Thư 12 Bài Văn Khấn Cổ Truyền & Dâng Lễ 24 Tiết Khí
  const worshipPrayersContainer = document.getElementById('worship-prayers-container');
  if (worshipPrayersContainer && typeof WORSHIP_CANONICAL_PRAYERS_FULL !== 'undefined') {
    const pr = WORSHIP_CANONICAL_PRAYERS_FULL;
    worshipPrayersContainer.innerHTML = `
      <div style="background:var(--bg-card); border:2px solid var(--jade-cyan); border-radius:16px; padding:2rem; margin-bottom:3rem; box-shadow:0 0 25px rgba(45,212,191,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(45,212,191,0.3); padding-bottom:1rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; font-weight:800;"> CHU TỬ GIA LỄ • TOÀN THƯ VĂN KHẤN NGUYÊN BẢN</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--jade-cyan); margin:0.2rem 0;">${pr.section_title}</h3>
            <div style="font-size:0.88rem; color:var(--text-muted);">${pr.sub_title}</div>
          </div>
          <span style="background:rgba(45,212,191,0.15); color:var(--jade-cyan); border:1px solid var(--jade-cyan); font-size:0.8rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:20px;">12 VĂN KHẤN ĐẠI CÁT</span>
        </div>

        <!-- 1. Danh sách 12 Văn Khấn -->
        <div style="margin-bottom:2rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--text-pure); margin-bottom:1rem;">Kho Báu 12 Bản Văn Khấn Cổ Truyền Định Kỳ & Đại Lễ Trong Năm:</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
            ${pr.twelve_prayers_list.map(p => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.2rem;">
                <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${p.occasion}</strong>
                <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.5rem;">${p.theme}</div>
                <div style="background:rgba(45,212,191,0.05); border-left:2px solid var(--jade-cyan); padding:0.5rem 0.8rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:#A7F3D0; font-style:italic;">
                  "${p.core_quote}"
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Dâng lễ 4 mùa 24 tiết khí -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:var(--jade-cyan); margin-bottom:1rem;">${pr.seasonal_offerings_guide.title}</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.9rem;">
            ${pr.seasonal_offerings_guide.seasons.map(s => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:1rem 1.2rem; border-radius:10px;">
                <strong style="color:var(--text-pure); font-size:0.92rem; display:block; margin-bottom:0.4rem;"> ${s.season}</strong>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">${s.offering}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // BỘ RENDER CHUYÊN SÂU: ĐẠI BÁCH KHOA PHONG THỦY LOAN ĐẦU (8 TRỤ CỘT HỌC THUẬT)
  // =========================================================================
  function renderLoanDauAcademicSection(containerId, data, romanNum, tagTitle, schoolType = 'LOAN ĐẦU', anchorId = '') {
    const container = document.getElementById(containerId);
    if (!container || !data) return;

    let themeColor = '#F59E0B';
    let borderColor = '#D97706';
    let shadowGlow = 'rgba(217,119,6,0.2)';
    let badgeBg = 'rgba(245,158,11,0.15)';
    let schoolIcon = '';

    if (schoolType === 'BÁT TRẠCH') {
      themeColor = '#60A5FA';
      borderColor = '#2563EB';
      shadowGlow = 'rgba(37,99,235,0.2)';
      badgeBg = 'rgba(59,130,246,0.15)';
      schoolIcon = '';
    } else if (schoolType === 'TAM HỢP') {
      themeColor = '#34D399';
      borderColor = '#059669';
      shadowGlow = 'rgba(5,150,105,0.2)';
      badgeBg = 'rgba(16,185,129,0.15)';
      schoolIcon = '';
    }

    container.innerHTML = `
      <div id="${anchorId}" style="background:var(--bg-card); border:2px solid ${borderColor}; border-radius:18px; padding:2rem; margin-bottom:2.5rem; box-shadow:0 0 25px ${shadowGlow}; scroll-margin-top:100px;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.8rem; border-bottom:1px solid ${borderColor}44; padding-bottom:1.2rem;">
          <div>
            <span style="font-size:0.75rem; color:${themeColor}; text-transform:uppercase; letter-spacing:1.2px; font-weight:800;">${schoolIcon} PHONG THỦY ${schoolType} • ${tagTitle}</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:${themeColor}; margin:0.3rem 0; font-weight:700;">${data.chapter_title}</h3>
            <div style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${data.sub_title}</div>
          </div>
          <span style="background:${badgeBg}; color:${themeColor}; border:1px solid ${themeColor}; font-size:0.82rem; font-weight:800; padding:0.4rem 1rem; border-radius:20px;">TIẾT ${romanNum} (${schoolType})</span>
        </div>

        <!-- 1. Cổ Huấn Nguyên Văn -->
        <div style="margin-bottom:2rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--gold-primary); margin-bottom:0.8rem;">1.  Cổ Huấn Nguyên Văn & Xuất Xứ Thư Tịch Cổ</h4>
          <div style="display:flex; flex-direction:column; gap:0.9rem;">
            ${data.canonical_texts.map(ct => `
              <div style="background:rgba(245,158,11,0.05); border-left:3px solid #F59E0B; padding:1rem 1.2rem; border-radius:0 8px 8px 0;">
                <div style="font-family:'Noto Serif SC', serif; font-size:1.05rem; color:var(--gold-primary); letter-spacing:1px; margin-bottom:0.3rem;">${ct.hanzi}</div>
                <div style="font-size:0.88rem; color:var(--text-pure); font-style:italic; margin-bottom:0.3rem;">"${ct.pinyin}"</div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:0.4rem;"> <strong>Dịch nghĩa:</strong> ${ct.meaning}</div>
                <div style="font-size:0.75rem; color:#F59E0B; font-weight:700;"> Nguồn gốc: ${ct.source}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Giải Nghĩa Học Thuật & Danh Sư Đối Chiếu -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--jade-cyan); margin-bottom:0.8rem;">2.  Giải Nghĩa Học Thuật & Đối Chiếu Danh Sư</h4>
          <!-- Từ điển thuật ngữ -->
          <div style="margin-bottom:1rem;">
            <div style="font-size:0.82rem; color:var(--text-muted); font-weight:700; margin-bottom:0.5rem; text-transform:uppercase;"> Bảng Việt Hóa Thuật Ngữ:</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
              ${data.scholarly_analysis.term_glossary.map(tg => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.6rem 0.9rem; border-radius:8px; font-size:0.82rem;">
                  <strong style="color:var(--gold-primary);">${tg.term}</strong> <span style="color:#94A3B8;">(${tg.hanzi})</span>: <span style="color:var(--text-pure);">${tg.plain_vn}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <!-- Quan điểm Danh sư -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem;">
            ${data.scholarly_analysis.masters_views.map(mv => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem 1.2rem;">
                <strong style="color:var(--jade-cyan); font-size:0.92rem; display:block; margin-bottom:0.4rem;"> ${mv.master}</strong>
                <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6;">${mv.perspective}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Quy Luật Cốt Lõi (Bảng IF-THEN / Ma Trận Cát Hung) -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--text-pure); margin-bottom:0.8rem;">3.  Quy Luật & Công Thức Cốt Lõi (Cát vs Hung)</h4>
          ${data.core_rules.rule_table ? `
            <div style="display:flex; flex-direction:column; gap:0.7rem; margin-bottom:1rem;">
              ${data.core_rules.rule_table.map(r => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem 1.1rem; font-size:0.84rem;">
                  <div style="color:#60A5FA; font-weight:700; margin-bottom:0.2rem;"> ${r.condition}</div>
                  <div style="color:#34D399; font-weight:600; margin-bottom:0.2rem;"> ${r.result}</div>
                  <div style="color:var(--text-muted); font-size:0.8rem; font-style:italic;"> ${r.principle}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.ngu_bat_kha_tang ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.ngu_bat_kha_tang.map(nb => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:1rem;">
                  <strong style="color:#F87171; font-size:0.95rem;"> ${nb.name}</strong>
                  <div style="font-size:0.82rem; color:var(--text-pure); margin:0.3rem 0;"><strong>Đặc điểm:</strong> ${nb.trait}</div>
                  <div style="font-size:0.8rem; color:#FCD34D;"> <strong>Hậu quả:</strong> ${nb.hazard}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.five_elements_forms ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.five_elements_forms.map(f => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem;"> ${f.element}</strong>
                  <div style="font-size:0.82rem; color:var(--text-pure); margin:0.3rem 0;"><strong>Hình dáng:</strong> ${f.shape}</div>
                  <div style="font-size:0.8rem; color:#34D399; margin-bottom:0.3rem;">${f.fortune}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted);">️ <strong>Kiến trúc:</strong> ${f.color_arch}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.hierarchy_chain ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.hierarchy_chain.map(hc => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem;"> ${hc.level}</strong>
                  <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${hc.desc}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.four_archetypes ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.four_archetypes.map(a => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#F59E0B; font-size:0.95rem;"> ${a.name}</strong>
                  <div style="font-size:0.82rem; color:var(--text-pure); margin:0.3rem 0;"><strong>Hình thế:</strong> ${a.shape}</div>
                  <div style="font-size:0.8rem; color:var(--jade-cyan);">${a.key_point}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.twenty_four_fatal_spots ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.twenty_four_fatal_spots.map(fs => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:1rem;">
                  <strong style="color:#F87171; font-size:0.92rem;"> ${fs.category}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${fs.examples}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.four_emblems ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.four_emblems.map(e => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem;">️ ${e.pos}</strong>
                  <div style="font-size:0.82rem; color:var(--text-pure); margin:0.3rem 0;"><strong>Chuẩn mực:</strong> ${e.standard}</div>
                  <div style="font-size:0.8rem; color:#34D399; margin-bottom:0.2rem;"> <strong>Chủ về:</strong> ${e.fortune}</div>
                  <div style="font-size:0.78rem; color:#F87171;"> <strong>Cấm kỵ:</strong> ${e.taboo}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.four_extraordinary_sands ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.four_extraordinary_sands.map(s => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--jade-cyan); font-size:0.92rem;"> ${s.name}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${s.role}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.water_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.water_matrix.map(w => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#60A5FA; font-size:0.95rem;"> ${w.name}</strong>
                  <div style="font-size:0.82rem; color:var(--text-pure); margin:0.3rem 0;"><strong>Hình thế:</strong> ${w.shape}</div>
                  <div style="font-size:0.8rem; color:${w.fortune.includes('HUNG') ? '#F87171' : '#34D399'};">${w.fortune}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.ngu_hu_ngu_thuc ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.ngu_hu_ngu_thuc.map(nh => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid ${nh.type.includes('HƯ') ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)'}; border-radius:10px; padding:1.1rem;">
                  <strong style="color:${nh.type.includes('HƯ') ? '#F87171' : '#34D399'}; font-size:0.92rem; display:block; margin-bottom:0.4rem;">${nh.type}</strong>
                  <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">${nh.detail}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.twenty_eight_shas ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:0.8rem; margin-bottom:1rem; max-height:550px; overflow-y:auto; padding-right:0.5rem;">
              ${data.core_rules.twenty_eight_shas.map(s => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:0.9rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <span style="font-size:0.75rem; color:#EF4444; font-weight:800; background:rgba(239,68,68,0.1); padding:0.1rem 0.5rem; border-radius:4px;">${s.id}</span>
                    <strong style="color:var(--gold-primary); font-size:0.88rem;">${s.name}</strong>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-pure); margin-bottom:0.3rem;"><strong>Hình thế:</strong> ${s.form}</div>
                  <div style="font-size:0.78rem; color:${s.danger.includes('CỰC HUNG') ? '#F87171' : '#FCD34D'}; line-height:1.5;">${s.danger}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.interior_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.interior_matrix.map(im => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.4rem;"> ${im.component}</strong>
                  <div style="font-size:0.8rem; color:#F87171; margin-bottom:0.4rem;"> <strong>Cấm kỵ:</strong> ${im.taboos}</div>
                  <div style="font-size:0.8rem; color:#34D399;"> <strong>Chuẩn mực vàng:</strong> ${im.golden_rule}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.score_matrix_100 ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.score_matrix_100.map(sm => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--jade-cyan); font-size:0.92rem;"> ${sm.pillar}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${sm.criteria}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.rating_scale ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.rating_scale.map(rs => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px; padding:0.8rem 1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.88rem;"> ${rs.score_range}</strong>
                  <div style="font-size:0.8rem; color:var(--text-pure); margin-top:0.2rem;">${rs.verdict}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.nine_palaces_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.nine_palaces_matrix.map(np => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#60A5FA; font-size:0.95rem;"> ${np.num}</strong>
                  <div style="font-size:0.82rem; color:var(--gold-primary); margin:0.3rem 0;"> <strong>Hướng:</strong> ${np.direction} (${np.element})</div>
                  <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">${np.symbol}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.cung_phi_formula ? `
            <div style="display:flex; flex-direction:column; gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.cung_phi_formula.map(cf => `
                <div style="background:rgba(59,130,246,0.05); border-left:3px solid #60A5FA; padding:0.9rem 1.1rem; border-radius:0 8px 8px 0; font-size:0.84rem;">
                  <strong style="color:#60A5FA; display:block; margin-bottom:0.3rem;"> ${cf.target}</strong>
                  <div style="color:var(--text-pure); line-height:1.6; white-space:pre-line;">${cf.steps}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.eight_gua_people_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.eight_gua_people_matrix.map(eg => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <strong style="color:var(--gold-primary); font-size:0.95rem;">${eg.gua}</strong>
                    <span style="font-size:0.75rem; color:${eg.group.includes('ĐÔNG') ? '#34D399' : '#F59E0B'}; font-weight:700;">${eg.group}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--jade-cyan); margin-bottom:0.3rem;"> Ngũ hành: ${eg.element}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;"> <strong>Hướng tốt:</strong> ${eg.good_dirs}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.eight_houses_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.eight_houses_matrix.map(eh => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#60A5FA; font-size:0.95rem;"> ${eh.house}</strong>
                  <div style="font-size:0.82rem; color:var(--gold-primary); margin:0.2rem 0;"> <strong>Tọa hướng:</strong> ${eh.sitting_facing}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">${eh.doors}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.eight_stars_detail ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.eight_stars_detail.map(es => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid ${es.nature.includes('CÁT') ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}; border-radius:10px; padding:1rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <strong style="color:${es.nature.includes('CÁT') ? 'var(--gold-primary)' : '#F87171'}; font-size:0.92rem;"> ${es.star}</strong>
                    <span style="font-size:0.75rem; color:${es.nature.includes('CÁT') ? '#34D399' : '#F87171'}; font-weight:800;">${es.nature}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">${es.impact}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.hexagram_transformation_rules ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.hexagram_transformation_rules.map(ht => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#60A5FA; font-size:0.9rem; display:block; margin-bottom:0.2rem;"> ${ht.change}</strong>
                  <div style="font-size:0.82rem; color:#34D399; font-weight:700; margin-bottom:0.2rem;"> Tạo sao: ${ht.creates_star}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;"> ${ht.example}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.tam_yeu_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.tam_yeu_matrix.map(ty => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${ty.pattern}</strong>
                  <div style="font-size:0.82rem; color:var(--jade-cyan); margin-bottom:0.3rem;"> <strong>Chủ:</strong> ${ty.best_host}</div>
                  <div style="font-size:0.82rem; color:#F59E0B;"> <strong>Táo:</strong> ${ty.best_kitchen}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.twenty_four_mountains_map ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.twenty_four_mountains_map.map(tm => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#60A5FA; font-size:0.92rem;"> ${tm.gua}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${tm.mountains}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.kitchen_toilet_altar_rules ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.kitchen_toilet_altar_rules.map(kt => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${kt.facility}</strong>
                  <div style="font-size:0.82rem; color:#F87171; margin-bottom:0.3rem;">${kt.sitting}</div>
                  ${kt.facing ? `<div style="font-size:0.82rem; color:#34D399;">${kt.facing}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.five_remedy_methods ? `
            <div style="display:flex; flex-direction:column; gap:0.7rem; margin-bottom:1rem;">
              ${data.core_rules.five_remedy_methods.map(fr => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px; padding:0.9rem 1.1rem; font-size:0.84rem;">
                  <strong style="color:#60A5FA; display:block; margin-bottom:0.2rem;"> ${fr.method}</strong>
                  <div style="color:var(--text-muted); line-height:1.5;">${fr.mechanism}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.master_decision_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.master_decision_matrix.map(md => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.9rem;"> ${md.step}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem; line-height:1.5;">${md.content}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.twelve_life_stages ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.twelve_life_stages.map(ls => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.95rem; display:block; margin-bottom:0.2rem;"> ${ls.stage}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;"> ${ls.meaning}</div>
                  <div style="font-size:0.8rem; color:${ls.impact.includes('CÁT') ? '#34D399' : '#F87171'}; font-weight:600;"> ${ls.impact}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.four_great_bureaus ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.four_great_bureaus.map(fb => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:#60A5FA; font-size:0.95rem; display:block; margin-bottom:0.3rem;"> ${fb.bureau}</strong>
                  <div style="font-size:0.82rem; color:var(--gold-primary); margin-bottom:0.2rem;"> <strong>Thủy Khẩu:</strong> ${fb.water_exit}</div>
                  <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;"> ${fb.vital_spots}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.twelve_waters_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.twelve_waters_matrix.map(tw => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid ${tw.nature.includes('CÁT') ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}; border-radius:10px; padding:1rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <strong style="color:var(--text-pure); font-size:0.9rem;"> ${tw.pos}</strong>
                    <span style="font-size:0.75rem; color:${tw.nature.includes('CÁT') ? '#34D399' : '#F87171'}; font-weight:800;">${tw.nature}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">${tw.fortune}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.four_water_exits ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.four_water_exits.map(fe => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.92rem;"> ${fe.exit}</strong>
                  <div style="font-size:0.8rem; color:#34D399; font-weight:700; margin:0.2rem 0;">Cục: ${fe.bureau}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">${fe.mechanism}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.three_plates_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.three_plates_matrix.map(tp => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:#60A5FA; font-size:0.95rem; display:block; margin-bottom:0.2rem;"> ${tp.plate}</strong>
                  <div style="font-size:0.8rem; color:var(--gold-primary); margin-bottom:0.3rem;"> Độ lệch: ${tp.offset}</div>
                  <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;"> <strong>Công năng:</strong> ${tp.usage}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.five_types_of_sha ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.five_types_of_sha.map(fs => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.92rem; display:block; margin-bottom:0.2rem;"> ${fs.type}</strong>
                  <div style="font-size:0.8rem; color:#60A5FA; margin-bottom:0.2rem;"> ${fs.formula}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">${fs.result}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.eight_yellow_spring_routes ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.9rem; margin-bottom:1rem;">
              ${data.core_rules.eight_yellow_spring_routes.map(ys => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem;">
                  <strong style="color:var(--text-pure); font-size:0.92rem; display:block; margin-bottom:0.3rem;"> ${ys.facing}</strong>
                  <div style="font-size:0.82rem; color:#F87171; margin-bottom:0.3rem;"> ${ys.killer_water}</div>
                  <div style="font-size:0.82rem; color:#34D399;"> ${ys.savior_water}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.eight_fatal_shas ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.eight_fatal_shas.map(ef => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:1rem;">
                  <strong style="color:var(--gold-primary); font-size:0.9rem; display:block; margin-bottom:0.2rem;"> ${ef.sitting}</strong>
                  <div style="font-size:0.82rem; color:#F87171; font-weight:700; margin-bottom:0.2rem;"> ${ef.fatal_sha}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;"> ${ef.cause}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.urban_water_engineering_matrix ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.urban_water_engineering_matrix.map(uw => `
                <div style="background:rgba(13,17,26,0.9); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                  <strong style="color:#34D399; font-size:0.92rem; display:block; margin-bottom:0.2rem;"> ${uw.component}</strong>
                  <div style="font-size:0.8rem; color:var(--gold-primary); margin-bottom:0.2rem;"> <strong>Vị trí:</strong> ${uw.location}</div>
                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">${uw.standard}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${data.core_rules.master_integration_framework ? `
            <div style="display:flex; flex-direction:column; gap:0.8rem; margin-bottom:1rem;">
              ${data.core_rules.master_integration_framework.map(mi => `
                <div style="background:rgba(255,255,255,0.02); border-left:3px solid var(--gold-primary); padding:0.9rem 1.1rem; border-radius:0 8px 8px 0; font-size:0.84rem;">
                  <strong style="color:var(--gold-primary); display:block; margin-bottom:0.3rem;"> ${mi.layer}</strong>
                  <div style="color:var(--text-muted); line-height:1.6;">${mi.action}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- 4. Áp Dụng Cho 8 Phân Tầng Bất Động Sản -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--gold-primary); margin-bottom:0.8rem;">4.  Hướng Dẫn Thực Hành Theo Từng Loại Bất Động Sản (8 Đối Tượng)</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:0.8rem;">
            ${data.real_estate_applications.map(app => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:10px; padding:1rem;">
                <strong style="color:var(--jade-cyan); font-size:0.9rem; display:block; margin-bottom:0.3rem;"> ${app.category}</strong>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">${app.action_guide}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. Quy Trình Khảo Sát Tự Đánh Giá -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:#34D399; margin-bottom:0.8rem;">5.  ${data.actionable_checklist.title} (Dành Cho Người Không Chuyên)</h4>
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            ${data.actionable_checklist.steps.map(st => `
              <div style="background:rgba(52,211,153,0.05); border-left:3px solid #34D399; padding:0.8rem 1.1rem; border-radius:0 8px 8px 0; font-size:0.84rem;">
                <strong style="color:#34D399; display:block; margin-bottom:0.2rem;"> ${st.step}</strong>
                <div style="color:var(--text-pure); line-height:1.5;">${st.instruction}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6. Phương Pháp Hóa Giải & Chi Phí -->
        <div style="margin-bottom:2rem; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
          <h4 style="font-family:var(--font-title); font-size:1.15rem; color:#F59E0B; margin-bottom:0.8rem;">6.  ${data.remedy_framework.title} (Đa Tầng & Chi Phí Ước Tính)</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:0.9rem;">
            ${data.remedy_framework.remedies.map(r => `
              <div style="background:rgba(13,17,26,0.9); border:1px solid rgba(245,158,11,0.25); border-radius:10px; padding:1.1rem;">
                <strong style="color:#F87171; font-size:0.92rem; display:block; margin-bottom:0.4rem;"> Lỗi phạm: ${r.flaw}</strong>
                <div style="font-size:0.82rem; color:var(--text-pure); margin-bottom:0.3rem;"> <strong>Vật lý/Kiến trúc:</strong> ${r.physical_fix}</div>
                ${r.fengshui_fix ? `<div style="font-size:0.82rem; color:var(--gold-primary); margin-bottom:0.3rem;"> <strong>Khí học:</strong> ${r.fengshui_fix}</div>` : ''}
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; font-size:0.78rem; background:rgba(0,0,0,0.3); padding:0.4rem 0.6rem; border-radius:6px;">
                  <span style="color:#FCD34D;"> Chi phí: <strong>${r.cost_level}</strong></span>
                  <span style="color:#A7F3D0;"> ${r.recommendation}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 7. Mức Độ Tin Cậy & 8. Thực Nghiệm Việt Nam -->
        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.2rem;">
          <div>
            <h4 style="font-family:var(--font-title); font-size:1.1rem; color:#A78BFA; margin-bottom:0.6rem;">7.  Đánh Giá Mức Độ Tin Cậy</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${data.reliability_evaluation.map(re => `
                <div style="background:rgba(167,139,250,0.05); border-left:2px solid #A78BFA; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.8rem; color:var(--text-muted); line-height:1.5;">
                  <strong style="color:#C4B5FD;">${re.level}</strong>: ${re.content}
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h4 style="font-family:var(--font-title); font-size:1.1rem; color:var(--jade-cyan); margin-bottom:0.6rem;">8.  Thực Nghiệm Hiện Trường Tại Việt Nam</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${data.vietnam_case_studies.map(cs => `
                <div style="background:rgba(45,212,191,0.05); border-left:2px solid var(--jade-cyan); padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.8rem; color:var(--text-muted); line-height:1.5;">
                  <strong style="color:var(--jade-cyan);">${cs.location}</strong>: ${cs.analysis}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render 10 Tiết Loan Đầu Chánh Tông
  if (typeof LOANDAU_FENGSHUI_PART_1 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part1-container', LOANDAU_FENGSHUI_PART_1, 'I', 'BẢN THỂ LUẬN & LONG MẠCH', 'LOAN ĐẦU', 'loandau-tiet-1');
  }
  if (typeof LOANDAU_FENGSHUI_PART_2 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part2-container', LOANDAU_FENGSHUI_PART_2, 'II', 'NGŨ HÀNH & CỬU TINH', 'LOAN ĐẦU', 'loandau-tiet-2');
  }
  if (typeof LOANDAU_FENGSHUI_PART_3 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part3-container', LOANDAU_FENGSHUI_PART_3, 'III', 'TẦM LONG & BÁC HOÁN', 'LOAN ĐẦU', 'loandau-tiet-3');
  }
  if (typeof LOANDAU_FENGSHUI_PART_4 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part4-container', LOANDAU_FENGSHUI_PART_4, 'IV', 'ĐIỂM HUYỆT & 24 HUNG HUYỆT', 'LOAN ĐẦU', 'loandau-tiet-4');
  }
  if (typeof LOANDAU_FENGSHUI_PART_5 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part5-container', LOANDAU_FENGSHUI_PART_5, 'V', 'KHẢO SA & TỨ LINH', 'LOAN ĐẦU', 'loandau-tiet-5');
  }
  if (typeof LOANDAU_FENGSHUI_PART_6 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part6-container', LOANDAU_FENGSHUI_PART_6, 'VI', 'THẨM THỦY & THỦY KHẨU', 'LOAN ĐẦU', 'loandau-tiet-6');
  }
  if (typeof LOANDAU_FENGSHUI_PART_7 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part7-container', LOANDAU_FENGSHUI_PART_7, 'VII', 'DƯƠNG TRẠCH & MINH ĐƯỜNG', 'LOAN ĐẦU', 'loandau-tiet-7');
  }
  if (typeof LOANDAU_FENGSHUI_PART_8 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part8-container', LOANDAU_FENGSHUI_PART_8, 'VIII', '28 ĐẠI SÁT KHÍ ĐÔ THỊ', 'LOAN ĐẦU', 'loandau-tiet-8');
  }
  if (typeof LOANDAU_FENGSHUI_PART_9 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part9-container', LOANDAU_FENGSHUI_PART_9, 'IX', 'NỘI CỤC LOAN ĐẦU', 'LOAN ĐẦU', 'loandau-tiet-9');
  }
  if (typeof LOANDAU_FENGSHUI_PART_10 !== 'undefined') {
    renderLoanDauAcademicSection('loandau-part10-container', LOANDAU_FENGSHUI_PART_10, 'X', 'ĐẠI TỔNG KẾT & CẢI MỆNH', 'LOAN ĐẦU', 'loandau-tiet-10');
  }

  // Render 10 Tiết Bát Trạch Chánh Tông
  if (typeof BATTRACH_FENGSHUI_PART_1 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part1-container', BATTRACH_FENGSHUI_PART_1, 'I', 'HÀ ĐỒ LẠC THƯ & CỬU CUNG', 'BÁT TRẠCH', 'battrach-tiet-1');
  }
  if (typeof BATTRACH_FENGSHUI_PART_2 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part2-container', BATTRACH_FENGSHUI_PART_2, 'II', 'CUNG PHI NAM NỮ & MỆNH QUÁI', 'BÁT TRẠCH', 'battrach-tiet-2');
  }
  if (typeof BATTRACH_FENGSHUI_PART_3 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part3-container', BATTRACH_FENGSHUI_PART_3, 'III', 'ĐÔNG TÂY TỨ TRẠCH & 8 HƯỚNG', 'BÁT TRẠCH', 'battrach-tiet-3');
  }
  if (typeof BATTRACH_FENGSHUI_PART_4 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part4-container', BATTRACH_FENGSHUI_PART_4, 'IV', 'BÁT ĐẠI DU NIÊN TOÀN THƯ', 'BÁT TRẠCH', 'battrach-tiet-4');
  }
  if (typeof BATTRACH_FENGSHUI_PART_5 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part5-container', BATTRACH_FENGSHUI_PART_5, 'V', 'PHÉP BIẾN QUÁI & ĐẠI DU NIÊN', 'BÁT TRẠCH', 'battrach-tiet-5');
  }
  if (typeof BATTRACH_FENGSHUI_PART_6 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part6-container', BATTRACH_FENGSHUI_PART_6, 'VI', 'DƯƠNG TRẠCH TAM YẾU', 'BÁT TRẠCH', 'battrach-tiet-6');
  }
  if (typeof BATTRACH_FENGSHUI_PART_7 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part7-container', BATTRACH_FENGSHUI_PART_7, 'VII', '24 SƠN & SAO PHÚC ĐỨC', 'BÁT TRẠCH', 'battrach-tiet-7');
  }
  if (typeof BATTRACH_FENGSHUI_PART_8 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part8-container', BATTRACH_FENGSHUI_PART_8, 'VIII', 'TỌA HUNG HƯỚNG CÁT BẾP & WC', 'BÁT TRẠCH', 'battrach-tiet-8');
  }
  if (typeof BATTRACH_FENGSHUI_PART_9 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part9-container', BATTRACH_FENGSHUI_PART_9, 'IX', 'MA TRẬN HÓA GIẢI HƯỚNG XẤU', 'BÁT TRẠCH', 'battrach-tiet-9');
  }
  if (typeof BATTRACH_FENGSHUI_PART_10 !== 'undefined') {
    renderLoanDauAcademicSection('battrach-part10-container', BATTRACH_FENGSHUI_PART_10, 'X', 'ĐẠI TỔNG KẾT BÁT TRẠCH', 'BÁT TRẠCH', 'battrach-tiet-10');
  }

  // Render 10 Tiết Tam Hợp Chánh Tông
  if (typeof TAMHOP_FENGSHUI_PART_1 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part1-container', TAMHOP_FENGSHUI_PART_1, 'I', '12 CUNG TRƯỜNG SINH', 'TAM HỢP', 'tamhop-tiet-1');
  }
  if (typeof TAMHOP_FENGSHUI_PART_2 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part2-container', TAMHOP_FENGSHUI_PART_2, 'II', 'TỨ ĐẠI CỤC TAM HỢP', 'TAM HỢP', 'tamhop-tiet-2');
  }
  if (typeof TAMHOP_FENGSHUI_PART_3 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part3-container', TAMHOP_FENGSHUI_PART_3, 'III', 'TAM HỢP THỦY PHÁP', 'TAM HỢP', 'tamhop-tiet-3');
  }
  if (typeof TAMHOP_FENGSHUI_PART_4 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part4-container', TAMHOP_FENGSHUI_PART_4, 'IV', 'TỨ ĐẠI THỦY KHẨU', 'TAM HỢP', 'tamhop-tiet-4');
  }
  if (typeof TAMHOP_FENGSHUI_PART_5 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part5-container', TAMHOP_FENGSHUI_PART_5, 'V', 'TAM BÀN LA KINH', 'TAM HỢP', 'tamhop-tiet-5');
  }
  if (typeof TAMHOP_FENGSHUI_PART_6 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part6-container', TAMHOP_FENGSHUI_PART_6, 'VI', 'CỬU TINH TIÊU SA', 'TAM HỢP', 'tamhop-tiet-6');
  }
  if (typeof TAMHOP_FENGSHUI_PART_7 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part7-container', TAMHOP_FENGSHUI_PART_7, 'VII', 'HOÀNG TUYỀN SÁT', 'TAM HỢP', 'tamhop-tiet-7');
  }
  if (typeof TAMHOP_FENGSHUI_PART_8 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part8-container', TAMHOP_FENGSHUI_PART_8, 'VIII', 'BÁT SÁT HOÀNG TUYỀN', 'TAM HỢP', 'tamhop-tiet-8');
  }
  if (typeof TAMHOP_FENGSHUI_PART_9 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part9-container', TAMHOP_FENGSHUI_PART_9, 'IX', 'THỦY PHÁP ĐÔ THỊ & HỒ KOI', 'TAM HỢP', 'tamhop-tiet-9');
  }
  if (typeof TAMHOP_FENGSHUI_PART_10 !== 'undefined') {
    renderLoanDauAcademicSection('tamhop-part10-container', TAMHOP_FENGSHUI_PART_10, 'X', 'ĐẠI TỔNG KẾT TAM ĐẠI PHÁI', 'TAM HỢP', 'tamhop-tiet-10');
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
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;"> ${t.quote_trans}</div>
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

  // 4. Càn Khôn Đồ Hình (Mạng Lưới Tri Thức Phong Thủy Đồ Hình Toán Học)
  const antigravityGraph = new AntigravityGraph('graph-container', 'graph-drawer');
  window.antigravityGraph = antigravityGraph;

  document.querySelectorAll('.graph-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      
      document.querySelectorAll('.graph-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      antigravityGraph.filterGroup(btn.dataset.group);
    });
  });

  const resetGraphBtn = document.getElementById('btn-reset-graph');
  if (resetGraphBtn) {
    resetGraphBtn.addEventListener('click', () => {
      
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

  // =========================================================================
  // MEGA MENU DRAWER & SMART SEARCH ENGINE CONTROLLER
  // =========================================================================
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerToggleBtn = document.getElementById('menu-drawer-toggle');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  const openDrawer = () => { if (drawerOverlay) drawerOverlay.classList.add('open'); };
  const closeDrawer = () => { if (drawerOverlay) drawerOverlay.classList.remove('open'); };

  if (drawerToggleBtn) drawerToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });
  }

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => { closeDrawer(); });
  });

  document.querySelectorAll('.menu-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.parentElement;
      group.classList.toggle('open');
    });
  });

    // =========================================================================
  // BỘ MÁY TÌM KIẾM BÁCH KHOA TOÀN VĂN & HỖ TRỢ TIẾNG VIỆT ĐA TẦNG
  // =========================================================================
  function removeVietnameseTones(str) {
    if (!str) return '';
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[đĐ]/g, 'd');
    return str.toLowerCase();
  }

  const searchInput = document.getElementById('global-search-input');
  const searchResultsBox = document.getElementById('search-results-box');

  const buildMasterSearchIndex = () => {
    const rawList = [
      // 0. Khởi Nguyên Bản Thể Luận Âm Dương Ngũ Hành (10 Tiết)
      { data: typeof AMDUONG_NGUHANH_PART_1 !== 'undefined' ? AMDUONG_NGUHANH_PART_1 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-1' },
      { data: typeof AMDUONG_NGUHANH_PART_2 !== 'undefined' ? AMDUONG_NGUHANH_PART_2 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-2' },
      { data: typeof AMDUONG_NGUHANH_PART_3 !== 'undefined' ? AMDUONG_NGUHANH_PART_3 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-3' },
      { data: typeof AMDUONG_NGUHANH_PART_4 !== 'undefined' ? AMDUONG_NGUHANH_PART_4 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-4' },
      { data: typeof AMDUONG_NGUHANH_PART_5 !== 'undefined' ? AMDUONG_NGUHANH_PART_5 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-5' },
      { data: typeof AMDUONG_NGUHANH_PART_6 !== 'undefined' ? AMDUONG_NGUHANH_PART_6 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-6' },
      { data: typeof AMDUONG_NGUHANH_PART_7 !== 'undefined' ? AMDUONG_NGUHANH_PART_7 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-7' },
      { data: typeof AMDUONG_NGUHANH_PART_8 !== 'undefined' ? AMDUONG_NGUHANH_PART_8 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-8' },
      { data: typeof AMDUONG_NGUHANH_PART_9 !== 'undefined' ? AMDUONG_NGUHANH_PART_9 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-9' },
      { data: typeof AMDUONG_NGUHANH_PART_10 !== 'undefined' ? AMDUONG_NGUHANH_PART_10 : null, school: 'Âm Dương Bản Thể', anchor: 'amduong-tiet-10' },

      // 1. Thờ Cúng
      { data: typeof WORSHIP_FENGSHUI_PART_1 !== 'undefined' ? WORSHIP_FENGSHUI_PART_1 : null, school: 'Thờ Cúng', anchor: 'mach-thocung' },
      { data: typeof WORSHIP_ESOTERIC_DATA !== 'undefined' ? WORSHIP_ESOTERIC_DATA : null, school: 'Thờ Cúng', anchor: 'worship-esoteric-container' },
      { data: typeof WORSHIP_STATUES_DATA !== 'undefined' ? WORSHIP_STATUES_DATA : null, school: 'Thờ Cúng', anchor: 'worship-statues-container' },
      { data: typeof WORSHIP_PRAYERS_DATA !== 'undefined' ? WORSHIP_PRAYERS_DATA : null, school: 'Thờ Cúng', anchor: 'worship-prayers-container' },

      // 2. Loan Đầu (10 Tiết)
      { data: typeof LOANDAU_FENGSHUI_PART_1 !== 'undefined' ? LOANDAU_FENGSHUI_PART_1 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-1' },
      { data: typeof LOANDAU_FENGSHUI_PART_2 !== 'undefined' ? LOANDAU_FENGSHUI_PART_2 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-2' },
      { data: typeof LOANDAU_FENGSHUI_PART_3 !== 'undefined' ? LOANDAU_FENGSHUI_PART_3 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-3' },
      { data: typeof LOANDAU_FENGSHUI_PART_4 !== 'undefined' ? LOANDAU_FENGSHUI_PART_4 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-4' },
      { data: typeof LOANDAU_FENGSHUI_PART_5 !== 'undefined' ? LOANDAU_FENGSHUI_PART_5 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-5' },
      { data: typeof LOANDAU_FENGSHUI_PART_6 !== 'undefined' ? LOANDAU_FENGSHUI_PART_6 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-6' },
      { data: typeof LOANDAU_FENGSHUI_PART_7 !== 'undefined' ? LOANDAU_FENGSHUI_PART_7 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-7' },
      { data: typeof LOANDAU_FENGSHUI_PART_8 !== 'undefined' ? LOANDAU_FENGSHUI_PART_8 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-8' },
      { data: typeof LOANDAU_FENGSHUI_PART_9 !== 'undefined' ? LOANDAU_FENGSHUI_PART_9 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-9' },
      { data: typeof LOANDAU_FENGSHUI_PART_10 !== 'undefined' ? LOANDAU_FENGSHUI_PART_10 : null, school: 'Loan Đầu Phái', anchor: 'loandau-tiet-10' },

      // 3. Bát Trạch (10 Tiết)
      { data: typeof BATTRACH_FENGSHUI_PART_1 !== 'undefined' ? BATTRACH_FENGSHUI_PART_1 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-1' },
      { data: typeof BATTRACH_FENGSHUI_PART_2 !== 'undefined' ? BATTRACH_FENGSHUI_PART_2 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-2' },
      { data: typeof BATTRACH_FENGSHUI_PART_3 !== 'undefined' ? BATTRACH_FENGSHUI_PART_3 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-3' },
      { data: typeof BATTRACH_FENGSHUI_PART_4 !== 'undefined' ? BATTRACH_FENGSHUI_PART_4 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-4' },
      { data: typeof BATTRACH_FENGSHUI_PART_5 !== 'undefined' ? BATTRACH_FENGSHUI_PART_5 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-5' },
      { data: typeof BATTRACH_FENGSHUI_PART_6 !== 'undefined' ? BATTRACH_FENGSHUI_PART_6 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-6' },
      { data: typeof BATTRACH_FENGSHUI_PART_7 !== 'undefined' ? BATTRACH_FENGSHUI_PART_7 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-7' },
      { data: typeof BATTRACH_FENGSHUI_PART_8 !== 'undefined' ? BATTRACH_FENGSHUI_PART_8 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-8' },
      { data: typeof BATTRACH_FENGSHUI_PART_9 !== 'undefined' ? BATTRACH_FENGSHUI_PART_9 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-9' },
      { data: typeof BATTRACH_FENGSHUI_PART_10 !== 'undefined' ? BATTRACH_FENGSHUI_PART_10 : null, school: 'Bát Trạch Phái', anchor: 'battrach-tiet-10' },

      // 4. Tam Hợp (10 Tiết)
      { data: typeof TAMHOP_FENGSHUI_PART_1 !== 'undefined' ? TAMHOP_FENGSHUI_PART_1 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-1' },
      { data: typeof TAMHOP_FENGSHUI_PART_2 !== 'undefined' ? TAMHOP_FENGSHUI_PART_2 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-2' },
      { data: typeof TAMHOP_FENGSHUI_PART_3 !== 'undefined' ? TAMHOP_FENGSHUI_PART_3 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-3' },
      { data: typeof TAMHOP_FENGSHUI_PART_4 !== 'undefined' ? TAMHOP_FENGSHUI_PART_4 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-4' },
      { data: typeof TAMHOP_FENGSHUI_PART_5 !== 'undefined' ? TAMHOP_FENGSHUI_PART_5 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-5' },
      { data: typeof TAMHOP_FENGSHUI_PART_6 !== 'undefined' ? TAMHOP_FENGSHUI_PART_6 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-6' },
      { data: typeof TAMHOP_FENGSHUI_PART_7 !== 'undefined' ? TAMHOP_FENGSHUI_PART_7 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-7' },
      { data: typeof TAMHOP_FENGSHUI_PART_8 !== 'undefined' ? TAMHOP_FENGSHUI_PART_8 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-8' },
      { data: typeof TAMHOP_FENGSHUI_PART_9 !== 'undefined' ? TAMHOP_FENGSHUI_PART_9 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-9' },
      { data: typeof TAMHOP_FENGSHUI_PART_10 !== 'undefined' ? TAMHOP_FENGSHUI_PART_10 : null, school: 'Tam Hợp Phái', anchor: 'tamhop-tiet-10' },
      // 5. Huyền Không (10 Tiết)
      { data: typeof HUYENKHONG_FENGSHUI_PART_1 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_1 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-1' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_2 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_2 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-2' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_3 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_3 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-3' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_4 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_4 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-4' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_5 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_5 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-5' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_6 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_6 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-6' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_7 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_7 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-7' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_8 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_8 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-8' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_9 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_9 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-9' },
      { data: typeof HUYENKHONG_FENGSHUI_PART_10 !== 'undefined' ? HUYENKHONG_FENGSHUI_PART_10 : null, school: 'Huyền Không Phái', anchor: 'huyenkhong-tiet-10' },

    ];

    return rawList.filter(item => item.data !== null).map(item => {
      const title = item.data.chapter_title || item.data.title || '';
      const subTitle = item.data.sub_title || item.data.desc || '';
      const fullText = title + ' ' + subTitle + ' ' + JSON.stringify(item.data);
      return {
        school: item.school,
        title: title,
        sub_title: subTitle,
        anchor: item.anchor,
        rawText: fullText.toLowerCase(),
        normText: removeVietnameseTones(fullText)
      };
    });
  };

  const searchIndex = buildMasterSearchIndex();

  const jumpToSection = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('card-highlight-pulse');
      setTimeout(() => el.classList.remove('card-highlight-pulse'), 3000);
      
    }
  };

  const handleSearch = (query) => {
    if (!query || query.trim().length < 2) {
      searchResultsBox.innerHTML = '';
      searchResultsBox.classList.remove('active');
      return;
    }

    const rawQ = query.trim().toLowerCase();
    const normQ = removeVietnameseTones(query.trim());

    const matches = searchIndex.filter(item => {
      return item.rawText.includes(rawQ) || item.normText.includes(normQ);
    }).slice(0, 8);

    if (matches.length === 0) {
      searchResultsBox.innerHTML = `
        <div style="padding:1rem; text-align:center; font-size:0.85rem; color:var(--text-muted);">
          Không tìm thấy bài học nào với từ khóa "<strong>${query}</strong>"
        </div>
      `;
      searchResultsBox.classList.add('active');
      return;
    }

    searchResultsBox.innerHTML = matches.map(m => {
      let badgeColor = '#F59E0B';
      if (m.school.includes('Bát')) badgeColor = '#60A5FA';
      else if (m.school.includes('Tam')) badgeColor = '#34D399';
      else if (m.school.includes('Thờ')) badgeColor = '#E5C07B';

      return `
        <div class="search-result-item" data-target="${m.anchor}">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
            <span class="search-result-title">${m.title}</span>
            <span class="search-result-badge" style="color:${badgeColor};">${m.school}</span>
          </div>
          <div class="search-result-snippet">${m.sub_title}</div>
        </div>
      `;
    }).join('');

    searchResultsBox.classList.add('active');

    searchResultsBox.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        jumpToSection(item.dataset.target);
        searchResultsBox.classList.remove('active');
        searchInput.value = '';
      });
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstMatch = searchResultsBox.querySelector('.search-result-item');
        if (firstMatch) {
          jumpToSection(firstMatch.dataset.target);
          searchResultsBox.classList.remove('active');
          searchInput.value = '';
        }
      } else if (e.key === 'Escape') {
        searchResultsBox.classList.remove('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsBox.contains(e.target)) {
        searchResultsBox.classList.remove('active');
      }
    });
  }

});
