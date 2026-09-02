# Classic Lidded Keepsake Box Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the memory box in `screen1.html` and `index.html` to accurately match the reference image (classic shoebox-style box with overhanging lid, clean candle shadow) and implement an animation where the lid pops off and lands on the table to the left.

**Architecture:** Replace the current polygon-flap box with clean SVG structures for the box body, interior cavity, overhanging lid group, and realistic candle shadow. Implement CSS keyframes for the lid pop-and-land sequence, accompanied by glowing cavity light, table contact shadow, and particle burst.

**Tech Stack:** Pure SVG, CSS3 3D Keyframe Animations, Vanilla JavaScript (Cosmic Particle Engine).

## Global Constraints
- Target files: `screen1.html`, `index.html`, `style.css`
- Keep responsive 1920x1080 SVG canvas centered in viewport.
- Maintain existing candle light/blow-out interaction and canvas particle engine.

---

### Task 1: SVG Gradients & Definitions
**Files:**
- Modify: `screen1.html:127-160` and `index.html:127-160`

- [ ] **Step 1: Update SVG defs for box materials and shadows**
  Add gradients for:
  - `#box-lid-top-grad`: `#687686` to `#4e5a68`
  - `#box-lid-rim-front`: `#46505c` to `#3a434d`
  - `#box-lid-rim-side`: `#313942` to `#242b32`
  - `#box-body-front-grad`: `#46505c` to `#3b444f`
  - `#box-body-side-grad`: `#2e363e` to `#20262c`
  - `#box-cavity-inner-grad`: `#0b0914` to `#161226`
  - `#box-lid-landed-shadow-grad`: radial gradient for table landing shadow

---

### Task 2: Box SVG Markup Restructuring
**Files:**
- Modify: `screen1.html:640-738` and `index.html:640-738`

- [ ] **Step 1: Replace `#layer-memory-box` with accurate geometry**
  - Contact shadow on table planks (`polygon points="970,725 1250,725 1308,705 1315,720 975,738"`).
  - Lid landed shadow on table to the left (`#box-lid-landed-shadow`).
  - Interior cavity & volumetric beam (`#box-volumetric-beam`, `#box-cavity-group`, `#box-core-burst-group`).
  - Box body (front face `polygon points="980,600 1240,600 1240,725 980,725"`, right side `polygon points="1240,600 1298,582 1298,705 1240,725"`, open rim lines).
  - Candle shadow silhouette (`#candle-shadow-on-box`) cast over body front and lid skirt.
  - Box Lid Group (`#box-lid-group`) containing Lid Top polygon, Lid Front skirt, and Lid Right skirt.

---

### Task 3: CSS Animations for Lid Pop & Land
**Files:**
- Modify: `style.css:137-330`

- [ ] **Step 1: Implement `#box-lid-group` pop-and-land animation**
  - Rest state (`translate(0, 0) rotate(0)`).
  - `.svg-canvas.is-box-open #box-lid-group`: Keyframe animation `lid-pop-and-land` (pops up, arcs left, lands on the table at `translate(-330px, 85px) rotate(-18deg)`).
  - Reverse closing transition when `.is-box-open` is removed.
  - Lid landed shadow animation fading in when open.
  - Smooth cavity reveal, volumetric beam pulse, and stardust burst.

---

### Task 4: Visual Verification & Browser Test
**Files:**
- Test in browser subagent on `screen1.html`

- [ ] **Step 1: Verify closed state matches reference image**
  Check box perspective, lid overhang, and candle shadow sharpness.
- [ ] **Step 2: Verify open animation**
  Click box, observe lid pop up and land on the table to the left, verify cosmic particles and beam.
- [ ] **Step 3: Verify closing animation**
  Click box again, observe lid returning smoothly to the box.
