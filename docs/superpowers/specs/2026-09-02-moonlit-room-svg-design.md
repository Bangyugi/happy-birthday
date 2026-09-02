# Moonlit Room - Pure SVG Vector Art Specification

## 1. Overview
The goal is to accurately recreate the reference image (`images/image.png`) as a high-fidelity, scalable vector graphic (SVG) rendered inside a clean, minimalist HTML/CSS page with no unnecessary toolbars or UI distractions.

## 2. Visual Architecture & Layout
The entire scene is rendered in an inline SVG with `viewBox="0 0 1920 1080"` (16:9 cinematic aspect ratio) centered on the screen.

### 2.1 Color Palette & Lighting Hierarchy
- **Deep Background Walls**: `#0d131a` to `#16202c` linear and radial gradients.
- **Window & Exterior Light**:
  - Exterior moonlight glow: `#1a2d4c` to `#2e4d7a`.
  - Window mullions & frames: `#0b1219` / `#131e2b`.
  - Window sill: `#131e2b` with subtle moonlit highlight on the upper edge `#283b54`.
- **Sheer Curtains (Left)**:
  - Multi-layered translucent path curves (`rgba(50, 80, 120, 0.45)`, `rgba(90, 130, 175, 0.3)`, `rgba(160, 195, 230, 0.2)`).
  - Vertical drape curves and waves with gradient fills mimicking sheer voile fabric catching moonlight.
- **Wall Shelves & Objects**:
  - Left corner shelf: Dark wooden bracket `#121820`, top ledge `#18222d`.
  - Center wall shelf: Floating bracket shelf `#151e28`.
  - Shelf objects:
    - Ceramic pitcher with handle: `#243343`.
    - Glass kerosene/oil lamp chimney + brass burner base: `#2a3e56` / `#36412f`.
    - Sugar bowl / container: `#1d2938`.
    - Framed picture: `#2c3640` with dark insert `#151c24`.
    - Leaning books: `#2f3d4e`, `#383547`.
- **Bookshelf (Right)**:
  - Heavy dark cabinet structure `#0b1016` with vertical dividers and 4 shelf tiers.
  - Top tier: Stack of horizontal books (`#1d2d3e`, `#2d3b4b`), small vase `#223344`, and vertical books.
  - Second tier: Solid row of hardcovers in muted tones (teal `#183f44`, forest green `#233827`, dark navy `#18273a`, crimson `#3f2127`, ochre `#3f3922`).
  - Third & Fourth tiers: Varied height book collections with shadow depths and spine highlights.
  - Sparkle star: 4-pointed diamond star (`#dbeaff` to `#ffffff`) with subtle soft glow.
- **Rustic Plank Table (Foreground)**:
  - Table top composed of 5-6 perspective planks with dark joint grooves (`#080c10`).
  - Wood top lighting: Smooth gradient from cool moonlit blue-grey on the left (`#232f3e`) to dark shadow on the right (`#121822`).
  - Apron and sturdy rectangular wooden legs (`#0e141c`).
- **Candlestick**:
  - Brass chamberstick base with finger loop handle (`#434a36` to `#21261b`).
  - Turned candlestick collar and neck.
  - White/ivory wax candle (`#b4b8bc` to `#d8dbdf`) with curved wax rim.
  - Black wick (`#111111`).
  - Realistic elongated shadow cast onto the table to the right.
- **Memory / Gift Box**:
  - Rectangular box (`#3a4147` body, `#52585e` lid) positioned next to the candle.
  - Cast shadow: Exact silhouette of the candle holder + candle cast across the front face of the box (`#192027` / `#121820`).
  - Shadow cast onto the table beneath the box.

## 3. Minimalist HTML / CSS Presentation
- Dark, noise-free background (`#080b0f`).
- Perfectly responsive container that centers the 16:9 SVG with max-width/max-height constraints, maintaining crispness across all screen sizes.
- Zero extraneous buttons, zero clutter—pure, immersive vector artwork.

## 4. File Structure
- `index.html`: Main HTML file containing the complete inline SVG artwork and clean styling.
- `style.css`: Minimalist CSS for centering, responsiveness, and dark backdrop.
