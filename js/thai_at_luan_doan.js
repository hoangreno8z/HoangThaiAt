// thai_at_luan_doan.js
// Xử lý các nghiệp vụ luận đoán chuyên sâu (Quái, Hạn, Ngũ Âm, 28 Sao) của Thái Ất

const HEXAGRAMS_64 = [
    "Càn", "Khôn", "Truân", "Mông", "Nhu", "Tụng", "Sư", "Tỷ", 
    "Tiểu Súc", "Lý", "Thái", "Bĩ", "Đồng Nhân", "Đại Hữu", "Khiêm", "Dự", 
    "Tùy", "Cổ", "Lâm", "Quan", "Phệ Hạp", "Bí", "Bác", "Phục",
    "Vô Vọng", "Đại Súc", "Di", "Đại Quá", "Khảm", "Ly", "Hàm", "Hằng",
    "Độn", "Đại Tráng", "Tấn", "Minh Di", "Gia Nhân", "Khuê", "Kiển", "Giải",
    "Tổn", "Ích", "Quải", "Cấu", "Tụy", "Thăng", "Khốn", "Tỉnh",
    "Cách", "Đỉnh", "Chấn", "Cấn", "Tiệm", "Quy Muội", "Phong", "Lữ",
    "Tốn", "Đoài", "Hoán", "Tiết", "Trung Phu", "Tiểu Quá", "Ký Tế", "Vị Tế"
];

const BAT_QUAI = ["Kiền", "Khảm", "Cấn", "Chấn", "Tốn", "Ly", "Khôn", "Đoài"];

class ThaiAtLuanDoan {
    constructor(tueTich, namCanIdx, isDuongDon, mode = "tue", fullTueTich = 0, lunarMonth = 1) {
        this.tueTich = tueTich;
        this.tichTrungCo = tueTich + 250;
        this.namCanIdx = namCanIdx; // 0=Giáp, 1=Ất...
        this.isDuongDon = isDuongDon;
        this.mode = mode;
        this.fullTueTich = fullTueTich;
        this.lunarMonth = lunarMonth; // 1-12
    }

    // NHÓM 4: Vành Vận Chuyển Quẻ
    calcQue() {
        // Đại Du và Tiểu Du
        let tich = this.tueTich;
        let tichFull = this.mode === "tue" ? this.tueTich : this.fullTueTich;

        const ddqtStep = Math.floor(((tich + 34) % 2880 % 288) / 36);
        const ddqt = BAT_QUAI[(6 + ddqtStep) % 8];

        const ddqnStep = Math.floor(((tich + 34) % 640 % 80) / 70);
        const ddqn = BAT_QUAI[(6 + ddqnStep) % 8];

        const tdqtStep = Math.floor((tich % 192) / 24);
        const tdqt = BAT_QUAI[tdqtStep % 8];

        const tdqnStep = Math.floor(((tich % 360) % 24) / 3);
        const tdqn = BAT_QUAI[tdqnStep % 8];

        // Lưu Niên Quẻ (Sử dụng tichFull của Tuế)
        const lnqStep = tichFull % 64 || 64;
        let lnq = HEXAGRAMS_64[lnqStep - 1];

        // Quẻ Lưu Nguyệt
        let queNguyet = lnq;
        if (this.mode === "nguyet") {
            if (this.lunarMonth > 6) {
                // Sáu tháng cuối năm dùng Quẻ Biến (Tạm thời giả lập bằng cách đảo ngược index trong mảng)
                queNguyet = HEXAGRAMS_64[64 - lnqStep] + " (Quẻ Biến)";
            }
        } else if (this.mode === "nhat" || this.mode === "thoi") {
            lnq = "(Không áp dụng)";
            queNguyet = "";
        }

        // Toán Định Sách
        const SACH = { "Kiền": 36, "Khôn": 24, "Chấn": 28, "Khảm": 28, "Cấn": 28, "Tốn": 32, "Ly": 32, "Đoài": 32 };
        let ddSach = (ddqt === ddqn) ? SACH[ddqt] : 0;
        let tdSach = (tdqt === tdqn) ? SACH[tdqt] : 0;
        
        let nguyetSach = 0;
        if (this.mode === "nguyet") {
            const chiThangIdx = (this.lunarMonth + 1) % 12; // Tháng Giêng là Dần (2), Tý là (0)
            const isThangDuong = (chiThangIdx % 2 === 0);
            nguyetSach = isThangDuong ? 36 : 24;
        }

        return { ddqt, ddqn, tdqt, tdqn, lnq, queNguyet, ddSach, tdSach, nguyetSach };
    }

    // NHÓM 5: Các Đại Hạn Dài Hạn
    calcDaiHan() {
        const duongCuu = Math.floor((this.tichTrungCo % 4560) / 456);
        const amBachLuc = (this.tichTrungCo % 4320) - 288;
        
        let amDuongAchR = (this.tueTich + 130) % 4560;
        const chuKy = [9, 7, 6, 3];
        let idx = 0;
        let vong = 0;
        while (amDuongAchR >= chuKy[idx]) {
            amDuongAchR -= chuKy[idx];
            idx = (idx + 1) % 4;
            vong++;
        }
        const ach = `Vòng ${Math.floor(vong/4)}, Chu kỳ ${chuKy[idx]} (Dư ${amDuongAchR})`;

        return { duongCuu, amBachLuc, ach };
    }

    // NHÓM 9: Vi Chỉnh Cờ
    calcViChinhCo() {
        const khaoNho = this.tueTich % 3 || 3;
        const khaoLon = this.tueTich % 9 || 9;
        const hK = `Khảo nhỏ năm thứ ${khaoNho}. Khảo lớn năm thứ ${khaoLon}.`;

        const chung = Math.floor(this.tueTich / 12);
        const chungTyle = chung % 4 || 4;
        const chungDanTan = chung % 9 || 9;
        const tL = `Chung thứ ${chung}. Đổi mới ${chungTyle}/4. Dân tàn ${chungDanTan}/9.`;

        return { hK, tL };
    }

    // NHÓM 10-12: Trận Đồ & Địch
    calcChienCuc(toanChu, toanKhach, tkIdx, taIdx) {
        const toanDinh = (toanChu + toanKhach) % 10 || 10;
        
        let co = "", huong = "";
        if ([1, 8].includes(toanDinh)) { co = "Khúc Đen"; }
        else if ([2, 5].includes(toanDinh)) { co = "Tròn Vàng"; }
        else if (toanDinh === 3) { co = "Thẳng Xanh"; }
        else if ([4, 9].includes(toanDinh)) { co = "Nhọn Đỏ"; }
        else if ([6, 7].includes(toanDinh)) { co = "Vuông Trắng"; }
        
        const CUNG_HUONG = { 1:"Bắc", 2:"Tây Nam", 3:"Đông", 4:"Đông Nam", 5:"Trung Ương", 6:"Tây Bắc", 7:"Tây", 8:"Đông Bắc", 9:"Nam" };
        huong = CUNG_HUONG[toanDinh] || "Vô Hướng";

        const soLuongDich = toanKhach >= 16 ? "Giặc đông, tướng giỏi" : (toanKhach <= 15 ? "Giặc ít, dễ tan" : "Bình thường");
        
        let tkHuong = "Không xác định";
        if (tkIdx !== -1 && taIdx !== -1) {
            if (tkIdx < taIdx) tkHuong = "Đông (Bên trái)";
            else if (tkIdx > taIdx) tkHuong = "Tây (Bên phải)";
        }

        return { toanDinh, co, huong, soLuongDich, tkHuong };
    }

    // NHÓM 6, 7, 8, 12, 13, 14: Các Module khác
    calcHaoDong() {
        // Năm dương (chi lẻ): Đếm hào dương (1, 3, 5) từ dưới lên
        // Năm âm (chi chẵn): Đếm hào âm (6, 4, 2) từ trên xuống
        const haoTuongUng = this.isDuongDon ? "1/3/5 (Dương)" : "6/4/2 (Âm)";
        
        let nguyetHao = "";
        if (this.mode === "nguyet") {
            const haoGoc = this.isDuongDon ? 1 : 6;
            let offset = this.lunarMonth - 1; // 1 -> 0
            if (!this.isDuongDon) offset = -offset; // Âm đếm xuống
            
            let haoThang = (haoGoc + offset) % 6;
            if (haoThang <= 0) haoThang += 6;
            nguyetHao = ` (Tháng này rơi vào Hào ${haoThang})`;
        }
        
        return haoTuongUng + nguyetHao;
    }

    calcNguAm() {
        // 12 Chi -> Cung, Thương, Dốc, Chủy, Vũ
        // Sử dụng namCanIdx, giả sử map tạm (nếu cần truyền Chi vào thì map thẳng)
        return "Tý/Ngọ(Cung), Thìn/Tuất(Thương), Tỵ/Hợi(Dốc), Sửu/Mùi/Dần/Thân(Chủy), Mão/Dậu(Vũ)";
    }

    generateReport(toanChu, toanKhach, tkIdx, taIdx) {
        return {
            que: this.calcQue(),
            han: this.calcDaiHan(),
            chienCuc: this.calcChienCuc(toanChu, toanKhach, tkIdx, taIdx),
            viChinh: this.calcViChinhCo(),
            haoDong: this.calcHaoDong(),
            nguAm: this.calcNguAm()
        };
    }
}
