/**
 * Master Application Controller
 * Handles navigation, mobile menu, scroll behaviors, and runtime config helpers.
 */

(function () {
  function initNav() {
    const navbar = document.getElementById("main-nav");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    // Scroll listener for glassmorphism navbar
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("nav-scrolled", "bg-navy-950/95", "backdrop-blur-md", "shadow-2xl", "border-b", "border-gold-metallic/30");
        navbar?.classList.remove("bg-transparent", "border-transparent");
      } else {
        navbar?.classList.remove("nav-scrolled", "bg-navy-950/95", "backdrop-blur-md", "shadow-2xl", "border-b", "border-gold-metallic/30");
        navbar?.classList.add("bg-transparent", "border-transparent");
      }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      const hamburgerPath = "M4 6h16M4 12h16M4 18h16";
      const closePath = "M6 18L18 6M6 6l12 12";

      function updateMenuIcon(isOpen) {
        const svgPath = mobileMenuBtn.querySelector("svg path");
        if (svgPath) {
          svgPath.setAttribute("d", isOpen ? closePath : hamburgerPath);
        }
      }

      function openMenu() {
        mobileMenu.classList.remove("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
        updateMenuIcon(true);
      }

      function closeMenu() {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        updateMenuIcon(false);
      }

      window.closeMobileMenu = closeMenu;

      mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isClosed = mobileMenu.classList.contains("hidden");
        if (isClosed) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          closeMenu();
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileMenu.classList.contains("hidden")) {
          if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
          }
        }
      });

      // Close menu on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
          closeMenu();
        }
      });
    }
  }

  function initConfigModal() {
    // Allows testing/adjusting launch date/time live
    window.openDateAdjuster = function () {
      const modal = document.getElementById("date-adjuster-modal");
      if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      }
    };

    window.closeDateAdjuster = function () {
      const modal = document.getElementById("date-adjuster-modal");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    };

    window.saveNewLaunchTime = function () {
      const input = document.getElementById("custom-launch-input");
      if (input && input.value) {
        const isoWithOffset = input.value + ":00+05:30";
        if (window.restartCountdown) {
          window.restartCountdown(isoWithOffset);
        }
        window.closeDateAdjuster();
        alert("Launch time updated to: " + input.value + " (Asia/Kolkata). Countdown refreshed!");
      }
    };

    // Masterplan Blueprint HUD Switcher
    window.toggleMasterplanMode = function (mode) {
      const img = document.getElementById("masterplan-display-img");
      const btnArch = document.getElementById("view-mode-arch");
      const btnBlue = document.getElementById("view-mode-blue");

      if (window.playFuturisticChime) {
        window.playFuturisticChime(920, 0.15);
      }

      if (mode === "blue") {
        if (img) {
          img.src = "/assets/images/blueprint_dreamcityResidency.png";
          img.style.filter = "contrast(1.05) brightness(1.02)";
          img.style.objectFit = "contain";
          img.style.backgroundColor = "#020713";
        }
        btnBlue?.classList.add("bg-gold-metallic", "text-navy-950", "shadow-md");
        btnBlue?.classList.remove("bg-navy-900", "text-gold-champagne");
        btnArch?.classList.remove("bg-gold-metallic", "text-navy-950", "shadow-md");
        btnArch?.classList.add("bg-navy-900", "text-gold-champagne");
      } else {
        if (img) {
          img.src = "/assets/images/dream_residency_plots.jpg";
          img.style.filter = "brightness(0.95)";
          img.style.objectFit = "cover";
          img.style.backgroundColor = "transparent";
        }
        btnArch?.classList.add("bg-gold-metallic", "text-navy-950", "shadow-md");
        btnArch?.classList.remove("bg-navy-900", "text-gold-champagne");
        btnBlue?.classList.remove("bg-gold-metallic", "text-navy-950", "shadow-md");
        btnBlue?.classList.add("bg-navy-900", "text-gold-champagne");
      }
    };
  }

  // Smooth scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  // Interactive Plot & Allotment Calculator
  function initPlotCalculator() {
    const sizeBtns = document.querySelectorAll(".plot-size-btn");
    const displayArea = document.getElementById("calc-display-area");
    const displayToken = document.getElementById("calc-display-token");
    const displayEmi = document.getElementById("calc-display-emi");
    const whatsappBtn = document.getElementById("calc-whatsapp-btn");

    if (!sizeBtns.length) return;

    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sizeBtns.forEach((b) => {
          b.classList.remove("active", "border-gold-metallic/40", "text-white");
          b.classList.add("border-white/20", "text-slate-300");
        });
        btn.classList.add("active", "border-gold-metallic/40");
        btn.classList.remove("border-white/20", "text-slate-300");

        const size = btn.getAttribute("data-size") || "100";
        const sqft = btn.getAttribute("data-sqft") || "900";
        const token = btn.getAttribute("data-token") || "51,000";
        const emi = btn.getAttribute("data-emi") || "18,500";

        if (displayArea) displayArea.textContent = `${size} Sq. Yds (${sqft} Sq. Ft)`;
        if (displayToken) displayToken.textContent = `₹${token}`;
        if (displayEmi) displayEmi.textContent = `₹${emi} / mo*`;

        if (whatsappBtn) {
          const text = encodeURIComponent(
            `Hello Dream City Group, I am interested in a ${size} Sq Yds (${sqft} Sq. Ft) plot in Dream Residency Shamli. Please share allotment details and booking procedure.`
          );
          whatsappBtn.href = `https://wa.me/918218553028?text=${text}`;
        }

        if (window.playFuturisticChime) {
          window.playFuturisticChime(660, 0.12);
        }
      });
    });
  }

  // Back to Top Button Controller
  function initBackToTop() {
    const btn = document.getElementById("back-to-top-btn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }, { passive: true });
  }

  // Active Navigation Scroll Spy
  function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a.nav-link");

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // FAQ Accordion Interaction
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open && window.playFuturisticChime) {
          window.playFuturisticChime(720, 0.1);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initConfigModal();
    initSmoothScroll();
    initPlotCalculator();
    initBackToTop();
    initScrollSpy();
    initFaqAccordion();
  });
})();
