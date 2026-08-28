/**
 * HUYEN HOC MU — CORE APPLICATION BOOTSTRAPPER (LEAN & CRASH-FREE)
 * Toi uu hoa tuyet doi: Khu bo toan bo DOM rendering hang loat cu,
 * chuyen giao hoan toan quyen dieu khien cho Router SPA va Reader Engine.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBell(freq = 432) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
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
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Tu dong dong drawer khi bam vao bat ky lien ket nao trong menu
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

document.addEventListener('DOMContentLoaded', () => {
  window.soundCtrl = new SoundController();
  window.mobileDrawer = new MobileDrawerController();

  // Play subtle bell sound on first user click
  const firstClickSound = () => {
    window.soundCtrl.playBell(528);
    document.removeEventListener('click', firstClickSound);
  };
  document.addEventListener('click', firstClickSound, { once: true });
});