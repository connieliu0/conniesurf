# Iframe Pattern Plan

## Overview
Create a pattern where clicking links opens them in an iframe, and the main content area gets "squished" to make room.

## Proposed Structure

### HTML Changes
```
<body>
  <div class="blob"></div>
  <div id="nav-container"></div>
  <div class="main-content-wrapper">
    <div class="col"> <!-- existing content --> </div>
    <div id="iframe-container" class="hidden">
      <button id="close-iframe">×</button>
      <iframe id="content-frame"></iframe>
    </div>
  </div>
</body>
```

### Layout Options

#### Option A: Side-by-side (Horizontal Split)
- Iframe appears on the right
- `.col` shrinks to ~50% width
- Both visible simultaneously
- Good for: Comparing content, keeping context

#### Option B: Replace Content
- Iframe replaces `.col` entirely
- Clicking link hides `.col`, shows iframe
- Close button restores `.col`
- Good for: Focused viewing, simpler UX

#### Option C: Bottom Panel
- Iframe appears at bottom
- `.col` shrinks vertically
- Both visible simultaneously
- Good for: Mobile-friendly, keeping main content visible

## Implementation Steps

1. **Add iframe container to HTML**
   - Add to index.html, about.html, thesis.html, etc.
   - Or inject via JavaScript

2. **CSS Layout**
   - Use flexbox or grid for responsive squishing
   - Add transitions for smooth animations
   - Handle iframe sizing

3. **JavaScript Link Handler**
   - Intercept link clicks
   - Load URL in iframe
   - Toggle layout classes
   - Handle close button

4. **Edge Cases**
   - External links (same-origin policy)
   - Iframe loading states
   - Mobile responsiveness
   - Multiple rapid clicks

## Questions to Answer

1. Which links? (Gallery cards, all links, specific class?)
2. Which layout? (A, B, or C above?)
3. Close behavior? (Button, click outside, ESC key?)
4. Resizable? (Should iframe be draggable/resizable?)

## Recommended: Option A (Side-by-side)

**Pros:**
- Keeps context visible
- Smooth transition
- Easy to compare
- Professional feel

**Implementation:**
- `.main-content-wrapper` uses `display: flex`
- `.col` has `flex: 1` (shrinks when iframe appears)
- `#iframe-container` has `flex: 1` (grows when visible)
- Transition: `flex-basis` or `width` with CSS transitions


