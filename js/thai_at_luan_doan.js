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
     * Tính Đại Du Vận Quái và Tiểu Du Vận Quái
     * 
     * ĐẠI DU VẬN QUÁI:
     * - Nội quái: (Tích Niên + 34) % 2880, rồi % 288, rồi / 36 → index quái
     * - Ngoại quái: (Tích Niên + 60) % 640, rồi % 80, rồi / 10 → index quái
     * - Trùng quái: Ngoại trên, Nội dưới
     * 
     * TIỂU DU VẬN QUÁI:
     * - Nội quái: Tích Niên % 192, rồi / 24 → index quái
     * - Ngoại quái: Kỷ Dư % 24, rồi / 3 → index quái  
     * - Trùng quái: Ngoại trên, Nội dưới
     */
    calcDaiTieuDu() {
        const tich = this.tueTich;
        const kyDu = this.kyDu;

        // ===================== ĐẠI DU VẬN QUÁI =====================

        // --- Đại Du Nội Quái ---
        // Tích Niên + 34 (doanh sai), chia 2880, lấy dư, dư chia 288, dư chia 36
        const ddNoiR1 = (tich + 34) % 2880;       // Dư phép chia 2880
        const ddNoiR2 = ddNoiR1 % 288;             // Dư phép chia 288
        const ddNoiThanh = Math.floor(ddNoiR2 / 36); // Số quái đã vận qua
        const ddNoiDu = ddNoiR2 % 36;              // Thời gian đang vận ở quái hiện tại
        const ddNoiQuai = BAT_QUAI[ddNoiThanh % 8];

        // --- Đại Du Ngoại Quái (Thiên Số) ---
        // Tích Niên + 60 (doanh sai), chia 640, lấy dư, dư chia 80, dư chia 10
        const ddNgoaiR1 = (tich + 60) % 640;       // Dư phép chia 640  
        const ddNgoaiR2 = ddNgoaiR1 % 80;          // Dư phép chia 80
        const ddNgoaiThanh = Math.floor(ddNgoaiR2 / 10); // Số quái đã vận qua
        const ddNgoaiDu = ddNgoaiR2 % 10;          // Thời gian đang vận ở quái hiện tại
        const ddNgoaiQuai = BAT_QUAI[ddNgoaiThanh % 8];

        // --- Trùng Quái Đại Du: Ngoại trên, Nội dưới ---
        const ddKey = `${ddNgoaiQuai}_${ddNoiQuai}`;
        const ddTrungQuai = TRUNG_QUAI_TABLE[ddKey] || `${ddNgoaiQuai} / ${ddNoiQuai}`;

        // ===================== TIỂU DU VẬN QUÁI =====================

        // --- Tiểu Du Nội Quái ---
        // Tích Niên chia 192, lấy dư, dư chia 24
        const tdNoiR1 = tich % 192;                // Dư phép chia 192
        const tdNoiThanh = Math.floor(tdNoiR1 / 24); // Số quái đã vận qua
        const tdNoiDu = tdNoiR1 % 24;              // Thời gian đang vận ở quái hiện tại
        const tdNoiQuai = BAT_QUAI[tdNoiThanh % 8];

        // --- Tiểu Du Ngoại Quái ---
        // Kỷ Dư chia 24, lấy dư, dư chia 3
        const tdNgoaiR1 = kyDu % 24;               // Dư phép chia 24
        const tdNgoaiThanh = Math.floor(tdNgoaiR1 / 3); // Số quái đã vận qua
        const tdNgoaiDu = tdNgoaiR1 % 3;           // Thời gian đang vận ở quái hiện tại
        const tdNgoaiQuai = BAT_QUAI[tdNgoaiThanh % 8];

        // --- Trùng Quái Tiểu Du: Ngoại trên, Nội dưới ---
        const tdKey = `${tdNgoaiQuai}_${tdNoiQuai}`;
        const tdTrungQuai = TRUNG_QUAI_TABLE[tdKey] || `${tdNgoaiQuai} / ${tdNoiQuai}`;

        return {
            // Đại Du
            ddNoiQuai,
            ddNoiThanh,
            ddNoiDu,
            ddNgoaiQuai,
            ddNgoaiThanh,
            ddNgoaiDu,
            ddTrungQuai,
            // Tiểu Du
            tdNoiQuai,
            tdNoiThanh,
            tdNoiDu,
            tdNgoaiQuai,
            tdNgoaiThanh,
            tdNgoaiDu,
            tdTrungQuai
        };
    }

    generateReport(toanChu, toanKhach, tkIdx, taIdx) {
        return {
            daiTieuDu: this.calcDaiTieuDu()
        };
    }
}
