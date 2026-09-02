# Card Emergence Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the greeting card emergence animation so it rises in one single, smooth, direct motion out from the cavity of the memory gift box up to its hovering location.

**Architecture:** Update CSS transform origin and keyframes in `style.css` to eliminate off-screen coordinate offsets and provide a smooth, direct rise from within the box opening.

**Tech Stack:** HTML5 SVG, Vanilla CSS animations.

## Global Constraints
- Do not alter existing 3D modal interaction or particle engine mechanics.
- Maintain responsive SVG canvas coordinate integrity.
- Keep the design aesthetic refined, smooth, and magical.

---

### Task 1: Update Card Transform Origin and Emergence Keyframe in CSS

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/style.css:362-410`

**Interfaces:**
- Consumes: `#floating-box-card` in `index.html`
- Produces: CSS rules `#floating-box-card`, `#floating-box-card.is-emerged`, `@keyframes card-emerge-slow`

- [ ] **Step 1: Update `#floating-box-card` transform origin & initial transform**

Set `transform-box: fill-box`, `transform-origin: center center`, and starting position `transform: translate(-72px, 150px) scale(0.25)`.

- [ ] **Step 2: Streamline `@keyframes card-emerge-slow` to a smooth direct 1-shot rise**

Configure keyframes from `0%` inside box (`translate(-72px, 150px) scale(0.25)`) with opacity 0 to `100%` at hovering rest position (`translate(0, 0) scale(1)`) with opacity 1.

- [ ] **Step 3: Verify CSS syntax and styles**

Review `style.css` to ensure clean transitions and zero CSS syntax errors.

---

### Task 2: Verification and Browser Testing

**Files:**
- Test: `c:/Users/ADMIN/Desktop/happy-birthday/index.html`

- [ ] **Step 1: Open and interact with the page in browser**

Verify:
1. Candlestick click extinguishes flame.
2. Memory box click opens box lid and triggers magic particles.
3. Card emerges smoothly in 1 single direct motion from inside the box cavity up to hovering position.
4. Hovering and clicking card opens the 3D greeting card modal.
