/**
 * DREAM RESIDENCY INTERACTIVE MOBILE SITE PLAN VIEWER
 * ----------------------------------------------------------------------------
 * Mobile-First blueprint inspector for Dream Residency (Shamli):
 * - Renders full 1179x2013 high-res blueprint without cropping or distortion
 * - Two-finger pinch-to-zoom (1.0x to 5.0x)
 * - Double-tap to zoom in (2.5x) / reset (1.0x)
 * - Single-finger panning when zoomed in
 * - Visible + / - / Reset buttons (min 44px touch targets)
 * - Body scroll lock to prevent background page scrolling
 * - Mouse wheel zoom & drag pan support for desktop browsers
 * ----------------------------------------------------------------------------
 */

(function () {
  let modal, viewport, stage, img, zoomBadge, loader, tipBanner;
  let currentZoom = 1.0;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  // Touch gesture states
  let initialPinchDist = null;
  let initialPinchZoom = 1.0;
  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;

  // Mouse states
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseStartY = 0;

  // Saved body scroll position
  let savedScrollY = 0;

  const MIN_ZOOM = 1.0;
  const MAX_ZOOM = 5.0;
  const ZOOM_STEP = 0.5;

  function initViewer() {
    modal = document.getElementById("siteplan-viewer-modal");
    viewport = document.getElementById("siteplan-viewport");
    stage = document.getElementById("siteplan-stage");
    img = document.getElementById("siteplan-full-img");
    zoomBadge = document.getElementById("siteplan-zoom-badge");
    loader = document.getElementById("siteplan-loader");
    tipBanner = document.getElementById("siteplan-tip-banner");

    if (!modal || !viewport || !stage || !img) return;

    // Image load handler
    if (img.complete) {
      if (loader) loader.style.display = "none";
    } else {
      img.addEventListener("load", () => {
        if (loader) loader.style.display = "none";
        fitImageToViewport();
      });
    }

    // Attach button listeners
    const btnZoomIn = document.getElementById("siteplan-btn-zoom-in");
    const btnZoomOut = document.getElementById("siteplan-btn-zoom-out");
    const btnReset = document.getElementById("siteplan-btn-reset");
    const btnClose = document.getElementById("siteplan-close-btn");

    btnZoomIn?.addEventListener("click", (e) => {
      e.stopPropagation();
      setZoom(currentZoom + ZOOM_STEP, true);
    });

    btnZoomOut?.addEventListener("click", (e) => {
      e.stopPropagation();
      setZoom(currentZoom - ZOOM_STEP, true);
    });

    btnReset?.addEventListener("click", (e) => {
      e.stopPropagation();
      resetView(true);
    });

    btnClose?.addEventListener("click", (e) => {
      e.stopPropagation();
      window.closeSitePlanViewer();
    });

    // Touch event listeners on viewport
    viewport.addEventListener("touchstart", onTouchStart, { passive: false });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd, { passive: false });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: false });

    // Desktop Mouse event listeners
    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    viewport.addEventListener("wheel", onWheel, { passive: false });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (!modal || modal.classList.contains("hidden")) return;
      if (e.key === "Escape") {
        window.closeSitePlanViewer();
      } else if (e.key === "+" || e.key === "=") {
        setZoom(currentZoom + ZOOM_STEP, true);
      } else if (e.key === "-") {
        setZoom(currentZoom - ZOOM_STEP, true);
      } else if (e.key === "0") {
        resetView(true);
      }
    });

    // Window resize handler
    window.addEventListener("resize", () => {
      if (modal && !modal.classList.contains("hidden")) {
        fitImageToViewport();
        applyTransform(false);
      }
    });
  }

  function fitImageToViewport() {
    if (!viewport || !img) return;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    if (vw === 0 || vh === 0) return;

    const natW = img.naturalWidth || 1179;
    const natH = img.naturalHeight || 2013;

    // Fit completely inside the viewport with comfortable margins
    const scaleX = (vw * 0.94) / natW;
    const scaleY = (vh * 0.94) / natH;
    const baseScale = Math.min(scaleX, scaleY);

    const fitW = Math.round(natW * baseScale);
    const fitH = Math.round(natH * baseScale);

    img.style.width = fitW + "px";
    img.style.height = fitH + "px";
  }

  function applyTransform(animated = false) {
    if (!stage) return;

    if (animated) {
      stage.style.transition = "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)";
    } else {
      stage.style.transition = "none";
    }

    clampPan();
    stage.style.transform = `translate3d(${panX}px, ${panY}px, 0px) scale(${currentZoom})`;

    if (zoomBadge) {
      zoomBadge.textContent = Math.round(currentZoom * 100) + "%";
    }

    // Update cursor
    if (viewport) {
      if (currentZoom > 1.0) {
        viewport.style.cursor = isDragging || isMouseDown ? "grabbing" : "grab";
      } else {
        viewport.style.cursor = "default";
      }
    }
  }

  function clampPan() {
    if (!viewport || !img) return;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;

    const imgW = parseFloat(img.style.width || "0") * currentZoom;
    const imgH = parseFloat(img.style.height || "0") * currentZoom;

    // Allow panning so user can inspect every corner and edge
    const maxPanX = Math.max(0, (imgW - vw) / 2 + 60);
    const maxPanY = Math.max(0, (imgH - vh) / 2 + 60);

    if (currentZoom <= 1.05) {
      panX = 0;
      panY = 0;
    } else {
      panX = Math.min(maxPanX, Math.max(-maxPanX, panX));
      panY = Math.min(maxPanY, Math.max(-maxPanY, panY));
    }
  }

  function setZoom(newZoom, animated = true) {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
    currentZoom = Math.round(clamped * 100) / 100;
    applyTransform(animated);
  }

  function resetView(animated = true) {
    currentZoom = 1.0;
    panX = 0;
    panY = 0;
    applyTransform(animated);
  }

  // --- TOUCH GESTURES ---

  function getTouchDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();
      const distFromLastTap = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);

      // Double tap detected
      if (now - lastTapTime < 320 && distFromLastTap < 40) {
        e.preventDefault();
        if (currentZoom < 1.8) {
          // Zoom in to 2.5x centered around tapped spot
          const rect = viewport.getBoundingClientRect();
          const offsetX = touch.clientX - (rect.left + rect.width / 2);
          const offsetY = touch.clientY - (rect.top + rect.height / 2);
          panX = -offsetX * 1.5;
          panY = -offsetY * 1.5;
          setZoom(2.5, true);
        } else {
          // Reset view
          resetView(true);
        }
        lastTapTime = 0;
        return;
      }

      lastTapTime = now;
      lastTapX = touch.clientX;
      lastTapY = touch.clientY;

      isDragging = true;
      dragStartX = touch.clientX - panX;
      dragStartY = touch.clientY - panY;
    } else if (e.touches.length === 2) {
      // Pinch started
      e.preventDefault();
      isDragging = false;
      initialPinchDist = getTouchDistance(e.touches[0], e.touches[1]);
      initialPinchZoom = currentZoom;
    }
  }

  function onTouchMove(e) {
    e.preventDefault(); // Prevent background page scroll & rubber-banding

    if (e.touches.length === 1 && isDragging) {
      if (currentZoom > 1.0) {
        panX = e.touches[0].clientX - dragStartX;
        panY = e.touches[0].clientY - dragStartY;
        applyTransform(false);
      }
    } else if (e.touches.length === 2 && initialPinchDist) {
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      if (currentDist > 0 && initialPinchDist > 0) {
        const factor = currentDist / initialPinchDist;
        const targetZoom = initialPinchZoom * factor;
        setZoom(targetZoom, false);
      }
    }
  }

  function onTouchEnd(e) {
    if (e.touches.length === 0) {
      isDragging = false;
      initialPinchDist = null;
      applyTransform(true);
    } else if (e.touches.length === 1) {
      initialPinchDist = null;
      isDragging = true;
      dragStartX = e.touches[0].clientX - panX;
      dragStartY = e.touches[0].clientY - panY;
    }
  }

  // --- MOUSE GESTURES (DESKTOP) ---

  function onMouseDown(e) {
    if (e.button !== 0) return; // Left click only
    isMouseDown = true;
    mouseStartX = e.clientX - panX;
    mouseStartY = e.clientY - panY;
    if (viewport) viewport.style.cursor = "grabbing";
  }

  function onMouseMove(e) {
    if (!isMouseDown) return;
    if (currentZoom > 1.0) {
      panX = e.clientX - mouseStartX;
      panY = e.clientY - mouseStartY;
      applyTransform(false);
    }
  }

  function onMouseUp() {
    if (isMouseDown) {
      isMouseDown = false;
      applyTransform(true);
      if (viewport) viewport.style.cursor = currentZoom > 1.0 ? "grab" : "default";
    }
  }

  function onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.35 : -0.35;
    setZoom(currentZoom + delta, true);
  }

  // --- PUBLIC API ---

  window.openSitePlanViewer = function () {
    if (!modal) initViewer();
    if (!modal) return;

    // Save scroll position & lock body scroll
    savedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = "100%";

    modal.classList.remove("hidden");
    modal.style.display = "flex";

    // Play chime if available
    if (window.playFuturisticChime) {
      window.playFuturisticChime(940, 0.12);
    }

    // Fit image on open
    setTimeout(() => {
      fitImageToViewport();
      resetView(false);
    }, 50);
  };

  window.closeSitePlanViewer = function () {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.style.display = "none";

    // Unlock body scroll & restore position
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, savedScrollY);
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initViewer);
  } else {
    initViewer();
  }
})();
