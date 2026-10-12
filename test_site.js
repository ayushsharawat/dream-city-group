const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== DREAM RESIDENCY / DREAM CITY GROUP WEBSITE AUDIT ===\n');

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

// 1. Check all required asset files
const requiredFiles = [
  'index.html',
  'server.js',
  'assets/css/style.css',
  'assets/js/config.js',
  'assets/js/audio.js',
  'assets/js/countdown.js',
  'assets/js/confetti.js',
  'assets/js/cars.js',
  'assets/js/gallery.js',
  'assets/js/siteplan-viewer.js',
  'assets/js/contact.js',
  'assets/js/app.js',
  'assets/images/dream_residency_gate.jpg',
  'assets/images/dream_residency_plots.jpg',
  'assets/images/blueprint_dreamcityResidency.png',
  'assets/images/car_giveaway_stage.jpg',
  'assets/images/hyundai_creta.png',
  'assets/images/mahindra_xuv700.png',
  'assets/images/mahindra_xuv_7xo.png',
  'assets/images/logo_crest.png',
];

console.log('--- 1. File Existence & Integrity ---');
requiredFiles.forEach(file => {
  const fullPath = path.join(projectRoot, file);
  const exists = fs.existsSync(fullPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(fullPath).size;
  }
  assert(exists && size > 0, `File exists & not empty: ${file} (${size} bytes)`);
});

// 2. Validate index.html content requirements
console.log('\n--- 2. HTML Requirements Inspection ---');
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');

assert(html.includes('DREAM CITY GROUP, SHAMLI'), 'Includes company branding: DREAM CITY GROUP, SHAMLI');
assert(html.includes('DREAM RESIDENCY'), 'Includes featured project: DREAM RESIDENCY');
assert(html.includes('25 OCTOBER 2026'), 'Includes date: 25 OCTOBER 2026');
assert(html.includes('GRAND OPENING'), 'Includes GRAND OPENING title');
assert(html.includes('8218553028'), 'Includes official phone number: 8218553028');
assert(html.includes('assets/images/logo_crest.png'), 'References official company logo: logo_crest.png');
assert(html.includes('PLOT NO. 121 — HYUNDAI CRETA'), 'Includes PLOT NO. 121 — HYUNDAI CRETA badge');
assert(html.includes('PLOT NO. 201 — MAHINDRA XUV 7XO'), 'Includes PLOT NO. 201 — MAHINDRA XUV 7XO badge');
assert(html.includes('TWO LUCKY WINNERS. TWO DREAM CARS.'), 'Includes second car showcase headline');
assert(html.includes('THE COUNTDOWN TO YOUR DREAM BEGINS'), 'Includes countdown headline');
assert(html.includes('KNOW MORE'), 'Includes KNOW MORE button');
assert(html.includes('VIEW ON GOOGLE MAPS'), 'Includes VIEW ON GOOGLE MAPS button');
assert(html.includes('VIEW FULL SITE PLAN'), 'Includes VIEW FULL SITE PLAN button');
assert(html.includes('siteplan-viewer-modal'), 'Includes dedicated full-screen site plan viewer modal');
assert(html.includes('siteplan-btn-zoom-in') && html.includes('siteplan-btn-zoom-out') && html.includes('siteplan-btn-reset'), 'Includes on-screen zoom +, -, and reset controls');
assert(html.includes('assets/images/blueprint_dreamcityResidency.png'), 'References high-resolution blueprint in site plan viewer');
assert(html.includes('assets/images/hyundai_creta.png'), 'References transparent Hyundai Creta PNG');
assert(html.includes('assets/images/mahindra_xuv_7xo.png') || html.includes('assets/images/mahindra_xuv700.png'), 'References transparent Mahindra XUV 7XO PNG');

// Check 10 amenities
const requiredAmenities = [
  'Residential Plots',
  'Wide Roads',
  'Lush Parks',
  '24x7 Security',
  'CCTV Network',
  'Grand Mandir',
  'Street Lights',
  'Sweet Water',
  'Sewer Network',
  'Open Gym'
];
requiredAmenities.forEach(am => {
  assert(html.includes(am), `Amenity present in HTML: ${am}`);
});

// 3. Test config.js execution and data structures
console.log('\n--- 3. Centralized Configuration Evaluation ---');
const configCode = fs.readFileSync(path.join(projectRoot, 'assets/js/config.js'), 'utf8');
const context = { window: {}, console: console };
vm.createContext(context);
vm.runInContext(configCode, context);

const config = context.window.SITE_CONFIG;
assert(!!config, 'SITE_CONFIG is defined on window');
assert(config.company.name === 'DREAM CITY GROUP, SHAMLI', 'Company name matches config');
assert(config.grandOpening.targetDateTime.includes('2026-10-25'), 'Target date set to 25 October 2026');
assert(config.grandOpening.targetDateTime.includes('+05:30'), 'Timezone offset is +05:30 (Asia/Kolkata IST)');

// 4. Test Countdown Calculation
console.log('\n--- 4. Countdown Timer Logic Test ---');
const targetDateMs = new Date(config.grandOpening.targetDateTime).getTime();
const simulatedNow = new Date('2026-10-12T23:40:49+05:30').getTime();
const diffMs = targetDateMs - simulatedNow;

assert(diffMs > 0, `Remaining time is positive: ${diffMs} ms`);
const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
const seconds = Math.floor((diffMs / 1000) % 60);
console.log(`[INFO] Countdown at simulated user time: ${days} days, ${hours} hours, ${minutes} mins, ${seconds} secs`);
assert(days >= 12, `Calculated days to launch: ${days} days remaining`);

// 5. Test Other Projects Structure
console.log('\n--- 5. Projects Portfolio Integrity ---');
assert(Array.isArray(config.otherProjects), 'otherProjects is an array');
assert(config.otherProjects.length >= 6, `Supports 6-7 projects (found ${config.otherProjects.length})`);
config.otherProjects.forEach((proj, i) => {
  const valid = proj.name && proj.location && proj.googleMapsUrl && Array.isArray(proj.amenities) && proj.status;
  assert(valid, `Project ${i + 1} (${proj.name}) has valid schema`);
});

// 6. Test Contact Information
console.log('\n--- 6. Contact & Direct WhatsApp Configuration ---');
assert(!!config.contact.primaryPhone, `Primary phone configured: ${config.contact.primaryPhone}`);
assert(!!config.contact.whatsappNumber, `WhatsApp number configured: ${config.contact.whatsappNumber}`);
assert(!!config.contact.officeAddress, `Office address configured: ${config.contact.officeAddress}`);

console.log(`\n========================================`);
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
