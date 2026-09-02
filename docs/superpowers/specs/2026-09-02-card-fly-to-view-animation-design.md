# Thiết Kế Hiệu Ứng Thiệp Bay Lại Gần Tầm Nhìn Khi Click (Card Fly-To-View Animation)

## 1. Mục tiêu & Bối cảnh
- **Vấn đề:** Khi click vào tấm thiệp đang lơ lửng, modal thiệp chúc mừng 3D hiện lên đột ngột theo dạng popup truyền thống kèm nền tối và làm mờ (backdrop blur), làm giảm tính liền mạch và ma thuật của không gian.
- **Yêu cầu:** 
  - Khi click vào tấm thiệp lơ lửng, tấm thiệp sẽ có chuyển động bay lướt 3D mượt mà từ vị trí trên hộp quà bay thẳng ra trước tầm mắt người xem ở giữa màn hình.
  - Phông nền căn phòng và các hiệu ứng hạt/ánh sáng phía sau giữ nguyên độ sáng rõ và trong suốt (không làm tối, không làm mờ nền).
  - Khi đóng, thiệp thu nhỏ lướt bay trở lại vị trí lơ lửng trong phòng.

---

## 2. Thiết Kế Kỹ Thuật

### 2.1. Phông nền Trong Suốt (`style.css`)
- Cấu hình lại `.card-modal-backdrop`:
  ```css
  .card-modal-backdrop {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  ```

### 2.2. Hiệu Ứng Bay 3D (`card-fly-in` & `card-fly-out`)
- **Tọa độ xuất phát tương đối:**
  Vị trí thiệp lơ lửng trong SVG nằm ở góc khoảng 75% chiều ngang và 47% chiều cao SVG. Trong khung nhìn modal, vị trí này tương ứng với độ lệch `translate3d(24vw, -6vh, -150px) rotate(38deg) scale(0.24)`.
- **Khung hình bay vào (`@keyframes card-fly-in`):**
  ```css
  @keyframes card-fly-in {
    0% {
      opacity: 0;
      transform: translate3d(24vw, -6vh, -150px) rotate(38deg) scale(0.24);
    }
    15% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    }
  }
  ```
- **Khung hình bay về (`@keyframes card-fly-out`):**
  ```css
  @keyframes card-fly-out {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate3d(24vw, -6vh, -150px) rotate(38deg) scale(0.24);
    }
  }
  ```
- **Thời lượng & Easing:**
  `0.85s cubic-bezier(0.16, 1, 0.3, 1)` cho bay vào, `0.65s cubic-bezier(0.4, 0, 0.2, 1)` cho bay về.

### 2.3. Logic Đồng Bộ Trong JavaScript (`index.html`)
- **Khi mở modal (click `#floating-box-card`):**
  1. `#floating-box-card.style.opacity = '0'` (ẩn thiệp nhỏ trong phòng để tránh hiển thị 2 thiệp cùng lúc).
  2. Thêm class `.is-active` và `.is-flying-in` vào modal.
- **Khi đóng modal (click nút đóng hoặc click ra ngoài):**
  1. Gập thiệp 3D lại nếu đang mở (`is-card-open` gỡ bỏ).
  2. Thêm class `.is-flying-out` vào modal để phát animation bay về.
  3. Sau thời gian animation kết thúc (~650ms), gỡ bỏ `.is-active`, `.is-flying-out`, và phục hồi `#floating-box-card.style.opacity = ''`.

---

## 3. Kế Hoạch Kiểm Thử
1. Click thiệp lơ lửng: Quan sát thiệp bay lướt 3D mượt mà từ vị trí lơ lửng tới trước mắt, nền phòng phía sau giữ nguyên độ sắc nét không bị mờ/tối.
2. Chạm vào thiệp 3D: Mở và đọc nội dung 2 trang thiệp chúc mừng.
3. Bấm đóng: Thiệp tự gập và lướt bay ngược về vị trí lơ lửng, thiệp trong phòng hiện lại bình thường.
