/**
 * Cinematic Gold Confetti & Light Shimmer Particle System
 * Designed specifically for the "TWO LUCKY WINNERS. TWO DREAM CARS" showcase.
 */

(function () {
  let canvas, ctx;
  let particles = [];
  let animationId = null;
  let isVisible = false;

  const GOLD_COLORS = [
    "#FFDF73", // bright gold
    "#D4AF37", // metallic gold
    "#F3E5AB", // champagne gold
    "#AA771C", // deep bronze gold
    "#FFF7D6", // white gold
    "#E6CA65"  // royal yellow gold
  ];

  class ConfettiParticle {
    constructor(w, h, startAnywhere = false) {
      this.w = w;
      this.h = h;
      this.reset(startAnywhere);
    }

    reset(startAnywhere = false) {
      this.x = Math.random() * this.w;
      this.y = startAnywhere ? Math.random() * this.h : -20 - Math.random() * 50;
      this.size = Math.random() * 8 + 4;
      this.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      this.speedY = Math.random() * 2 + 1.2;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 4;
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      this.shape = Math.random() > 0.4 ? "rect" : "circle";
      this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.wobble) * 0.8;
      this.rotation += this.rotSpeed;

      if (this.y > this.h + 20) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.shape === "rect") {
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    if (ctx) {
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
  }

  function animate() {
    if (!isVisible || !ctx || !canvas) return;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, w, h);

    for (let p of particles) {
      p.update();
      p.draw(ctx);
    }

    animationId = requestAnimationFrame(animate);
  }

  function initConfetti() {
    canvas = document.getElementById("car-confetti-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const particleCount = window.innerWidth < 768 ? 35 : 75;

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ConfettiParticle(w, h, true));
    }

    // Only run animation when section is in viewport (great for battery/performance!)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          if (!animationId) animate();
        } else {
          isVisible = false;
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById("car-showcase-section");
    if (section) observer.observe(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConfetti);
  } else {
    initConfetti();
  }
})();
