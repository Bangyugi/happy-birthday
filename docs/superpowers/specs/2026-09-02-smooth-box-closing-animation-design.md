# Thiết Kế Hoạt Ảnh Đóng Hộp Quà Mượt Mà (Smooth Memory Box Closing Animation)

## 1. Tổng Quan
Hiện tại khi người dùng click vào hộp quà để đóng lại, trạng thái `.is-box-open` bị gỡ bỏ đột ngột, khiến các hoạt ảnh chuyển đổi có thể bị giật hoặc nắp hộp trôi về vị trí cũ thiếu cảm giác vật lý. Thiết kế này bổ sung hoạt ảnh đóng hộp hoàn chỉnh với đường lượn parabol, độ nhún tiếp đất tự nhiên của nắp hộp, sự thu gọn êm ái của ánh sáng ma thuật và thiệp nổi.

## 2. Quản Lý Trạng Thái & Lớp CSS
- Khi mở hộp:
  - Thêm lớp `.is-box-open`, gỡ bỏ `.is-box-closing` (nếu có).
  - Khởi chạy `cosmicEngine.start()`.
- Khi đóng hộp:
  - Gỡ bỏ lớp `.is-box-open`.
  - Thêm lớp `.is-box-closing` vào `.svg-canvas` trong 1.5 giây để chạy chuỗi hoạt ảnh đóng.
  - Tự động xóa lớp `.is-box-closing` sau khi animation hoàn tất (sau 1.5s).
  - Gọi `cosmicEngine.stop()` để các hạt vũ trụ tan dần.
  - Xử lý lá thiệp nổi: hạ nhẹ và ẩn mượt mà vào trong lòng hộp.

## 3. Chi Tiết Hoạt Ảnh

### 3.1. Nắp Hộp Quà (`#box-lid-group`)
- Sử dụng keyframe `@keyframes lid-glide-close` (thời lượng 1.4s, `cubic-bezier(0.25, 1, 0.5, 1)`):
  - **0%**: Bắt đầu từ vị trí bay lơ lửng `translate(-180px, -180px) rotate(-14deg)` cùng hiệu ứng phát sáng `drop-shadow`.
  - **60%**: Lướt nhanh và mềm mại theo đường cong parabol về `translate(-45px, -35px) rotate(-3.5deg)`, ánh sáng ma thuật mờ dần.
  - **85%**: Chạm miệng hộp và nhún nảy nhẹ theo quán tính `translate(0, -3px) rotate(0.6deg)`.
  - **100%**: Tiếp đất khít hoàn toàn `translate(0, 0) rotate(0deg)` với bóng đổ mặt bàn gốc.

### 3.2. Bóng Nắp Trên Mặt Bàn (`#box-lid-table-shadow`)
- Khi `.is-box-closing`: Giảm opacity từ `0.55` về `0` trong 1.2s và thu nhỏ dần (`scale(0.8)`).

### 3.3. Các Luồng Ánh Sáng & Hiệu Ứng Bùng Nổ
- Khi `.is-box-closing`:
  - `#box-volumetric-beam`: Thu nhỏ `scaleY(0)` và mờ dần trong 0.8s.
  - `#box-core-burst-group`: Thu nhỏ `scale(0)` và mờ dần trong 0.7s.
  - `#box-room-cosmic-glow`: Mờ dần về 0 trong 1.0s.
  - `#box-table-cosmic-underglow`: Mờ dần về 0 trong 0.9s.
  - `#box-rim-glow`: Tắt dần trong 0.6s.

### 3.4. Lá Thiệp Nổi (`floatingCard`)
- Khi đóng hộp: Chuyển đổi trạng thái từ đang lơ lửng (`.is-settled` / `.is-emerged`) hạ dần cao độ và mờ dần về `opacity: 0` trong 0.6s trước khi nắp đậy kín.

## 4. Kế Hoạch Xác Thực & Kiểm Thử
1. Mở hộp quà: Nắp bay lên lơ lửng, ánh sáng bừng sáng, thiệp bay lên.
2. Click đóng hộp quà:
   - Nắp hộp lượn vòng cung êm ái từ trên không hạ xuống miệng hộp.
   - Khi chạm miệng hộp, nắp có độ nhún nhẹ tự nhiên rồi khép khít.
   - Toàn bộ luồng ánh sáng và thiệp thu gọn mượt mà vào trong lòng hộp.
3. Thử mở lại ngay sau khi vừa đóng: Hoạt ảnh reset mượt mà, không bị giật hay nhảy hình.
