# Moonlit Room SVG Vector Art Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Accurately recreate `images/image.png` as a high-fidelity SVG artwork presented in a minimalist HTML/CSS page.

**Architecture:** A standalone `index.html` file embedding the comprehensive 16:9 (`0 0 1920 1080`) SVG vector artwork with layered `<defs>`, gradients, and vector shapes, styled by a clean `style.css`.

**Tech Stack:** HTML5, CSS3, Scalable Vector Graphics (SVG 1.1/2.0).

## Global Constraints
- Faithful reproduction of `images/image.png` composition, proportions, colors, and lighting.
- Minimalist presentation: no distracting buttons or toolbars.
- Pure SVG, HTML, CSS with clean structure and semantic grouping (`<g id="...">`).

---

### Task 1: Setup Minimalist CSS and HTML Foundation

**Files:**
- Create/Modify: `style.css`
- Create/Modify: `index.html`

- [ ] **Step 1: Write `style.css` for pure minimalist full-viewport 16:9 centering**
- [ ] **Step 2: Initialize `index.html` with basic document skeleton and SVG container**
- [ ] **Step 3: Verify initial render in browser**

---

### Task 2: Implement Background, Window, Moonlight, and Sheer Curtains

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `<defs>` with background radial/linear gradients and soft filters**
- [ ] **Step 2: Construct room backdrop and window structure (frame, exterior sky, panes, sill highlight)**
- [ ] **Step 3: Construct left sheer drapery/curtains with multi-layered bezier waves and opacity**
- [ ] **Step 4: Verify window and curtain alignment against `images/image.png`**

---

### Task 3: Implement Wall Shelves, Center Props, and Right Bookshelf

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Construct left corner bracket shelf**
- [ ] **Step 2: Construct center wall shelf with pitcher, oil lamp, sugar bowl, frame, and leaning books**
- [ ] **Step 3: Construct right grand bookshelf with 4 tiers, top stack & vase, book spines, and sparkle star**
- [ ] **Step 4: Verify shelving props against `images/image.png`**

---

### Task 4: Implement Rustic Table, Candle, Memory Box with Cast Shadow

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Construct rustic table (planks, perspective lines, apron, legs, and moonlit highlights)**
- [ ] **Step 2: Construct memory gift box with lid and perspective**
- [ ] **Step 3: Construct vintage brass chamberstick candlestick (saucer, handle, wax pillar, wick)**
- [ ] **Step 4: Construct exact candle cast shadow on the box front face and table surface**
- [ ] **Step 5: Add atmospheric ambient lighting blend**

---

### Task 5: Final Visual Verification and Polish

**Files:**
- Modify: `index.html`, `style.css`

- [ ] **Step 1: Open browser page and inspect full visual composition**
- [ ] **Step 2: Compare visual alignment with `images/image.png` and fine-tune colors/coordinates**
- [ ] **Step 3: Confirm responsive scaling across viewports**
