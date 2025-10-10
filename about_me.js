const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.3 + 0.05
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();
const overlay = document.getElementById('playMusicOverlay');
const themeMusic = document.getElementById('themeMusic');

overlay.addEventListener('click', () => {
  themeMusic.play();
  overlay.style.display = 'none';
});

// floating heart animation when message is sent
function spawnHearts() {
  for (let i = 0; i < 6; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.fontSize = (20 + Math.random() * 15) + "px";
    heart.style.color = ['#ff99c8', '#ffb6f9', '#ffc0cb'][Math.floor(Math.random() * 3)];
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}

// handle form submission
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // simulate sending message
  messageBox.innerHTML = "Sending your message, nya~ ✧";
  setTimeout(() => {
    messageBox.innerHTML = "Message sent successfully! (ฅ^･ω･^ฅ)♡";
    spawnHearts();
  }, 1000);

  // clear the form
  form.reset();
});

// optional: background sparkle trail
document.addEventListener("mousemove", e => {
  let sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";
  sparkle.style.width = sparkle.style.height = (4 + Math.random() * 6) + "px";
  sparkle.style.background = ['#ffb6f9', '#b8fff7', '#ffe6ff'][Math.floor(Math.random() * 3)];
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});
