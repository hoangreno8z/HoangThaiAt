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
  ['03', 'An Toàn & Pháp Lý Hiện Đại', 'Hard gate hiện đại phải được xét trước khuyến nghị truyền thống.', 'BATCH03/02_HARD_GATE/pipeline.md'],
  ['04', 'Địa Thế Thực Chiến', 'Long, thế, minh đường, nước, thủy khẩu và quan hệ bao - xung.', 'BATCH04/03_VIET_HOA/dia_the_thuc_chien.md'],
  ['05', 'Hình Đất, Đường & Nước', 'Các motif hình học được giữ tách biệt với hậu quả truyền thống.', 'BATCH05/03_VIET_HOA/hinh_dat_duong_nuoc.md'],
  ['06', 'Đất Méo, Khuyết Phương & Tâm Nhà', 'Nhận diện hình đất bất quy tắc mà không tự đặt ngưỡng cổ pháp.', 'BATCH06/03_VIET_HOA/bat_tuc_phuong.md'],
  ['07', 'Đặt Nhà Trên Khu Đất', 'Quan hệ giữa ranh đất, công trình, pháp lý và điều kiện sử dụng.', 'BATCH07/03_VIET_HOA/dat_nha_tren_dat.md'],
  ['08', 'Cổng, Cửa Chính & Lối Vào', 'Cấu trúc tiếp cận, hình học cửa và hard gate an toàn cháy.', 'BATCH08/03_VIET_HOA/cong_cua_loi_vao.md'],
  ['09', 'Minh Đường, Sân & Giếng Trời', 'Khoảng mở, sân, thiên tỉnh và lớp khoa học công trình hiện đại.', 'BATCH09/04_VIET_HOA/open_spaces.md'],
  ['10', 'Phân Khu Phòng & Giao Thông', 'Tổ chức phòng, luồng đi lại và điều kiện tiếp cận.', 'BATCH10/04_VIET_HOA/phan_khu_phong.md'],
  ['11', 'Bếp, Hỏa, Nước & Khói', 'Cổ lệ về bếp được tách khỏi an toàn cháy, khói và độc chất.', 'BATCH11/04_VIET_HOA/bep_hoa_nuoc_khoi.md'],
  ['12', 'Phòng Ngủ, Giường & Nghỉ', 'Không gian ngủ, vị trí giường và lớp sức khỏe hiện đại.', 'BATCH12/04_VIET_HOA/phong_ngu_giuong.md'],
  ['13', 'Cầu Thang & Giao Thông Đứng', 'Quan hệ hình học, lưu thông và hard gate kết cấu - thoát nạn.', 'BATCH13/04_VIET_HOA/cau_thang.md'],
  ['14', 'WC, Vệ Sinh & Khu Phụ', 'Tách cổ lệ khỏi vệ sinh, nước thải và an toàn sức khỏe.', 'BATCH14/04_VIET_HOA/wc_ve_sinh.md'],
  ['15', 'Cửa Sổ, Ánh Sáng & Thông Gió', 'Vi khí hậu, ánh sáng và thông gió với hai lớp cổ - hiện đại.', 'BATCH15/04_VIET_HOA/cua_so_anh_sang_thong_gio.md'],
  ['16', 'Nước Sạch, Giếng, Bể & Thoát Nước', 'Nguồn nước, lưu trữ, nước mưa và hard gate chất lượng nước.', 'BATCH16/04_VIET_HOA/nuoc_gieng_be_thoat.md'],
  ['17', 'Mái, Hiên & Nước Mưa', 'Hình thức mái, chống hắt và thoát nước mái.', 'BATCH17/04_VIET_HOA/mai_hien_nuoc_mua.md'],
  ['18', 'Vật Liệu, Kết Cấu & Hư Hỏng', 'Đánh giá hiện trạng, hư hỏng và ưu tiên an toàn kết cấu.', 'BATCH18/05_VIET_HOA/vat_lieu_ket_cau.md'],
  ['19', 'Trình Tự Xây Dựng & Sửa Chữa', 'Phân biệt trình tự công trình, trạch nhật và các đầu ra đang bị khóa.', 'BATCH19/05_VIET_HOA/trinh_tu_xay_dung_trach_nhat.md'],
  ['20', 'Hoàn Thành, Nghiệm Thu & Nhập Trạch', 'Sẵn sàng để ở phải đi trước nghi thức chuyển vào nhà.', 'BATCH20/04_VIET_HOA/hoan_thanh_nhap_trach.md']
];

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
    text: [article.title, entry.title, entry.original, entry.hanViet, entry.literal, entry.commentary, entry.sourceId, entry.evidence].filter(Boolean).join(' ')
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
