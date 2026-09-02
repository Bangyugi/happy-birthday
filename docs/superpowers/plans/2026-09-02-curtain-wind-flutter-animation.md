# Curtain Wind Flutter Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a natural, multi-layered organic breeze fluttering animation for the sheer curtains in `index.html` and `style.css`.

**Architecture:** Segment `#layer-curtains` in `index.html` into three coordinated depth groups (`.curtain-anim-base`, `.curtain-anim-mid`, `.curtain-anim-edge`) plus the moonlight sheen ray (`.curtain-moonbeam-pulse`). Apply GPU-accelerated CSS skew/rotate/scale/translation keyframe animations anchored at `top left` with staggered durations (9s, 7s, 5.2s) and easing curves in `style.css`.

**Tech Stack:** HTML5 SVG, Vanilla CSS3 Animations (`@keyframes`, `transform`, `transform-origin`).

## Global Constraints
- Anchor origin must remain firmly fixed at `top left` / `0 0` so the top curtain edge never detaches from the ceiling/window frame.
- Smooth performance with zero jitter, pure CSS hardware acceleration.
- No external JS libraries or breaking changes to existing scene elements.

---

### Task 1: Organize SVG Curtain Elements into Coordinated Animation Groups

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/index.html:424-467`

**Interfaces:**
- Produces: SVG groups `#curtain-base-group`, `#curtain-mid-group`, `#curtain-edge-group`, and ray polygon `#curtain-moonbeam` with respective CSS classes `.curtain-anim-base`, `.curtain-anim-mid`, `.curtain-anim-edge`, `.curtain-moonbeam-pulse`.

- [ ] **Step 1: Update `#layer-curtains` structure in `index.html`**

Wrap the curtain path elements into sub-groups:
```html
      <!-- ====================================================================
           LAYER 3: Sheer Flowing Curtains (Drapery)
           ==================================================================== -->
      <g id="layer-curtains">
        <!-- 3A. Base Darker Drapery (Deep wall layer) -->
        <g id="curtain-base-group" class="curtain-anim-base">
          <!-- Leftmost deep dark curtain layer -->
          <path d="M 50 0 C 75 180, 85 380, 75 620 C 65 820, 90 960, 110 1080 L 0 1080 L 0 0 Z"
            fill="url(#curtain-base)" />
          <!-- Main flowing sheer drape over window (Layer 1) -->
          <path
            d="M 105 0 C 130 150, 150 320, 145 520 C 140 700, 170 880, 190 1080 L 105 1080 C 90 950, 70 750, 80 520 C 90 320, 75 150, 65 0 Z"
            fill="url(#curtain-fold-mid)" />
        </g>

        <!-- 3B. Mid-layer Sheer Billow Drapes -->
        <g id="curtain-mid-group" class="curtain-anim-mid">
          <!-- Translucent Billow Fold across window glass (Layer 2) -->
          <path
            d="M 145 0 C 190 180, 230 380, 235 600 C 240 780, 220 940, 215 1080 L 155 1080 C 165 920, 180 760, 175 580 C 170 400, 145 200, 125 0 Z"
            fill="url(#curtain-sheer-layer)" />
          <!-- Broad soft drape extending to the right edge of window (Layer 3) -->
          <path
            d="M 210 0 C 270 160, 315 340, 330 550 C 345 740, 315 920, 300 1080 L 240 1080 C 260 920, 285 750, 275 560 C 265 380, 230 180, 190 0 Z"
            fill="url(#curtain-sheer-layer)" />
        </g>

        <!-- 3C. Outer Billowing Edge & Crease Lines -->
        <g id="curtain-edge-group" class="curtain-anim-edge">
          <!-- Outer sheer edge fluttering softly into room (Layer 4) -->
          <path
            d="M 275 0 C 335 180, 390 360, 405 570 C 415 720, 380 890, 360 1080 L 310 1080 C 335 910, 365 740, 355 580 C 345 400, 305 200, 260 0 Z"
            fill="url(#curtain-sheer-layer)" opacity="0.8" />
          <!-- Trailing soft sheer mist edge -->
          <path
            d="M 345 0 C 405 200, 470 420, 480 640 C 490 780, 445 940, 415 1080 L 375 1080 C 405 930, 440 780, 430 630 C 420 450, 370 220, 325 0 Z"
            fill="url(#curtain-sheer-layer)" opacity="0.45" />
          <!-- Fine vertical fold crease lines for cloth depth -->
          <path d="M 90 0 C 105 220, 115 460, 110 720 C 105 900, 125 1010, 135 1080" stroke="#3d587c" stroke-width="2.5"
            fill="none" opacity="0.5" />
          <path d="M 160 0 C 200 240, 225 480, 225 720 C 225 890, 210 990, 205 1080" stroke="#5e87b5" stroke-width="2"
            fill="none" opacity="0.45" />
          <path d="M 240 0 C 290 200, 325 420, 330 650 C 335 830, 310 970, 295 1080" stroke="#7ca8db" stroke-width="2"
            fill="none" opacity="0.35" />
          <path d="M 315 0 C 370 200, 410 440, 415 660 C 420 820, 390 960, 375 1080" stroke="#9ec4ed" stroke-width="1.5"
            fill="none" opacity="0.25" />
        </g>

        <!-- Strong Diagonal Moonlit Ray crossing the curtains -->
        <polygon id="curtain-moonbeam" class="curtain-moonbeam-pulse" points="120,0 260,0 520,700 280,700" fill="url(#moonlight-sheer-ray)" />
      </g>
```

---

### Task 2: Implement Curtain Flutter CSS Keyframes and Animation Rules

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/style.css`

**Interfaces:**
- Consumes: `.curtain-anim-base`, `.curtain-anim-mid`, `.curtain-anim-edge`, `.curtain-moonbeam-pulse`
- Produces: CSS animation rules with keyframes `@keyframes curtain-sway-base`, `@keyframes curtain-sway-mid`, `@keyframes curtain-sway-edge`, `@keyframes curtain-beam-pulse`.

- [ ] **Step 1: Add CSS animation styles in `style.css`**

Add the following CSS rules into `style.css`:
```css
/* ==========================================================================
   Curtain Wind Flutter & Sway Animations
   ========================================================================== */
.curtain-anim-base,
.curtain-anim-mid,
.curtain-anim-edge {
  transform-origin: 0px 0px;
  transform-box: view-box;
  will-change: transform;
}

.curtain-anim-base {
  animation: curtain-sway-base 9.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate-reverse;
}

.curtain-anim-mid {
  animation: curtain-sway-mid 7.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate-reverse 0.8s;
}

.curtain-anim-edge {
  animation: curtain-sway-edge 5.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate-reverse 1.5s;
}

.curtain-moonbeam-pulse {
  animation: curtain-beam-pulse 6.8s ease-in-out infinite alternate;
}

@keyframes curtain-sway-base {
  0% {
    transform: skewX(0deg) rotate(0deg) translateX(0px);
  }
  50% {
    transform: skewX(-0.5deg) rotate(-0.2deg) translateX(1px);
  }
  100% {
    transform: skewX(-1.2deg) rotate(-0.45deg) translateX(2px);
  }
}

@keyframes curtain-sway-mid {
  0% {
    transform: skewX(0deg) scaleX(1) rotate(0deg) translateX(0px);
  }
  50% {
    transform: skewX(-1.4deg) scaleX(1.015) rotate(-0.5deg) translateX(3px);
  }
  100% {
    transform: skewX(-2.6deg) scaleX(1.03) rotate(-0.9deg) translateX(6px);
  }
}

@keyframes curtain-sway-edge {
  0% {
    transform: skewX(0deg) scaleX(1) rotate(0deg) translateX(0px);
  }
  40% {
    transform: skewX(-2.2deg) scaleX(1.025) rotate(-0.7deg) translateX(5px);
  }
  100% {
    transform: skewX(-4.2deg) scaleX(1.06) rotate(-1.5deg) translateX(10px);
  }
}

@keyframes curtain-beam-pulse {
  0% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.48;
  }
  100% {
    opacity: 0.58;
  }
}
```

---

### Task 3: Verification

**Files:**
- Test via Browser Subagent on `file:///C:/Users/ADMIN/Desktop/happy-birthday/index.html`

- [ ] **Step 1: Open page and verify visual smoothness and natural flutter**
- [ ] **Step 2: Ensure top anchor remains fixed and no graphical artifacts occur**
