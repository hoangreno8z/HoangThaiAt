# ĐẶC TẢ BỘ MÁY TÌM KIẾM ĐA CHIỀU PHÂN NHÓM (SEARCH ENGINE SPEC)
**Dự án:** Huyền Học Mụ — Digital Scholarly Library  
**Phiên bản:** 1.0.0 (Phase 7)  
**Ngày phê duyệt:** 28/08/2026  
**Trạng thái:** Search Engine Architecture Specification

---

## 1. NGUYÊN TẮC TÌM KIẾM ĐA CHIỀU (MULTI-DIMENSIONAL SEARCH)

1. **Chuẩn hóa ngôn ngữ đa tầng (Multilingual Normalization):**
   * Cho phép tìm kiếm bằng tiếng Việt có dấu, tiếng Việt không dấu, phiên âm Pinyin và chữ Hán nguyên tác.
2. **Phân nhóm kết quả rõ ràng (Grouped Results):**
   * Khái Niệm (`Concepts`): Các nguyên lý bản thể luận và dịch học (`CPT-001`...).
   * Bài Học (`Lessons`): 50 bài học trong các giáo trình sư phạm.
   * Thư Tịch Cổ (`Primary Sources`): Các bản kinh văn chữ Hán và ấn bản lưu trữ.
   * Thuật Ngữ (`Terms`): Từ điển chú giải chuyên sâu.
   * Công Cụ (`Tools`): Các bàn tính toán phong thủy.
3. **Bộ lọc đa diện (Faceted Filters):**
   * Lọc theo Phân Nhóm (`Category`).
   * Lọc theo Trường Phái (`School`).
   * Lọc theo Cấp Độ Bằng Chứng (`Evidence Priority A-F`).
4. **Đánh dấu từ khóa (Snippet Highlighting):**
   * Làm nổi bật các từ khóa trùng khớp trong phần trích dẫn nội dung.
