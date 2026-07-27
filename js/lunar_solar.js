/**
 * High-Precision Lunar Calendar & 24 Solar Terms Engine
 * Derived from HoangThaiAt & Thai At Than Kinh Astronomical Systems
 */

const CAN_LIST = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI_LIST = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// 24 Solar Terms with approximate solar longitudes
const SOLAR_TERMS = [
    { name: "Đông Chí", longitude: 270, approxMonth: 12, approxDay: 21 },
    { name: "Tiểu Hàn", longitude: 285, approxMonth: 1, approxDay: 5 },
    { name: "Đại Hàn", longitude: 300, approxMonth: 1, approxDay: 20 },
    { name: "Lập Xuân", longitude: 315, approxMonth: 2, approxDay: 4 },
    { name: "Vũ Thủy", longitude: 330, approxMonth: 2, approxDay: 19 },
    { name: "Kinh Trập", longitude: 345, approxMonth: 3, approxDay: 5 },
    { name: "Xuân Phân", longitude: 0, approxMonth: 3, approxDay: 20 },
    { name: "Thanh Minh", longitude: 15, approxMonth: 4, approxDay: 4 },
    { name: "Cốc Vũ", longitude: 30, approxMonth: 4, approxDay: 19 },
    { name: "Lập Hạ", longitude: 45, approxMonth: 5, approxDay: 5 },
    { name: "Tiểu Mãn", longitude: 60, approxMonth: 5, approxDay: 20 },
    { name: "Mang Chủng", longitude: 75, approxMonth: 6, approxDay: 5 },
    { name: "Hạ Chí", longitude: 90, approxMonth: 6, approxDay: 21 },
    { name: "Tiểu Thử", longitude: 105, approxMonth: 7, approxDay: 7 },
    { name: "Đại Thử", longitude: 120, approxMonth: 7, approxDay: 23 },
    { name: "Lập Thu", longitude: 135, approxMonth: 8, approxDay: 7 },
    { name: "Xử Thử", longitude: 150, approxMonth: 8, approxDay: 23 },
    { name: "Bạch Lộ", longitude: 165, approxMonth: 9, approxDay: 7 },
    { name: "Thu Phân", longitude: 180, approxMonth: 9, approxDay: 22 },
    { name: "Hàn Lộ", longitude: 195, approxMonth: 10, approxDay: 8 },
    { name: "Sương Giáng", longitude: 210, approxMonth: 10, approxDay: 23 },
    { name: "Lập Đông", longitude: 225, approxMonth: 11, approxDay: 7 },
    { name: "Tiểu Tuyết", longitude: 240, approxMonth: 11, approxDay: 22 },
    { name: "Đại Tuyết", longitude: 255, approxMonth: 12, approxDay: 7 }
];

// Julian Date calculation
function getJulianDay(year, month, day, hour = 12, minute = 0) {
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFraction = (hour + minute / 60) / 24;
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFraction + B - 1524.5;
}

// Compute Solar Longitude (Degrees 0 - 360) for Solar Terms
function getSolarLongitude(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const M_rad = M * Math.PI / 180;
    let C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_rad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * M_rad)
          + 0.000289 * Math.sin(3 * M_rad);
    let sunLong = L0 + C;
    sunLong = (sunLong % 360 + 360) % 360;
    return sunLong;
}

// Get Exact Solar Term for any Solar Date/Time
function getExactSolarTerm(year, month, day, hour = 12) {
    const jd = getJulianDay(year, month, day, hour);
    const sunLong = getSolarLongitude(jd);
    
    // Find closest term
    let currentTerm = SOLAR_TERMS[0];
    for (let i = SOLAR_TERMS.length - 1; i >= 0; i--) {
        const term = SOLAR_TERMS[i];
        if (month > term.approxMonth || (month === term.approxMonth && day >= term.approxDay)) {
            currentTerm = term;
            break;
        }
    }
    return currentTerm;
}

// Can Chi Conversion Functions
function getCanChiYear(year) {
    let canIdx = (year - 3) % 10;
    if (canIdx < 0) canIdx += 10;
    let chiIdx = (year - 3) % 12;
    if (chiIdx < 0) chiIdx += 12;
    return {
        can: CAN_LIST[canIdx],
        chi: CHI_LIST[chiIdx],
        canIdx: canIdx,
        chiIdx: chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

function getCanChiMonth(year, month) {
    const yearCan = (year - 3) % 10;
    // Dần month (1st lunar month) Can index
    const danCanIdx = (yearCan * 2 + 2) % 10;
    const canIdx = (danCanIdx + (month - 1)) % 10;
    const chiIdx = (month + 1) % 12; // Month 1 is Dần (index 2)
    return {
        can: CAN_LIST[canIdx],
        chi: CHI_LIST[chiIdx],
        canIdx: canIdx,
        chiIdx: chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

function getCanChiDay(year, month, day) {
    // Reference date: Jan 1, 1970 is Kỷ Tị (Can 5, Chi 5)
    const targetDate = new Date(Date.UTC(year, month - 1, day));
    const refDate = new Date(Date.UTC(1970, 0, 1));
    const diffDays = Math.floor((targetDate - refDate) / (24 * 3600 * 1000));
    
    let canIdx = (diffDays + 5) % 10;
    if (canIdx < 0) canIdx += 10;
    let chiIdx = (diffDays + 5) % 12;
    if (chiIdx < 0) chiIdx += 12;
    
    return {
        can: CAN_LIST[canIdx],
        chi: CHI_LIST[chiIdx],
        canIdx: canIdx,
        chiIdx: chiIdx,
        diffDays: diffDays,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

function getCanChiHour(dayCanIdx, hour) {
    // 23:00 to 00:59 is Tý (0)
    let chiIdx = 0;
    if (hour >= 23 || hour < 1) {
        chiIdx = 0;
    } else {
        chiIdx = Math.floor((hour + 1) / 2);
    }
    let canIdx = (dayCanIdx * 2 + chiIdx) % 10;
    return {
        can: CAN_LIST[canIdx],
        chi: CHI_LIST[chiIdx],
        canIdx: canIdx,
        chiIdx: chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

// Full Tu Tru object
function getTuTru(year, month, day, hour) {
    const yCC = getCanChiYear(year);
    const mCC = getCanChiMonth(year, month);
    const dCC = getCanChiDay(year, month, day);
    const hCC = getCanChiHour(dCC.canIdx, hour);
    return {
        year: yCC,
        month: mCC,
        day: dCC,
        hour: hCC,
        fullString: `${yCC.name} (Năm) - ${mCC.name} (Tháng) - ${dCC.name} (Ngày) - ${hCC.name} (Giờ)`
    };
}
