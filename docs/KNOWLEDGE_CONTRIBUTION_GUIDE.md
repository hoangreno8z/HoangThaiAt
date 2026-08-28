# HƯỚNG DẪN MỞ RỘNG & NẠP TRI THỨC MỚI VÀO THƯ VIỆN SỐ
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 2.0.0 (Extensible Plugin Architecture)  
**Mục tiêu:** Mở rộng không giới hạn hàng triệu bài học, sách cổ, thuật ngữ và công cụ mới mà KHÔNG PHẢI SỬA MÃ NGUỒN CỐT LÕI hay gây nặng tải cho hệ thống.

---

## 1. NGUYÊN TẮC CẮM RÚT TỰ ĐỘNG (PLUG & PLAY REGISTRY)

Hệ thống được vận hành bởi trung tâm điều phối **`KnowledgeRegistry` (`js/knowledge_registry.js`)**:
* **Tự Động Đăng Ký (Auto-Registration):** Bất kỳ dữ liệu nào được đăng ký vào Registry sẽ tự động xuất hiện trên:
  1. *Menu Điều Hướng Di Động (Mobile Drawer & Bottom Bar)*
  2. *Cây Điều Hướng Bài Đọc (Desktop 3-Pane Tree)*
  3. *Bộ Máy Tìm Kiếm Đa Chiều (Search Engine Index)*
  4. *Đồ Hình Tri Thức (Native SVG Graph)*
* **Nạp Tức Thời Theo Nhu Cầu (On-Demand Lazy Loading):** Dữ liệu chỉ được tải khi người dùng nhấp vào xem. Dù có thêm 1.000.000 bài học thì trang chủ mở lên vẫn chỉ tiêu tốn < 100KB RAM.

---

## 2. HƯỚNG DẪN THÊM MỘT BÀI HỌC / MÔN HỌC MỚI (ADD NEW LESSON / TRACK)

Để thêm một môn phái mới (ví dụ: *Kỳ Môn Độn Giáp, Tử Vi Đẩu Số, Thái Ất Thần Số*), bạn chỉ cần gọi phương thức chuẩn sau:

```javascript
window.knowledgeRegistry.registerTrack({
  id: 'ky-mon',
  title: 'Kỳ Môn Độn Giáp Bí Quyết',
  badge: '10 Tiết Kỳ Môn',
  school: 'KỲ MÔN ĐỘN GIÁP',
  theme: '#06B6D4',
  desc: 'Bát Môn, Cửu Tinh, Bát Thần và phương pháp lập Cục Bàn toán học cổ điển.',
  prereq: 'Bản Thể Luận (Tiết 5 & 6: Bát Quái & Lạc Thư)',
  prereqLink: '#/learn/nen-tang/5',
  conceptTags: ['Bát Môn', 'Cửu Tinh', 'Bát Thần', 'Lập Cục Kỳ Môn']
}, [
  // Tiết 1
  {
    chapter_id: 'kymon_part_1',
    chapter_title: 'Tiết I: Khởi Nguyên Kỳ Môn & Cơ Chế Tam Kỳ Lục Nghi',
    sub_title: 'Cấu trúc ma trận thời không 3 tầng và nguyên lý ẩn giấu Giáp',
    canonical_quote: {
      hanzi: '陰陽順逆妙難窮，二至還鄉一九宮。',
      pinyin: 'Yīn yáng shùn nì miào nán qióng, èr zhì huán xiāng yī jiǔ gōng.',
      translation: 'Âm dương thuận nghịch diệu nan cùng, nhị chí hoàn hương nhất cửu cung.',
      source: 'Yên Ba Điếu Sou Ca - Tứ Khố Toàn Thư'
    },
    scholarly_analysis: {
      term_glossary: [
        { term: 'Tam Kỳ', definition: 'Ất (Nhật Kỳ), Bính (Nguyệt Kỳ), Đinh (Tinh Kỳ).' }
      ]
    }
  }
  // Tiết 2, 3, 4... tiếp theo
]);
```

$ightarrow$ **Kết quả:** Ngay lập tức, lộ trình học tập `#/learn/ky-mon/1`, menu di động và bộ máy tìm kiếm sẽ tự động nhận diện và kích hoạt môn học mới 100% mà không cần sửa 1 dòng code router hay layout nào!

---

## 3. HƯỚNG DẪN THÊM MỘT BỘ CỔ THƯ MỚI (ADD NEW CLASSICAL BOOK)

Để bổ sung một pho cổ thư mới (ví dụ: *Hoàng Đế Trạch Kinh, Tuyết Tâm Phú, La Kinh Thấu Giải*):

```javascript
window.knowledgeRegistry.registerBook({
  id: 'tuyet-tam-phu',
  title: 'Tuyết Tâm Phú (雪心賦)',
  author: 'Bốc Ứng Thiên (卜應天)',
  dynasty: 'Đường Triều',
  category: 'Địa Lý Loan Đầu Phú Điển',
  grade: 'HẠNG B (Kinh Điển Khảo Cứu)',
  repository: 'Tứ Khố Toàn Thư (Tử Bộ)',
  desc: 'Áng văn chương địa lý bất hủ: Khí thừa phong tắc tán, giới thủy tắc chỉ.',
  chapters: [
    {
      id: '1',
      title: 'Thiên Thứ Nhất: Loan Đầu Đại Cương',
      hanzi: '蓋聞乾坤大範，造化玄機。山川融結，氣脈貫通。',
      pinyin: 'Gài wén qián kūn dà fàn, zào huà xuán jī. Shān chuān róng jié, qì mài guàn tōng.',
      meaning: 'Trời đất khuôn phép rộng lớn, cơ màu hóa sinh sâu kín. Núi sông tụ hội, khí mạch liền lạc thông suốt.'
    }
  ]
});
```

---

## 4. HƯỚNG DẪN THÊM CÔNG CỤ TÍNH TOÁN MỚI (ADD NEW COMPUTATIONAL TOOL)

```javascript
window.knowledgeRegistry.registerTool({
  id: 'ky-mon-calc',
  name: 'Bàn Tính Kỳ Môn Độn Giáp Lập Cục',
  domain: 'KyMon',
  desc: 'Tự động tính Tiết Khí, Thượng/Trung/Hạ Nguyên và lập Cục Bàn 9 Cung.',
  render: function(container) {
    container.innerHTML = `<div>Giao diện bàn tính Kỳ Môn...</div>`;
  }
});
```
