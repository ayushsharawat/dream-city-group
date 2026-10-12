# DREAM CITY GROUP, SHAMLI — DREAM RESIDENCY GRAND OPENING WEBSITE

A luxury, cinematic, fully responsive grand-opening real estate website created for **DREAM CITY GROUP, SHAMLI** celebrating the official launch of **DREAM RESIDENCY** on **25 October 2026**.

---

## 🌟 Highlights & Features

1. **Spectacular Futuristic Launch Hero Section**
   - Clean solid midnight black and deep navy architecture with zero background photos.
   - Pure CSS volumetric lighting, fine gold perimeter lines, and futuristic scanlines.
   - Massive 3D metallic gold and bold black **GRAND OPENING — 25 OCTOBER 2026** typography.
   - Prominent developer branding: **DREAM CITY GROUP, SHAMLI**.

2. **Dominant Side-By-Side Cars Presentation on Luxury Showroom Stage**
   - Two large realistic luxury SUVs positioned directly side by side on an illuminated CSS platform:
     * **PLOT NO. 121 — HYUNDAI CRETA** (Pearl White, genuinely transparent PNG with zero white patch)
     * **PLOT NO. 201 — MAHINDRA XUV 7XO** (Midnight Navy Blue, genuinely transparent PNG)
   - Interactive 3D mouse parallax tilt effect, dual ground contact shadows, subtle gold uplight, and HUD telemetry plot labels.
   - *Easily replaceable:* Simply drop your official PNGs into `assets/images/hyundai_creta.png` and `assets/images/mahindra_xuv_7xo.png`!

3. **Secondary Showcase: "TWO LUCKY WINNERS. TWO DREAM CARS."**
   - Cinematic stage lighting with real-time golden confetti particle canvas.
   - Interactive car switcher with vehicle highlights, panoramic sunroof / twin HD display specs, and plot contest details.

4. **Open-Layout Infinite Vertical Rolling Countdown (Asia/Kolkata IST)**
   - Open, borderless horizontal single-line countdown: `[DAYS] : [HOURS] : [MINUTES] : [SECONDS]`.
   - Box-free and card-free architecture with light champagne, ivory, and white background, deep navy typography, and metallic gold numbers.
   - Individual mechanical vertical rolling transitions: seconds roll every second; minutes, hours, and days roll only when changed.
   - Seamless 12-digit buffer reel handles `09 ↔ 10` and `00 ↔ 59` transitions without rewind stutter.
   - Asia/Kolkata timezone target (**25 October 2026** `UTC+05:30`) with zero-negative protection and live **Launch Time Adjuster** modal.

3. **Compact Modern Navbar**
   - Single-line brand identity: Official logo + `DREAM CITY GROUP, SHAMLI`.
   - Clean, uncluttered navigation: Home, Grand Opening, Cars, Dream Residency, Our Projects, Location, Contact.
   - Distinctive "Enquire Now" CTA button on the right with working mobile collapse drawer.

5. **10 Gold-Themed Township Amenities**
   - Residential Plots
   - 30ft & 40ft Wide Roads
   - Lush Green Parks
   - 24x7 Security & Guarded Gate
   - CCTV Network
   - Grand Mandir (Temple)
   - LED Street Lights
   - 24x7 Sweet Water Supply
   - Underground Sewerage
   - Modern Open Gym

6. **Project Dossier & Interactive Blueprint HUD**
   - Interactive Mode Switcher toggling between 3D Aerial township perspective and the authentic masterplan blueprint (`blueprint_dreamcityResidency.png`).
   - Verified developer overview, features, plot sizes, and direct inquiry link.

7. **Our Projects Portfolio (6 Configurable Landmark Developments)**
   - Reusable editorial cards featuring **Dream Residency** (Flagship Grand Opening) followed by:
     1. `DREAM CITY COLONY, SHAMLI`
     2. `DREAM CITY PHASE II, SHAMLI`
     3. `ALPHA CITY, SHAMLI`
     4. `DREAM CITY, BARAUT`
     5. `DREAM CITY, MEERUT`
   - Centralized data in `assets/js/config.js` with individual location tags, amenities, and Google Maps links.

8. **Location & Connectivity**
   - Interactive Google Maps embed of Shamli, Uttar Pradesh.
   - Landmark proximity highlights (Delhi-Saharanpur Expressway, Shamli Railway Station, Bus Stand, City Market).
   - Direct "VIEW ON GOOGLE MAPS" button.

9. **Contact & Immediate WhatsApp Integration**
   - Primary Phone Desk: **8218553028** (`+91 82185 53028`).
   - Direct WhatsApp: **918218553028**.
   - Validated inquiry form with direct 1-click WhatsApp message routing.

10. **Sticky Mobile Quick-Action Bar**
    - Instant access to Call and WhatsApp fixed to the bottom of mobile screens.

---

## 🛠️ Project Structure

```
dream-city-group/
├── index.html                  # Main website entry point
├── README.md                   # Documentation & customization guide
├── test_site.js                # Automated verification & test suite (59 passing tests)
└── assets/
    ├── css/
    │   └── style.css           # Luxury gold foil, light champagne hero, & navy glassmorphism
    ├── js/
    │   ├── config.js           # Central configuration (Dates, Cars, Projects, Phones)
    │   ├── countdown.js        # Asia/Kolkata IST rolling odometer countdown
    │   ├── confetti.js         # Canvas gold confetti & lighting particle system
    │   ├── cars.js             # Hero & secondary car stage interaction
    │   ├── gallery.js          # Project cards renderer & dossier modals
    │   ├── contact.js          # Form validation & direct WhatsApp generator
    │   └── app.js              # Navbar scroll, smooth anchors, and UI controls
    └── images/
        ├── logo_crest.png      # Official company logo (500x500 RGBA)
        ├── blueprint_dreamcityResidency.png # Authentic Dream Residency plotted layout blueprint
        ├── dream_residency_gate.jpg   # Entrance gate photograph
        ├── dream_residency_plots.jpg  # Township aerial perspective
        ├── car_giveaway_stage.jpg     # Giveaway stage backdrop
        ├── hyundai_creta.png   # Transparent Hyundai Creta (Plot 121)
        ├── mahindra_xuv_7xo.png # Transparent Mahindra XUV 7XO (Plot 201)
        ├── logo/               # Standardized logo folder
        ├── vehicles/           # Standardized vehicle PNGs folder
        └── projects/           # Standardized project covers folder
```

---

## ⚙️ How to Customize

All website details are centrally managed in `assets/js/config.js`:

### 1. Replacing Logo or Vehicle PNGs
- Official logo: Drop your PNG at `assets/images/logo_crest.png` or `assets/images/logo/dream-city-group.png`
- Hyundai Creta: Drop at `assets/images/hyundai_creta.png` (or `assets/images/vehicles/hyundai-creta.png`)
- Mahindra XUV 7XO: Drop at `assets/images/mahindra_xuv_7xo.png` (or `assets/images/vehicles/mahindra-xuv-7xo.png`)

### 2. Updating Contact Phone / WhatsApp
In `assets/js/config.js`:
```javascript
contact: {
  primaryPhone: "8218553028",
  primaryPhoneDisplay: "+91 82185 53028",
  primaryPhoneClean: "+918218553028",
  whatsappNumber: "918218553028",
  ...
}
```
}
```

### 3. Adjusting Launch Date or Exact Time
In `assets/js/config.js`:
```javascript
grandOpening: {
  targetDateTime: "2026-10-25T10:00:00+05:30", // Change 10:00:00 to any time
}
```

### 4. Updating Other Projects
In `assets/js/config.js`, update or add entries to `otherProjects: [...]`.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using Python or Node.js:

```bash
cd "/Users/ayushsharawat/Desktop/PROJECTS/dream-city-group"
python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🧪 Running the Test Suite

```bash
cd "/Users/ayushsharawat/Desktop/PROJECTS/dream-city-group"
node test_site.js
```
All 55 automated checks will verify file integrity, IST countdown calculations, and required sections.
