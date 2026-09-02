# Thiết Kế Chi Tiết: Tấm Thiệp Sinh Nhật 3D Gập Mở (3D Pop-up Greeting Card)

## 1. Mục tiêu (Goals)
Hiện thực hóa trải nghiệm tấm thiệp sinh nhật bay ra từ chiếc hộp kỷ niệm (memory box) sau khi hiệu ứng vẽ 2 chòm sao (Virgo & Leo) hoàn tất. Người dùng có thể click vào thiệp để đưa ra cận cảnh và mở gập 3D để đọc lời chúc sinh nhật được thiết kế theo đúng hình mẫu thực tế (Paper-cut shadowbox và trang thư hoa lá).

---

## 2. Luồng Tương Tác & Thời Gian (Interaction Flow & Timeline)

1. **Khởi tạo khi mở hộp**:
   - Người dùng click nến để tắt nến -> click mở hộp quà.
   - Luồng hạt vũ trụ và chùm sáng bùng phát, 2 chòm sao Virgo và Leo vẽ lần lượt từ $t = 4.8s$ đến $t = 7.6s$.
   - **Tại $t = 7.8s$**: Tấm thiệp gập nhỏ màu xanh navy từ từ trồi lên từ lòng hộp (y-offset: -160px), trôi bồng bềnh nhẹ nhàng với hiệu ứng hào quang lấp lánh (pulsing aura).
   - Xuất hiện gợi ý tương tác tinh tế trên thiệp: *"Chạm vào thiệp..."* hoặc icon bàn tay nhỏ nhấp nháy.

2. **Bay về phía tầm nhìn (Zoom / Fly to Viewport Center)**:
   - Khi click vào thiệp đang lơ lửng:
     - Lớp nền phòng trăng mờ nhẹ (backdrop blur + dimming) để tạo tiêu điểm.
     - Tấm thiệp bay mượt mà ra chính giữa màn hình (kích thước lớn khoảng 420px x 380px khi đóng, mở ra thành 420px x 680px).
     - Mặt bìa thiệp hiển thị ở trạng thái đóng với hiệu ứng ánh nến chập chờn ở góc trái và chữ nhũ vàng óng.

3. **Cơ chế mở gập 3D (3D Vertical Fold Mechanism)**:
   - Khi người dùng click vào thiệp (hoặc nút "Mở thiệp"):
     - Tấm nắp trên của thiệp gập 180° ngược lên phía trên theo trục ngang ở giữa (`transform: rotateX(180deg)` kết hợp `preserve-3d`).
     - Tấm thiệp mở ra hoàn toàn với 2 nửa:
       - **Nửa trên**: Hiệu ứng cắt giấy nhiều tầng nghệ thuật (Cosmic Paper-Cut Shadowbox) phát ra ánh sáng vàng ấm từ tâm, bóng cô gái ngắm vũ trụ, dòng chữ *"HAPPY BIRTHDAY [bạn ơi]!"*, các hành tinh và 2 ảnh Polaroid nhỏ kẹp góc.
       - **Nửa dưới**: Trang giấy màu kem thanh nhã, dải hoa lá cúc pastel ở góc trái dưới, các dòng kẻ trang thư viết tay chứa lời chúc sinh nhật ấm áp, và 1 ảnh polaroid/vé vintage nhỏ.
   - Nút đóng/gập thiệp lại (X hoặc Click ngoài) cho phép gập thiệp và trả thiệp về trạng thái lơ lửng trên hộp.

---

## 3. Cấu Trúc Kỹ Thuật & Thành Phần (Technical Architecture & Components)

### A. Tấm thiệp lơ lửng trong không gian phòng (`#floating-card-in-box`)
- Nằm trong SVG canvas hoặc lớp layer tọa độ đồng bộ trên miệng hộp ($x = 1138, y = 430$).
- Kích hoạt animation `card-emerge-and-hover` tại $t = 7.8s$ sau khi mở hộp.
- Bắt sự kiện click để kích hoạt modal cận cảnh.

### B. Modal Thiệp Cận Cảnh 3D (`#birthday-card-modal`)
- Container bao ngoài: `.card-scene` với `perspective: 1400px`.
- Khối thiệp chính: `.card-wrapper` hỗ trợ 3D (`transform-style: preserve-3d`).
- **Nửa trên (Top Flap)**:
  - Bìa ngoài (`.card-cover`): Nền xanh navy giấy nhám, chữ vàng kim *"Mở ra... Để Nhận Điều Bất Ngờ"*, que diêm & nến cháy với ngọn lửa CSS động.
  - Mặt trong nửa trên (`.card-inside-top`): SVG Shadowbox nhiều lớp cắt uốn lượn màu pastel tím/xanh ngọc/vàng kem, ánh sáng LED tỏa từ tâm, chữ *"HAPPY BIRTHDAY [bạn ơi]!"*, silhouette bóng cô gái, ảnh polaroid & cuống vé vintage.
- **Nửa dưới (Bottom Base / Stationery)**:
  - `.card-inside-bottom`: Nền giấy kem nhạt có vân kẻ dòng, họa tiết hoa lá màu nước pastel, ảnh polaroid đính góc phải, nội dung thư chúc mừng định dạng font chữ viết tay Google Fonts (`Caveat` / `Dancing Script`).

---

## 4. Dữ Liệu Tùy Biến (Customizable Options)
- Dễ dàng thay đổi tên người nhận (mặc định: `bạn ơi`).
- Dễ dàng thay đổi nội dung thư chúc mừng trong file `index.html`.
- Dễ dàng thay thế đường dẫn 3 ảnh Polaroid kỷ niệm (mặc định sử dụng ảnh vẽ minh họa nghệ thuật ấm áp).

---

## 5. Kế Hoạch Kiểm Thử (Verification Plan)
- Mở trang web trên trình duyệt qua subagent browser.
- Kiểm tra tắt nến -> click mở hộp quà -> xác nhận luồng hạt và 2 chòm sao chạy trơn tru.
- Xác nhận thiệp xuất hiện lơ lửng đúng thời điểm (~7.8s) ngay phía trên hộp quà.
- Click vào thiệp lơ lửng -> xác nhận thiệp bay ra giữa màn hình cận cảnh.
- Click vào thiệp cận cảnh -> xác nhận nắp thiệp gập mở 3D mượt mà để lộ trọn vẹn cả 2 nửa.
- Kiểm tra tính thẩm mỹ đồ họa, độ nét, màu sắc, ánh sáng và khả năng đóng/mở mượt mà.
