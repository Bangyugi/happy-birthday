# Candle Smoke and Ember Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm hiệu ứng khói uốn lượn nghệ thuật đa tầng bay lên và đốm tàn đỏ mờ dần khi thổi/dập tắt nến trên trang thiệp sinh nhật.

**Architecture:** Bổ sung cấu trúc SVG tàn đỏ (`#candle-ember`) và 3 dải khói cong Bézier (`#candle-smoke`) tại ngọn bấc nến, định nghĩa các bộ keyframe hoạt ảnh CSS (`ember-fade`, `smoke-rise-main`, `smoke-rise-left`, `smoke-rise-right`) với bộ lọc mờ viền, và điều khiển luồng kích hoạt / ngắt hoạt ảnh trong JavaScript khi click ngọn nến.

**Tech Stack:** HTML5 SVG, Vanilla CSS3 Animations/Filters, Vanilla JavaScript.

## Global Constraints
- Khói và tàn nến bắt đầu từ đỉnh bấc `(822, 436)`.
- Hiệu ứng khói tan hoàn toàn sau ~2.2 giây.
- Khi thắp lại nến, khói và tàn nến phải lập tức biến mất để ngọn lửa sáng rõ.

---

### Task 1: Cập nhật cấu trúc SVG cho Khói & Tàn nến trong `index.html`

**Files:**
- Modify: `index.html:1008-1020`

**Interfaces:**
- Consumes: SVG container `<g id="layer-candlestick">`
- Produces: `<circle id="candle-ember">` and `<g id="candle-smoke">` containing 3 path wisps

- [ ] **Step 1: Thay thế cụm `#candle-smoke` và thêm `#candle-ember` trong `index.html`**

```html
        <!-- Candle Ember Tip (Glows red-hot and fades when blown out) -->
        <circle id="candle-ember" class="candle-ember-layer" cx="822" cy="436" r="3" fill="#ff4d15"
          filter="url(#flame-soft-glow)" />

        <!-- Candle Smoke Wisps (3 organic curved strands appearing softly when blown out) -->
        <g id="candle-smoke" class="candle-smoke-layer">
          <!-- Main Center Wisp -->
          <path class="smoke-wisp smoke-wisp-main"
            d="M 822 436 C 818 405, 832 380, 820 350 C 808 320, 828 290, 816 260"
            stroke="#dbe7f3" stroke-width="2.8" fill="none" stroke-linecap="round" filter="url(#soft-glow)" />
          <!-- Left Floating Tendril -->
          <path class="smoke-wisp smoke-wisp-left"
            d="M 822 436 C 814 415, 806 390, 812 368 C 818 344, 804 322, 808 298"
            stroke="#9bb2ca" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.75" />
          <!-- Right Gentle Drift Wisp -->
          <path class="smoke-wisp smoke-wisp-right"
            d="M 822 436 C 828 418, 836 395, 830 372 C 824 348, 838 326, 832 302"
            stroke="#c4d6e8" stroke-width="2.0" fill="none" stroke-linecap="round" opacity="0.8" />
        </g>
```

- [ ] **Step 2: Kiểm tra cấu trúc SVG trong file `index.html` đảm bảo thẻ đóng mở chính xác**

---

### Task 2: Thêm CSS Keyframe Animations & Styling trong `style.css`

**Files:**
- Modify: `style.css:130-145`

**Interfaces:**
- Consumes: Classes `.candle-ember-layer`, `.candle-smoke-layer`, `.smoke-wisp`, `.smoke-wisp-main`, `.smoke-wisp-left`, `.smoke-wisp-right`
- Produces: CSS animation rules `@keyframes ember-fade`, `@keyframes smoke-rise-main`, `@keyframes smoke-rise-left`, `@keyframes smoke-rise-right`

- [ ] **Step 1: Thêm quy tắc CSS và keyframe animation cho tàn đỏ và 3 dải khói**

```css
/* Candle Ember on Wick */
.candle-ember-layer {
  opacity: 0;
  pointer-events: none;
  transform-origin: 822px 436px;
}

.candle-ember-layer.animating {
  animation: ember-fade 1.8s ease-out forwards;
}

@keyframes ember-fade {
  0% {
    opacity: 1;
    fill: #ffffff;
    r: 3.5px;
    filter: drop-shadow(0 0 6px #ff4820) drop-shadow(0 0 12px #ff8830);
  }
  20% {
    opacity: 0.95;
    fill: #ff5520;
    r: 3px;
    filter: drop-shadow(0 0 4px #ff3b10);
  }
  60% {
    opacity: 0.6;
    fill: #c42b08;
    r: 2.2px;
    filter: drop-shadow(0 0 2px #9e1c02);
  }
  100% {
    opacity: 0;
    fill: #401008;
    r: 1px;
    filter: none;
  }
}

/* Candle Smoke Animation when blown out */
.candle-smoke-layer {
  opacity: 0;
  pointer-events: none;
  transform-origin: 822px 436px;
}

.candle-smoke-layer.animating {
  opacity: 1;
}

.candle-smoke-layer.animating .smoke-wisp-main {
  animation: smoke-rise-main 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.candle-smoke-layer.animating .smoke-wisp-left {
  animation: smoke-rise-left 2.0s cubic-bezier(0.25, 1, 0.5, 1) 0.08s forwards;
}

.candle-smoke-layer.animating .smoke-wisp-right {
  animation: smoke-rise-right 2.1s cubic-bezier(0.25, 1, 0.5, 1) 0.04s forwards;
}

@keyframes smoke-rise-main {
  0% {
    opacity: 0;
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    transform: translateY(0) scale(0.6, 0.3);
  }
  15% {
    opacity: 0.9;
    stroke-dashoffset: 120;
  }
  50% {
    opacity: 0.7;
    stroke-dashoffset: 40;
    transform: translateY(-40px) scale(1, 0.9) rotate(-1deg);
  }
  80% {
    opacity: 0.35;
    stroke-dashoffset: 0;
    transform: translateY(-90px) scale(1.3, 1.4) rotate(2deg);
  }
  100% {
    opacity: 0;
    stroke-dashoffset: 0;
    transform: translateY(-130px) scale(1.6, 1.8) rotate(3.5deg);
  }
}

@keyframes smoke-rise-left {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5, 0.3) rotate(0deg);
  }
  18% {
    opacity: 0.8;
  }
  55% {
    opacity: 0.55;
    transform: translateY(-35px) translateX(-8px) scale(1.1, 1) rotate(-3deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) translateX(-22px) scale(1.5, 1.6) rotate(-6deg);
  }
}

@keyframes smoke-rise-right {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5, 0.3) rotate(0deg);
  }
  18% {
    opacity: 0.85;
  }
  55% {
    opacity: 0.6;
    transform: translateY(-38px) translateX(6px) scale(1.15, 1.05) rotate(3deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-110px) translateX(18px) scale(1.55, 1.7) rotate(5.5deg);
  }
}
```

- [ ] **Step 2: Kiểm tra tính hợp lệ của CSS syntax và animation parameters**

---

### Task 3: Cập nhật JavaScript kích hoạt và hủy khói / tàn đỏ trong `index.html`

**Files:**
- Modify: `index.html:1500-1535`

**Interfaces:**
- Consumes: DOM elements `#candle-smoke`, `#candle-ember`, `#layer-candlestick`, `#svg-canvas`
- Produces: Dynamic toggle of `.animating` on both `smoke` and `ember`

- [ ] **Step 1: Lấy tham chiếu `ember` và kích hoạt khi nến bị dập tắt, gỡ bỏ khi nến sáng lại**

```javascript
      const ember = document.getElementById('candle-ember');
      // ...
      if (candle && svg) {
        candle.addEventListener('click', (e) => {
          e.stopPropagation();
          const wasLit = svg.classList.contains('is-lit');
          svg.classList.toggle('is-lit');

          if (wasLit) {
            // Blown out -> dismiss speech bubble and rise smoke + glow ember
            hideSpeechBubble();
            if (smoke) {
              smoke.classList.remove('animating');
              void smoke.offsetWidth; // trigger reflow
              smoke.classList.add('animating');
            }
            if (ember) {
              ember.classList.remove('animating');
              void ember.offsetWidth; // trigger reflow
              ember.classList.add('animating');
            }
          } else {
            // Relit -> cancel smoke & ember immediately
            if (smoke) smoke.classList.remove('animating');
            if (ember) ember.classList.remove('animating');
          }
          // ...
        });
      }
```

- [ ] **Step 2: Kiểm tra lại các tương tác phụ (như mở hộp, thắp lại nến) không bị xung đột**

---

### Task 4: Kiểm thử trực quan và xác thực hiệu ứng

**Files:**
- Test with browser subagent / local dev server preview

- [ ] **Step 1: Mở trang `index.html` trên trình duyệt**
- [ ] **Step 2: Click vào ngọn nến để dập tắt $\rightarrow$ kiểm tra ngọn lửa tắt, đốm đỏ lóe lên và 3 làn khói bốc lên uốn lượn rồi tan dần**
- [ ] **Step 3: Click lại để thắp sáng $\rightarrow$ kiểm tra ngọn lửa sáng lại ngay và khói biến mất hoàn toàn**
