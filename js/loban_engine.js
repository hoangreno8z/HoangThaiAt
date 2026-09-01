// =============================================================================
// THƯỚC LỖ BAN TAM GIỚI CHÁNH TÔNG (LỖ BAN TIÊN SƯ BÍ THƯ)
// CHU KỲ TOÁN HỌC 3 TẦNG THƯỚC CỔ ĐIỂN & KHẢO CHỨNG HỌC THUẬT NGUYÊN NHÂN CÁT HUNG
// =============================================================================

class LoBanEngine {
  constructor() {
    // 1. Thước 52.2 cm (Thông Thủy - Đo Cửa): 8 Cung Lớn, mỗi Cung 5 Cung Nhỏ = 40 Cung
    this.ruler522 = {
      name: "Thước 52.2 cm (Thông Thủy)",
      usage: "Đo khoảng lọt lòng không tính khung bao: Cửa chính, cửa phòng, cửa sổ, cổng, giếng trời.",
      cycleLengthMm: 522,
      classicalSource: "《Lỗ Ban Tiên Sư Bí Thư: Quyển II》 & 《Dương Trạch Thập Thư: Trạch Pháp Xích Thước》",
      majorPalaces: [
        {
          id: "QUY_NHAN", name: "Quý Nhân", isGood: true, color: "#EF4444",
          meaning: "Gia cảnh hưng vượng, quý nhân phù trợ, con cái thông minh hiếu thảo, tài lộc tự sinh.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Quý Nhân thuộc Mộc đới Cát Tinh, đón nhận dương quang sinh khí tràn ngập qua cửa. Không khí lưu thông êm thuận, kích hoạt cung quan lộc, giúp gia chủ ra ngoài gặp bạn tốt, cấp trên nâng đỡ, con cháu thông tuệ khoa cử đỗ đạt.",
          minorPalaces: ["Quyền Lộc", "Trung Tín", "Tác Quan", "Phát Đạt", "Xương Thạnh"]
        },
        {
          id: "HIEM_HOA", name: "Hiểm Họa", isGood: false, color: "#64748B",
          meaning: "Gia đạo bất an, dễ gặp tai ương bất ngờ, kiện tụng thị phi, hao tán tiền của.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Hiểm Họa thuộc Âm Hỏa đới sát, trường khí đi qua cửa bị tán loạn sinh xoáy khí ngầm. Cổ thư ghi: 'Môn phạm Hiểm Họa, gia trạch bất an, dịch bệnh hoành hành, tài vật tiêu tán', khiến tâm lý gia chủ luôn bồn chồn lo lắng, dễ bị tiểu nhân hãm hại.",
          minorPalaces: ["Tán Tài", "Quan Phi", "Tự Ải", "Thoát Đinh", "Ly Hương"]
        },
        {
          id: "THIEN_TAI_1", name: "Thiên Tai", isGood: false, color: "#64748B",
          meaning: "Ốm đau triền miên, tai nạn sông nước, hao tốn tiền thuốc men, gia đình lục đục.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Thiên Tai thuộc Thổ đới Trọc Khí, làm nghẽn dòng năng lượng sinh hoạt. Người sống trong nhà lâu ngày dễ suy giảm hệ miễn dịch, đau ốm dai dẳng khó chữa, làm ăn thất thoát vì chi phí y tế phát sinh liên tục.",
          minorPalaces: ["Hoàn Bệnh", "Chiêu Thể", "Tửu Sắc", "Thiên Bệnh", "Thất Tài"]
        },
        {
          id: "THIEN_TAI_2", name: "Thiên Tài", isGood: true, color: "#EF4444",
          meaning: "Tài lộc bất ngờ, may mắn hanh thông, công việc buôn bán thuận lợi, gia đạo an vui.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Thiên Tài thuộc Thủy đới Phúc Tinh, thủy tụ minh đường sinh tài vô tận. Cửa mở đúng cung này hút dòng tài khí ngoại lai dồi dào, kinh doanh có nhiều cơ hội trúng lớn, tiền tài đổ về bất ngờ ngoài dự kiến.",
          minorPalaces: ["Thi Thơ", "Văn Học", "Tài Của", "Trang Điền", "Hưng Trạch"]
        },
        {
          id: "NHAN_LOC", name: "Nhân Lộc", isGood: true, color: "#EF4444",
          meaning: "Phúc lộc tràn đầy, con cháu thành danh đỗ đạt, gia đình ấm êm sum vầy viên mãn.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Nhân Lộc thuộc Kim đới Lộc Tinh, đại diện cho phước báu lâu dài và sự kính trọng xã hội. Khí nạp qua cửa thuần hậu, nuôi dưỡng hòa khí nội trạch, vợ chồng đồng lòng, con cái hiếu thuận giữ gìn gia phong truyền thống.",
          minorPalaces: ["Tử Tôn", "Phú Quý", "Tiến Ích", "Hiền Thọ", "Đại Lộc"]
        },
        {
          id: "CO_DOC", name: "Cô Độc", isGood: false, color: "#64748B",
          meaning: "Hao tán tiền bạc, con cái ly tán đơn chiếc, tình duyên lận đận trắc trở cô quả.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Cô Độc mang tính chất cô khắc, cắt đứt các mối giao thoa tương tác xã hội. Người trong nhà tính tình trở nên khép kín, cô lập, vợ chồng khắc khẩu, con cháu trưởng thành đi xa không muốn quy tụ về tổ ấm.",
          minorPalaces: ["Ly Biệt", "Tiêu Hao", "Tuyệt Tự", "Đạo Kiếp", "Vong Thất"]
        },
        {
          id: "THIEN_TAC", name: "Thiên Tặc", isGood: false, color: "#64748B",
          meaning: "Trộm cướp dòm ngó, kiện tụng thị phi, hao hụt tiền bạc bất ngờ, tù ngục hỏa hoạn.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Thiên Tặc thuộc Hỏa Kim giao tranh, chủ về thất thoát của cải và khẩu thiệt tai bay vạ gió. Khí trường bất ổn định khiến tài sản trong nhà dễ bị kẻ gian nhòm ngó, làm ăn hay bị đối tác quỵt nợ hoặc dính líu pháp lý.",
          minorPalaces: ["Phòng Tặc", "Tù Ngục", "Tổn Tài", "Tranh Chấp", "Hỏa Tai"]
        },
        {
          id: "TE_TUONG", name: "Tể Tướng", isGood: true, color: "#EF4444",
          meaning: "Công danh hiển hách, quan vận hanh thông, con cháu đỗ đạt làm rạng danh dòng tộc.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Tể Tướng là đỉnh cao của quyền lực và trí tuệ trong cổ thư Lỗ Ban. Khí quang minh đĩnh đạc đi vào nhà giúp gia chủ có tầm nhìn sáng suốt, quyết đoán trong đại sự, thăng tiến vượt bậc trên con đường quan lộ sự nghiệp.",
          minorPalaces: ["Đại Tài", "Thi Cử", "Thuận Khoa", "Hoành Tài", "Quý Tử"]
        }
      ]
    };

    // 2. Thước 42.9 cm (Khối Đặc - Giường, Tủ, Bàn): 8 Cung Lớn, mỗi Cung 4 Cung Nhỏ = 32 Cung
    this.ruler429 = {
      name: "Thước 42.9 cm (Khối Đặc)",
      usage: "Đo phủ bì toàn bộ khối gỗ: Giường ngủ, tủ áo, bàn làm việc, bàn bếp, bậc thang, kệ tivi.",
      classicalSource: "《Dương Trạch Thập Thư: Luận Bàn Tủ Xích Thước》 & 《Doanh Tạo Pháp Thức》",
      majorPalaces: [
        {
          id: "TAI", name: "Tài", isGood: true, color: "#EF4444",
          meaning: "Tiền tài dồi dào, phúc lộc tự đến, làm ăn buôn bán hanh thông phát đạt thịnh vượng.",
          whyGoodOrBad: "VÌ SAO TỐT: Kích thước khối đồ rơi vào cung Tài tạo điểm tựa trường khí tích tụ vững chắc. Đặt giường ngủ hoặc bàn làm việc tại đây giúp tích trữ năng lượng cơ thể khi ngủ, đầu óc minh mẫn khi làm việc, tiền tài hội tụ.",
          minorPalaces: ["Tài Đức", "Bảo Kho", "Lục Hợp", "Nghinh Phúc"]
        },
        {
          id: "BENH", name: "Bệnh", isGood: false, color: "#64748B",
          meaning: "Ốm đau bệnh tật, gặp chuyện thị phi phiền toái, kiện tụng rắc rối, mệt mỏi thân tâm.",
          whyGoodOrBad: "VÌ SAO XẤU: Khối kích thước tạo bước sóng cộng hưởng xấu với từ trường cơ thể. Kê giường ngủ ở cung này dễ bị mất ngủ, đau đầu, mộng mị; đóng bàn làm việc dễ sinh áp lực nặng nề và đau nhức vai gáy.",
          minorPalaces: ["Thoái Tài", "Công Sự", "Lao Ngục", "Cô Quả"]
        },
        {
          id: "LY", name: "Ly", isGood: false, color: "#64748B",
          meaning: "Gia đình ly tán, thất thoát của cải, hao tán nhân đinh, xa xứ tha hương.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Ly mang năng lượng phân rã ngũ hành. Đóng tủ tiền hoặc giường ngủ ở kích thước này khiến tiền bạc ra nhiều hơn vào, các mối quan hệ tình cảm vợ chồng dễ nảy sinh rạn nứt ly cách.",
          minorPalaces: ["Trường Khố", "Kiếp Tài", "Quan Quỷ", "Thất Thoát"]
        },
        {
          id: "NGHIA", name: "Nghĩa", isGood: true, color: "#EF4444",
          meaning: "Gia đình hòa thuận, nghĩa khí sáng trong, sinh quý tử, tiền tài tự tụ phước ấm.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Nghĩa chủ về đạo đức nhân luân và sự tương trợ. Giường ngủ hoặc bàn học ở cung này giúp con cái ngoan ngoãn, gia đình có gia phong kỷ cương, đi đâu cũng được bạn bè đồng nghiệp quý mến tương trợ.",
          minorPalaces: ["Thiêm Đinh", "Ích Lợi", "Quý Tử", "Đại Cát"]
        },
        {
          id: "QUAN", name: "Quan", isGood: true, color: "#EF4444",
          meaning: "Thăng quan tiến chức, thi cử đỗ đạt, tài lộc dồi dào danh tiếng vang xa bốn phương.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Quan kích hoạt nguồn năng lượng quyền lực và trí tuệ. Bàn làm việc của lãnh đạo hoặc bàn học của sĩ tử đóng đúng cung này mang lại sự tập trung cao độ, thi cử xuất sắc, công danh thăng tiến mau lẹ.",
          minorPalaces: ["Thuận Khoa", "Hoành Tài", "Tiến Ích", "Phú Quý"]
        },
        {
          id: "KIEP", name: "Kiếp", isGood: false, color: "#64748B",
          meaning: "Gặp tai họa trộm cướp, mất tiền của, làm ăn đổ bể thất bại, bị lừa gạt.",
          whyGoodOrBad: "VÌ SAO XẤU: Năng lượng xung phá gây hao hụt bất ngờ. Kê giường tủ ở kích thước này dễ gặp cảnh làm lụng vất vả nhưng tiền tài tích lũy bị thất thoát do các sự cố bất khả kháng hoặc bị kẻ xấu lợi dụng.",
          minorPalaces: ["Tử Biệt", "Thoái Khẩu", "Ly Hương", "Tài Thất"]
        },
        {
          id: "HAI", name: "Hại", isGood: false, color: "#64748B",
          meaning: "Bị tiểu nhân hãm hại, tai nạn bất ngờ, tật bệnh liên miên, mưu sự bất thành.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Hại làm suy yếu dương khí bản thân, dễ dẫn dụ ám khí xung quanh. Gia chủ hay gặp sự cản trở trong công việc, làm việc gì cũng nửa đường đứt gánh hoặc bị đồng nghiệp ganh ghét chơi xấu.",
          minorPalaces: ["Tai Họa", "Tử Tôn", "Khẩu Thiệt", "Bệnh Lâm"]
        },
        {
          id: "BAN", name: "Bản", isGood: true, color: "#EF4444",
          meaning: "Gốc rễ vững bền, phúc lộc dồi dào, con cháu đông đúc gia đạo hưng thịnh vạn niên.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Bản là cái gốc của mọi sự trường tồn phồn vinh. Kích thước đồ đạc mang cung Bản giúp tạo dựng nền móng kinh tế vững chãi, gia tộc có truyền thống hiếu học, sự nghiệp bền vững qua nhiều thế hệ.",
          minorPalaces: ["Tài Chí", "Đăng Khoa", "Tiến Bảo", "Hưng Vượng"]
        }
      ]
    };

    // 3. Thước 38.8 cm (Âm Phần & Thờ Cúng): 10 Cung Lớn, mỗi Cung 4 Cung Nhỏ = 40 Cung
    this.ruler388 = {
      name: "Thước 38.8 cm (Thờ Cúng)",
      usage: "Đo tâm linh và âm phần: Bàn thờ gia tiên, sập thờ, bài vị, bát hương, mộ phần, tiểu quách.",
      classicalSource: "《Lỗ Ban Tiên Sư Bí Thư: Âm Phần Thiên》 & 《Dương Trạch Thập Thư: Bàn Thờ Tế Tự》",
      majorPalaces: [
        {
          id: "DINH", name: "Đinh", isGood: true, color: "#EF4444",
          meaning: "Con cháu đông đúc hiếu thảo, thi cử đỗ đạt, gia đạo vinh hiển rạng danh tổ tiên.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Đinh chủ về nhân đinh, con cháu nối dõi tông đường. Bàn thờ đóng đúng cung Đinh giúp gia đình được tổ tiên phù hộ, cầu con cái dễ dàng, con cháu khỏe mạnh, thông minh, hiếu thuận với ông bà cha mẹ.",
          minorPalaces: ["Phúc Tinh", "Cập Đệ", "Tài Vượng", "Đăng Khoa"]
        },
        {
          id: "HAI_388", name: "Hại", isGood: false, color: "#64748B",
          meaning: "Gặp tai họa bất ngờ, ốm đau bệnh tật, tổn hại nhân đinh, gia đạo lục đục.",
          whyGoodOrBad: "VÌ SAO XẤU: Năng lượng âm khí bị nhiễu loạn làm mất đi sự trang nghiêm thanh tịnh. Gia đạo dễ nảy sinh bất hòa giữa các thế hệ, người trong nhà hay bị ốm đau lặt vặt không rõ nguyên nhân.",
          minorPalaces: ["Khẩu Thiệt", "Bệnh Lâm", "Tử Tuyệt", "Họa Chí"]
        },
        {
          id: "VUONG", name: "Vượng", isGood: true, color: "#EF4444",
          meaning: "Phúc lộc hưng thịnh, tài lộc tự đến, gia đình ấm êm hạnh phúc thịnh vượng.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Vượng hội tụ sinh khí cát tường từ hư không. Bàn thờ kích thước cung Vượng giúp tài vận gia đình luôn sung túc, công việc làm ăn phát triển ổn định và được quý nhân âm trợ trong mọi hoàn cảnh.",
          minorPalaces: ["Thiên Đức", "Hỷ Sự", "Tiến Bảo", "Nạp Phúc"]
        },
        {
          id: "KHO", name: "Khổ", isGood: false, color: "#64748B",
          meaning: "Cuộc sống gian nan cực nhọc, tranh chấp kiện tụng, thất thoát tiền bạc cay đắng.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Khổ mang trường khí u uất, làm nặng nề không gian tâm linh. Gia chủ phải lao tâm khổ tứ, làm ăn vất vả nhưng thành quả không được như ý, hay vướng vào chuyện phiền muộn lo âu kéo dài.",
          minorPalaces: ["Thất Thoát", "Quan Phi", "Kiếp Tài", "Vô Tự"]
        },
        {
          id: "NGHIA_388", name: "Nghĩa", isGood: true, color: "#EF4444",
          meaning: "Được trời đất gia ân, sinh quý tử, phước lộc dồi dào sống lâu trăm tuổi.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Nghĩa kết nối lòng thành kính hiếu thảo của con cháu với tổ tiên. Khí trường tại ban thờ trang nghiêm, đem lại sự bình an trong tâm hồn, giải trừ các ách nạn và nâng cao tuổi thọ các thành viên.",
          minorPalaces: ["Đại Cát", "Tài Vượng", "Ích Lợi", "Thiên Đinh"]
        },
        {
          id: "QUAN_388", name: "Quan", isGood: true, color: "#EF4444",
          meaning: "Công danh rạng rỡ, quan lộc hanh thông, của cải sinh sôi nảy nở đời đời.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Quan kích thích vận khí quyền uy và học vấn. Con cháu trong nhà học hành sáng dạ, đi thi đỗ đạt thứ hạng cao, gia chủ được thăng quan tiến chức, công việc kinh doanh phát triển vững vàng.",
          minorPalaces: ["Phú Quý", "Tiến Bảo", "Hoành Tài", "Thuận Khoa"]
        },
        {
          id: "TU", name: "Tử", isGood: false, color: "#64748B",
          meaning: "Tai họa tử biệt, tán gia bại sản, gia đạo bất hòa ly tán, hao tổn lớn.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Tử là đại hung cung trong thước âm phần, mang uế khí tử tuyệt. Cổ thư cấm kỵ tuyệt đối đóng bàn thờ ở kích thước này vì dễ khiến gia đạo suy thoái, gia đình dễ gặp cảnh biệt ly tổn hại.",
          minorPalaces: ["Ly Hương", "Tử Biệt", "Thoái Đinh", "Thất Tài"]
        },
        {
          id: "HUNG", name: "Hưng", isGood: true, color: "#EF4444",
          meaning: "Hưng thịnh phát đạt, con cái thông minh đỗ đạt, gia đình vinh hiển thịnh vượng.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Hưng chủ về sự phục hưng và phồn vinh vượt bậc. Bàn thờ cung Hưng giúp gia đình có những bước nhảy vọt về tài chính và địa vị xã hội, gia phong hưng thịnh qua nhiều thế hệ nối tiếp.",
          minorPalaces: ["Đăng Khoa", "Quý Tử", "Thêm Đinh", "Hưng Vượng"]
        },
        {
          id: "THAT", name: "Thất", isGood: false, color: "#64748B",
          meaning: "Thất thoát của cải, làm ăn thua lỗ, gia đạo bất an sầu muộn bế tắc.",
          whyGoodOrBad: "VÌ SAO XẤU: Cung Thất làm suy kiệt dòng tài khí tổ ấm. Tiền bạc tích cóp bao nhiêu cũng dễ bị tiêu hao vào những việc ngoài ý muốn, làm ăn hay bị đình trệ, khó tích lũy tài sản lớn.",
          minorPalaces: ["Cô Quả", "Lao Ngục", "Quan Quỷ", "Tuyệt Tự"]
        },
        {
          id: "TAI_388", name: "Tài", isGood: true, color: "#EF4444",
          meaning: "Tài lộc tấn tới, vàng bạc tích tụ, vạn sự hanh thông như ý cát tường.",
          whyGoodOrBad: "VÌ SAO TỐT: Cung Tài hội tụ phú quý đại cát. Bàn thờ kích thước cung Tài thu hút vượng khí tài lộc tứ phương, mang lại cuộc sống ấm no đầy đủ, buôn may bán đắt, gia đình giàu sang phú quý.",
          minorPalaces: ["Nghinh Phúc", "Lục Hợp", "Tiến Bảo", "Tài Đức"]
        }
      ]
    };

    // Bảng Kích Thước Vàng Chuẩn Cổ Thư
    this.goldenDimensions = [
      {
        category: "Cửa Đi 1 Cánh (Thông Thủy 52.2cm)",
        items: [
          { width: "81 cm (Cung Tài Đức / Tiến Bảo)", height: "212 cm (Cung Quý Nhân / Tiến Ích)", note: "Kích thước song cát chuẩn mực số 1 cho cửa chính và phòng ngủ." },
          { width: "69 cm (Cung Phú Quý)", height: "197 cm (Cung Đăng Khoa)", note: "Cửa phòng nhỏ, cửa vệ sinh hoặc cửa thông phòng phụ." },
          { width: "87 cm (Cung Hỷ Sự / Thiên Tài)", height: "215 cm (Cung Đại Cát)", note: "Cửa chính biệt thự, nhà phố mặt tiền lớn đón đại cát." }
        ]
      },
      {
        category: "Bàn Thờ Gia Tiên (Thờ Cúng 38.8cm)",
        items: [
          { width: "107 cm (Thêm Đinh)", depth: "61 cm (Tài Lộc)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ chung cư hoặc nhà phố tam cát vượng tài." },
          { width: "127 cm (Tiến Bảo)", depth: "67 cm (Quý Tử)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ cỡ trung đại cát đại lợi, con cháu hiển đạt." },
          { width: "153 cm (Lục Hợp)", depth: "69 cm (Phú Quý)", height: "127 cm (Tiến Bảo)", note: "Bàn thờ lớn nhà thờ họ hoặc biệt thự cao cấp." }
        ]
      },
      {
        category: "Giường Ngủ & Bàn Ghế (Khối Đặc 42.9cm)",
        items: [
          { width: "160 cm (Nghinh Phúc)", depth: "200 cm (Đại Cát)", height: "45 cm (Đăng Khoa)", note: "Giường ngủ đôi tiêu chuẩn song cát hưng vượng." },
          { width: "180 cm (Tiến Bảo)", depth: "200 cm (Đại Cát)", height: "45 cm (Đăng Khoa)", note: "Giường ngủ lớn King Size vượng tài phúc lộc." },
          { width: "120 cm (Đăng Khoa)", depth: "60 cm (Tiến Bảo)", height: "75 cm (Phú Quý)", note: "Bàn làm việc hoặc bàn học chuẩn công thái học cổ thư." }
        ]
      }
    ];
  }

  // Phân tích 1 kích thước bất kỳ (tính theo mm)
  // _skipSuggestions: cờ nội bộ chặn đệ quy vô hạn khi tìm gợi ý
  calculate(dimensionMm, rulerType = '522', _skipSuggestions = false) {
    const mm = Math.max(1, parseFloat(dimensionMm) || 1);
    let ruler = this.ruler522;
    if (rulerType === '429') ruler = this.ruler429;
    else if (rulerType === '388') ruler = this.ruler388;

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
    if (!majorPalace.isGood && !_skipSuggestions) {
      for (let offset = 5; offset <= 150; offset += 5) {
        const testPrev = mm - offset;
        const testNext = mm + offset;
        if (testPrev > 0) {
          const resPrev = this.calculate(testPrev, rulerType, true);
          if (resPrev.isGood && suggestedGoodDimensions.length < 1) {
            suggestedGoodDimensions.push({ mm: testPrev, cm: (testPrev / 10).toFixed(1), name: resPrev.majorName + ' (' + resPrev.minorName + ')' });
          }
        }
        const resNext = this.calculate(testNext, rulerType, true);
        if (resNext.isGood && suggestedGoodDimensions.length < 2) {
          suggestedGoodDimensions.push({ mm: testNext, cm: (testNext / 10).toFixed(1), name: resNext.majorName + ' (' + resNext.minorName + ')' });
        }
        if (suggestedGoodDimensions.length >= 2) break;
      }
    }

    return {
      dimensionMm: mm,
      dimensionCm: (mm / 10).toFixed(1),
      rulerName: ruler.name,
      rulerUsage: ruler.usage,
      classicalSource: ruler.classicalSource,
      majorName: majorPalace.name,
      minorName: minorPalaceName,
      isGood: majorPalace.isGood,
      meaning: majorPalace.meaning,
      whyGoodOrBad: majorPalace.whyGoodOrBad,
      color: majorPalace.isGood ? '#EF4444' : '#64748B',
      suggestedGoodDimensions: suggestedGoodDimensions
    };
  }

  // Phân tích Bộ Kích Thước Hoàn Chỉnh (Cửa: Rộng + Cao; Bàn thờ: Rộng + Sâu + Cao; Giường: Rộng + Dài)
  calculateSet(dimensionsArray, rulerType = '522') {
    const results = dimensionsArray.map(item => {
      const calc = this.calculate(item.cm * 10, rulerType);
      return {
        label: item.label,
        cm: item.cm,
        calc: calc
      };
    });

    const isAllGood = results.every(r => r.calc.isGood);

    return {
      rulerType: rulerType,
      isAllGood: isAllGood,
      verdictTitle: isAllGood ? 'ĐẠI CÁT ĐẠI LỢI (TẤT CẢ KÍCH THƯỚC ĐỀU RƠI VÀO CUNG ĐỎ)' : 'CẢNH BÁO: CÓ KÍCH THƯỚC PHẠM CUNG ĐEN HUNG SÁT',
      results: results
    };
  }
}

if (typeof window !== 'undefined') {
  window.LoBanEngine = LoBanEngine;
  window.loBanEngine = new LoBanEngine();
}

if (typeof module !== 'undefined') {
  module.exports = { LoBanEngine };
}
