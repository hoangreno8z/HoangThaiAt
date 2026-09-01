# VIỆT HÓA BATCH 10 — PHÂN KHU PHÒNG & GIAO THÔNG NỘI BỘ

## Quy tắc thuật ngữ

Các danh từ kiến trúc cổ được giữ theo **sense** chứ không ép thành tên phòng hiện đại.

## ROOM-001

**[ORIGINAL]** 造屋從來有次第，先內及外起自堂。  

**[HÁN-VIỆT]** Tạo ốc tòng lai hữu thứ đệ, tiên nội cập ngoại khởi tự đường.  

**[DỊCH SÁT]** Việc dựng/bố trí nhà theo văn bản có thứ tự; bắt đầu từ phần chính bên trong, lấy 'đường' làm điểm khởi.  

**[TERM RESOLUTION]** `{"堂": "historical principal hall; NOT modern living room"}`  

**[OBSERVABLE]** `space_hierarchy, primary_space, build_sequence`  

**[BIÊN TẬP]** Có thể dùng làm planning hierarchy truyền thống, không phải quy trình kết cấu bắt buộc.  

**State:** `CANDIDATE_HIERARCHY`

---

## ROOM-002

**[ORIGINAL]** 先造兩廊不造堂。  

**[HÁN-VIỆT]** Tiên tạo lưỡng lang bất tạo đường.  

**[DỊCH SÁT]** Văn bản phản đối việc làm hai 'lang'/cánh trước khi hình thành 'đường' chính.  

**[TERM RESOLUTION]** `{"廊": "corridor/gallery/side structure context-dependent", "堂": "principal hall"}`  

**[OBSERVABLE]** `side_structure_exists, primary_hall_exists, sequence`  

**[BIÊN TẬP]** Hậu quả gia đình trong nguyên văn được tách bỏ khỏi causal engine.  

**State:** `CANDIDATE_SEQUENCE`

---

## ROOM-003

**[ORIGINAL]** 後堂前堂仍可安，廳若欺堂大相壓，更有廊屋可次安。  

**[HÁN-VIỆT]** Hậu đường tiền đường nhưng khả an, sảnh nhược khi đường đại tương áp, cánh hữu lang ốc khả thứ an.  

**[DỊCH SÁT]** Đoạn văn cho phép bố trí tiền/hậu đường theo một trật tự và cảnh báo trường hợp 'sảnh' lấn/áp 'đường'; sau đó mới xét lang ốc.  

**[TERM RESOLUTION]** `{"廳若欺堂": "semantic sense likely relative hierarchy/scale; exact technical criterion unresolved"}`  

**[OBSERVABLE]** `front_hall, rear_hall, hall_area_ratio, side_structure`  

**[BIÊN TẬP]** Chỉ lưu hierarchy/relative-scale observable; chưa có ngưỡng diện tích cổ.  

**State:** `SEMANTIC_PARTIAL_BLOCK_THRESHOLD`

---

## ROOM-004

**[ORIGINAL]** 凡造宅三重並無廳廂名，三絕凶。有廳無堂，主孤寡。  

**[HÁN-VIỆT]** Phàm tạo trạch tam trùng tịnh vô sảnh sương danh, tam tuyệt hung. Hữu sảnh vô đường, chủ cô quả.  

**[DỊCH SÁT]** Truyền bản xem cấu trúc nhiều lớp nhưng thiếu các thành phần gọi là sảnh/sương, hoặc có sảnh mà không có đường, là bất lợi.  

**[TERM RESOLUTION]** `{"廳": "hall", "廂": "side wing", "堂": "principal hall"}`  

**[OBSERVABLE]** `layer_count, hall_exists, side_wing_exists, principal_hall_exists`  

**[BIÊN TẬP]** Chỉ chứng minh rằng văn bản coi hierarchy/function naming quan trọng; không dùng phán 'cô quả' như causality.  

**State:** `CANDIDATE_FUNCTIONAL_HIERARCHY`

---

## ROOM-005

**[ORIGINAL]** 凡房門，不得正對天井。  

**[HÁN-VIỆT]** Phàm phòng môn, bất đắc chính đối thiên tỉnh.  

**[DỊCH SÁT]** Cửa phòng không nên chính đối thiên tỉnh theo truyền bản.  

**[TERM RESOLUTION]** `{"房門": "room door generic", "天井": "traditional Tianjing"}`  

**[OBSERVABLE]** `room_door_segment, tianjing_polygon, door_normal_ray, direct_visibility_or_axis`  

**[BIÊN TẬP]** Không đặt góc sai số cổ; lưu alignment liên tục và trạng thái direct/intersect.  

**State:** `CANDIDATE_DOOR_COURTYARD_RELATION`

---

## ROOM-006

**[ORIGINAL]** 窖房門不可正對房門。  

**[HÁN-VIỆT]** Diếu phòng môn bất khả chính đối phòng môn.  

**[DỊCH SÁT]** Cửa của 'diếu phòng' không nên chính đối cửa phòng theo truyền bản.  

**[TERM RESOLUTION]** `{"窖房": "cellar/storage-type chamber candidate; exact function not fully locked"}`  

**[OBSERVABLE]** `door_to_door_axis, room_type_candidate`  

**[BIÊN TẬP]** Vì nghĩa 窖房 chưa khóa đủ, rule production bị block.  

**State:** `SEMANTIC_UNRESOLVED_BLOCKED`

---

## ROOM-007

**[ORIGINAL]** 堂前門廊不可空，窗櫺樑槅須分布。  

**[HÁN-VIỆT]** Đường tiền môn lang bất khả không, song linh lương cách tu phân bố.  

**[DỊCH SÁT]** Đoạn văn đề cập môn-lang trước đường và việc phân bố cửa sổ/cấu kiện.  

**[TERM RESOLUTION]** `{"空": "meaning in this construction sentence unresolved", "門廊": "entry gallery/corridor candidate"}`  

**[OBSERVABLE]** `entry_transition, window_distribution`  

**[BIÊN TẬP]** Không được biến thành rule 'hành lang không được rỗng' hay một tỷ lệ cửa sổ khi chưa hiểu nghĩa kỹ thuật.  

**State:** `SEMANTIC_UNRESOLVED_BLOCKED`

---

## ROOM-008

**[ORIGINAL]** 十家八家同一聚，同出同門同一處。  

**[HÁN-VIỆT]** Thập gia bát gia đồng nhất tụ, đồng xuất đồng môn đồng nhất xứ.  

**[DỊCH SÁT]** Đoạn văn mô tả nhiều hộ/nhà tụ thành một cụm, cùng đi ra qua một cửa/nơi.  

**[TERM RESOLUTION]** `{"context": "compound circulation; surrounding verse is punctuation-complex"}`  

**[OBSERVABLE]** `unit_count, shared_exit_node, shared_access_graph`  

**[BIÊN TẬP]** Chỉ lưu compound topology. Không suy 'chung một cổng là tốt/xấu'.  

**State:** `TEXT_COMPLEX_TOPOLOGY_ONLY`

---

## ROOM-009

**[ORIGINAL]** 門路各家不為巷。  

**[HÁN-VIỆT]** Môn lộ các gia bất vi hạng.  

**[DỊCH SÁT]** Một câu trong khối văn phân biệt đường/cửa của từng nhà với 'hạng' (ngõ/hẻm) theo cách của nguồn.  

**[TERM RESOLUTION]** `{"巷": "lane/alley; grammar requires context"}`  

**[OBSERVABLE]** `private_access, shared_lane, circulation_graph`  

**[BIÊN TẬP]** Không sinh rule cát/hung; giữ làm evidence rằng topology circulation được phân biệt.  

**State:** `REFERENCE_TOPOLOGY_ONLY`

---

## ROOM-010

**[ORIGINAL]** 凡人居止之室，須周密，勿有細隙，使風入。  

**[HÁN-VIỆT]** Phàm nhân cư chỉ chi thất, tu chu mật, vật hữu tế khích, sử phong nhập.  

**[DỊCH SÁT]** Phòng/nơi ở được khuyên nên kín khít, tránh khe nhỏ làm gió lùa vào.  

**[TERM RESOLUTION]** `{"風": "literal draft/wind in context; not general ventilation doctrine"}`  

**[OBSERVABLE]** `uncontrolled_draft_paths, enclosure_leakage`  

**[BIÊN TẬP]** Không được biến thành 'nhà càng kín càng tốt'. Modern ventilation/IAQ là lớp độc lập.  

**State:** `TRADITIONAL_DRAFT_MOTIF_MODERN_GUARD`

---

## ROOM-011

**[ORIGINAL]** 凡於廳屋下安竈者，有殃。  

**[HÁN-VIỆT]** Phàm ư sảnh ốc hạ an táo giả, hữu ương.  

**[DỊCH SÁT]** Truyền bản phản đối đặt bếp dưới/ở phần được gọi là sảnh ốc.  

**[TERM RESOLUTION]** `{"廳屋下": "vertical/under-hall relation ambiguous for modern multi-storey mapping"}`  

**[OBSERVABLE]** `kitchen_vertical_relation_to_hall`  

**[BIÊN TẬP]** Không xử lý trong Batch10; chuyển Batch11 Bếp.  

**State:** `DEFER_KITCHEN`

---

## ROOM-012

**[ORIGINAL]** 中堂不可架直屋。  

**[HÁN-VIỆT]** Trung đường bất khả giá trực ốc.  

**[DỊCH SÁT]** Đoạn văn nói trung đường không nên 'giá trực ốc'; nghĩa hình học/chế thức cụ thể chưa đủ chắc.  

**[TERM RESOLUTION]** `{"架直屋": "UNRESOLVED"}`  

**[OBSERVABLE]** `NONE`  

**[BIÊN TẬP]** Không tự bịa thành 'không để hành lang xuyên tâm' hoặc 'không có phòng trên trung cung'.  

**State:** `SEMANTIC_UNRESOLVED_BLOCKED`

---
