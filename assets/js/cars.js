/**
 * Futuristic 3D Parallax & Telemetry Cars Showcase Controller
 * Provides interactive 3D mouse tilt parallax on the hero cars and
 * high-tech HUD telemetry in the secondary showcase.
 */

(function () {
  let activeShowcaseCar = "creta";

  // 1. 3D Mouse Parallax Tilt for Hero Cars
  function initHeroParallax() {
    const heroSection = document.getElementById("hero");
    const carItems = document.querySelectorAll(".hero-car-item");

    if (!heroSection || !carItems.length) return;

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      carItems.forEach((car, index) => {
        const factor = index === 0 ? 1 : -1;
        const rotateY = x * 15 * factor;
        const rotateX = -y * 8;
        const translateX = x * 20 * factor;
        const translateY = y * 10;

        const imgWrapper = car.querySelector(".hero-car-img-wrapper");
        if (imgWrapper) {
          imgWrapper.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
        }
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      carItems.forEach((car) => {
        const imgWrapper = car.querySelector(".hero-car-img-wrapper");
        if (imgWrapper) {
          imgWrapper.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)";
        }
      });
    });
  }

  // 2. Secondary Showcase Switcher with Futuristic Telemetry
  function switchShowcaseCar(carKey) {
    activeShowcaseCar = carKey;
    const cars = window.SITE_CONFIG?.cars;
    if (!cars) return;

    if (window.playFuturisticChime) {
      window.playFuturisticChime(740, 0.18);
    }

    const carData = carKey === "creta" ? cars.car1 : cars.car2;

    // Toggle active tab buttons
    document.querySelectorAll(".car-tab-btn").forEach((btn) => {
      if (btn.getAttribute("data-car") === carKey) {
        btn.classList.add("bg-gradient-to-r", "from-gold-light", "to-gold-metallic", "text-navy-950", "shadow-xl", "shadow-gold-metallic/30", "border-gold-light");
        btn.classList.remove("bg-navy-900/80", "text-slate-300", "border-white/10");
      } else {
        btn.classList.remove("bg-gradient-to-r", "from-gold-light", "to-gold-metallic", "text-navy-950", "shadow-xl", "shadow-gold-metallic/30", "border-gold-light");
        btn.classList.add("bg-navy-900/80", "text-slate-300", "border-white/10");
      }
    });

    // Update showcase display
    const imgEl = document.getElementById("showcase-car-img");
    const badgeEl = document.getElementById("showcase-plot-badge");
    const titleEl = document.getElementById("showcase-car-title");
    const taglineEl = document.getElementById("showcase-car-tagline");
    const specsEl = document.getElementById("showcase-car-specs");

    if (imgEl) {
      imgEl.style.opacity = "0";
      imgEl.style.transform = "scale(0.92) translateY(15px)";
      setTimeout(() => {
        imgEl.src = carData.image;
        imgEl.alt = carData.modelName;
        imgEl.style.opacity = "1";
        imgEl.style.transform = "scale(1) translateY(0)";
      }, 220);
    }

    if (badgeEl) badgeEl.textContent = carData.plotBadge;
    if (titleEl) titleEl.textContent = carData.modelName;
    if (taglineEl) taglineEl.textContent = carData.tagline;

    if (specsEl) {
      specsEl.innerHTML = carData.specs
        .map(
          (s, i) => `
        <div class="relative group bg-navy-950/80 border border-gold-metallic/30 p-4 rounded-xl text-left backdrop-blur-md hover:border-gold-light transition-all overflow-hidden">
          <div class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-gold-metallic/20 to-transparent pointer-events-none"></div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] uppercase tracking-widest text-gold-metallic font-mono font-bold">TELEMETRY 0${i + 1}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-gold-light animate-ping"></span>
          </div>
          <span class="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">${s.label}</span>
          <span class="block text-sm sm:text-base font-extrabold text-white group-hover:text-gold-light transition-colors">${s.value}</span>
        </div>
      `
        )
        .join("");
    }
  }

  window.selectShowcaseCar = switchShowcaseCar;

  function initCars() {
    initHeroParallax();

    // Attach click events to tabs
    document.querySelectorAll(".car-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const car = btn.getAttribute("data-car");
        if (car) switchShowcaseCar(car);
      });
    });

    // Initialize default showcase
    switchShowcaseCar("creta");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCars);
  } else {
    initCars();
  }
})();
