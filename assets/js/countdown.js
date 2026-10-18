/**
 * Infinite Vertical Rolling Odometer Countdown Engine
 * -----------------------------------------------------------
 * Features:
 * - Open, borderless horizontal continuous layout
 * - Pure mechanical drum counter physics with 12-digit infinite-roll reel
 * - Individual digit rolling only when respective values change
 * - Butter-smooth cubic-bezier physics with seamless 0 <-> 9 rollovers
 * - Dynamic 2/3-digit Days support
 * - Real countdown targeting 25 October 2026 (Asia/Kolkata IST UTC+05:30)
 * - Zero-negative protection and live runtime reconfiguration support
 */

(function () {
  const wheelState = {};
  let countdownInterval = null;

  function getTargetTime() {
    const configTarget = window.SITE_CONFIG?.grandOpening?.targetDateTime || "2026-10-25T10:00:00+05:30";
    return new Date(configTarget).getTime();
  }

  function getDigitHeight() {
    const sample = document.querySelector(".odometer-digit-item");
    if (sample && sample.offsetHeight > 0) {
      return sample.offsetHeight;
    }
    if (window.innerWidth < 380) return 38;
    if (window.innerWidth < 480) return 44;
    if (window.innerWidth < 768) return 54;
    if (window.innerWidth < 1024) return 64;
    return 72;
  }

  /**
   * Rolls an individual digit wheel to targetDigit (0-9)
   * Buffer reel: [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   * Indices:      0  1  2  3  4  5  6  7  8  9 10 11
   */
  function rollDigit(wheelElement, targetDigit, immediate = false) {
    if (!wheelElement) return;
    const wheelId = wheelElement.id;
    const ribbon = wheelElement.querySelector(".odometer-ribbon");
    if (!ribbon) return;

    const digitH = getDigitHeight();
    targetDigit = Math.max(0, Math.min(9, targetDigit));

    if (!wheelState[wheelId]) {
      wheelState[wheelId] = {
        currentIdx: targetDigit === 0 ? 1 : targetDigit + 1,
        targetDigit: targetDigit,
        resetTimer: null
      };
      immediate = true;
    }

    const state = wheelState[wheelId];

    if (immediate) {
      if (state.resetTimer) clearTimeout(state.resetTimer);
      const initIdx = targetDigit === 0 ? 1 : targetDigit + 1;
      state.currentIdx = initIdx;
      state.targetDigit = targetDigit;
      ribbon.style.transition = "none";
      ribbon.style.transform = `translate3d(0, -${initIdx * digitH}px, 0)`;
      void ribbon.offsetHeight;
      return;
    }

    // If digit has not changed, do nothing
    if (state.targetDigit === targetDigit) {
      return;
    }

    if (state.resetTimer) {
      clearTimeout(state.resetTimer);
      state.resetTimer = null;
    }

    const prevDigit = state.targetDigit;
    let nextIdx;

    // Smooth continuous rolling in natural countdown direction (downward):
    if (prevDigit === 0 && targetDigit === 9) {
      // 0 -> 9: roll down to top buffer 9 at index 0
      nextIdx = 0;
    } else if (prevDigit === 9 && targetDigit === 0) {
      // 9 -> 0: roll down to bottom buffer 0 at index 11
      nextIdx = 11;
    } else {
      nextIdx = targetDigit === 0 ? 1 : targetDigit + 1;
    }

    // Apply smooth rolling transition
    ribbon.style.transition = "transform 0.52s cubic-bezier(0.2, 0.9, 0.3, 1)";
    ribbon.style.transform = `translate3d(0, -${nextIdx * digitH}px, 0)`;

    state.currentIdx = nextIdx;
    state.targetDigit = targetDigit;

    // Silent seamless wrap-around when rolling to edge buffers
    if (nextIdx === 0) {
      state.resetTimer = setTimeout(() => {
        ribbon.style.transition = "none";
        ribbon.style.transform = `translate3d(0, -${10 * digitH}px, 0)`;
        void ribbon.offsetHeight;
        state.currentIdx = 10;
        state.resetTimer = null;
      }, 530);
    } else if (nextIdx === 11) {
      state.resetTimer = setTimeout(() => {
        ribbon.style.transition = "none";
        ribbon.style.transform = `translate3d(0, -${1 * digitH}px, 0)`;
        void ribbon.offsetHeight;
        state.currentIdx = 1;
        state.resetTimer = null;
      }, 530);
    }
  }

  function tick(immediate = false) {
    const target = getTargetTime();
    const now = Date.now();
    let diff = target - now;

    // Never show negative values
    if (diff < 0) {
      diff = 0;
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // 1. DAYS MODULE (Supports 2 or 3 digits)
    const padToThree = window.SITE_CONFIG?.grandOpening?.padDaysToThree || days >= 100;
    const daysWheel0 = document.getElementById("days-wheel-0");
    const daysWheel1 = document.getElementById("days-wheel-1");
    const daysWheel2 = document.getElementById("days-wheel-2");

    if (padToThree) {
      if (daysWheel0) daysWheel0.style.display = "block";
      const dHundreds = Math.floor(days / 100) % 10;
      const dTens = Math.floor(days / 10) % 10;
      const dUnits = days % 10;
      rollDigit(daysWheel0, dHundreds, immediate);
      rollDigit(daysWheel1, dTens, immediate);
      rollDigit(daysWheel2, dUnits, immediate);
    } else {
      if (daysWheel0) daysWheel0.style.display = "none";
      const dTens = Math.floor(days / 10) % 10;
      const dUnits = days % 10;
      rollDigit(daysWheel1, dTens, immediate);
      rollDigit(daysWheel2, dUnits, immediate);
    }

    // 2. HOURS MODULE
    rollDigit(document.getElementById("hours-wheel-0"), Math.floor(hours / 10), immediate);
    rollDigit(document.getElementById("hours-wheel-1"), hours % 10, immediate);

    // 3. MINUTES MODULE
    rollDigit(document.getElementById("minutes-wheel-0"), Math.floor(minutes / 10), immediate);
    rollDigit(document.getElementById("minutes-wheel-1"), minutes % 10, immediate);

    // 4. SECONDS MODULE
    rollDigit(document.getElementById("seconds-wheel-0"), Math.floor(seconds / 10), immediate);
    rollDigit(document.getElementById("seconds-wheel-1"), seconds % 10, immediate);

    // Screen-reader and accessible spans
    const pad = (n) => (n < 10 ? "0" + n : n.toString());
    const cdDays = document.getElementById("cd-days");
    if (cdDays) cdDays.textContent = pad(days);
    const cdHours = document.getElementById("cd-hours");
    if (cdHours) cdHours.textContent = pad(hours);
    const cdMins = document.getElementById("cd-minutes");
    if (cdMins) cdMins.textContent = pad(minutes);
    const cdSecs = document.getElementById("cd-seconds");
    if (cdSecs) cdSecs.textContent = pad(seconds);

    // Secondary mobile/hero indicators if present
    const simpleDays = document.getElementById("hero-cd-days");
    if (simpleDays) simpleDays.textContent = pad(days);
    const simpleHours = document.getElementById("hero-cd-hours");
    if (simpleHours) simpleHours.textContent = pad(hours);
    const simpleMins = document.getElementById("hero-cd-minutes");
    if (simpleMins) simpleMins.textContent = pad(minutes);
    const simpleSecs = document.getElementById("hero-cd-seconds");
    if (simpleSecs) simpleSecs.textContent = pad(seconds);

    // Status Headline
    const statusEl = document.getElementById("countdown-status");
    if (statusEl) {
      if (diff === 0) {
        statusEl.innerHTML = `<span class="text-gold-bronze font-bold">✨ THE GRAND OPENING IS NOW LIVE! WELCOME TO DREAM RESIDENCY ✨</span>`;
      } else {
        const headline = window.SITE_CONFIG?.grandOpening?.countdownHeadline || "THE COUNTDOWN TO YOUR DREAM BEGINS";
        statusEl.textContent = headline;
      }
    }
  }

  function handleResize() {
    const digitH = getDigitHeight();
    Object.keys(wheelState).forEach((wheelId) => {
      const el = document.getElementById(wheelId);
      if (!el) return;
      const ribbon = el.querySelector(".odometer-ribbon");
      if (!ribbon) return;
      const idx = wheelState[wheelId].currentIdx;
      ribbon.style.transition = "none";
      ribbon.style.transform = `translate3d(0, -${idx * digitH}px, 0)`;
      void ribbon.offsetHeight;
    });
  }

  function initCountdown() {
    tick(true); // First run immediate alignment
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => tick(false), 1000);
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResize);
    }
  }

  window.restartCountdown = function (newIsoString) {
    if (window.SITE_CONFIG && window.SITE_CONFIG.grandOpening) {
      window.SITE_CONFIG.grandOpening.targetDateTime = newIsoString;
    }
    // Clear wheel states for clean immediate restart
    Object.keys(wheelState).forEach((k) => delete wheelState[k]);
    initCountdown();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountdown);
  } else {
    initCountdown();
  }
})();
