# Thiết Kế Hiệu Ứng Thiệp Bay Lên Từ Lòng Hộp Quà (Card Emergence Animation)

## 1. Mục tiêu & Bối cảnh
- **Vấn đề hiện tại:** Tấm thiệp (`#floating-box-card`) bị bay từ mép bên phải màn hình vào do `transform-origin: 1210px 425px` kết hợp với `transform-box: fill-box` khiến tâm biến đổi bị dời ra ngoài hàng nghìn pixel khi áp dụng tỉ lệ `scale(0.25)`.
- **Yêu cầu mới:** Tấm thiệp bay thẳng một mạch, mượt mà và trực tiếp từ đáy bên trong chiếc hộp quà (`layer-memory-box`) vút lên vị trí lơ lửng ma thuật bên trên luồng sáng.

---

## 2. Thiết Kế Kỹ Thuật Chi Tiết

### 2.1. Cấu hình Tâm biến đổi & Trạng thái Ban đầu (`style.css`)
- **Phần tử:** `#floating-box-card`
- **Tâm biến đổi chuẩn:**
  ```css
  transform-box: fill-box;
  transform-origin: center center;
  ```
- **Tọa độ xuất phát ẩn trong đáy hộp:**
  - Khoảng cách tương đối từ tâm lòng hộp `(X=1138, Y=591)` đến vị trí nghỉ lơ lửng `(X=1210, Y=425)` là `dX = -72px`, `dY = +166px` (hoặc `+150px`).
  - Trạng thái mặc định:
    ```css
    transform: translate(-72px, 150px) scale(0.25);
    opacity: 0;
    ```

### 2.2. Khung hình Chuyển động Đơn Tuyến (`@keyframes card-emerge-slow`)
Chuyển động thực hiện liền mạch 1 lần từ đáy hộp lên điểm lơ lửng:
```css
@keyframes card-emerge-slow {
  0% {
    opacity: 0;
    transform: translate(-72px, 150px) scale(0.25);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px) scale(1);
  }
}
```

### 2.3. Thời gian & Đường cong Chuyển động (Timing & Easing)
- Áp dụng khi thêm class `.is-emerged`:
  ```css
  #floating-box-card.is-emerged {
    opacity: 1;
    pointer-events: auto;
    animation: card-emerge-slow 3.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
               card-hover-bob 5.5s ease-in-out infinite 3.8s;
  }
  ```
- **Hiệu ứng thị giác:**
  - Thiệp ẩn bên trong thành trước hộp quà, nhô lên qua miệng hộp dọc theo luồng sáng ma thuật (`box-volumetric-beam`).
  - Phóng lớn dần từ 0.25 lên 1.0 mượt mà từ chính tâm thiệp.
  - Sau 3.8 giây, tự động tiếp nối chuyển động bập bồng nhẹ nhàng (`card-hover-bob`).
  - Tương tác di chuột (hover) và click mở popup 3D không bị ảnh hưởng.

---

## 3. Kế Hoạch Kiểm Thử (Verification Plan)
1. Kiểm tra mã nguồn CSS để đảm bảo không còn lỗi lệch tâm `transform-origin`.
2. Kiểm tra trực quan bằng trình duyệt:
   - Click thổi tắt nến để tạo điều kiện mở hộp.
   - Click vào chiếc hộp để mở nắp.
   - Quan sát khi luồng sáng và chòm sao xuất hiện, tấm thiệp nhô lên chuẩn xác từ lòng hộp bay thẳng lên vị trí lơ lửng, không bị văng từ mép màn hình.
   - Kiểm tra tương tác hover và click mở modal thiệp chúc mừng.
