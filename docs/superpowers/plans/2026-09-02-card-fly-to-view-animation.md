# Card Fly-To-View Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a smooth 3D flight animation when clicking the floating greeting card so it flies directly from its in-room position toward the viewer at center screen against a transparent background.

**Architecture:** Combine CSS 3D keyframe transitions with dynamic viewport coordinate calculation via JS CSS variables, while making the backdrop completely transparent and synchronizing the room SVG card visibility.

**Tech Stack:** HTML5, CSS 3D Transforms, JavaScript.

## Global Constraints
- Keep the background transparent with no darkening and no backdrop blur.
- Seamlessly transition from the in-room floating card into the 3D greeting card.
- Reverse the animation gracefully on close.

---

### Task 1: Update CSS for Transparent Backdrop and 3D Flight Keyframes

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/style.css:430-550`

- [ ] **Step 1: Make modal backdrop transparent**
Remove backdrop-filter and background color darkening in `.card-modal-backdrop`.

- [ ] **Step 2: Add `@keyframes card-fly-in` and `@keyframes card-fly-out`**
Configure 3D transforms using `--fly-x`, `--fly-y`, initial scale (0.22), initial rotation (38deg) up to full size (scale 1, rotate 0deg).

- [ ] **Step 3: Add smooth fade-in for hint pill and close button**

---

### Task 2: Update JavaScript for Dynamic Origin Mapping & Seamless Transition

**Files:**
- Modify: `c:/Users/ADMIN/Desktop/happy-birthday/index.html:1280-1310`

- [ ] **Step 1: Update floating card click handler to calculate `--fly-x` & `--fly-y` and hide SVG card**
- [ ] **Step 2: Update `closeCardModal` to fold card, play `card-fly-out`, and restore SVG card visibility**

---

### Task 3: Verification

**Files:**
- Test: `c:/Users/ADMIN/Desktop/happy-birthday/index.html`

- [ ] **Step 1: Test the full flow in browser**
Verify clicking floating card triggers smooth flight from room to viewpoint without background darkening/blur, unfolds on click, and returns on close.
