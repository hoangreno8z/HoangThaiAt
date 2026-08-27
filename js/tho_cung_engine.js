/**
 * BỘ TRA CỨU THƯỚC LỖ BAN 38.8CM (ÂM PHẦN & BÀN THỜ CHÁNH TÔNG)
 */

class LuBan388Engine {
  constructor(inputId, btnId, resultId) {
    this.input = document.getElementById(inputId);
    this.btn = document.getElementById(btnId);
    this.resultContainer = document.getElementById(resultId);

    this.cycle = 38.8; // Chu kỳ thước 38.8cm
    this.palaceLength = 3.88; // Độ dài mỗi cung lớn

    this.palaces = [
      { name: "Đinh (丁)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Phúc Tinh", "Cập Đệ", "Tài Vượng", "Đăng Khoa"] },
      { name: "Hại (害)", type: "hung", tag: "HUNG HIỂM (ĐEN)", color: "#EF4444", subs: ["Khẩu Thiệt", "Bệnh Lâm", "Tử Tuyệt", "Tai Chí"] },
      { name: "Vượng (旺)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Thiên Đức", "Hỷ Sự", "Tiến Bảo", "Nạp Phúc"] },
      { name: "Khổ (苦)", type: "hung", tag: "HUNG HIỂM (ĐEN)", color: "#EF4444", subs: ["Thất Thoát", "Quan Quỷ", "Kiếp Tài", "Vô Tự"] },
      { name: "Nghĩa (義)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Đại Cát", "Tài Vượng", "Ích Tử", "Thiên Khố"] },
      { name: "Quan (官)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Thuận Khoa", "Hoạch Tài", "Tiến Ích", "Phú Quý"] },
      { name: "Tử (死)", type: "hung", tag: "HUNG HIỂM (ĐEN)", color: "#EF4444", subs: ["Ly Hương", "Tử Biệt", "Thoái Đinh", "Thất Tài"] },
      { name: "Hưng (興)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Đăng Khoa", "Quý Tử", "Thêm Đinh", "Hưng Vượng"] },
      { name: "Thất (失)", type: "hung", tag: "HUNG HIỂM (ĐEN)", color: "#EF4444", subs: ["Cô Quả", "Lao Chấp", "Công Sự", "Thoái Tài"] },
      { name: "Tài (財)", type: "cat", tag: "CÁT LÀNH (ĐỎ)", color: "#10B981", subs: ["Nghinh Phúc", "Lục Hợp", "Tiến Bảo", "Tài Đức"] }
    ];

    this.init();
  }

  init() {
    if (this.btn) {
      this.btn.addEventListener('click', () => {
        if (window.soundCtrl) window.soundCtrl.playBell(528);
        this.calculate();
      });
    }
    if (this.input) {
      this.input.addEventListener('input', () => this.calculate());
    }
    this.calculate();
  }

  calculate() {
    if (!this.input || !this.resultContainer) return;
    const val = parseFloat(this.input.value);
    if (isNaN(val) || val <= 0) {
      this.resultContainer.innerHTML = `<div style="color:var(--text-muted); font-size:0.9rem;">Vui lòng nhập kích thước lớn hơn 0 cm.</div>`;
      return;
    }

    // Tính toán vị trí trong chu kỳ 38.8cm
    let pos = val % this.cycle;
    if (pos === 0) pos = this.cycle;

    let palaceIdx = Math.floor(pos / this.palaceLength);
    if (palaceIdx >= 10) palaceIdx = 9;

    const palace = this.palaces[palaceIdx];

    // Tính cung phụ (4 cung phụ trong 1 cung lớn)
    const subLength = this.palaceLength / 4;
    const offsetInPalace = pos - (palaceIdx * this.palaceLength);
    let subIdx = Math.floor(offsetInPalace / subLength);
    if (subIdx >= 4) subIdx = 3;
    const subName = palace.subs[subIdx];

    const isCat = palace.type === 'cat';

    this.resultContainer.innerHTML = `
      <div style="background:rgba(13,17,26,0.9); border:1px solid ${isCat ? '#10B981' : '#EF4444'}; border-radius:12px; padding:1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">KẾT QUẢ THƯỚC LỖ BAN 38.8CM:</div>
          <div style="font-size:1.6rem; font-family:var(--font-title); color:${palace.color}; margin:0.3rem 0;">
            ${val} cm 👉 Cung ${palace.name} • ${subName}
          </div>
          <div style="font-size:0.85rem; color:var(--text-pure);">
            Đánh giá: <strong style="color:${palace.color};">${palace.tag}</strong>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem; color:var(--text-muted);">Vị trí trên thước:</div>
          <div style="font-size:1.1rem; font-weight:700; color:var(--gold-primary);">${pos.toFixed(2)} cm / 38.8 cm</div>
        </div>
      </div>
    `;
  }
}
