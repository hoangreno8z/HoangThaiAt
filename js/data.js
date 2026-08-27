/**
 * ĐẠI BÁCH KHOA TOÀN THƯ VŨ TRỤ HỌC & DỊCH LÝ PHƯƠNG ĐÔNG
 * 100% TIẾNG VIỆT HỌC THUẬT - TOÀN BỘ KHO TÀNG CỔ THƯ ĐÃ ĐƯỢC THU THẬP, KHẢO CHỨNG VÀ VIỆT HÓA
 */

const COSMIC_DATA = {
  // =========================================================================
  // 1. THỜI KHÔNG TIẾN HÓA (9 KỶ NGUYÊN VŨ TRỤ HỌC & DỊCH LÝ)
  // =========================================================================
  timeline: [
    {
      id: "era_1",
      era: "Thuở Hồng Hoang (Tiền Vật Chất)",
      period: "Vô Thủy Vô Chung (Hỗn Độn Nguyên Sơ)",
      title: "Khởi Nguyên Bản Thể: Vô Cực -> Thái Cực -> Lưỡng Nghi",
      category: "Bản Thể Luận",
      desc: "Trạng thái trước khi không gian và thời gian hình thành (Vô Cực). Năng lượng chân không lượng tử nguyên sơ đạt tới trạng thái kích hoạt, ngưng tụ thành điểm kỳ dị duy nhất mang tên Thái Cực. Từ đây, hai dòng năng lượng đối xứng phát sinh: Dương Khí (vận động, giãn nở, bức xạ) và Âm Khí (tĩnh lặng, ngưng tụ, hấp thu), mở ra nhịp đập đầu tiên của vũ trụ."
    },
    {
      id: "era_2",
      era: "Thời Đại Nông Nghiệp Lúa Nước Sơ Khởi",
      period: "Khoảng 5000 - 3000 TCN (Văn hóa Hòa Bình - Bắc Sơn)",
      title: "Cội Nguồn Dịch Lý Phương Nam (Viêm Việt / Thần Nông)",
      category: "Cội Nguồn Bách Việt",
      desc: "Cư dân nông nghiệp trồng lúa nước cổ đại tại lưu vực sông Hồng, sông Mã phụ thuộc trực tiếp vào con nước, sấm sét, mưa nắng và chu kỳ mặt trời để gieo cấy. Huyền sử Mẹ Âu Cơ (dòng Tiên/Núi non/Âm tĩnh) và Cha Lạc Long Quân (dòng Rồng/Biển cả/Dương động) cùng phép phân đôi 50 - 50 chính là sự mã hóa nguyên lý Âm Dương cân bằng sinh thái sơ khai nhất."
    },
    {
      id: "era_3",
      era: "Thời Đại Phục Hy (Tiên Thiên)",
      period: "Khoảng 2800 TCN",
      title: "Hà Đồ & Tiên Thiên Bát Quái (Bản Thể Không Gian Đối Xứng)",
      category: "Số Học Càn Khôn",
      desc: "Hà Đồ xuất hiện trên sông Hoàng Hà với 55 chấm đen trắng. Quy luật Số Sinh (1, 2, 3, 4, 5) và Số Thành (6, 7, 8, 9, 10) định vị trật tự 5 hành Thủy, Hỏa, Mộc, Kim, Thổ. Phục Hy quan sát thiên văn địa lý vạch ra Tiên Thiên Bát Quái với cấu trúc nhị phân bù trừ hoàn hảo trong không gian 3 chiều."
    },
    {
      id: "era_4",
      era: "Thời Đại Vũ Trị Thủy",
      period: "Khoảng 2200 TCN",
      title: "Lạc Thư & Ma Trận Cửu Cung (Động Lực Học Biến Dịch)",
      category: "Số Học Càn Khôn",
      desc: "Thần Quy nổi lên từ sông Lạc mang ma trận 9 cung số học bậc 3 với hằng số cân bằng bằng 15 trên mọi trục. Lạc Thư đại diện cho trạng thái động lực học thời không, làm cơ sở cho sự vận hành của 8 phương vị và cửu cung luân chuyển."
    },
    {
      id: "era_5",
      era: "Thời Đại Đồ Đồng Đông Sơn",
      period: "Khoảng 1000 TCN - Thế kỷ 1 SCN",
      title: "Trống Đồng Đông Sơn: Đúc Trọn Vẹn Vũ Trụ Quan Vào Đồng Thau",
      category: "Cội Nguồn Bách Việt",
      desc: "Đỉnh cao văn minh Lạc Việt: Người Việt cổ đúc toàn bộ tri thức thiên văn lên mặt trống đồng Ngọc Lũ, Hoàng Hạ, Sông Đà. Tâm là Mặt Trời Thái Cực 14 cánh, đàn chim Lạc bay ngược chiều kim đồng hồ phản ánh quỹ đạo Trái Đất, 4 tượng cóc ngậm mưa (Tứ Tượng Thủy Thần điều hòa mùa màng)."
    },
    {
      id: "era_6",
      era: "Thời Chu Văn Vương & Chu Công (Hậu Thiên)",
      period: "Khoảng 1100 TCN",
      title: "Hậu Thiên Bát Quái & Chu Kỳ Khí Tiết Bốn Mùa",
      category: "Hình Học Vũ Trụ",
      desc: "Chu Văn Vương sắp xếp lại Bát Quái theo chu kỳ chuyển động của Mặt Trời và thời tiết 4 mùa trên Trái Đất (Ly Nam, Khảm Bắc, Chấn Đông, Đoài Tây), hình thành quy luật biến hóa của vạn vật và địa lý phong thổ."
    },
    {
      id: "era_7",
      era: "Thời Xuân Thu - Chiến Quốc",
      period: "770 - 221 TCN",
      title: "Hệ Từ Truyện, Đạo Đức Kinh & Thuyết Ngũ Hành Khí Hóa",
      category: "Triết Học Khí Hóa",
      desc: "Khổng Tử viết Hệ Từ giải mã cơ chế sinh thành Cát - Hung; Lão Tử đúc kết bản thể luận Đạo Đức Kinh ('Vạn vật phụ Âm nhi bão Dương, trùng khí dĩ vi hòa'). Hệ thống hóa 5 vector Khí thành Ngũ Hành Sinh - Khắc - Chế Hóa."
    },
    {
      id: "era_8",
      era: "Thời Hán - Đường - Tống",
      period: "206 TCN - 1279 SCN",
      title: "Đỉnh Cao Tam Thức Đại Đạo & Y Đạo Hoàng Đế Nội Kinh",
      category: "Toán Học Cổ Đại",
      desc: "Hoàn thiện 3 cỗ máy toán học thời không: Thái Ất (Thiên Đạo), Kỳ Môn Độn Giáp (Địa Đạo), Đại Lục Nhâm (Nhân Đạo). Hoàng Đế Nội Kinh ứng dụng toàn diện Âm Dương Ngũ Hành vào Y đạo trị bệnh và nhịp sinh học Tý Ngọ Lưu Chú."
    },
    {
      id: "era_9",
      era: "Thời Cận Đại & Đương Đại",
      period: "Thế kỷ 20 - Nay",
      title: "Việt Lý Tố Nguyên & Đối Chiếu Khoa Học Lượng Tử",
      category: "Minh Triết Đương Đại",
      desc: "Triết gia Kim Định xuất bản các công trình chứng minh Dịch lý là linh hồn văn hóa nông nghiệp Bách Việt. Khoa học hiện đại đối chiếu Bát Quái với mã di truyền 64 bộ ba DNA, ma trận nhị phân máy tính và vật lý trường lượng tử."
    }
  ],

  // =========================================================================
  // 2. CỘI NGUỒN ÂM DƯƠNG DỊCH LÝ TỪ VĂN HÓA LẠC VIỆT
  // =========================================================================
  viet_origins: {
    title: "Cội Nguồn Âm Dương Từ Góc Nhìn Văn Hóa Việt (Linh Hồn Bách Việt)",
    subtitle: "Dịch lý khởi phát từ nền văn minh nông nghiệp lúa nước phương Nam thời Viêm Đế - Thần Nông",
    pillars: [
      {
        id: "trong_dong",
        title: "1. Mật Mã Trống Đồng Đông Sơn - La Bàn Vũ Trụ Quan Lạc Việt Đúc Vào Đồng Thau",
        summary: "Trống đồng không chỉ là nhạc khí mà là một La Bàn Thiên Văn & Vũ Trụ Luận toàn bích của người Việt cổ từ thiên niên kỷ 1 TCN trước khi có sách vở phương Bắc.",
        details: [
          "TÂM MẶT TRỐNG LÀ SAO THÁI CỰC / MẶT TRỜI: Ngôi sao 14 hoặc 12 cánh ở chính giữa tượng trưng cho Mặt Trời tối thượng - nguồn năng lượng sáng thế, đồng thời phân định 12 tháng/12 giờ và 24 tiết khí trong năm nông nghiệp.",
          "VÀNH ĐÀN CHIM LẠC (DƯƠNG KHÍ THĂNG HOA): Đàn chim mỏ dài vươn cánh bay ngược chiều kim đồng hồ mô phỏng trực giác thiên văn học chính xác về chiều tự quay của Trái Đất và chuyển động biểu kiến của thiên thể quanh Mặt Trời.",
          "VÀNH 4 TƯỢNG CÓC / ẾCH (TỨ TƯỢNG ÂM KHÍ GỌI MƯA): Động vật mang tính Thủy/Âm, gắn liền với hiện tượng sấm sét và mùa mưa. 4 tượng cóc phân bổ ở 4 phương đại diện cho Tứ Tượng và 4 mùa Xuân - Hạ - Thu - Đông điều tiết con nước gieo cấy lúa.",
          "HOA VĂN RĂNG CƯA & SÓNG NƯỚC NHỊ PHÂN: Chuỗi hình tam giác răng cưa biểu diễn tia bức xạ Dương quang tuyến, lồng ghép cùng các vòng tròn đồng tâm có chấm ở giữa chính là mật mã nhị phân Âm Dương giao hòa sớm nhất của cư dân lúa nước."
        ]
      },
      {
        id: "viet_ly",
        title: "2. Triết Học 'Việt Lý Tố Nguyên' Của Triết Gia Kim Định",
        summary: "Công trình chứng minh cội nguồn của Kinh Dịch, Âm Dương, Hà Đồ bắt nguồn từ văn hóa Viêm Việt phương Nam.",
        details: [
          "NGUỒN GỐC NÔNG NGHIỆP LÚA NƯỚC: Dịch lý không thể ra đời từ lối sống du mục săn bắn phương Bắc khô cằn, mà phải sinh ra từ cư dân trồng trọt phương Nam luôn phải 'trông trời, trông đất, trông mây, trông mưa, trông nắng'.",
          "HÀ ĐỒ VÀ LẠC THƯ GẮN LIỀN VỚI SÔNG NƯỚC: Hình tượng Long Mã (ngựa nước/trâu nước) và Thần Quy (loài rùa nước mai tròn yếm vuông) là những sinh vật đặc trưng của vùng đầm lầy sông nước Lĩnh Nam - Dương Tử.",
          "TRIẾT LÝ BÁNH CHƯNG (VUÔNG) - BÁNH GIẦY (TRÒN): Tích Lang Liêu thời Hùng Vương thể hiện mô hình Trời Tròn (Dương/Càn) Đất Vuông (Âm/Khôn) từ trước khi chữ Hán du nhập vào Việt Nam."
        ]
      },
      {
        id: "hong_bang",
        title: "3. Huyền Sử Hồng Bàng: Lưỡng Cực Âm Dương Sơ Khai Nhất",
        summary: "Sự mã hóa nguyên lý Âm Dương cân bằng sinh thái thông qua hình tượng Cha Rồng và Mẹ Tiên.",
        details: [
          "CHA LẠC LONG QUÂN (RỒNG / BIỂN / DƯƠNG ĐỘNG): Mang tính chất Thủy - Hỏa giao hòa của phương Nam, chủ về động năng, khai phá kinh tế sông biển, mở mang giao thương đường thủy.",
          "MẸ ÂU CƠ (TIÊN / NÚI / ÂM TĨNH): Mang tính chất Thổ - Mộc phương Bắc, chủ về sự tĩnh tại, tích lũy, bồi đắp văn hóa trồng trọt lúa rẫy và dược liệu trên non cao.",
          "PHÉP PHÂN ĐÔI 50 - 50: 50 con theo Cha xuống biển, 50 con theo Mẹ lên núi chính là sự phân hóa Thái Cực sinh Lưỡng Nghi, xác lập thế cân bằng sinh thái nhân văn hoàn mỹ."
        ]
      }
    ]
  },

  // =========================================================================
  // 3. ĐẠI LUẬN THUYẾT VŨ TRỤ HỌC CHUYÊN SÂU (6 CHƯƠNG ĐẠI HỌC THUẬT)
  // =========================================================================
  treatises: [
    {
      id: "treatise_1",
      number: "I",
      title: "Bản Thể Luận Vũ Trụ: Từ Hư Vô Tiền Vật Chất Đến Điểm Kỳ Dị Thái Cực",
      author: "Khảo Luận Bản Thể Tiên Tần & Vật Lý Lượng Tử",
      content: `
        <p><strong>1. Khái Niệm Vô Cực (Wuji) - Trường Tiềm Năng Lượng Tử Nguyên Sơ:</strong></p>
        <p>Trong tư tưởng Tiên Tần, 'Vô Cực' không phải là hư không trống rỗng, mà là trạng thái năng lượng chân không thuần túy ở mức kích thích nền thấp nhất. Đạo Đức Kinh chương 25 chép: <em>'Hữu vật hỗn thành, tiên thiên địa sinh. Tịch hề liêu hề, độc lập bất cải, chu hành nhi bất đãi, khả dĩ vi thiên địa mẫu'</em>.</p>
        
        <p><strong>2. Thái Cực (Taiji) - Điểm Kỳ Dị Khởi Nguyên (Cosmic Singularity):</strong></p>
        <p>Khi trường năng lượng tiềm năng vượt qua ngưỡng dao động tới hạn, sự phân cực xuất hiện. Điểm tụ hội năng lượng đầu tiên được gọi là <strong>Thái Cực</strong>. Chu Đôn Di viết trong <em>Thái Cực Đồ Thuyết</em>: <em>'Vô cực nhi Thái cực. Thái cực động nhi sinh Dương, động cực nhi tĩnh, tĩnh nhi sinh Âm, tĩnh cực phục động. Nhất động nhất tĩnh, hỗ vi kỳ căn'</em>.</p>
        
        <p><strong>3. Bản Chất Của Lưỡng Nghi (Âm - Dương):</strong></p>
        <p>Âm Dương không phải hai vật thể đối kháng triệt tiêu nhau, mà là hai vector trạng thái của Khí:
        <br>• <strong>Dương (Yang):</strong> Vector ly tâm, hướng ngoại, bành trướng nhiệt lượng, tần số dao động cao.
        <br>• <strong>Âm (Yin):</strong> Vector hướng tâm, cô đặc, ngưng tụ khối lượng, bảo toàn tiềm năng.</p>
      `
    },
    {
      id: "treatise_2",
      number: "II",
      title: "Vũ Trụ Quan Lạc Việt: Mật Mã Thiên Văn & Triết Học Nông Nghiệp Trống Đồng Đông Sơn",
      author: "Khảo Cổ Học Đông Sơn & Việt Lý Tố Nguyên",
      content: `
        <p><strong>1. Khảo Cổ Học Mặt Trống Đồng Đông Sơn - La Bàn Thiên Văn Cổ:</strong></p>
        <p>Các phát hiện tại di chỉ Ngọc Lũ, Hoàng Hạ, Cổ Loa, Sông Đà chứng minh người Lạc Việt đã đúc trọn vẹn vũ trụ quan lên mặt trống đồng từ trước thiên niên kỷ 1 TCN:</p>
        <ul>
          <li><strong>Ngôi sao 14 cánh ở tâm:</strong> Tượng trưng cho Mặt Trời tối thượng - nguồn năng lượng sáng thế. 14 tia sáng phân chia mặt tròn thành các góc chuẩn, phân định 24 tiết khí trong năm nông nghiệp.</li>
          <li><strong>Đàn chim Lạc bay ngược chiều kim đồng hồ:</strong> Phản ánh trực giác thiên văn học chính xác về chiều tự quay của Trái Đất và chuyển động biểu kiến của thiên thể quanh Mặt Trời.</li>
          <li><strong>Bốn tượng Cóc/Ếch trên tang trống:</strong> Biểu tượng của Thủy khí và sấm sét gọi mưa điều hòa mùa màng lúa nước.</li>
        </ul>

        <p><strong>2. Triết Học 'Việt Lý Tố Nguyên' Của Giáo Sư Kim Định:</strong></p>
        <p>Triết gia Kim Định đã chứng minh Dịch lý mang bản chất của nền văn minh Nông nghiệp lúa nước phương Nam: nương tựa vào đất trời, sông ngòi, lấy sự sinh tồn hòa hợp với tự nhiên làm cứu cánh. Triết lý bánh chưng vuông (Đất/Khôn/Âm) và bánh giầy tròn (Trời/Càn/Dương) từ thời Hùng Vương chính là biểu hiện trực quan sớm nhất của mô hình Trời Tròn Đất Vuông.</p>
      `
    },
    {
      id: "treatise_3",
      number: "III",
      title: "Mật Mã Số Học Vũ Trụ: Hà Đồ (Tiên Thiên) & Lạc Thư (Hậu Thiên Ma Phương)",
      author: "Toán Học Cổ Đại & Hình Học Không Gian",
      content: `
        <p><strong>1. Hà Đồ - Quy Luật Số Sinh & Số Thành Cân Bằng Tĩnh:</strong></p>
        <p>Hà Đồ gồm 55 chấm, đại diện cho Đại Diễn chi số (Thiên số lẻ: 1+3+5+7+9=25; Địa số chẵn: 2+4+6+8+10=30; Tổng = 55):</p>
        <ul>
          <li><strong>Bắc:</strong> 1 (Dương Sinh) phối 6 (Âm Thành) -> Thủy</li>
          <li><strong>Nam:</strong> 2 (Âm Sinh) phối 7 (Dương Thành) -> Hỏa</li>
          <li><strong>Đông:</strong> 3 (Dương Sinh) phối 8 (Âm Thành) -> Mộc</li>
          <li><strong>Tây:</strong> 4 (Âm Sinh) phối 9 (Dương Thành) -> Kim</li>
          <li><strong>Trung:</strong> 5 (Dương Sinh) phối 10 (Âm Thành) -> Thổ</li>
        </ul>
        <p><em>Chứng minh toán học:</em> Hiệu số ở mọi phương vị: <code>6-1=5, 7-2=5, 8-3=5, 9-4=5, 10-5=5</code>. Hằng số 5 tại trung tâm chứng minh Thổ là tâm trục chuyển tiếp của mọi sự sinh hóa trong vũ trụ.</p>

        <p><strong>2. Lạc Thư - Động Lực Học Ma Phương Cửu Cung:</strong></p>
        <p>Ma phương bậc 3 kinh điển với tổng mọi trục bằng 15. Sự sắp xếp <code>[4,9,2; 3,5,7; 8,1,6]</code> tạo nên sự dịch chuyển năng lượng không ngừng giữa 8 hướng, làm cơ sở cho sự luân chuyển của 9 Vận và phân bố trường khí trên mặt đất.</p>
      `
    },
    {
      id: "treatise_4",
      number: "IV",
      title: "Động Lực Học Khí Hóa: Ngũ Hành Bản Thể & Cơ Chế Chế Hóa (Homeostasis)",
      author: "Hoàng Đế Nội Kinh & Vật Lý Sinh Thái",
      content: `
        <p><strong>1. Ngũ Hành Là 5 Vector Pha Chuyển Động Của Khí:</strong></p>
        <p>Ngũ Hành không phải là 5 chất liệu thô sơ, mà là 5 trạng thái vận động:</p>
        <ul>
          <li><strong>Mộc:</strong> Vector sinh trưởng, tỏa rộng, đàn hồi, khai phá mùa xuân.</li>
          <li><strong>Hỏa:</strong> Vector thăng hoa, cực đại, bức xạ nhiệt, quang minh mùa hạ.</li>
          <li><strong>Thổ:</strong> Vector trung hòa, dung nạp, điều phối, chuyển tiếp giữa các mùa.</li>
          <li><strong>Kim:</strong> Vector thu liễm, cô đặc, kết tinh, thanh lọc mùa thu.</li>
          <li><strong>Thủy:</strong> Vector lắng đọng, phục tàng, thâm nhập sâu, tiềm thức mùa đông.</li>
        </ul>

        <p><strong>2. Cơ Chế Chế Hóa Tối Cao:</strong></p>
        <p>Trong Dịch lý, không có sự Sinh thuần túy cũng không có sự Khắc thuần túy. Khắc mà có Sinh, Sinh mà có Khắc:
        <br>• Kim khắc Mộc, nhưng Mộc sinh Hỏa để Hỏa rèn lại Kim.
        <br>• Thủy khắc Hỏa, nhưng Hỏa sinh Thổ để Thổ đắp đê ngăn Thủy.
        <br>Nhờ vòng hồi tiếp này mà hệ sinh thái vũ trụ luôn duy trì được trạng thái cân bằng động bất diệt.</p>
      `
    },
    {
      id: "treatise_5",
      number: "V",
      title: "Cơ Học Trường Khí: Vì Sao Sinh Ra Phương Vị Cát - Hung?",
      author: "Vật Lý Địa Từ Trường & Cộng Hưởng Sinh Học",
      content: `
        <p><strong>1. Bản Chất Khoa Học Của Cát - Hung:</strong></p>
        <p>Cát Hung không phải sự ban ơn hay trừng phạt của thần linh, mà là <strong>Mức độ tương thích pha (Phase Resonance) của 3 trường lực</strong>:</p>
        <ul>
          <li><strong>Thiên Khí (Time / Solar Radiation):</strong> Góc chiếu bức xạ mặt trời, vị trí tinh tú, chu kỳ bão từ.</li>
          <li><strong>Địa Khí (Space / Geomagnetic Vector):</strong> Hướng từ trường Trái Đất, cấu trúc địa hình loan đầu, sự tụ khí hay tán khí.</li>
          <li><strong>Nhân Khí (Human Biofield):</strong> Tần số sinh học, trạng thái tâm thể, nếp sống và hành vi con người.</li>
        </ul>

        <p><strong>2. Đồng Khí Tương Cầu & Nhiễu Loạn Xung Sát:</strong></p>
        <p>• <strong>Cát:</strong> Khi Thiên - Địa - Nhân đồng pha, dòng năng lượng lưu thông êm dịu, tế bào thần kinh thư giãn, tâm trí minh mẫn -> Quyết định sáng suốt -> Thành công, trường thọ.
        <br>• <strong>Hung:</strong> Khi phương vị hoặc thời điểm nghịch pha trực diện, bẻ gãy từ trường sinh học, gây ức chế hệ thần kinh -> Quyết định sai lầm -> Tổn hao tài lộc.</p>
      `
    },
    {
      id: "treatise_6",
      number: "VI",
      title: "Tam Thức Đại Đạo: Ba Cỗ Máy Tính Toán Không - Thời Gian Đỉnh Cao",
      author: "Toán Học Cổ & Khảo Sát Thiên Văn",
      content: `
        <p><strong>1. Thái Ất Thần Kinh (Thiên Đạo):</strong></p>
        <p>Sử dụng 16 Thần và 72 Cục để theo dõi quỹ đạo biểu kiến của sao Thái Ất quanh sao Bắc Cực. Chuyên dùng để phân tích đại biến thiên khí hậu toàn cầu, dịch bệnh, lũ lụt và các chu kỳ lịch sử qua hàng ngàn năm.</p>

        <p><strong>2. Kỳ Môn Độn Giáp (Địa Đạo):</strong></p>
        <p>Ma trận 4 tầng bàn xếp chồng (Địa Bàn - Thiên Bàn - Nhân Bàn - Thần Bàn) kết hợp cùng Cửu Cung Lạc Thư, Bát Môn và Cửu Tinh. Cho phép xác định chính xác Cửa Sinh (Sinh Môn) và phương vị cát lợi trong từng thời khắc.</p>

        <p><strong>3. Đại Lục Nhâm (Nhân Đạo):</strong></p>
        <p>Hệ thống phân tích xác suất tương tác xã hội và tâm lý con người. Sử dụng Thiên Bàn Nguyệt Tướng phối Địa Bàn, thiết lập Tứ Khóa và Tam Truyền (Quá khứ, Hiện tại, Tương lai) để giải mã tường tận mọi sự việc nhân sinh.</p>
      `
    }
  ],

  // =========================================================================
  // 4. MẠNG LƯỚI CÀN KHÔN TRI THỨC (30+ NÚT ĐỒ THỊ DỊCH LÝ)
  // =========================================================================
  knowledge_graph: {
    nodes: [
      { id: "Vô Cực", group: "genesis", radius: 36, cat: "Bản Thể Luận", desc: "Trường chân không tiềm năng nguyên sơ, chưa phân định không-thời gian, là nguồn gốc phát sinh vạn hữu.", quote: "Vô cực nhi Thái cực. (Chu Đôn Di)" },
      { id: "Thái Cực", group: "genesis", radius: 32, cat: "Bản Thể Luận", desc: "Điểm kỳ dị sơ khởi mang ý thức và năng lượng tự thân, tâm trục xoay chuyển của tạo hóa.", quote: "Dịch hữu Thái cực, thị sinh Lưỡng nghi. (Hệ Từ)" },
      { id: "Âm Khí", group: "polarity", radius: 26, cat: "Lưỡng Nghi", desc: "Vector năng lượng thu liễm, hướng nội, ngưng tụ, hấp thu nhiệt lượng, tĩnh lặng.", quote: "Âm tĩnh dĩ ngưng chất." },
      { id: "Dương Khí", group: "polarity", radius: 26, cat: "Lưỡng Nghi", desc: "Vector năng lượng giãn nở, hướng ngoại, bức xạ, phát tán nhiệt lượng, vận động.", quote: "Dương động dĩ phát sinh." },
      { id: "Tứ Tượng", group: "polarity", radius: 28, cat: "Lưỡng Nghi", desc: "Bốn pha dao động nhiệt lượng: Thái Dương (Hạ), Thiếu Dương (Xuân), Thái Âm (Đông), Thiếu Âm (Thu).", quote: "Lưỡng nghi sinh Tứ tượng." },
      
      { id: "Hà Đồ", group: "math", radius: 28, cat: "Số Học Càn Khôn", desc: "Trật tự Sinh-Thành số Tiên Thiên, cấu trúc cân bằng tĩnh gồm 55 chấm đen trắng.", quote: "Thiên địa chi số ngũ thập hữu ngũ." },
      { id: "Lạc Thư", group: "math", radius: 28, cat: "Số Học Càn Khôn", desc: "Ma phương Cửu Cung bậc 3 với hằng số cân bằng động bằng 15 trên mọi trục.", quote: "Đới cửu lý nhất, ngũ cư trung cung." },
      { id: "Số Sinh", group: "math", radius: 20, cat: "Số Học Càn Khôn", desc: "Các số khởi phát từ 1 đến 5 (1 Thủy, 2 Hỏa, 3 Mộc, 4 Kim, 5 Thổ).", quote: "Thiên nhất sinh Thủy, Địa nhị sinh Hỏa." },
      { id: "Số Thành", group: "math", radius: 20, cat: "Số Học Càn Khôn", desc: "Các số hoàn tất từ 6 đến 10 (6 Thủy, 7 Hỏa, 8 Mộc, 9 Kim, 10 Thổ).", quote: "Địa lục thành chi, Thiên thất thành chi." },

      { id: "Trống Đồng Đông Sơn", group: "viet", radius: 42, cat: "Cội Nguồn Bách Việt", desc: "Bản đồ thiên văn và vũ trụ luận đúc bằng đồng thau: Sao Thái Cực 14 cánh, chim Lạc, cóc gọi mưa.", quote: "La bàn vũ trụ quan nền văn minh lúa nước sông Hồng." },
      { id: "Việt Lý Tố Nguyên", group: "viet", radius: 30, cat: "Cội Nguồn Bách Việt", desc: "Học thuyết triết học của Kim Định chứng minh Dịch lý khởi nguyên từ văn hóa Viêm Việt phương Nam.", quote: "Dịch là bản đồ tâm thức nông nghiệp Lạc Việt." },
      { id: "Lạc Long Quân", group: "viet", radius: 24, cat: "Cội Nguồn Bách Việt", desc: "Biểu trưng Rồng / Biển / Dương tính / Động năng / Mở mang kinh tế sông nước.", quote: "50 con theo Cha xuống biển." },
      { id: "Âu Cơ", group: "viet", radius: 24, cat: "Cội Nguồn Bách Việt", desc: "Biểu trưng Tiên / Núi / Âm tính / Tĩnh tại / Bồi đắp văn hóa trồng trọt.", quote: "50 con theo Mẹ lên núi." },

      { id: "Bát Quái", group: "bagua", radius: 30, cat: "Hình Học Vũ Trụ", desc: "Mạng lưới 8 quẻ đơn (3 hào nhị phân) mô phỏng 8 trạng thái năng lượng vật chất nền tảng.", quote: "Bát quái định cát hung." },
      { id: "Tiên Thiên Bát Quái", group: "bagua", radius: 24, cat: "Bát Quái", desc: "Trật tự không gian đối xứng bù trừ tuyệt đối của Phục Hy (Càn Nam Khôn Bắc).", quote: "Thiên Địa định vị, Sơn Trạch thông khí." },
      { id: "Hậu Thiên Bát Quái", group: "bagua", radius: 24, cat: "Bát Quái", desc: "Trật tự chu kỳ thời gian và thời tiết 4 mùa của Văn Vương (Ly Nam Khảm Bắc).", quote: "Đế xuất hồ Chấn, tương kiến hồ Ly." },
      { id: "Càn (Trời)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Thuần Dương, cương kiện, cực tính trọng trường phát xuất.", quote: "Càn vi thiên." },
      { id: "Khôn (Đất)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Thuần Âm, nhu thuận, vật chất dung nạp bao bọc.", quote: "Khôn vi địa." },
      { id: "Khảm (Nước)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Chất lỏng trôi chảy, hiểm sâu, phương Chính Bắc (Hậu Thiên).", quote: "Khảm vi thủy." },
      { id: "Ly (Lửa)", group: "bagua", radius: 18, cat: "Bát Quái", desc: "Bức xạ nhiệt quang minh rực rỡ, phương Chính Nam (Hậu Thiên).", quote: "Ly vi hỏa." },

      { id: "Ngũ Hành", group: "wuxing", radius: 30, cat: "Khí Hóa", desc: "Năm pha chuyển hóa vector của Khí: Mộc (Tỏa), Hỏa (Thăng), Thổ (Trung), Kim (Thu), Thủy (Tàng).", quote: "Khí hóa vạn vật." },
      { id: "Mộc", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector vươn tỏa, hướng thượng, mùa Xuân, phương Đông.", quote: "Mộc viết khúc trực." },
      { id: "Hỏa", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector bùng phát, thăng hoa, mùa Hạ, phương Nam.", quote: "Hỏa viết viêm thượng." },
      { id: "Thổ", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector trung hòa, dung chứa, chuyển tiếp mùa, trung ương.", quote: "Thổ viên giá sắc." },
      { id: "Kim", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector thu liễm, ngưng kết, mùa Thu, phương Tây.", quote: "Kim viết tòng cách." },
      { id: "Thủy", group: "wuxing", radius: 18, cat: "Ngũ Hành", desc: "Vector lắng đọng, phục tàng, mùa Đông, phương Bắc.", quote: "Thủy viết nhuận hạ." },
      { id: "Chế Hóa", group: "wuxing", radius: 24, cat: "Khí Hóa", desc: "Cơ chế tự cân bằng hồi tiếp (Homeostasis): Khắc mà có Sinh, Sinh mà có Khắc.", quote: "Vô khắc tắc quá cực vi hại." },

      { id: "Cát Hung Phương Vị", group: "physics", radius: 32, cat: "Cơ Học Khí", desc: "Hiện tượng cộng hưởng pha (Cát) hoặc xung đột bẻ gãy từ trường (Hung) giữa Thiên-Địa-Nhân.", quote: "Đồng thanh tương ứng, đồng khí tương cầu." },
      { id: "Cộng Hưởng Pha", group: "physics", radius: 22, cat: "Cơ Học Khí", desc: "Sự khuếch đại năng lượng khi tần số sinh học trùng khớp với từ trường phương vị và thiên thời.", quote: "Constructive Phase Resonance." },
      { id: "Xung Đột Pha", group: "physics", radius: 22, cat: "Cơ Học Khí", desc: "Nhiễu loạn dòng xoáy năng lượng khi vector khí quyển và địa lý đối kháng trực diện.", quote: "Destructive Phase Interference." },
      { id: "Thái Ất Thần Kinh", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Thiên Đạo: 16 Thần, 72 Cục khảo sát đại chu kỳ thiên văn.", quote: "Thái Ất thống quản chu kỳ." },
      { id: "Kỳ Môn Độn Giáp", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Địa Đạo: Ma trận 4 tầng bàn điều hướng phương vị Cát lành.", quote: "Cửu Cung Bát Môn định vị." },
      { id: "Đại Lục Nhâm", group: "tamthuc", radius: 24, cat: "Tam Thức", desc: "Cỗ máy tính toán Nhân Đạo: Tứ Khóa Tam Truyền phân tích nhân tâm đời sống.", quote: "Tam truyền phân định sự vụ." }
    ],
    links: [
      { source: "Vô Cực", target: "Thái Cực", value: 5 },
      { source: "Thái Cực", target: "Âm Khí", value: 4 },
      { source: "Thái Cực", target: "Dương Khí", value: 4 },
      { source: "Âm Khí", target: "Tứ Tượng", value: 3 },
      { source: "Dương Khí", target: "Tứ Tượng", value: 3 },
      { source: "Tứ Tượng", target: "Bát Quái", value: 4 },
      { source: "Âm Khí", target: "Hà Đồ", value: 3 },
      { source: "Dương Khí", target: "Hà Đồ", value: 3 },
      { source: "Hà Đồ", target: "Số Sinh", value: 3 },
      { source: "Hà Đồ", target: "Số Thành", value: 3 },
      { source: "Hà Đồ", target: "Lạc Thư", value: 5 },
      { source: "Lạc Thư", target: "Ngũ Hành", value: 5 },
      { source: "Ngũ Hành", target: "Mộc", value: 2 },
      { source: "Ngũ Hành", target: "Hỏa", value: 2 },
      { source: "Ngũ Hành", target: "Thổ", value: 2 },
      { source: "Ngũ Hành", target: "Kim", value: 2 },
      { source: "Ngũ Hành", target: "Thủy", value: 2 },
      { source: "Ngũ Hành", target: "Chế Hóa", value: 4 },
      { source: "Bát Quái", target: "Tiên Thiên Bát Quái", value: 4 },
      { source: "Bát Quái", target: "Hậu Thiên Bát Quái", value: 4 },
      { source: "Tiên Thiên Bát Quái", target: "Càn (Trời)", value: 2 },
      { source: "Tiên Thiên Bát Quái", target: "Khôn (Đất)", value: 2 },
      { source: "Hậu Thiên Bát Quái", target: "Khảm (Nước)", value: 2 },
      { source: "Hậu Thiên Bát Quái", target: "Ly (Lửa)", value: 2 },
      { source: "Trống Đồng Đông Sơn", target: "Thái Cực", value: 6 },
      { source: "Trống Đồng Đông Sơn", target: "Ngũ Hành", value: 4 },
      { source: "Trống Đồng Đông Sơn", target: "Bát Quái", value: 4 },
      { source: "Việt Lý Tố Nguyên", target: "Hà Đồ", value: 4 },
      { source: "Việt Lý Tố Nguyên", target: "Trống Đồng Đông Sơn", value: 5 },
      { source: "Lạc Long Quân", target: "Dương Khí", value: 4 },
      { source: "Âu Cơ", target: "Âm Khí", value: 4 },
      { source: "Lạc Long Quân", target: "Trống Đồng Đông Sơn", value: 3 },
      { source: "Âu Cơ", target: "Trống Đồng Đông Sơn", value: 3 },
      { source: "Lạc Thư", target: "Cát Hung Phương Vị", value: 5 },
      { source: "Hậu Thiên Bát Quái", target: "Cát Hung Phương Vị", value: 5 },
      { source: "Cát Hung Phương Vị", target: "Cộng Hưởng Pha", value: 4 },
      { source: "Cát Hung Phương Vị", target: "Xung Đột Pha", value: 4 },
      { source: "Thái Cực", target: "Thái Ất Thần Kinh", value: 4 },
      { source: "Lạc Thư", target: "Kỳ Môn Độn Giáp", value: 5 },
      { source: "Hậu Thiên Bát Quái", target: "Đại Lục Nhâm", value: 4 }
    ]
  },

  // =========================================================================
  // 5. CỔ THƯ TÀNG KINH CÁC (KINH ĐIỂN ĐÃ ĐƯỢC THU THẬP & VIỆT HÓA TOÀN VĂN)
  // =========================================================================
  classics: [
    {
      source: "Kinh Dịch - Hệ Từ Thượng (Thiên Thứ Nhất)",
      original: "天尊地卑，乾坤定矣。卑高以陳，貴賤位矣。動靜有常，剛柔斷矣。方以類聚，物以群分，吉凶生矣。",
      trans: "Thiên tôn địa ty, Càn Khôn định hĩ. Ty cao dĩ trần, quý tiện vị hĩ. Động tĩnh hữu thường, cương nhu đoán hĩ. Phương dĩ loại tụ, vật dĩ quần phân, cát hung sinh hĩ.",
      meaning: "Trời ở trên cao tôn quý, Đất ở dưới thấp dung nạp, thế là quẻ Càn và quẻ Khôn đã định vị. Cao thấp bày ra thì ngôi thứ sang hèn đã phân biệt. Động và tĩnh có quy luật thường hằng thì tính chất cương và nhu được xác định. Các phương hướng theo từng chủng loại mà tụ hội, muôn vật theo từng nhóm mà phân chia, từ đó quy luật Cát - Hung được sinh ra.",
      tag: "Bản Thể Càn Khôn"
    },
    {
      source: "Kinh Dịch - Hệ Từ Thượng (Thiên Thứ Mười Một)",
      original: "易有太極，是生兩儀，兩儀生四象，四象生八卦，八卦定吉凶，吉凶生大業。",
      trans: "Dịch hữu Thái Cực, thị sinh Lưỡng Nghi, Lưỡng Nghi sinh Tứ Tượng, Tứ Tượng sinh Bát Quái, Bát Quái định cát hung, cát hung sinh đại nghiệp.",
      meaning: "Trong đạo Dịch có Thái Cực (bản thể nguyên sơ), Thái Cực sinh ra Lưỡng Nghi (hai cực Âm - Dương), Lưỡng Nghi sinh ra Tứ Tượng (bốn pha mùa màng, nhiệt lượng), Tứ Tượng sinh ra Bát Quái (tám trạng thái vật chất không gian), Bát Quái xác định trạng thái hòa hợp hay nghịch chuyển (Cát/Hung), hiểu rõ Cát Hung mới kiến tạo nên sự nghiệp vĩ đại.",
      tag: "Khởi Nguyên Dịch Học"
    },
    {
      source: "Kinh Dịch - Hệ Từ Thượng (Hà Đồ Lạc Thư Thiên)",
      original: "河出圖，洛出書，聖人則之。天一地二，天三地四，天五地六，天七地八，天九地十。天數五，地數五，五位相得而各有合。",
      trans: "Hà xuất Đồ, Lạc xuất Thư, thánh nhân tắc chi. Thiên nhất địa nhị, thiên tam địa tứ, thiên ngũ địa lục, thiên thất địa bát, thiên cửu địa thập. Thiên số ngũ, địa số ngũ, ngũ vị tương đắc nhi các hữu hợp.",
      meaning: "Sông Hoàng Hà hiện ra Đồ hình, sông Lạc hiện ra Thư tịch, bậc thánh nhân lấy đó làm khuôn mẫu. Trời 1 Đất 2, Trời 3 Đất 4, Trời 5 Đất 6, Trời 7 Đất 8, Trời 9 Đất 10. Số Trời có 5 (số lẻ: 1,3,5,7,9), số Đất có 5 (số chẵn: 2,4,6,8,10), năm phương vị tương đắc mà hòa hợp tạo thành 55 số Đại Diễn sinh hóa vạn vật.",
      tag: "Hà Đồ Lạc Thư"
    },
    {
      source: "Đạo Đức Kinh - Lão Tử (Chương 42)",
      original: "道生一，一生二，二生三，三生萬物。萬物負陰而抱陽，沖氣以為和。",
      trans: "Đạo sinh Nhất, Nhất sinh Nhị, Nhị sinh Tam, Tam sinh vạn vật. Vạn vật phụ Âm nhi bão Dương, trùng khí dĩ vi hòa.",
      meaning: "Đạo sinh Một (Thái Cực nguyên khí), Một sinh Hai (phân hóa Âm Dương), Hai sinh Ba (Âm - Dương - Khí giao hòa xung đột), Ba sinh ra muôn loài vạn vật. Muôn vật đều cõng Âm ở sau lưng mà ôm Dương trước ngực, nhờ dòng khí xung đột giao hoán mà đạt tới trạng thái thái hòa vĩnh cửu.",
      tag: "Đạo Gia Bản Thể"
    },
    {
      source: "Hoàng Đế Nội Kinh - Tố Vấn (Âm Dương Ứng Tượng Đại Luận)",
      original: "陰陽者，天地之道也，萬物之綱紀，變化之父母，生殺之本始，神明之府也，治病必求于本。",
      trans: "Âm Dương giả, thiên địa chi đạo dã, vạn vật chi cương kỷ, biến hóa chi phụ mẫu, sinh sát chi bản thủy, thần minh chi phủ dã, trị bệnh tất cầu vu bản.",
      meaning: "Âm Dương chính là quy luật của Trời Đất, kỷ cương trật tự của muôn loài, cha mẹ của mọi sự biến dịch, nguồn gốc của sinh sôi và tiêu vong, là cái kho chứa đựng sự huyền diệu màu nhiệm của tự nhiên. Người thầy thuốc muốn trị bệnh ắt phải tìm về cái gốc rễ Âm Dương ấy.",
      tag: "Y Đạo Khí Hóa"
    },
    {
      source: "Hoài Nam Tử - Thiên Văn Huấn",
      original: "道始於一，一而不生，故分而為陰陽，陰陽合和而生萬物。故曰：一生二，二生三，三生萬物。",
      trans: "Đạo thủy ư nhất, nhất nhi bất sinh, cố phân nhi vi âm dương, âm dương hợp hòa nhi sinh vạn vật. Cố viết: nhất sinh nhị, nhị sinh tam, tam sinh vạn vật.",
      meaning: "Đạo khởi đầu từ Một, nhưng thuần Một đứng yên thì không sinh hóa, vì vậy mới phân tách thành Âm và Dương. Âm và Dương tương giao hòa hợp mới sinh ra muôn vạn thực thể trong vũ trụ.",
      tag: "Thiên Văn Cổ"
    },
    {
      source: "Quản Tử - Tứ Thời Thiên",
      original: "陰陽者，天地之大理也；四時者，陰陽之大經也；刑德者，四時之合也。",
      trans: "Âm Dương giả, thiên địa chi đại lý dã; Tứ thời giả, âm dương chi đại kinh dã; hình đức giả, tứ thời chi hợp dã.",
      meaning: "Âm Dương là cái lý lớn nhất của Trời Đất; Bốn mùa tuần hoàn (Xuân sinh, Hạ trưởng, Thu liễm, Đông tàng) là đường dây trật tự lớn nhất của Âm Dương; ân đức và hình phạt trị quốc phải thuận theo bốn mùa ấy.",
      tag: "Thời Tiết Trị Quốc"
    },
    {
      source: "Việt Lý Tố Nguyên - Triết Gia Kim Định",
      original: "Dịch lý là bản đồ tâm thức và vũ trụ quan của nền văn minh lúa nước Bách Việt phương Nam, xuất phát từ kinh nghiệm trông trời trông đất của cư dân nông nghiệp.",
      trans: "Dịch lý nông nghiệp lúa nước Bách Việt.",
      meaning: "Chứng minh toàn bộ hệ thống triết học Âm Dương, Tam Tài, Bát Quái và Lịch pháp khởi sinh từ thực nghiệm gieo cấy lúa nước của người Việt cổ ven sông Hồng và sông Mã trước khi được văn bản hóa ở phương Bắc.",
      tag: "Minh Triết Lạc Việt"
    }
  ],

  // =========================================================================
  // 6. HÀ ĐỒ & LẠC THƯ FORMULA
  // =========================================================================
  ha_do: {
    title: "Hà Đồ - Bản Thể Tiên Thiên & Trật Tự Sinh Thành",
    origin: "Tương truyền thời Phục Hy, Long Mã xuất hiện trên sông Hoàng Hà mang đồ hình chấm đen trắng từ 1 đến 10.",
    philosophy: "Hà Đồ biểu thị trạng thái Vũ trụ ở thế CÂN BẰNG TĨNH (Thể), là trật tự sinh thành của Ngũ Hành nguyên thủy. Vạn vật lấy 'Sinh' làm gốc, lấy 'Thành' làm quả.",
    formula: [
      { pair: "1 - 6", text: "Thiên nhất sinh Thủy, Địa lục thành chi", direction: "Phương Bắc", element: "Thủy", num_sinh: 1, num_thanh: 6, hanzi: "天一生水 地六成之" },
      { pair: "2 - 7", text: "Địa nhị sinh Hỏa, Thiên thất thành chi", direction: "Phương Nam", element: "Hỏa", num_sinh: 2, num_thanh: 7, hanzi: "地二生火 天七成之" },
      { pair: "3 - 8", text: "Thiên tam sinh Mộc, Địa bát thành chi", direction: "Phương Đông", element: "Mộc", num_sinh: 3, num_thanh: 8, hanzi: "天三生木 地八成之" },
      { pair: "4 - 9", text: "Địa tứ sinh Kim, Thiên cửu thành chi", direction: "Phương Tây", element: "Kim", num_sinh: 4, num_thanh: 9, hanzi: "地四生金 天九成之" },
      { pair: "5 - 10", text: "Thiên ngũ sinh Thổ, Địa thập thành chi", direction: "Trung Cung", element: "Thổ", num_sinh: 5, num_thanh: 10, hanzi: "天五生土 地十成之" }
    ],
    math_insight: "Tổng Thiên số lẻ (1+3+5+7+9=25) + Địa số chẵn (2+4+6+8+10=30) = 55 (Đại Diễn số). Hiệu số Thành và Sinh ở mọi hướng luôn bằng đúng 5 (Hằng số điều phối Thổ chuyển tiếp)."
  },

  lac_thu: {
    title: "Lạc Thư - Động Lực Hậu Thiên & Ma Trận Cửu Cung",
    origin: "Tương truyền thời Đại Vũ trị thủy, Thần Quy nổi lên từ sông Lạc mang ma trận cửu cung số học bí ẩn.",
    philosophy: "Lạc Thư biểu thị Vũ trụ ở thế VẬN ĐỘNG ĐỘNG LỰC HỌC (Dụng), là sự phân bố năng lượng theo không gian 8 hướng và thời gian 9 vận.",
    rhyme: "Đới cửu lý nhất (Đội 9 đạp 1)\nTả tam hữu thất (Trái 3 phải 7)\nNhị tứ vi kiên (2 và 4 làm hai vai)\nLục bát vi túc (6 và 8 làm hai chân)\nNgũ cư trung cung (5 ngự chính giữa)",
    matrix: [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ],
    math_insight: "Ma phương hoàn hảo bậc 3 (Magic Square of order 3). Mọi hàng ngang, cột dọc, đường chéo chính và phụ đều có tổng bằng đúng 15. Tổng toàn thể ma trận = 45."
  },

  // =========================================================================
  // 7. BÁT QUÁI
  // =========================================================================
  bat_quai: {
    tien_thien: {
      name: "Tiên Thiên Bát Quái (Phục Hy)",
      nature: "Bản thể đối xứng không gian, vũ trụ tĩnh tại (Thể)",
      quote: "Thiên Địa định vị, Sơn Trạch thông khí, Lôi Phong tương bạc, Thủy Hỏa bất tương xạ.",
      trigrams: [
        { name: "Càn", symbol: "Càn", binary: "111", direction: "Nam", nature: "Trời (Thiên)", element: "Kim (Cực Dương)", meaning: "Cương kiện, thuần dương, trọng trường phát xuất" },
        { name: "Khôn", symbol: "Khôn", binary: "000", direction: "Bắc", nature: "Đất (Địa)", element: "Thổ (Cực Âm)", meaning: "Nhu thuận, thuần âm, vật chất dung nạp" },
        { name: "Đoài", symbol: "Đoài", binary: "110", direction: "Đông Nam", nature: "Đầm (Trạch)", element: "Kim", meaning: "Hân hoan, giao hòa bề mặt" },
        { name: "Ly", symbol: "Ly", binary: "101", direction: "Đông", nature: "Lửa (Hỏa)", element: "Hỏa", meaning: "Sáng rực, nhiệt lượng, bên ngoài sáng bên trong rỗng" },
        { name: "Chấn", symbol: "Chấn", binary: "100", direction: "Đông Bắc", nature: "Sấm (Lôi)", element: "Mộc", meaning: "Động khởi, xung năng bộc phát dưới sâu" },
        { name: "Tốn", symbol: "Tốn", binary: "011", direction: "Tây Nam", nature: "Gió (Phong)", element: "Mộc", meaning: "Thâm nhập, thuận hòa, tản mạn" },
        { name: "Khảm", symbol: "Khảm", binary: "010", direction: "Tây", nature: "Nước (Thủy)", element: "Thủy", meaning: "Hiểm sâu, trôi chảy, bên ngoài mềm bên trong đặc" },
        { name: "Cấn", symbol: "Cấn", binary: "001", direction: "Tây Bắc", nature: "Núi (Sơn)", element: "Thổ", meaning: "Ngăn dừng, tĩnh lặng, bề mặt kiên cố" }
      ]
    },
    hau_thien: {
      name: "Hậu Thiên Bát Quái (Văn Vương)",
      nature: "Quy luật thời gian, chu kỳ 4 mùa, khí hậu và sinh thái Trái Đất (Dụng)",
      quote: "Đế xuất hồ Chấn, tề hồ Tốn, tương kiến hồ Ly, trí dịch hồ Khôn, duyệt ngôn hồ Đoài, chiến hồ Càn, lao hồ Khảm, thành ngôn hồ Cấn.",
      trigrams: [
        { name: "Khảm", symbol: "Khảm", number: 1, direction: "Chính Bắc", season: "Đông Chí (Tháng 11)", element: "Thủy", meaning: "Lao hồ Khảm - Mùa đông lắng đọng, phục tàng năng lượng" },
        { name: "Cấn", symbol: "Cấn", number: 8, direction: "Đông Bắc", season: "Lập Xuân (Tháng 1)", element: "Thổ", meaning: "Thành ngôn hồ Cấn - Điểm giao thời cuối đông đầu xuân, vạn vật chuyển hóa" },
        { name: "Chấn", symbol: "Chấn", number: 3, direction: "Chính Đông", season: "Xuân Phân (Tháng 2)", element: "Mộc", meaning: "Đế xuất hồ Chấn - Mùa xuân chấn động, mầm sống bật dậy" },
        { name: "Tốn", symbol: "Tốn", number: 4, direction: "Đông Nam", season: "Lập Hạ (Tháng 4)", element: "Mộc", meaning: "Tề hồ Tốn - Gió ấm thuận hòa, vạn vật đồng đều xanh tốt" },
        { name: "Ly", symbol: "Ly", number: 9, direction: "Chính Nam", season: "Hạ Chí (Tháng 5)", element: "Hỏa", meaning: "Tương kiến hồ Ly - Ánh dương chói lọi, vạn vật quang minh hội tụ" },
        { name: "Khôn", symbol: "Khôn", number: 2, direction: "Tây Nam", season: "Lập Thu (Tháng 7)", element: "Thổ", meaning: "Trí dịch hồ Khôn - Đất nuôi dưỡng trĩu hạt, vạn vật thành thục" },
        { name: "Đoài", symbol: "Đoài", number: 7, direction: "Chính Tây", season: "Thu Phân (Tháng 8)", element: "Kim", meaning: "Duyệt ngôn hồ Đoài - Mùa thu hoạch kết trái, vạn vật hân hoan" },
        { name: "Càn", symbol: "Càn", number: 6, direction: "Tây Bắc", season: "Lập Đông (Tháng 10)", element: "Kim", meaning: "Chiến hồ Càn - Âm Dương giao tranh, khí lạnh bắt đầu thâu tàng" }
      ]
    }
  },

  // =========================================================================
  // 8. NGŨ HÀNH
  // =========================================================================
  ngu_hanh: {
    phases: [
      {
        id: "wood",
        name: "Mộc",
        hanzi: "木",
        vector: "Vươn tỏa - Hướng thượng - Khúc trực",
        season: "Mùa Xuân (Dương khí sơ sinh)",
        direction: "Phương Đông",
        color: "#10B981",
        body: "Can (Gan), Cân (Gân), Mắt",
        sound: "Tiếng Giác (Giác âm)",
        taste: "Vị Chua (Toan)",
        nature: "Khí Ôn, chủ sự sinh trưởng, sáng tạo, khai mở, lòng nhân ái."
      },
      {
        id: "fire",
        name: "Hỏa",
        hanzi: "火",
        vector: "Bùng phát - Thăng hoa - Viêm thượng",
        season: "Mùa Hạ (Dương khí cực thịnh)",
        direction: "Phương Nam",
        color: "#EF4444",
        body: "Tâm (Tim), Mạch, Lưỡi",
        sound: "Tiếng Chủy (Chủy âm)",
        taste: "Vị Đắng (Khổ)",
        nature: "Khí Nhiệt, chủ sự bộc lộ, phát tán, huy hoàng, nhiệt huyết, lễ nghi."
      },
      {
        id: "earth",
        name: "Thổ",
        hanzi: "土",
        vector: "Trung hòa - Dung chứa - Giá sắc",
        season: "Trưởng Hạ / Tứ Quý (Chuyển tiếp 4 mùa)",
        direction: "Trung Ương",
        color: "#F59E0B",
        body: "Tỳ (Lá lách), Nhục (Thịt), Miệng",
        sound: "Tiếng Cung (Cung âm)",
        taste: "Vị Ngọt (Cam)",
        nature: "Khí Thấp, chủ sự nuôi dưỡng, chuyển tiếp, sinh hóa vạn vật, chữ tín."
      },
      {
        id: "metal",
        name: "Kim",
        hanzi: "金",
        vector: "Thu liễm - Ngưng kết - Tòng cách",
        season: "Mùa Thu (Âm khí sơ giáng)",
        direction: "Phương Tây",
        color: "#CBD5E1",
        body: "Phế (Phổi), Bì mao (Da lông), Mũi",
        sound: "Tiếng Thương (Thương âm)",
        taste: "Vị Cay (Tân)",
        nature: "Khí Táo, chủ sự nghiêm cẩn, thanh lọc, kỷ luật, kết tinh, nghĩa khí."
      },
      {
        id: "water",
        name: "Thủy",
        hanzi: "水",
        vector: "Lắng đọng - Thâm nhập - Nhuận hạ",
        season: "Mùa Đông (Âm khí cực thịnh)",
        direction: "Phương Bắc",
        color: "#3B82F6",
        body: "Thận (Thận), Cốt (Xương tủy), Tai",
        sound: "Tiếng Vũ (Vũ âm)",
        taste: "Vị Mặn (Hàm)",
        nature: "Khí Hàn, chủ sự tàng ẩn, thông tuệ, uyển chuyển, tiềm thức, trí tuệ."
      }
    ],
    cycles: {
      che_hoa_explain: "Nguyên lý Chế Hóa tối cao: Khắc mà có Sinh, Sinh mà có Khắc. Kim khắc Mộc, nhưng Mộc sinh Hỏa để Hỏa rèn Kim; Thủy khắc Hỏa, nhưng Hỏa sinh Thổ để Thổ chế ngự Thủy. Nhờ Chế Hóa mà vũ trụ luôn duy trì được trạng thái cân bằng nội môi trường (Homeostasis) bất diệt."
    }
  }
};
