# BẢN ĐỒ TRI THỨC TỔNG THỂ (MASTER KNOWLEDGE MAP)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 1)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Master Architecture Document

---

## 1. NGUYÊN TẮC HỌC THUẬT CỐT LÕI (CORE PRINCIPLES)

1. **Phân định rạch ròi giữa Thứ Tự Sư Phạm (Learning Order) và Tiến Trình Lịch Sử (Historical Order):**
   * Chuỗi kiến thức: `Vô Cực -> Thái Cực -> Âm Dương -> Tứ Tượng -> Bát Quái -> Ngũ Hành -> Hà Đồ -> Lạc Thư -> Can Chi -> Dịch Học` là một **Tuyến Học Tập Sư Phạm (Learning Path)** được thiết kế khoa học để dẫn dắt người học từ bản thể luận trừu tượng đến cấu trúc ứng dụng cụ thể.
   * Đây **KHÔNG PHẢI** là một tuyên bố lịch sử học rằng các khái niệm này phát sinh theo đúng tuần tự thời gian duy nhất đó. Trong lịch sử khảo cổ và văn bản học (Trúc giản Quách Điếm, Bạch thư Mã Vương Đôi, Giáp cốt văn), Âm Dương, Bát Quái và Ngũ Hành xuất phát từ các nhánh văn hóa độc lập thời Ân Thương - Tây Chu - Chiến Quốc, sau đó mới được các nhà Dịch học thời Tiên Tần, Hán triều và Tống Nho (Chu Đôn Di, Thiệu Ung, Chu Hy) tổng hợp thành hệ thống nhất thể.
2. **Không biến giả thuyết thành chân lý:**
   * Mọi định nghĩa, công thức và quy tắc phải được gắn với ít nhất một trường phái (School) và nguồn thư tịch cụ thể.
   * Nếu có sự bất đồng giữa các trường phái: **Hiển thị nguyên vẹn bất đồng (Conflicted)**, tuyệt đối không tự ý bịa ra một kết luận trung gian để hòa giải.
3. **Phân cấp nguồn tin cậy nghiêm ngặt (Source Priority):**
   * **Hạng A (Primary Sources):** Thư tịch cổ điển nguyên bản có xuất xứ rõ ràng (Tứ Khố Toàn Thư, Đạo Tạng, Trúc giản, Bia ký cổ).
   * **Hạng B (Scholarly Editions & Commentaries):** Bản dịch, hiệu đính và chú giải của các học giả/danh sư uy tín (Thập Dực, Chu Tử Gia Lễ, Thẩm Thị Huyền Không Học, Tả Ao Địa Lý).
   * **Hạng C (Traditional Provenance):** Các tài liệu truyền khẩu hoặc chép tay gia truyền có nguồn gốc xác định được.
   * **Hạng D (Modern Academic Studies):** Công trình nghiên cứu khoa học, lịch sử học, nhân chủng học hiện đại.
   * **Hạng E (Modern Websites / Forums):** Tài liệu tham khảo thứ cấp, KHÔNG ĐƯỢC coi là bằng chứng thẩm quyền.
   * **Hạng F (AI-Generated / Unverified):** Nội dung suy diễn không có nguồn trích, BỊ CẤM xuất bản dưới danh nghĩa thư tịch chính thống.

---

## 2. KIẾN TRÚC BA CÂY TRI THỨC (THE THREE KNOWLEDGE TREES)

```
                     ┌──────────────────────────────────────────────┐
                     │          MASTER KNOWLEDGE REPOSITORY         │
                     └──────────────────────┬───────────────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         │                                  │                                  │
         ▼                                  ▼                                  ▼
┌──────────────────┐               ┌──────────────────┐               ┌──────────────────┐
│   TREE A: HỌC    │               │  TREE B: THƯ TỊCH │               │  TREE C: CÔNG CỤ │
│ (Learning Tree)  │               │  (Library Tree)  │               │   (Tools Tree)   │
├──────────────────┤               ├──────────────────┤               ├──────────────────┤
│ • Dành cho       │               │ • Dành cho đọc,  │               │ • Dành cho tính  │
│   người học      │               │   tra cứu nguyên │               │   toán thuật     │
│ • Theo lộ trình  │               │   văn, chú giải, │               │   toán số hóa &  │
│   sư phạm        │               │   dị bản cổ      │               │   trực quan hóa  │
│ • Có prerequisite│               │ • Theo danh mục  │               │ • Pure Domain    │
│   và tiến độ     │               │   sách, chương   │               │   Engines        │
└──────────────────┘               └──────────────────┘               └──────────────────┘
```

---

## 3. TIẾN TRÌNH KHAI THÁC & KIỂM CHỨNG TRI THỨC (KNOWLEDGE MINING PIPELINE)

Mỗi Node Tri thức (Concept / Claim / Rule) bắt buộc phải trải qua 7 cổng kiểm soát trạng thái:

```
[1. DISCOVERED] ──> Phát hiện khái niệm / thuật ngữ trong văn bản
      │
[2. SOURCE FOUND] ──> Tìm thấy văn bản gốc và vị trí chương mục
      │
[3. SOURCE VERIFIED] ──> Xác minh tính xác thực của ấn bản (Edition / Repository ID)
      │
[4. EXTRACTED] ──> Trích xuất nguyên văn Hán văn + Ngữ cảnh (Passage Unit)
      │
[5. STRUCTURED] ──> Phân rã thành các khẳng định nguyên tử (Atomic Claims)
      │
[6. CROSS-CHECKED] ──> Đối chiếu dị bản & Quét mâu thuẫn trường phái (Conflict Scan)
      │
[7. READY / PUBLISHED] ──> Đủ điều kiện hiển thị trên Reader & Learning Path
```

---

## 4. MA TRẬN PHỤ THUỘC TRI THỨC & TUYẾN HỌC TẬP NỀN TẢNG (FOUNDATIONAL LEARNING PATH)

```
[CPT-000: Khái Luận Nhập Môn]
       │
       ▼
[CPT-001: Vô Cực (0)] ───► [CPT-002: Thái Cực (1)]
                                 │
                                 ▼
                     [CPT-003: Âm Dương Đạo Khí (2)]
                                 │
                                 ▼
                     [CPT-004: Tứ Tượng Biến Thiên (4)]
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
[CPT-005: Tiên Thiên Bát Quái]             [CPT-007: Ngũ Hành Bản Thể]
            │                                         │
            ▼                                         ▼
[CPT-006: Hậu Thiên Bát Quái]             [CPT-008: Phản Sinh Phản Khắc]
            │                                         │
            └────────────────────┬────────────────────┘
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
   [CPT-009: Hà Đồ]                          [CPT-010: Lạc Thư]
            │                                         │
            └────────────────────┬────────────────────┘
                                 │
                                 ▼
                   [CPT-011: Can Chi & Lục Thập Hoa Giáp]
                                 │
                                 ▼
                   [CPT-012: Dịch Học & Lục Thập Tứ Quái]
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
[CPT-013: Loan Đầu]      [CPT-014: Bát Trạch]    [CPT-016: Huyền Không]
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                                 ▼
                   [CPT-015: Tam Hợp & Thủy Pháp]
                                 │
                                 ▼
                   [CPT-017: Phong Thủy Thờ Cúng]
```

---

## 5. BẢNG ĐẶC TẢ CHI TIẾT TỪNG NODE KHÁI NIỆM (MASTER CONCEPT NODES)

| ID Khái Niệm | Tên Khái Niệm | Tiền Đề (Prerequisites) | Khái Niệm Liên Quan | Nguồn Thư Tịch Bắt Buộc | Trường Phái / Bối Cảnh | Ứng Dụng Thuật Toán (Computation) | Trạng Thái (Status) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **CPT-000** | Khái Luận Nhập Môn Huyền Học | Không | Thế Giới Quan Cổ Đại, Phương Đông Luận | Chu Dịch Đại Truyện, Sử Ký (Khổng Tử Thế Gia) | Đại Cương Học Thuật | Không | `READY` |
| **CPT-001** | Vô Cực (無極 - Số 0) | CPT-000 | Hỗn Mang, Điểm Kỳ Dị, Hư Vô, Thái Hư | Thái Cực Đồ Thuyết (Chu Đôn Di), Đạo Đức Kinh (Chương 28) | Đạo Gia / Tống Nho Triết Học | State: 0 | `READY` |
| **CPT-002** | Thái Cực (太極 - Số 1) | CPT-001 | Đạo Khí, Nhất Nguyên, Bản Thể Luận | Chu Dịch Hệ Từ Thượng, Trang Tử, Hoàng Cực Kinh Thế | Dịch Học / Lý Học | State: 1, Vector: Động/Tĩnh | `READY` |
| **CPT-003** | Âm Dương (陰陽 - Số 2) | CPT-002 | Đối Lập, Hỗ Căn, Tiêu Trưởng, Chuyển Hóa | Chu Dịch Hệ Từ, Hoàng Đế Nội Kinh (Âm Dương Luận) | Dịch Học / Đông Y Học / Đạo Gia | Binary Flag: 0 (Âm), 1 (Dương) | `READY` |
| **CPT-004** | Tứ Tượng (四象 - Số 4) | CPT-003 | Thái Dương, Thiếu Âm, Thiếu Dương, Thái Âm | Chu Dịch Hệ Từ Thượng, Mai Hoa Dịch Số | Dịch Học Tiên Thiên | 2-bit Binary: 00, 01, 10, 11 | `READY` |
| **CPT-005** | Tiên Thiên Bát Quái (伏羲八卦) | CPT-004 | Càn Khôn Định Vị, Sơn Trạch Thông Khí | Chu Dịch Thuyết Quái Truyện, Phục Hy Bát Quái Đồ | Phục Hy / Thiệu Ung Tiên Thiên | 3-bit Binary Matrix: 000 -> 111 | `READY` |
| **CPT-006** | Hậu Thiên Bát Quái (文王八卦) | CPT-005 | Trục Thời Gian, 4 Mùa, Đế Xuất Hồ Chấn | Chu Dịch Thuyết Quái Truyện, Văn Vương Dịch | Văn Vương / Hậu Thiên Biến Dịch | Spatial Compass Angle Mapping (8 hướng) | `READY` |
| **CPT-007** | Ngũ Hành Bản Thể & Tương Sinh Tương Khắc | CPT-003, CPT-004 | Thủy, Hỏa, Mộc, Kim, Thổ, Khắc để Bảo Vệ Sinh | Thượng Thư (Hồng Phạm), Uyên Hải Tử Bình | Hồng Phạm / Âm Dương Gia | Directed Graph Engine (Sinh/Khắc cycle) | `READY` |
| **CPT-008** | Ngũ Hành Phản Sinh, Phản Khắc & Thừa Vũ | CPT-007 | Mộc Đa Hỏa Tức, Thổ Đa Kim Mai, Hỏa Viêm Thủy Khô | Tích Thiên Tủy, Hiệp Kỷ Biện Phương Thư | Mệnh Lý Học / Địa Lý Biện Chứng | Non-linear Threshold Overload Function | `READY` |
| **CPT-009** | Hà Đồ (河圖 - Số Sinh & Số Thành) | CPT-007, CPT-003 | 55 Chấm, Thiên 1 Sinh Thủy - Địa 6 Thành Chi | Thượng Thư Đại Truyện, Dịch Học Khải Mông | Thần Bí Số Học Tiên Thiên | Integer Formula: Sinh + 5 = Thành | `READY` |
| **CPT-010** | Lạc Thư (洛書 - Ma Phương Cửu Cung) | CPT-006, CPT-009 | Đới Cửu Lý Nhất, Ma Phương 3x3 Tổng 15 | Chu Dịch Thập Dực, Đại Đới Lễ Ký (Minh Đường) | Cửu Cung Học / Phong Thủy Lý Khí | 3x3 Magic Square Matrix Algorithm | `READY` |
| **CPT-011** | Can Chi & Lục Thập Hoa Giáp | CPT-007, CPT-010 | 10 Thiên Can, 12 Địa Chi, Nạp Âm Ngũ Hành | Tam Mệnh Thông Hội, Uyên Hải Tử Bình | Lịch Pháp / Thiên Văn Học Cổ | Modulo Arithmetic (LCM 10 & 12 = 60) | `READY` |
| **CPT-012** | Dịch Học & 64 Quẻ Biến Dịch | CPT-005, CPT-006 | Trùng Quái, Hào Vị, Thoán Từ, Hào Từ | Chu Dịch (Kinh & Truyện), Tiêu Thị Dịch Lâm | Chu Dịch Chánh Tông | 6-bit Binary Hexagram Transformation | `READY` |
| **CPT-013** | Địa Lý Loan Đầu (Hình Thế Học) | CPT-003, CPT-005 | Long, Huyệt, Sa, Thủy, Hướng, Tứ Tượng Loan Đầu | Táng Thư (Quách Phác), Tuyết Tâm Phú | Loan Đầu Hình Khí | Terrain Topography & Geometric Vectors | `READY` |
| **CPT-014** | Địa Lý Bát Trạch (Lý Khí Minh Kính) | CPT-006, CPT-010 | Cung Phi Mệnh Quái, Đông Tây Tứ Trạch, 8 Du Niên | Bát Trạch Minh Kính, Dương Trạch Tam Yếu | Bát Trạch Phái | Bitwise XOR / Quái Biến Hào Algorithm | `READY` |
| **CPT-015** | Địa Lý Tam Hợp (Thủy Pháp & Huyết Mạch) | CPT-011, CPT-007 | 12 Cung Trường Sinh, Tứ Đại Cục, Hoàng Tuyền Sát | La Kinh Thấu Giải, Bảo Chiếu Kinh | Tam Hợp Phái | 24-Mountain Ring & Degree Phase Engine | `READY` |
| **CPT-016** | Địa Lý Huyền Không Phi Tinh (Thời Không Cửu Cung) | CPT-010, CPT-006, CPT-011 | Tam Nguyên Cửu Vận, Lập Tinh Bàn 24 Sơn, Tử Bạch | Thẩm Thị Huyền Không Học, Thiên Ngọc Kinh | Huyền Không Phái | 3-Tier Flying Star Matrix Flight Rule | `READY` |
| **CPT-017** | Phong Thủy Thờ Cúng & Khoa Nghi Cổ Truyền | CPT-000, CPT-013, CPT-014 | Thần Vị, Tọa Cát Hướng Cát, Tẩy Uế, Văn Khấn | Kinh Lễ, Chu Tử Gia Lễ, Thọ Mai Gia Lễ | Nghi Lễ Học / Phong Tục Học | Spatial Orientation & Calendar Alignment | `READY` |

---

## 6. QUY ĐỊNH BẢO VỆ TÍNH TOÀN VẸN CỦA MASTER KNOWLEDGE MAP

1. Mọi nội dung biên soạn bài học (`/learn`), thư tịch (`/library`) hoặc công cụ (`/tools`) phải tham chiếu trực tiếp đến `Concept ID` (ví dụ `CPT-003`).
2. Tuyệt đối không thêm một `Concept ID` mới vào hệ thống nếu chưa xác minh được nguồn gốc thư tịch (Primary / Secondary Source Provenance).
3. Khi phát hiện xung đột học thuật giữa các trường phái, phải ghi rõ tại trường `School/Context` và tạo liên kết đối chiếu `Conflict Link` thay vì tự ý điều chỉnh định nghĩa chuẩn.
