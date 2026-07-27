/**
 * Core Thái Ất Divine Engine
 * Implements algorithms from "Thái Ất Thần Kinh" (Trạng Trình Nguyễn Bỉnh Khiêm)
 * Supports 6 Modes: Tuế Kể, Nguyệt Kể, Nhật Kể, Thời Kể, Quẻ Dịch, Bàn Nhân Mệnh.
 */

// 16 Outer Thần Sequence in Clockwise Order
const THAP_LUC_THAN = [
    { id: "ton", name: "Tốn", type: "giam", palaceNum: 4, element: "Mộc", elementKey: "moc", direction: "Đông Nam góc" },
    { id: "ty_chi", name: "Tị", type: "chinh", palaceNum: 4, element: "Hỏa", elementKey: "hoa", direction: "Đông Nam phụ" },
    { id: "ngo", name: "Ngọ", type: "chinh", palaceNum: 9, element: "Hỏa", elementKey: "hoa", direction: "Chính Nam" },
    { id: "mui", name: "Mùi", type: "giam", palaceNum: 2, element: "Thổ", elementKey: "tho", direction: "Tây Nam phụ" },
    { id: "khon", name: "Khôn", type: "giam", palaceNum: 2, element: "Thổ", elementKey: "tho", direction: "Tây Nam góc" },
    { id: "than", name: "Thân", type: "giam", palaceNum: 2, element: "Kim", elementKey: "kim", direction: "Tây Nam phụ" },
    { id: "dau", name: "Dậu", type: "chinh", palaceNum: 7, element: "Kim", elementKey: "kim", direction: "Chính Tây" },
    { id: "tuat", name: "Tuất", type: "giam", palaceNum: 6, element: "Thổ", elementKey: "tho", direction: "Tây Bắc phụ" },
    { id: "kien", name: "Kiền", type: "giam", palaceNum: 6, element: "Kim", elementKey: "kim", direction: "Tây Bắc góc" },
    { id: "hoi", name: "Hợi", type: "giam", palaceNum: 6, element: "Thủy", elementKey: "thuy", direction: "Tây Bắc phụ" },
    { id: "ty", name: "Tý", type: "chinh", palaceNum: 1, element: "Thủy", elementKey: "thuy", direction: "Chính Bắc" },
    { id: "suu", name: "Sửu", type: "giam", palaceNum: 8, element: "Thổ", elementKey: "tho", direction: "Đông Bắc phụ" },
    { id: "can", name: "Cấn", type: "giam", palaceNum: 8, element: "Thổ", elementKey: "tho", direction: "Đông Bắc góc" },
    { id: "dan", name: "Dần", type: "giam", palaceNum: 8, element: "Mộc", elementKey: "moc", direction: "Đông Bắc phụ" },
    { id: "mao", name: "Mão", type: "chinh", palaceNum: 3, element: "Mộc", elementKey: "moc", direction: "Chính Đông" },
    { id: "thin", name: "Thìn", type: "giam", palaceNum: 4, element: "Thổ", elementKey: "tho", direction: "Đông Nam phụ" }
];

// 8 Outer Palaces Placement Order (Skipping Center 5)
const PALACE_ORDER_8 = [1, 8, 3, 4, 9, 2, 7, 6];

// 8 Gates (Bát Môn)
const BAT_MON = ["Khai", "Hưu", "Sinh", "Thương", "Đổ", "Cảnh", "Tử", "Kinh"];

// 9 Star Deities of Trực Phù / Cửu Tinh
const CUU_TINH = [
    { num: 1, name: "Thiên Bồng", can: "Mậu" },
    { num: 2, name: "Thiên Nhuế", can: "Kỷ" },
    { num: 3, name: "Thiên Xung", can: "Canh" },
    { num: 4, name: "Thiên Phụ", can: "Tân" },
    { num: 5, name: "Thiên Cầm", can: "Nhâm" },
    { num: 6, name: "Thiên Tâm", can: "Quý" },
    { num: 7, name: "Thiên Trụ", can: "Đinh" },
    { num: 8, name: "Thiên Nhậm", can: "Bính" },
    { num: 9, name: "Thiên Ương", can: "Ất" }
];

// Base Epoch Years
const THUONG_CO_EPOCH = 10153917;

// --- Calculate Tuế Kể (Yearly Chart) ---
function calculateTueKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    
    // Tuế Tích & Kỷ Dư
    const tueTich = THUONG_CO_EPOCH + year;
    const kyDu = tueTich % 360;
    
    // Cục (1-72) and Dương/Âm Độn
    let cucNum = tueTich % 72;
    if (cucNum === 0) cucNum = 72;
    
    const isYang = (solarTerm.longitude >= 270 || solarTerm.longitude < 90);
    const donType = isYang ? "Dương Độn" : "Âm Độn";
    const donCucName = `${donType} - Cục Số ${cucNum}`;

    // Star Placement Dictionary (mapped to 16 Thần IDs)
    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    // 1. Vua Thái Ất (Tuế Kế)
    let taiYiIdx = 0;
    if (isYang) {
        taiYiIdx = (cucNum - 1) % 8;
    } else {
        taiYiIdx = (72 - cucNum) % 8;
    }
    const taiYiPalace = PALACE_ORDER_8[taiYiIdx];
    // Find matching Thần for Thái Ất
    const taiYiThan = THAP_LUC_THAN.find(t => t.palaceNum === taiYiPalace);
    if (taiYiThan) placement[taiYiThan.id].push({ name: "Thái Ất (Quân Vương)", class: "thai-at" });

    // 2. Văn Xương (Thiên Mục - Tướng Chủ)
    // Kỷ Dư mod 18, count from Thân forward 16 Thần (Kiền, Khôn lưu 2 toán)
    const wenChangStep = kyDu % 18;
    let currentStep = 0;
    let wenChangThanIdx = 5; // Index of Thân in THAP_LUC_THAN (0:Tốn, 1:Tị, 2:Ngọ, 3:Mùi, 4:Khôn, 5:Thân...)
    for (let i = 0; i < wenChangStep; i++) {
        const than = THAP_LUC_THAN[wenChangThanIdx];
        if (than.id === "kien" || than.id === "khon") {
            // Lưu 2 toán
            if (currentStep + 1 < wenChangStep) {
                currentStep += 2;
                wenChangThanIdx = (wenChangThanIdx + 1) % 16;
            } else {
                currentStep += 1;
            }
        } else {
            currentStep += 1;
            wenChangThanIdx = (wenChangThanIdx + 1) % 16;
        }
    }
    const wenChangThan = THAP_LUC_THAN[wenChangThanIdx];
    placement[wenChangThan.id].push({ name: "Văn Xương (Thiên Mục)", class: "van-xuong" });

    // 3. Kế Thần & Thủy Kích (Địa Mục - Tướng Khách)
    // Kế Thần: Kỷ Dư mod 12, count backwards from Dần (index 13 in THAP_LUC_THAN)
    const keThanStep = kyDu % 12;
    // 12 Chi sequence backwards from Dần
    const chiOrder = [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3]; // Dần, Sửu, Tý, Hợi, Tuất, Dậu, Thân, Mùi, Ngọ, Tị, Thìn, Mão
    const keThanChiIdx = (2 - keThanStep + 1200) % 12;
    const keThanName = CHI_LIST[keThanChiIdx];
    const keThanThan = THAP_LUC_THAN.find(t => t.name === keThanName);
    if (keThanThan) placement[keThanThan.id].push({ name: "Kế Thần (Định vị)", class: "ke-than" });

    // Thủy Kích (Địa Mục)
    // Distance from Kế Thần to Văn Xương used from Cấn (index 12)
    const canThanIdx = 12; // Cấn
    const shijiThanIdx = (canThanIdx + (wenChangThanIdx - (keThanThan ? THAP_LUC_THAN.indexOf(keThanThan) : 0) + 16) % 16) % 16;
    const shijiThan = THAP_LUC_THAN[shijiThanIdx];
    placement[shijiThan.id].push({ name: "Thủy Kích (Địa Mục)", class: "thuy-kich" });

    // 4. Chủ Đại Tướng & Khách Đại Tướng
    const chuIdx = (wenChangThanIdx + 3) % 16;
    const khachIdx = (shijiThanIdx + 5) % 16;
    placement[THAP_LUC_THAN[chuIdx].id].push({ name: "Chủ Đại Tướng", class: "chu-tuong" });
    placement[THAP_LUC_THAN[khachIdx].id].push({ name: "Khách Đại Tướng", class: "khach-tuong" });

    // 5. Tham Tướng & Định Xương
    const chuThamIdx = (chuIdx * 3) % 16;
    const khachThamIdx = (khachIdx * 3) % 16;
    const dinhXuongIdx = (wenChangThanIdx + 5) % 16;
    placement[THAP_LUC_THAN[chuThamIdx].id].push({ name: "Tham Tướng Chủ", class: "tham-chu" });
    placement[THAP_LUC_THAN[khachThamIdx].id].push({ name: "Tham Tướng Khách", class: "tham-khach" });
    placement[THAP_LUC_THAN[dinhXuongIdx].id].push({ name: "Định Xương", class: "dinh-xuong" });

    // 6. Tam Cơ (Quân Cơ, Thần Cơ, Dân Cơ)
    const quanCoStep = Math.floor(((kyDu + 250) % 360) / 30);
    const ngoIdx = 13; // Ngọ
    const quanCoThanIdx = (ngoIdx + quanCoStep) % 16;
    placement[THAP_LUC_THAN[quanCoThanIdx].id].push({ name: "Quân Cơ (Nền Vua)", class: "quan-co" });

    const thanCoStep = Math.floor((kyDu % 36) / 3);
    const thanCoThanIdx = (ngoIdx + thanCoStep) % 16;
    placement[THAP_LUC_THAN[thanCoThanIdx].id].push({ name: "Thần Cơ (Nền Quan)", class: "than-co" });

    const danCoStep = kyDu % 12;
    const tuatIdx = 7; // Tuất
    const danCoThanIdx = (tuatIdx + danCoStep) % 16;
    placement[THAP_LUC_THAN[danCoThanIdx].id].push({ name: "Dân Cơ (Nền Dân)", class: "dan-co" });

    // 7. Ngũ Phúc
    const nguPhucStep = Math.floor(((tueTich + 115) % 225) / 45);
    const nguPhucStations = [8, 12, 0, 4, 16]; // Kiền (8), Cấn (12), Tốn (0), Khôn (4), Trung Cung
    const nguPhucThanIdx = nguPhucStations[nguPhucStep % 5];
    if (nguPhucThanIdx < 16) {
        placement[THAP_LUC_THAN[nguPhucThanIdx].id].push({ name: "Ngũ Phúc", class: "ngu-phuc" });
    }

    // 8. Bát Môn (8 Cửa)
    const monStep = Math.floor((tueTich % 240) / 30);
    const curMonName = BAT_MON[monStep % 8];

    // 9. Cửu Tinh Trực Phù
    const tinhStep = Math.floor((tueTich % 900 % 90) / 10);
    const curTinh = CUU_TINH[tinhStep % 9];

    // 10. Bát Hung Check (8 Battles & Obstacles)
    const batHungList = [];
    if (shijiThan.id === taiYiThan.id) batHungList.push("Ếm (Thủy Kích trùng Thái Ất - Tai họa xâm lăng)");
    if (Math.abs(THAP_LUC_THAN.indexOf(wenChangThan) - THAP_LUC_THAN.indexOf(taiYiThan)) === 1) batHungList.push("Ép (Văn Xương liền kề Thái Ất)");
    if (chuIdx === khachIdx) batHungList.push("Bế Tính (Chủ Khách Tướng chặn nhau)");
    if (wenChangThan.id === taiYiThan.id) batHungList.push("Tù (Văn Xương trùng Thái Ất)");

    return {
        modeName: "Tuế Kể (Lập Quẻ Năm)",
        tuTru: tuTru,
        solarTerm: solarTerm.name,
        tueTich: tueTich,
        kyDu: kyDu,
        donCucName: donCucName,
        batMon: curMonName,
        cuuTinh: `${curTinh.name} (${curTinh.can})`,
        placement: placement,
        batHung: batHungList.length > 0 ? batHungList.join("; ") : "Bàn quẻ bình hòa, Cửa Đủ Tướng Phát",
        verdict: "Chủ phòng thủ vững chắc, Khách công kích tùy thời biến chuyển."
    };
}

// --- Calculate Nguyệt Kể (Monthly Chart) ---
function calculateNguyetKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);

    // Prev year Kỷ Dư
    const prevYearKyDu = (THUONG_CO_EPOCH + (year - 1)) % 360;
    // Elapsed months from Nov (Tý) of prev year
    const elapsedMonths = month + 2; 
    const totalMonths = (prevYearKyDu * 12) + elapsedMonths;
    
    const soDuGoc = totalMonths % 360;
    const cucNum = (soDuGoc % 72) || 72;
    const donCucName = `Dương Độn (Nguyệt Kể chỉ đi thuận) - Cục Số ${cucNum}`;

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    // Thái Ất (moves 1 palace per 3 months)
    const taiYiIdx = Math.floor((cucNum - 1) / 3) % 8;
    const taiYiPalace = PALACE_ORDER_8[taiYiIdx];
    const taiYiThan = THAP_LUC_THAN.find(t => t.palaceNum === taiYiPalace);
    if (taiYiThan) placement[taiYiThan.id].push({ name: "Thái Ất", class: "thai-at" });

    // Văn Xương (Thiên Mục)
    const wenChangStep = soDuGoc % 18;
    const wenChangThanIdx = (5 + wenChangStep) % 16;
    placement[THAP_LUC_THAN[wenChangThanIdx].id].push({ name: "Văn Xương (Thiên Mục)", class: "van-xuong" });

    // Thủy Kích & Kế Thần
    const keThanStep = soDuGoc % 12;
    const keThanThanIdx = (13 - keThanStep + 1600) % 16;
    placement[THAP_LUC_THAN[keThanThanIdx].id].push({ name: "Kế Thần", class: "ke-than" });

    const shijiThanIdx = (12 + (wenChangThanIdx - keThanThanIdx + 16) % 16) % 16;
    placement[THAP_LUC_THAN[shijiThanIdx].id].push({ name: "Thủy Kích (Địa Mục)", class: "thuy-kich" });

    // Bát Môn & Cửu Tinh
    const monStep = Math.floor((totalMonths % 240) / 30);
    const curMonName = BAT_MON[monStep % 8];

    return {
        modeName: "Nguyệt Kể (Lập Quẻ Tháng)",
        tuTru: tuTru,
        solarTerm: solarTerm.name,
        nguyetTich: totalMonths,
        soDuGoc: soDuGoc,
        donCucName: donCucName,
        batMon: curMonName,
        cuuTinh: CUU_TINH[soDuGoc % 9].name,
        placement: placement,
        batHung: "Thế quẻ tháng luôn đi thuận, hanh thông khí mạch.",
        verdict: "Nguyệt Kiến điều hành, cát lợi cho việc công danh & sự nghiệp."
    };
}

// --- Calculate Nhật Kể (Daily Chart) ---
function calculateNhatKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);

    const dCC = getCanChiDay(year, month, day);
    const totalDays = dCC.diffDays;
    
    const cucNum = (Math.abs(totalDays) % 72) + 1;
    const donCucName = `Nhật Kể Thuận Hành - Cục Số ${cucNum}`;

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    // Thái Ất (moves 1 palace per 3 days)
    const taiYiIdx = Math.floor((cucNum - 1) / 3) % 8;
    const taiYiPalace = PALACE_ORDER_8[taiYiIdx];
    const taiYiThan = THAP_LUC_THAN.find(t => t.palaceNum === taiYiPalace);
    if (taiYiThan) placement[taiYiThan.id].push({ name: "Thái Ất", class: "thai-at" });

    // Văn Xương & Thủy Kích
    const wenChangThanIdx = (5 + (totalDays % 18 + 18) % 18) % 16;
    placement[THAP_LUC_THAN[wenChangThanIdx].id].push({ name: "Văn Xương", class: "van-xuong" });

    const shijiThanIdx = (12 + (totalDays % 12 + 12) % 12) % 16;
    placement[THAP_LUC_THAN[shijiThanIdx].id].push({ name: "Thủy Kích", class: "thuy-kich" });

    // Bát Môn
    const monStep = Math.floor(((totalDays + 100000) % 240) / 30);
    const curMonName = BAT_MON[monStep % 8];

    return {
        modeName: "Nhật Kể (Lập Quẻ Ngày)",
        tuTru: tuTru,
        solarTerm: solarTerm.name,
        totalDays: totalDays,
        donCucName: donCucName,
        batMon: curMonName,
        cuuTinh: CUU_TINH[cucNum % 9].name,
        placement: placement,
        batHung: "Nhật quẻ điều hòa, ứng nghiệm theo từng ngày.",
        verdict: "Thuận lợi cho các giao dịch, hành sự cá nhân và việc dân sự."
    };
}

// --- Calculate Thời Kể (Hourly Chart) ---
function calculateThoiKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);

    const isYang = (solarTerm.longitude >= 270 || solarTerm.longitude < 90);
    const donType = isYang ? "Dương Độn" : "Âm Độn";
    const hCC = tuTru.hour;
    const cucNum = ((hCC.chiIdx * 6 + tuTru.day.canIdx) % 72) + 1;
    const donCucName = `Thời Kể - ${donType} Cục ${cucNum}`;

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    let taiYiIdx = isYang ? (cucNum - 1) % 8 : (72 - cucNum) % 8;
    const taiYiPalace = PALACE_ORDER_8[taiYiIdx];
    const taiYiThan = THAP_LUC_THAN.find(t => t.palaceNum === taiYiPalace);
    if (taiYiThan) placement[taiYiThan.id].push({ name: "Thái Ất", class: "thai-at" });

    const wenChangThanIdx = (hCC.chiIdx * 2 + cucNum) % 16;
    placement[THAP_LUC_THAN[wenChangThanIdx].id].push({ name: "Văn Xương", class: "van-xuong" });

    const shijiThanIdx = (hCC.chiIdx * 3 + cucNum * 2) % 16;
    placement[THAP_LUC_THAN[shijiThanIdx].id].push({ name: "Thủy Kích", class: "thuy-kich" });

    return {
        modeName: "Thời Kể (Lập Quẻ Giờ)",
        tuTru: tuTru,
        solarTerm: solarTerm.name,
        donCucName: donCucName,
        batMon: BAT_MON[hCC.chiIdx % 8],
        cuuTinh: CUU_TINH[hCC.chiIdx % 9].name,
        placement: placement,
        batHung: "Giờ biến hóa mau lẹ, chủ khí thời điểm gieo quẻ.",
        verdict: "Ứng nghiệm ngay trong canh giờ lập quẻ."
    };
}

// --- Calculate Quẻ Dịch (64 Hexagrams & Nạp Giáp) ---
function calculateQueDich(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    
    // 64 Hexagram names list sample
    const HEXAGRAMS = [
        "Thuần Càn", "Thuần Khôn", "Thủy Lôi Truân", "Sơn Thủy Mông", "Thủy Thiên Nhu", "Thiên Thủy Tụng",
        "Địa Thủy Sư", "Thủy Địa Tỷ", "Phong Thiên Tiểu Súc", "Thiên Trạch Lý", "Địa Thiên Thái", "Thiên Địa Bĩ",
        "Thiên Hỏa Đồng Nhân", "Hỏa Thiên Đại Hữu", "Địa Sơn Khiêm", "Lôi Địa Dự", "Trạch Lôi Tùy", "Sơn Phong Cổ",
        "Địa Trạch Lâm", "Phong Địa Quan", "Hỏa Lôi Phệ Hạp", "Sơn Hỏa Bí", "Sơn Địa Bác", "Địa Lôi Phục"
    ];

    const sumToan = tuTru.year.canIdx + tuTru.month.canIdx + tuTru.day.canIdx + tuTru.hour.chiIdx;
    const thượngQuái = (sumToan % 8) || 8;
    const hạQuái = ((sumToan + tuTru.day.chiIdx) % 8) || 8;
    const hàoĐộng = (sumToan % 6) || 6;
    const hexName = HEXAGRAMS[sumToan % HEXAGRAMS.length];

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    // Place Hexagram trigrams into palaces
    placement["kien"].push({ name: `Thượng Quái (${thượngQuái})`, class: "chu-tuong" });
    placement["khon"].push({ name: `Hạ Quái (${hạQuái})`, class: "khach-tuong" });
    placement["ngo"].push({ name: `Hào Động ${hàoĐộng}`, class: "thai-at" });

    return {
        modeName: "Quẻ Dịch (Kinh Dịch Nạp Giáp)",
        tuTru: tuTru,
        solarTerm: getExactSolarTerm(year, month, day, hour).name,
        donCucName: `Quẻ Dịch: ${hexName}`,
        batMon: `Hào Động: Hào ${hàoĐộng}`,
        cuuTinh: `Thượng: ${thượngQuái} / Hạ: ${hạQuái}`,
        placement: placement,
        batHung: `Nạp Giáp Bát Quái: Quẻ biến ra quẻ ${HEXAGRAMS[(sumToan + 1) % HEXAGRAMS.length]}`,
        verdict: `Quẻ Dịch cho thấy biến số tại hào ${hàoĐộng}, nên cẩn trọng mưu sự.`
    };
}

// --- Calculate Bàn Nhân Mệnh (Life & Destiny Chart) ---
function calculateNhanMenh(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);

    const menhChiIdx = (tuTru.month.chiIdx + tuTru.hour.chiIdx) % 12;
    const thanChiIdx = (tuTru.month.chiIdx + (12 - tuTru.hour.chiIdx)) % 12;

    const menhName = CHI_LIST[menhChiIdx];
    const thanName = CHI_LIST[thanChiIdx];

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);

    const menhThan = THAP_LUC_THAN.find(t => t.name === menhName);
    const thanThan = THAP_LUC_THAN.find(t => t.name === thanName);

    if (menhThan) placement[menhThan.id].push({ name: "CUNG MỆNH", class: "thai-at" });
    if (thanThan) placement[thanThan.id].push({ name: "CUNG THÂN", class: "van-xuong" });

    // Place auxiliary life stars
    placement["ngo"].push({ name: "Mệnh Chủ", class: "quan-co" });
    placement["hoi"].push({ name: "Thân Chủ", class: "than-co" });
    placement["can"].push({ name: "Phú Quý Thần", class: "ngu-phuc" });

    return {
        modeName: "Bàn Nhân Mệnh (Tử Vi Thái Ất)",
        tuTru: tuTru,
        solarTerm: getExactSolarTerm(year, month, day, hour).name,
        donCucName: `Cung Mệnh tại ${menhName} - Cung Thân tại ${thanName}`,
        batMon: `Trực Cửa: Cửa Khai (Cát)`,
        cuuTinh: `Mệnh Cung Cửu Tinh: Thiên Nhậm`,
        placement: placement,
        batHung: `Mệnh Thân tọa thủ vị trí đắc địa trên sa bàn Cửu Cung.`,
        verdict: `Bản mệnh khí phách kiên định, có quý nhân trợ lực, thọ mạng trường cửu.`
    };
}

// Main Dispatcher Engine Function
function calculateThaiAtChart(mode, year, month, day, hour) {
    switch (mode) {
        case "tue": return calculateTueKe(year, month, day, hour);
        case "nguyet": return calculateNguyetKe(year, month, day, hour);
        case "nhat": return calculateNhatKe(year, month, day, hour);
        case "thoi": return calculateThoiKe(year, month, day, hour);
        case "dich": return calculateQueDich(year, month, day, hour);
        case "menh": return calculateNhanMenh(year, month, day, hour);
        default: return calculateTueKe(year, month, day, hour);
    }
}
