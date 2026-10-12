/**
 * Contact & Inquiry Form Controller
 * Manages Call Now, WhatsApp direct link generation, and validated inquiry handling.
 * Integrates directly with WhatsApp API for immediate connection without fake backend claims.
 */

(function () {
  function initContactLinks() {
    const config = window.SITE_CONFIG?.contact;
    if (!config) return;

    // Update all dynamic call buttons
    document.querySelectorAll(".dynamic-call-btn").forEach((btn) => {
      btn.setAttribute("href", `tel:${config.primaryPhoneClean}`);
      const textSpan = btn.querySelector(".phone-display-text");
      if (textSpan) textSpan.textContent = config.primaryPhoneDisplay || config.primaryPhone;
    });

    // Update all dynamic WhatsApp buttons
    document.querySelectorAll(".dynamic-wa-btn").forEach((btn) => {
      const encodedMsg = encodeURIComponent(config.whatsappDefaultMessage);
      btn.setAttribute("href", `https://wa.me/${config.whatsappNumber}?text=${encodedMsg}`);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    });
  }

  function handleInquirySubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("inquiry-name");
    const phoneInput = document.getElementById("inquiry-phone");
    const projectInput = document.getElementById("inquiry-project");
    const messageInput = document.getElementById("inquiry-message");
    const errorBox = document.getElementById("form-error-msg");

    if (errorBox) {
      errorBox.classList.add("hidden");
      errorBox.textContent = "";
    }

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const project = projectInput ? projectInput.value : "Dream Residency";
    const message = messageInput ? messageInput.value.trim() : "";

    // Validation
    if (!name || name.length < 2) {
      showError("Please enter your full name.");
      nameInput.focus();
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      showError("Please provide a valid 10-digit mobile contact number.");
      phoneInput.focus();
      return;
    }

    // Build authentic WhatsApp redirect message
    const waNumber = window.SITE_CONFIG?.contact?.whatsappNumber || "918218553028";
    const formattedMsg = `*INQUIRY: DREAM CITY GROUP, SHAMLI*%0A` +
      `*Project:* ${encodeURIComponent(project)}%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Note:* ${encodeURIComponent(message || "Interested in plot availability & Grand Opening event.")}`;

    const waUrl = `https://wa.me/${waNumber}?text=${formattedMsg}`;

    // Show confirmation modal with direct 1-click WhatsApp and Call actions
    showConfirmationModal(name, phone, project, message, waUrl);
  }

  function showError(msg) {
    const errorBox = document.getElementById("form-error-msg");
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.classList.remove("hidden");
    } else {
      alert(msg);
    }
  }

  function showConfirmationModal(name, phone, project, message, waUrl) {
    const modal = document.getElementById("inquiry-success-modal");
    if (!modal) {
      window.open(waUrl, "_blank");
      return;
    }

    const nameSpan = document.getElementById("success-lead-name");
    const projSpan = document.getElementById("success-lead-project");
    const waLink = document.getElementById("success-wa-link");

    if (nameSpan) nameSpan.textContent = name;
    if (projSpan) projSpan.textContent = project;
    if (waLink) waLink.setAttribute("href", waUrl);

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Reset form
    const form = document.getElementById("inquiry-form");
    if (form) form.reset();
  }

  window.closeSuccessModal = function () {
    const modal = document.getElementById("inquiry-success-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  function initForm() {
    initContactLinks();
    const form = document.getElementById("inquiry-form");
    if (form) {
      form.addEventListener("submit", handleInquirySubmit);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForm);
  } else {
    initForm();
  }
})();
