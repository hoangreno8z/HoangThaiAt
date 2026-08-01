// thai_at_luan_doan.js
// Xử lý Đại Du Vận Quái và Tiểu Du Vận Quái theo Thái Ất Thần Số

/**
 * Bát Quái theo Cửu Cung Biệt Số (bỏ Trung Cung):
 * Index: 0=Kiền(1), 1=Ly(2), 2=Cấn(3), 3=Chấn(4), 4=Đoài(6), 5=Khôn(7), 6=Khảm(8), 7=Tốn(9)
 */
const BAT_QUAI = ["Kiền", "Ly", "Cấn", "Chấn", "Đoài", "Khôn", "Khảm", "Tốn"];

/**
 * 64 Quẻ Kinh Dịch — Bảng tra trùng quái
 * Hàng (Ngoại/Thượng) × Cột (Nội/Hạ) → Tên quẻ
 * Index: Kiền=0, Ly=1, Cấn=2, Chấn=3, Đoài=4, Khôn=5, Khảm=6, Tốn=7
 * Theo thứ tự 8 quái Cửu Cung: Kiền-Ly-Cấn-Chấn-Đoài-Khôn-Khảm-Tốn
 */
const TRUNG_QUAI_TABLE = {
    // [ngoại][nội] → tên quẻ
    "Kiền_Kiền": "Thuần Càn", "Kiền_Ly": "Thiên Hỏa Đồng Nhân", "Kiền_Cấn": "Thiên Sơn Độn",
    "Kiền_Chấn": "Thiên Lôi Vô Vọng", "Kiền_Đoài": "Thiên Trạch Lý", "Kiền_Khôn": "Thiên Địa Bĩ",
    "Kiền_Khảm": "Thiên Thủy Tụng", "Kiền_Tốn": "Thiên Phong Cấu",

    "Ly_Kiền": "Hỏa Thiên Đại Hữu", "Ly_Ly": "Thuần Ly", "Ly_Cấn": "Hỏa Sơn Lữ",
    "Ly_Chấn": "Hỏa Lôi Phệ Hạp", "Ly_Đoài": "Hỏa Trạch Khuê", "Ly_Khôn": "Hỏa Địa Tấn",
    "Ly_Khảm": "Hỏa Thủy Vị Tế", "Ly_Tốn": "Hỏa Phong Đỉnh",

    "Cấn_Kiền": "Sơn Thiên Đại Súc", "Cấn_Ly": "Sơn Hỏa Bí", "Cấn_Cấn": "Thuần Cấn",
    "Cấn_Chấn": "Sơn Lôi Di", "Cấn_Đoài": "Sơn Trạch Tổn", "Cấn_Khôn": "Sơn Địa Bác",
    "Cấn_Khảm": "Sơn Thủy Mông", "Cấn_Tốn": "Sơn Phong Cổ",

    "Chấn_Kiền": "Lôi Thiên Đại Tráng", "Chấn_Ly": "Lôi Hỏa Phong", "Chấn_Cấn": "Lôi Sơn Tiểu Quá",
    "Chấn_Chấn": "Thuần Chấn", "Chấn_Đoài": "Lôi Trạch Quy Muội", "Chấn_Khôn": "Lôi Địa Dự",
    "Chấn_Khảm": "Lôi Thủy Giải", "Chấn_Tốn": "Lôi Phong Hằng",

    "Đoài_Kiền": "Trạch Thiên Quải", "Đoài_Ly": "Trạch Hỏa Cách", "Đoài_Cấn": "Trạch Sơn Hàm",
    "Đoài_Chấn": "Trạch Lôi Tùy", "Đoài_Đoài": "Thuần Đoài", "Đoài_Khôn": "Trạch Địa Tụy",
    "Đoài_Khảm": "Trạch Thủy Khốn", "Đoài_Tốn": "Trạch Phong Đại Quá",

    "Khôn_Kiền": "Địa Thiên Thái", "Khôn_Ly": "Địa Hỏa Minh Di", "Khôn_Cấn": "Địa Sơn Khiêm",
    "Khôn_Chấn": "Địa Lôi Phục", "Khôn_Đoài": "Địa Trạch Lâm", "Khôn_Khôn": "Thuần Khôn",
    "Khôn_Khảm": "Địa Thủy Sư", "Khôn_Tốn": "Địa Phong Thăng",

    "Khảm_Kiền": "Thủy Thiên Nhu", "Khảm_Ly": "Thủy Hỏa Ký Tế", "Khảm_Cấn": "Thủy Sơn Kiển",
    "Khảm_Chấn": "Thủy Lôi Truân", "Khảm_Đoài": "Thủy Trạch Tiết", "Khảm_Khôn": "Thủy Địa Tỷ",
    "Khảm_Khảm": "Thuần Khảm", "Khảm_Tốn": "Thủy Phong Tỉnh",

    "Tốn_Kiền": "Phong Thiên Tiểu Súc", "Tốn_Ly": "Phong Hỏa Gia Nhân", "Tốn_Cấn": "Phong Sơn Tiệm",
    "Tốn_Chấn": "Phong Lôi Ích", "Tốn_Đoài": "Phong Trạch Trung Phu", "Tốn_Khôn": "Phong Địa Quan",
    "Tốn_Khảm": "Phong Thủy Hoán", "Tốn_Tốn": "Thuần Tốn"
};

const TRIGRAM_LINES = {
    "Kiền": [1, 1, 1], // Sơ=1, Nhị=1, Tam=1
    "Đoài": [1, 1, 0],
    "Ly":   [1, 0, 1],
    "Chấn": [1, 0, 0],
    "Tốn":  [0, 1, 1],
    "Khảm": [0, 1, 0],
    "Cấn":  [0, 0, 1],
    "Khôn": [0, 0, 0]
};

class ThaiAtLuanDoan {
    /**
     * @param {number} tueTich - Tích Niên Thái Ất của năm cầu việc
     * @param {number} namCanIdx - Index Thiên Can năm (0=Giáp, 1=Ất...)
     * @param {boolean} isDuongDon - Dương Độn hay Âm Độn
     * @param {string} mode - Chế độ (tue, nguyet, nhat, thoi)
     * @param {number} fullTueTich - Tích Niên Thượng Cổ (nếu có)
     * @param {number} lunarMonth - Tháng Âm lịch (1-12)
     * @param {number} kyDu - Kỷ Dư (Vòng Kỷ Dư) = tueTich % 360
     */
    constructor(tueTich, namCanIdx, isDuongDon, mode = "tue", fullTueTich = 0, lunarMonth = 1, kyDu = 0) {
        this.tueTich = tueTich;
        this.namCanIdx = namCanIdx;
        this.isDuongDon = isDuongDon;
        this.mode = mode;
        this.fullTueTich = fullTueTich;
        this.lunarMonth = lunarMonth;
        this.kyDu = kyDu || (tueTich % 360);
    }

    /**
     * Tính Đại Du Vận Quái và Tiểu Du Vận Quái (kèm Hào Động và Quẻ 6 hào)
     */
    calcDaiTieuDu() {
        const tich = this.tueTich;
        const kyDu = this.kyDu;

        // ===================== ĐẠI DU VẬN QUÁI =====================
        const ddNoiR1 = (tich + 34) % 2880;
        const ddNoiR2 = ddNoiR1 % 288;
        const ddNoiThanh = Math.floor(ddNoiR2 / 36);
        const ddNoiDu = ddNoiR2 % 36;
        const ddNoiQuai = BAT_QUAI[ddNoiThanh % 8];

        const ddNgoaiR1 = (tich + 60) % 640;
        const ddNgoaiR2 = ddNgoaiR1 % 80;
        const ddNgoaiThanh = Math.floor(ddNgoaiR2 / 10);
        const ddNgoaiDu = ddNgoaiR2 % 10;
        const ddNgoaiQuai = BAT_QUAI[ddNgoaiThanh % 8];

        const ddKey = `${ddNgoaiQuai}_${ddNoiQuai}`;
        const ddTrungQuai = TRUNG_QUAI_TABLE[ddKey] || `${ddNgoaiQuai} / ${ddNoiQuai}`;

        // Hào Động Đại Du: 36 năm / 6 hào = 6 năm 1 hào
        const ddHaoDong = Math.min(6, Math.floor(ddNoiDu / 6) + 1);

        // Mảng 6 hào (Index 0 = Hào 1 Sơ, Index 5 = Hào 6 Thượng)
        const ddNoiLines = TRIGRAM_LINES[ddNoiQuai] || [1, 1, 1];
        const ddNgoaiLines = TRIGRAM_LINES[ddNgoaiQuai] || [1, 1, 1];
        const ddLines6 = [...ddNoiLines, ...ddNgoaiLines];

        // ===================== TIỂU DU VẬN QUÁI =====================
        const tdNoiR1 = tich % 192;
        const tdNoiThanh = Math.floor(tdNoiR1 / 24);
        const tdNoiDu = tdNoiR1 % 24;
        const tdNoiQuai = BAT_QUAI[tdNoiThanh % 8];

        const tdNgoaiR1 = kyDu % 24;
        const tdNgoaiThanh = Math.floor(tdNgoaiR1 / 3);
        const tdNgoaiDu = tdNgoaiR1 % 3;
        const tdNgoaiQuai = BAT_QUAI[tdNgoaiThanh % 8];

        const tdKey = `${tdNgoaiQuai}_${tdNoiQuai}`;
        const tdTrungQuai = TRUNG_QUAI_TABLE[tdKey] || `${tdNgoaiQuai} / ${tdNoiQuai}`;

        // Hào Động Tiểu Du: 24 năm / 6 hào = 4 năm 1 hào
        const tdHaoDong = Math.min(6, Math.floor(tdNoiDu / 4) + 1);

        // Mảng 6 hào (Index 0 = Hào 1 Sơ, Index 5 = Hào 6 Thượng)
        const tdNoiLines = TRIGRAM_LINES[tdNoiQuai] || [1, 1, 1];
        const tdNgoaiLines = TRIGRAM_LINES[tdNgoaiQuai] || [1, 1, 1];
        const tdLines6 = [...tdNoiLines, ...tdNgoaiLines];

        return {
            // Đại Du
            ddNoiQuai,
            ddNoiThanh,
            ddNoiDu,
            ddNgoaiQuai,
            ddNgoaiThanh,
            ddNgoaiDu,
            ddTrungQuai,
            ddHaoDong,
            ddLines6,
            // Tiểu Du
            tdNoiQuai,
            tdNoiThanh,
            tdNoiDu,
            tdNgoaiQuai,
            tdNgoaiThanh,
            tdNoiDu,
            tdTrungQuai,
            tdHaoDong,
            tdLines6
        };
    }

    generateReport(toanChu, toanKhach, tkIdx, taIdx) {
        return {
            daiTieuDu: this.calcDaiTieuDu()
        };
    }
}

/**
 * BÁO CÁO LUẬN GIẢI CHUYÊN SÂU CỤC DIỆN SA BÀN THÁI ẤT
 */
function generateDetailedAnalysisReport(data) {
    if (!data || !data.placement) return "<p style='color: var(--text-muted);'>Chưa có dữ liệu sa bàn.</p>";

    const CUNG_NAMES = {
        "kien": "Kiền (Càn)", "hoi": "Hợi", "ty": "Tý", "suu": "Sửu",
        "can": "Cấn", "dan": "Dần", "mao": "Mão", "thin": "Thìn",
        "ton": "Tốn", "ty_chi": "Tị", "ngo": "Ngọ", "mui": "Mùi",
        "khon": "Khôn", "than": "Thân", "dau": "Dậu", "tuat": "Tuất",
        "trung_cung": "Trung Cung"
    };

    const CUNG_HUONG = {
        "can": "Đông Bắc", "dan": "Đông Bắc",
        "mao": "Chính Đông", "thin": "Đông Nam", "ton": "Đông Nam",
        "ty_chi": "Đông Nam", "ngo": "Chính Nam", "mui": "Tây Nam",
        "khon": "Tây Nam", "than": "Tây Nam", "dau": "Chính Tây",
        "tuat": "Tây Bắc", "kien": "Tây Bắc", "hoi": "Tây Bắc",
        "ty": "Chính Bắc", "suu": "Đông Bắc"
    };

    const CUNG_BIET_SO = {
        "kien": 1, "ngo": 2, "can": 3, "mao": 4, "ton": 9,
        "ty_chi": 9, "khon": 7, "dau": 6, "ty": 8, "hoi": 1,
        "dan": 3, "thin": 4, "mui": 2, "than": 7, "tuat": 6, "suu": 3
    };

    // Tìm vị trí các Thần Tinh
    let taPalace = "", vxPalace = "", tkPalace = "", dtcPalace = "", dtkPalace = "";
    for (const pKey in data.placement) {
        const stars = data.placement[pKey] || [];
        stars.forEach(s => {
            if (s.name.includes("Thái Ất")) taPalace = pKey;
            if (s.name.includes("Văn Xương")) vxPalace = pKey;
            if (s.name.includes("Thủy Kích")) tkPalace = pKey;
            if (s.name.includes("Đại Tướng Chủ")) dtcPalace = pKey;
            if (s.name.includes("Đại Tướng Khách")) dtkPalace = pKey;
        });
    }

    const taName = CUNG_NAMES[taPalace] || "Trung Cung";
    const vxName = CUNG_NAMES[vxPalace] || "Chưa xác định";
    const tkName = CUNG_NAMES[tkPalace] || "Chưa xác định";
    const dtcName = CUNG_NAMES[dtcPalace] || "Chưa xác định";
    const dtkName = CUNG_NAMES[dtkPalace] || "Chưa xác định";

    const taBietSo = CUNG_BIET_SO[taPalace] || 0;
    
    // Thái Ất vị thế
    let taVitheText = "";
    if ([1, 8, 4, 3].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <strong>"Trợ Chủ"</strong>. Theo sách xưa, thế này tạo ra cục diện trợ giúp cho phe Chủ (tức phe phòng thủ/bên trong).`;
    } else if ([9, 2, 7, 6].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <strong>"Trợ Khách"</strong>. Theo sách xưa, thế này tạo ra cục diện trợ giúp cho phe Khách (tức phe tiến công/bên ngoài).`;
    } else {
        taVitheText = `Thái Ất đang tọa tại cung <strong>${taName}</strong> là thế <strong>"Trung Hòa"</strong>, âm dương điều hòa.`;
    }

    // Toán Số
    const tcGoc = data.toanChuGoc || data.toanChu || 1;
    const tkGoc = data.toanKhachGoc || data.toanKhach || 1;
    const tdGoc = data.toanDinhGoc || data.toanDinh || 1;

    let tcText = `Số ${tcGoc} là Toán Chủ. `;
    if (tcGoc % 2 !== 0) tcText += `Thuộc khí Đơn Dương, khí vận phát động.`;
    else tcText += `Thuộc khí Đơn Âm, khí vận thu quái.`;

    let tkText = `Số ${tkGoc} là Toán Khách. `;
    if (tkGoc % 10 === 5) {
        tkText += `<strong>Cửa đóng (Không cửa)</strong>. Theo quy luật vận hành của Thái Ất thức, các sao không nhập Trung cung mang biệt số 5. Toán Khách đuôi 5 khiến Đại/Tiểu Tướng Khách không thể tiến vào Trung cung để hành sự, bế tắc mất phương hướng hành động.`;
    } else {
        tkText += `Hàng đơn vị khác 5, phe Khách hành sự thông suốt.`;
    }

    // Cách cục & Thể thức
    let cachCucItems = [];
    if (dtcPalace && dtcPalace === taPalace) {
        cachCucItems.push(`<strong>Đại Tướng Chủ bị Tù (Thể thức Tù)</strong>: Đại Tướng Chủ đóng cùng cung ${taName} với Thái Ất nên bị Tù. Mang ý nghĩa bất lợi, chủ về việc kẻ dưới phạm thượng hoặc đánh lại.`);
    }
    if (dtkPalace && dtkPalace === taPalace) {
        cachCucItems.push(`<strong>Đại Tướng Khách bị Tù (Thể thức Tù)</strong>: Đại Tướng Khách đóng cùng cung ${taName} với Thái Ất nên bị Tù, bế tắc tiến công.`);
    }
    if (data.batHung && data.batHung !== "Không thuộc Bát Hung.") {
        cachCucItems.push(`<strong>Biến động Bát Hung:</strong> ${data.batHung}`);
    }
    if (cachCucItems.length === 0) {
        cachCucItems.push("Không có thể thức hung hiểm đặc biệt.");
    }

    // Phương vị
    const huongChu = CUNG_HUONG[vxPalace] || CUNG_HUONG[taPalace] || "Đông Bắc";
    const huongKhach = CUNG_HUONG[tkPalace] || "Chính Nam";

    return `
    <div class="luan-doan-report-card">
        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">1. Phân Tích Thuật Ngữ Vị Thế & Thần Tinh</h4>
            <p class="luan-doan-item"><strong>Thái Ất Vị Thế:</strong> ${taVitheText}</p>
            <p class="luan-doan-item"><strong>Chủ Mục (Văn Xương):</strong> Chủ Mục là tên gọi khác của sao Văn Xương, đóng vai trò phụ tướng phò tá Thái Ất, trù tính kế sách nơi màn trướng và nắm quyền sinh sát. Trong lá số này, Văn Xương đóng tại cung <strong>${vxName}</strong>.</p>
            <p class="luan-doan-item"><strong>Khách Mục (Thủy Kích):</strong> Khách Mục là tên gọi khác của sao Thủy Kích (Địa Mục), đóng vai trò phó tướng phía Khách, quan sát trận địa và chỉ huy tác chiến. Trong lá số này, Thủy Kích đóng tại cung <strong>${tkName}</strong>.</p>
            <p class="luan-doan-item"><strong>Đại Tướng Chủ / Đại Tướng Khách:</strong> Đại Tướng Chủ đóng tại cung <strong>${dtcName}</strong>; Đại Tướng Khách đóng tại cung <strong>${dtkName}</strong>.</p>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">2. Phân Tích Cách Cục & Toán Số</h4>
            <p class="luan-doan-item"><strong>Toán Chủ (${tcGoc}):</strong> ${tcText}</p>
            <p class="luan-doan-item"><strong>Toán Khách (${tkGoc}):</strong> ${tkText}</p>
            <p class="luan-doan-item"><strong>Toán Định (${tdGoc}):</strong> Toán Định đạt số ${tdGoc}, biểu thị nhịp vận định sẵn giữa nhân sự và thiên thời.</p>
            <div class="luan-doan-item"><strong>Cách Cục & Thể Thức:</strong>
                <ul style="padding-left: 20px; margin-top: 5px;">
                    ${cachCucItems.map(c => `<li style="margin-bottom: 4px;">${c}</li>`).join("")}
                </ul>
            </div>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">3. Phân Tích Phương Vị & Khuyến Cáo Cục Diện</h4>
            <p class="luan-doan-item"><strong>Hướng Phòng Bị Phe Chủ:</strong> Phe Chủ nên chú ý phòng bị tại <strong>Hướng ${huongChu}</strong> (tương ứng cung ${vxName} nơi Chủ Mục tọa thủ).</p>
            <p class="luan-doan-item"><strong>Hướng Phòng Bị Phe Khách:</strong> Phe Khách nên trọng tâm quan sát <strong>Hướng ${huongKhach}</strong> (tương ứng cung ${tkName} nơi Khách Mục tọa thủ).</p>
            <div class="luan-doan-summary-box">
                <strong>📌 Tóm Tắt Cục Diện Tác Chiến:</strong>
                <p style="margin-top: 6px;">${(tkGoc % 10 === 5 || (dtcPalace === taPalace)) ? "Cả 2 bên Chủ và Khách đều gặp điểm bất lợi hoặc bế tắc thế trận. Chiến lược tối ưu nhất là cố thủ phòng ngự, không nên vội vã tiến công." : "Cục diện đang có sự phân định rõ ràng giữa phe Chủ và phe Khách, cần nương theo vị thế Thái Ất và Bát Môn để nắm giữ thế chủ động."}</p>
            </div>
        </div>
    </div>`;
}
