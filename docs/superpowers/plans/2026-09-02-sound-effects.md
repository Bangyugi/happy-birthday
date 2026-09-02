# Sound Effects (SFX) Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a rich, procedural Web Audio API Sound Effects Engine into the birthday website for all visual events and interactions.

**Architecture:** A standalone module `sound-effects.js` encapsulates all audio synthesis algorithms (noise generators, resonant filters, harmonic oscillators, envelope shapers, and crystal chimes) and browser autoplay unlock logic. `index.html` and `magic-particles.js` trigger sound methods on key user interactions and animation lifecycle events.

**Tech Stack:** HTML5, Web Audio API (AudioContext, BiquadFilterNode, OscillatorNode, GainNode, AudioBufferSourceNode), Vanilla JavaScript (ES6+).

## Global Constraints

- No external audio libraries or broken CDN links.
- Synthesized sounds must execute 100% offline with zero latency.
- Audio volume must be soft, warm, and pleasant (master gain <= 0.35, gentle envelopes).
- Autoplay unlock must be transparent on first user interaction.

---

### Task 1: Create `sound-effects.js` Sound Engine

**Files:**
- Create: `sound-effects.js`

**Interfaces:**
- Produces: `window.soundEngine` with methods:
  - `init()`
  - `unlock()`
  - `playCandleBlow()`
  - `playCandleIgnite()`
  - `playBoxLocked()`
  - `playBoxOpen()`
  - `playCosmicSurge()`
  - `playStarDing(index)`
  - `playCardEmerge()`
  - `playCardFly()`
  - `playPaperFlip()`
  - `playTypewriterKey(char)`
  - `playTypewriterBell()`
  - `playBoxClose()`
  - `playCardClose()`

- [ ] **Step 1: Write `sound-effects.js`**

```javascript
/**
 * Procedural Web Audio API Sound Effects Engine
 * Happy Birthday Website
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
    this.initAudioContext();
    this.bindUnlockEvents();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  unlock() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      });
    } else {
      this.isUnlocked = true;
    }
  }

  bindUnlockEvents() {
    const unlockHandler = () => {
      this.unlock();
      window.removeEventListener('pointerdown', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
    };
    window.addEventListener('pointerdown', unlockHandler, { once: true, passive: true });
    window.addEventListener('keydown', unlockHandler, { once: true, passive: true });
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

  playCandleBlow() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.48;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.0, now);
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }

  playCandleIgnite() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. Strike friction noise
    const noiseBuffer = this.createWhiteNoiseBuffer(0.05);
    if (noiseBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = noiseBuffer;
      const f = this.ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.setValueAtTime(2500, now);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      src.connect(f);
      f.connect(g);
      g.connect(this.masterGain);
      src.start(now);
    }

    // 2. Warm flame whoosh
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.22);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.001, now);
    oscGain.gain.linearRampToValueAtTime(0.25, now + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playBoxLocked() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const playKnock = (delay, freq) => {
      const t = now + delay;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.06);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.35, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(g);
      g.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.06);
    };

    playKnock(0, 210);
    playKnock(0.09, 170);
  }

  playBoxOpen() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Wooden creak tone
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.linearRampToValueAtTime(240, now + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.18, now + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.4);

    // Mechanical click at start
    const clickOsc = this.ctx.createOscillator();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1200, now);
    clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.02);

    const clickG = this.ctx.createGain();
    clickG.gain.setValueAtTime(0.2, now);
    clickG.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    clickOsc.connect(clickG);
    clickG.connect(this.masterGain);

    clickOsc.start(now);
    clickOsc.stop(now + 0.02);
  }

  playCosmicSurge() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 880.00, 987.77, 1174.66, 1318.51, 1567.98]; // E5, G5, A5, B5, D6, E6, G6

    notes.forEach((freq, idx) => {
      const t = now + idx * 0.085;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Overtone shimmer
      const overtone = this.ctx.createOscillator();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.01, t);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.14, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

      osc.connect(g);
      overtone.connect(g);
      g.connect(this.masterGain);

      osc.start(t);
      overtone.start(t);
      osc.stop(t + 0.65);
      overtone.stop(t + 0.65);
    });
  }

  playStarDing(index = 0) {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

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

  playCardEmerge() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Smooth soft rising swoosh
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.45);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.15, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

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
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + dur * 0.55);
    filter.frequency.exponentialRampToValueAtTime(450, now + dur);

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

  playPaperFlip() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.22;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.22, now + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }

  playTypewriterKey(char = '') {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Small frequency jitter for organic feel
    const jitter = 1 + (Math.random() * 0.16 - 0.08);
    const baseFreq = (char === ' ' || char === ',' || char === '.') ? 420 : 640;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq * jitter, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.025);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.025);
  }

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

  playBoxClose() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playCardClose() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.16;

    const noiseBuffer = this.createWhiteNoiseBuffer(dur);
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);

    src.start(now);
    src.stop(now + dur);
  }
}

// Global Singleton
window.soundEngine = new SoundEngine();
```

---

### Task 2: Integrate Sound Effects with Cosmic Particle Engine

**Files:**
- Modify: `magic-particles.js`

- [ ] **Step 1: Update `magic-particles.js` to play celestial sounds on galaxy surge and star nodes drawing**
  - In `start()`: invoke `if (window.soundEngine) window.soundEngine.playCosmicSurge();`
  - In constellation drawing loop: when a node newly reaches `litProgress === 1`, invoke `if (window.soundEngine) window.soundEngine.playStarDing(nodeIdx);`

---

### Task 3: Integrate Sound Effects into `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Include `<script src="sound-effects.js"></script>` before `magic-particles.js`**
- [ ] **Step 2: Bind sound triggers to event handlers:**
  - Candle click: `window.soundEngine.playCandleBlow()` on blow, `window.soundEngine.playCandleIgnite()` on relit.
  - Box click: `window.soundEngine.playBoxLocked()` when lit, `window.soundEngine.playBoxOpen()` on open, `window.soundEngine.playBoxClose()` on close.
  - Constellations complete hook: `window.soundEngine.playCardEmerge()`.
  - Floating card click: `window.soundEngine.playCardFly()`.
  - 3D card unfold click: `window.soundEngine.playPaperFlip()`.
  - 3D card fold click / close button: `window.soundEngine.playCardClose()`.
  - Typewriter keystroke: `window.soundEngine.playTypewriterKey(char)`.
  - Typewriter completion: `window.soundEngine.playTypewriterBell()`.

---

### Task 4: Verification & Browser Testing

**Files:**
- Verification in browser via `browser_subagent` and manual interactive testing.

- [ ] **Step 1: Verify audio context starts without console errors.**
- [ ] **Step 2: Verify full user journey: click candle -> click box -> watch particles & constellations -> click floating card -> click unfold card -> listen to typewriter -> close card.**
