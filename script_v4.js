/**
 * Thai At Application Controller
 * Handles UI events, 6-mode switching, timeline slider, 16-cell rendering (>= 6 lines/cell)
 */

let currentMode = "tue";

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    document.getElementById("input-date").value = now.toISOString().split("T")[0];
    document.getElementById("input-time").value = now.toTimeString().substring(0, 5);

    // Mode Nav Buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentMode = btn.getAttribute("data-mode");
            document.getElementById("select-mode").value = currentMode;
            castChart();
        });
    });

    // Select Dropdown Sync
    document.getElementById("select-mode").addEventListener("change", (e) => {
        currentMode = e.target.value;
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.toggle("active", b.getAttribute("data-mode") === currentMode);
        });
        castChart();
    });

    // Form Submit
    document.getElementById("control-form").addEventListener("submit", (e) => {
        e.preventDefault();
        castChart();
    });

    // Timeline Slider
    const slider = document.getElementById("timeline-slider");
    const sliderLabel = document.getElementById("slider-val-label");
    slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        if (val === 0) sliderLabel.textContent = "Hiện tại";
        else if (Math.abs(val) < 30) sliderLabel.textContent = val > 0 ? `+${val} Ngày` : `${val} Ngày`;
        else sliderLabel.textContent = val > 0 ? `+${Math.round(val/30)} Tháng` : `${Math.round(val/30)} Tháng`;

        const baseDate = document.getElementById("input-date").value;
        if (baseDate) {
            const parts = baseDate.split("-");
            const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            d.setDate(d.getDate() + val);
            renderWithDate(d);
        }
    });

    // Initial render
    castChart();
});

function castChart() {
    const dInput = document.getElementById("input-date").value;
    const tInput = document.getElementById("input-time").value;
    if (!dInput || !tInput) return;
    const [y, m, d] = dInput.split("-").map(Number);
    const h = parseInt(tInput.split(":")[0]);
    render(y, m, d, h);
}

function renderWithDate(dObj) {
    const tInput = document.getElementById("input-time").value || "12:00";
    const h = parseInt(tInput.split(":")[0]);
    render(dObj.getFullYear(), dObj.getMonth() + 1, dObj.getDate(), h);
}

function render(year, month, day, hour) {
    const data = calculateThaiAtChart(currentMode, year, month, day, hour);

    // Update header line
    document.getElementById("chart-datetime-header").innerHTML =
        `Năm Tháng Ngày Giờ (Dương Lịch): <span style="font-weight:normal">${data.tuTru.solarDate}</span>`;

    // Update sidebar info
    document.getElementById("info-mode-name").textContent = data.modeName;
    document.getElementById("info-solar-term").textContent = data.solarTerm;
    document.getElementById("info-cuc-name").textContent = data.donCucName;
    document.getElementById("info-mon-name").textContent = data.batMon;
    document.getElementById("info-tinh-name").textContent = data.cuuTinh;

    // Update Trung Cung
    document.getElementById("tc-tu-tru").textContent = data.tuTru.fullString;
    document.getElementById("tc-don-cuc").textContent = data.donCucName;
    document.getElementById("tc-tiet-khi").textContent = data.solarTerm;
    
    // Kế Đại, Kế Tiểu, Kế Định
    const tcKeDai = document.getElementById("tc-ke-dai");
    if (tcKeDai) tcKeDai.textContent = data.keDai !== undefined ? data.keDai.toLocaleString('vi-VN') : '-';
    const tcKeTieu = document.getElementById("tc-ke-tieu");
    if (tcKeTieu) tcKeTieu.textContent = data.keTieu !== undefined ? data.keTieu : '-';
    const tcKeDinh = document.getElementById("tc-ke-dinh");
    if (tcKeDinh) tcKeDinh.textContent = data.keDinh !== undefined ? data.keDinh : '-';

    document.getElementById("tc-bat-mon").textContent = data.batMon;
    document.getElementById("tc-cuu-tinh").textContent = data.cuuTinh;
    
    // Toán Chủ, Toán Khách, Toán Định (Số đã bỏ chục + Nguyên số chưa bỏ chục)
    document.getElementById("tc-toan-chu").textContent = data.toanChuGoc !== undefined ? `${data.toanChu} (Nguyên số: ${data.toanChuGoc})` : data.toanChu;
    document.getElementById("tc-toan-khach").textContent = data.toanKhachGoc !== undefined ? `${data.toanKhach} (Nguyên số: ${data.toanKhachGoc})` : data.toanKhach;
    
    const tcToanDinh = document.getElementById("tc-toan-dinh");
    if (tcToanDinh) tcToanDinh.textContent = data.toanDinhGoc !== undefined ? `${data.toanDinh} (Nguyên số: ${data.toanDinhGoc})` : (data.toanDinh || '-');
    
    // Render Trung Cung stars
    const tcStars = data.placement["trung_cung"] || [];
    document.getElementById("tc-stars").innerHTML = tcStars.length > 0 
        ? tcStars.map(s => `<span class="star-tag ${s.class}">${s.name}</span>`).join(" ") 
        : "-";
        
    document.getElementById("tc-bat-hung").textContent = data.batHung;
    document.getElementById("tc-verdict").textContent = data.verdict;

const TRANG_THAI_KHI = {
    "kien": "Âm Tuyệt",
    "hoi": "Âm Thuần",
    "ty": "Dương Tạp",
    "suu": "Dương Tạp",
    "can": "Dương Thuần",
    "dan": "Dương Thuần",
    "mao": "Dương Tạp",
    "thin": "Dương Thuần",
    "ton": "Dương Tuyệt",
    "ty_chi": "Dương Tạp",
    "ngo": "Dương Thuần",
    "mui": "Âm Thuần",
    "khon": "Âm Tạp",
    "than": "Âm Tạp",
    "dau": "Âm Thuần",
    "tuat": "Âm Tạp"
};

const PHAN_DA_CUU_CUNG = {
    "kien": "Ký Châu",
    "hoi": "Ký Châu",
    "ngo": "Kinh Châu",
    "mui": "Kinh Châu",
    "suu": "Thanh Châu",
    "can": "Thanh Châu",
    "dan": "Thanh Châu",
    "mao": "Từ Châu",
    "thin": "Từ Châu",
    "trung_cung": "Dự Châu",
    "dau": "Ung Châu",
    "tuat": "Ung Châu",
    "khon": "Lương Châu",
    "than": "Lương Châu",
    "ty": "Duyên Châu",
    "ton": "Dương Châu",
    "ty_chi": "Dương Châu"
};

    // Render 16 outer cells
    THAP_LUC_THAN.forEach(than => {
        const cell = document.getElementById(`cell-${than.id}`);
        if (!cell) return;

        const stars = data.placement[than.id] || [];

        // Categorize stars into lines
        let mainHtml = "";
        let generalHtml = "";
        let baseHtml = "";
        let auxHtml = "";

        stars.forEach(s => {
            const tag = `<span class="star-tag ${s.class}">${s.name}</span>`;
            if (["thai-at", "van-xuong", "thuy-kich"].includes(s.class)) mainHtml += tag;
            else if (["chu-tuong", "khach-tuong"].includes(s.class)) generalHtml += tag;
            else if (["quan-co", "than-co", "dan-co", "ngu-phuc", "dai-du", "tieu-du"].includes(s.class)) baseHtml += tag;
            else auxHtml += tag;
        });

        const khi = TRANG_THAI_KHI[than.id] || "";
        const phanDa = PHAN_DA_CUU_CUNG[than.id] || "";

        cell.innerHTML = `
            <div class="cell-line-1">
                <span class="palace-title">${than.name.toUpperCase()}</span>
                <span class="palace-khi">${khi}</span>
            </div>
            <div class="cell-line-2">${than.alias} • ${phanDa}</div>
            <div class="cell-line-3">${mainHtml || ''}</div>
            <div class="cell-line-4">${generalHtml || ''}</div>
            <div class="cell-line-5">${baseHtml || ''}</div>
            <div class="cell-line-6 aux-stars">${auxHtml || ''}</div>
        `;
    });

    // Populate Future Predictions
    const predContent = document.getElementById("future-predictions-content");
    if (data.movingStars && data.movingStars.length > 0) {
        const nextTimeStr = currentMode === "tue" ? "1 năm" : currentMode === "nguyet" ? "1 tháng" : currentMode === "nhat" ? "1 ngày" : currentMode === "thoi" ? "1 canh giờ" : "";
        if (nextTimeStr) {
            let predHtml = `<p>Trong <strong>${nextTimeStr} tiếp theo</strong>, các sao sau đây sẽ thay đổi quỹ đạo:</p><ul style="margin-top: 5px; margin-left: 20px;">`;
            data.movingStars.forEach(m => {
                predHtml += `<li><strong>${m.name}</strong> sẽ di chuyển sang <strong>${m.nextCungName}</strong> (hiện tại đang ở ${m.currCungName}).</li>`;
            });
            predHtml += `</ul>`;
            predContent.innerHTML = predHtml;
        } else {
            predContent.innerHTML = "<p><em>Không dự báo quỹ đạo sao cho chế độ này.</em></p>";
        }
    } else {
        predContent.innerHTML = "<p><em>Không có sao nào di chuyển trong chu kỳ tiếp theo, hoặc không có dữ liệu dự báo.</em></p>";
    }

    // Populate Luận Đoán Chuyên Sâu
    const ldContent = document.getElementById("luan-doan-content");
    if (ldContent) {
        if (data.luanDoanData) {
            const ld = data.luanDoanData;
            ldContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h4 style="color:var(--text-color); margin-bottom:5px;">Vận Chuyển Quẻ</h4>
                        <ul style="font-size: 0.9em; line-height: 1.5; color:var(--text-color);">
                            <li><strong>Đại Du (Trong / Ngoài):</strong> ${ld.que.ddqt} / ${ld.que.ddqn} ${ld.que.ddSach ? '(Sách: '+ld.que.ddSach+')' : ''}</li>
                            <li><strong>Tiểu Du (Trong / Ngoài):</strong> ${ld.que.tdqt} / ${ld.que.tdqn} ${ld.que.tdSach ? '(Sách: '+ld.que.tdSach+')' : ''}</li>
                            <li><strong>Quẻ Lưu Niên (Năm):</strong> ${ld.que.lnq} (Hào: ${ld.haoDong})</li>
                            ${ld.que.queNguyet ? '<li><strong>Quẻ Lưu Nguyệt:</strong> ' + ld.que.queNguyet + ' (Sách: ' + ld.que.nguyetSach + ')</li>' : ''}
                        </ul>
                    </div>
                    <div>
                        <h4 style="color:var(--text-color); margin-bottom:5px;">Luận Chiến Cục</h4>
                        <ul style="font-size: 0.9em; line-height: 1.5; color:var(--text-color);">
                            <li><strong>Toán Định:</strong> ${ld.chienCuc.toanDinh}</li>
                            <li><strong>Trận Đồ:</strong> ${ld.chienCuc.co} (Hướng: ${ld.chienCuc.huong})</li>
                            <li><strong>Số Lượng:</strong> ${ld.chienCuc.soLuongDich}</li>
                            <li><strong>Hướng Giặc:</strong> ${ld.chienCuc.tkHuong}</li>
                        </ul>
                    </div>
                    <div style="grid-column: span 2;">
                        <h4 style="color:var(--text-color); margin-bottom:5px;">Đại Hạn & Vi Chỉnh</h4>
                        <ul style="font-size: 0.9em; line-height: 1.5; color:var(--text-color);">
                            <li><strong>Dương Cửu Hạn:</strong> ${ld.han.duongCuu}</li>
                            <li><strong>Âm Bách Lục:</strong> ${ld.han.amBachLuc}</li>
                            <li><strong>Âm Dương Ách:</strong> ${ld.han.ach}</li>
                            <li><strong>Cờ Đen (Khảo):</strong> ${ld.viChinh.hK}</li>
                            <li><strong>Cờ Xanh (Chung):</strong> ${ld.viChinh.tL}</li>
                            <li><strong>Ngũ Âm:</strong> ${ld.nguAm}</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            ldContent.innerHTML = "<p><em>Tính năng Luận Đoán chuyên sâu chỉ khả dụng cho chế độ Tuế Kể và Nguyệt Kể.</em></p>";
        }
    }
}

// ========================================
// BẢNG TRA CỨU Ý NGHĨA (Render on DOMContentLoaded)
// ========================================
function renderReferenceTables() {
    if (typeof THAI_AT_REFERENCE === 'undefined') return;
    const ref = THAI_AT_REFERENCE;
    
    // 16 Cung
    const cungEl = document.getElementById("ref-cung-table");
    if (cungEl && ref.CUNG_MEANINGS) {
        const isObj = !Array.isArray(ref.CUNG_MEANINGS);
        const entries = isObj ? Object.entries(ref.CUNG_MEANINGS) : ref.CUNG_MEANINGS.map(c => [c.name, c]);
        cungEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.alias || ''}: ${val.element || ''}, ${val.palace || ''}. ${val.month || ''}. ${val.meaning || ''}`;
            return `<div style="margin-bottom:8px; padding:6px 10px; border-left:3px solid var(--gold); background:rgba(255,215,0,0.05);">
                <strong style="color:var(--gold);">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // Sao, Tướng, Thần
    const starEl = document.getElementById("ref-star-table");
    if (starEl && ref.STAR_MEANINGS) {
        const isObj = !Array.isArray(ref.STAR_MEANINGS);
        const entries = isObj ? Object.entries(ref.STAR_MEANINGS) : ref.STAR_MEANINGS.map(s => [s.name, s]);
        starEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `(${val.element || ''}) ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid var(--color-hoa); background:rgba(255,100,50,0.03);">
                <strong style="color:var(--color-hoa);">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // Bát Môn
    const bmEl = document.getElementById("ref-batmon-table");
    if (bmEl && ref.BAT_MON_DETAIL) {
        const isObj = !Array.isArray(ref.BAT_MON_DETAIL);
        const entries = isObj ? Object.entries(ref.BAT_MON_DETAIL) : ref.BAT_MON_DETAIL.map(m => [m.name, m]);
        bmEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.alias || ''}: ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid var(--color-thuy); background:rgba(0,150,255,0.03);">
                <strong style="color:var(--color-thuy);">Cửa ${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // 11 Cách Cục
    const ccEl = document.getElementById("ref-cachcuc-table");
    if (ccEl && ref.CACH_CUC) {
        const isObj = !Array.isArray(ref.CACH_CUC);
        const entries = isObj ? Object.entries(ref.CACH_CUC) : ref.CACH_CUC.map(c => [c.name, c]);
        ccEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.condition || ''} — ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid #ff4444; background:rgba(255,0,0,0.03);">
                <strong style="color:#ff4444;">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // 64 Quẻ
    const hexEl = document.getElementById("ref-hexagram-table");
    if (hexEl && ref.HEXAGRAM_BRIEF) {
        const isObj = !Array.isArray(ref.HEXAGRAM_BRIEF);
        const entries = isObj ? Object.entries(ref.HEXAGRAM_BRIEF) : ref.HEXAGRAM_BRIEF.map((h, i) => [`${i+1}. ${h.name}`, h]);
        hexEl.innerHTML = '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:6px;">' +
            entries.map(([key, val]) => {
                const text = typeof val === 'string' ? val : val.meaning || '';
                return `<div style="padding:4px 8px; border-left:2px solid var(--gold); background:rgba(255,215,0,0.03);">
                    <strong style="color:var(--gold);">${key}</strong> — ${text}
                </div>`;
            }).join("") + '</div>';
    }
}

// Gọi khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(renderReferenceTables, 100);
});
