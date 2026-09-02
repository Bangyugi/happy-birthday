# Thiết Kế Hệ Thống Hiệu Ứng Âm Thanh (Sound Effects Design)

- **Ngày tạo**: 2026-09-02
- **Chủ đề**: Tích hợp Sound Effects (SFX) bằng Web Audio API & Hybrid Fallback cho Website Sinh Nhật Lâm Oanh
- **Tập tin liên quan**: `sound-effects.js`, `index.html`, `magic-particles.js`

---

## 1. Mục tiêu & Tổng quan

Hệ thống âm thanh được thiết kế nhằm nâng tầm cảm xúc và độ chân thực cho toàn bộ các tương tác và hoạt ảnh kỳ ảo trong website sinh nhật, bao gồm:
- Thổi tắt / Thắp sáng nến
- Cố mở hộp quà khi nến còn sáng (báo hiệu nắp bị khóa)
- Mở / Đóng nắp hộp kỷ niệm bằng gỗ
- Bụi sao ngân hà phun trào và vẽ các chòm sao Xử Nữ & Sư Tử
- Thiệp nổi bay ra khỏi hộp và lướt phóng to 3D vào màn hình
- Lật mở / Đóng bìa thiệp giấy thủ công
- Hiệu ứng máy đánh chữ gõ từng dòng thư chúc mừng sinh nhật kèm tiếng chuông hoàn thành

---

## 2. Kiến trúc Kỹ thuật (`sound-effects.js`)

### 2.1. Quản lý AudioContext & Tự động Kích hoạt (Unlock Autoplay)
- Sử dụng singleton class `SoundEngine` (`window.soundEngine`).
- Quản lý một `AudioContext` và `MasterGainNode` để kiểm soát âm lượng tổng thể êm dịu.
- Tự động mở khóa `AudioContext` (`audioCtx.resume()`) khi người dùng click/chạm lần đầu vào bất kỳ vị trí nào trên trang (`window.addEventListener('pointerdown', ..., { once: true })`).
- Phương thức `playAudioFile(filename, fallbackSynthFn)`: Cho phép ưu tiên phát file âm thanh `.mp3`/`.wav` trong thư mục `audio/` nếu có, ngược lại tự động chuyển sang bộ tổng hợp Web Audio API thuần túy.

### 2.2. Chi tiết Thuật toán Tổng hợp Âm thanh (Web Audio API Synthesizers)

1. **`playCandleBlow()`**:
   - Sử dụng White Noise qua `BiquadFilterNode` (Bandpass filter) với tần số trung tâm quét từ 850Hz xuống 200Hz trong 450ms.
   - Kết hợp một xung nhiễu tắt nhanh mô phỏng tiếng tàn khói "xèo xèo" êm ái.
2. **`playCandleIgnite()`**:
   - Xung nhiễu ma sát 40ms mô phỏng quẹt diêm + dao động sóng Sine quét từ 220Hz lên 580Hz trong 200ms tạo cảm giác ngọn lửa bùng sáng ấm áp.
3. **`playBoxLocked()`**:
   - Hai tiếng gõ cọc cọc cách nhau 80ms (Triangle wave suy giảm nhanh 35ms ở 180Hz & 150Hz) mô phỏng hộp bị khóa rung lên.
4. **`playBoxOpen()`**:
   - Ma sát trầm tần số thấp tăng dần (80Hz - 220Hz) + tiếng click chốt cơ học (mechanical click 1.2kHz trong 15ms) + âm ngân huyền bí lan tỏa.
5. **`playCosmicSurge()`**:
   - Arpeggio chuông gió ma thuật ngũ cung (Pentatonic chimes: E6, G6, A6, B6, D7, E7) tạo cảm giác bụi sao thần tiên tuôn trào.
6. **`playStarDing(index)`**:
   - Tiếng "ting" pha lê trong vắt (Sine wave kết hợp Overtones 2.4kHz - 4.8kHz có decay mượt) khi mỗi điểm sao và đường nối chòm sao được vẽ.
7. **`playCardEmerge()`**:
   - Âm thanh lướt êm dịu (Soft magical whoosh) với bộ lọc quét từ 300Hz lên 800Hz trong 600ms.
8. **`playCardFly()`**:
   - Hiệu ứng lướt gió 3D (Spatial Swoosh) khi thiệp bay từ vị trí trong phòng lên chính diện màn hình.
9. **`playPaperFlip()`**:
   - Dải nhiễu trắng qua Highpass filter (3.5kHz - 7kHz) với đường bao biên độ (envelope) mô phỏng tiếng sột soạt lật mở trang thiệp mỹ thuật.
10. **`playTypewriterKey(char)`**:
    - Tiếng click cơ học siêu ngắn (10-15ms) có độ biến thiên ngẫu nhiên cao độ (±8%) để âm thanh tự nhiên, phong phú.
11. **`playTypewriterBell()`**:
    - Tiếng chuông "ding" kim loại cổ điển nhẹ nhàng khi bức thư hoàn thành việc đánh máy.
12. **`playBoxClose()` & `playCardClose()`**:
    - Tiếng đóng nắp êm ái: Xung trầm ấm (100Hz) với decay êm, không gây giật mình.

---

## 3. Bản đồ Tích hợp Sự kiện (Event Hooks Mapping)

| Sự kiện tương tác | Vị trí Code trong `index.html` / `magic-particles.js` | Hàm SFX gọi thực thi |
| :--- | :--- | :--- |
| **Thổi tắt nến** | `candle.addEventListener('click')` (khi `wasLit === true`) | `soundEngine.playCandleBlow()` |
| **Thắp sáng nến** | `candle.addEventListener('click')` (khi `wasLit === false`) | `soundEngine.playCandleIgnite()` |
| **Cố mở hộp khi nến còn sáng** | `box.addEventListener('click')` (khi `svg.is-lit`) | `soundEngine.playBoxLocked()` |
| **Mở hộp kỷ niệm** | `box.addEventListener('click')` (khi mở) | `soundEngine.playBoxOpen()` |
| **Bụi sao bùng nổ** | `cosmicEngine.start()` | `soundEngine.playCosmicSurge()` |
| **Vẽ điểm & đường chòm sao** | `magic-particles.js` trong vòng lặp nối sao | `soundEngine.playStarDing(nodeIndex)` |
| **Thiệp bay ra khỏi hộp** | `cosmicEngine.onConstellationsComplete` | `soundEngine.playCardEmerge()` |
| **Click thiệp bay lên 3D** | `floatingCard.addEventListener('click')` | `soundEngine.playCardFly()` |
| **Lật mở bìa thiệp 3D** | `card3D.addEventListener('click')` (khi mở) | `soundEngine.playPaperFlip()` |
| **Gõ từng ký tự thư** | `startTypewriter()` -> `typeNextChar()` | `soundEngine.playTypewriterKey(char)` |
| **Kết thúc gõ thư** | `startTypewriter()` dòng cuối cùng | `soundEngine.playTypewriterBell()` |
| **Đóng thiệp 3D** | `closeCardModal()` & gập thiệp | `soundEngine.playCardClose()` |
| **Đóng nắp hộp quà** | `closeBoxGracefully()` | `soundEngine.playBoxClose()` |

---

## 4. Kế hoạch Kiểm thử & Xác minh

1. **Kiểm tra Autoplay Unlock**: Đảm bảo trên Chrome, Edge, Safari, Firefox không có lỗi console `AudioContext was not allowed to start`.
2. **Kiểm tra Từng Hiệu Ứng Âm Thanh**: Click lần lượt nến, hộp, thiệp, gõ chữ để thẩm âm độ khớp thời gian (timing), âm lượng cân đối và không bị vỡ tiếng (clipping).
3. **Kiểm tra Hiệu Năng**: Không gây drop frame cho hoạt ảnh canvas hạt bụi sao và hoạt ảnh 3D CSS.
