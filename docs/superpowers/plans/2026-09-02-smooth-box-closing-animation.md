# Smooth Memory Box Closing Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoạt ảnh đóng hộp quà mượt mà với đường bay vòng cung tiếp đất có độ nhún tự nhiên của nắp hộp, ánh sáng và thiệp thu gọn êm ái vào lòng hộp.

**Architecture:** Định nghĩa các bộ keyframe và quy tắc CSS cho trạng thái `.is-box-closing`, kết hợp quản lý bộ đếm thời gian và lớp trạng thái trong JavaScript khi người dùng đóng hộp hoặc thắp lại nến.

**Tech Stack:** HTML5 SVG, Vanilla CSS3 Animations/Transitions, Vanilla JavaScript.

## Global Constraints
- Thời lượng hoạt ảnh đóng nắp hộp: 1.4s với đường cong cubic-bezier `(0.25, 1, 0.5, 1)`.
- Luồng ánh sáng và hào quang thu nhỏ và tắt hoàn toàn trước khi nắp đậy khít (0.8s - 1.0s).
- Trạng thái `.is-box-closing` tự động dọn dẹp sau 1.5s để sẵn sàng cho lần mở tiếp theo.

---

### Task 1: Thêm CSS hoạt ảnh đóng hộp trong `style.css`

**Files:**
- Modify: `style.css:300-420`

**Interfaces:**
- Consumes: Class `.svg-canvas.is-box-closing`
- Produces: CSS rules for `#box-lid-group`, `#box-lid-table-shadow`, `#box-volumetric-beam`, `#box-room-cosmic-glow`, `#box-core-burst-group`, `#box-rim-glow`, `#box-table-cosmic-underglow` when closing, and keyframes `@keyframes lid-glide-close`, `@keyframes lid-shadow-close`.

- [ ] **Step 1: Bổ sung CSS cho trạng thái `.is-box-closing` trong `style.css`**

```css
/* Box Lid Closing Animation */
.svg-canvas.is-box-closing #box-lid-group {
  animation: lid-glide-close 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes lid-glide-close {
  0% {
    transform: translate(-180px, -180px) rotate(-14deg) scale(1);
    filter: drop-shadow(0 0 16px rgba(125, 241, 255, 0.45)) 
            drop-shadow(0 0 30px rgba(255, 122, 217, 0.25)) 
            drop-shadow(0 20px 40px rgba(0, 0, 0, 0.55));
  }
  60% {
    transform: translate(-45px, -35px) rotate(-3.5deg) scale(1);
    filter: drop-shadow(0 0 8px rgba(125, 241, 255, 0.2)) 
            drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
  }
  85% {
    transform: translate(0, -3px) rotate(0.6deg) scale(1);
    filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4));
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.35));
  }
}

/* Box Lid Table Shadow Closing */
.svg-canvas.is-box-closing #box-lid-table-shadow {
  animation: lid-shadow-close 1.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes lid-shadow-close {
  0% {
    opacity: 0.55;
    transform: scale(1);
  }
  60% {
    opacity: 0.25;
    transform: scale(0.85);
  }
  100% {
    opacity: 0;
    transform: scale(0.6);
  }
}

/* Receding Lights on Closing */
.svg-canvas.is-box-closing #box-rim-glow {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.svg-canvas.is-box-closing #box-volumetric-beam {
  transform: scaleY(0);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.6s ease;
}

.svg-canvas.is-box-closing #box-room-cosmic-glow {
  opacity: 0;
  transition: opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1);
}

.svg-canvas.is-box-closing #box-core-burst-group {
  transform: scale(0);
  opacity: 0;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.5s ease;
}

.svg-canvas.is-box-closing #box-table-cosmic-underglow {
  opacity: 0;
  transition: opacity 0.9s ease;
}
```

- [ ] **Step 2: Kiểm tra tính hợp lệ của CSS**

---

### Task 2: Cập nhật JavaScript quản lý trạng thái đóng hộp trong `index.html`

**Files:**
- Modify: `index.html:1540-1588`

**Interfaces:**
- Consumes: `svg`, `box`, `floatingCard`, `cosmicEngine`
- Produces: Hàm đóng hộp chuẩn hóa kèm class `.is-box-closing` và timer cleanup sau 1500ms

- [ ] **Step 1: Tạo hàm helper `closeBoxGracefully()` và áp dụng khi click đóng hộp hoặc khi thắp lại nến**

```javascript
      let boxCloseTimer = null;

      function closeBoxGracefully() {
        if (!svg) return;
        svg.classList.remove('is-box-open');
        svg.classList.remove('is-box-closing');
        void svg.offsetWidth; // trigger reflow
        svg.classList.add('is-box-closing');

        if (boxCloseTimer) clearTimeout(boxCloseTimer);
        boxCloseTimer = setTimeout(() => {
          svg.classList.remove('is-box-closing');
        }, 1500);

        if (floatingCard) {
          floatingCard.classList.remove('is-emerged');
          floatingCard.classList.remove('is-settled');
          floatingCard.classList.remove('is-hidden-modal');
          floatingCard.style.opacity = '0';
          setTimeout(() => {
            floatingCard.style.opacity = '';
          }, 800);
        }
        closeCardModal();
        cosmicEngine.stop();
      }
```

- [ ] **Step 2: Sử dụng `closeBoxGracefully()` trong event listener của `box` và `candle`**

---

### Task 3: Kiểm thử và xác thực

- [ ] **Step 1: Mở `index.html`, thổi tắt nến, click mở hộp quà để nắp bay lên và ánh sáng bừng mở**
- [ ] **Step 2: Click vào hộp quà để đóng $\rightarrow$ quan sát nắp lượn vòng cung êm ái, nhún nhẹ khi chạm miệng hộp và khép khít hoàn hảo**
- [ ] **Step 3: Mở lại hộp quà ngay sau khi đóng để đảm bảo không bị xung đột trạng thái**
