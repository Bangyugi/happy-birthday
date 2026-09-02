# Thiết Kế Hiệu Ứng Làn Khói & Tàn Đỏ Khi Thổi Tắt Nến

## 1. Tổng Quan
Khi người dùng click vào ngọn nến để dập lửa (hoặc tương tác thổi nến), cảnh phòng tối sẽ kích hoạt hiệu ứng làn khói mờ ảo uốn lượn bay lên cao cùng đốm tàn đỏ ở đầu bấc nến mờ dần, tạo trải nghiệm chân thực, mượt mà và nghệ thuật.

## 2. Chi Tiết Thành Phần Giao Diện

### 2.1. Đốm Tàn Đỏ Đầu Bấc (`#candle-ember`)
- **Vị trí**: Đỉnh bấc nến tại tọa độ SVG `(822, 436)`.
- **Đồ họa**: Vòng tròn nhỏ phát sáng cam-đỏ rực (`#ff3d10` kết hợp `#ffa040` và bộ lọc `filter="url(#flame-soft-glow)"`).
- **Hoạt ảnh**: Khi nến tắt, đốm tàn đỏ lóe nhẹ rồi tắt dần từ `opacity: 1` về `0` trong 1.8 giây (`@keyframes candle-ember-fade`).

### 2.2. Dải Khói Uốn Lượn Đa Tầng (`#candle-smoke`)
- **Cấu trúc**: 3 dải cong vector SVG (Cubic Bézier curves) với quỹ đạo uốn lượn hình chữ S tự nhiên:
  1. *Dải khói chính (Main Wisp)*: Thân khói rõ nét, lượn sóng từ bấc nến lên cao 140px, dãn nở nhẹ.
  2. *Dải khói phụ trái (Left Tendril)*: Mảnh hơn, uốn cong dạt nhẹ sang bên trái và tan biến sớm hơn.
  3. *Dải khói phụ phải (Right Tendril)*: Mảnh, mềm mại, lượn cong sang bên phải tạo cảm giác luồng không khí xao động.
- **Màu sắc & Hiệu ứng**: Gradient màu khói xám bạc (`#d6e4f0` $\rightarrow$ `#8fa3b8`), sử dụng `filter="url(#soft-glow)"`.
- **Hoạt ảnh**:
  - Dâng cao dần (`translateY` và `scale`), kết hợp lắc nhẹ (`rotate` và `translateX`).
  - Đường nét giãn dần (`stroke-dashoffset` / `transform`), mờ dần về `opacity: 0` trong khoảng 2.2 giây.

## 3. Tương Tác & Quản Lý Trạng Thái (Logic)
- Trong JavaScript:
  - Khi dập nến (`wasLit === true`):
    - Ẩn ngọn lửa (`#candle-flame-group`).
    - Kích hoạt lớp `.animating` cho `#candle-smoke` và `#candle-ember` (trigger reflow để animation luôn chạy lại khi dập nến).
  - Khi thắp lại nến:
    - Gỡ bỏ lớp `.animating` ngay lập tức để ẩn khói/tàn, ngọn lửa sáng lại bình thường.

## 4. Kiểm Thử & Xác Thực
1. Click vào ngọn nến khi đang sáng $\rightarrow$ ngọn lửa tắt, tàn đỏ lóe lên và 3 dải khói uốn lượn bay lên mềm mại rồi tan biến sạch sẽ.
2. Click lại vào ngọn nến để thắp sáng $\rightarrow$ ngọn lửa bừng sáng ngay lập tức, không còn tàn dư của khói.
3. Click nhiều lần liên tục $\rightarrow$ hoạt ảnh khói được reset mượt mà, không giật lag.
