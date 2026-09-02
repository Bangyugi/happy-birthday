# Hoạt Ảnh Cinematic Hộp Ký Ức Mở Bão Bụi Sao & Chòm Sao Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoạt ảnh điện ảnh (cinematic) khi click mở chiếc hộp ký ức lúc nến tắt: nắp hộp mở bung 3D, ánh sáng chói lòa bùng nổ từ lòng hộp, hơn 500+ hạt bụi sao đa sắc màu cuộn xoáy thành dải ngân hà và các chòm sao nối tuyến lấp lánh (Constellations) bao phủ căn phòng ở tốc độ 60 FPS mượt mà.

**Architecture:** Kết hợp đồ họa vector SVG chuyển đổi trạng thái nắp mở 3D + lớp phủ ánh sáng vũ trụ với Canvas Particle Engine 60 FPS hiệu năng cao (vortex flow field, stardust glow, diamond sparkles, constellation network).

**Tech Stack:** HTML5, CSS3 Transitions & Keyframes, Vanilla JavaScript, HTML5 Canvas 2D Context (`requestAnimationFrame`, `globalCompositeOperation = 'lighter'`).

## Global Constraints
- Khung hình chuẩn tỉ lệ 16:9 (`viewBox="0 0 1920 1080"`), responsive toàn màn hình.
- Hiệu năng mượt mà 60 FPS không giật lag trên Canvas.
- Khớp chính xác với hình ảnh tham chiếu của người dùng.

---

### Task 1: Thiết kế hình học SVG nắp hộp mở 3D và luồng sáng lõi bùng nổ

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/screen1.html`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/index.html`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/style.css`

**Interfaces:**
- Consumes: `#layer-memory-box` trong SVG
- Produces: Nhóm `<g id="box-closed-state">` (hiển thị khi đóng), `<g id="box-open-state">` (hiển thị khi `.is-box-open`), `<polygon id="volumetric-light-burst">`, các gradient ánh sáng lõi `#box-core-burst-grad`, `#box-flap-inside-grad`.

- [ ] **Step 1: Thêm gradient ánh sáng lõi và cánh nắp mở vào `<defs>`**
- [ ] **Step 2: Cập nhật `#layer-memory-box` với cấu trúc 2 trạng thái đóng và mở**
- [ ] **Step 3: Cập nhật `style.css` cho hiệu ứng chuyển đổi nắp hộp và ánh sáng phòng**

---

### Task 2: Xây dựng Canvas Particle Engine 60 FPS: Bão bụi sao, dải xoáy ốc & Chòm sao lấp lánh

**Files:**
- Create: `c:/Users/ADMIN/Desktop/happy-birthday/magic-particles.js`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/screen1.html`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/index.html`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/style.css`

**Interfaces:**
- Produces: Lớp `<canvas id="magic-cosmic-canvas">` đặt trên viewport, module `CosmicParticleEngine` với các phương thức `start()`, `stop()`, `resize()`.

- [ ] **Step 1: Tạo `magic-particles.js` với hệ thống hạt xoáy ốc Fibonacci / Vortex Flow**
  - 500+ hạt đa sắc màu dạ quang: `#54fcfd`, `#ff6fd8`, `#ffd700`, `#caa8ff`, `#50fa7b`, `#ffffff`.
  - Hạt sao 4 cánh kim cương (sparkle stars).
  - Hệ thống mạng lưới chòm sao tự động kết nối các nút sao gần nhau bằng đường phát sáng mảnh.
- [ ] **Step 2: Nhúng canvas và script vào `screen1.html` và `index.html`**
- [ ] **Step 3: Định kiểu CSS cho canvas trong suốt phủ khớp chính xác với SVG 16:9**

---

### Task 3: Tích hợp logic điều khiển tương tác Click (State Machine)

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/screen1.html`
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/index.html`

- [ ] **Step 1: Bổ sung event listener cho `#layer-memory-box`**
  - Nếu nến đang tắt $\rightarrow$ Click vào hộp sẽ bật/tắt `.is-box-open` và gọi `engine.start()` / `engine.stop()`.
  - Nếu nến đang sáng $\rightarrow$ Thổi tắt nến trước hoặc mở hộp mượt mà.
- [ ] **Step 2: Thêm hiệu ứng hover cursor trên chiếc hộp**

---

### Task 4: Kiểm thử và xác minh trực quan trên trình duyệt

**Files:**
- Verify: `screen1.html`, `index.html`

- [ ] **Step 1: Mở `screen1.html` trên trình duyệt bằng `browser_subagent`**
- [ ] **Step 2: Thổi tắt nến $\rightarrow$ Click mở chiếc hộp**
- [ ] **Step 3: Chụp ảnh màn hình hoạt ảnh bão bụi sao, lõi sáng và chòm sao**
- [ ] **Step 4: Xác minh 60 FPS và sự mượt mà của hoạt ảnh**
