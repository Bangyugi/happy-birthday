/**
 * Procedural Web Audio API Sound Effects Engine
 * Happy Birthday Website (Lâm Oanh)
 *
 * Implements ultra-responsive, 100% offline, procedural sound synthesis
 * for all interactive moments: candle blowing, candle lighting, box locking/opening/closing,
 * cosmic stardust surge, constellation star dings, 3D card fly-in, paper flipping,
 * mechanical typewriter typing, and completion chime.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
    this.lastTypewriterTime = 0;
    this.lastStarDingTime = 0;
    this.initAudioContext();
    this.bindUnlockEvents();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser:', e);
    }
  }

  setVolume(volume = 0.75) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  unlock() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(() => {});
    } else {
      this.isUnlocked = true;
    }
  }

  bindUnlockEvents() {
    const unlockHandler = () => {
      this.unlock();
      window.removeEventListener('pointerdown', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
    };
    window.addEventListener('pointerdown', unlockHandler, { once: true, passive: true });
    window.addEventListener('keydown', unlockHandler, { once: true, passive: true });
    window.addEventListener('touchstart', unlockHandler, { once: true, passive: true });
  }

  createWhiteNoiseBuffer(durationSec = 0.5) {
    if (!this.ctx) return null;
    const bufferSize = Math.floor(this.ctx.sampleRate * durationSec);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * 1. Candle Blow Out Sound:
   * Smooth wind puff (bandpass sweeping down) + gentle ember sizzle
   */
  playCandleBlow() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.46;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.8, now);
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.42, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);

    // Subtle ember sizzle tail
    const sizzleDur = 0.28;
    const sizzleBuf = this.createWhiteNoiseBuffer(sizzleDur);
    if (sizzleBuf) {
      const sSrc = this.ctx.createBufferSource();
      sSrc.buffer = sizzleBuf;
      const sFilt = this.ctx.createBiquadFilter();
      sFilt.type = 'highpass';
      sFilt.frequency.setValueAtTime(4500, now + 0.15);
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.0001, now + 0.15);
      sGain.gain.linearRampToValueAtTime(0.07, now + 0.2);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15 + sizzleDur);

      sSrc.connect(sFilt);
      sFilt.connect(sGain);
      sGain.connect(this.masterGain);
      sSrc.start(now + 0.15);
      sSrc.stop(now + 0.15 + sizzleDur);
    }
  }

  /**
   * 2. Candle Ignite Sound:
   * Quick match strike noise + warm upward rising flame hum
   */
  playCandleIgnite() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Match strike
    const noiseBuffer = this.createWhiteNoiseBuffer(0.06);
    if (noiseBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = noiseBuffer;
      const f = this.ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.setValueAtTime(2800, now);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.24, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      src.connect(f);
      f.connect(g);
      g.connect(this.masterGain);
      src.start(now);
      src.stop(now + 0.06);
    }

    // Warm flame bloom
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.22);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.001, now);
    oscGain.gain.linearRampToValueAtTime(0.26, now + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * 3. Box Locked Wobble / Shake Sound:
   * Comedic wooden knock "cọc cọc"
   */
  playBoxLocked() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const playKnock = (delay, freq) => {
      const t = now + delay;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.055);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.38, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.055);
    };

    playKnock(0, 210);
    playKnock(0.085, 175);
  }

  /**
   * 4. Memory Box Open Sound:
   * Smooth wooden hinge creak + latch click + magical subtle shimmer
   */
  playBoxOpen() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Wooden creak
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.38);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.2, now + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.42);

    // Mechanical latch snap
    const clickOsc = this.ctx.createOscillator();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1300, now);
    clickOsc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

    const clickG = this.ctx.createGain();
    clickG.gain.setValueAtTime(0.22, now);
    clickG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    clickOsc.connect(clickG);
    clickG.connect(this.masterGain);

    clickOsc.start(now);
    clickOsc.stop(now + 0.025);
  }

  /**
   * 5. Cosmic Stardust & Galaxy Surge Sound:
   * Cascading celestial pentatonic chimes & bell arpeggios
   */
  playCosmicSurge() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 880.00, 987.77, 1174.66, 1318.51, 1567.98, 1760.00]; // E5, G5, A5, B5, D6, E6, G6, A6

    notes.forEach((freq, idx) => {
      const t = now + idx * 0.08;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Shimmer overtone
      const overtone = this.ctx.createOscillator();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.008, t);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.13, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

      osc.connect(g);
      overtone.connect(g);
      g.connect(this.masterGain);

      osc.start(t);
      overtone.start(t);
      osc.stop(t + 0.7);
      overtone.stop(t + 0.7);
    });
  }

  /**
   * 6. Constellation Star Ding Sound:
   * Crystal bell ding as constellation lines connect each node
   */
  playStarDing(index = 0) {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Throttle to prevent ding spam
    if (now - this.lastStarDingTime < 0.06) return;
    this.lastStarDingTime = now;

    const scale = [1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00, 1975.53, 2093.00, 2349.32];
    const freq = scale[index % scale.length];

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const harmonic = this.ctx.createOscillator();
    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.12, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    osc.connect(g);
    harmonic.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 0.55);
    harmonic.stop(now + 0.55);
  }

  /**
   * 7. Floating Greeting Card Emerge Sound:
   * Gentle magical ascent
   */
  playCardEmerge() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.45);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.16, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * 8. Card Fly into 3D View Sound:
   * Smooth 3D whoosh air swoosh transition
   */
  playCardFly() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.55;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.8, now);
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.exponentialRampToValueAtTime(1150, now + dur * 0.55);
    filter.frequency.exponentialRampToValueAtTime(420, now + dur);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.28, now + dur * 0.4);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }

  /**
   * 9. 3D Card Page Flip / Unfold Sound:
   * Crisp artisan paper friction / opening rustle
   */
  playPaperFlip() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.24;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.24, now + 0.035);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }

  /**
   * 10. Mechanical Antique Typewriter Key Click Sound:
   * Subtle keystroke click with pitch jitter for natural variety
   */
  playTypewriterKey(char = '') {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Small frequency jitter for organic keystroke variety
    const jitter = 1 + (Math.random() * 0.16 - 0.08);
    const baseFreq = (char === ' ' || char === ',' || char === '.') ? 380 : 580;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq * jitter, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.024);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.024);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.024);
  }

  /**
   * 11. Typewriter Line / Letter Completion Bell:
   * Delicate classic carriage-return bell chime
   */
  playTypewriterBell() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2093.00, now); // C7 bell

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.2, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  /**
   * 12. Memory Box Close Sound:
   * Soft, cushioned wooden lid close thud
   */
  playBoxClose() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  /**
   * 13. Greeting Card Fold / Modal Close Sound:
   * Subtle soft paper close
   */
  playCardClose() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.18;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1700, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }
}

// Global Singleton Instance
window.soundEngine = new SoundEngine();
