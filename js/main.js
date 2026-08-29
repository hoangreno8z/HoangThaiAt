// =========================================================================
// HUYỀN HỌC MỤ — MAIN APP CONTROLLER & MOBILE DRAWER (BULLETPROOF)
// =========================================================================

// Sound Controller for ancient chime
class SoundController {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
  }

  playBell(freq = 432, duration = 2.5) {
    if (!this.enabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, this.audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}

// Drawer Controller on Mobile
class MobileDrawerController {
  constructor() {
    this.drawer = document.getElementById('app-mobile-drawer');
    this.overlay = document.getElementById('mobile-drawer-overlay');
    this.toggleBtn = document.getElementById('drawer-toggle-btn');
    this.closeBtn = document.getElementById('mobile-drawer-close');
    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
      this.toggleBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
      this.closeBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
      this.overlay.addEventListener('touchend', () => this.close());
    }

    // Auto-close drawer on link click
    if (this.drawer) {
      this.drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
    }
  }

  open() {
    if (this.drawer) this.drawer.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.drawer) this.drawer.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initializeApp() {
  if (!window.soundCtrl) {
    window.soundCtrl = new SoundController();
  }
  if (!window.mobileDrawer) {
    window.mobileDrawer = new MobileDrawerController();
  }
}

// Immediate init & Event Listeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

window.addEventListener('load', initializeApp);
