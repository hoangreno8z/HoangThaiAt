# ĐẶC TẢ MÔ HÌNH DỮ LIỆU TRI THỨC CẤU TRÚC HÓA (DATA SCHEMA SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 6)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Formal Data Schema Specification

---

## 1. CÁC THỰC THỂ CỐT LÕI (CORE ENTITIES)

### 1.1. Entity `Concept` (Khái Niệm)
* `id` (string): Mã định danh duy nhất (ví dụ: `CPT-001`).
* `name` (string): Tên khái niệm bằng tiếng Việt.
* `hanzi` (string): Chữ Hán nguyên tác.
* `pinyin` (string): Phiên âm Pinyin quốc tế.
* `domain` (string): Miền tri thức lớn (`Bản Thể Luận`, `Địa Lý`, `Dịch Học`, `Lịch Pháp`).
* `subdomain` (string): Phân vùng chuyên sâu (`Khởi Nguyên`, `Loan Đầu`, `Bát Trạch`, `Tam Hợp`, `Huyền Không`).
* `prerequisites` (array of strings): Danh sách các Concept ID tiền đề.
* `related_concepts` (array of strings): Các Concept ID liên quan mật thiết.
* `schools` (array of strings): Các trường phái chấp nhận hoặc áp dụng.
* `summary` (string): Định nghĩa học thuật cô đọng.
* `status` (string): `DISCOVERED` | `EXTRACTED` | `STRUCTURED` | `READY`.

### 1.2. Entity `Source` (Nguồn Thư Tịch)
* `id` (string): Mã thư tịch (ví dụ: `SRC-001`).
* `title` (string): Tên tác phẩm tiếng Việt.
* `hanzi` (string): Tên chữ Hán nguyên tác.
* `author` (string): Tác giả / Biên giả.
* `dynasty` (string): Triều đại lịch sử.
* `repository` (string): Cơ quan / Kho lưu trữ cổ bản (Tứ Khố Toàn Thư, Đạo Tạng).
* `priority` (string): Hạng tin cậy `A` | `B` | `C` | `D` | `E` | `F`.
* `edition` (string): Thông tin ấn bản khảo sát.

### 1.3. Entity `Passage` (Đoạn Kinh Văn Trích Dẫn)
* `id` (string): Mã đoạn trích (ví dụ: `PSG-001`).
* `source_id` (string): Khóa ngoại tham chiếu đến `Source.id`.
* `chapter` (string): Tên chương mục / Thiên.
* `hanzi` (string): Nguyên văn chữ Hán.
* `pinyin` (string): Phiên âm Pinyin.
* `vietnamese` (string): Bản dịch nghĩa tiếng Việt.
* `notes` (string): Chú giải văn bản học.

### 1.4. Entity `Claim` (Khẳng Định Nguyên Tử)
* `id` (string): Mã khẳng định (ví dụ: `CLM-001`).
* `concept_id` (string): Khóa ngoại tham chiếu đến `Concept.id`.
* `passage_id` (string): Khóa ngoại tham chiếu đến `Passage.id`.
* `claim_type` (string): `DEFINITION` | `RULE` | `APPLICATION` | `PROHIBITION`.
* `text` (string): Nội dung khẳng định nguyên tử.
* `school` (string): Môn phái đề xuất.
* `confidence` (string): Hạng bằng chứng `A` | `B` | `C`.
* `status` (string): `VERIFIED` | `CONFLICTED` | `UNVERIFIED`.

### 1.5. Entity `Variant` (Dị Bản Văn Bản)
* `id` (string): Mã dị bản (ví dụ: `VAR-001`).
* `source_a_id` (string): Ấn bản A.
* `source_b_id` (string): Ấn bản B.
* `target_passage` (string): Đoạn kinh văn đối chiếu.
* `differences` (string): Điểm khác biệt giữa các bản khắc.
* `notes` (string): Nhận định của các nhà hiệu đính.

### 1.6. Entity `Conflict` (Mâu Thuẫn Trường Phái)
* `id` (string): Mã mâu thuẫn (ví dụ: `CFL-001`).
* `topic` (string): Chủ đề bất đồng học thuật.
* `school_a` (string): Trường phái A.
* `view_a` (string): Quan điểm & Luận cứ trường phái A.
* `school_b` (string): Trường phái B.
* `view_b` (string): Quan điểm & Luận cứ trường phái B.
* `status` (string): `CONFLICTED` | `COMPLEMENTARY`.
* `analysis` (string): Biện giải học thuật đa chiều.

### 1.7. Entity `Term` (Thuật Ngữ Chuyên Sâu)
* `id` (string): Mã thuật ngữ (ví dụ: `TRM-001`).
* `term` (string): Tên thuật ngữ tiếng Việt.
* `hanzi` (string): Chữ Hán.
* `pinyin` (string): Phiên âm Pinyin.
* `definition` (string): Định nghĩa kinh điển.
* `plain_vn` (string): Diễn giải thực tế dễ hiểu.
* `domains` (array of strings): Các miền ứng dụng.

### 1.8. Entity `Rule` (Quy Tắc Thuật Toán Số Hóa)
* `id` (string): Mã quy tắc (ví dụ: `RUL-001`).
* `domain` (string): Miền tính toán (`BatTrach`, `HuyenKhong`, `NguHanh`).
* `name` (string): Tên quy tắc toán học.
* `inputs` (array of strings): Tham số đầu vào.
* `outputs` (array of strings): Kết quả đầu ra.
* `conditions` (string): Điều kiện logic.
* `source_ids` (array of strings): Tham chiếu nguồn thư tịch.
