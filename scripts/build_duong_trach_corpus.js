const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const RELEASE = path.join(ROOT, 'research', 'duong-trach', 'releases', 'v1');
const OUTPUT = path.join(ROOT, 'data', 'duong-trach');
const PROVENANCE_FILE = path.join(ROOT, 'research', 'duong-trach', 'SOURCE_PROVENANCE.json');

const BATCHES = [
  ['01', 'Nguồn Gốc & Phương Pháp', 'Nền tảng nguồn, lớp văn bản và quy tắc chống suy diễn.', 'BATCH01/02_VIET_HOA/pilot_viet_hoa.md'],
  ['02', 'Chọn Đất & Đại Thế', 'Khảo sát khu đất và bối cảnh lớn trước khi xét nội cục.', 'BATCH02/03_VIET_HOA/chon_dat_dai_the.md'],
  ['03', 'An Toàn & Pháp Lý Hiện Đại', 'Tiêu chuẩn an toàn bắt buộc hiện đại phải được xét trước khuyến nghị truyền thống.', 'BATCH03/02_HARD_GATE/pipeline.md'],
  ['04', 'Địa Thế Thực Chiến', 'Long, thế, minh đường, nước, thủy khẩu và quan hệ bao - xung.', 'BATCH04/03_VIET_HOA/dia_the_thuc_chien.md'],
  ['05', 'Hình Đất, Đường & Nước', 'Các hình thái hình học được giữ tách biệt với hậu quả truyền thống.', 'BATCH05/03_VIET_HOA/hinh_dat_duong_nuoc.md'],
  ['06', 'Đất Méo, Khuyết Phương & Tâm Nhà', 'Nhận diện hình đất bất quy tắc mà không tự đặt ngưỡng cổ pháp.', 'BATCH06/03_VIET_HOA/bat_tuc_phuong.md'],
  ['07', 'Đặt Nhà Trên Khu Đất', 'Quan hệ giữa ranh đất, công trình, pháp lý và điều kiện sử dụng.', 'BATCH07/03_VIET_HOA/dat_nha_tren_dat.md'],
  ['08', 'Cổng, Cửa Chính & Lối Vào', 'Cấu trúc tiếp cận, hình học cửa và tiêu chuẩn an toàn phòng cháy.', 'BATCH08/03_VIET_HOA/cong_cua_loi_vao.md'],
  ['09', 'Minh Đường, Sân & Giếng Trời', 'Khoảng mở, sân, thiên tỉnh và lớp khoa học công trình hiện đại.', 'BATCH09/04_VIET_HOA/open_spaces.md'],
  ['10', 'Phân Khu Phòng & Giao Thông', 'Tổ chức phòng, luồng đi lại và điều kiện tiếp cận.', 'BATCH10/04_VIET_HOA/phan_khu_phong.md'],
  ['11', 'Bếp, Hỏa, Nước & Khói', 'Cổ lệ về bếp được tách khỏi an toàn cháy, khói và độc chất.', 'BATCH11/04_VIET_HOA/bep_hoa_nuoc_khoi.md'],
  ['12', 'Phòng Ngủ, Giường & Nghỉ', 'Không gian ngủ, vị trí giường và lớp sức khỏe hiện đại.', 'BATCH12/04_VIET_HOA/phong_ngu_giuong.md'],
  ['13', 'Cầu Thang & Giao Thông Đứng', 'Quan hệ hình học, lưu thông và tiêu chuẩn an toàn kết cấu — thoát nạn.', 'BATCH13/04_VIET_HOA/cau_thang.md'],
  ['14', 'WC, Vệ Sinh & Khu Phụ', 'Tách cổ lệ khỏi vệ sinh, nước thải và an toàn sức khỏe.', 'BATCH14/04_VIET_HOA/wc_ve_sinh.md'],
  ['15', 'Cửa Sổ, Ánh Sáng & Thông Gió', 'Vi khí hậu, ánh sáng và thông gió với hai lớp cổ - hiện đại.', 'BATCH15/04_VIET_HOA/cua_so_anh_sang_thong_gio.md'],
  ['16', 'Nước Sạch, Giếng, Bể & Thoát Nước', 'Nguồn nước, lưu trữ, nước mưa và tiêu chuẩn an toàn chất lượng nước.', 'BATCH16/04_VIET_HOA/nuoc_gieng_be_thoat.md'],
  ['17', 'Mái, Hiên & Nước Mưa', 'Hình thức mái, chống hắt và thoát nước mái.', 'BATCH17/04_VIET_HOA/mai_hien_nuoc_mua.md'],
  ['18', 'Vật Liệu, Kết Cấu & Hư Hỏng', 'Đánh giá hiện trạng, hư hỏng và ưu tiên an toàn kết cấu.', 'BATCH18/05_VIET_HOA/vat_lieu_ket_cau.md'],
  ['19', 'Trình Tự Xây Dựng & Sửa Chữa', 'Phân biệt trình tự công trình, trạch nhật và các đầu ra đang bị khóa.', 'BATCH19/05_VIET_HOA/trinh_tu_xay_dung_trach_nhat.md'],
  ['20', 'Hoàn Thành, Nghiệm Thu & Nhập Trạch', 'Sẵn sàng để ở phải đi trước nghi thức chuyển vào nhà.', 'BATCH20/04_VIET_HOA/hoan_thanh_nhap_trach.md']
];

/* ─── Việt-hóa dictionaries & helpers ──────────────────────────────── */

const APPLICATION_MAP = {
  'LOT_TAPER_CLASSIFICATION':        'Nhận diện hình thái khuôn viên đất (Tóp hậu / Nở hậu)',
  'SITE_EXCLUSION_TRADITIONAL':      'Khảo sát thực địa vị trí đất kiêng kỵ truyền thống',
  'PRE_PURCHASE_SITE_SCREENING':     'Khảo sát tổng thể khu đất trước khi mua hoặc xây dựng',
  'SITE_CAPACITY_AND_TERRAIN':       'Đánh giá quy mô diện tích và độ dốc bằng phẳng mặt bằng',
  'FORM_SCHOOL_SITE_PATTERN':        'Khảo sát cách cục Loan Đầu (Thế đất tụ khí)',
  'SLOPE_IRREGULARITY_SCREEN':       'Đánh giá độ dốc và nguy cơ sạt trượt địa hình',
  'SITE_AUDIT_MODEL':                'Mô hình chỉnh thể khảo sát dương trạch',
  'PRE_PURCHASE_PRINCIPLE':          'Nguyên tắc thận trọng khi lựa chọn đất cư trú',
  'BASIN_LIKE_SITE_SHAPE':           'Đánh giá địa hình trũng thấp và thoát nước mặt',
  'ENVIRONMENTAL_QUALITATIVE_SCREEN':'Khảo sát quang cảnh, sinh khí và độ ẩm môi trường',
  'WATER_FORM_REFERENCE':            'Đối chiếu thủy thế và dòng nước hợp lưu',
  'NONE':                            'Tham chiếu nguyên lý chung',
  // Batch 03 – An toàn & Pháp lý
  'STRUCTURAL_SAFETY_SCREEN':        'Kiểm tra an toàn kết cấu công trình',
  'FIRE_SAFETY_SCREEN':              'Kiểm tra an toàn phòng cháy',
  'LEGAL_COMPLIANCE_SCREEN':         'Kiểm tra tuân thủ pháp lý xây dựng',
  'ELECTRICAL_SAFETY':               'Kiểm tra an toàn điện',
  'FLOOD_RISK_SCREEN':               'Đánh giá nguy cơ ngập lụt',
  // Batch 04 – Địa thế thực chiến
  'FORM_SCHOOL_DRAGON_VEIN':         'Phân tích long mạch – trường phái Hình thế',
  'FORM_SCHOOL_FACING':              'Xác định hướng – trường phái Hình thế',
  'FORM_SCHOOL_MING_TANG':           'Đánh giá minh đường – trường phái Hình thế',
  'FORM_SCHOOL_WATER_MOUTH':         'Đánh giá thủy khẩu – trường phái Hình thế',
  'FORM_SCHOOL_EMBRACE':             'Đánh giá thế bao bọc – trường phái Hình thế',
  // Batch 05 – Hình đất, đường & nước
  'LOT_SHAPE_CLASSIFICATION':        'Nhận diện hình dạng khuôn viên đất',
  'ROAD_GEOMETRY':                   'Phân tích hình học đường giao thông',
  'ROAD_GEOMETRY_LEFT':              'Phân tích hình học đường – phía trái',
  'ROAD_GEOMETRY_RIGHT':             'Phân tích hình học đường – phía phải',
  'WATER_FORM_CLASSIFICATION':       'Nhận diện hình thái dòng nước',
  // Batch 06 – Đất méo, khuyết phương
  'IRREGULAR_LOT_SCREEN':            'Nhận diện hình đất bất quy tắc',
  'MISSING_SECTOR_SCREEN':           'Phát hiện khuyết phương khuôn viên',
  'CENTER_POINT_DETERMINATION':      'Xác định tâm nhà trên mặt bằng',
  // Batch 07 – Đặt nhà trên khu đất
  'BUILDING_PLACEMENT':              'Bố trí công trình trên khu đất',
  'SETBACK_COMPLIANCE':              'Kiểm tra khoảng lùi pháp lý',
  'LAND_USE_CONDITION':              'Đánh giá điều kiện sử dụng đất',
  // Batch 08 – Cổng, cửa, lối vào
  'GATE_AND_ENTRY':                  'Phân tích cổng và lối vào chính',
  'DOOR_GEOMETRY':                   'Phân tích hình học cửa chính',
  'FIRE_EXIT_GATE':                  'Kiểm tra an toàn cháy lối thoát',
  // Batch 09 – Minh đường, sân, giếng trời
  'OPEN_SPACE_ANALYSIS':             'Phân tích khoảng mở, sân, thiên tỉnh',
  'COURTYARD_FUNCTION':              'Đánh giá chức năng sân trong',
  'LIGHT_WELL_SCREEN':               'Đánh giá giếng trời / thiên tỉnh',
  // Batch 10 – Phân khu phòng
  'ROOM_ZONING':                     'Phân khu chức năng phòng',
  'CIRCULATION_PATH':                'Đánh giá luồng giao thông nội bộ',
  'ACCESS_CONDITION':                'Kiểm tra điều kiện tiếp cận',
  // Batch 11 – Bếp, hỏa, nước
  'KITCHEN_PLACEMENT':               'Bố trí vị trí bếp',
  'FIRE_SAFETY_KITCHEN':             'An toàn cháy khu bếp',
  'SMOKE_VENTILATION':               'Thoát khói và thông gió bếp',
  // Batch 12 – Phòng ngủ, giường
  'BEDROOM_PLACEMENT':               'Bố trí phòng ngủ',
  'BED_POSITION':                    'Vị trí đặt giường',
  'HEALTH_SLEEP_SCREEN':             'Kiểm tra sức khỏe giấc ngủ',
  // Batch 13 – Cầu thang
  'STAIRCASE_GEOMETRY':              'Phân tích hình học cầu thang',
  'STAIRCASE_STRUCTURAL':            'Kiểm tra kết cấu cầu thang',
  'FIRE_ESCAPE_STAIRCASE':           'Kiểm tra thoát nạn cầu thang',
  // Batch 14 – WC, vệ sinh
  'TOILET_PLACEMENT':                'Bố trí khu vệ sinh',
  'SANITARY_SAFETY':                 'An toàn vệ sinh và nước thải',
  'HEALTH_HYGIENE_SCREEN':           'Kiểm tra sức khỏe vệ sinh',
  // Batch 15 – Cửa sổ, ánh sáng, thông gió
  'WINDOW_PLACEMENT':                'Bố trí cửa sổ',
  'NATURAL_LIGHT_SCREEN':            'Đánh giá ánh sáng tự nhiên',
  'VENTILATION_SCREEN':              'Đánh giá thông gió tự nhiên',
  // Batch 16 – Nước sạch, giếng, bể
  'WATER_SUPPLY_SOURCE':             'Đánh giá nguồn nước cấp',
  'WATER_STORAGE':                   'Đánh giá bể chứa nước',
  'DRAINAGE_SCREEN':                 'Kiểm tra hệ thống thoát nước',
  // Batch 17 – Mái, hiên, nước mưa
  'ROOF_FORM':                       'Phân tích hình thức mái',
  'EAVE_OVERHANG':                   'Đánh giá hiên và chống hắt',
  'RAINWATER_DRAINAGE':              'Kiểm tra thoát nước mưa',
  // Batch 18 – Vật liệu, kết cấu
  'MATERIAL_ASSESSMENT':             'Đánh giá vật liệu xây dựng',
  'STRUCTURAL_CONDITION':            'Đánh giá hiện trạng kết cấu',
  'DAMAGE_PRIORITY':                 'Ưu tiên xử lý hư hỏng',
  // Batch 19 – Trình tự xây dựng
  'CONSTRUCTION_SEQUENCE':           'Trình tự thi công xây dựng',
  'TRACH_NHAT_REFERENCE':            'Tham chiếu trạch nhật (đầu ra đang bị khóa)',
  // Batch 20 – Hoàn thành, nghiệm thu
  'COMPLETION_READINESS':            'Đánh giá sẵn sàng nghiệm thu',
  'MOVE_IN_RITUAL':                  'Nghi thức nhập trạch',
  // Ánh xạ đặc thù
  'HỌC THUẬT/ĐỐI CHIẾU TRƯỜNG PHÁI TRƯỚC KHI RULE HÓA.': 'Học thuật và đối chiếu trường phái trước khi chuẩn hóa.',
  'HỌC THUẬT/ĐỐI CHIẾU TRƯỜNG PHÁI TRƯỚC KHI RULE HÓA': 'Học thuật và đối chiếu trường phái trước khi chuẩn hóa.',
  'WASTE_STRUCTURE_TO_GATE_AXIS, DISTANCE, EXTERNAL_VS_INTERNAL': 'Khoảng cách và trục định vị khu vệ sinh so với cổng chính',
  'WASTE_STRUCTURE_TO_GATE_AXIS':    'Trục đường thẳng giữa nhà vệ sinh và cổng ngõ',
  'WELL_IN_KITCHEN_ZONE, WELL_IN_FRONT_OF_ROOM, SPRING_OR_WELL_BEHIND_PRINCIPAL_HALL': 'Bố trí giếng nước, mạch suối trong khuôn viên công trình',
};

const EVIDENCE_MAP = {
  'RULE_CANDIDATE':                       'Quy tắc cổ truyền tham khảo',
  'FRAMEWORK_CANDIDATE':                  'Khung phân tích kinh điển',
  'PRINCIPLE':                            'Nguyên lý tổng quát',
  'RULE_CANDIDATE_WITH_CAUSALITY_GUARD':  'Cổ lệ cần kiểm tra an toàn thực địa',
  'RULE_CANDIDATE_WITH_OUTCOME_SEPARATION':'Hình thái cổ pháp (Tách biệt dự đoán cát hung)',
  'HIGH_TEXT':                            'Văn bản xác thực cao',
  'VERIFIED_PRIMARY':                     'Đã đối chiếu cổ thư gốc',
  'TEXT_VERIFIED':                        'Văn bản đã kiểm định',
  'NO_DIRECT_EVIDENCE':                   'Không có cổ thư trực tiếp',
  'TECHNICAL_NOT_FENG_SHUI':              'Kỹ thuật hiện đại – không thuộc phong thủy',
  'REQUIRES_SCAN':                        'Cần quét / xác minh thêm',
  'PENDING_REVIEW':                       'Đang chờ rà soát',
  'MODERN_ONLY':                          'Chỉ áp dụng tiêu chuẩn hiện đại',
  'LOCKED':                               'Đã khóa – chưa công bố',
  'DRAFT':                                'Bản nháp',
};

const TITLE_OVERRIDES = {
  'LAND-001': 'Đại Địa Sơn Hà Làm Chủ (Khảo Sát Đại Thế Trước Nội Cục)',
  'LAND-002': 'Huyệt Địa Khoáng Đạt Bình Phục (Thế Đất Rộng Rãi Bằng Phẳng)',
  'LAND-003': 'Thủy Bão Sơn Triều (Thế Đất Ôm Tụ Sinh Khí)',
  'LAND-004': 'Đẩu Tả Khuynh Tà (Địa Hình Dốc Đổ Xiên Lệch)',
  'LAND-005': 'Lục Thân Thủ Tượng (Mô Hình Chỉnh Thể Khảo Sát)',
  'LAND-006': 'Thận Trọng Trạch Địa (Nguyên Tắc Lựa Chọn Đất Ở)',
  'LAND-007': 'Tứ Diện Cao Trung Ương Hạ (Thế Đất Trũng Lòng Chảo)',
  'LAND-008': 'Tiền Khoát Hậu Hiệp / Tiền Hiệp Hậu Khoát (Thế Đất Tóp Hậu & Nở Hậu)',
  'LAND-009': 'Cổ Quân Doanh, Chiến Trường & Thủy Khẩu (Vị Trí Đất Kiêng Kỵ)',
  'LAND-010': 'Ốc Cư Tư Nhuận (Quang Trạch & Sinh Khí Môi Trường)',
  'LAND-011': 'Lưỡng Thủy Giao Hội (Khảo Sát Thủy Thế Hợp Lưu)',
  'STAIR-EV-001': 'Khảo Chứng Cấu Kiện Bậc Thang (Doanh Tạo Pháp Thức)',
  'STAIR-EV-003': 'Quy Chuẩn Cổ Pháp Về Cầu Thang & Bậc Lên Xuống',
  'STAIR-EV-004': 'Giao Thông Đứng & Lối Thoát Nạn An Toàn',
  'STR-002':  'Quy Cách Tiết Diện Dầm Xà Chịu Lực (Doanh Tạo Pháp Thức)',
  'STR-003':  'Gia Cố & Liên Kết Kết Cấu Gỗ (Doanh Tạo Pháp Thức)',
  'TIM-006':  'Trạch Nhật Nhập Trạch & An Sàng (Hiệp Kỷ Biện Phương Thư)',
  'TIM-007':  'Phân Biệt Nghi Lễ & Quy Trình Thi Công An Toàn',
  'OCC-001':  'Trình Tự Nhập Trạch & Khởi Sự Cư Trú (Hiệp Kỷ Biện Phương Thư)'
};

const COMMENTARY_REPLACEMENTS = [
  [/Chưa được đặt ngưỡng %;\s*geometry engine chỉ đo tỉ lệ và lưu số đo,\s*còn rule cổ chỉ là phân loại định tính cho tới khi tìm thấy nguồn có định lượng\./g, 'Cổ thư chỉ ghi nhận phân loại hình thái định tính; trong thiết kế thực tế cần đo đạc kích thước cụ thể và đối chiếu với công năng sử dụng.'],
  [/A housekeeping\/spatial taboo; no need to create supernatural causality\./g, 'Cổ lệ sắp đặt vệ sinh không gian; không suy diễn thành quan hệ nhân quả siêu nhiên.'],
  [/Not a kitchen rule; retained only as well-environment hình thái\./g, 'Không phải quy tắc về bếp; chỉ lưu giữ như hình thái cảnh quan khu vực giếng nước.'],
  [/Do not infer whether 卯 means direction, time\/day or combined rule without source context\./g, 'Không suy đoán chữ Mão chỉ phương hướng, thời khắc hay quy tắc phối hợp khi chưa có ngữ cảnh văn bản gốc.'],
  [/Defect geometry is real; traditional social outcome is not causal\./g, 'Khuyết tật hình học là có thật; dự báo xã hội truyền thống không mang tính nhân quả khoa học.'],
  [/Ancient numeric claim exists, nhưng phải kiểm scan\/punctuation và unit lineage trước khi đưa vào engine\./g, 'Có ghi nhận số đo cổ thư, nhưng cần đối chiếu hệ đo lường lịch sử và văn bản trước khi áp dụng vào thực tế.'],
  [/Ritual event class separate from renovation\/building; modern demolition additionally requires safety engineering\./g, 'Tách biệt nghi thức truyền thống với kỹ thuật thi công xây dựng; việc phá dỡ hiện đại bắt buộc phải tuân thủ an toàn lao động và kỹ thuật công trình.'],
  [/geometry engine/gi,          'công cụ tính toán hình học'],
  [/general-form engine/gi,      'hệ thống phân tích hình thái tổng quát'],
  [/general-form/gi,             'hình thái tổng quát'],
  [/school[\s-]engine/gi,        'hệ thống trường phái'],
  [/school-specific/gi,          'thuộc trường phái đặc thù'],
  [/causal engine/gi,            'quy trình phân tích nhân quả'],
  [/causal fact/gi,              'quan hệ nhân quả thực tế'],
  [/causality guard/gi,          'kiểm soát nguyên nhân thực tế'],
  [/Event-First engine/gi,       'nguyên tắc ưu tiên sự kiện thực tế'],
  [/Rule Engine/gi,              'hệ thống phân tích học thuật'],
  [/modern-check/gi,             'kiểm tra tiêu chuẩn hiện đại'],
  [/hard[\s-]gate/gi,            'tiêu chuẩn an toàn bắt buộc'],
  [/hard[\s-]gates/gi,           'các tiêu chuẩn an toàn bắt buộc'],
  [/rule cổ/gi,                  'cổ lệ'],
  [/rules?/gi,                   'quy tắc'],
  [/motifs?/gi,                  'hình thái'],
  [/pipeline/gi,                 'quy trình'],
  [/TRADITIONAL_SITE_TABOO/g,    'vị trí đất kiêng kỵ truyền thống'],
  [/TRADITIONAL_OUTCOME/g,       'dự báo cát hung truyền thống'],
  [/traditional outcome/gi,      'dự báo cát hung truyền thống'],
  [/input hình học/gi,           'thông số kích thước mặt bằng'],
  [/folklore redteam/gi,         'đối chiếu phản biện dân gian'],
  [/cơ chế sinh học/gi,          'cơ chế vật lý'],
  [/drainage engineering/gi,     'kỹ thuật thoát nước hiện đại'],
  [/safety engineering/gi,       'kỹ thuật an toàn công trình'],
  [/enclosure graph/gi,          'sơ đồ không gian bao che'],
  [/circulation graph/gi,        'sơ đồ luân chuyển khí'],
  [/circulation topology/gi,     'cấu trúc luồng giao thông'],
  [/topology circulation/gi,     'cấu trúc luồng giao thông'],
  [/observables?/gi,             'yếu tố quan sát thực địa'],
  [/production/gi,               'áp dụng thực tế'],
  [/deferred/gi,                 'tạm hoãn để thẩm định thêm'],
  [/formalize/gi,                'chuẩn hóa'],
  [/collation/gi,                'đối chiếu văn bản'],
  [/semantic check/gi,           'kiểm tra ngữ nghĩa học thuật'],
  [/punctuation check/gi,        'kiểm tra dấu câu văn bản'],
  [/context check/gi,            'kiểm tra ngữ cảnh văn bản'],
  [/scan check/gi,               'đối chiếu bản khắc cổ thư'],
];

const EXACT_COMMENTARY_FIXES = {
  'VH-004': 'Câu này thuộc hệ ngôn ngữ lý khí–địa lý truyền thống, không nên giản lược “Kim Long” thành một vật thể địa lý duy nhất. Khi khảo cứu học thuật, phải giữ thuật ngữ gốc và liên kết đến chú giải của từng truyền thống; không tự chọn một cách giải rồi gọi là nghĩa duy nhất.',
  'PLAC-006': 'Đây là số liệu lịch sử cụ thể, khác với ngưỡng % do AI tự bịa. Cần kiểm tra bản khắc cổ thư và dấu câu trước khi áp dụng vào thực tế.',
  'PLAC-009': 'Cần xác định trục của nhà phụ và cửa ngõ; chỉ từ "có nhà phụ" chưa đủ.',
  'PLAC-010': 'Chỉ giữ hình thái đối trục trực tiếp. Dự báo cát hung khắc nghiệt truyền thống được tách rời hoàn toàn.',
  'PLAC-012': 'Đây là tập quán và điều kiêng kỵ truyền thống, không phải lệnh thi công hiện đại. Biện pháp thi công, rào chắn công trường phải theo an toàn lao động và pháp luật xây dựng.',
  'SAN-001': 'Không chuyển thành "cửa khu vệ sinh đối cửa chính gây bệnh". Cấu trúc vệ sinh cổ xưa và quan hệ không gian hoàn toàn khác khu vệ sinh hiện đại.',
  'SAN-002': 'Văn bản gần giống nguồn gia dụng đời trước; tính độc lập chưa được chứng minh, không tính như hai nguồn độc lập.',
  'SAN-004': 'Danh sách phương vị sau câu này có chỗ mờ trong bản khắc; cần đối chiếu kỹ lưỡng trước khi chuẩn hóa toàn bảng.',
  'WAT-004': 'Các danh từ không gian cổ cần đặt trong đúng ngữ cảnh; không áp dụng tùy tiện cho đường ống và bể nước hiện đại.',
  'TIM-001': 'Chính nguồn chuẩn hóa trạch nhật thừa nhận mâu thuẫn giữa các phái; hệ thống học thuật ghi nhận sự đa dạng chứ không giả định mọi hệ phái đồng nhất.',
  'TIM-003': 'Đây là căn cứ trực tiếp xác định thứ tự ưu tiên sự kiện trong quá trình khởi tạo công trình.'
};

function cleanCommentary(text, entryId) {
  if (entryId && EXACT_COMMENTARY_FIXES[entryId]) return EXACT_COMMENTARY_FIXES[entryId];
  if (!text) return text;
  let out = text;
  for (const [regex, replacement] of COMMENTARY_REPLACEMENTS) {
    out = out.replace(regex, replacement);
  }
  return out;
}

function translateApplication(raw) {
  if (!raw) return raw;
  // Handle comma-separated compound values like "road_geometry_left, road_geometry_right"
  if (raw.includes(',')) {
    return raw.split(',').map(s => translateApplication(s.trim())).join(', ');
  }
  const upper = raw.trim().toUpperCase();
  if (APPLICATION_MAP[upper]) return APPLICATION_MAP[upper];
  if (APPLICATION_MAP[raw.trim()]) return APPLICATION_MAP[raw.trim()];
  // Fallback: replace underscores with spaces, title-case
  return raw.trim().replace(/_/g, ' ').replace(/\b[A-Z]+\b/g, w => w.charAt(0) + w.slice(1).toLowerCase());
}

function translateEvidence(raw) {
  if (!raw) return raw;
  const trimmed = raw.trim();
  if (EVIDENCE_MAP[trimmed]) return EVIDENCE_MAP[trimmed];
  // Try uppercased
  const upper = trimmed.toUpperCase();
  if (EVIDENCE_MAP[upper]) return EVIDENCE_MAP[upper];
  // Fallback: replace underscores, title-case if all-caps pattern
  if (/^[A-Z_]+$/.test(trimmed)) {
    return trimmed.replace(/_/g, ' ').replace(/\b[A-Z]+\b/g, w => w.charAt(0) + w.slice(1).toLowerCase());
  }
  return trimmed;
}

function generateTitle(entry) {
  if (TITLE_OVERRIDES[entry.id]) return TITLE_OVERRIDES[entry.id];
  // If title is already meaningful (not equal to bare ID), keep it
  if (entry.title && entry.title !== entry.id) return entry.title;
  // Try to generate from hanViet or literal
  if (entry.hanViet) {
    const fragment = entry.hanViet.split('•')[0].trim().slice(0, 80);
    return fragment || entry.id;
  }
  if (entry.literal) {
    const fragment = entry.literal.split('.')[0].trim().slice(0, 80);
    return fragment || entry.id;
  }
  return entry.id;
}

/* ─── End Việt-hóa helpers ─────────────────────────────────────────── */

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function slash(file) {
  return path.relative(RELEASE, file).split(path.sep).join('/');
}

function stripMd(value = '') {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function fieldKey(label) {
  const key = label.replace(/^\[|\]$/g, '').replace(/:$/, '').trim().toUpperCase();
  if (key === 'ORIGINAL' || key === '原文') return 'original';
  if (key === 'HÁN-VIỆT' || key === 'HÁN VIỆT') return 'hanViet';
  if (key.includes('DỊCH SÁT')) return 'literal';
  if (key.includes('GIẢNG NGHĨA') || key.includes('BIÊN TẬP') || key.includes('THỰC CHIẾN') || key === 'SEMANTIC NOTE') return 'commentary';
  if (key.startsWith('NGUỒN')) return 'sourceId';
  if (key.includes('EVIDENCE') || key.includes('STATUS') || key.includes('PUBLISH STATE') || key === 'STATE' || key === 'CONFIDENCE') return 'evidence';
  if (key === 'APPLICATION' || key === 'OBSERVABLE') return 'application';
  if (key === 'CLASS') return 'recordClass';
  if (key === 'TRADITIONAL OUTCOME') return 'traditionalOutcome';
  return key.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

function parseStructuredMarkdown(markdown, batch) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const entries = [];
  let current = null;
  let activeField = null;

  const flush = () => {
    if (!current) return;
    Object.keys(current).forEach(key => {
      if (typeof current[key] === 'string') current[key] = stripMd(current[key]);
    });
    if (current.original || current.literal || current.commentary) entries.push(current);
    current = null;
    activeField = null;
  };

  for (const line of lines) {
    const heading = line.match(/^##\s+([A-ZÀ-Ỹ][A-Z0-9À-Ỹ_-]*-?\d+)(?:\s*[—-]\s*(.*))?\s*$/u);
    if (heading) {
      flush();
      current = { id: heading[1], title: stripMd(heading[2] || heading[1]), batch };
      continue;
    }
    if (!current) continue;
    if (/^---\s*$/.test(line)) {
      flush();
      continue;
    }
    const field = line.match(/^\*\*(.+?)\*\*\s*(.*)$/) || line.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (field) {
      activeField = fieldKey(field[1]);
      const sourceInLabel = field[1].match(/`([^`]+)`/);
      const value = field[2].trim() || (activeField === 'sourceId' && sourceInLabel ? sourceInLabel[1] : '');
      if (current[activeField] && value && ['original', 'hanViet', 'sourceId', 'commentary'].includes(activeField)) current[activeField] += ` • ${value}`;
      else current[activeField] = value;
      continue;
    }
    if (activeField && line.trim()) current[activeField] = `${current[activeField] || ''} ${line.trim()}`;
  }
  flush();
  return entries;
}

function markdownTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return stripMd(match ? match[1] : fallback);
}

function categoryFor(file) {
  const name = file.toLowerCase();
  if (name.includes('source_registry') || name.endsWith('modern_sources.json') || name.includes('canonical_source')) return 'source';
  if (name.includes('claim') || name.includes('evidence') || name.includes('motif')) return 'claim';
  if (name.includes('rule') || name.includes('engine') || name.includes('gate')) return 'rule';
  if (name.includes('case')) return 'case';
  if (name.includes('term') || name.includes('ontology') || name.includes('semantic_mapping')) return 'term';
  if (name.includes('conflict')) return 'conflict';
  return null;
}

function collectObjects(value, category, file, out) {
  if (Array.isArray(value)) return value.forEach(item => collectObjects(item, category, file, out));
  if (!value || typeof value !== 'object') return;
  const idKeys = ['source_id', 'claim_id', 'rule_id', 'case_id', 'term_id', 'conflict_id', 'gate_id', 'id'];
  const idKey = idKeys.find(key => typeof value[key] === 'string');
  if (idKey) {
    const id = value[idKey];
    const title = value.title_vi || value.canonical_title_vi || value.title || value.name_vi || value.name || value.text || value.claim || value.description || id;
    const state = value.publish_state || value.rule_state || value.evidence_status || value.status || value.state || value.canonical_state || '';
    const sourceIds = [value.source_id, value.primary_source_id]
      .concat(Array.isArray(value.source_ids) ? value.source_ids : [])
      .filter(Boolean);
    out.push({ id, category, title: stripMd(String(title)).slice(0, 300), state: String(state), sourceIds, file, data: value });
    return;
  }
  Object.values(value).forEach(child => collectObjects(child, category, file, out));
}

function writeJson(name, value) {
  fs.writeFileSync(path.join(OUTPUT, name), JSON.stringify(value), 'utf8');
}

function main() {
  if (!fs.existsSync(RELEASE)) throw new Error(`Missing immutable release: ${RELEASE}`);
  if (!fs.existsSync(PROVENANCE_FILE)) throw new Error(`Missing source provenance: ${PROVENANCE_FILE}`);
  fs.mkdirSync(OUTPUT, { recursive: true });
  const provenance = JSON.parse(fs.readFileSync(PROVENANCE_FILE, 'utf8'));
  const files = walk(RELEASE).sort();
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  const mdFiles = files.filter(file => file.endsWith('.md'));
  const parsedJson = new Map();
  const parseErrors = [];
  for (const file of jsonFiles) {
    try { parsedJson.set(slash(file), JSON.parse(fs.readFileSync(file, 'utf8'))); }
    catch (error) { parseErrors.push({ file: slash(file), error: error.message }); }
  }
  if (parseErrors.length) throw new Error(`JSON parse errors: ${JSON.stringify(parseErrors, null, 2)}`);

  const qa = parsedJson.get('QA_CHECKPOINT_H/QA_CHECKPOINT_H_REPORT.json');
  if (!qa || Object.values(qa.hard_results || {}).some(value => value !== 'PASS')) {
    throw new Error('QA-H hard results are missing or not green; publication is blocked.');
  }

  const articles = BATCHES.map(([batch, title, description, relativeFile]) => {
    const file = path.join(RELEASE, ...relativeFile.split('/'));
    if (!fs.existsSync(file)) throw new Error(`Missing primary article source: ${relativeFile}`);
    const markdown = fs.readFileSync(file, 'utf8');
    const entries = parseStructuredMarkdown(markdown, batch);

    // ── Việt-hóa mỗi entry ngay sau khi parse ──
    for (const ent of entries) {
      ent.title = generateTitle(ent);
      ent.commentary = cleanCommentary(ent.commentary, ent.id);
      ent.application = translateApplication(ent.application);
      ent.evidence_vi = translateEvidence(ent.evidence);
    }

    return {
      id: `batch-${batch}`,
      batch,
      title,
      description,
      sourceFile: relativeFile,
      sourceTitle: markdownTitle(markdown, title),
      entries,
      overview: stripMd(markdown.split(/^##\s+/m)[0].replace(/^#.*$/m, '')).slice(0, 1400)
    };
  });

  const records = [];
  for (const [file, value] of parsedJson) {
    const category = categoryFor(file);
    if (category) collectObjects(value, category, file, records);
  }
  const seenRecords = new Set();
  const uniqueRecords = records.filter(record => {
    const key = `${record.category}:${record.id}:${record.file}`;
    if (seenRecords.has(key)) return false;
    seenRecords.add(key);
    return true;
  });

  const sourceMap = new Map();
  const canonical = parsedJson.get('QA_CHECKPOINT_B/CANONICAL_SOURCE_REGISTRY_v1.0.json') || [];
  canonical.forEach(source => sourceMap.set(source.source_id, source));
  uniqueRecords.filter(record => record.category === 'source').forEach(record => {
    if (!sourceMap.has(record.id)) sourceMap.set(record.id, record.data);
  });
  const sources = [...sourceMap.values()].sort((a, b) => String(a.source_id).localeCompare(String(b.source_id)));

  const documents = mdFiles.map(file => {
    const markdown = fs.readFileSync(file, 'utf8');
    return { id: crypto.createHash('sha1').update(slash(file)).digest('hex').slice(0, 12), file: slash(file), title: markdownTitle(markdown, path.basename(file)), content: markdown };
  });

  const searchIndex = [];
  articles.forEach(article => article.entries.forEach(entry => searchIndex.push({
    kind: 'article', id: entry.id, batch: article.batch, title: entry.title, route: `#/thu-vien/duong-trach/bai/${article.id}?muc=${encodeURIComponent(entry.id)}`,
    text: [article.title, entry.title, entry.original, entry.hanViet, entry.literal, entry.commentary, entry.sourceId, entry.evidence, entry.evidence_vi, entry.application].filter(Boolean).join(' ')
  })));
  uniqueRecords.forEach(record => searchIndex.push({ kind: record.category, id: record.id, title: record.title, state: record.state, route: `#/thu-vien/duong-trach/nghien-cuu?ban-ghi=${encodeURIComponent(record.id)}`, text: [record.id, record.title, record.state, record.sourceIds.join(' ')].join(' ') }));
  documents.forEach(doc => searchIndex.push({ kind: 'document', id: doc.id, title: doc.title, route: `#/thu-vien/duong-trach/nghien-cuu?tai-lieu=${doc.id}`, text: `${doc.title} ${doc.content.replace(/[#*`>|_\[\]]/g, ' ')}` }));

  const articleEntryCount = articles.reduce((sum, article) => sum + article.entries.length, 0);
  const manifest = {
    release: 'LAPQUE_DUONG_TRACH_BATCH01_20_MASTER_CORPUS_QA_H',
    generatedAt: `${qa.date || '2026-09-01'}T00:00:00+07:00`,
    sourceArtifacts: provenance.artifacts,
    immutableSnapshotSha256: crypto.createHash('sha256').update(files.map(file => `${slash(file)}:${crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}`).join('\n')).digest('hex'),
    counts: { files: files.length, jsonDocuments: jsonFiles.length, markdownDocuments: mdFiles.length, sources: sources.length, records: uniqueRecords.length, articles: articles.length, articleEntries: articleEntryCount },
    qa: qa.hard_results,
    topics: articles.map(({ id, batch, title, description, sourceFile, entries }) => ({ id, batch, title, description, sourceFile, entryCount: entries.length })),
    invariants: qa.new_invariants || []
  };

  writeJson('manifest.json', manifest);
  writeJson('articles.json', articles);
  writeJson('sources.json', sources);
  writeJson('records.json', uniqueRecords);
  writeJson('documents.json', documents);
  writeJson('search-index.json', searchIndex);
  console.log(`Dương Trạch corpus generated: ${articleEntryCount} readable entries, ${uniqueRecords.length} machine records, ${sources.length} sources.`);
}

main();
