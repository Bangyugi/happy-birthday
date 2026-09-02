# Thiết Kế Chi Tiết: Hoạt Ảnh Cinematic Hộp Ký Ức Phát Sáng & Bão Bụi Sao (Magic Cosmic Stardust & Constellations)

## 1. Tổng quan & Mục tiêu
Tái hiện trung thực và sống động hình ảnh điện ảnh (cinematic) kỳ ảo khi chiếc hộp ký ức trên bàn được mở ra trong không gian đêm trăng tĩnh lặng (khi nến tắt). Chiếc hộp mở bung các cánh nắp, phát ra luồng ánh sáng chói lòa từ tâm, phóng thích hàng ngàn hạt bụi sao đa sắc màu cuộn xoáy thành dải ngân hà huyền ảo, đi kèm các chòm sao nối tuyến sáng lung linh bao phủ cả căn phòng.

---

## 2. Trạng thái & Cơ chế kích hoạt (Interaction Flow)
1. **Điều kiện kích hoạt**:
   - Khi ngọn nến ở trạng thái tắt (không có class `.is-lit`).
   - Người dùng di chuột vào chiếc hộp: xuất hiện con trỏ pointer và hiệu ứng pulsing viền mờ tinh tế gợi ý tương tác.
   - Click chuột vào chiếc hộp `#layer-memory-box`:
     - Chuyển trạng thái mở hộp: thêm class `.is-box-open` vào SVG và kích hoạt Particle Engine trên HTML5 Canvas.
2. **Hiệu ứng khi mở hộp**:
   - Nắp hộp gập mở 3D (các cánh nắp carton vát mở sang trái, phải và phía sau).
   - Từ lòng hộp, luồng sáng bùng nổ (Volumetric Light Burst) rực rỡ dạng nón sáng trắng/vàng/cyan chiếu lên cao.
   - Particle Engine Canvas kích hoạt 500+ hạt sao lấp lánh phóng vút từ miệng hộp, cuộn xoáy theo dòng chảy Fibonacci/vortex flow lên trần nhà, qua cửa sổ và tỏa khắp căn phòng.
   - Xuất hiện các chòm sao kỳ ảo (Constellation Networks) với các đường nối phát sáng hình học.
   - Ngôi sao 4 cánh kim cương (`4-point sparkle stars`) lấp lánh ở góc phòng và xung quanh dải ngân hà.
   - Toàn bộ căn phòng được phủ một lớp ánh sáng cosmic mơ mộng huyền ảo.
3. **Đóng hộp**:
   - Click lại vào chiếc hộp: nắp hộp nhẹ nhàng khép lại, các hạt sao giảm dần tốc độ và tan biến êm dịu.

---

## 3. Kiến trúc kỹ thuật (Technical Architecture)

### A. Lớp Đồ Họa SVG (SVG Vector Layer)
- **Open Box 3D Geometry**:
  - Khi đóng: hiển thị cấu trúc nắp hộp nguyên bản.
  - Khi mở (`.is-box-open`):
    - Đáy hộp trong suốt đón ánh sáng từ đáy.
    - Cánh nắp trái: `<polygon points="982,615 920,550 970,530 1020,615" ... />`
    - Cánh nắp phải: `<polygon points="1228,615 1320,530 1370,555 1288,600" ... />`
    - Lòng hộp sáng rực với lõi ánh sáng `<ellipse>` và luồng sáng đa giác dạng phễu vươn lên trần nhà.
- **Cosmic Room Illumination Overlay**:
  - Gradient tỏa sáng pastel cyan/magenta/gold phủ lên rèm cửa, tường sau và mặt bàn gỗ.

### B. Canvas Particle Engine (HTML5 Canvas 60 FPS)
- Một thẻ `<canvas id="magic-cosmic-canvas">` toàn màn hình đặt đồng bộ tuyệt đối trên lớp SVG (hoặc lồng ghép mượt mà trong viewport).
- **Hệ thống hạt sao (Particle System)**:
  - **Số lượng hạt**: 400 - 600 hạt cùng lúc.
  - **Màu sắc**: Palette pastel dạ quang lấy từ ảnh tham chiếu:
    - Cyan `#54fcfd`, Magenta `#ff6fd8`, Gold `#ffd700`, Violet/Lavender `#caa8ff`, Mint Emerald `#50fa7b`, Diamond White `#ffffff`.
  - **Chuyển động**:
    - Tọa độ sinh: miệng hộp `(x: 1100, y: 640)`.
    - Lực đẩy ban đầu hướng lên trên với độ phân tán góc mở và gia tốc cuộn xoáy (vortex orbital momentum).
    - Dao động sóng sine / noise flow tự nhiên.
  - **Đồ họa hạt**:
    - Hạt tròn phát sáng (glow halos với `createRadialGradient`).
    - Hạt sao 4 cánh lấp lánh (sparkle stars với tia xoay nhẹ).
  - **Mạng lưới chòm sao (Constellations)**:
    - 15-25 điểm sao chủ đạo tạo thành các chòm sao nối với nhau bằng các đoạn thẳng bán trong suốt (`rgba(170, 220, 255, 0.5)`).
- **Tối ưu hóa hiệu năng**:
  - `requestAnimationFrame`, tính toán vector toán học nhẹ nhàng, tự động ngắt render loop khi hộp đóng hoàn toàn để tiết kiệm CPU/GPU.

---

## 4. Kế hoạch kiểm thử & nghiệm thu
- Mở `screen1.html` / `index.html` trên trình duyệt.
- Kiểm tra trạng thái nến đang sáng $\rightarrow$ Click nến để thổi tắt.
- Click vào chiếc hộp $\rightarrow$ Quan sát nắp hộp mở ra, ánh sáng bùng nổ, bão bụi sao và chòm sao lấp lánh chuyển động 60 FPS mượt mà.
- Click lại vào chiếc hộp $\rightarrow$ Hộp đóng lại êm ái, hạt bụi sao tan biến tự nhiên.
- Kiểm tra tính tương thích Responsive trên các kích thước màn hình.
