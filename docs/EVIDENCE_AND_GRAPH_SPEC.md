# ĐẶC TẢ HỆ THỐNG KIỂM CHỨNG BẰNG CHỨNG & ĐỒ HÌNH TRI THỨC (PHASE 8)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 8)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Evidence & Graph Architecture Specification

---

## 1. THANG PHÂN CẤP NGUỒN GỐC THƯ TỊCH (SOURCE PRIORITY HIERARCHY A-F)

* **HẠNG A (Primary Historical Texts):** Thư tịch cổ điển nguyên bản có xuất xứ và lưu trữ tại các văn khố quốc gia (Tứ Khố Toàn Thư, Đạo Tạng, Giáp cốt văn, Trúc giản Quách Điếm, Mã Vương Đôi). Độ tin cậy: **100%**.
* **HẠNG B (Scholarly Editions & Commentaries):** Bản dịch, hiệu đính và chú giải của các đại danh sư trong lịch sử (Thập Dực, Chu Tử Gia Lễ, Thẩm Thị Huyền Không Học). Độ tin cậy: **90%**.
* **HẠNG C (Traditional Provenance):** Bản chép tay, khẩu quyết gia truyền có nguồn gốc nhân vật và địa phương rõ ràng. Độ tin cậy: **75%**.
* **HẠNG D (Modern Academic Studies):** Công trình nghiên cứu lịch sử học, khảo cổ học, nhân chủng học hiện đại. Độ tin cậy: **80%**.
* **HẠNG E (Modern Websites / Forums):** Tư liệu tham khảo thứ cấp từ internet và mạng xã hội. Độ tin cậy: **30% (Chỉ để tham khảo, không làm căn cứ)**.
* **HẠNG F (AI-Generated / Unverified):** Nội dung suy diễn không có nguồn trích. **BỊ CẤM XUẤT BẢN DƯỚI DANH NGHĨA CHÍNH ĐIỂN**.

---

## 2. TRẠNG THÁI KIỂM ĐỊNH KHẲNG ĐỊNH (CLAIM VERIFICATION STATUSES)

1. `VERIFIED (Đã Thẩm Định)`: Khẳng định có trích dẫn văn bản học Hạng A hoặc B rõ ràng, không có dị bản đối nghịch.
2. `CONFLICTED (Bất Đồng Học Thuật)`: Khẳng định có sự mâu thuẫn trực tiếp giữa các trường phái lớn (ví dụ: Bát Trạch vs Huyền Không).
3. `UNVERIFIED (Chưa Thẩm Định)`: Khẳng định lưu truyền dân gian nhưng chưa tìm thấy cổ bản khắc gỗ đối chứng.
4. `INSUFFICIENT_EVIDENCE (Thiếu Chứng Cứ)`: Khẳng định mang tính suy diễn hoặc mâu thuẫn với quy luật vật lý tự nhiên.

---

## 3. ĐỒ HÌNH QUAN HỆ TRI THỨC SVG THUẦN TÚY (NATIVE SVG GRAPH)

* **Kiến trúc:** Sử dụng SVG vector thuần túy dựng trên Client, hoàn toàn loại bỏ sự phụ thuộc vào thư viện D3.js tải qua CDN bên ngoài.
* **Tính năng tương tác:** 
  * Hover vào node: Hiển thị tooltip tóm tắt bản thể luận, Hán văn và cấp độ tin cậy.
  * Click vào node: Nhảy trực tiếp đến bài học tương ứng trong hệ thống giáo trình (`#/learn/...`).
