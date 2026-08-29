class ThienVanKyMonEngine {
  constructor() {
    this.thaiDuong24Son = [
      { son: "Tý", degree: "0° (Chính Bắc)", tietKhiDaoSon: "Đại Tuyết (khoảng 07/12)", tietKhiDaoHuong: "Mang Chủng (khoảng 06/06)", meaning: "Thái Dương đáo Tý giải trừ hung sát thủy ách, đáo Ngọ sinh tài vượng." },
      { son: "Quý", degree: "15° (Bắc)", tietKhiDaoSon: "Đông Chí (khoảng 22/12)", tietKhiDaoHuong: "Hạ Chí (khoảng 21/06)", meaning: "Thái Dương đáo Quý tụ âm dương hòa hợp, gia đạo an khang." },
      { son: "Sửu", degree: "30° (Đông Bắc)", tietKhiDaoSon: "Tiểu Hàn (khoảng 06/01)", tietKhiDaoHuong: "Tiểu Thử (khoảng 07/07)", meaning: "Thái Dương đáo Sửu vượng điền sản đất đai, hóa giải ngũ hoàng." },
      { son: "Cấn", degree: "45° (Đông Bắc)", tietKhiDaoSon: "Đại Hàn (khoảng 20/01)", tietKhiDaoHuong: "Đại Thử (khoảng 23/07)", meaning: "Thái Dương đáo Cấn vượng nhân đinh con trai út, khai mở trí tuệ." },
      { son: "Dần", degree: "60° (Đông Bắc)", tietKhiDaoSon: "Lập Xuân (khoảng 04/02)", tietKhiDaoHuong: "Lập Thu (khoảng 08/08)", meaning: "Thái Dương đáo Dần vượng tài lộc kinh doanh buôn bán đầu năm." },
      { son: "Giáp", degree: "75° (Đông)", tietKhiDaoSon: "Vũ Thủy (khoảng 19/02)", tietKhiDaoHuong: "Xử Thử (khoảng 23/08)", meaning: "Thái Dương đáo Giáp vượng công danh hiển đạt, con cái thi cử đỗ cao." },
      { son: "Mão", degree: "90° (Chính Đông)", tietKhiDaoSon: "Kinh Trập (khoảng 06/03)", tietKhiDaoHuong: "Bạch Lộ (khoảng 08/09)", meaning: "Thái Dương đáo Mão dương khí bừng sáng, tiêu trừ uế khí tà ma." },
      { son: "Ất", degree: "105° (Đông)", tietKhiDaoSon: "Xuân Phân (khoảng 21/03)", tietKhiDaoHuong: "Thu Phân (khoảng 23/09)", meaning: "Thái Dương đáo Ất sinh khí chan hòa, quý nhân giúp đỡ." },
      { son: "Thìn", degree: "120° (Đông Nam)", tietKhiDaoSon: "Thanh Minh (khoảng 05/04)", tietKhiDaoHuong: "Hàn Lộ (khoảng 08/10)", meaning: "Thái Dương đáo Thìn tích tụ long khí, hóa giải thị phi kiện tụng." },
      { son: "Tốn", degree: "135° (Đông Nam)", tietKhiDaoSon: "Cốc Vũ (khoảng 20/04)", tietKhiDaoHuong: "Sương Giáng (khoảng 23/10)", meaning: "Thái Dương đáo Tốn vượng tài văn chương, buôn bán phát tài." },
      { son: "Tỵ", degree: "150° (Đông Nam)", tietKhiDaoSon: "Lập Hạ (khoảng 06/05)", tietKhiDaoHuong: "Lập Đông (khoảng 07/11)", meaning: "Thái Dương đáo Tỵ vượng hỏa sinh tài, gia đình vui vẻ." },
      { son: "Bính", degree: "165° (Nam)", tietKhiDaoSon: "Tiểu Mãn (khoảng 21/05)", tietKhiDaoHuong: "Tiểu Tuyết (khoảng 22/11)", meaning: "Thái Dương đáo Bính quang minh chính đại, thăng quan tiến chức." },
      { son: "Ngọ", degree: "180° (Chính Nam)", tietKhiDaoSon: "Mang Chủng (khoảng 06/06)", tietKhiDaoHuong: "Đại Tuyết (khoảng 07/12)", meaning: "Thái Dương đáo Ngọ cực dương hiển hách, tài lộc vượng phát tột đỉnh." },
      { son: "Đinh", degree: "195° (Nam)", tietKhiDaoSon: "Hạ Chí (khoảng 21/06)", tietKhiDaoHuong: "Đông Chí (khoảng 22/12)", meaning: "Thái Dương đáo Đinh nhân đinh hưng thịnh, con cháu vinh hiển." },
      { son: "Mùi", degree: "210° (Tây Nam)", tietKhiDaoSon: "Tiểu Thử (khoảng 07/07)", tietKhiDaoHuong: "Tiểu Hàn (khoảng 06/01)", meaning: "Thái Dương đáo Mùi thổ dày sinh vàng, tích lũy đất đai của cải." },
      { son: "Khôn", degree: "225° (Tây Nam)", tietKhiDaoSon: "Đại Thử (khoảng 23/07)", tietKhiDaoHuong: "Đại Hàn (khoảng 20/01)", meaning: "Thái Dương đáo Khôn đức đất chở che, phụ nữ trong nhà đảm đang phúc hậu." },
      { son: "Thân", degree: "240° (Tây Nam)", tietKhiDaoSon: "Lập Thu (khoảng 08/08)", tietKhiDaoHuong: "Lập Xuân (khoảng 04/02)", meaning: "Thái Dương đáo Thân thu nạp quả ngọt, tiền tài bội thu." },
      { son: "Canh", degree: "255° (Tây)", tietKhiDaoSon: "Xử Thử (khoảng 23/08)", tietKhiDaoHuong: "Vũ Thủy (khoảng 19/02)", meaning: "Thái Dương đáo Canh cứng cỏi kiên định, trừ khử tiểu nhân." },
      { son: "Dậu", degree: "270° (Chính Tây)", tietKhiDaoSon: "Bạch Lộ (khoảng 08/09)", tietKhiDaoHuong: "Kinh Trập (khoảng 06/03)", meaning: "Thái Dương đáo Dậu vàng bạc sung túc, nhà cửa khang trang." },
      { son: "Tân", degree: "285° (Tây)", tietKhiDaoSon: "Thu Phân (khoảng 23/09)", tietKhiDaoHuong: "Xuân Phân (khoảng 21/03)", meaning: "Thái Dương đáo Tân may mắn cát khánh, thi cử đạt giải cao." },
      { son: "Tuất", degree: "300° (Tây Bắc)", tietKhiDaoSon: "Hàn Lộ (khoảng 08/10)", tietKhiDaoHuong: "Thanh Minh (khoảng 05/04)", meaning: "Thái Dương đáo Tuất canh giữ cơ nghiệp, bảo vệ tài sản." },
      { son: "Càn", degree: "315° (Tây Bắc)", tietKhiDaoSon: "Sương Giáng (khoảng 23/10)", tietKhiDaoHuong: "Cốc Vũ (khoảng 20/04)", meaning: "Thái Dương đáo Càn trời ban phúc đức, gia chủ tôn quý uy nghiêm." },
      { son: "Hợi", degree: "330° (Tây Bắc)", tietKhiDaoSon: "Lập Đông (khoảng 07/11)", tietKhiDaoHuong: "Lập Hạ (khoảng 06/05)", meaning: "Thái Dương đáo Hợi dòng nước trong veo, tài lộc chảy vào nhà." },
      { son: "Nhâm", degree: "345° (Bắc)", tietKhiDaoSon: "Tiểu Tuyết (khoảng 22/11)", tietKhiDaoHuong: "Tiểu Mãn (khoảng 21/05)", meaning: "Thái Dương đáo Nhâm phúc ấm ngàn đời, con cháu thông thái." }
    ];
    this.kyMonBatMon = [
      { mon: "Sinh Môn", nature: "ĐẠI CÁT", element: "Thổ (Đông Bắc)", usage: "Mở Cửa chính, đặt Phòng làm việc, Két tiền (Chủ về sinh sôi tài lộc, phát triển kinh doanh)." },
      { mon: "Khai Môn", nature: "ĐẠI CÁT", element: "Kim (Tây Bắc)", usage: "Mở Cổng chính, Cửa chính, Văn phòng công ty (Chủ về công danh sự nghiệp hanh thông, quý nhân phù trợ)." },
      { mon: "Hưu Môn", nature: "ĐẠI CÁT", element: "Thủy (Chính Bắc)", usage: "Đặt Phòng ngủ, Phòng nghỉ ngơi, Bể cá (Chủ về gia đạo an vui, hồi phục sức khỏe, quý nhân tương trợ)." },
      { mon: "Cảnh Môn", nature: "TRUNG BÌNH", element: "Hỏa (Chính Nam)", usage: "Thích hợp đặt Thư phòng, Phòng tranh, Bàn học (Chủ về danh tiếng, văn chương; kỵ hỏa hoạn)." },
      { mon: "Đỗ Môn", nature: "TRUNG BÌNH", element: "Mộc (Đông Nam)", usage: "Thích hợp làm Nhà kho, Mật thất, Két bảo mật (Chủ về bế tắc kín đáo, cất giữ của cải; kỵ mở cửa đi lại)." },
      { mon: "Thương Môn", nature: "HUNG SÁT", element: "Mộc (Chính Đông)", usage: "Kỵ mở cửa chính hoặc phòng ngủ (Chủ về tổn thương, tranh chấp, tai nạn giao thông, hao tài)." },
      { mon: "Kinh Môn", nature: "HUNG SÁT", element: "Kim (Chính Tây)", usage: "Kỵ mở cửa chính hoặc giường ngủ (Chủ về kinh hãi, hoảng sợ, kiện tụng thị phi, bệnh hô hấp)." },
      { mon: "Tử Môn", nature: "ĐẠI HUNG", element: "Thổ (Tây Nam)", usage: "Cấm kỵ tuyệt đối đặt cửa chính, phòng ngủ, bếp nấu (Chủ về ốm đau nặng, suy bại; chỉ hợp làm nhà kho)." }
    ];
  }
  lookupThaiDuong(sonName) {
    return this.thaiDuong24Son.find(s => s.son === sonName) || this.thaiDuong24Son[0];
  }
}
if (typeof window !== "undefined") { window.ThienVanKyMonEngine = ThienVanKyMonEngine; window.thienVanKyMonEngine = new ThienVanKyMonEngine(); }
if (typeof module !== "undefined") { module.exports = { ThienVanKyMonEngine }; }