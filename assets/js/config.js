/**
 * DREAM CITY GROUP, SHAMLI - Centralized Website Configuration
 * -------------------------------------------------------------------
 * All company details, launch dates, cars, amenities, projects,
 * contact numbers, and Google Maps links are centrally managed here.
 * You can easily update any text, image path, or link without touching HTML.
 */

const SITE_CONFIG = {
  // BRANDING
  company: {
    name: "DREAM CITY GROUP, SHAMLI",
    shortName: "DREAM CITY GROUP",
    city: "Shamli, Uttar Pradesh",
    tagline: "Building Trust, Crafting Dreams",
    role: "Property Dealer & Residential Plot Developer",
    // Official Logo PNG
    logoImage: "/assets/images/logo_crest.png",
    logoImageAlt: "/assets/images/logo/dream-city-group.png",
    established: "Shamli, UP",
  },

  // GRAND OPENING & COUNTDOWN
  grandOpening: {
    projectName: "DREAM RESIDENCY",
    eventTitle: "GRAND OPENING",
    dateDisplay: "25 OCTOBER 2026",
    // Configurable opening date/time in Asia/Kolkata timezone (IST: UTC+05:30)
    targetDateTime: "2026-10-25T10:00:00+05:30",
    timezone: "Asia/Kolkata",
    countdownHeadline: "THE COUNTDOWN TO YOUR DREAM BEGINS",
    countdownSubtext: "Mark your calendar for the grandest residential township launch in Shamli.",
    countdownFinishedMessage: "✨ THE GRAND OPENING IS NOW LIVE! WELCOME TO DREAM RESIDENCY ✨",
    padDaysToThree: false, // Set to true if you prefer 3 digits e.g. 012 DAYS
  },

  // FEATURED CARS (HERO & GRAND PRIZE SHOWCASE)
  cars: {
    car1: {
      plotBadge: "PLOT NO. 121 — HYUNDAI CRETA",
      plotNumber: "PLOT NO. 121",
      modelName: "HYUNDAI CRETA",
      image: "/assets/images/hyundai_creta.png",
      altImage: "/assets/images/vehicles/hyundai-creta.png",
      rawFallback: "/assets/images/hyundai_creta_raw.jpg",
      tagline: "The Undisputed Luxury SUV",
      badgeGold: true,
      specs: [
        { label: "Segment", value: "Premium Compact SUV" },
        { label: "Features", value: "Panoramic Sunroof & ADAS" },
        { label: "Edition", value: "Pearl White Showroom Finish" },
        { label: "Grand Opening Draw", value: "Allottee Prize for Plot 121" }
      ]
    },
    car2: {
      plotBadge: "PLOT NO. 201 — MAHINDRA XUV 7XO",
      plotNumber: "PLOT NO. 201",
      modelName: "MAHINDRA XUV 7XO",
      image: "/assets/images/mahindra_xuv_7xo.png",
      altImage: "/assets/images/vehicles/mahindra-xuv-7xo.png",
      fallbackImage: "/assets/images/mahindra_xuv700.png",
      rawFallback: "/assets/images/mahindra_xuv_raw.jpg",
      tagline: "The Dominant Flagship Beast",
      badgeGold: true,
      specs: [
        { label: "Segment", value: "Flagship Luxury SUV" },
        { label: "Features", value: "Twin HD Displays & Skyroof" },
        { label: "Edition", value: "Midnight Navy Metallic" },
        { label: "Grand Opening Draw", value: "Allottee Prize for Plot 201" }
      ]
    },
    showcaseHeadline: "TWO LUCKY WINNERS. TWO DREAM CARS.",
    showcaseSubtext: "Celebrate our grand opening milestone with Shamli's most talked-about plot allotment giveaway."
  },

  // 10 KEY AMENITIES
  amenities: [
    {
      id: "plots",
      title: "Residential Plots",
      desc: "Demarcated freehold plots ready for your custom luxury home construction.",
      icon: "icon-plots"
    },
    {
      id: "roads",
      title: "Wide Roads",
      desc: "30ft & 40ft wide, heavy-duty asphalt roads with curb stones and drainage.",
      icon: "icon-roads"
    },
    {
      id: "parks",
      title: "Lush Green Parks",
      desc: "Manicured central landscaped gardens, palm walkways, and children play zones.",
      icon: "icon-parks"
    },
    {
      id: "security",
      title: "24x7 Security",
      desc: "Manned security check-posts with boom barriers and perimeter vigilance.",
      icon: "icon-security"
    },
    {
      id: "cctv",
      title: "CCTV Surveillance",
      desc: "Comprehensive HD night-vision cameras monitoring all entry gates and avenues.",
      icon: "icon-cctv"
    },
    {
      id: "temple",
      title: "Grand Mandir",
      desc: "A sanctified Hindu Mandir within the township boundary for daily devotion.",
      icon: "icon-temple"
    },
    {
      id: "streetlights",
      title: "Street Lights",
      desc: "Modern, energy-efficient LED street poles lighting up every internal sector.",
      icon: "icon-lights"
    },
    {
      id: "water",
      title: "Sweet Water",
      desc: "Dedicated high-capacity overhead reservoir providing clean sweet potable water.",
      icon: "icon-water"
    },
    {
      id: "sewer",
      title: "Sewer Network",
      desc: "Fully planned underground sewage and stormwater drainage pipeline network.",
      icon: "icon-sewer"
    },
    {
      id: "gym",
      title: "Open Gym",
      desc: "Outdoor fitness equipment and dedicated wellness zones for active living.",
      icon: "icon-gym"
    }
  ],

  // FEATURED PROJECT: DREAM RESIDENCY
  dreamResidency: {
    name: "DREAM RESIDENCY",
    developer: "DREAM CITY GROUP, SHAMLI",
    tagline: "The Pinnacle of Modern Township Living in Shamli",
    heroImage: "/assets/images/dream_residency_gate.jpg",
    masterplanImage: "/assets/images/dream_residency_plots.jpg",
    location: "Prime Strategic Corridor, Shamli, Uttar Pradesh",
    googleMapsUrl: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
    overview: "Dream Residency is a landmark residential plotted development thoughtfully designed by Dream City Group. Situated in the rapidly flourishing heart of Shamli, Uttar Pradesh, it blends peaceful suburban greenery with ultra-modern township infrastructure.",
    highlights: [
      "Prime Plotted Development by Dream City Group",
      "Grand Classical Entrance Plaza with 24x7 Guard Checkpoint",
      "Interconnected 30ft & 40ft Wide Boulevard Network",
      "Underground Infrastructure (Sewerage & Sweet Water)",
      "Lush Landscaped Green Parks & Community Open Gym",
      "Dedicated Mandir & Family Spiritual Zone",
      "Immediate Possession & Construction Readiness upon Allotment"
    ],
    status: "Grand Opening Launch (25 October 2026)"
  },

  // ALL 6 PORTFOLIO PROJECTS: DREAM RESIDENCY + 5 EXISTING DEVELOPMENTS
  otherProjects: [
    {
      id: "dream-residency",
      name: "DREAM RESIDENCY",
      category: "Featured Flagship Project",
      status: "Grand Opening Launch",
      isFeatured: true,
      location: "Shamli, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
      image: "/assets/images/projects/dream-residency/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_gate.jpg",
      gallery: [
        "/assets/images/dream_residency_gate.jpg",
        "/assets/images/dream_residency_plots.jpg"
      ],
      description: "Our premier grand-opening plotted development in Shamli featuring wide 40ft asphalt roads, grand entrance arch, sweet water, and dream car allotments.",
      amenities: ["Residential Plots", "40ft Wide Roads", "24x7 Security", "Parks & Mandir"]
    },
    {
      id: "dream-city-colony-shamli",
      name: "DREAM CITY COLONY, SHAMLI",
      category: "Delivered Residential Colony",
      status: "Delivered & Established",
      isFeatured: false,
      location: "Shamli, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
      image: "/assets/images/projects/dream-city-colony-shamli/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_plots.jpg",
      gallery: [
        "/assets/images/projects/dream-city-colony-shamli/cover.jpg"
      ],
      description: "A well-established residential colony delivered by Dream City Group in Shamli with completed paved avenues, street lighting, and thriving family homes.",
      amenities: ["Freehold Plots", "Paved Roads", "Sweet Water", "Street Lights"]
    },
    {
      id: "dream-city-phase-2-shamli",
      name: "DREAM CITY PHASE II, SHAMLI",
      category: "Plotted Development",
      status: "Ready for Possession",
      isFeatured: false,
      location: "Shamli, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
      image: "/assets/images/projects/dream-city-phase-2-shamli/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_plots.jpg",
      gallery: [
        "/assets/images/projects/dream-city-phase-2-shamli/cover.jpg"
      ],
      description: "Phase II residential plotted expansion in Shamli with demarcated freehold plots, boundary walls, underground drainage, and immediate registry.",
      amenities: ["Demarcated Plots", "30ft Roads", "Gated Security", "Underground Drainage"]
    },
    {
      id: "alpha-city-shamli",
      name: "ALPHA CITY, SHAMLI",
      category: "Prime Residential Layout",
      status: "Prime Development",
      isFeatured: false,
      location: "Shamli, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
      image: "/assets/images/projects/alpha-city-shamli/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_gate.jpg",
      gallery: [
        "/assets/images/projects/alpha-city-shamli/cover.jpg"
      ],
      description: "A prime plotted layout situated close to key Shamli municipal avenues, designed with landscaped green pockets and modern access infrastructure.",
      amenities: ["Prime Location", "Wide Boulevard", "Lush Green Parks", "24x7 Security"]
    },
    {
      id: "dream-city-baraut",
      name: "DREAM CITY, BARAUT",
      category: "Township Development",
      status: "Plotted Community",
      isFeatured: false,
      location: "Baraut, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Baraut,+Uttar+Pradesh",
      image: "/assets/images/projects/dream-city-baraut/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_plots.jpg",
      gallery: [
        "/assets/images/projects/dream-city-baraut/cover.jpg"
      ],
      description: "Strategic plotted residential township connecting Baraut with regional corridors, offering peaceful suburban living and freehold plot options.",
      amenities: ["Highway Proximity", "Wide Roads", "Sweet Water", "Open Green Zone"]
    },
    {
      id: "dream-city-meerut",
      name: "DREAM CITY, MEERUT",
      category: "Plotted Residential Development",
      status: "Development Corridor",
      isFeatured: false,
      location: "Meerut, Uttar Pradesh",
      googleMapsUrl: "https://maps.google.com/?q=Meerut,+Uttar+Pradesh",
      image: "/assets/images/projects/dream-city-meerut/cover.jpg",
      fallbackImage: "/assets/images/dream_residency_gate.jpg",
      gallery: [
        "/assets/images/projects/dream-city-meerut/cover.jpg"
      ],
      description: "High-potential residential plotted development in the booming Meerut transit sector, providing prime plots for luxury home building.",
      amenities: ["Transit Corridor", "Wide Access Road", "Demarcated Plots", "Secured Layout"]
    }
  ],

  // LOCATION & CONNECTIVITY
  location: {
    city: "Shamli, Uttar Pradesh",
    pincode: "247776",
    address: "Dream Residency Site Office, Shamli, Uttar Pradesh",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.37562808006!2d77.23412585489726!3d29.447551065651556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c2394622b79a7%3A0xb231711200f6b360!2sShamli%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directMapsLink: "https://maps.google.com/?q=Shamli,+Uttar+Pradesh",
    landmarks: [
      { name: "Delhi-Saharanpur Expressway", distance: "Quick Access / 5 Mins" },
      { name: "Shamli Railway Station", distance: "10-12 Mins" },
      { name: "Shamli Main Bus Stand", distance: "8-10 Mins" },
      { name: "City Market & Civic Amenities", distance: "Easy Commute" },
      { name: "Shamli-Karnal Highway", distance: "Direct Link" }
    ]
  },

  // CONTACT & SOCIAL (OFFICIAL NUMBER: 8218553028)
  contact: {
    primaryPhone: "8218553028",
    primaryPhoneDisplay: "+91 82185 53028",
    primaryPhoneClean: "+918218553028",
    whatsappNumber: "918218553028",
    whatsappUrl: "https://wa.me/918218553028",
    whatsappDefaultMessage: "Hello Dream City Group Shamli, I am interested in Dream Residency residential plots and the Grand Opening event.",
    email: "info@dreamcitygroupshamli.com",
    officeAddress: "Dream City Group, Main Office, Shamli, Uttar Pradesh - 247776",
    workingHours: "Mon - Sun: 9:00 AM - 7:00 PM",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      whatsapp: "https://wa.me/918218553028"
    }
  }
};

// Export for ES modules and make globally accessible
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
