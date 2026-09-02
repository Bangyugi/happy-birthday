# Classic Lidded Keepsake Box Redesign Specification

## 1. Overview
Redesign the memory box in `screen1.html` and `index.html` to precisely match the reference image (classic shoebox/keepsake box with overhanging lid and accurate candle shadow) and implement an elegant pop-up opening animation where the lid lifts off the box and lands on the table to the left.

---

## 2. Visual Structure & Anatomy

### 2.1 Closed Box Anatomy (Matching Reference Image)
- **Dimensions & Placement**:
  - Located on the rustic table at coordinate range `x: 980 -> 1300`, `y: 565 -> 730` in the 1920x1080 SVG canvas.
  - Perspective matching table planks with front-facing rectangular projection and 3D receding right face.
- **Box Body (Thân hộp)**:
  - **Front Face**: Gradient `#4a5460` to `#3e4752` (moonlit grey-blue tone).
  - **Right Side Face**: Shaded facet `#2c333c` to `#20262d`.
  - **Open Top Rim (Inner Thickness)**: Defined 3D inner lip when opened.
- **Box Lid (Nắp hộp - `#box-lid-group`)**:
  - **Lid Top Surface**: Perspective polygon catching ambient moonlight (`#637080` to `#515d6c`).
  - **Lid Front Lip (Gờ nắp trước)**: Dropping over the top of the body (`#434d58`), creating a sharp horizontal crease line and subtle underside drop shadow.
  - **Lid Right Lip**: Receding side rim (`#2f3741`).
- **Candle Silhouette Cast Shadow**:
  - Crisp silhouette of the chamberstick dish, stem collar, wax pillar, and wick cast across the lid front and body front.
  - Matches the reference image with clean geometric bezier curves and natural moonlit shadow color (`#1a222a` at 90% opacity).
- **Contact Shadow**:
  - Realistic multi-layered contact shadow directly under the box base onto the wooden table planks.

---

## 3. Opening & Closing Animation Behavior

### 3.1 Lid Pop & Land Animation (`#box-lid-group`)
- When the box is clicked (`.is-box-open` toggled):
  1. **Phase 1 - Pop Up (0% -> 35%)**: Lid lifts vertically off the box with an upward pop curve (`translateY(-130px) rotate(-12deg)`).
  2. **Phase 2 - Arc Left (35% -> 70%)**: Lid glides leftwards through the air in an arc (`translateX(-180px) translateY(-60px) rotate(-24deg)`).
  3. **Phase 3 - Settle on Table (70% -> 100%)**: Lid smoothly lands on the wooden table to the left side of the box (`translateX(-290px) translateY(85px) rotate(-16deg)`), resting naturally on the wooden surface.
  4. **Lid Landing Shadow**: As the lid lands on the left, a soft contact shadow fades in underneath the lid on the table.

### 3.2 Cavity Awakening & Cosmic Burst
- As the lid lifts off:
  - **Inner Cavity**: Radiant deep indigo/purple cavity exposed.
  - **Volumetric Light Beam**: Upward-expanding aurora beam streaming towards the ceiling.
  - **Cosmic Particles Canvas**: 60fps canvas engine emits floating magic stars, stardust, and rainbow orbs.
  - **Ambient Room Glow**: Gentle illumination expanding across the table and wall.

### 3.3 Reversible Interaction
- Clicking the box again reverses the animation: the lid lifts off the table, arcs back to the right, and settles squarely back onto the box body.

---

## 4. Implementation Files
- `screen1.html` & `index.html`: Update SVG markup for `#layer-memory-box` (Lid structure, Body structure, Candle Shadow, Lid Landing Shadow).
- `style.css`: Update keyframe animations, transitions, and 3D transforms for the lid popping and landing.
