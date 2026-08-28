// =========================================================================
// HUYỀN HỌC MỤ — MASTER KNOWLEDGE REGISTRY & PLUGIN ENGINE (PHASE 14+)
// Hệ thống đăng ký tri thức mở rộng tự động (Extensible Knowledge Registry)
// =========================================================================

class KnowledgeRegistry {
  constructor() {
    this.tracks = {};
    this.books = {};
    this.tools = {};
    this.concepts = [];
    this.terms = [];
    this.cache = new Map();
    this.listeners = [];
  }

  // 1. Đăng ký Tuyến Học Tập Mới (Register Learning Track)
  registerTrack(config, dataProvider) {
    if (!config || !config.id) return;
    this.tracks[config.id] = {
      ...config,
      parts: Array.isArray(dataProvider) ? dataProvider : [],
      loader: typeof dataProvider === 'function' ? dataProvider : null
    };

    // Thông báo cho Search Engine cập nhật lại Index
    if (window.scholarlySearchEngine && typeof window.scholarlySearchEngine.buildIndex === 'function') {
      window.scholarlySearchEngine.buildIndex();
    }
    this.notifyChange('track', config.id);
  }

  // 2. Lấy dữ liệu bài học theo cơ chế Lazy Loading
  async getLesson(trackId, lessonIndex) {
    const key = `${trackId}_${lessonIndex}`;
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const track = this.tracks[trackId];
    if (!track) return null;

    let lesson = null;
    const idx = parseInt(lessonIndex, 10) - 1;

    if (track.parts && track.parts[idx]) {
      lesson = track.parts[idx];
    } else if (typeof track.loader === 'function') {
      // Dynamic Lazy Fetching for future big data chunks
      lesson = await track.loader(lessonIndex);
    }

    if (lesson) {
      this.cache.set(key, lesson);
    }
    return lesson;
  }

  // 3. Đăng ký Cổ Thư Mới (Register Classical Book)
  registerBook(bookConfig) {
    if (!bookConfig || !bookConfig.id) return;
    this.books[bookConfig.id] = bookConfig;

    if (window.libraryUI && Array.isArray(window.libraryUI.books)) {
      const exists = window.libraryUI.books.some(b => b.id === bookConfig.id);
      if (!exists) {
        window.libraryUI.books.push(bookConfig);
      }
    }
    this.notifyChange('book', bookConfig.id);
  }

  // 4. Đăng ký Bàn Tính / Công Cụ Mới (Register Tool)
  registerTool(toolConfig) {
    if (!toolConfig || !toolConfig.id) return;
    this.tools[toolConfig.id] = toolConfig;
    this.notifyChange('tool', toolConfig.id);
  }

  // 5. Đăng ký Khái Niệm & Thuật Ngữ
  registerConcepts(conceptsList) {
    if (Array.isArray(conceptsList)) {
      this.concepts.push(...conceptsList);
    }
  }

  // 6. Lấy danh sách toàn bộ Tracks
  getAllTracks() {
    return this.tracks;
  }

  // 7. Lấy danh sách toàn bộ Cổ Thư
  getAllBooks() {
    return Object.values(this.books);
  }

  // 8. Đăng ký lắng nghe sự kiện khi có dữ liệu mới
  subscribe(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
    }
  }

  notifyChange(type, id) {
    this.listeners.forEach(fn => {
      try { fn(type, id); } catch (e) {}
    });
  }
}

// Khởi tạo Singleton KnowledgeRegistry Toàn Cục
window.knowledgeRegistry = new KnowledgeRegistry();

// Nạp dữ liệu mặc định ban đầu vào Registry
document.addEventListener('DOMContentLoaded', () => {
  // 1. Đăng ký 6 Giáo trình mặc định
  if (window.scholarlyReader && window.scholarlyReader.tracks) {
    Object.entries(window.scholarlyReader.tracks).forEach(([k, t]) => {
      window.knowledgeRegistry.registerTrack(t, t.parts);
    });
  }

  // 2. Đăng ký các Cổ thư mặc định
  if (window.libraryUI && Array.isArray(window.libraryUI.books)) {
    window.libraryUI.books.forEach(b => {
      window.knowledgeRegistry.registerBook(b);
    });
  }
});
