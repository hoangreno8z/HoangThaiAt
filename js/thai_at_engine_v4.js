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
    { idx: 0,  id: "than",   name: "Thân",  element: "Kim",  elementKey: "kim",  direction: "Tây Nam",   palaceNum: 7, isDwell: false },
    { idx: 1,  id: "dau",    name: "Dậu",   element: "Kim",  elementKey: "kim",  direction: "Chính Tây", palaceNum: 7, isDwell: false },
    { idx: 2,  id: "tuat",   name: "Tuất",  element: "Thổ",  elementKey: "tho",  direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 3,  id: "kien",   name: "Kiền",  element: "Kim",  elementKey: "kim",  direction: "Tây Bắc góc", palaceNum: 6, isDwell: true },
    { idx: 4,  id: "hoi",    name: "Hợi",   element: "Thủy", elementKey: "thuy", direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 5,  id: "ty",     name: "Tý",    element: "Thủy", elementKey: "thuy", direction: "Chính Bắc", palaceNum: 1, isDwell: false },
    { idx: 6,  id: "suu",    name: "Sửu",   element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 7,  id: "can",    name: "Cấn",   element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc góc", palaceNum: 8, isDwell: true },
    { idx: 8,  id: "dan",    name: "Dần",   element: "Mộc",  elementKey: "moc",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 9,  id: "mao",    name: "Mão",   element: "Mộc",  elementKey: "moc",  direction: "Chính Đông", palaceNum: 3, isDwell: false },
    { idx: 10, id: "thin",   name: "Thìn",  element: "Thổ",  elementKey: "tho",  direction: "Đông Nam",  palaceNum: 4, isDwell: false },
    { idx: 11, id: "ton",    name: "Tốn",   element: "Mộc",  elementKey: "moc",  direction: "Đông Nam góc", palaceNum: 4, isDwell: true },
    { idx: 12, id: "ty_chi", name: "Tị",    element: "Hỏa",  elementKey: "hoa",  direction: "Đông Nam",  palaceNum: 9, isDwell: false },
    { idx: 13, id: "ngo",    name: "Ngọ",   element: "Hỏa",  elementKey: "hoa",  direction: "Chính Nam", palaceNum: 9, isDwell: false },
    { idx: 14, id: "mui",    name: "Mùi",   element: "Thổ",  elementKey: "tho",  direction: "Tây Nam",   palaceNum: 2, isDwell: false },
    { idx: 15, id: "khon",   name: "Khôn",  element: "Thổ",  elementKey: "tho",  direction: "Tây Nam góc", palaceNum: 2, isDwell: true }
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
        
        // Tích Trung Cổ Giáp Dần (Dành riêng cho Tuế Kể - Tam Cơ & Đại Du)
        this.tichTrungCo = this.tueTich - 10141310;
    }
    
    // ------ NHÓM KỶ DƯ (MOD 360/24/18/12) ------
    calcThaiAt() {
        let R = this.kyDu % 24 || 24;
        const palaceIndex = Math.floor((R - 1) / 3);
        const yearInPalace = ((R - 1) % 3) + 1;
        const path = this.isDuongDon ? [3, 13, 7, 9, 11, 15, 1, 5] : [3, 5, 1, 15, 11, 9, 7, 13];
        const thanIdx = path[palaceIndex];
        return { thanIdx, name: `Thái Ất (Cung ${palaceIndex + 1}, Năm ${yearInPalace})`, class: "thai-at" };
    }
    
    calcVanXuong() {
        const MAP = [15, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        return { thanIdx: MAP[this.kyDu % 18], name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
    }
    
    calcKeThan() {
        const MAP = [9, 8, 6, 5, 4, 2, 1, 0, 14, 13, 12, 10];
        return { thanIdx: MAP[this.kyDu % 12], name: "Kế Thần", class: "ke-than" };
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
            if (startIdx === taIdx) return CUNG_TO_THAN_IDX.indexOf(startIdx) > 0 ? CUNG_TO_THAN_IDX.indexOf(startIdx) : 1;
            
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
            // Lấy số linh (bỏ chục)
            return toan % 10 || 10;
        };

        const chuToan = getToan(vxIdx);
        const khachToan = getToan(tkIdx);
        
        const chuTuongIdx = CUNG_TO_THAN_IDX[chuToan] || -1;
        const khachTuongIdx = CUNG_TO_THAN_IDX[khachToan] || -1;
        
        const thamChuToan = (chuToan * 3) % 10 || 10;
        const thamKhachToan = (khachToan * 3) % 10 || 10;
        
        return [
            { thanIdx: chuTuongIdx, name: `Đại Tướng Chủ (Toán ${chuToan})`, class: "chu-tuong" },
            { thanIdx: khachTuongIdx, name: `Đại Tướng Khách (Toán ${khachToan})`, class: "khach-tuong" },
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
        
        // Ngũ Phúc (Dùng Tuế Tích Thượng Cổ)
        const npStep = Math.floor(((this.tueTich + 115) % 225) / 45);
        const npIdx = [3, 7, 11, 15, -1][npStep % 5];
        
        // Đại Du (Dùng Tích Trung Cổ)
        const ddStep = Math.floor((this.tichTrungCo % 288) / 36);
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
        
        const xkR = ((this.tueTich + 1) % 40) % 4 || 4;
        const xkIdx = [4, 0, 12, 8][xkR - 1]; // Hợi, Thân, Tị, Dần
        
        const hkStep = Math.floor((((this.tueTich + 25) % 360) % 36) / 3);
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
        
        const du9 = (this.kyDu + 3) % 9;
        let ts = (1 - (du9 - 1) + 9) % 9; if (ts === 0) ts = 9;
        if (du9 === 0) ts = 2; 
        const QT_NAMES = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
        const QUY_DAO = [-1, 6, 7, 8, 9, 1, 2, 3, 4];
        let curr = ts;
        for (let i = 0; i < 9; i++) {
            const cung = QUY_DAO[i];
            res.push({ thanIdx: cung === -1 ? -1 : CUNG_TO_THAN_IDX[cung], name: QT_NAMES[curr - 1] + " (QT)", class: "quy-than", unique: 'QT_'+QT_NAMES[curr - 1] });
            curr = (curr % 9) + 1;
        }
        
        res.push({ thanIdx: CUNG_TO_THAN_IDX[[4, 8, 6, 2][this.kyDu % 4]], name: "Thiên Tôn", class: "other-stars" });
        res.push({ thanIdx: [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15][(this.kyDu % 20 || 20) - 1], name: "Thiên Hoàng", class: "other-stars" });
        res.push({ thanIdx: CHI_TO_THAN_IDX[(2 + (this.kyDu % 12 || 12) - 1) % 12], name: "Thiên Thời", class: "other-stars" });
        res.push({ thanIdx: [2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 13, 13, 14, 15, 0, 1, 1][(this.kyDu % 20 || 20) - 1], name: "Đế Phù", class: "other-stars" });
        res.push({ thanIdx: CUNG_TO_THAN_IDX[this.kyDu % 9 || 9], name: "Phi Điểu", class: "other-stars" });
        res.push({ thanIdx: CUNG_TO_THAN_IDX[[0, 1, 8, 3, 9, 7, 2, 4, 6, 5][this.kyDu % 9 || 9]], name: "Ngũ Hành", class: "other-stars" });
        res.push({ thanIdx: CUNG_TO_THAN_IDX[[0, 2, 3, 4, 5, 6, 7, 8, 9, 1][this.kyDu % 9 || 9]], name: "Bát Phong", class: "other-stars" });
        res.push({ thanIdx: CUNG_TO_THAN_IDX[[0, 3, 7, 2, 6, 1, 5, 9, 4, 8][((this.tueTich % 360) % 90) % 9 || 9]], name: "Tam Phong", class: "other-stars" });
        res.push({ thanIdx: CUNG_TO_THAN_IDX[[0, 1, 3, 5, 7, 9, 2, 4, 6, 8][((this.tueTich % 360) % 90) % 9 || 9]], name: "Ngũ Phong", class: "other-stars" });
        
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
        const tueTichPrev = THUONG_CO_EPOCH + year - 1;
        this.tueTich = ((tueTichPrev % 360) * 12) + (month + 2);
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new ThaiAtBaseEngine(t, t % 360, true, this.namCanIdx);
    }
    getMetadata() {
        return { name: "Nguyệt Kể (Lập Quẻ Tháng)", don: "Dương Độn", cucNum: this.getEngine(0).cucNum };
    }
}

class NhatKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        this.tueTich = getCanChiDay(year, month, day).jdInt || 0;
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new ThaiAtBaseEngine(t, t % 360, true, this.namCanIdx);
    }
    getMetadata() {
        return { name: "Nhật Kể (Lập Quẻ Ngày)", don: "Dương Độn", cucNum: this.getEngine(0).cucNum };
    }
}

class ThoiKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        this.tueTich = (getCanChiDay(year, month, day).jdInt || 0) * 12 + this.tuTru.hour.chiIdx;
        this.solarTerm = getExactSolarTerm(year, month, day, hour);
        this.isYang = (this.solarTerm.longitude >= 270 || this.solarTerm.longitude < 90);
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new ThaiAtBaseEngine(t, t % 360, this.isYang, this.namCanIdx);
    }
    getMetadata() {
        return { name: "Thời Kể (Lập Quẻ Giờ)", don: this.isYang ? "Dương Độn" : "Âm Độn", cucNum: this.getEngine(0).cucNum };
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
    
    // Export Toán numbers for UI
    let toanChuVal = "-";
    let toanKhachVal = "-";
    for (const key in currRes.placement) {
        if (!currRes.placement[key]) continue;
        const sC = currRes.placement[key].find(s => s.name.includes('Đại Tướng Chủ'));
        if (sC) {
            const m = sC.name.match(/Toán (\d+)/);
            if (m) toanChuVal = m[1];
        }
        const sK = currRes.placement[key].find(s => s.name.includes('Đại Tướng Khách'));
        if (sK) {
            const m = sK.name.match(/Toán (\d+)/);
            if (m) toanKhachVal = m[1];
        }
    }
    
    return {
        modeName: meta.name,
        tuTru,
        solarTerm: solarTerm.name,
        donCucName: `${meta.don} — Cục ${meta.cucNum}`,
        batMon: batMonStr,
        cuuTinh: cuuTinhStr,
        toanChu: toanChuVal,
        toanKhach: toanKhachVal,
        placement: currRes.placement,
        batHung: "Thế trận được xác lập.", // Simplified for now
        verdict: luanDoanNguHanh(vxEl, tkEl),
        movingStars: movingStars
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
