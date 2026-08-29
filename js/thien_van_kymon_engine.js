// =============================================================================
// THIÊN VĂN THÁI DƯƠNG ĐÁO HƯỚNG & KỲ MÔN TRẠCH THUẬT CHÁNH TÔNG
// CỔ THƯ: 《HIỆP KỶ BIỆN PHƯƠNG THƯ: QUYỂN XII》 & 《KỲ MÔN ĐỘN GIÁP BÍ CẤP TOÀN THƯ》
// =============================================================================

class ThienVanKyMonEngine {
  constructor() {
    this.classicalSource = "《Hiệp Kỷ Biện Phương Thư: Tuyển Nhật Khảo》 (Tứ Khố Toàn Thư Biên Soạn) & 《Kỳ Môn Độn Giáp Bí Cấp Toàn Thư》";

    this.thaiDuong24Son = [
      {
        son: "Tý", degree: "0° (Chính Bắc)",
        tietKhiDaoSon: "Đại Tuyết (khoảng 07/12 Dương Lịch)",
        tietKhiDaoHuong: "Mang Chủng (khoảng 06/06 Dương Lịch)",
        meaning: "Thái Dương đáo Tý giải trừ hung sát thủy ách, đáo Ngọ sinh tài vượng đỉnh cao.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Cung Tý thuộc Thủy phương Bắc vốn thuần âm lạnh lẽo. Khi Mặt Trời (Thái Dương) đáo Tý vào tiết Đại Tuyết, quang năng chí dương chiếu rọi làm ấm trục Tý - Ngọ, tiêu trừ toàn bộ âm tà uế khí, hóa giải 100 loại thần sát hung tinh. Đến tiết Mang Chủng, Thái Dương đáo Ngọ (mặt tiền nhà) kích hoạt hỏa lực sinh tài, buôn bán hưng thịnh."
      },
      {
        son: "Quý", degree: "15° (Bắc)",
        tietKhiDaoSon: "Đông Chí (khoảng 22/12 Dương Lịch)",
        tietKhiDaoHuong: "Hạ Chí (khoảng 21/06 Dương Lịch)",
        meaning: "Thái Dương đáo Quý tụ âm dương hòa hợp, gia đạo an khang thịnh vượng.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Tiết Đông Chí là lúc 'Nhất Dương Sơ Sinh' (dương khí bắt đầu hồi sinh giữa mùa đông). Thái Dương đáo Quý lúc này mang ý nghĩa sinh sôi nảy nở mầm sống mới. Đến Hạ Chí đáo Hướng Đinh, cực dương chiếu rọi giúp gia chủ tích lũy điền sản, con cái thông tuệ."
      },
      {
        son: "Sửu", degree: "30° (Đông Bắc)",
        tietKhiDaoSon: "Tiểu Hàn (khoảng 06/01 Dương Lịch)",
        tietKhiDaoHuong: "Tiểu Thử (khoảng 07/07 Dương Lịch)",
        meaning: "Thái Dương đáo Sửu vượng điền sản đất đai, hóa giải ngũ hoàng sát khí.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Sửu là thấp thổ (đất ẩm ướt). Thái Dương chiếu rọi làm khô ráo đất đai, nung đúc thổ sinh kim. Nhà tọa Sửu chọn ngày này khởi công giúp móng nhà vững chãi như bàn thạch, gia đình tích tụ được nhiều bất động sản."
      },
      {
        son: "Cấn", degree: "45° (Đông Bắc)",
        tietKhiDaoSon: "Đại Hàn (khoảng 20/01 Dương Lịch)",
        tietKhiDaoHuong: "Đại Thử (khoảng 23/07 Dương Lịch)",
        meaning: "Thái Dương đáo Cấn vượng nhân đinh con trai út, khai mở trí tuệ khoa cử.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Quẻ Cấn tượng trưng cho núi (Sơn), chủ về con người và sự tĩnh lặng. Thái Dương đáo Cấn kích hoạt cung Văn Xương và Nhân Đinh, con cái học hành thông minh xuất chúng, thi cử đỗ đạt cao."
      },
      {
        son: "Dần", degree: "60° (Đông Bắc)",
        tietKhiDaoSon: "Lập Xuân (khoảng 04/02 Dương Lịch)",
        tietKhiDaoHuong: "Lập Thu (khoảng 08/08 Dương Lịch)",
        meaning: "Thái Dương đáo Dần vượng tài lộc kinh doanh buôn bán đầu xuân năm mới.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Dần là thời khắc bắt đầu mùa xuân, vạn vật đâm chồi nảy lộc. Thái Dương đáo Dần mang theo luồng sinh khí đệ nhất, kích hoạt vận hội làm ăn kinh doanh cho cả năm mới hanh thông rực rỡ."
      },
      {
        son: "Giáp", degree: "75° (Đông)",
        tietKhiDaoSon: "Vũ Thủy (khoảng 19/02 Dương Lịch)",
        tietKhiDaoHuong: "Xử Thử (khoảng 23/08 Dương Lịch)",
        meaning: "Thái Dương đáo Giáp vượng công danh hiển đạt, con cái thi cử đỗ đầu bảng.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Giáp Mộc là cây đại thụ chọc trời. Thái Dương chiếu rọi giúp mộc quang hợp vươn cao, tượng trưng cho sự thăng quan tiến chức vượt bậc của người trụ cột trong gia đình."
      },
      {
        son: "Mão", degree: "90° (Chính Đông)",
        tietKhiDaoSon: "Kinh Trập (khoảng 06/03 Dương Lịch)",
        tietKhiDaoHuong: "Bạch Lộ (khoảng 08/09 Dương Lịch)",
        meaning: "Thái Dương đáo Mão dương khí bừng sáng, tiêu trừ uế khí tà ma tuyệt đỉnh.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Mão là cung mặt trời mọc (Đông phương Hàm Trì). Tiết Kinh Trập sấm mùa xuân nổ vang, Thái Dương chiếu thẳng lưng nhà xua tan mọi chướng khí u ám tích tụ trong mùa đông, tái tạo năng lượng nguyên sinh cho ngôi nhà."
      },
      {
        son: "Ất", degree: "105° (Đông)",
        tietKhiDaoSon: "Xuân Phân (khoảng 21/03 Dương Lịch)",
        tietKhiDaoHuong: "Thu Phân (khoảng 23/09 Dương Lịch)",
        meaning: "Thái Dương đáo Ất sinh khí chan hòa, quý nhân giúp đỡ, gia đạo hòa thuận.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Tiết Xuân Phân ngày đêm dài bằng nhau, âm dương cân bằng tuyệt đối. Khí trường ôn hòa giúp gia đình giải tỏa mọi xung đột cãi vã, vợ chồng gắn kết, mở rộng mối quan hệ làm ăn tốt đẹp."
      },
      {
        son: "Thìn", degree: "120° (Đông Nam)",
        tietKhiDaoSon: "Thanh Minh (khoảng 05/04 Dương Lịch)",
        tietKhiDaoHuong: "Hàn Lộ (khoảng 08/10 Dương Lịch)",
        meaning: "Thái Dương đáo Thìn tích tụ long khí, hóa giải thị phi kiện tụng và tiểu nhân.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Thìn là Thủy Khố và là Long vị. Thái Dương đáo Thìn vào tiết Thanh Minh kích hoạt mạch rồng ngầm thức giấc, biến hung thành cát, người làm ăn được bảo bọc bình an trước mọi sóng gió thị trường."
      },
      {
        son: "Tốn", degree: "135° (Đông Nam)",
        tietKhiDaoSon: "Cốc Vũ (khoảng 20/04 Dương Lịch)",
        tietKhiDaoHuong: "Sương Giáng (khoảng 23/10 Dương Lịch)",
        meaning: "Thái Dương đáo Tốn vượng tài văn chương, buôn bán phát tài, nữ chủ đảm đang.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Quẻ Tốn là Phong (Gió), quản về kinh doanh buôn bán và phụ nữ. Thái Dương chiếu rọi cung Tốn mang gió lành khắp nhà, tài lộc lưu thông thuận lợi, người mẹ người vợ trong nhà tài giỏi tháo vát."
      },
      {
        son: "Tỵ", degree: "150° (Đông Nam)",
        tietKhiDaoSon: "Lập Hạ (khoảng 06/05 Dương Lịch)",
        tietKhiDaoHuong: "Lập Đông (khoảng 07/11 Dương Lịch)",
        meaning: "Thái Dương đáo Tỵ vượng hỏa sinh tài, gia đình vui vẻ nhiều hỷ sự.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Lập Hạ đánh dấu mùa hè bắt đầu, hỏa khí đang lên. Thái Dương đáo Tỵ mang lại sức sống tràn trề, tinh thần phấn chấn, thúc đẩy các kế hoạch làm ăn lớn khởi động thành công mỹ mãn."
      },
      {
        son: "Bính", degree: "165° (Nam)",
        tietKhiDaoSon: "Tiểu Mãn (khoảng 21/05 Dương Lịch)",
        tietKhiDaoHuong: "Tiểu Tuyết (khoảng 22/11 Dương Lịch)",
        meaning: "Thái Dương đáo Bính quang minh chính đại, thăng quan tiến chức, trừ tà diệt sát.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Bính Hỏa là ngọn lửa mặt trời giữa ban trưa. Khí dương quang cực thịnh thiêu đốt mọi ám khí, giúp danh tiếng của gia chủ vang xa, được mọi người tin tưởng giao phó trọng trách lớn."
      },
      {
        son: "Ngọ", degree: "180° (Chính Nam)",
        tietKhiDaoSon: "Mang Chủng (khoảng 06/06 Dương Lịch)",
        tietKhiDaoHuong: "Đại Tuyết (khoảng 07/12 Dương Lịch)",
        meaning: "Thái Dương đáo Ngọ cực dương hiển hách, tài lộc vượng phát tột đỉnh.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Ngọ là đỉnh cực Nam của vòng dịch học. Thái Dương đáo Ngọ là vị trí đăng quang của Nhật Tinh, mang lại hào quang vinh hiển cao nhất cho ngôi nhà, tài vận đại phát đại vượng."
      },
      {
        son: "Đinh", degree: "195° (Nam)",
        tietKhiDaoSon: "Hạ Chí (khoảng 21/06 Dương Lịch)",
        tietKhiDaoHuong: "Đông Chí (khoảng 22/12 Dương Lịch)",
        meaning: "Thái Dương đáo Đinh nhân đinh hưng thịnh, con cháu vinh hiển rạng rỡ.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Đinh Hỏa là ngọn đèn văn minh. Thái Dương đáo Đinh soi sáng trí tuệ nhân thế, giúp các gia đình có con cháu theo đuổi con đường học thuật, nghiên cứu, nghệ thuật đạt được thành tựu xuất chúng."
      },
      {
        son: "Mùi", degree: "210° (Tây Nam)",
        tietKhiDaoSon: "Tiểu Thử (khoảng 07/07 Dương Lịch)",
        tietKhiDaoHuong: "Tiểu Hàn (khoảng 06/01 Dương Lịch)",
        meaning: "Thái Dương đáo Mùi thổ dày sinh vàng, tích lũy đất đai của cải bền vững.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Mùi là Mộc Khố và là thổ ấm mùa hạ. Thái Dương chiếu rọi làm mộc thổ tương sinh, tạo nền tảng tài chính vững chắc, của cải tích lũy ngày một gia tăng theo năm tháng."
      },
      {
        son: "Khôn", degree: "225° (Tây Nam)",
        tietKhiDaoSon: "Đại Thử (khoảng 23/07 Dương Lịch)",
        tietKhiDaoHuong: "Đại Hàn (khoảng 20/01 Dương Lịch)",
        meaning: "Thái Dương đáo Khôn đức đất chở che, phụ nữ trong nhà đảm đang phúc hậu trường thọ.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Quẻ Khôn là Mẹ (Địa), chủ về đức khoan dung độ lượng chở che vạn vật. Thái Dương đáo Khôn bồi đắp nguồn sinh lực dồi dào cho người phụ nữ trong gia đình, gia đạo yên bình ấm êm."
      },
      {
        son: "Thân", degree: "240° (Tây Nam)",
        tietKhiDaoSon: "Lập Thu (khoảng 08/08 Dương Lịch)",
        tietKhiDaoHuong: "Lập Xuân (khoảng 04/02 Dương Lịch)",
        meaning: "Thái Dương đáo Thân thu nạp quả ngọt mùa thu, tiền tài bội thu thắng lợi.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Thân Kim là điểm bắt đầu của mùa thu thu hoạch. Thái Dương đáo Thân giúp chuyển hóa mọi công sức đầu tư vất vả trước đó thành lợi nhuận tiền bạc thực tế chảy về túi gia chủ."
      },
      {
        son: "Canh", degree: "255° (Tây)",
        tietKhiDaoSon: "Xử Thử (khoảng 23/08 Dương Lịch)",
        tietKhiDaoHuong: "Vũ Thủy (khoảng 19/02 Dương Lịch)",
        meaning: "Thái Dương đáo Canh cứng cỏi kiên định, trừ khử tiểu nhân và kiện tụng thị phi.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Canh Kim là thanh bảo kiếm sắc bén. Thái Dương chiếu rọi trui rèn kiếm báu, giúp gia chủ có ý chí thép, vượt qua mọi nghịch cảnh thử thách và dẹp tan kẻ xấu hãm hại."
      },
      {
        son: "Dậu", degree: "270° (Chính Tây)",
        tietKhiDaoSon: "Bạch Lộ (khoảng 08/09 Dương Lịch)",
        tietKhiDaoHuong: "Kinh Trập (khoảng 06/03 Dương Lịch)",
        meaning: "Thái Dương đáo Dậu vàng bạc sung túc, nhà cửa khang trang lộng lẫy.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Dậu là Chính Tây (Quẻ Đoài - Ao đầm, vui vẻ). Thái Dương đáo Dậu biến sương sớm mùa thu thành châu báu, mang lại niềm vui sum họp gia đình, mua sắm được nhiều tài sản giá trị."
      },
      {
        son: "Tân", degree: "285° (Tây)",
        tietKhiDaoSon: "Thu Phân (khoảng 23/09 Dương Lịch)",
        tietKhiDaoHuong: "Xuân Phân (khoảng 21/03 Dương Lịch)",
        meaning: "Thái Dương đáo Tân may mắn cát khánh, thi cử đạt giải cao, quý nhân giúp đỡ.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Tân Kim là vàng bạc châu báu đã qua chế tác tinh xảo. Thái Dương chiếu rọi làm trang sức tỏa sáng lấp lánh, tượng trưng cho những thành tích xuất sắc được xã hội tôn vinh khen thưởng."
      },
      {
        son: "Tuất", degree: "300° (Tây Bắc)",
        tietKhiDaoSon: "Hàn Lộ (khoảng 08/10 Dương Lịch)",
        tietKhiDaoHuong: "Thanh Minh (khoảng 05/04 Dương Lịch)",
        meaning: "Thái Dương đáo Tuất canh giữ cơ nghiệp, bảo vệ tài sản gia đạo bình an.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Tuất là Hỏa Khố và là linh vật canh giữ nhà cửa. Thái Dương đáo Tuất thắp sáng ngọn lửa bảo vệ gia trạch, giúp gia đình chống lại mọi sự thất thoát của cải và ngăn chặn kẻ gian xâm phạm."
      },
      {
        son: "Càn", degree: "315° (Tây Bắc)",
        tietKhiDaoSon: "Sương Giáng (khoảng 23/10 Dương Lịch)",
        tietKhiDaoHuong: "Cốc Vũ (khoảng 20/04 Dương Lịch)",
        meaning: "Thái Dương đáo Càn trời ban phúc đức vô lượng, gia chủ tôn quý uy nghiêm.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Quẻ Càn là Trời (Thiên), đại diện cho người cha, người lãnh đạo cao nhất. Thái Dương đáo Càn là sự kết hợp chí tôn giữa Thiên và Nhật, ban tặng uy quyền tối thượng và phúc đức dồi dào trường cửu."
      },
      {
        son: "Hợi", degree: "330° (Tây Bắc)",
        tietKhiDaoSon: "Lập Đông (khoảng 07/11 Dương Lịch)",
        tietKhiDaoHuong: "Lập Hạ (khoảng 06/05 Dương Lịch)",
        meaning: "Thái Dương đáo Hợi dòng nước trong veo, tài lộc chảy vào nhà liên tục.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Hợi là Mộc Trường Sinh và là dòng nước đầu nguồn. Thái Dương đáo Hợi khởi phát nguồn sống mới, giúp dòng tiền luân chuyển thuận lợi, kinh doanh buôn bán không bao giờ bị ứ đọng vốn."
      },
      {
        son: "Nhâm", degree: "345° (Bắc)",
        tietKhiDaoSon: "Tiểu Tuyết (khoảng 22/11 Dương Lịch)",
        tietKhiDaoHuong: "Tiểu Mãn (khoảng 21/05 Dương Lịch)",
        meaning: "Thái Dương đáo Nhâm phúc ấm ngàn đời, con cháu thông thái trí tuệ siêu việt.",
        whyGood: "VÌ SAO TỐT & CƠ CHẾ: Nhâm Thủy là đại dương bao la. Thái Dương chiếu rọi đại dương tạo nên mây mưa nuôi dưỡng vạn vật, đem lại trí tuệ uyên bác cho các thành viên trong gia đình, sống thọ và giàu sang phú quý."
      }
    ];

    // Kỳ Môn Bát Môn Khí Khẩu & Bản Chất Khí Cổ Thư
    this.kyMonBatMon = [
      {
        mon: "Sinh Môn", nature: "ĐẠI CÁT", element: "Thổ (Đông Bắc - Quẻ Cấn)",
        usage: "Cực tốt để mở Cửa chính, đặt Phòng làm việc, Két tiền (Chủ về sinh sôi tài lộc, phát triển kinh doanh).",
        whyGoodOrBad: "VÌ SAO TỐT: Sinh Môn mang bản chất sinh sôi nảy nở của hành Thổ vào mùa xuân. Khí đi qua Sinh Môn nuôi dưỡng vạn vật, tiền tài sinh sôi nảy nở không ngừng. Mở cửa chính tại Sinh Môn giúp gia đình kinh doanh phát tài, gia sản ngày càng phồn thịnh."
      },
      {
        mon: "Khai Môn", nature: "ĐẠI CÁT", element: "Kim (Tây Bắc - Quẻ Càn)",
        usage: "Cực tốt để mở Cổng chính, Cửa chính, Văn phòng công ty (Chủ về công danh sự nghiệp hanh thông, quý nhân phù trợ).",
        whyGoodOrBad: "VÌ SAO TỐT: Khai Môn tượng trưng cho quẻ Càn (Trời) mang đức cương kiện quang minh. Khí Khai Môn giúp khai thông bế tắc, mở ra các cơ hội thăng quan tiến chức, ký kết hợp đồng lớn và được quý nhân quyền quý nâng đỡ."
      },
      {
        mon: "Hưu Môn", nature: "ĐẠI CÁT", element: "Thủy (Chính Bắc - Quẻ Khảm)",
        usage: "Cực tốt để đặt Phòng ngủ, Phòng nghỉ ngơi, Bể cá (Chủ về gia đạo an vui, hồi phục sức khỏe, quý nhân tương trợ).",
        whyGoodOrBad: "VÌ SAO TỐT: Hưu Môn mang tính chất thanh tĩnh nghỉ ngơi, dưỡng sinh của dòng nước êm đềm. Phòng ngủ đặt tại Hưu Môn giúp tái tạo tinh lực tuyệt vời, gia đình hòa thuận êm ấm, giải trừ căng thẳng mệt mỏi sau ngày dài làm việc."
      },
      {
        mon: "Cảnh Môn", nature: "TRUNG BÌNH", element: "Hỏa (Chính Nam - Quẻ Ly)",
        usage: "Thích hợp đặt Thư phòng, Phòng tranh, Bàn học (Chủ về danh tiếng, văn chương; kỵ để hỏa hoạn).",
        whyGoodOrBad: "VÌ SAO LÀ TRUNG CÁT: Cảnh Môn là vẻ đẹp rực rỡ của Hỏa phương Nam. Rất tốt cho danh tiếng, nghệ thuật và thi cử, nhưng nếu không biết tiết chế hỏa lực thì dễ sinh khẩu thiệt cãi vã hoặc bất cẩn hỏa hoạn."
      },
      {
        mon: "Đỗ Môn", nature: "TRUNG BÌNH", element: "Mộc (Đông Nam - Quẻ Tốn)",
        usage: "Thích hợp làm Nhà kho, Mật thất, Két bảo mật (Chủ về bế tắc kín đáo, cất giữ của cải; kỵ mở cửa đi lại).",
        whyGoodOrBad: "VÌ SAO LÀ TRUNG TÍNH: Đỗ Môn chủ về sự ẩn giấu, đóng kín, bế tắc. Không hợp để mở cửa đi lại vì làm cản trở giao thương, nhưng lại là nơi cất giữ bí mật, tiền bạc két sắt cực kỳ an toàn khó bị lộ."
      },
      {
        mon: "Thương Môn", nature: "HUNG SÁT", element: "Mộc (Chính Đông - Quẻ Chấn)",
        usage: "Kỵ mở cửa chính hoặc phòng ngủ (Chủ về tổn thương, tranh chấp, tai nạn giao thông, hao tài).",
        whyGoodOrBad: "VÌ SAO XẤU: Thương Môn mang năng lượng xung chấn dữ dội của sấm sét. Khí đi qua cửa này khiến tâm lý con người dễ bốc đồng nóng nảy, dễ xảy ra va chạm xô xát hoặc tai nạn ngoài đường."
      },
      {
        mon: "Kinh Môn", nature: "HUNG SÁT", element: "Kim (Chính Tây - Quẻ Đoài)",
        usage: "Kỵ mở cửa chính hoặc giường ngủ (Chủ về kinh hãi, hoảng sợ, kiện tụng thị phi, bệnh hô hấp).",
        whyGoodOrBad: "VÌ SAO XẤU: Kinh Môn là kim khí đới sát, gây cảm giác bất an lo lắng thảng thốt. Kê giường ngủ tại đây dễ bị giật mình mộng mị, người trong nhà dễ vướng vào tranh chấp pháp lý hoặc bệnh đường phổi."
      },
      {
        mon: "Tử Môn", nature: "ĐẠI HUNG", element: "Thổ (Tây Nam - Quẻ Khôn)",
        usage: "Cấm kỵ tuyệt đối đặt cửa chính, phòng ngủ, bếp nấu (Chủ về ốm đau nặng, suy bại; chỉ hợp làm nhà kho rác).",
        whyGoodOrBad: "VÌ SAO ĐẠI HUNG: Tử Môn là cửa tử khí, nơi năng lượng bị đóng băng hoàn toàn. Cổ thư ghi: 'Môn phùng Tử Khí, vạn vật giai khô', đặt cửa chính hoặc phòng ngủ tại đây khiến sức khỏe suy kiệt, làm ăn đổ bể thất bại."
      }
    ];
  }

  lookupThaiDuong(sonName) {
    return this.thaiDuong24Son.find(s => s.son === sonName) || this.thaiDuong24Son[0];
  }
}

if (typeof window !== 'undefined') {
  window.ThienVanKyMonEngine = ThienVanKyMonEngine;
  window.thienVanKyMonEngine = new ThienVanKyMonEngine();
}

if (typeof module !== 'undefined') {
  module.exports = { ThienVanKyMonEngine };
}
