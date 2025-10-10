// === Kawaii Custom Cursor with Fade ===
// Set custom cursor using JavaScript
document.body.style.cursor = "url('Cute Purple Link Select.cur'), auto";


// Mouse follow
document.addEventListener('mousemove', e => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});

// Smooth cursor swap
function swapCursor(newSrc) {
  cursor.style.opacity = 0;
  setTimeout(() => {
    cursor.src = newSrc;
    cursor.style.opacity = 1;
  }, 150);
}


// Hover effect
document.querySelectorAll('a, button, li').forEach(el => {
  el.addEventListener('mouseenter', () => swapCursor(pointerIcon));
  el.addEventListener('mouseleave', () => swapCursor(heartIcon));
});

// === Floating Hearts on Click ===
document.addEventListener("click", e => {
  for (let i = 0; i < 3; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = e.pageX + (Math.random() * 20 - 10) + "px";
    heart.style.top = e.pageY + (Math.random() * 20 - 10) + "px";
    heart.style.fontSize = (30 + Math.random() * 10) + "px";
    heart.style.color = ['#ff69b4', '#ffb6c1', '#ff1493', '#ff82ab'][Math.floor(Math.random() * 4)];
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
});

// === Sparkle Trail ===
document.addEventListener("mousemove", e => {
  for (let i = 0; i < 2; i++) {
    let sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = e.pageX + (Math.random() * 10 - 5) + "px";
    sparkle.style.top = e.pageY + (Math.random() * 10 - 5) + "px";
    let size = 6 + Math.random() * 6;
    sparkle.style.width = sparkle.style.height = size + "px";
    sparkle.style.backgroundColor = ['#ffe4e1', '#ffd6f6', '#ffb6c1', '#ffc0cb'][Math.floor(Math.random() * 4)];
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  }
});

// === Floating Stars ===
setInterval(() => {
  let star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.fontSize = (20 + Math.random() * 15) + "px";
  star.style.color = ['#fff0f5', '#ffe4e1', '#ffb6c1', '#ff69b4'][Math.floor(Math.random() * 4)];
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 2000);
}, 1000);

// === Floating Bubbles ===
setInterval(() => {
  let bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.width = bubble.style.height = (10 + Math.random() * 15) + "px";
  bubble.style.backgroundColor = ['#ffd6f6', '#ffc0cb', '#ffe4e1', '#ffb6c1'][Math.floor(Math.random() * 4)];
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 8000);
}, 1200);

// === Page Title Changer ===
let originalTitle = document.title;
window.addEventListener("blur", () => document.title = "｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡ Come back!");
window.addEventListener("focus", () => document.title = originalTitle);

// === Random Greeting ===
const greetings = [
  "Welcome back, nya~ (ฅ^･ω･^ฅ)",
  "Hehe, you’re cute for visiting~",
  "Drink water and take breaks! ✧",
  "Don’t forget you’re awesome (≧◡≦) ♡"
];
setTimeout(() => alert(greetings[Math.floor(Math.random() * greetings.length)]), 3000);

// ...existing code...
// === Music Controls ===
// safe call to animateStars if it exists
if (typeof animateStars === 'function') {
  try {
    animateStars();
  } catch (err) {
    console.error('animateStars() failed:', err);
  }
}

const overlay = document.getElementById('playMusicOverlay');
const themeMusic = document.getElementById('bgMusic1');

function safePlayMusic() {
  if (!themeMusic) {
    console.warn('bgMusic1 element not found');
    return;
  }

  // If you have a fadeInAudio helper use it, otherwise try play()
  if (typeof fadeInAudio === 'function') {
    try {
      fadeInAudio(themeMusic);
    } catch (err) {
      console.error('fadeInAudio failed, falling back to play():', err);
      themeMusic.play().catch(e => console.warn('Audio play rejected:', e));
    }
  } else {
    themeMusic.play().catch(e => console.warn('Audio play rejected:', e));
  }
}

// If overlay exists attach listener, otherwise still wire global first-interaction play
if (overlay) {
  overlay.addEventListener('click', () => {
    safePlayMusic();
    overlay.style.display = 'none';
  });
}

function startMusic() {
  safePlayMusic();
  document.removeEventListener('click', startMusic);
  document.removeEventListener('keydown', startMusic);
}

// Ensure first user interaction triggers playback (required by browsers)
document.addEventListener('click', startMusic);
document.addEventListener('keydown', startMusic);
// ...existing code...
// fade in helper
// Play music on first user interaction
function startMusic() {
  fadeInAudio(themeMusic);
  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);
