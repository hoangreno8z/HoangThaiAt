# VIỆT HÓA BATCH 05 — HÌNH ĐẤT, ĐƯỜNG, NƯỚC

Mỗi motif là một **đơn vị khái niệm**, có thể chứa nhiều truyền bản. Nhiều truyền bản chưa chắc độc lập về lịch sử văn bản.

## Nhãn bắt buộc
- `TRADITIONAL_OUTCOME`: phán cổ, không phải quan hệ nhân quả hiện đại.
- `REFERENCE_ONLY`: chưa đủ để sinh rule production.
- `UNRESOLVED`: không được tự đoán nghĩa kỹ thuật.


## MOTIF-001 — Đại thế ưu tiên trước nội cục

**Nguồn `SRC-GJTS675-P69`**  
[原文] 人之居處，宜以大地山河為主。  
[HÁN-VIỆT] Nhân chi cư xứ, nghi dĩ đại địa sơn hà vi chủ.  

**[DỊCH SÁT/TỔNG HỢP]** Nơi người ở nên lấy đại thế đất đai, núi sông làm chủ.  

**Observable:** `site_context, terrain, water, roads, surrounding_mass`  

**Traditional outcome:** `None`  

**Publish state:** `CORE_PRINCIPLE`  


---


## MOTIF-002 — Đất rộng, tương đối bằng

**Nguồn `SRC-GJTS675-P69`**  
[原文] 居處須用寬平勢。  
[HÁN-VIỆT] Cư xứ tu dụng khoan bình thế.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 宅地平坦，吉。  
[HÁN-VIỆT] Trạch địa bình thản, cát.  

**[DỊCH SÁT/TỔNG HỢP]** Nơi cư trú được ưu tiên thế đất rộng và tương đối bằng; Đa Năng Bỉ Sự cũng coi đất nhà bằng là tốt.  

**Observable:** `usable_area, slope_surface, grade_breaks`  

**Traditional outcome:** `吉`  

**Publish state:** `CORE_FORM_MOTIF`  


---


## MOTIF-003 — Nước bao vòng

**Nguồn `SRC-GJTS675-P69`**  
[原文] 前後有水環抱貴。  
[HÁN-VIỆT] Tiền hậu hữu thủy hoàn bão quý.  

**[DỊCH SÁT/TỔNG HỢP]** Trước sau có nước uốn bao được truyền thống xem là quý.  

**Observable:** `water_curvature_relative_to_site, flow_direction, distance_to_water`  

**Traditional outcome:** `貴`  

**Publish state:** `FORM_MOTIF_WITH_HYDROLOGY_HARD_GATE`  


---


## MOTIF-004 — Đường hai bên và thuật ngữ 返跳

**Nguồn `SRC-GJTS675-P69`**  
[原文] 左右有路亦如然，但遇返跳必須忌。  
[HÁN-VIỆT] Tả hữu hữu lộ diệc như nhiên, đãn ngộ phản khiêu tất tu kỵ.  

**[DỊCH SÁT/TỔNG HỢP]** Hai bên có đường cũng được xét tương tự, nhưng gặp thế gọi là 'phản khiêu' thì phải kỵ.  

**Observable:** `road_geometry_left, road_geometry_right, road_curvature`  

**Traditional outcome:** `忌`  

**Publish state:** `UNKNOWN_UNTIL_TERM_RESOLVED`  

**Term status:** `{"返跳": "UNRESOLVED_GEOMETRIC_MEANING"}`  


---


## MOTIF-005 — Thủy khẩu: có thu giữ nhưng không quá bức

**Nguồn `SRC-GJTS675-P69`**  
[原文] 更須水口收拾緊，不宜太迫成小器。  
[HÁN-VIỆT] Cánh tu thủy khẩu thu thập khẩn, bất nghi thái bách thành tiểu khí.  

**[DỊCH SÁT/TỔNG HỢP]** Thủy khẩu được yêu cầu có tính thu giữ, nhưng không nên quá bức ép/chật hẹp.  

**Observable:** `water_outlet_geometry, closure, constriction`  

**Traditional outcome:** `None`  

**Publish state:** `CORE_MOTIF_NO_NUMERIC_THRESHOLD`  


---


## MOTIF-006 — Tứ tượng dưới dạng ngoại cảnh cụ thể

**Nguồn `SRC-GJTS675-P69`**  
[原文] 左有流水謂之青龍；右有長道謂之白虎；前有汙池謂之朱雀；後有丘陵謂之元武。  
[HÁN-VIỆT] Tả hữu lưu thủy vị chi Thanh Long; hữu hữu trường đạo vị chi Bạch Hổ; tiền hữu ô trì vị chi Chu Tước; hậu hữu khâu lăng vị chi Huyền Vũ.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 欲左有流水，右有長道，前有池塘，後有丘陵佳。  
[HÁN-VIỆT] Dục tả hữu lưu thủy, hữu hữu trường đạo, tiền hữu trì đường, hậu hữu khâu lăng giai.  

**[DỊCH SÁT/TỔNG HỢP]** Một truyền bản gán dòng nước bên trái là Thanh Long, đường dài bên phải là Bạch Hổ, ao phía trước là Chu Tước và gò đồi phía sau là Huyền Vũ.  

**Observable:** `left_water, right_road, front_waterbody, rear_landform`  

**Traditional outcome:** `佳/最貴`  

**Publish state:** `TEXT_SPECIFIC_MAPPING_NOT_UNIVERSAL`  


---


## MOTIF-007 — Không ở đúng chỗ dòng nước xông/chảy trực tiếp

**Nguồn `SRC-GJTS675-P69`**  
[原文] 不居正當水流處。  
[HÁN-VIỆT] Bất cư chính đương thủy lưu xứ.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 勿居正當水流處。  
[HÁN-VIỆT] Vật cư chính đương thủy lưu xứ.  

**[DỊCH SÁT/TỔNG HỢP]** Không nên chọn nơi nằm đúng vào hướng/dòng nước chảy xông tới.  

**Observable:** `flow_vector, channel_axis, parcel_intersection, erosion_zone`  

**Traditional outcome:** `None`  

**Publish state:** `CORE_TABOO_WITH_MODERN_HYDROLOGY_GATE`  


---


## MOTIF-008 — Không ở nơi bị sống núi xung

**Nguồn `SRC-GJTS675-P69`**  
[原文] 不居山脊衝處。  
[HÁN-VIỆT] Bất cư sơn tích xung xứ.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 勿居山脊衝處。  
[HÁN-VIỆT] Vật cư sơn tích xung xứ.  

**[DỊCH SÁT/TỔNG HỢP]** Không nên ở nơi mà thế sống núi hướng xung trực tiếp.  

**Observable:** `ridge_axis, site_axis, slope, landslide_hazard`  

**Traditional outcome:** `None`  

**Publish state:** `FORM_TABOO_WITH_GEOTECH_HARD_GATE`  


---


## MOTIF-009 — Không ở nơi 'bách xuyên khẩu'

**Nguồn `SRC-GJTS675-P69`**  
[原文] 不居百川口處。  
[HÁN-VIỆT] Bất cư bách xuyên khẩu xứ.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 勿居……百川口。  
[HÁN-VIỆT] Vật cư... bách xuyên khẩu.  

**[DỊCH SÁT/TỔNG HỢP]** Không nên ở tại nơi được văn bản gọi là cửa/họng hội của nhiều dòng nước.  

**Observable:** `confluence, outlet, channel_count, floodplain`  

**Traditional outcome:** `None`  

**Publish state:** `TERM_CONTEXT_REQUIRES_HYDROLOGY_MAPPING`  


---


## MOTIF-010 — Đường/nước/cầu giao xung bốn phía

**Nguồn `SRC-GJTS675-P69`**  
[原文] 凡宅或水路橋梁四面交衝者，使子孫怯弱，主不吉利。  
[HÁN-VIỆT] Phàm trạch hoặc thủy lộ kiều lương tứ diện giao xung giả, sử tử tôn khiếp nhược, chủ bất cát lợi.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 凡宅，四面交衝，使子孫怯弱。  
[HÁN-VIỆT] Phàm trạch, tứ diện giao xung, sử tử tôn khiếp nhược.  

**[DỊCH SÁT/TỔNG HỢP]** Nhà bị đường nước/cầu lối giao xung từ nhiều phía được truyền thống coi là không tốt.  

**Observable:** `approach_axes, road_network, bridge_axes, water_axes`  

**Traditional outcome:** `子孫怯弱/不吉利`  

**Publish state:** `CORE_NETWORK_MOTIF_OUTCOME_SEPARATED`  


---


## MOTIF-011 — Trước thấp sau cao

**Nguồn `SRC-GJTS675-P69`**  
[原文] 凡宅前低後高，世出英豪。  
[HÁN-VIỆT] Phàm trạch tiền đê hậu cao, thế xuất anh hào.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 凡宅，前低後高，世出英豪。  
[HÁN-VIỆT] Phàm trạch, tiền đê hậu cao, thế xuất anh hào.  

**[DỊCH SÁT/TỔNG HỢP]** Nhà/đất có phía trước thấp hơn phía sau được truyền thống phán là tốt.  

**Observable:** `front_elevation, rear_elevation, grade_direction`  

**Traditional outcome:** `世出英豪`  

**Publish state:** `FORM_MOTIF_OUTCOME_NOT_CAUSAL`  


---


## MOTIF-012 — Trước cao sau thấp

**Nguồn `SRC-GJTS675-P69`**  
[原文] 前高後低，長幼昏迷。  
[HÁN-VIỆT] Tiền cao hậu đê, trưởng ấu hôn mê.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 前高後低，長幼昏迷。  
[HÁN-VIỆT] Tiền cao hậu đê, trưởng ấu hôn mê.  

**[DỊCH SÁT/TỔNG HỢP]** Phía trước cao hơn phía sau bị truyền thống coi là bất lợi.  

**Observable:** `front_elevation, rear_elevation, grade_direction`  

**Traditional outcome:** `長幼昏迷`  

**Publish state:** `FORM_MOTIF_OUTCOME_NOT_CAUSAL`  


---


## MOTIF-013 — Bốn phía cao, giữa thấp

**Nguồn `SRC-DNBS-V5`**  
[原文] 四面高、中央下，先富後貧。  
[HÁN-VIỆT] Tứ diện cao, trung ương hạ, tiên phú hậu bần.  

**[DỊCH SÁT/TỔNG HỢP]** Thế đất bốn phía cao, trung tâm thấp bị truyền thống coi là bất lợi về lâu dài.  

**Observable:** `perimeter_elevation_profile, center_elevation, drainage_sink`  

**Traditional outcome:** `先富後貧`  

**Publish state:** `CORE_BASIN_MOTIF_WITH_DRAINAGE_GATE`  


---


## MOTIF-014 — Trước hẹp sau rộng

**Nguồn `SRC-DNBS-V5`**  
[原文] 前狹後闊，安吉。  
[HÁN-VIỆT] Tiền hiệp hậu khoát, an cát.  

**Nguồn `SRC-GJTS675-P70`**  
[原文] 前狹後寬，居之穩。  
[HÁN-VIỆT] Tiền hiệp hậu khoan, cư chi ổn.  

**[DỊCH SÁT/TỔNG HỢP]** Lô/thế trước hẹp sau rộng được các witness này phán theo hướng tốt.  

**Observable:** `front_width, rear_width, width_profile`  

**Traditional outcome:** `安吉/居之穩`  

**Publish state:** `CORE_SHAPE_MOTIF`  


---


## MOTIF-015 — Trước rộng sau hẹp

**Nguồn `SRC-DNBS-V5`**  
[原文] 前闊後狹，主人貧乏。  
[HÁN-VIỆT] Tiền khoát hậu hiệp, chủ nhân bần phạp.  

**Nguồn `SRC-GJTS675-P70`**  
[原文] 前寬後狹似棺形。  
[HÁN-VIỆT] Tiền khoan hậu hiệp tự quan hình.  

**[DỊCH SÁT/TỔNG HỢP]** Lô/thế trước rộng sau hẹp bị các witness này phán theo hướng xấu.  

**Observable:** `front_width, rear_width, width_profile`  

**Traditional outcome:** `貧乏/不安寧等`  

**Publish state:** `CORE_SHAPE_MOTIF_WITH_CONFLICT_FLAG`  

**Conflict:** `CONFLICT-001`  


---


## MOTIF-016 — Trái ngắn phải dài

**Nguồn `SRC-DNBS-V5`**  
[原文] 左短右長，居之吉昌。  
[HÁN-VIỆT] Tả đoản hữu trường, cư chi cát xương.  

**[DỊCH SÁT/TỔNG HỢP]** Thế trái ngắn, phải dài được truyền bản này coi là tốt.  

**Observable:** `left_depth_or_side_length, right_depth_or_side_length`  

**Traditional outcome:** `吉昌`  

**Publish state:** `SHAPE_MOTIF_NEEDS_FRONT_REFERENCE`  


---


## MOTIF-017 — Trái dài phải ngắn

**Nguồn `SRC-DNBS-V5`**  
[原文] 左長右短，先富後貧。  
[HÁN-VIỆT] Tả trường hữu đoản, tiên phú hậu bần.  

**[DỊCH SÁT/TỔNG HỢP]** Thế trái dài, phải ngắn bị truyền bản này coi là bất lợi về sau.  

**Observable:** `left_depth_or_side_length, right_depth_or_side_length`  

**Traditional outcome:** `先富後貧`  

**Publish state:** `SHAPE_MOTIF_NEEDS_FRONT_REFERENCE`  


---


## MOTIF-018 — Nam–Bắc dài, Đông–Tây hẹp

**Nguồn `SRC-GJTS675-P69`**  
[原文] 南北長，東西狹吉。  
[HÁN-VIỆT] Nam Bắc trường, Đông Tây hiệp cát.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 南北長，子孫昌。  
[HÁN-VIỆT] Nam Bắc trường, tử tôn xương.  

**[DỊCH SÁT/TỔNG HỢP]** Truyền bản coi trục Nam–Bắc dài là thuận lợi.  

**Observable:** `cardinal_length_ns, cardinal_length_ew`  

**Traditional outcome:** `吉/子孫昌`  

**Publish state:** `DIRECTIONAL_RULE_DEFER_TO_ORIENTATION_MODULE`  


---


## MOTIF-019 — Đông–Tây dài/rộng

**Nguồn `SRC-GJTS675-P69`**  
[原文] 東西長，南北狹，初凶後吉。  
[HÁN-VIỆT] Đông Tây trường, Nam Bắc hiệp, sơ hung hậu cát.  

**Nguồn `SRC-DNBS-V5`**  
[原文] 東西闊，不宜人且貧。  
[HÁN-VIỆT] Đông Tây khoát, bất nghi nhân thả bần.  

**[DỊCH SÁT/TỔNG HỢP]** Các truyền bản có phán khác nhau về thế kéo dài/rộng theo Đông–Tây.  

**Observable:** `cardinal_length_ns, cardinal_length_ew`  

**Traditional outcome:** `VARIANT/CONTESTED`  

**Publish state:** `CONFLICTED_DIRECTIONAL`  

**Conflict:** `CONFLICT-002`  


---


## MOTIF-020 — Mương/rãnh nước phân hình chữ Bát

**Nguồn `SRC-GJTS675-P69`**  
[原文] 凡宅門前屋後溝渠水，不可分八字，及前後水出。  
[HÁN-VIỆT] Phàm trạch môn tiền ốc hậu câu cừ thủy, bất khả phân bát tự, cập tiền hậu thủy xuất.  

**[DỊCH SÁT/TỔNG HỢP]** Mương/rãnh nước trước hoặc sau nhà không nên phân tách thành dạng được gọi là 'chữ Bát', cũng không chuộng nước thoát cả trước lẫn sau.  

**Observable:** `channel_split_geometry, front_outflow, rear_outflow`  

**Traditional outcome:** `絕嗣敗財 (tách riêng, không causal)`  

**Publish state:** `WATER_GEOMETRY_CANDIDATE`  


---


## MOTIF-021 — Đất bốn phía tương đối bằng/tròn

**Nguồn `SRC-GJTS675-P71`**  
[原文] 此宅方圓，四面平……家豪富貴旺人丁。  
[HÁN-VIỆT] Thử trạch phương viên, tứ diện bình... gia hào phú quý vượng nhân đinh.  

**[DỊCH SÁT/TỔNG HỢP]** Một caption đồ hình mô tả nền nhà vuông/tròn, bốn phía bằng là tốt.  

**Observable:** `parcel_compactness, perimeter_levelness`  

**Traditional outcome:** `富貴旺人丁`  

**Publish state:** `FIGURE_CAPTION_UNPROOFREAD_REFERENCE_ONLY`  


---


## MOTIF-022 — Núi phía sau / núi phía trước

**Nguồn `SRC-GJTS675-P71`**  
[原文] 後邊有山可安莊。  
[HÁN-VIỆT] Hậu biên hữu sơn khả an trang.  

**Nguồn `SRC-GJTS675-P71`**  
[原文] 前有大山，不可安莊。  
[HÁN-VIỆT] Tiền hữu đại sơn, bất khả an trang.  

**[DỊCH SÁT/TỔNG HỢP]** Caption đồ hình ưu tiên thế có núi phía sau và phản đối một số trường hợp núi lớn phía trước.  

**Observable:** `rear_mass_distance, front_mass_distance, front_sky_view, slope_hazard`  

**Traditional outcome:** `TRADITIONAL_GOOD/BAD`  

**Publish state:** `CONTEXT_DISTANCE_UNKNOWN_FIGURE_LAYOUT_UNPROOFREAD`  


---


## MOTIF-023 — Bốn phía có đường giao

**Nguồn `SRC-GJTS675-P71`**  
[原文] 四面交道，主凶殃。  
[HÁN-VIỆT] Tứ diện giao đạo, chủ hung ương.  

**[DỊCH SÁT/TỔNG HỢP]** Một caption đồ hình coi thế đường giao từ bốn phía là bất lợi.  

**Observable:** `road_approach_count, intersection_topology, traffic_volume`  

**Traditional outcome:** `凶殃等`  

**Publish state:** `SUPPORTING_WITNESS_FOR_MOTIF-010_LAYOUT_UNPROOFREAD`  


---


## MOTIF-024 — Đất ở '涯水頭'

**Nguồn `SRC-GJTS675-P70`**  
[原文] 此宅修在涯水頭……地不堪修。  
[HÁN-VIỆT] Thử trạch tu tại nhai thủy đầu... địa bất kham tu.  

**[DỊCH SÁT/TỔNG HỢP]** Caption cảnh báo một dạng vị trí gọi là 'nhai thủy đầu'.  

**Observable:** `water_edge, bank_geometry, head_of_water_feature`  

**Traditional outcome:** `不堪修`  

**Publish state:** `TERM_UNRESOLVED_REFERENCE_ONLY`  

**Term status:** `{"涯水頭": "UNRESOLVED"}`  


---
