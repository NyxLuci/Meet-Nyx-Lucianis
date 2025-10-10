// ...existing code...
(() => {
  'use strict';

  const q = sel => document.querySelector(sel);
  const qAll = sel => Array.from(document.querySelectorAll(sel));

  /* -------------------------
     Custom cursor
     ------------------------- */
  const cursor = document.createElement('img');
  cursor.id = 'cuteCursor';
  Object.assign(cursor.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 999999,
    width: '36px',
    height: '36px',
    transform: 'translate(-50%,-50%)',
    transition: 'width 120ms ease, height 120ms ease, opacity 120ms ease',
    opacity: '1'
  });

  let pendingMove = false;
  let lastX = 0, lastY = 0;
  window.addEventListener('mousemove', e => {
    lastX = e.clientX; lastY = e.clientY;
    if (!pendingMove) {
      pendingMove = true;
      requestAnimationFrame(() => {
        cursor.style.left = lastX + 'px';
        cursor.style.top = lastY + 'px';
        pendingMove = false;
      });
    }
  });

  function setCursorIcon(src, size = 36) {
    cursor.style.width = size + 'px';
    cursor.style.height = size + 'px';
    cursor.src = src;
  }
  qAll('a, button, li').forEach(el => {
    el.addEventListener('mouseenter', () => setCursorIcon(pointerIcon, 40));
    el.addEventListener('mouseleave', () => setCursorIcon(heartIcon, 36));
  });

  /* -------------------------
     Floating hearts (on click/tap)
     ------------------------- */
  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    Object.assign(heart.style, {
      position: 'absolute',
      left: (x + (Math.random() * 20 - 10)) + 'px',
      top: (y + (Math.random() * 20 - 10)) + 'px',
      fontSize: (18 + Math.random() * 18) + 'px',
      pointerEvents: 'none',
      opacity: '1',
      transition: 'transform 1.1s ease-out, opacity 1.1s ease-out',
      zIndex: 999999
    });
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-60px) scale(${1 + Math.random() * 0.6}) rotate(${(Math.random() * 40 - 20)}deg)`;
      heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 1200);
  }

  function spawnHeartsAt(x, y, count = 3) {
    for (let i = 0; i < count; i++) {
      createFloatingHeart(Math.round(x + (Math.random() * 30 - 15)), Math.round(y + (Math.random() * 30 - 15)));
    }
  }

  function handlePointerForHearts(e) {
    // ignore non-left clicks
    if (e.button && e.button !== 0) return;
    const tgt = e.target || (e.touches && e.touches[0] && e.touches[0].target);
    if (tgt instanceof HTMLInputElement || tgt instanceof HTMLTextAreaElement || (tgt && tgt.isContentEditable)) return;

    let x = (e.pageX !== undefined) ? e.pageX : (e.touches && e.touches[0] ? e.touches[0].pageX : lastX);
    let y = (e.pageY !== undefined) ? e.pageY : (e.touches && e.touches[0] ? e.touches[0].pageY : lastY);
    const count = e.shiftKey ? 6 : 3;
    spawnHeartsAt(x || lastX, y || lastY, count);
  }

  // Use pointerdown for immediate response on desktop and mobile; keep touchstart for older devices
  document.addEventListener('pointerdown', handlePointerForHearts, { passive: true });
  document.addEventListener('touchstart', handlePointerForHearts, { passive: true });

  /* -------------------------
     Sparkle trail
     ------------------------- */
  function createSparkle(x, y) {
    const s = document.createElement('div');
    const size = 6 + Math.random() * 8;
    Object.assign(s.style, {
      position: 'absolute',
      left: (x + (Math.random() * 8 - 4)) + 'px',
      top: (y + (Math.random() * 8 - 4)) + 'px',
      width: size + 'px',
      height: size + 'px',
      background: ['#ffe4e1','#ffd6f6','#ffb6c1','#ffc0cb'][Math.floor(Math.random()*4)],
      borderRadius: '50%',
      opacity: '0.95',
      pointerEvents: 'none',
      zIndex: 99999,
      transition: 'transform 0.7s ease-out, opacity 0.7s ease-out'
    });
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = `translateY(-18px) scale(0.4)`;
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 800);
  }

  let lastSparkle = 0;
  window.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastSparkle > 40) {
      createSparkle(e.pageX, e.pageY);
      lastSparkle = now;
    }
  });

  /* -------------------------
     Floating stars & bubbles
     ------------------------- */
  function spawnFloating(kind) {
    const el = document.createElement('div');
    Object.assign(el.style, { position: 'fixed', left: Math.random() * window.innerWidth + 'px', top: Math.random() * window.innerHeight + 'px', pointerEvents: 'none', zIndex: -1 });
    if (kind === 'star') {
      el.textContent = '✧';
      el.style.opacity = String(0.2 + Math.random() * 0.8);
      el.style.fontSize = (8 + Math.random() * 20) + 'px';
      el.style.color = ['#fff0f5','#ffe4e1','#ffb6c1','#ff69b4'][Math.floor(Math.random()*4)];
      el.style.filter = 'blur(0.3px)';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200 + Math.random()*1800);
    } else {
      el.style.width = el.style.height = (8 + Math.random() * 28) + 'px';
      el.style.borderRadius = '50%';
      el.style.background = ['#ffd6f6','#ffc0cb','#ffe4e1','#ffb6c1'][Math.floor(Math.random()*4)];
      el.style.opacity = '0.7';
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transition = `transform ${6 + Math.random()*6}s linear, opacity ${6 + Math.random()*6}s linear`;
        el.style.transform = `translateY(-${40 + Math.random()*140}px)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 8000 + Math.random()*4000);
    }
  }
  setInterval(() => spawnFloating('star'), 900);
  setInterval(() => spawnFloating('bubble'), 1400);

  /* -------------------------
     Title message on blur/focus
     ------------------------- */
  const originalTitle = document.title;
  window.addEventListener('blur', () => document.title = '｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡ Come back!');
  window.addEventListener('focus', () => document.title = originalTitle);

  /* -------------------------
     Greeting toast
     ------------------------- */
  setTimeout(() => {
    try {
      const greetings = [
        "Welcome back, nya~ (ฅ^･ω･^ฅ)",
        "Hehe, you’re cute for visiting~",
        "Drink water and take breaks! ✧",
        "Don’t forget you’re awesome (≧◡≦) ♡"
      ];
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      const n = document.createElement('div');
      n.textContent = msg;
      Object.assign(n.style, {
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,182,193,0.95)', color: '#000', padding: '10px 16px', borderRadius: '12px',
        fontFamily: "'Press Start 2P', cursive", zIndex: 999999
      });
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 3300);
    } catch (e) { /* ignore */ }
  }, 2800);

  /* -------------------------
     Music controls & overlay (autoplay-safe)
     ------------------------- */
  const overlay = q('#playMusicOverlay');
  const audioA = q('#bgMusic1');
  const audioB = q('#bgMusic2');
  const musicIcon = q('#musicIcon');
  const musicToggleBtn = q('#musicToggle');

  const audios = [audioA, audioB].filter(Boolean);
  let currentIndex = 0;
  let musicStarted = false;
  let fadeFrame = null;

  function fadeInAudio(audio, duration = 1800, targetVol = 0.5) {
    if (!audio) return;
    cancelAnimationFrame(fadeFrame);
    try { audio.volume = 0; } catch (e) {}
    const start = performance.now();
    const playP = audio.play && audio.play();
    if (playP && typeof playP.catch === 'function') playP.catch(() => {});
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      try { audio.volume = Math.min(targetVol, t * targetVol); } catch (e) {}
      if (t < 1) fadeFrame = requestAnimationFrame(step);
    }
    fadeFrame = requestAnimationFrame(step);
  }

  function startMusicOnce() {
    if (musicStarted) return;
    musicStarted = true;
    if (audios.length) fadeInAudio(audios[currentIndex]);
    if (overlay) overlay.style.display = 'none';
  }

  if (overlay) overlay.addEventListener('click', () => startMusicOnce());
  ['click','keydown','touchstart'].forEach(evt => document.addEventListener(evt, startMusicOnce, { once: true }));

  if (musicIcon) {
    musicIcon.addEventListener('click', () => {
      const audio = audios[currentIndex];
      if (!audio) return;
      if (audio.paused) fadeInAudio(audio);
      else audio.pause();
    });
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (!audios.length) return;
      audios[currentIndex].pause();
      audios[currentIndex].currentTime = 0;
      currentIndex = (currentIndex + 1) % audios.length;
      fadeInAudio(audios[currentIndex]);
      musicStarted = true;
      if (overlay) overlay.style.display = 'none';
    });
  }

  /* -------------------------
     Night mode toggle (persisted)
     ------------------------- */
  const themeBtn = q('#themeToggle');
  function setNightMode(enabled) {
    document.body.classList.toggle('night', !!enabled);
    if (themeBtn) themeBtn.textContent = enabled ? '☀️ Day Mode' : '🌙 Night Mode';
    try { localStorage.setItem('nightMode', enabled ? '1' : '0'); } catch (e) {}
  }
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const now = document.body.classList.toggle('night');
    setNightMode(now);
  });
  try {
    const saved = localStorage.getItem('nightMode');
    if (saved === '1') setNightMode(true);
  } catch (e) {}

  /* -------------------------
     Form mock & popup
     ------------------------- */
  const contactForm = q('#contactForm');
  function showPopup(text, success = true) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = text;
    Object.assign(popup.style, {
      position: 'fixed', left: '50%', top: '12%', transform: 'translateX(-50%)',
      padding: '12px 18px', borderRadius: '12px', zIndex: 999999, fontFamily: "'Press Start 2P', cursive",
      background: success ? 'rgba(200,127,255,0.95)' : 'rgba(255,182,249,0.95)'
    });
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2200);
  }
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = (q('#name') && q('#name').value || '').trim();
      const email = (q('#email') && q('#email').value || '').trim();
      const message = (q('#message') && q('#message').value || '').trim();
      if (!name || !email || !message) {
        showPopup('Nyaa~ You forgot to fill something!', false);
        return;
      }
      showPopup('Message sent to the void! (✿˶˘ ³˘)♡', true);
      contactForm.reset();
    });
  }

  /* -------------------------
     Debug API
     ------------------------- */
  window.NyxSite = {
    startMusic: startMusicOnce,
    toggleNight: () => setNightMode(!document.body.classList.contains('night'))
  };

})();
