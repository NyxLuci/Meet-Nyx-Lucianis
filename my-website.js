// === Kawaii Custom Cursor with Fade ===
const cursor = document.getElementById('cuteCursor');

// Mouse follow
document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Hide default cursor
document.body.style.cursor = 'none';

// Cursor icons (images)
const heartIcon = 'cur.png';        // heart image
const pointerIcon = 'cutePointer.png'; // pointer image

// Function to smoothly change cursor
function swapCursor(newSrc) {
    cursor.style.opacity = 0; // fade out
    setTimeout(() => {
        cursor.src = newSrc; // swap image
        cursor.style.opacity = 1; // fade in
    }, 150); // matches transition in CSS
}

// Hover effect for interactive elements
document.querySelectorAll('a, button, li').forEach(el => {
    el.addEventListener('mouseenter', () => swapCursor(pointerIcon));
    el.addEventListener('mouseleave', () => swapCursor(heartIcon));
});

// === Floating Hearts on Click ===
document.addEventListener("click", function(e) {
    for(let i = 0; i < 3; i++) {
        let heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = e.pageX + (Math.random()*20-10) + "px";
        heart.style.top = e.pageY + (Math.random()*20-10) + "px";
        heart.style.fontSize = (30 + Math.random()*10) + "px";
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

// === Floating Stars & Bubbles ===
setInterval(() => {
    let star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.fontSize = (20 + Math.random()*15) + "px";
    star.style.color = ['#fff0f5','#ffe4e1','#ffb6c1','#ff69b4'][Math.floor(Math.random()*4)];
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}, 1000);

setInterval(() => {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * window.innerWidth + "px";
    bubble.style.width = bubble.style.height = (10 + Math.random()*15) + "px";
    bubble.style.backgroundColor = ['#ffd6f6','#ffc0cb','#ffe4e1','#ffb6c1'][Math.floor(Math.random()*4)];
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

// === Music Controls ===
const musicIcon = document.getElementById('musicIcon');
const bgMusic1 = document.getElementById('bgMusic1');
const bgMusic2 = document.getElementById('bgMusic2');
const toggleBtn = document.getElementById('musicToggle');

let currentTrack = 1;

function playTrack(track) {
    if(track === 1) {
        bgMusic1.play();
        bgMusic2.pause();
        bgMusic2.currentTime = 0;
        currentTrack = 1;
    } else {
        bgMusic2.play();
        bgMusic1.pause();
        bgMusic1.currentTime = 0;
        currentTrack = 2;
    }
}

bgMusic1.addEventListener("ended", () => playTrack(2));
bgMusic2.addEventListener("ended", () => playTrack(1));

musicIcon.addEventListener('click', () => {
    const music = currentTrack === 1 ? bgMusic1 : bgMusic2;
    if(music.paused) music.play();
    else music.pause();
});

toggleBtn.addEventListener('click', () => {
    if(currentTrack === 1) playTrack(2);
    else playTrack(1);
});

// === Toggle Content Sections ===
document.querySelectorAll('.toggle-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('open');
    });
});
