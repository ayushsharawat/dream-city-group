/**
 * Futuristic Web Audio Synthesizer (Zero External Audio Files Needed)
 * Synthesizes ultra-luxurious sci-fi chimes and interface feedback
 * completely synthesized on the fly via Web Audio API.
 */

(function () {
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Futuristic Soft Chime (for card hover & tab switch)
  window.playFuturisticChime = function (freq = 880, duration = 0.15) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  };

  // Grand Opening Laser Whoosh (for countdown pulse or modal launch)
  window.playLaserWhoosh = function () {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  };

  window.toggleFuturisticAudio = function () {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      initAudio();
      window.playLaserWhoosh();
    }
    const btn = document.getElementById("audio-toggle-btn");
    const icon = document.getElementById("audio-toggle-icon");
    const label = document.getElementById("audio-toggle-label");
    if (btn) {
      if (soundEnabled) {
        btn.classList.add("border-gold-light", "text-gold-light", "shadow-gold-metallic/40");
        btn.classList.remove("text-slate-400", "border-white/10");
        if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
        if (label) label.textContent = "SFX ON";
      } else {
        btn.classList.remove("border-gold-light", "text-gold-light", "shadow-gold-metallic/40");
        btn.classList.add("text-slate-400", "border-white/10");
        if (icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z m12 0l-4-4m0 4l4-4"></path>`;
        if (label) label.textContent = "SFX OFF";
      }
    }
  };
})();
