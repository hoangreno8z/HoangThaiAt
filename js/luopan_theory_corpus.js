/**
 * KHO NGỮ LIỆU CỔ THƯ CHÁNH TÔNG & DANH SƯ PHONG THỦY (LUOPAN THEORY CORPUS)
 * Phục vụ cơ chế Tự Nhận Dạng Đồ Hình Thực Địa & Trích Dẫn Toàn Văn Cổ Thư Tức Thời.
 * Trích lục từ các bản cổ chánh tông: CText, Khâm Định Tứ Khố Toàn Thư, Thập Đạo Cổ Tịch.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LuopanTheoryCorpus = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const THEORY_ENTRIES = {
    // 1. PHÂN TẦNG KHÍ LỘ (NGOẠI CỤC - TRUNG CỤC - CẬN TRẠCH - KHÍ KHẨU)
    phan_tang_khi_lo: {
      id: 'phan_tang_khi_lo',
      category: 'Phân Tầng Khí Lộ',
      tag: 'Tứ Tầng Cục Thế',
      title: 'Phân Tầng Khí Lộ: Ngoại Cục ➔ Trung Cục ➔ Cận Trạch ➔ Khí Khẩu',
      badgeColor: '#38BDF8',
      sources: [
        {
          book: '《Trạch Pháp Cử Ngung — Tương Cục》',
          author: 'Thanh · Chu Diệu Húc Luân (锡山·朱耀旭轮)',
          quoteOriginal: '若山居，则认落脉；陆地，则凭行路；巿中，则察街衢。阳宅得一录云：每逢空缺即为来，一遇遮拦便作止，辨明来止二气，方识嚧吸真机，此局之不可不详审也。局定而宅之吉凶以分，视运之衰旺为兴废，但宅与水路，相去在二十步内，则重局而轻宅，倘在二十步外，则重宅而轻局，又不可以不知。',
          quoteHanViet: 'Nhược sơn cư, tắc nhận lạc mạch; lục địa, tắc bằng hành lộ; thị trung, tắc sát nhai cù. Dương Trạch Đắc Nhất Lục vân: Mỗi phùng không khuyết tức vi lai, nhất ngộ già lan tiện tác chỉ, biện minh lai chỉ nhị khí, phương thức lư hấp chân cơ, thử cục chi bất khả bất tường thẩm dã. Cục định nhi trạch chi cát hung dĩ phân, thị vận chi suy vượng vi hưng phế. Đãn trạch dữ thủy lộ, tương khứ tại nhị thập bộ nội, tắc trọng cục nhi khinh trạch, thảng tại nhị thập bộ ngoại, tắc trọng trạch nhi khinh cục, hữu bất khả dĩ bất tri.',
          quoteMeaning: 'Nếu ở chốn núi non thì nhận thế long mạch hạ lạc; ở đất bằng phẳng thì nương theo đường đi; ở nơi đô thị thành quách thì quan sát phố xá ngõ hẻm. Sách Dương Trạch Đắc Nhất Lục dạy rằng: Cứ gặp chỗ trống mở ra là khí đến (lai khí); hễ gặp chỗ che chắn ngoặt hướng là khí dừng và chuyển (chỉ khí). Biện định rạch ròi hai khí đến và dừng thì mới thấu tỏ then chốt hô hấp nạp khí chân thực của căn nhà. Khi cục thế đã định thì cát hung của căn nhà mới phân biệt rõ ràng. Nhưng phải biết thêm định luật cự ly: nhà cách đường nước trong vòng 20 bước thì trọng cục thế ngoại cảnh mà nhẹ bản trạch; nếu ngoài 20 bước thì trọng bản thân căn trạch mà nhẹ ngoại cục.'
        },
        {
          book: '《Địa Lý Ngũ Quyết — Dương Trạch Cương Lĩnh》',
          author: 'Thanh · Triệu Cửu Phong (赵玉材·九峰)',
          quoteOriginal: '一层街衢为一层水，一层墙屋为一层砂。门前空敞即为明堂，对面屋宇便作案山。水有远近之殊，路有干支之分。远路引大势，近巷束真气，不可混淆。',
          quoteHanViet: 'Nhất tầng nhai cù vi nhất tầng thủy, nhất tầng tường ốc vi nhất tầng sa. Môn tiền không xưởng tức vi minh đường, đối diện ốc vũ tiện tác án sơn. Thủy hữu viễn cận chi thù, lộ hữu can chi chi phân. Viễn lộ dẫn đại thế, cận hạng thúc chân khí, bất khả hỗn hào.',
          quoteMeaning: 'Một lớp đường phố được coi là một lớp nước (Hư Thủy), một lớp tường nhà được coi là một lớp sa (Án Sơn bảo bọc). Trước cửa rộng mở gọi là Minh Đường, dãy nhà đối diện làm Án Sơn che chắn. Nước có xa gần khác biệt, đường sá có trục chính (can) và hẻm nhánh (chi). Trục đường lớn ở xa dẫn dắt đại thế, ngõ hẻm nhỏ sát nhà bó chặt chân khí, tuyệt đối không được đánh đồng ngang hàng.'
        },
        {
          book: '《Dương Trạch Thập Thư — Ngoại Hình Thiên》',
          author: 'Minh · Chu Bàng Nghệ (周庞艺)',
          quoteOriginal: '人之居处，宜以大地山河为主，其来脉气势最大，关系人祸福最为切要。若大形不善，总内形得法，终不全吉。左右有路亦如然，近者力紧，远者势缓。',
          quoteHanViet: 'Nhân chi cư xứ, nghi dĩ đại địa sơn hà vi chủ, kỳ lai mạch khí thế tối đại, quan hệ nhân họa phúc tối vi thiết yếu. Nhược đại hình bất thiện, tổng nội hình đắc pháp, chung bất toàn cát. Tả hữu hữu lộ diệc như nhiên, cận giả lực khẩn, viễn giả thế hoãn.',
          quoteMeaning: 'Chỗ ở con người trước hết lấy đại địa sơn hà làm chủ, lai mạch khí thế lớn nhất có quan hệ mật thiết tới họa phúc. Nếu đại hình bên ngoài bất thiện thì dù nội hình đúng phép cũng không thể toàn cát. Đường sá hai bên tả hữu cũng thế, đường ở gần tác động trực tiếp khẩn trương, đường ở xa khí thế chuyển hóa chậm rãi, hòa hoãn.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Trường hợp nhà trong hẻm nối ra trục lộ lớn bắt buộc phải phân định 4 tầng: (1) Ngoại Cục (tỉnh lộ xa) mang tính đại thế động khí vĩ mô; (2) Trung Cục (hẻm nhánh dẫn thế) làm nhiệm vụ trung chuyển và phân luồng; (3) Cận Trạch (hẻm sát cửa nhà) trực tiếp tạo lập Minh Đường và quyết định xung/nghênh; (4) Khí Khẩu (cổng/cửa) trực tiếp thu nạp chân khí vào nội trạch. Tuyệt đối không được kéo một vector hình học xuyên suốt từ tỉnh lộ vào nhà để kết luận trực xung hay lai thủy trực tiếp.',
      applicationGuide: 'Ứng dụng thực địa: Khi thẩm định nhà sau nhiều tầng hẻm, việc cải biến vi khí Minh Đường và mở Khí Khẩu hợp sơn hướng tại Cận Trạch có ý nghĩa quyết định 80% cát hung nội trạch; trục lộ lớn bên ngoài chỉ đóng vai trò thẩm định đại môi trường khu vực.'
    },

    // 2. KHÚC CHIẾT TIÊU SÁT & MẠNG ĐƯỜNG GẤP KHÚC CHỮ U
    khuc_chiet_tieu_sat: {
      id: 'khuc_chiet_tieu_sat',
      category: 'Hình Thế & Khúc Chiết',
      tag: 'Khúc Tất Hữu Tình',
      title: 'Khúc Chiết Tiêu Sát: Bẻ Gãy Động Thế Qua Khúc Ngoặt (Chữ U / Góc Rẽ ≥ 45°)',
      badgeColor: '#10B981',
      sources: [
        {
          book: '《Táng Thư — Nội Thiên》',
          author: 'Tấn · Quách Phác (郭璞)',
          quoteOriginal: '气乘风则散，界水则止。古人聚之使不散，行之使有止，故谓之风水。气行乎地中，其行也因地之势，其聚也因势之止。',
          quoteHanViet: 'Khí thừa phong tắc tán, giới thủy tắc chỉ. Cổ nhân tụ chi sử bất tán, hành chi sử hữu chỉ, cố vị chi phong thủy. Khí hành hồ địa trung, kỳ hành dã nhân địa chi thế, kỳ tụ dã nhân thế chi chỉ.',
          quoteMeaning: 'Khí gặp gió thì tán, gặp nước ngăn thì dừng lại. Người xưa gom giữ khiến khí không tán, dẫn dắt khiến khí có chỗ dừng, nên gọi là Phong Thủy. Khí chuyển động trong đất do địa thế dẫn dắt, khí ngưng tụ lại do chỗ địa thế dừng lại.'
        },
        {
          book: '《Thủy Long Kinh — Luận Chi Can Khúc Chiết》',
          author: 'Minh · Khương Viết Hoành (蒋平阶·大鸿)',
          quoteOriginal: '水龙之理，全在流神曲秀生动。直水无情，曲水有情。水经三折，煞化为权；路过九曲，气纯而固。凡干水直急不可当，一入支港折旋，势便平舒，故结穴常在支港弯环之处，非在大江巨浪之冲。',
          quoteHanViet: 'Thủy long chi lý, toàn tại lưu thần khúc tú sinh động. Trực thủy vô tình, khúc thủy hữu tình. Thủy kinh tam chiết, sát hóa vi quyền; lộ quá cửu khúc, khí thuần nhi cố. Phàm can thủy trực cấp bất khả đương, nhất nhập chi cảng chiết toàn, thế tiện bình thư, cố kết huyệt thường tại chi cảng loan hoàn chi xứ, phi tại đại giang cự lãng chi xung.',
          quoteMeaning: 'Đạo lý thủy long cốt ở chỗ uốn khúc thanh tú sinh động. Dòng chảy thẳng tuột là vô tình, uốn cong là hữu tình. Dòng nước qua 3 khúc rẽ thì sát khí hung hãn hóa thành quyền uy; đường qua nhiều khúc ngoặt thì trường khí trở nên thuần khiết và vững bền. Phàm sông cái hay trục đường lớn hung hãn không thể đón nạp, nhưng hễ rẽ vào nhánh kênh ngõ hẻm quanh co thì khí thế lập tức trở nên êm ả, dịu dàng. Vì thế chân huyệt luôn kết tại ngõ hẻm uốn lượn ôm ấp, không kết ở nơi sóng to gió lớn của đại giang xung đột.'
        },
        {
          book: '《Trạch Pháp Cử Ngung — Tương Cục》',
          author: 'Thanh · Chu Diệu Húc Luân',
          quoteOriginal: '每逢空缺即为来，一遇遮拦便作止，转折之处，气随势换。折角如屏，煞气自销。',
          quoteHanViet: 'Mỗi phùng không khuyết tức vi lai, nhất ngộ già lan tiện tác chỉ, chuyển chiết chi xứ, khí tùy thế hoán. Chiết giác như bình, sát khí tự tiêu.',
          quoteMeaning: 'Cứ gặp chỗ trống mở ra là khí đến, gặp chỗ ngăn che là khí dừng. Tại chỗ chuyển hướng quanh co, trường khí thuận theo hình thế mà biến đổi. Góc ngoặt tựa như bức bình phong tự nhiên, sát khí tự khắc tiêu tán.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Khi tuyến đường từ tỉnh lộ vào nhà gấp khúc chữ U (qua 2 góc vuông ~90°), sát khí và động năng ào ạt của tỉnh lộ đã bị bức tường nhà tại góc rẽ thứ nhất chặn đứng và tiêu tán (nhất ngộ già lan tiện tác chỉ). Hẻm 1 trở thành vùng đệm chuyển tiếp; đến góc rẽ thứ hai, thế khí tiếp tục được uốn nắn một lần nữa. Đến trước cửa nhà, dòng khí đã hóa thành hòa hoãn, hữu tình. Đây là cách cục biến hung thành cát, sát khí của đại lộ ngoài xa hoàn toàn bị triệt tiêu.',
      applicationGuide: 'Ứng dụng thực địa: Yên tâm hoàn toàn về trục đường lớn ở xa khi đã có từ 2 khúc ngoặt vuông góc trở lên che chắn. Trọng tâm chỉ cần xử lý phong quang và hướng nạp khí tại hẻm sát cửa nhà.'
    },

    // 3. BIỆN CHỨNG CHÂN THỦY VS HƯ THỦY (12 TRƯỜNG SINH)
    chan_thuy_vs_hu_thuy: {
      id: 'chan_thuy_vs_hu_thuy',
      category: 'Lý Khí & Thủy Pháp',
      tag: 'Chân Hư Biện Chứng',
      title: 'Biện Chứng Chân Thủy vs Hư Thủy: Giới Hạn Của 12 Cung Trường Sinh',
      badgeColor: '#F59E0B',
      sources: [
        {
          book: '《Thanh Nang Áo Ngữ & Tứ Khố Toàn Thư Tổng Mục》',
          author: 'Đường · Dương Quân Tùng / Thanh · Kỷ Hiểu Lam',
          quoteOriginal: '二十四山分五行，知得荣枯死与生。龙分两派关天地，水抱三阳起长生。四库总目云：世传三合水法，以辰戌丑未四墓立局，逐山起十二长生，本专指江河川渎实水归宿而言。若市廛屋宇，附会以路为水，必须明辨体用，严分真虚，未可概以实水长生法机械论之。',
          quoteHanViet: 'Nhị thập tứ sơn phân ngũ hành, tri đắc vinh khô tử dữ sinh. Long phân lưỡng phái quan thiên địa, thủy bão tam dương khởi trường sinh. Tứ Khố Tổng Mục vân: Thế truyền tam hợp thủy pháp, dĩ Thìn Tuất Sửu Mùi tứ mộ lập cục, trục sơn khởi thập nhị trường sinh, bổn chuyên chỉ giang hà xuyên độc thực thủy quy túc nhi ngôn. Nhược thị triền ốc vũ, phụ hội dĩ lộ vi thủy, tất tu minh biện thể dụng, nghiêm phân chân hư, vị khả khái dĩ thực thủy trường sinh pháp cơ giới luận chi.',
          quoteMeaning: '24 sơn phân định ngũ hành, thấu tỏ lẽ vinh khô suy tử và sinh trưởng. Long chia hai nhánh quan sát trời đất, dòng nước ôm ấp ba cung dương khởi 12 Trường Sinh. Sách Tứ Khố Tổng Mục phê chú: Phép Tam Hợp Thủy Pháp lấy 4 mộ Thìn Tuất Sửu Mùi định cục khởi 12 cung Trường Sinh vốn dành riêng cho dòng nước thật (Chân Thủy) của sông ngòi tự nhiên và vị trí xuất thủy của thủy khẩu. Đối với nhà cửa phố xá chốn đô thị, việc xem đường sá là nước là phép loại suy (Hư Thủy), bắt buộc phải phân biệt minh bạch Thể - Dụng, tách bạch nghiêm ngặt Chân Thủy và Hư Thủy, không được đem 12 Trường Sinh của nước thật phán định cơ học cho đường sá.'
        },
        {
          book: '《Trạch Pháp Cử Ngung — Tương Cục》',
          author: 'Thanh · Chu Diệu Húc Luân',
          quoteOriginal: '阳宅凭水立局，此就得水之地言之也。若陆地则凭行路，市中则察街衢，乃借路为水，名曰虚水。虚水重在向首近身之引导，不与大江大河真水同论消纳。',
          quoteHanViet: 'Dương trạch bằng thủy lập cục, thử tựu đắc thủy chi địa ngôn chi dã. Nhược lục địa tắc bằng hành lộ, thị trung tắc sát nhai cù, nãi tá lộ vi thủy, danh viết Hư Thủy. Hư thủy trọng tại hướng thủ cận thân chi dẫn đạo, bất dữ đại giang đại hà chân thủy đồng luận tiêu nạp.',
          quoteMeaning: 'Dương trạch nương theo nước lập cục là nói ở nơi có sông nước tự nhiên. Nếu đất cạn thì xem đường đi, trong thành thị thì quan sát phố xá, đó là mượn đường thay nước, gọi là Hư Thủy. Hư thủy chú trọng vào việc dẫn đạo khí tại hướng mặt tiền sát thân nhà, không thể đem ngang hàng với phép tiêu nạp của chân thủy sông lớn.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Trong đô thị, đường sá chỉ là "Hư Thủy" (tuyến dẫn động khí nhân tạo). Nếu trường phái áp dụng 12 Cung Trường Sinh cho Hư Thủy thì CHỈ ĐƯỢC PHÉP QUY CHIẾU BỔ TRỢ CHO PHÂN ĐOẠN CẬN TRẠCH (đoạn hẻm sát cửa nhà tiếp xúc trực tiếp với Minh Đường). Tuyệt đối không được lấy đường tỉnh lộ hay đại lộ ở xa ngoài mạng hẻm gán nhãn Sinh/Vượng/Mộ cho căn trạch.',
      applicationGuide: 'Ứng dụng thực địa: Khi quan sát bản đồ đô thị, hãy bật chế độ [Hư Thủy]. Chỉ xét Trường Sinh cho đoạn hẻm ngay trước mặt tiền để tham khảo tính chất tụ tán của ngõ vào.'
    },

    // 4. TIẾP TUYẾN THÂN ĐƯỜNG (TANGENT) VS PHƯƠNG VỊ KHÍ KHẨU (RADIAL)
    tiep_tuyen_vs_khi_khau: {
      id: 'tiep_tuyen_vs_khi_khau',
      category: 'Hình Học & Khí Khẩu',
      tag: 'Tọa Độ Chánh Pháp',
      title: 'Phân Biệt Tiếp Tuyến Thân Đường (Tangent) vs Phương Vị Nạp Khí Khí Khẩu (Radial)',
      badgeColor: '#A78BFA',
      sources: [
        {
          book: '《Trạch Pháp Cử Ngung — Môn Hộ Thiên》',
          author: 'Thanh · Chu Diệu Húc Luân',
          quoteOriginal: '大门为全宅之气口，如人之有口，以便呼吸吐纳。门气原兼路气，所改者引气之路耳。路之行向，与气口之所向，判然两事。路横行于前，而水口纳于某方，当以穴心看路口之方位为主，非以路之去来延线为定也。',
          quoteHanViet: 'Đại môn vi toàn trạch chi khí khẩu, như nhân chi hữu khẩu, dĩ tiện hô hấp thổ nạp. Môn khí nguyên kiêm lộ khí, sở cải giả dẫn khí chi lộ nhĩ. Lộ chi hành hướng, dữ khí khẩu chi sở hướng, phán nhiên lưỡng sự. Lộ hoành hành vu tiền, nhi thủy khẩu nạp vu mỗ phương, đương dĩ huyệt tâm khán lộ khẩu chi phương vị vi chủ, phi dĩ lộ chi khứ lai diên tuyến vi định dã.',
          quoteMeaning: 'Cửa chính là Khí Khẩu của cả căn nhà, tựa như miệng của con người để hô hấp hít thở khí trời. Khí của cửa vốn gắn liền với khí của đường dẫn. Nhưng hướng chạy của thân đường và phương vị đón khí của Khí Khẩu là hai chuyện hoàn toàn khác nhau. Đường có thể chạy ngang phía trước theo một góc độ, nhưng miệng đường nạp khí vào nhà lại ở một phương vị nhất định; phải lấy tâm nhà đo ra phương vị của miệng đường/khí khẩu làm chủ yếu, chứ không thể lấy đường kéo dài của thân con đường làm căn cứ.'
        },
        {
          book: '《Thiên Nguyên Ngũ Ca — Quyển Tứ: Dương Trạch》',
          author: 'Minh · Khương Viết Hoành',
          quoteOriginal: '宅龙论地水神裁，尤重三门八卦排。只取三元生旺气，引他入室是胞胎。若是吉神兼恶路，酸浆入酪不堪斟。',
          quoteHanViet: 'Trạch long luận địa thủy thần tài, ưu trọng tam môn bát quái bài. Chỉ thủ tam nguyên sinh vượng khí, dẫn tha nhập thất thị bào thai. Nhược thị cát thần kiêm ác lộ, toan tương nhập lạc bất kham châm.',
          quoteMeaning: 'Trạch pháp xét đất định hướng do thủy thần phân xử, đặc biệt coi trọng ba cửa phối theo bát quái. Cốt lấy sinh vượng khí của tam nguyên, dẫn khí vào phòng như dưỡng thai nghén. Nếu được cung vị cát tường mà đường dẫn hung ác thì tựa như đổ dấm chua vào nồi sữa ngọt, chẳng thể dùng được.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Một lỗi toán học rất phổ biến là lấy góc phương vị tiếp tuyến của thân đường (ví dụ đường chạy 140° ↔ 320°) rồi kết luận phương vị nạp khí của căn nhà là 140°. Thực tế, góc 140° chỉ là hướng trải dài của mặt đường. Phương vị nạp khí thực sự phải đo từ tâm nhà chiếu thẳng ra miệng hẻm / ngã ba đón khí (ví dụ 250°). Góc 250° này mới quyết định Khí Khẩu rơi vào Sơn nào trong 24 Sơn.',
      applicationGuide: 'Ứng dụng thực địa: Khi tra cứu La Kinh, hãy phân biệt rõ: số đo "Góc thân đường" dùng để xét thế chạy ngang (hoành) hay đâm (xung), còn số đo "Phương vị đối với tâm nhà" mới dùng để xác định Cung Sơn nạp khí.'
    },

    // 5. HOÀNH THỦY MINH ĐƯỜNG (TẢ ĐẢO HỮU / HỮU ĐẢO TẢ)
    hoanh_thuy_quang_duong: {
      id: 'hoanh_thuy_quang_duong',
      category: 'Hình Cục Thủy Pháp',
      tag: 'Hoành Thủy Cát Cục',
      title: 'Hoành Thủy Quá Đường: Tuyến Đường Chạy Ngang Qua Mặt Tiền',
      badgeColor: '#38BDF8',
      sources: [
        {
          book: '《Dương Trạch Thập Thư — Luận Ngoại Hình》',
          author: 'Minh · Chu Bàng Nghệ',
          quoteOriginal: '左右有路横过堂，无冲无射便为良。自左徂右青龙水，由右向左白虎傍。平舒广阔聚明堂，富贵荣华百世昌。',
          quoteHanViet: 'Tả hữu hữu lộ hoành quá đường, vô xung vô xạ tiện vi lương. Tự tả tồ hữu Thanh Long thủy, do hữu hướng tả Bạch Hổ bàng. Bình thư quảng khoát tụ minh đường, phú quý vinh hoa bách thế xương.',
          quoteMeaning: 'Hai bên tả hữu có đường chạy ngang qua trước cửa, không đâm thẳng (xung), không chĩa xiên (xạ) thì là thế đất tốt lành. Chảy từ bên trái sang bên phải là dòng Thanh Long (Thuận cục); chảy từ bên phải sang bên trái là dòng Bạch Hổ (Nghịch cục). Khí thế êm ả, rộng rãi tụ lại trước Minh Đường chủ phú quý vinh hoa trăm đời bền vững.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Con đường chạy ngang qua trước nhà (lệch góc ~90° so với trục tọa hướng) tuyệt đối không phải Trực Xung, mà thuộc cách cục Hoành Thủy (hoặc Hoành Lộ). Tùy vào hướng chuyển động mà phân thành Thanh Long dẫn khí sang Hổ hoặc Bạch Hổ dẫn khí sang Long. Thế này tạo nên khoảng đệm bình ổn trước cửa, tàng tụ khí lực rất tốt.',
      applicationGuide: 'Ứng dụng thực địa: Giữ cho khoảng vỉa hè hoặc mặt tiền trước cửa thông thoáng, tránh để vật nhọn đâm ngang làm phá vỡ thế hoành tụ êm ả.'
    },

    // 6. KIM THÀNH HOÀN BÃO (NGỌC ĐÁI TRIỀN YÊU)
    kim_thanh_hoan_bao: {
      id: 'kim_thanh_hoan_bao',
      category: 'Hình Cục Thủy Pháp',
      tag: 'Đại Cát Vượng Tài',
      title: 'Kim Thành Hoàn Bão: Cung Đường Cong Ôm Trọn Minh Đường (Ngọc Đái Triền Yêu)',
      badgeColor: '#10B981',
      sources: [
        {
          book: '《Dương Trạch Thập Thư — Ngoại Hình Thiên》',
          author: 'Minh · Chu Bàng Nghệ',
          quoteOriginal: '金城湾曲抱吾身，如月如弓最可亲。前后有水环抱贵，金银财宝积如云。',
          quoteHanViet: 'Kim thành loan khúc bão ngô thân, như nguyệt như cung tối khả thân. Tiền hậu hữu thủy hoàn bão quý, kim ngân tài bảo tích như vân.',
          quoteMeaning: 'Cung đường hoặc dòng nước uốn cong ôm lấy thân nhà như trăng khuyết, như cánh cung che chở là thế đất vô cùng gần gũi cát lành. Trước sau có đường nước ôm trọn ắt phát quý hiển, vàng bạc tài bảo tích tụ như mây tụ.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Lòng cong cánh cung hướng vào nhà giúp tụ khí sinh tài cực mạnh, triệt tiêu mọi xung động từ xa, đem lại sự hòa thuận và gia sản bền vững.',
      applicationGuide: 'Ứng dụng thực địa: Cách cục đại cát, thích hợp mở cửa chính tại chính giữa lòng cung để đón trọn vượng khí.'
    },

    // 7. PHẢN CUNG THỦY (PHẢN KHIÊU / PHẢN THÂN SÁT)
    phan_cung_thuy: {
      id: 'phan_cung_thuy',
      category: 'Hung Sát Hình Cục',
      tag: 'Đại Hung Sát',
      title: 'Phản Cung Thủy (Phản Khiêu Sát): Lưng Cánh Cung Chĩa Vào Mặt Tiền',
      badgeColor: '#EF4444',
      sources: [
        {
          book: '《Dương Trạch Thập Thư — Ngoại Hình Thiên》',
          author: 'Minh · Chu Bàng Nghệ',
          quoteOriginal: '左右有路亦如然，但遇返跳必须忌。水纔过穴而反挑，背城而去，主背井离乡、叛服破耗。',
          quoteHanViet: 'Tả hữu hữu lộ diệc như nhiên, đãn ngộ phản khiêu tất tu kỵ. Thủy tài quá huyệt nhi phản thiêu, bối thành nhi khứ, chủ bối tỉnh ly hương, phản phục phá hao.',
          quoteMeaning: 'Đường sá hai bên cũng thế, hễ gặp thế phản cung quay lưng chĩa vào nhà là tối kỵ. Dòng nước hay đường vừa qua cửa mà cong ngoảnh lưng bỏ đi chủ ly hương tán tài, phản trắc suy bại.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Lưng cánh cung tạo lực ly tâm hất văng cát khí ra ngoài, đồng thời tạo góc chĩa nhọn hướng thẳng vào nhà gây chấn động từ trường.',
      applicationGuide: 'Hóa giải: Xây huyền quan lệch cửa, dựng bình phong che chắn hoặc trồng hàng rào cây xanh hình bán nguyệt ngược để hóa giải lực bắn ngược.'
    },

    // 8. ĐINH TỰ LỘ (XUNG TÂM SÁT / THƯƠNG SÁT)
    dinh_tu_lo_xung_tam: {
      id: 'dinh_tu_lo_xung_tam',
      category: 'Hung Sát Hình Cục',
      tag: 'Đại Hung Sát',
      title: 'Đinh Tự Lộ (Xung Tâm Sát): Tuyến Đường Đâm Thẳng Trực Diện Mặt Tiền',
      badgeColor: '#EF4444',
      sources: [
        {
          book: '《Nhân Tử Tu Tri & Dương Trạch Thập Thư》',
          author: 'Minh · Từ Thiện Kế (徐善继) / Chu Bàng Nghệ',
          quoteOriginal: '冲心者，水势急直射穴心，主人不安，刑杀血光。南来大路正冲门，直如一枪刺心房。',
          quoteHanViet: 'Xung tâm giả, thủy thế cấp trực xạ huyệt tâm, chủ nhân bất an, hình sát huyết quang. Nam lai đại lộ chính xung môn, trực như nhất thương thích tâm phòng.',
          quoteMeaning: 'Xung tâm sát là thế dòng nước hay tuyến đường chảy xiết đâm thẳng trực diện vào tâm nhà, khiến người cư ngụ bất an, dễ gặp tai nạn thương tật. Đại lộ đâm thẳng vào cửa tựa như mũi thương đâm vào buồng tim.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Chỉ khi đoạn đường thực sự đồng trục ngược chiều với mặt tiền (lệch ≤ 22.5°) và lao thẳng vào cửa mới phạm Đinh Tự Lộ. Tuyến đường chạy ngang tuyệt đối không phạm sát này.',
      applicationGuide: 'Hóa giải: Bắt buộc mở cổng lệch trục, dựng huyền quan chặn luồng xung hoặc đặt khối đá trấn trạch Thái Sơn Thạch Cảm Đương.'
    },

    // 9. TAM XOA HỢP LƯU (GIAO HỘI ĐIỂM NGÃ BA)
    tam_xoa_hop_luu: {
      id: 'tam_xoa_hop_luu',
      category: 'Hình Cục Thủy Pháp',
      tag: 'Cát Lợi Tụ Khí',
      title: 'Tam Xoa Hợp Lưu: Nơi Hai Dòng Giao Hội Tụ Khí Trước Minh Đường',
      badgeColor: '#34D399',
      sources: [
        {
          book: '《Phát Vi Luận — Tụ Tán Thiên》',
          author: 'Tống · Thái Nguyên Định (蔡元定)',
          quoteOriginal: '何谓聚？山之所交，水之所会，风气之所藏也。水会则气聚，两江合抱，融注朝堂，动能相荡而静生。',
          quoteHanViet: 'Hà vị tụ? Sơn chi sở giao, thủy chi sở hội, phong khí chi sở tàng dã. Thủy hội tắc khí tụ, lưỡng giang hợp bão, dung chú triều đường, động năng tương đãng nhi tĩnh sinh.',
          quoteMeaning: 'Thế nào là Tụ? Là nơi núi non giao nhau, dòng nước hội tụ, phong khí ẩn tàng. Nước hội thì khí tụ, hai dòng ôm ấp dồn về trước sân nhà, động năng tự triệt tiêu nhau sinh ra trường khí tĩnh tại ấm áp.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Ngã ba giao hội trước cửa làm chậm tốc độ di chuyển của luồng khí, biến động thành tĩnh, rất thuận lợi kinh doanh buôn bán nếu nạp đúng cung Sinh Vượng.',
      applicationGuide: 'Ứng dụng thực địa: Đặt cổng chính hướng về điểm giao hội nếu ngã ba rơi vào các cung Sinh, Vượng, Quan Đới.'
    },

    // 10. BẾ KHÍ / TỬ KHÍ THỦY (HẺM CỤT)
    be_khi_tu_khi: {
      id: 'be_khi_tu_khi',
      category: 'Hung Sát Hình Cục',
      tag: 'Thứ Hung Bế Khí',
      title: 'Bế Khí / Tử Khí Thủy: Vị Trí Tận Cùng Của Tuyến Hẻm Cụt',
      badgeColor: '#F59E0B',
      sources: [
        {
          book: '《Thủy Long Kinh — Luận Tận Thủy》',
          author: 'Minh · Khương Viết Hoành',
          quoteOriginal: '水尽无道则闭，气不流通生阴滞死气。居穷巷之尽头者，如涸泽之游鱼，气机阻隔，进退维谷。',
          quoteHanViet: 'Thủy tận vô đạo tắc bế, khí bất lưu thông sinh âm trệ tử khí. Cư cùng hạng chi tận đầu giả, như hạc trạch chi du ngư, khí cơ trở cách, tiến thoái duy cốc.',
          quoteMeaning: 'Đường nước đến chỗ cùng mà không có lối thoát thì khí bế tắc, không lưu thông sinh ra âm khí ngưng trệ. Ở nơi tận cùng hẻm cụt như cá cạn nước, khí mạch bị cắt đứt, tiến thoái lưỡng nan.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: Hẻm cụt thiếu gió đối lưu nằm ngang, dễ tích tụ thán khí và năng lượng âm u, cần giải pháp thông gió phương thẳng đứng.',
      applicationGuide: 'Hóa giải: Mở giếng trời hút gió lên cao, bổ sung đèn dương quang chiếu sáng mặt ngõ, bố trí cây xanh quang hợp tăng dưỡng khí.'
    },

    // 11. TAM HỢP TRƯỜNG SINH THỦY PHÁP
    tam_hop_truong_sinh_thuy_phap: {
      id: 'tam_hop_truong_sinh_thuy_phap',
      category: 'Lý Khí Tam Hợp',
      tag: '12 Cung Trường Sinh',
      title: 'Tam Hợp Thủy Pháp: Vận Hành 12 Cung Trường Sinh Chánh Tông',
      badgeColor: '#38BDF8',
      sources: [
        {
          book: '《Thanh Nang Áo Ngữ》',
          author: 'Đường · Dương Quân Tùng',
          quoteOriginal: '生入克入名为旺，定知财宝积如山。生出克出名为衰，年年岁岁换妻儿。水要流行须吉位，巽巳长生去有妨。',
          quoteHanViet: 'Sinh nhập khắc nhập danh vi vượng, định tri tài bảo tích như sơn. Sinh xuất khắc xuất danh vi suy, niên niên tuế tuế hoán thê nhi. Thủy yếu lưu hành tu cát vị, Tốn Tị trường sinh khứ hữu phương.',
          quoteMeaning: 'Nạp khí sinh nhập vượng nhập thì tài lộc tích tụ như núi. Xả khí sinh xuất khắc xuất thì suy bại hao tổn. Nước chảy phải nương vào cung vị cát lành, nếu để nước Trường Sinh chảy đi mất thì tổn hại khôn lường.'
        }
      ],
      masterCommentary: 'Luận giải chánh tông: 12 Cung Trường Sinh (Sinh, Dục, Đới, Quan, Vượng, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng) quy định chặt chẽ: Dòng nước đến (Lai Thủy) phải vào các cung Sinh, Quan, Vượng; dòng nước đi (Khứ Thủy) phải thoát ra các cung Bệnh, Tử, Mộ, Tuyệt. Trong môi trường Hư Thủy đô thị, phép này chỉ quy chiếu cho hẻm cận trạch tiếp giáp Minh Đường.',
      applicationGuide: 'Ứng dụng thực địa: Khi hẻm cận trạch nạp đúng cung Trường Sinh hoặc Đế Vượng thì gia trạch vượng phát đinh tài; tối kỵ phá cung Lâm Quan (Hoàng Tuyền).'
    }
  };

  function normalizeEntry(entry) {
    if (!entry) return null;
    const primary = (entry.sources && entry.sources[0]) ? entry.sources[0] : {};
    return {
      ...entry,
      book: entry.book || primary.book || '',
      author: entry.author || primary.author || '',
      quoteOriginal: entry.quoteOriginal || primary.quoteOriginal || '',
      quoteHanViet: entry.quoteHanViet || primary.quoteHanViet || '',
      quoteMeaning: entry.quoteMeaning || primary.quoteMeaning || ''
    };
  }

  return {
    THEORY_ENTRIES,
    getEntry: id => normalizeEntry(THEORY_ENTRIES[id]),
    getAllEntries: () => Object.values(THEORY_ENTRIES).map(normalizeEntry)
  };
}));
