// === contact.js — The Pulse of Connection ===

// === Floating Orbs Background ===
const orbCount = 15;
for (let i = 0; i < orbCount; i++) {
  const orb = document.createElement("div");
  orb.classList.add("orb");
  orb.style.left = Math.random() * window.innerWidth + "px";
  orb.style.top = Math.random() * window.innerHeight + "px";
  orb.style.width = orb.style.height = 6 + Math.random() * 10 + "px";
  orb.style.background = ["#c87fff55", "#ffb6f955", "#e1b6ff55"][Math.floor(Math.random() * 3)];
  document.body.appendChild(orb);
  floatOrb(orb);
}

function floatOrb(orb) {
  const duration = 3000 + Math.random() * 4000;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  orb.animate(
    [
      { transform: `translate(${x}px, ${y}px)` },
      { transform: `translate(${x + 10}px, ${y - 15}px)` }
    ],
    { duration, iterations: Infinity, direction: "alternate", easing: "ease-in-out" }
  );
}

// === Form Submission (Mock Handler) ===
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      showPopup("Nyaa~ You forgot to fill something!", false);
      return;
    }

    showPopup("Message sent to the void! (✿˶˘ ³˘)♡", true);
    contactForm.reset();
  });
}

// === Popup Feedback ===
function showPopup(text, success = true) {
  let popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = text;
  popup.style.background = success ? "rgba(200,127,255,0.9)" : "rgba(255,182,249,0.8)";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2500);
}

// === Cursor Glow Effect ===
document.addEventListener("mousemove", (e) => {
  let trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.pageX + "px";
  trail.style.top = e.pageY + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);
});
// === Starry Background ===
const starCount = 50;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.position = "fixed";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  const size = Math.random() * 3 + 1; // tiny twinkles
  star.style.width = star.style.height = size + "px";
  star.style.backgroundColor = "#ffffff";
  star.style.borderRadius = "50%";
  star.style.opacity = Math.random();
  star.style.pointerEvents = "none";
  star.style.zIndex = "-1";
  document.body.appendChild(star);

  // Twinkle animation
  const twinkleDuration = 2000 + Math.random() * 3000;
  star.animate(
    [
      { opacity: Math.random() * 0.5 + 0.3 },
      { opacity: Math.random() * 0.5 + 0.3 }
    ],
    { duration: twinkleDuration, iterations: Infinity, direction: "alternate" }
  );
}
// === Theme Music with guaranteed play on first interaction ===
// ...existing code...
// === Theme Music with guaranteed play on first interaction ===
// Make sure your HTML has: <audio id="contactMusic" src="contact.mp3" preload="auto"></audio>
// and optionally <div id="playMusicOverlay">Click to play</div>

const overlay = document.getElementById('playMusicOverlay');
const themeMusic = document.getElementById('contactMusic'); // use element id, not filename

function safeFadeInAudio(audio, duration = 2000) {
  if (!audio) return;
  audio.volume = 0;
  audio.play().catch(() => console.log("Music blocked until user interacts"));
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    audio.volume = Math.min((progress / duration) * 0.5, 0.5);
    if (progress < duration) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if (overlay && themeMusic) {
  overlay.addEventListener('click', () => {
    safeFadeInAudio(themeMusic);
    overlay.style.display = 'none';
  });
}

// Fallback: ensure a direct user interaction triggers playback
function startMusicHandler(e) {
  // Only run if themeMusic exists
  if (themeMusic) safeFadeInAudio(themeMusic);
  document.removeEventListener('click', startMusicHandler);
  document.removeEventListener('keydown', startMusicHandler);
}

document.addEventListener('click', startMusicHandler);
document.addEventListener('keydown', startMusicHandler);
// fade in helper
function fadeInAudio(audio, duration = 2000) {
  audio.volume = 0;
  audio.play().catch(() => console.log("Music blocked until user interacts"));
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    audio.volume = Math.min(progress / duration, 0.5);
    if (progress < duration) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Play music on first user interaction
function startMusic() {
  fadeInAudio(themeMusic);
  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);
