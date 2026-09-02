# Thiết Kế Hoạt Ảnh Rèm Cửa Phập Phồng Theo Gió (Curtain Wind Flutter Animation Design)

## 1. Mục tiêu
Tạo hiệu ứng hoạt ảnh nhẹ nhàng, bồng bềnh và chân thực cho phần rèm cửa voan (`#layer-curtains`) trong khung cảnh phòng đêm trăng, mô phỏng làn gió đêm thoang thoảng thổi qua khung cửa sổ.

## 2. Kiến trúc & Cấu trúc Phân nhóm SVG

Trong `index.html`, phân tách các dải rèm thành 3 nhóm cấp độ di chuyển:

1. **`curtain-base-group` (Lớp rèm nền & nếp gấp sâu sát tường)**
   - Chứa lớp `path` nền tối và dải rèm thứ nhất.
   - Nhịp đung đưa chậm và biên độ nhỏ (~9 giây).

2. **`curtain-mid-group` (Lớp rèm trung tâm & nếp gấp chính)**
   - Chứa dải voan thứ 2, thứ 3 và các đường nếp gấp phụ.
   - Biên độ uốn lượn vừa phải, nhịp chuyển động ~7 giây.

3. **`curtain-edge-group` (Lớp mép voan bồng bềnh & sương mờ)**
   - Chứa dải voan ngoài cùng và mép sương mờ đón gió nhiều nhất.
   - Biên độ uốn lượn phóng khoáng nhất, nhịp chuyển động ~5.5 giây.

4. **`curtain-ray-group` (Dải sáng trăng hắt qua rèm)**
   - Chứa polygon tia sáng mặt trăng, đổi độ sáng (`opacity`) nhẹ nhàng theo nhịp gió thổi.

## 3. Hoạt Ảnh CSS (`style.css`)

### 3.1. Điểm neo cố định (Anchor Origin)
- Mép trên trần / đỉnh rèm được neo cố định tại `transform-origin: 0px 0px` (hoặc `top left`), đảm bảo đỉnh rèm gắn chặt với mép cửa sổ / trần nhà, không bị trôi hay hở mép.

### 3.2. Khung hình Chuyển động (Keyframes)
- `@keyframes curtain-sway-base`: `skewX(-0.8deg) rotate(-0.3deg)`
- `@keyframes curtain-sway-mid`: `skewX(-2deg) rotate(-0.8deg) scaleX(1.02) translateX(3px)`
- `@keyframes curtain-sway-edge`: `skewX(-3.5deg) rotate(-1.5deg) scaleX(1.05) translateX(8px)`
- `@keyframes curtain-moonbeam-pulse`: `opacity: 0.35` -> `opacity: 0.55`

Tất cả hoạt ảnh sử dụng `animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95)` với chế độ lặp vô tận đảo chiều (`infinite alternate-reverse`) và độ trễ lệch pha (staggered delay).

## 4. Kế hoạch Kiểm tra (Verification)
1. Quan sát trực quan bằng trình duyệt trên `index.html`.
2. Kiểm tra độ mượt mà 60fps, không giật lag, không che khuất hộp quà hay thiệp.
3. Đảm bảo đỉnh rèm cố định tuyệt đối, thân và chân rèm uốn lượn tự nhiên.
