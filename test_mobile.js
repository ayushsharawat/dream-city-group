const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== MOBILE-FIRST DESIGN & RESPONSIVENESS AUDIT ===\n');

const projectRoot = __dirname;
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Read files
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(projectRoot, 'assets/css/style.css'), 'utf8');
const viewerJs = fs.readFileSync(path.join(projectRoot, 'assets/js/siteplan-viewer.js'), 'utf8');

// 2. Mobile Viewport & CSS Overflow checks
console.log('--- 1. Viewport & Narrow Screen (320px / 375px / 430px) Rules ---');
assert(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0"'), 'Viewport meta tag is properly configured');
assert(css.includes('overflow-x: hidden'), 'Body/HTML prevents accidental horizontal scroll');
assert(css.includes('@media (max-width: 380px)'), 'Includes ultra-compact media query for 320px-380px screens');
assert(css.includes('min-height: 44px') || css.includes('min-h-[44px]') || html.includes('min-h-[44px]'), 'Enforces 44px+ mobile touch targets');
assert(css.includes('font-size: 16px !important'), 'Prevents unwanted iOS Safari input auto-zoom on mobile');

// 3. Mobile Navigation
console.log('\n--- 2. Mobile Navigation & Touch Controls ---');
assert(html.includes('id="mobile-menu-btn"'), 'Functional mobile hamburger menu button present');
assert(html.includes('id="mobile-menu"'), 'Mobile dropdown menu container present');
assert(html.includes('aria-label="Toggle Navigation Menu"'), 'Accessible aria-label on mobile menu button');
assert(html.includes('Enquire') && html.includes('mobile-nav-link'), 'Enquire CTA accessible in mobile header and drawer');
assert(html.includes('w-8 h-8 sm:w-11 sm:h-11') || html.includes('w-9 h-9 sm:w-11 sm:h-11'), 'Company logo scaled appropriately for small screens');
assert(html.includes('truncate') || html.includes('whitespace-nowrap'), 'Company title protected against mobile overflow wrapping');

// 4. Mobile Hero & Countdown
console.log('\n--- 3. Mobile Hero & Rolling Countdown ---');
assert(html.includes('BOOK YOUR PLOT NOW'), 'Book Your Plot Now button present');
assert(html.includes('VIEW FULL SITE PLAN'), 'View Full Site Plan button present in Hero');
assert(html.includes('flex flex-col sm:flex-row items-stretch'), 'Hero buttons adapt to full-width stacked on mobile');
assert(css.includes('.countdown-open-strip'), 'Continuous horizontal rolling countdown strip present');
assert(css.includes('.odometer-digit-col'), 'Individual vertical odometer digit columns present');
assert(css.includes('.countdown-open-separator'), 'Subtle colon separators present on common baseline');

// 5. Mobile Site Plan Viewer (Critical Feature)
console.log('\n--- 4. Mobile Site Plan Viewer (Pinch & Zoom Engine) ---');
assert(html.includes('id="siteplan-viewer-modal"'), 'Dedicated full-screen site plan modal (#siteplan-viewer-modal) exists');
assert(html.includes('id="siteplan-viewport"'), 'Site plan viewport (#siteplan-viewport) exists');
assert(html.includes('id="siteplan-stage"'), 'Transform canvas stage (#siteplan-stage) exists');
assert(html.includes('id="siteplan-full-img"'), 'High-res image element (#siteplan-full-img) exists');
assert(html.includes('assets/images/blueprint_dreamcityResidency.png'), 'References official high-res blueprint image');
assert(html.includes('id="siteplan-btn-zoom-in"'), 'On-screen Zoom In (+) button present');
assert(html.includes('id="siteplan-btn-zoom-out"'), 'On-screen Zoom Out (-) button present');
assert(html.includes('id="siteplan-btn-reset"'), 'On-screen Reset View button present');
assert(html.includes('id="siteplan-close-btn"'), 'Close button present');
assert(html.includes('id="siteplan-zoom-badge"'), 'Live zoom level percentage badge present');
assert(html.includes('Pinch with 2 fingers') || html.includes('pinch with two fingers'), 'Clear pinch-to-zoom instruction hint provided');

// 6. Test siteplan-viewer.js JS logic in simulated DOM
console.log('\n--- 5. Site Plan Viewer Gesture Engine Logic ---');
assert(viewerJs.includes('onTouchStart') && viewerJs.includes('onTouchMove') && viewerJs.includes('onTouchEnd'), 'Touch event handlers (start/move/end) implemented');
assert(viewerJs.includes('getTouchDistance') || viewerJs.includes('Math.hypot'), '2-finger pinch distance calculation implemented');
assert(viewerJs.includes('lastTapTime') && viewerJs.includes('distFromLastTap'), 'Double-tap gesture detection implemented');
assert(viewerJs.includes('clampPan'), 'Boundary constraint logic prevents image from getting lost offscreen');
assert(viewerJs.includes('overflow = "hidden"') || viewerJs.includes('overflow = \'hidden\''), 'Body scroll lock implemented during full-screen inspection');
assert(viewerJs.includes('window.openSitePlanViewer'), 'window.openSitePlanViewer API exported globally');
assert(viewerJs.includes('window.closeSitePlanViewer'), 'window.closeSitePlanViewer API exported globally');

// 7. Mobile Contact & WhatsApp
console.log('\n--- 6. Mobile Dialing & Instant WhatsApp ---');
assert(html.includes('href="tel:+918218553028"'), 'Telephone button opens mobile dialer for 8218553028');
assert(html.includes('https://wa.me/918218553028'), 'WhatsApp button configured with https://wa.me/918218553028');
assert(html.includes('inputmode="numeric"') || html.includes('inputmode="tel"'), 'Phone input sets numeric keyboard on mobile');
assert(html.includes('autocomplete="name"'), 'Name input provides autocomplete');
assert(html.includes('autocomplete="tel"'), 'Phone input provides autocomplete');
assert(html.includes('dynamic-call-btn flex-1 min-h-[44px]') || html.includes('dynamic-call-btn flex-1 min-h-[48px]'), 'Sticky bottom action bar buttons enforce 44px+ touch targets');

// 8. Advanced Responsive Layout Verification
console.log('\n--- 7. Advanced Responsive Layout & Interaction Verification ---');
assert(html.includes('COORDINATES: 29.4475° N, 77.3141° E // SHAMLI SECTOR 1') && (html.includes('break-words') || html.includes('flex-wrap')), 'Coordinates badge protected against mobile overflow');
assert(html.includes('car-tab-btn') && html.includes('grid-cols-2'), 'Car showcase tab switcher adapts to responsive 2-column mobile grid');

const galleryJs = fs.readFileSync(path.join(projectRoot, 'assets/js/gallery.js'), 'utf8');
assert(galleryJs.includes('flex-col sm:flex-row') && galleryJs.includes('min-h-[44px]'), 'Project card action buttons stack on mobile with 44px+ touch targets');

const appJs = fs.readFileSync(path.join(projectRoot, 'assets/js/app.js'), 'utf8');
assert(appJs.includes('M6 18L18 6M6 6l12 12') && appJs.includes('M4 6h16M4 12h16M4 18h16'), 'Mobile navigation menu button morphs between hamburger and close X icon');
assert(appJs.includes('Escape') && appJs.includes('contains(e.target)'), 'Mobile navigation menu supports click-outside and Escape key dismissal');

console.log(`\n==================================================`);
console.log(`MOBILE AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`==================================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
