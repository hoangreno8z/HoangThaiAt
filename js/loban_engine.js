class LoBanEngine {
  constructor() {
    this.ruler522 = {
      name: "Thước 52.2 cm (Thông Thủy)",
      usage: "Đo khoảng lọt lòng thông thủy: Cửa chính, cửa phòng, cửa sổ, cổng ngõ, giếng trời.",
      cycleLengthMm: 522,
      majorPalaces: [
        { id: "QUY_NHAN", name: "Quý Nhân", isGood: true, color: "#EF4444", meaning: "Gia cảnh hưng vượng, quý nhân phù trợ, con cái thông minh hiếu thảo.", minorPalaces: ["Quyền Lộc", "Trung Tín", "Tác Quan", "Phát Đạt", "Xương Thạnh"] },
        { id: "HIEM_HOA", name: "Hiểm Họa", isGood: false, color: "#64748B", meaning: "Gia đạo bất an, dễ gặp tai ương bất ngờ, kiện tụng hao tán của cải.", minorPalaces: ["Tán Tài", "Quan Phi", "Tự Ải", "Thoát Đinh", "Ly Hương"] },
        { id: "THIEN_TAI_1", name: "Thiên Tai", isGood: false, color: "#64748B", meaning: "Ốm đau bệnh tật triền miên, tai nạn sông nước, hao tốn tiền thuốc men.", minorPalaces: ["Hoàn Bệnh", "Chiêu Thể", "Tửu Sắc", "Thiên Bệnh", "Thất Tài"] },
        { id: "THIEN_TAI_2", name: "Thiên Tài", isGood: true, color: "#EF4444", meaning: "Tài lộc bất ngờ, may mắn hanh thông, gia đạo an vui hạnh phúc.", minorPalaces: ["Thi Thơ", "Văn Học", "Tài Của", "Trang Điền", "Hưng Trạch"] },
        { id: "NHAN_LOC", name: "Nhân Lộc", isGood: true, color: "#EF4444", meaning: "Phúc lộc tràn đầy, con cháu thành danh đỗ đạt, gia đình ấm êm sum vầy.", minorPalaces: ["Tử Tôn", "Phú Quý", "Tiến Ích", "Hiền Thọ", "Đại Lộc"] },
        { id: "CO_DOC", name: "Cô Độc", isGood: false, color: "#64748B", meaning: "Hao tán tiền bạc, con cái ly tán đơn chiếc, làm ăn trắc trở cô quả.", minorPalaces: ["Ly Biệt", "Tiêu Hao", "Tuyệt Tự", "Đạo Kiếp", "Vong Thất"] },
        { id: "THIEN_TAC", name: "Thiên Tặc", isGood: false, color: "#64748B", meaning: "Trộm cướp dòm ngó, kiện tụng thị phi, hao hụt tiền bạc bất ngờ.", minorPalaces: ["Phòng Tặc", "Tù Ngục", "Tổn Tài", "Tranh Chấp", "Hỏa Tai"] },
        { id: "TE_TUONG", name: "Tể Tướng", isGood: true, color: "#EF4444", meaning: "Công danh hiển hách, quan vận hanh thông, con cháu hiển đạt vinh hiển.", minorPalaces: ["Đại Tài", "Thi Cử", "Thuận Khoa", "Hoành Tài", "Quý Tử"] }
      ]
    };
    this.ruler429 = {
      name: "Thước 42.9 cm (Khối Đặc)",
      usage: "Đo phủ bì khối đặc: Bàn làm việc, giường ngủ, tủ áo, bàn bếp, bậc thang, kệ tivi.",
      cycleLengthMm: 429,
      majorPalaces: [
        { id: "TAI", name: "Tài", isGood: true, color: "#EF4444", meaning: "Tiền tài dồi dào, phúc lộc tự đến, làm ăn buôn bán hanh thông phát đạt.", minorPalaces: ["Tài Đức", "Bảo Kho", "Lục Hợp", "Nghinh Phúc"] },
        { id: "BENH", name: "Bệnh", isGood: false, color: "#64748B", meaning: "Ốm đau bệnh tật, gặp chuyện thị phi phiền toái, kiện tụng rắc rối.", minorPalaces: ["Thoái Tài", "Công Sự", "Lao Ngục", "Cô Quả"] },
        { id: "LY", name: "Ly", isGood: false, color: "#64748B", meaning: "Gia đình ly tán, thất thoát của cải, hao tán nhân đinh xa xứ.", minorPalaces: ["Trường Khố", "Kiếp Tài", "Quan Quỷ", "Thất Thoát"] },
        { id: "NGHIA", name: "Nghĩa", isGood: true, color: "#EF4444", meaning: "Gia đình hòa thuận, nghĩa khí sáng trong, sinh quý tử, tiền tài tự tụ.", minorPalaces: ["Thiêm Đinh", "Ích Lợi", "Quý Tử", "Đại Cát"] },
        { id: "QUAN", name: "Quan", isGood: true, color: "#EF4444", meaning: "Thăng quan tiến chức, thi cử đỗ đạt, tài lộc dồi dào danh tiếng vang xa.", minorPalaces: ["Thuận Khoa", "Hoành Tài", "Tiến Ích", "Phú Quý"] },
        { id: "KIEP", name: "Kiếp", isGood: false, color: "#64748B", meaning: "Gặp tai họa trộm cướp, mất tiền của, làm ăn đổ bể thất bại.", minorPalaces: ["Tử Biệt", "Thoái Khẩu", "Ly Hương", "Tài Thất"] },
        { id: "HAI", name: "Hại", isGood: false, color: "#64748B", meaning: "Bị tiểu nhân hãm hại, tai nạn bất ngờ, tật bệnh liên miên.", minorPalaces: ["Tai Họa", "Tử Tôn", "Khẩu Thiệt", "Bệnh Lâm"] },
        { id: "BAN", name: "Bản", isGood: true, color: "#EF4444", meaning: "Gốc rễ vững bền, phúc lộc dồi dào, con cháu đông đúc gia đạo hưng thịnh.", minorPalaces: ["Tài Chí", "Đăng Khoa", "Tiến Bảo", "Hưng Vượng"] }
      ]
    };
    this.ruler388 = {
      name: "Thước 38.8 cm (Thờ Cúng)",
      usage: "Đo tâm linh & âm phần: Bàn thờ gia tiên, sập thờ, bài vị, bát hương, mộ phần.",
      cycleLengthMm: 388,
      majorPalaces: [
        { id: "DINH", name: "Đinh", isGood: true, color: "#EF4444", meaning: "Con cháu đông đúc hiếu thảo, thi cử đỗ đạt, gia đạo vinh hiển.", minorPalaces: ["Phúc Tinh", "Cập Đệ", "Tài Vượng", "Đăng Khoa"] },
        { id: "HAI_388", name: "Hại", isGood: false, color: "#64748B", meaning: "Gặp tai họa bất ngờ, ốm đau bệnh tật, tổn hại nhân đinh.", minorPalaces: ["Khẩu Thiệt", "Bệnh Lâm", "Tử Tuyệt", "Họa Chí"] },
        { id: "VUONG", name: "Vượng", isGood: true, color: "#EF4444", meaning: "Phúc lộc hưng thịnh, tài lộc tự đến, gia đình ấm êm hạnh phúc.", minorPalaces: ["Thiên Đức", "Hỷ Sự", "Tiến Bảo", "Nạp Phúc"] },
        { id: "KHO", name: "Khổ", isGood: false, color: "#64748B", meaning: "Cuộc sống gian nan cực nhọc, tranh chấp kiện tụng, thất thoát tiền bạc.", minorPalaces: ["Thất Thoát", "Quan Phi", "Kiếp Tài", "Vô Tự"] },
        { id: "NGHIA_388", name: "Nghĩa", isGood: true, color: "#EF4444", meaning: "Được trời đất gia ân, sinh quý tử, phước lộc dồi dào sống lâu.", minorPalaces: ["Đại Cát", "Tài Vượng", "Ích Lợi", "Thiên Đinh"] },
        { id: "QUAN_388", name: "Quan", isGood: true, color: "#EF4444", meaning: "Công danh rạng rỡ, quan lộc hanh thông, của cải sinh sôi nảy nở.", minorPalaces: ["Phú Quý", "Tiến Bảo", "Hoành Tài", "Thuận Khoa"] },
        { id: "TU", name: "Tử", isGood: false, color: "#64748B", meaning: "Tai họa tử biệt, tán gia bại sản, gia đạo bất hòa ly tán.", minorPalaces: ["Ly Hương", "Tử Biệt", "Thoái Đinh", "Thất Tài"] },
        { id: "HUNG", name: "Hưng", isGood: true, color: "#EF4444", meaning: "Hưng thịnh phát đạt, con cái thông minh đỗ đạt, gia đình vinh hiển.", minorPalaces: ["Đăng Khoa", "Quý Tử", "Thêm Đinh", "Hưng Vượng"] },
        { id: "THAT", name: "Thất", isGood: false, color: "#64748B", meaning: "Thất thoát của cải, làm ăn thua lỗ, gia đạo bất an sầu muộn.", minorPalaces: ["Cô Quả", "Lao Ngục", "Quan Quỷ", "Tuyệt Tự"] },
        { id: "TAI_388", name: "Tài", isGood: true, color: "#EF4444", meaning: "Tài lộc tấn tới, vàng bạc tích tụ, vạn sự hanh thông như ý.", minorPalaces: ["Nghinh Phúc", "Lục Hợp", "Tiến Bảo", "Tài Đức"] }
      ]
    };
    this.goldenDimensions = [
      {
        category: "Cửa Đi 1 Cánh (Thông Thủy 52.2cm)",
        items: [
          { width: "81 cm (Tài Đức / Tiến Bảo)", height: "212 cm (Quý Nhân / Tiến Ích)", note: "Kích thước chuẩn nhất cho cửa chính và phòng ngủ." },
          { width: "69 cm (Phú Quý)", height: "197 cm (Đăng Khoa)", note: "Cửa phòng nhỏ hoặc cửa ban công." },
          { width: "87 cm (Hỷ Sự)", height: "215 cm (Đại Cát)", note: "Cửa chính nhà phố lớn hoặc biệt thự." }
        ]
      },
      {
        category: "Bàn Thờ Gia Tiên (Thờ Cúng 38.8cm)",
        items: [
          { width: "107 cm (Thêm Đinh)", depth: "61 cm (Tài Lộc)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ chung cư hoặc nhà phố cỡ vừa." },
          { width: "127 cm (Tiến Bảo)", depth: "67 cm (Quý Tử)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ cỡ trung đại cát đại lợi." },
          { width: "153 cm (Lục Hợp)", depth: "69 cm (Phú Quý)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ lớn nhà thờ họ hoặc biệt thự." }
        ]
      },
      {
        category: "Giường Ngủ & Bàn Ghế (Khối Đặc 42.9cm)",
        items: [
          { width: "160 cm (Nghinh Phúc)", depth: "200 cm (Đại Cát)", height: "45 cm (Đăng Khoa)", note: "Giường ngủ đôi tiêu chuẩn." },
          { width: "180 cm (Tiến Bảo)", depth: "200 cm (Đại Cát)", height: "45 cm (Đăng Khoa)", note: "Giường ngủ lớn King Size." },
          { width: "120 cm (Đăng Khoa)", depth: "60 cm (Tiến Bảo)", height: "75 cm (Phú Quý)", note: "Bàn làm việc hoặc bàn học chuẩn công thái học." }
        ]
      }
    ];
  }
  calculate(dimensionMm, rulerType = "522") {
    const mm = Math.max(1, parseFloat(dimensionMm) || 1);
    let ruler = this.ruler522;
    if (rulerType === "429") ruler = this.ruler429;
    else if (rulerType === "388") ruler = this.ruler388;
    const cycleLength = ruler.cycleLengthMm;
    const positionInCycle = mm % cycleLength;
    const majorPalaceCount = ruler.majorPalaces.length;
    const majorPalaceLength = cycleLength / majorPalaceCount;
    const majorIndex = Math.floor(positionInCycle / majorPalaceLength);
    const majorPalace = ruler.majorPalaces[majorIndex] || ruler.majorPalaces[0];
    const positionInMajor = positionInCycle - (majorIndex * majorPalaceLength);
    const minorPalaceCount = majorPalace.minorPalaces.length;
    const minorPalaceLength = majorPalaceLength / minorPalaceCount;
    const minorIndex = Math.floor(positionInMajor / minorPalaceLength);
    const minorPalaceName = majorPalace.minorPalaces[minorIndex] || majorPalace.minorPalaces[0];
    let suggestedGoodDimensions = [];
    if (!majorPalace.isGood) {
      for (let offset = 5; offset <= 150; offset += 5) {
        const testPrev = mm - offset;
        const testNext = mm + offset;
        if (testPrev > 0) {
          const resPrev = this.calculate(testPrev, rulerType);
          if (resPrev.isGood && suggestedGoodDimensions.length < 1) {
            suggestedGoodDimensions.push({ mm: testPrev, cm: (testPrev / 10).toFixed(1), name: resPrev.majorName + " (" + resPrev.minorName + ")" });
          }
        }
        const resNext = this.calculate(testNext, rulerType);
        if (resNext.isGood && suggestedGoodDimensions.length < 2) {
          suggestedGoodDimensions.push({ mm: testNext, cm: (testNext / 10).toFixed(1), name: resNext.majorName + " (" + resNext.minorName + ")" });
        }
        if (suggestedGoodDimensions.length >= 2) break;
      }
    }
    return {
      dimensionMm: mm,
      dimensionCm: (mm / 10).toFixed(1),
      rulerName: ruler.name,
      rulerUsage: ruler.usage,
      majorName: majorPalace.name,
      minorName: minorPalaceName,
      isGood: majorPalace.isGood,
      meaning: majorPalace.meaning,
      color: majorPalace.isGood ? "#EF4444" : "#64748B",
      suggestedGoodDimensions: suggestedGoodDimensions
    };
  }
}
if (typeof window !== "undefined") { window.LoBanEngine = LoBanEngine; window.loBanEngine = new LoBanEngine(); }
if (typeof module !== "undefined") { module.exports = { LoBanEngine }; }