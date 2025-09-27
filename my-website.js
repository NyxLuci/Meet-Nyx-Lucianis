// === Kawaii Custom Cursor ===
const cursor = document.getElementById('cuteCursor');

// Move the cursor
document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Hide default cursor
document.body.style.cursor = 'none';

// Swap cursor when hovering interactive elements
document.querySelectorAll('a, button, li').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.src = 'kawaii-pointer.png');
    el.addEventListener('mouseleave', () => cursor.src = 'kawaii-cursor.png');
});


// === Floating Hearts on Click ===
document.addEventListener("click", function(e) {
  for(let i = 0; i < 3; i++) { // spawn multiple hearts
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = e.pageX + (Math.random()*20-10) + "px";
    heart.style.top = e.pageY + (Math.random()*20-10) + "px";
    heart.style.fontSize = (20 + Math.random()*10) + "px";
    heart.style.color = ['#ff69b4','#ffb6c1','#ff1493','#ff82ab'][Math.floor(Math.random()*4)];
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
});

// === Sparkle Trail on Mousemove ===
document.addEventListener("mousemove", function(e) {
  for(let i=0;i<2;i++){
    let sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = e.pageX + (Math.random()*10-5) + "px";
    sparkle.style.top = e.pageY + (Math.random()*10-5) + "px";
    let size = 6 + Math.random()*6;
    sparkle.style.width = sparkle.style.height = size + "px";
    sparkle.style.backgroundColor = ['#ffe4e1','#ffd6f6','#ffb6c1','#ffc0cb'][Math.floor(Math.random()*4)];
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  }
});

// === Floating Stars on Interval ===
setInterval(() => {
  let star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.fontSize = (10 + Math.random()*15) + "px";
  star.style.color = ['#fff0f5','#ffe4e1','#ffb6c1','#ff69b4'][Math.floor(Math.random()*4)];
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 2000);
}, 1000);

// === Floating Bubbles ===
setInterval(() => {
  let bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.backgroundColor = ['#ffd6f6','#ffc0cb','#ffe4e1','#ffb6c1'][Math.floor(Math.random()*4)];
  bubble.style.width = bubble.style.height = (10 + Math.random()*15) + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 8000);
}, 1200);

// === Page Title Changer ===
let originalTitle = document.title;
window.addEventListener("blur", () => document.title = "｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡ Come back!");
window.addEventListener("focus", () => document.title = originalTitle);

// === Random Greeting Popup ===
const greetings = [
  "Welcome back, nya~ (ฅ^･ω･^ฅ)",
  "Hehe, you’re cute for visiting~",
  "Drink water and take breaks! ✧",
  "Don’t forget you’re awesome (≧◡≦) ♡"
];
setTimeout(() => alert(greetings[Math.floor(Math.random()*greetings.length)]), 3000);
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');

musicIcon.addEventListener('click', () => {
    if(bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const musicIcon = document.getElementById('musicIcon');
    const toggleBtn = document.getElementById('musicToggle');
    const bgMusic1 = document.getElementById('bgMusic1');
    const bgMusic2 = document.getElementById('bgMusic2');

    let currentTrack = 1;

    // Play/pause when clicking the icon
    musicIcon.addEventListener('click', () => {
        const music = currentTrack === 1 ? bgMusic1 : bgMusic2;
        if (music.paused) {
            music.play();
            musicIcon.style.filter = "drop-shadow(0 0 15px #ff1493)";
        } else {
            music.pause();
            musicIcon.style.filter = "none";
        }
    });

    // Switch tracks when clicking the toggle button
    toggleBtn.addEventListener('click', () => {
        // Pause current track
        if (currentTrack === 1) {
            bgMusic1.pause();
            bgMusic1.currentTime = 0;
            currentTrack = 2;
            bgMusic2.play();
        } else {
            bgMusic2.pause();
            bgMusic2.currentTime = 0;
            currentTrack = 1;
            bgMusic1.play();
        }
        // Visual sparkle effect
        musicIcon.style.filter = "drop-shadow(0 0 15px #ff1493)";
    });
});
document.querySelectorAll('.toggle-header').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.classList.toggle('open');
  });
});
