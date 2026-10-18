/**
 * Gallery & Project Component Controller
 * -------------------------------------------------------------
 * Renders Dream Residency (Featured Project) + 5 Existing Developments:
 * 1. DREAM CITY COLONY, SHAMLI
 * 2. DREAM CITY PHASE II, SHAMLI
 * 3. ALPHA CITY, SHAMLI
 * 4. DREAM CITY, BARAUT
 * 5. DREAM CITY, MEERUT
 */

(function () {
  let activeFilter = "all";

  function renderProjects() {
    const container = document.getElementById("projects-grid");
    if (!container) return;

    let projects = window.SITE_CONFIG?.otherProjects || [];
    if (!projects.length) return;

    if (activeFilter === "flagship") {
      projects = projects.filter((p) => p.isFeatured || p.id === "dream-residency");
    } else if (activeFilter === "delivered") {
      projects = projects.filter((p) => !p.isFeatured && p.id !== "dream-residency");
    }

    container.innerHTML = projects
      .map((proj, index) => {
        const isFeatured = proj.isFeatured || index === 0;
        const fallbackImg = proj.fallbackImage || "/assets/images/dream_residency_plots.jpg";
        const gridColClass = isFeatured ? "md:col-span-2 lg:col-span-3" : "col-span-1";

        return `
        <div class="project-editorial-card group relative ${gridColClass} bg-white rounded-2xl overflow-hidden border border-gold-metallic/30 hover:border-gold-light shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col ${isFeatured ? 'lg:flex-row' : ''}" data-project-id="${proj.id}">
          
          <!-- Image Section -->
          <div class="relative ${isFeatured ? 'lg:w-3/5 h-72 sm:h-96' : 'h-64'} overflow-hidden bg-navy-950 shrink-0">
            <img 
              src="${proj.image}" 
              alt="${proj.name}" 
              onerror="if(this.src.indexOf('${fallbackImg}')===-1)this.src='${fallbackImg}';"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
            
            <!-- Status Badge -->
            <div class="absolute top-4 left-4 z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${isFeatured ? 'bg-gold-light text-navy-950 shadow-lg' : 'bg-navy-950/90 text-gold-light border border-gold-metallic/40 backdrop-blur-md'}">
                <span class="w-2 h-2 rounded-full ${isFeatured ? 'bg-navy-950' : 'bg-gold-light'} animate-ping"></span>
                ${proj.status}
              </span>
            </div>

            <!-- Category Pill -->
            <div class="absolute top-4 right-4 z-10">
              <span class="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/90 text-navy-950 shadow-md">
                ${proj.category}
              </span>
            </div>

            <!-- Number Indicator -->
            <span class="absolute bottom-2 right-4 text-4xl sm:text-5xl font-black text-white/20 select-none font-cinzel">
              0${index + 1}
            </span>
          </div>

          <!-- Content Section -->
          <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF6EE]">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gold-bronze">
                  ${isFeatured ? 'FLAGSHIP GRAND OPENING' : 'DEVELOPMENT PORTFOLIO'}
                </span>
              </div>

              <h3 class="font-cinzel text-xl sm:text-2xl font-black text-navy-950 group-hover:text-gold-bronze transition-colors mb-2">
                ${proj.name}
              </h3>
              
              <!-- Location Line -->
              <div class="flex items-center gap-2 text-navy-900/80 text-xs sm:text-sm font-medium mb-4">
                <svg class="w-4 h-4 text-gold-bronze shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>${proj.location}</span>
              </div>

              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                ${proj.description}
              </p>

              <!-- Amenities Badges -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${(proj.amenities || [])
                  .map(
                    (am) => `
                  <span class="text-xs px-2.5 py-1 rounded-md bg-[#F2ECE1] text-navy-950 font-semibold border border-gold-metallic/20">
                    ${am}
                  </span>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Actions (Responsive: full-width stacked on mobile, row on tablet/desktop) -->
            <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <a 
                href="${proj.googleMapsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center justify-center sm:justify-start gap-1.5 min-h-[44px] sm:min-h-0 py-2 sm:py-0 px-3 sm:px-0 rounded-xl sm:rounded-none bg-slate-100 sm:bg-transparent text-xs font-bold text-navy-900 hover:text-gold-bronze transition-colors text-center"
              >
                <span>VIEW ON GOOGLE MAPS</span>
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>

              <button 
                type="button" 
                onclick="window.openProjectModal('${proj.id}')"
                class="min-h-[44px] px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#101827] hover:bg-[#1E293B] transition-all shadow-sm text-center flex items-center justify-center"
              >
                PROJECT DETAILS
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // Project Modal Logic
  window.openProjectModal = function (projectId) {
    const projects = window.SITE_CONFIG?.otherProjects || [];
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return;

    const modal = document.getElementById("project-modal");
    const title = document.getElementById("modal-project-title");
    const body = document.getElementById("modal-project-body");

    if (!modal || !title || !body) return;

    const fallbackImg = proj.fallbackImage || "/assets/images/dream_residency_plots.jpg";
    title.textContent = proj.name;
    body.innerHTML = `
      <div class="space-y-6">
        <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gold-metallic/30">
          <img 
            src="${proj.image}" 
            alt="${proj.name}" 
            onerror="if(this.src.indexOf('${fallbackImg}')===-1)this.src='${fallbackImg}';"
            class="w-full h-full object-cover"
          >
          <div class="absolute bottom-4 left-4 bg-navy-950/95 border border-gold-metallic/50 px-4 py-1.5 rounded-lg text-gold-light text-xs font-bold tracking-wider shadow-lg">
            STATUS: ${proj.status.toUpperCase()}
          </div>
        </div>

        <div>
          <div class="flex items-center gap-2 text-gold-metallic font-mono text-xs mb-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>LOCATION: ${proj.location}</span>
          </div>
          <h4 class="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">${proj.name}</h4>
          <p class="text-slate-300 text-sm leading-relaxed">${proj.description}</p>
        </div>

        <div>
          <h5 class="text-xs uppercase tracking-widest text-gold-light font-bold mb-3">Project Infrastructure & Amenities</h5>
          <div class="grid grid-cols-2 gap-2">
            ${(proj.amenities || [])
              .map(
                (a) => `
              <div class="flex items-center gap-2 p-2.5 rounded-lg bg-navy-950/80 border border-gold-metallic/20 text-xs text-slate-200">
                <span class="w-1.5 h-1.5 rounded-full bg-gold-light"></span>
                <span>${a}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <a href="${proj.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-navy text-xs">
            Open in Google Maps
          </a>
          <a href="#contact" onclick="window.closeProjectModal()" class="btn-gold text-xs">
            Inquire About Allotment
          </a>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  window.openDreamResidencyModal = function () {
    window.openProjectModal("dream-residency");
  };

  window.closeProjectModal = function () {
    const modal = document.getElementById("project-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  function initFilters() {
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter") || "all";
        activeFilter = filter;
        filterBtns.forEach((b) => {
          b.classList.remove("active", "text-gold-light", "bg-navy-950", "border-gold-metallic/40");
          b.classList.add("bg-navy-950/80", "border-white/15", "text-slate-300");
        });
        btn.classList.add("active", "text-gold-light", "bg-navy-950", "border-gold-metallic/40");
        btn.classList.remove("bg-navy-950/80", "border-white/15", "text-slate-300");

        if (window.playFuturisticChime) {
          window.playFuturisticChime(800, 0.12);
        }

        renderProjects();
      });
    });
  }

  function initGallery() {
    renderProjects();
    initFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGallery);
  } else {
    initGallery();
  }
})();
