# 3D Pop-up Greeting Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng tấm thiệp sinh nhật 3D từ trong hộp bay lên lơ lửng sau khi vẽ xong 2 chòm sao, cho phép người dùng click để phóng to ra giữa màn hình và mở gập 3D để lộ hiệu ứng cắt giấy vũ trụ cùng bức thư chúc mừng bám sát thiết kế mẫu.

**Architecture:** Sử dụng kết hợp CSS 3D Transforms (`perspective`, `transform-style: preserve-3d`), SVG Paper-cut layered shadowbox vector graphics, Google Fonts viết tay tiếng Việt và đồng bộ nhịp thời gian với `magic-particles.js`.

**Tech Stack:** HTML5, CSS3 3D Transforms, Vanilla JavaScript, SVG, Canvas 2D.

## Global Constraints
- Không dùng thư viện cồng kềnh ngoài Vanilla JS/CSS để đảm bảo tốc độ 60FPS mượt mà.
- Thiết kế bám sát 100% hình mẫu: Bìa navy chữ nhũ vàng kèm que diêm nến cháy; Nửa trên cắt giấy nhiều tầng 3D kèm bóng cô gái và chữ Happy Birthday; Nửa dưới nền giấy kẻ dòng viền hoa pastel và ảnh polaroid.
- Dễ dàng thay đổi văn bản, tên người nhận và ảnh polaroid trực tiếp trong code.

---

### Task 1: Typography & Graphic Assets Setup
**Files:**
- Modify: `index.html` (Thêm link Google Fonts hỗ trợ tiếng Việt: `Caveat`, `Patrick Hand`, `Dancing Script`, `Playfair Display`)
- Modify: `style.css` (Khai báo biến màu, typography tokens)

- [ ] **Step 1: Thêm Google Fonts vào `<head>` của `index.html`**
- [ ] **Step 2: Cập nhật CSS tokens trong `style.css`**
- [ ] **Step 3: Kiểm tra hiển thị font chữ tiếng Việt có dấu hoàn chỉnh**

---

### Task 2: Floating Card Component & Timeline Trigger
**Files:**
- Modify: `index.html` (Thêm element tấm thiệp lơ lửng `#floating-box-card`)
- Modify: `magic-particles.js` (Thêm callback/event khi 2 chòm sao hoàn tất ở $t = 7.8s$)
- Modify: `style.css` (CSS animation trồi lên từ hộp `card-emerge` và lơ lửng `card-floating-hover`)

- [ ] **Step 1: Thêm markup `#floating-box-card` vào `index.html`**
- [ ] **Step 2: Viết CSS animation trồi lên và lơ lửng trên miệng hộp trong `style.css`**
- [ ] **Step 3: Hook sự kiện trong JS để kích hoạt thiệp lơ lửng đúng $t = 7.8s$ sau khi mở hộp**

---

### Task 3: 3D Greeting Card Modal & Fold Mechanism
**Files:**
- Modify: `index.html` (Thêm cấu trúc Modal `#birthday-card-modal`, `.card-scene`, `.card-top-flap`, `.card-bottom-flap`)
- Modify: `style.css` (Định nghĩa không gian 3D, bản lề gập `transform-origin`, xoay 180 độ khi mở)
- Modify: `index.html` (Thêm JS logic click thiệp lơ lửng -> hiện modal, click thiệp -> toggle mở/gập, nút đóng)

- [ ] **Step 1: Tạo cấu trúc HTML cho Modal và các mặt thiệp**
- [ ] **Step 2: Viết CSS 3D perspective và animation gập mở (`.is-card-open`, `rotateX`)**
- [ ] **Step 3: Xử lý logic tương tác đóng/mở mượt mà**

---

### Task 4: High-Fidelity Paper-Cut Shadowbox (Top Flap) & Floral Letter (Bottom Flap)
**Files:**
- Modify: `index.html` (Vẽ SVG chi tiết cho bìa thiệp, nửa trên cắt giấy 3D và nửa dưới thư hoa lá)
- Modify: `style.css` (Đổ bóng phân tầng, hiệu ứng đèn LED trung tâm, ngọn lửa que diêm, viền hoa pastel)

- [ ] **Step 1: Xây dựng mặt bìa thiệp với que diêm thắp nến, ngọn lửa animated và chữ nhũ vàng**
- [ ] **Step 2: Xây dựng nửa trên cắt giấy vũ trụ nhiều tầng, bóng cô gái, chữ Happy Birthday, 2 ảnh polaroid**
- [ ] **Step 3: Xây dựng nửa dưới giấy kẻ dòng, viền hoa lá pastel, vé kỷ niệm và lời chúc sinh nhật**
- [ ] **Step 4: Tinh chỉnh hiệu ứng ánh sáng, drop-shadow phân lớp và glow**

---

### Task 5: End-to-End Verification & Browser Testing
**Files:**
- Test: Chạy trình duyệt và kiểm tra toàn bộ trải nghiệm từ tắt nến -> mở hộp -> chòm sao -> thiệp bay lên -> phóng to -> gập mở 3D.

- [ ] **Step 1: Kiểm thử luồng tương tác đầy đủ trên trình duyệt**
- [ ] **Step 2: Chụp ảnh màn hình và ghi lại video kiểm tra độ thẩm mỹ và mượt mà**
- [ ] **Step 3: Hoàn thiện tài liệu walkthrough**
