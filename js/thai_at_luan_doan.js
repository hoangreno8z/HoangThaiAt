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
