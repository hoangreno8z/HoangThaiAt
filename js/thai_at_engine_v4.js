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
    constructor(tueTich, kyDu, isDuongDon, namCanIdx) {
        this.tueTich = tueTich;
        this.kyDu = kyDu;
        this.isDuongDon = isDuongDon;
        this.namCanIdx = namCanIdx;
        
        // Cục Số (72)
        this.cucNum = (this.tueTich % 72) || 72;
        
        // Tích Trung Cổ Giáp Dần (Dành riêng cho Tuế Kể - Tam Cơ & Đại Du & Ngũ Phúc)
        this.tichTrungCo = this.tueTich + 250;
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
        return { thanIdx: current, name: "Kế Thần", class: "ke-than" };
    }

    // ------ NHÓM TÍCH HỢP (THỦY KÍCH, TƯỚNG) ------
    calcThuyKich(vanXuongIdx, keThanIdx) {
        const CAN_IDX = 7;
        const distance = (vanXuongIdx - keThanIdx + 16) % 16;
        return { thanIdx: (CAN_IDX + distance) % 16, name: "Thủy Kích (Địa Mục)", class: "thuy-kich" };
    }
    
    calcDaiTuongAndThamTuong(taIdx, vxIdx, tkIdx) {
        // Cung Chính (1-9) -> THAP_LUC_THAN indices
        const CUNG_TO_THAN_IDX = [-1, 5, 15, 9, 11, -1, 3, 1, 7, 13];
        // Gián Thần
        const GIAN_THAN = [0, 2, 4, 6, 8, 10, 12, 14];
        
        const getToan = (startIdx) => {
            if (startIdx === taIdx) {
                const pIdx = CUNG_TO_THAN_IDX.indexOf(startIdx);
                const rawVal = pIdx > 0 ? pIdx : 1;
                return { raw: rawVal, val: rawVal % 10 || 10 };
            }
            
            let toan = 0;
            if (GIAN_THAN.includes(startIdx)) {
                toan += 1; // Khởi đầu tại Gián Thần thì đếm 1
            } else {
                toan += CUNG_TO_THAN_IDX.indexOf(startIdx);
            }
            
            let p = (startIdx + 1) % 16;
            while (p !== taIdx) {
                // Không cộng Gián Thần trên đường đi
                if (!GIAN_THAN.includes(p) && CUNG_TO_THAN_IDX.includes(p)) {
                    toan += CUNG_TO_THAN_IDX.indexOf(p);
                }
                p = (p + 1) % 16;
            }
            // Cộng điểm đích đến Thái Ất nếu không phải Gián Thần
            if (!GIAN_THAN.includes(taIdx) && CUNG_TO_THAN_IDX.includes(taIdx)) {
                toan += CUNG_TO_THAN_IDX.indexOf(taIdx);
            }
            return { raw: toan, val: toan % 10 || 10 };
        };

        const chuToanObj = getToan(vxIdx);
        const khachToanObj = getToan(tkIdx);
        const chuToan = chuToanObj.val;
        const khachToan = khachToanObj.val;
        
        const chuTuongIdx = CUNG_TO_THAN_IDX[chuToan] || -1;
        const khachTuongIdx = CUNG_TO_THAN_IDX[khachToan] || -1;
        
        const thamChuToan = (chuToan * 3) % 10 || 10;
        const thamKhachToan = (khachToan * 3) % 10 || 10;
        
        return [
            { thanIdx: chuTuongIdx, name: `Đại Tướng Chủ (Toán ${chuToan})`, class: "chu-tuong", rawToan: chuToanObj.raw },
            { thanIdx: khachTuongIdx, name: `Đại Tướng Khách (Toán ${khachToan})`, class: "khach-tuong", rawToan: khachToanObj.raw },
            { thanIdx: CUNG_TO_THAN_IDX[thamChuToan], name: `Tham Tướng Chủ`, class: "chu-tuong" },
            { thanIdx: CUNG_TO_THAN_IDX[thamKhachToan], name: `Tham Tướng Khách`, class: "khach-tuong" }
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
        
        // Ngũ Phúc (Dùng Tích Trung Cổ Giáp Dần + 115, chia 225 lấy dư, dư chia 45)
        const npStep = Math.floor(((this.tichTrungCo + 115) % 225) / 45);
        const npIdx = [3, 7, 11, 15, -1][npStep % 5]; // Càn(3), Cấn(7), Tốn(11), Khôn(15), Trung(-1)
        
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
        const step36 = Math.floor((this.tueTich % 360 % 36) / 3);
        
        // Quỹ đạo 12 cung đặc biệt của nhóm Tứ Thần: Cung 1->9, Tị, Thân, Dần
        // 1(Tý:5), 2(Khôn:15), 3(Mão:9), 4(Tốn:11), 5(Trung:-1), 6(Kiền:3), 7(Dậu:1), 8(Cấn:7), 9(Ngọ:13), Tị(12), Thân(0), Dần(8)
        const TU_THAN_PATH = [5, 15, 9, 11, -1, 3, 1, 7, 13, 12, 0, 8];
        const tuThanIdx = TU_THAN_PATH[(0 + step36) % 12];
        const thienAtIdx = TU_THAN_PATH[(5 + step36) % 12];
        const trucPhuIdx = TU_THAN_PATH[(4 + step36) % 12];
        const diaAtIdx = TU_THAN_PATH[(8 + step36) % 12];
        
        const tlR = ((this.tueTich % 60) % 12) || 12;
        const tlIdx = CHI_TO_THAN_IDX[(11 + tlR - 1) % 12];
        const taIdx = CHI_TO_THAN_IDX[(10 + step36) % 12]; // Giữ nguyên Thái Âm gốc
        
        const xkStep = Math.floor(((this.tueTich + 1) % 40) / 4);
        const xkPath = [11, 0, 12, 8]; // Hợi, Thân, Tị, Dần (4 cung mạnh đi ngược)
        const xkIdx = xkPath[xkStep % 4];
        
        const hkStep = Math.floor(((this.tueTich + 25) % 360 % 36) / 3);
        const hkIdx = CHI_TO_THAN_IDX[(11 - hkStep + 12) % 12];
        
        return [
            { thanIdx: tuThanIdx, name: "Tứ Thần", class: "tu-than" },
            { thanIdx: thienAtIdx, name: "Thiên Ất", class: "tu-than" },
            { thanIdx: diaAtIdx, name: "Địa Ất", class: "tu-than" },
            { thanIdx: trucPhuIdx, name: "Trực Phù", class: "tu-than" },
            { thanIdx: tlIdx, name: "Thanh Long (Cờ Xanh)", class: "tu-than" },
            { thanIdx: taIdx, name: "Thái Âm", class: "tu-than" },
            { thanIdx: xkIdx, name: "Xích Kỳ (Cờ Đỏ)", class: "co-khac" },
            { thanIdx: hkIdx, name: "Hắc Kỳ (Cờ Đen)", class: "co-khac" }
        ];
    }

    // ------ NHÓM CỬU TINH (MOD 900 / 270) ------
    calcCuuTinh() {
        const res = [];
        // Cửu Tinh Trực Phù
        const du90 = (this.tueTich % 900) % 90;
        const nhom = du90 === 0 ? 9 : Math.ceil(du90 / 10);
        let curr = CAN_CUNG_MAP[this.namCanIdx] || 1;
        for (let i = 0; i < 9; i++) {
            let sn = nhom + i; if (sn > 9) sn -= 9;
            res.push({ thanIdx: CUNG_TO_THAN_IDX[curr], name: CUU_TINH[sn - 1] + " (TP)", class: "truc-phu", unique: 'TP_'+CUU_TINH[sn - 1] });
            curr = (curr % 9) + 1;
        }
        
        // Văn Xương 9 Sao
        const vxStep = Math.floor((this.tueTich % 270) / 30);
        const vxSao = (vxStep % 9) + 1;
        const vxCung = CAN_CUNG_MAP[this.namCanIdx] || 1;
        const vxNames = ["Bài Văn", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Thừa Minh", "Huyền Vũ", "Huyền Minh", "Hùng Minh"];
        res.push({ thanIdx: CUNG_TO_THAN_IDX[vxCung], name: vxNames[vxSao - 1] + " (VX)", class: "van-xuong-9" });
        
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

        // Thiên Tôn (chia 4, đi ngược góc: Cấn(8) -> Kiền(6) -> Tốn(4) -> Khôn(2))
        const ttonR = this.kyDu % 4 || 4;
        const ttonIdx = [7, 3, 11, 15][ttonR - 1];
        
        // Thiên Hoàng (chia 20, khởi Thân đi thuận, lưu 2 toán ở 4 góc: Cấn, Tốn, Khôn, Kiền)
        const thoangR = this.kyDu % 20 || 20;
        const thoangIdx = countSteps(0, thoangR, [7, 11, 15, 3]); // Thân=0
        
        // Thiên Thời (chia 12, khởi Dần đi thuận)
        const tthoiR = this.kyDu % 12 || 12;
        const tthoiIdx = CHI_TO_THAN_IDX[(2 + tthoiR - 1) % 12]; // Dần=2
        
        // Đế Phù (chia 20, khởi Tuất đi thuận, lưu 2 toán ở 4 chính: Tý, Mão, Ngọ, Dậu)
        const dephuR = this.kyDu % 20 || 20;
        const dephuIdx = countSteps(2, dephuR, [5, 9, 13, 1]); // Tuất=2
        
        // Phi Điểu (chia 9, khởi 1 đi thuận)
        const pdR = this.kyDu % 9 || 9;
        const pdIdx = CUNG_TO_THAN_IDX[pdR];
        
        // Ngũ Hành (chia 9, khởi 1 nhảy 5)
        const nhR = this.kyDu % 9 || 9;
        let nhCung = 1;
        for(let i = 1; i < nhR; i++) { nhCung = (nhCung + 4) % 9 + 1; }
        const nhanhIdx = CUNG_TO_THAN_IDX[nhCung];
        
        // Tam Phong (chia 90/9, khởi 3)
        const tpR = Math.floor((this.kyDu % 90) / 9);
        const tphongIdx = CUNG_TO_THAN_IDX[(3 - 1 + tpR) % 9 + 1];
        
        // Ngũ Phong (chia 90/9, khởi 1)
        const ngR = Math.floor((this.kyDu % 90) / 9);
        const ngphongIdx = CUNG_TO_THAN_IDX[(1 - 1 + ngR) % 9 + 1];
        
        // Bát Phong (chia 9)
        const bpR = this.kyDu % 9 || 9;
        const bphongIdx = CUNG_TO_THAN_IDX[bpR];

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

        // --- QUÝ THẦN ---
        // (Kỷ dư + 3) % 9, khởi 1 đi ngược tìm Trực Sự
        const qtTsR = (this.kyDu + 3) % 9 || 9;
        const nguocQuyDao = [1, 9, 8, 7, 6, 5, 4, 3, 2];
        const trucSuCung = nguocQuyDao[qtTsR - 1]; // Trực Sự hiện tại
        
        // "Rút trực sự vào trung cung, 8 sao bay thuận"
        // Tức là sao Trực Sự sẽ nằm ở Trung Cung (Cung 5). Sao tiếp theo bay theo đường Lạc Thư (6, 7, 8, 9, 1, 2, 3, 4).
        const LAC_THU_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];
        const QT_NAMES = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
        
        // Xác định sao Trực Sự (Thái Nhất = 1, Nhiếp Đề = 2...) dựa theo trucSuCung (vì Trực sự chính là cung chứa sao 1? Hay sao 1 là trực sự?
        // Theo chuẩn: sao Thái Nhất luôn luôn ở vị trí Trực Sự ban đầu).
        // Khi bay, sao 1 vào trung cung. Sao 2 bay ra 6. Sao 3 bay ra 7...
        // Tức là toàn bộ mảng sao sẽ được rải dọc theo LAC_THU_PATH.
        for (let i = 0; i < 9; i++) {
            const starIndex = i; // 0=Thái Nhất, 1=Nhiếp Đề...
            const targetCung = LAC_THU_PATH[i];
            res.push({ 
                thanIdx: targetCung === 5 ? -1 : CUNG_TO_THAN_IDX[targetCung], 
                name: QT_NAMES[starIndex] + " (QT)", 
                class: "quy-than", 
                unique: 'QT_'+QT_NAMES[starIndex] 
            });
        }
        
        return res;
    }

    getAllStars() {
        const thaiAt = this.calcThaiAt();
        const vanXuong = this.calcVanXuong();
        const keThan = this.calcKeThan();
        const thuyKich = this.calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
        const tuongStars = this.calcDaiTuongAndThamTuong(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx);
        
        const all = [
            thaiAt, vanXuong, keThan, thuyKich,
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
        return new ThaiAtBaseEngine(t, t % 360, true, this.namCanIdx);
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
        return new RealNguyetKeEngine(t, t % 360, true, this.namCanIdx, this.tueTichThuongCo);
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
        return new RealNhatKeEngine(tich, tich % 360, true, this.namCanIdx, this.tichNhat, soNgay);
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
        return new RealThoiKeEngine(soGioCurrent, soGioCurrent % 360, this.isDuongDon, this.namCanIdx, soGioCurrent);
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
        const ld = new ThaiAtLuanDoan(factory.tueTich, namCanIdx, isDuongDon, mode, fullTue, lunarMonth);
        luanDoanData = ld.generateReport(toanChuVal, toanKhachVal, currRes.core.tkIdx, currRes.core.taIdx);
    }
    
    // Toán Định (Số đã bỏ chục và Nguyên số chưa bỏ chục)
    const toanDinhRawVal = toanChuRawVal + toanKhachRawVal;
    const toanDinhVal = (toanChuVal + toanKhachVal) % 10 || 10;
    
    // Kế Đại, Kế Tiểu, Kế Định
    const keDaiVal = factory.tichNhat || factory.tueTichThuongCo || factory.tueTich || 0;
    const keTieuVal = factory.kyDu !== undefined ? factory.kyDu : (factory.tueTich % 360);
    const keDinhVal = (toanDinhRawVal % 16) || 16;
    
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
        keDinh: keDinhVal,
        placement: currRes.placement,
        batHung: "Thế trận được xác lập.", // Simplified for now
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
