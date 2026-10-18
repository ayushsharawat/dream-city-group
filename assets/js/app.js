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

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initConfigModal();
    initSmoothScroll();
  });
})();
