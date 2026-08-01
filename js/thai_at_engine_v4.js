/**
 * Modular Thái Ất Engine — V4.0 (Tái cấu trúc theo Cụm Công Thức)
 * 
 * PHÂN LỚP:
 * 1. Hằng số và Bảng Tra
 * 2. ThaiAtBaseEngine: Chứa tất cả công thức tính toán độc lập
 * 3. TueKeEngine, NguyetKeEngine...: Kế thừa và truyền Tích/Kỷ Dư phù hợp
 * 4. calculateThaiAtChart: Điều phối, tính Time Travel (Hiện tại & Tương lai)
 */

// ==========================================
// 1. CONSTANTS & MAPS
// ==========================================
const THUONG_CO_EPOCH = 10153917;

const THAP_LUC_THAN = [
    { idx: 0,  id: "than",   name: "Thân",  alias: "Vũ Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Nam",   palaceNum: 7, isDwell: false },
    { idx: 1,  id: "dau",    name: "Dậu",   alias: "Thái Tộc",   element: "Kim",  elementKey: "kim",  direction: "Chính Tây", palaceNum: 7, isDwell: false },
    { idx: 2,  id: "tuat",   name: "Tuất",  alias: "Âm Chủ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 3,  id: "kien",   name: "Kiền",  alias: "Âm Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Bắc góc", palaceNum: 6, isDwell: true },
    { idx: 4,  id: "hoi",    name: "Hợi",   alias: "Đại Nghĩa",  element: "Thủy", elementKey: "thuy", direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 5,  id: "ty",     name: "Tý",    alias: "Địa Chủ",    element: "Thủy", elementKey: "thuy", direction: "Chính Bắc", palaceNum: 1, isDwell: false },
    { idx: 6,  id: "suu",    name: "Sửu",   alias: "Dương Đức",  element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 7,  id: "can",    name: "Cấn",   alias: "Hòa Đức",    element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc góc", palaceNum: 8, isDwell: true },
    { idx: 8,  id: "dan",    name: "Dần",   alias: "Lã Thân",    element: "Mộc",  elementKey: "moc",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 9,  id: "mao",    name: "Mão",   alias: "Cao Tùng",   element: "Mộc",  elementKey: "moc",  direction: "Chính Đông", palaceNum: 3, isDwell: false },
    { idx: 10, id: "thin",   name: "Thìn",  alias: "Thái Dương", element: "Thổ",  elementKey: "tho",  direction: "Đông Nam",  palaceNum: 4, isDwell: false },
    { idx: 11, id: "ton",    name: "Tốn",   alias: "Đại Cảnh",   element: "Mộc",  elementKey: "moc",  direction: "Đông Nam góc", palaceNum: 4, isDwell: true },
    { idx: 12, id: "ty_chi", name: "Tị",    alias: "Đại Thần",   element: "Hỏa",  elementKey: "hoa",  direction: "Đông Nam",  palaceNum: 9, isDwell: false },
    { idx: 13, id: "ngo",    name: "Ngọ",   alias: "Đại Uy",     element: "Hỏa",  elementKey: "hoa",  direction: "Chính Nam", palaceNum: 9, isDwell: false },
    { idx: 14, id: "mui",    name: "Mùi",   alias: "Thiên Đạo",  element: "Thổ",  elementKey: "tho",  direction: "Tây Nam",   palaceNum: 2, isDwell: false },
    { idx: 15, id: "khon",   name: "Khôn",  alias: "Đại Vũ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Nam góc", palaceNum: 2, isDwell: true }
];

const CUNG_TO_THAN_IDX = { 1: 5, 2: 15, 3: 9, 4: 11, 5: -1, 6: 3, 7: 1, 8: 7, 9: 13 };
const CHI_TO_THAN_IDX = [5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2, 4];
const CHI_LIST_LOCAL = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const CAN_CUNG_MAP = [0, 9, 8, 7, 1, 2, 3, 4, 5, 6]; // Giáp=0, Ất=9, Bính=8, Đinh=7...
const CUU_TINH = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
const BAT_MON = ["Khai", "Hưu", "Sinh", "Thương", "Đỗ", "Cảnh", "Tử", "Kinh"];

function getThanName(thanIdx) {
    if (thanIdx === -1) return "Trung Cung";
    return THAP_LUC_THAN[thanIdx] ? THAP_LUC_THAN[thanIdx].name : "N/A";
}


// ==========================================
// 2. BASE CALCULATOR ENGINE
// ==========================================
class ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, tuTru) {
        this.tueTich = tueTich;
        this.kyDu = kyDu;
        this.isDuongDon = isDuongDon;
        this.namCanIdx = namCanIdx;
        this.tuTru = tuTru;
        
        // Cục Số (72)
        this.cucNum = (this.tueTich % 72) || 72;
        
        // Tích Trung Cổ Giáp Dần (Dành riêng cho Tuế Kể - Tam Cơ & Đại Du & Ngũ Phúc)
        const yearVal = this.tueTich > 10000000 ? (this.tueTich - THUONG_CO_EPOCH) : this.tueTich;
        this.tichTrungCo = yearVal + 12607;
    }
    
    // ------ NHÓM KỶ DƯ (MOD 360/24/18/12) ------
    calcThaiAt() {
        let R = this.kyDu % 24 || 24;
        const palaceIndex = Math.floor((R - 1) / 3);
        const yearInPalace = ((R - 1) % 3) + 1;
        // Dương độn: Càn(1)→Ly(2)→Cấn(3)→Chấn(4)→Đoài(6)→Khôn(7)→Khảm(8)→Tốn(9)
        // Âm độn: Tốn(9)→Khảm(8)→Khôn(7)→Đoài(6)→Chấn(4)→Cấn(3)→Ly(2)→Càn(1)
        const path = this.isDuongDon ? [3, 13, 7, 9, 1, 15, 5, 11] : [11, 5, 15, 1, 9, 7, 13, 3];
        const thanIdx = path[palaceIndex];
        return { thanIdx, name: `Thái Ất (Cung ${palaceIndex + 1}, Năm ${yearInPalace})`, class: "thai-at" };
    }
    
    calcVanXuong() {
        // Dương độn: Khởi Thân(đi thuận 16 thần, gặp Kiền Khôn lưu 2 toán)
        const R = this.kyDu % 18 || 18;
        let current = 0; // Thân idx=0
        let stepCount = 1;
        const pauseArr = this.isDuongDon ? [3, 15] : [7, 11]; // Kiền,Khôn vs Cấn,Tốn
        if (R <= 1) return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
        while (stepCount < R) {
            if (pauseArr.includes(current)) {
                stepCount++;
                if (stepCount >= R) return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
            }
            current = (current + 1) % 16;
            stepCount++;
        }
        return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
    }
    
    calcKeThan() {
        // Dương độn: Khởi Dần(idx=8) nghịch 12 Chi
        // Âm độn: Khởi Thân(idx=0) nghịch 12 Chi
        const R = this.kyDu % 12 || 12;
        const startIdx = this.isDuongDon ? 8 : 0; // Dần=8, Thân=0
        let current = startIdx;
        for (let i = 1; i < R; i++) {
            current = (current - 1 + 16) % 16;
            // Bỏ qua 4 góc (Kiền, Cấn, Tốn, Khôn) khi đếm 12 chi
            while ([3, 7, 11, 15].includes(current)) {
                current = (current - 1 + 16) % 16;
            }
        }
        return { thanIdx: current, name: "Kế Định", class: "ke-than" };
    }

    calcKeDinh(thaiTueIdx, vanXuongIdx) {
        const THAN_HOP_MAP = { 0:12, 1:10, 2:9, 3:15, 4:8, 5:6, 6:5, 7:11, 8:4, 9:2, 10:1, 11:7, 12:0, 13:14, 14:13, 15:3 };
        const thanHopIdx = THAN_HOP_MAP[thaiTueIdx] !== undefined ? THAN_HOP_MAP[thaiTueIdx] : thaiTueIdx;
        
        let stepCount = 1;
        let p = thanHopIdx;
        while (p !== vanXuongIdx) {
            p = (p + 1) % 16;
            stepCount++;
        }
        
        let keDinhIdx = thaiTueIdx;
        for (let i = 1; i < stepCount; i++) {
            keDinhIdx = (keDinhIdx + 1) % 16;
        }
        
        return { thanIdx: keDinhIdx, name: "Kế Định", class: "ke-dinh", stepCount };
    }

    // ------ NHÓM TÍCH HỢP (THỦY KÍCH, TƯỚNG) ------
    calcThuyKich(vanXuongIdx, keThanIdx) {
        const CAN_IDX = 7;
        const distance = (vanXuongIdx - keThanIdx + 16) % 16;
        return { thanIdx: (CAN_IDX + distance) % 16, name: "Thủy Kích (Địa Mục)", class: "thuy-kich" };
    }
    
    calcDaiTuongAndThamTuong(taIdx, vxIdx, tkIdx) {
        const MAIN_PALACE_BIET_SO = { 3: 1, 13: 2, 7: 3, 9: 4, 1: 6, 15: 7, 5: 8, 11: 9 };
        const GIAN_THAN_IDXS = [0, 2, 4, 6, 8, 10, 12, 14];
        const PALACE_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];
        
        const getToan = (startIdx) => {
            if (startIdx === taIdx) return { raw: 1, val: 1 };
            
            let sum = 0;
            if (GIAN_THAN_IDXS.includes(startIdx)) {
                sum += 1;
            } else if (MAIN_PALACE_BIET_SO[startIdx] !== undefined) {
                sum += MAIN_PALACE_BIET_SO[startIdx];
            }
            
            let p = (startIdx + 1) % 16;
            while (p !== taIdx) {
                if (MAIN_PALACE_BIET_SO[p] !== undefined) {
                    sum += MAIN_PALACE_BIET_SO[p];
                }
                p = (p + 1) % 16;
            }
            return { raw: sum, val: sum % 10 || 10 };
        };

        const chuToanObj = getToan(vxIdx);
        const khachToanObj = getToan(tkIdx);
        const chuToan = chuToanObj.val;
        const khachToan = khachToanObj.val;
        
        const chuTuongIdx = PALACE_TO_THAN_IDX[chuToan] !== undefined ? PALACE_TO_THAN_IDX[chuToan] : -1;
        const khachTuongIdx = PALACE_TO_THAN_IDX[khachToan] !== undefined ? PALACE_TO_THAN_IDX[khachToan] : -1;
        
        const thamChuToan = (chuToan * 3) % 10 || 10;
        const thamKhachToan = (khachToan * 3) % 10 || 10;
        
        return [
            { thanIdx: chuTuongIdx, name: `Đại Tướng Chủ (Toán ${chuToan})`, class: "chu-tuong", rawToan: chuToanObj.raw },
            { thanIdx: khachTuongIdx, name: `Đại Tướng Khách (Toán ${khachToan})`, class: "khach-tuong", rawToan: khachToanObj.raw },
            { thanIdx: PALACE_TO_THAN_IDX[thamChuToan] !== undefined ? PALACE_TO_THAN_IDX[thamChuToan] : -1, name: `Tham Tướng Chủ`, class: "chu-tuong" },
            { thanIdx: PALACE_TO_THAN_IDX[thamKhachToan] !== undefined ? PALACE_TO_THAN_IDX[thamKhachToan] : -1, name: `Tham Tướng Khách`, class: "khach-tuong" }
        ];
    }

    // ------ NHÓM CƠ, PHÚC, DU (MOD TÍCH 360) ------
    calcCoPhucDu() {
        const tichDu = this.tichTrungCo % 360;
        
        // Quân Cơ: Khởi Ngọ (6), đi thuận 12 chi, 30 năm/cung
        const quanCoStep = Math.floor(tichDu / 30);
        const quanCoIdx = CHI_TO_THAN_IDX[(6 + quanCoStep) % 12];
        
        // Thần Cơ: Khởi Ngọ (6), đi thuận 12 chi, 3 năm/cung
        const thanCoStep = Math.floor((tichDu % 36) / 3);
        const thanCoIdx = CHI_TO_THAN_IDX[(6 + thanCoStep) % 12];
        
        // Dân Cơ: Khởi Tuất (10), đi thuận 12 chi, 1 năm/cung
        const danCoStep = (this.tichTrungCo % 12 || 12) - 1;
        const danCoIdx = CHI_TO_THAN_IDX[(10 + danCoStep) % 12];
        
        // Ngũ Phúc (Dùng Tích Trung Cổ Giáp Dần % 225 / 45 -> Càn, Cấn, Tốn, Khôn, Trung)
        const npR = this.tichTrungCo % 225;
        const npQ = Math.floor(npR / 45);
        const npPath = [3, 7, 11, 15, -1]; // 1: Càn(3), 2: Cấn(7), 3: Tốn(11), 4: Khôn(15), 5: Trung(-1)
        const npIdx = npPath[npQ % 5];
        
        // Đại Du (Dùng Tích Trung Cổ)
        const ddStep = Math.floor(((this.tichTrungCo + 34) % 288) / 36);
        const ddCung = [7, 8, 9, 1, 2, 3, 4, 6][ddStep % 8];
        
        // Tiểu Du (Dùng Kỷ Dư Thượng Cổ)
        let R = this.kyDu % 24 || 24;
        const tdStep = Math.floor((R - 1) / 3);
        const tdCung = [1, 2, 3, 4, 6, 7, 8, 9][tdStep % 8];
        
        return [
            { thanIdx: quanCoIdx, name: "Quân Cơ", class: "quan-co" },
            { thanIdx: thanCoIdx, name: "Thần Cơ", class: "than-co" },
            { thanIdx: danCoIdx, name: "Dân Cơ", class: "dan-co" },
            { thanIdx: npIdx, name: "Ngũ Phúc", class: "ngu-phuc" },
            { thanIdx: CUNG_TO_THAN_IDX[ddCung], name: "Đại Du", class: "dai-du" },
            { thanIdx: CUNG_TO_THAN_IDX[tdCung], name: "Tiểu Du", class: "tieu-du" }
        ];
    }
    
    // ------ NHÓM TỨ THẦN KỲ (MOD 36/12) ------
    calcTuThanKy() {
        // Dùng Kỷ Dư (kyDu) chia 36 lấy dư, dư chia 3, kết quả + 1 = P
        const kVal = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const r36 = kVal % 36;
        const P = Math.floor(r36 / 3) + 1; // 1-12
        
        // Mảng 12 cung Tứ Thần Kỳ: 1:Càn(3), 2:Ly(13), 3:Cấn(7), 4:Chấn(9), 5:Trung(-1), 6:Đoài(1), 7:Khôn(15), 8:Khảm(5), 9:Tốn(11), 10:Tị(12), 11:Thân(0), 12:Dần(8)
        const MASTER_PATH = [3, 13, 7, 9, -1, 1, 15, 5, 11, 12, 0, 8];
        
        const tuThanIdx = MASTER_PATH[(0 + P - 1) % 12];   // Khởi Càn (idx 0 của MASTER_PATH)
        const thienAtIdx = MASTER_PATH[(5 + P - 1) % 12];  // Khởi Đoài (idx 5 của MASTER_PATH)
        const trucPhuIdx = MASTER_PATH[(4 + P - 1) % 12];  // Khởi Trung Cung (idx 4 của MASTER_PATH)
        const diaAtIdx = MASTER_PATH[(8 + P - 1) % 12];    // Khởi Tốn (idx 8 của MASTER_PATH)
        
        // 1. Thanh Long: Kỷ Dư % 60 % 12, khởi Hợi thuận 12 địa chi
        const r60_tl = kVal % 60;
        const r12_tl = (r60_tl % 12) || 12;
        const THANH_LONG_PATH = [4, 5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2];
        const tlIdx = THANH_LONG_PATH[r12_tl - 1];
        
        // 2. Thái Âm: luôn đứng sau Thái Tuế 2 cung (Thái Tuế - 2)
        let thaiTueChiIdx = 6; // Mặc định Ngọ
        if (this.tuTru) {
            if (this.tuTru.hour && this.tuTru.hour.chiIdx !== undefined && this.mode === 'thoi') thaiTueChiIdx = this.tuTru.hour.chiIdx;
            else if (this.tuTru.day && this.tuTru.day.chiIdx !== undefined && this.mode === 'nhat') thaiTueChiIdx = this.tuTru.day.chiIdx;
            else if (this.tuTru.month && this.tuTru.month.chiIdx !== undefined && this.mode === 'nguyet') thaiTueChiIdx = this.tuTru.month.chiIdx;
            else if (this.tuTru.year && this.tuTru.year.chiIdx !== undefined) thaiTueChiIdx = this.tuTru.year.chiIdx;
        }
        const thaiAmChiIdx = (thaiTueChiIdx - 2 + 12) % 12;
        const taIdx = CHI_TO_THAN_IDX[thaiAmChiIdx];
        
        // 3. Phi Phù: Kỷ Dư % 72 / 3 + 1, đếm theo vòng 12 cung Dương/Âm Độn
        const r72 = kVal % 72;
        const P_pp = Math.floor(r72 / 3) + 1;
        const ppStepIdx = (P_pp - 1) % 12;
        const PHI_PHU_DUONG = [11, 11, 15, 3, 3, 13, 7, 9, -1, 1, 15, 5];
        const PHI_PHU_AM = [3, 3, 15, 11, 11, 5, 15, 1, -1, 9, 7, 13];
        const phiPhuPath = (this.isDuongDon !== false) ? PHI_PHU_DUONG : PHI_PHU_AM;
        const phiPhuIdx = phiPhuPath[ppStepIdx];
        
        // 4. Xích Kỳ: (Kỷ Dư + 1) % 40 % 4, khởi Hợi->Thân->Tị->Dần
        const r40_xk = (kVal + 1) % 40;
        const r4_xk = (r40_xk % 4) || 4;
        const XICH_KY_PATH = [4, 0, 12, 8];
        const xkIdx = XICH_KY_PATH[r4_xk - 1];
        
        // 5. Hắc Kỳ: (Kỷ Dư + 25) % 36 / 3 + 1, khởi Hợi nghịch 12 địa chi
        const r36_hk = (kVal + 25) % 36;
        const P_hk = Math.floor(r36_hk / 3) + 1;
        const HAC_KY_PATH = [4, 2, 1, 0, 14, 13, 12, 10, 9, 8, 6, 5];
        const hkIdx = HAC_KY_PATH[(P_hk - 1) % 12];
        
        return [
            { thanIdx: tuThanIdx, name: "Tứ Thần", class: "tu-than" },
            { thanIdx: thienAtIdx, name: "Thiên Ất", class: "tu-than" },
            { thanIdx: diaAtIdx, name: "Địa Ất", class: "tu-than" },
            { thanIdx: trucPhuIdx, name: "Trực Phù", class: "tu-than" },
            { thanIdx: tlIdx, name: "Thanh Long (Cờ Xanh)", class: "tu-than" },
            { thanIdx: taIdx, name: "Thái Âm", class: "tu-than" },
            { thanIdx: phiPhuIdx, name: "Phi Phù", class: "tu-than" },
            { thanIdx: xkIdx, name: "Xích Kỳ (Cờ Đỏ)", class: "co-khac" },
            { thanIdx: hkIdx, name: "Hắc Kỳ (Cờ Đen)", class: "co-khac" }
        ];
    }

    // ------ NHÓM CỬU TINH (VĂN XƯƠNG & TRỰC PHÙ) ------
    calcCuuTinh() {
        const res = [];
        const CUNG_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];

        // 1. Cửu Tinh Trực Phù (900/90/10 năm, Lục Can -> Cung Gốc)
        const TP_SAO_NAMES = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
        const CAN_TO_CUNG_TP = { 0: 1, 1: 9, 2: 8, 3: 7, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6 };
        const r900_tp = (this.tueTich % 900) % 90;
        const q_tp = Math.floor(r900_tp / 10) + 1;
        const start_tp = CAN_TO_CUNG_TP[this.namCanIdx] || 1;
        for (let i = 0; i < 9; i++) {
            const starIdx = (q_tp - 1 + i) % 9;
            const cungNum = (start_tp - 1 + i) % 9 + 1;
            res.push({
                thanIdx: CUNG_TO_THAN_IDX[cungNum],
                name: TP_SAO_NAMES[starIdx] + " (TP)",
                class: "truc-phu",
                unique: 'TP_' + TP_SAO_NAMES[starIdx]
            });
        }
        
        // 2. Cửu Tinh Văn Xương (270/30 năm, Can năm -> Cung Gốc)
        const VX_SAO_NAMES = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const CAN_TO_CUNG_VX = { 0: 3, 1: 4, 2: 9, 3: 2, 4: 5, 5: 5, 6: 7, 7: 6, 8: 1, 9: 8 };
        const r270_vx = this.tueTich % 270;
        const q_vx = Math.floor(r270_vx / 30) + 1;
        const start_vx = CAN_TO_CUNG_VX[this.namCanIdx] || 1;
        for (let i = 0; i < 9; i++) {
            const starIdx = (q_vx - 1 + i) % 9;
            const cungNum = (start_vx - 1 + i) % 9 + 1;
            res.push({
                thanIdx: CUNG_TO_THAN_IDX[cungNum],
                name: VX_SAO_NAMES[starIdx] + " (VX)",
                class: "van-xuong-9"
            });
        }
        
        return res;
    }
    
    // ------ NHÓM QUÝ THẦN & KHÁC ------
    calcOtherStars() {
        const res = [];
        const CUNG_TO_THAN_IDX = [-1, 5, 15, 9, 11, -1, 3, 1, 7, 13];
        
        // --- CÁC SAO PHỤ ---
        // Helper đếm bước lưu toán
        const countSteps = (startIdx, steps, pauseArr) => {
            let current = startIdx;
            let stepCount = 1;
            if (steps <= 1) return current;
            while (true) {
                if (pauseArr.includes(current)) {
                    stepCount++;
                    if (stepCount >= steps) return current;
                }
                current = (current + 1) % 16;
                stepCount++;
                if (stepCount >= steps) return current;
            }
        };

        const kVal = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const isDuong = this.isDuongDon !== false;

        // 1. Thiên Tôn (dư mod 4, Dương: Khảm->Đoài->Ly->Chấn, Âm: Chấn->Ly->Đoài->Khảm)
        const r4 = (kVal % 4) || 4;
        const THIEN_TON_DUONG = [5, 1, 13, 9];
        const THIEN_TON_AM = [9, 13, 1, 5];
        const ttonIdx = (isDuong ? THIEN_TON_DUONG : THIEN_TON_AM)[r4 - 1];
        
        // 2. Thiên Hoàng (dư mod 20, Dương khởi Thân lưu 2 toán ở 4 góc, Âm khởi Dần lưu 2 toán ở 4 góc)
        const r20 = (kVal % 20) || 20;
        const THIEN_HOANG_DUONG = [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15];
        const THIEN_HOANG_AM = [8, 7, 7, 6, 5, 4, 3, 3, 2, 1, 0, 15, 15, 14, 13, 12, 11, 11, 10, 9];
        const thoangIdx = (isDuong ? THIEN_HOANG_DUONG : THIEN_HOANG_AM)[r20 - 1];
        
        // 3. Thiên Thời (dư mod 12, Dương khởi Dần thuận 12 chi, Âm khởi Thân nghịch 12 chi)
        const r12 = (kVal % 12) || 12;
        const THIEN_THOI_DUONG = [8, 9, 10, 12, 13, 14, 0, 1, 2, 4, 5, 6];
        const THIEN_THOI_AM = [0, 14, 13, 12, 10, 9, 8, 6, 5, 4, 2, 1];
        const tthoiIdx = (isDuong ? THIEN_THOI_DUONG : THIEN_THOI_AM)[r12 - 1];
        
        // Đế Phù (chia 20, khởi Tuất đi thuận, lưu 2 toán ở 4 chính: Tý, Mão, Ngọ, Dậu)
        const dephuR = kVal % 20 || 20;
        const dephuIdx = countSteps(2, dephuR, [5, 9, 13, 1]); // Tuất=2
        
        // 4. Phi Điểu (dư mod 9, Dương khởi Càn thuận 9 cung, Âm khởi Tốn nghịch 9 cung)
        const r9 = (kVal % 9) || 9;
        const PHI_DIEU_DUONG = [3, 13, 7, 9, -1, 1, 15, 5, 11];
        const PHI_DIEU_AM = [11, 5, 15, 1, -1, 9, 7, 13, 3];
        const pdIdx = (isDuong ? PHI_DIEU_DUONG : PHI_DIEU_AM)[r9 - 1];
        
        // 5. Ngũ Hành (dư mod 5, Dương: Càn->Khảm->Cấn->Tốn->Khôn, Âm: Tốn->Ly->Khôn->Càn->Cấn)
        const r5_nh = (kVal % 5) || 5;
        const NGU_HANH_DUONG = [3, 5, 7, 11, 15];
        const NGU_HANH_AM = [11, 13, 15, 3, 7];
        const nhanhIdx = (isDuong ? NGU_HANH_DUONG : NGU_HANH_AM)[r5_nh - 1];
        
        // Dùng chung dư mod 9 cho 3 sao Phong: Tam Phong, Ngũ Phong, Bát Phong
        const r9_phong = (kVal % 9) || 9;
        
        // 6. Tam Phong (dư mod 9, Dương: Cấn->Khôn->Ly->Đoài->Càn->Trung->Tốn->Chấn->Khảm)
        const TAM_PHONG_DUONG = [7, 15, 13, 1, 3, -1, 11, 9, 5];
        const TAM_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const tphongIdx = (isDuong ? TAM_PHONG_DUONG : TAM_PHONG_AM)[r9_phong - 1];
        
        // 7. Ngũ Phong (dư mod 9, Dương: Càn->Cấn->Trung->Khôn->Tốn->Ly->Chấn->Đoài->Khảm)
        const NGU_PHONG_DUONG = [3, 7, -1, 15, 11, 13, 9, 1, 5];
        const NGU_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const ngphongIdx = (isDuong ? NGU_PHONG_DUONG : NGU_PHONG_AM)[r9_phong - 1];
        
        // 8. Bát Phong (dư mod 9, Dương: Ly->Cấn->Chấn->Trung->Đoài->Khôn->Khảm->Tốn->Càn)
        const BAT_PHONG_DUONG = [13, 7, 9, -1, 1, 15, 5, 11, 3];
        const BAT_PHONG_AM = [5, 15, 1, -1, 9, 7, 13, 3, 11];
        const bphongIdx = (isDuong ? BAT_PHONG_DUONG : BAT_PHONG_AM)[r9_phong - 1];

        res.push(
            { thanIdx: ttonIdx, name: "Thiên Tôn", class: "other-stars" },
            { thanIdx: thoangIdx, name: "Thiên Hoàng", class: "other-stars" },
            { thanIdx: tthoiIdx, name: "Thiên Thời", class: "other-stars" },
            { thanIdx: dephuIdx, name: "Đế Phù", class: "other-stars" },
            { thanIdx: pdIdx, name: "Phi Điểu", class: "other-stars" },
            { thanIdx: nhanhIdx, name: "Ngũ Hành", class: "other-stars" },
            { thanIdx: tphongIdx, name: "Tam Phong", class: "other-stars" },
            { thanIdx: ngphongIdx, name: "Ngũ Phong", class: "other-stars" },
            { thanIdx: bphongIdx, name: "Bát Phong", class: "other-stars" }
        );

        // --- QUÝ THẦN (9 SAO QUÝ THẦN: Nhập Trung Cung, bay lùi 8 cung xung quanh) ---
        const QT_SAO_NAMES = ["Thái Nhất", "Thiên Hoàng", "Thái Âm", "Hàm Trì", "Thanh Long", "Thiên Phù", "Chiêu Dao", "Hiên Viên", "Nhiếp Đề"];
        const QT_PATH_8 = [3, 1, 7, 13, 5, 15, 9, 11]; // Kiền, Đoài, Cấn, Ly, Khảm, Khôn, Chấn, Tốn
        const r_qt = (kVal + 3) % 9 || 9;

        let stIdx = r_qt - 1; // 0-based index of star
        // Trung Cung
        res.push({
            thanIdx: -1,
            name: QT_SAO_NAMES[stIdx] + " (QT)",
            class: "quy-than",
            unique: 'QT_' + QT_SAO_NAMES[stIdx]
        });

        // Bay lùi 8 cung
        for (let i = 0; i < 8; i++) {
            stIdx = (stIdx - 1 + 9) % 9;
            res.push({
                thanIdx: QT_PATH_8[i],
                name: QT_SAO_NAMES[stIdx] + " (QT)",
                class: "quy-than",
                unique: 'QT_' + QT_SAO_NAMES[stIdx]
            });
        }
        
        return res;
    }

    getAllStars() {
        const thaiAt = this.calcThaiAt();
        const vanXuong = this.calcVanXuong();
        const keThan = this.calcKeThan();
        const thaiTueIdx = (this.tuTru && this.tuTru.year && this.tuTru.year.chiIdx !== undefined) ? CHI_TO_THAN_IDX[this.tuTru.year.chiIdx] : 13;
        const keDinh = this.calcKeDinh(thaiTueIdx, vanXuong.thanIdx);
        const thuyKich = this.calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
        const tuongStars = this.calcDaiTuongAndThamTuong(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx);
        
        const all = [
            thaiAt, vanXuong, keThan, keDinh, thuyKich,
            ...tuongStars,
            ...this.calcCoPhucDu(),
            ...this.calcTuThanKy(),
            ...this.calcCuuTinh(),
            ...this.calcOtherStars()
        ];
        
        // Populate Placement Map
        const placement = { "trung_cung": [] };
        THAP_LUC_THAN.forEach(t => placement[t.id] = []);
        all.forEach(s => {
            if (s.thanIdx === -1) placement["trung_cung"].push(s);
            else if (THAP_LUC_THAN[s.thanIdx]) placement[THAP_LUC_THAN[s.thanIdx].id].push(s);
        });
        
        return {
            placement, 
            flat: all, 
            core: { taIdx: thaiAt.thanIdx, vxIdx: vanXuong.thanIdx, tkIdx: thuyKich.thanIdx, ctIdx: tuongStars[0].thanIdx, ktIdx: tuongStars[1].thanIdx }
        };
    }
}


// ==========================================
// 3. MODE IMPLEMENTATIONS
// ==========================================
function luanDoanNguHanh(chuElement, khachElement) {
    const KHAC = { moc: "tho", hoa: "kim", tho: "thuy", kim: "moc", thuy: "hoa" };
    const SINH = { moc: "hoa", hoa: "tho", tho: "kim", kim: "thuy", thuy: "moc" };
    if (KHAC[chuElement] === khachElement) return "CHỦ THẮNG — Văn Xương khắc chế Thủy Kích.";
    if (KHAC[khachElement] === chuElement) return "KHÁCH THẮNG — Thủy Kích khắc chế Văn Xương.";
    if (SINH[chuElement] === khachElement || SINH[khachElement] === chuElement) return "HÒA HỢP — Chủ Khách tương sinh.";
    if (chuElement === khachElement) return "GIẰNG CO — Đồng hành.";
    return "Cần xét thêm vị trí Đại Tướng.";
}

class TueKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        this.tueTich = THUONG_CO_EPOCH + year;
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new ThaiAtBaseEngine(t, t % 360, true, this.namCanIdx, this.tuTru);
    }
    getMetadata() {
        return { name: "Tuế Kể (Lập Quẻ Năm)", don: "Dương Độn", cucNum: this.getEngine(0).cucNum };
    }
}

class NguyetKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        
        // Tính Tuế Tích Thượng Cổ
        this.tueTichThuongCo = THUONG_CO_EPOCH + year - 1;
        const tueTichPrev = THUONG_CO_EPOCH + year - 2;
        const prevKyDu = tueTichPrev % 360;
        
        // Đếm tháng từ tháng 11 năm trước (Tháng Tý)
        let deltaMonth = month >= 11 ? month - 10 : month + 2;
        
        this.tueTich = (prevKyDu * 12) + deltaMonth;
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new RealNguyetKeEngine(t, t % 360, true, this.namCanIdx, this.tueTichThuongCo, this.tuTru);
    }
    getMetadata() {
        return { name: "Nguyệt Kể (Lập Quẻ Tháng)", don: "Dương Độn", cucNum: this.getEngine(0).cucNum };
    }
}

class NhatKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        
        const currentJD = getCanChiDay(year, month, day).jdInt || 0;
        
        // MỐC 2: Tích Nhật (Số ngày từ Thượng Cổ Giáp Tý)
        // Dùng giả định Tích Nhật = JD + (10153917 * 365) + Giáp Tý Offset
        // Vì chỉ quan tâm đến modulo 60, 240, 360, 72, ta dùng currentJD + 49 + Epoch
        // Giáp Tý là khi JD % 60 === 11. Vậy JD - 11 là số ngày từ Giáp Tý gần nhất.
        this.tichNhat = currentJD - 11 + 60000000; // Đảm bảo số lớn để không bị âm
        
        // MỐC 1: Số ngày từ Giáp Tý sau tiết Đông Chí
        // Tiết Đông Chí thường rơi vào ngày 21-22 tháng 12.
        // Xác định năm chứa Đông Chí gần nhất
        let dongChiYear = year;
        if (month < 12 || (month === 12 && day < 21)) dongChiYear = year - 1;
        
        // Tìm JD của Đông Chí (Ước lượng khoảng 22/12)
        const dongChiJD = Math.round(getJulianDay(dongChiYear, 12, 22, 12, 0));
        
        // Tìm ngày Giáp Tý đầu tiên sau Đông Chí
        let giapTyJD = dongChiJD;
        while (giapTyJD % 60 !== 11) giapTyJD++;
        
        this.soNgayTuGiapTy = currentJD - giapTyJD;
        if (this.soNgayTuGiapTy < 0) {
            // Nếu ngày hiện tại nằm giữa Đông Chí và Giáp Tý, lùi về Đông Chí năm trước nữa
            dongChiYear--;
            const prevDongChiJD = Math.round(getJulianDay(dongChiYear, 12, 22, 12, 0));
            giapTyJD = prevDongChiJD;
            while (giapTyJD % 60 !== 11) giapTyJD++;
            this.soNgayTuGiapTy = currentJD - giapTyJD;
        }

        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const tich = this.tichNhat + offset;
        const soNgay = this.soNgayTuGiapTy + offset;
        return new RealNhatKeEngine(tich, tich % 360, true, this.namCanIdx, this.tichNhat, soNgay, this.tuTru);
    }
    getMetadata() {
        return { name: "Nhật Kể (Lập Quẻ Ngày)", don: "Dương Độn", cucNum: (this.soNgayTuGiapTy % 72) || 72 };
    }
}

class ThoiKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        
        const currentJD = getCanChiDay(year, month, day).jdInt || 0;
        const currentHourIdx = this.tuTru.hour.chiIdx;
        
        // Tiết khí Hạ Chí thường rơi vào 21-22 tháng 6. Đông Chí vào 21-22 tháng 12.
        // Cần xác định hiện tại thuộc nửa năm Dương Độn (sau ĐC, trước HC) hay Âm Độn (sau HC, trước ĐC).
        let isDuongDon = true;
        if ((month > 6 && month < 12) || (month === 6 && day >= 21) || (month === 12 && day < 21)) {
            isDuongDon = false; // Nửa cuối năm -> Âm Độn
        }
        
        // Tìm mốc Đông Chí hoặc Hạ Chí gần nhất
        let mocYear = year;
        let mocMonth = isDuongDon ? 12 : 6;
        if (isDuongDon && (month < 12 || (month === 12 && day < 21))) {
            mocYear = year - 1; // Đông Chí năm trước
        }
        const mocJD = Math.round(getJulianDay(mocYear, mocMonth, 22, 12, 0)); // Ước lượng 22/6 hoặc 22/12
        
        // Tìm ngày Giáp Tý hoặc Giáp Ngọ đầu tiên sau mốc này
        // Giáp Tý: JD % 60 === 11. Giáp Ngọ: Can=Giáp, Chi=Ngọ -> JD % 60 === 41
        let gtgnJD = mocJD;
        while (gtgnJD % 60 !== 11 && gtgnJD % 60 !== 41) gtgnJD++;
        
        // Số giờ từ nửa đêm ngày Giáp Tý/Giáp Ngọ đó
        this.soGio = (currentJD - gtgnJD) * 12 + currentHourIdx;
        if (this.soGio < 0) {
            // Nếu ngày hiện tại kẹt giữa Tiết Khí và Giáp Tý/Giáp Ngọ, lấy mốc ngược về Tiết khí trước đó
            this.soGio = 0; // Tạm fallback
        }
        
        this.isDuongDon = isDuongDon;
        this.tueTich = this.soGio; // Để base không lỗi
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const soGioCurrent = this.soGio + offset;
        return new RealThoiKeEngine(soGioCurrent, soGioCurrent % 360, this.isDuongDon, this.namCanIdx, soGioCurrent, this.tuTru);
    }
    getMetadata() {
        return { name: "Thời Kể (Lập Quẻ Giờ)", don: this.isDuongDon ? "Dương Độn" : "Âm Độn", cucNum: (this.soGio % 72) || 72 };
    }
}

// ==========================================
// 4. MAIN DISPATCHER & TIME TRAVEL
// ==========================================
function calculateThaiAtChart(mode, year, month, day, hour) {
    // Mode Bypass for Dich & Menh
    if (mode === "dich") return calculateQueDich(year, month, day, hour);
    if (mode === "menh") return calculateNhanMenh(year, month, day, hour);
    
    let factory;
    if (mode === "tue") factory = new TueKeEngine(year, month, day, hour);
    else if (mode === "nguyet") factory = new NguyetKeEngine(year, month, day, hour);
    else if (mode === "nhat") factory = new NhatKeEngine(year, month, day, hour);
    else factory = new ThoiKeEngine(year, month, day, hour);
    
    const engCurrent = factory.getEngine(0);
    const engNext = factory.getEngine(1);
    
    const currRes = engCurrent.getAllStars();
    const nextRes = engNext.getAllStars();
    
    // So sánh sự khác biệt (Time Travel Diff)
    const movingStars = [];
    const currFlat = currRes.flat;
    const nextFlat = nextRes.flat;
    
    for (let i = 0; i < currFlat.length; i++) {
        const s1 = currFlat[i];
        const s2 = nextFlat[i];
        // Dùng name làm identifier, nếu trùng tên nhiều sao (như 9 sao TP) thì dùng thêm unique key
        if (s1.thanIdx !== s2.thanIdx) {
            let trueName = s1.name;
            if (s1.name.includes("Thái Ất (Cung")) trueName = "Thái Ất";
            movingStars.push({
                name: trueName,
                currCungName: getThanName(s1.thanIdx),
                nextCungName: getThanName(s2.thanIdx)
            });
        }
    }
    
    const meta = factory.getMetadata();
    const tuTru = factory.tuTru;
    const solarTerm = factory.solarTerm || getExactSolarTerm(year, month, day, hour);
    
    const vxEl = engCurrent.calcVanXuong().thanIdx !== -1 ? THAP_LUC_THAN[engCurrent.calcVanXuong().thanIdx].elementKey : "tho";
    const tkEl = currRes.core.tkIdx !== -1 ? THAP_LUC_THAN[currRes.core.tkIdx].elementKey : "tho";
    
    // Cửa Trực Sự (Bát Môn) - Chu kỳ 240 năm, 30 năm 1 cung
    const batMonStep = Math.floor((factory.tueTich % 240) / 30);
    const batMonStr = BAT_MON[batMonStep % 8];
    
    // Sao Trực Sự (Cửu Tinh) - Chu kỳ 90 năm, 10 năm 1 sao
    const cuuTinhStep = Math.floor((factory.tueTich % 90) / 10);
    const cuuTinhStr = CUU_TINH[cuuTinhStep % 9];
    
    // Export Toán numbers & Kế values for UI
    let toanChuVal = 1;
    let toanChuRawVal = 1;
    let toanKhachVal = 1;
    let toanKhachRawVal = 1;
    for (const key in currRes.placement) {
        if (!currRes.placement[key]) continue;
        const sC = currRes.placement[key].find(s => s.name.includes('Đại Tướng Chủ'));
        if (sC) {
            const m = sC.name.match(/Toán (\d+)/);
            if (m) toanChuVal = parseInt(m[1]);
            if (sC.rawToan !== undefined) toanChuRawVal = sC.rawToan;
            else toanChuRawVal = toanChuVal;
        }
        const sK = currRes.placement[key].find(s => s.name.includes('Đại Tướng Khách'));
        if (sK) {
            const m = sK.name.match(/Toán (\d+)/);
            if (m) toanKhachVal = parseInt(m[1]);
            if (sK.rawToan !== undefined) toanKhachRawVal = sK.rawToan;
            else toanKhachRawVal = toanKhachVal;
        }
    }
    
    // Gọi module Luận Đoán cho tất cả các chế độ
    let luanDoanData = null;
    if (typeof ThaiAtLuanDoan !== 'undefined') {
        const fullTue = factory.tichNhat || factory.tueTichThuongCo || 0; // Tích Nhật hoặc Tuế Tích Thượng Cổ
        const namCanIdx = factory.namCanIdx || factory.tuTru.year.canIdx || 0;
        const lunarMonth = (factory.tuTru.month && factory.tuTru.month.chiIdx !== undefined) ? ((factory.tuTru.month.chiIdx + 10) % 12 + 1) : 1;
        const isDuongDon = factory.isDuongDon !== undefined ? factory.isDuongDon : true;
        const kyDuVal = factory.kyDu !== undefined ? factory.kyDu : (factory.tueTich % 360);
        const ld = new ThaiAtLuanDoan(factory.tueTich, namCanIdx, isDuongDon, mode, fullTue, lunarMonth, kyDuVal);
        luanDoanData = ld.generateReport(toanChuVal, toanKhachVal, currRes.core.tkIdx, currRes.core.taIdx);
    }
    
    // Toán Định (Tính từ Kế Định đến Thái Ất)
    const MAIN_PALACE_BIET_SO = { 3: 1, 13: 2, 7: 3, 9: 4, 1: 6, 15: 7, 5: 8, 11: 9 };
    const GIAN_THAN_IDXS = [0, 2, 4, 6, 8, 10, 12, 14];
    const calcToanFunc = (startIdx, targetIdx) => {
        if (startIdx === targetIdx) return 1;
        let sum = 0;
        if (GIAN_THAN_IDXS.includes(startIdx)) sum += 1;
        else if (MAIN_PALACE_BIET_SO[startIdx] !== undefined) sum += MAIN_PALACE_BIET_SO[startIdx];
        let p = (startIdx + 1) % 16;
        while (p !== targetIdx) {
            if (MAIN_PALACE_BIET_SO[p] !== undefined) sum += MAIN_PALACE_BIET_SO[p];
            p = (p + 1) % 16;
        }
        return sum;
    };

    const keDinhStar = currRes.flat.find(s => s.name === "Kế Định");
    const keDinhIdx = keDinhStar ? keDinhStar.thanIdx : 4;
    const toanDinhRawVal = calcToanFunc(keDinhIdx, currRes.core.taIdx);
    const toanDinhVal = toanDinhRawVal % 10 || 10;
    
    // Kế Đại, Kế Tiểu, Kế Định
    const keDaiVal = factory.tichNhat || factory.tueTichThuongCo || factory.tueTich || 0;
    const keTieuVal = factory.kyDu !== undefined ? factory.kyDu : (factory.tueTich % 360);
    const keDinhValStr = (keDinhIdx !== -1 ? getThanName(keDinhIdx) : "Trung Cung");
    
    // Dynamic Bát Hung Evaluation
    const evalBatHung = () => {
        const activeHung = [];
        const taIdx = currRes.core ? currRes.core.taIdx : -1;
        const tkIdx = currRes.core ? currRes.core.tkIdx : -1;
        const ctIdx = currRes.core ? currRes.core.ctIdx : -1;
        const ktIdx = currRes.core ? currRes.core.ktIdx : -1;

        // 1. Kích: Thái Ất gặp Thủy Kích đồng cung
        if (taIdx !== -1 && taIdx === tkIdx) {
            activeHung.push("Kích (Thái Ất gặp Thủy Kích đồng cung)");
        }

        // 2. Yểm: Thái Ất lâm cung gặp Hắc Kỳ hoặc Xích Kỳ
        if (taIdx !== -1) {
            const taPalaceName = THAP_LUC_THAN[taIdx] ? THAP_LUC_THAN[taIdx].id : "";
            const taStars = currRes.placement[taPalaceName] || [];
            if (taStars.some(s => s.name.includes("Hắc Kỳ") || s.name.includes("Xích Kỳ"))) {
                activeHung.push("Yểm (Thái Ất bị hung tinh chế ngự)");
            }
        }

        // 3. Đối: Thái Ất và Thủy Kích ở 2 cung đối nhau
        if (taIdx !== -1 && tkIdx !== -1 && Math.abs(taIdx - tkIdx) === 8) {
            activeHung.push("Đối (Thái Ất đối xung Thủy Kích)");
        }

        // 4. Chấp Đề: Đại Tướng Chủ và Đại Tướng Khách ở 2 cung đối nhau
        if (ctIdx !== -1 && ktIdx !== -1 && Math.abs(ctIdx - ktIdx) === 8) {
            activeHung.push("Chấp Đề (Chủ Khách đối thế)");
        }

        // 5. Tù: Thái Ất ở Tý (5), Dần (8), Mão (9), Dậu (1) gặp hung tinh
        if ([5, 8, 9, 1].includes(taIdx)) {
            const taPalaceName = THAP_LUC_THAN[taIdx] ? THAP_LUC_THAN[taIdx].id : "";
            const taStars = currRes.placement[taPalaceName] || [];
            if (taStars.length > 2) {
                activeHung.push("Tù (Thái Ất rơi vào hãm địa)");
            }
        }

        if (activeHung.length > 0) return activeHung.join("; ");
        return "Không thuộc Bát Hung.";
    };

    return {
        modeName: meta.name,
        tuTru,
        solarTerm: solarTerm.name,
        donCucName: `${meta.don} — Cục ${meta.cucNum}`,
        batMon: batMonStr,
        cuuTinh: cuuTinhStr,
        toanChu: toanChuVal,
        toanChuGoc: toanChuRawVal,
        toanKhach: toanKhachVal,
        toanKhachGoc: toanKhachRawVal,
        toanDinh: toanDinhVal,
        toanDinhGoc: toanDinhRawVal,
        keDai: keDaiVal,
        keTieu: keTieuVal,
        keDinh: keDinhValStr,
        placement: currRes.placement,
        batHung: evalBatHung(),
        verdict: luanDoanNguHanh(vxEl, tkEl),
        movingStars: movingStars,
        luanDoanData: luanDoanData
    };
}

// Fallbacks for Dich/Menh (unchanged logic, just cleaned up)
function calculateQueDich(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const BAT_QUAI = ["Càn", "Đoài", "Ly", "Chấn", "Tốn", "Khảm", "Cấn", "Khôn"];
    const sumToan = tuTru.year.canIdx + tuTru.month.chiIdx + tuTru.day.canIdx + tuTru.day.chiIdx + tuTru.hour.chiIdx;
    const thuongQuai = BAT_QUAI[sumToan % 8];
    const haQuai = BAT_QUAI[(sumToan + tuTru.hour.chiIdx) % 8];
    const haoDong = (sumToan % 6) + 1;

    const placement = { "trung_cung": [] };
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement["kien"].push({ name: `Thượng: ${thuongQuai}`, class: "thai-at" });
    placement["khon"].push({ name: `Hạ: ${haQuai}`, class: "van-xuong" });
    placement["ngo"].push({ name: `Hào Động ${haoDong}`, class: "thuy-kich" });

    return {
        modeName: "Quẻ Dịch (Kinh Dịch Nạp Giáp)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `${thuongQuai} trên ${haQuai} — Hào Động ${haoDong}`,
        batMon: `Hào ${haoDong}`, cuuTinh: `${thuongQuai}/${haQuai}`,
        placement, batHung: "-", verdict: "Xét ngũ hành nạp giáp.", movingStars: []
    };
}

function calculateNhanMenh(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const menhChiIdx = (tuTru.month.chiIdx + tuTru.hour.chiIdx) % 12;
    const thanChiIdx = (tuTru.month.chiIdx + 12 - tuTru.hour.chiIdx) % 12;
    const menhName = CHI_LIST_LOCAL[menhChiIdx];
    const thanName = CHI_LIST_LOCAL[thanChiIdx];
    
    const placement = { "trung_cung": [] };
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    const menhThan = THAP_LUC_THAN.find(t => t.name === menhName);
    const thanThan = THAP_LUC_THAN.find(t => t.name === thanName);
    if (menhThan) placement[menhThan.id].push({ name: "CUNG MỆNH", class: "thai-at" });
    if (thanThan) placement[thanThan.id].push({ name: "CUNG THÂN", class: "van-xuong" });

    return {
        modeName: "Bàn Nhân Mệnh",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `Mệnh: ${menhName} — Thân: ${thanName}`,
        batMon: "-", cuuTinh: "-",
        placement, batHung: "-", verdict: "Xét ngũ hành bản mệnh.", movingStars: []
    };
}
