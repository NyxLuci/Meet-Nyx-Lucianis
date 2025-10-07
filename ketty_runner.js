// === Ketty Runner Game + Static Cat Sprite + Music ===
(function(){
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  let W, H, DPR = Math.max(1, window.devicePixelRatio || 1);

  // --- Resize canvas ---
  function resize(){
    const rect = canvas.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  // --- Game state ---
  let running = true;
  let obstacles = [];
  let spawnTimer = 0;
  let speed = 4.5;          // starting speed
  const MAX_SPEED = 6;      // maximum speed
  const gravity = 0.6;
  let score = 0, hi = 0;

  const scoreEl = document.getElementById('score');
  const hiEl = document.getElementById('hi');

  const player = { x:40, y:0, w:36, h:36, vy:0, onGround:true, jumps:0, maxJumps:2 };

  function groundY(){ return H - 28; }

  function reset(){
    running = true;
    obstacles = [];
    spawnTimer = 0;
    speed = 4.5;
    score = 0;
    player.y = groundY() - player.h;
    player.vy = 0;
    player.onGround = true;
    player.jumps = 0;
    updateHUD();
  }

  // --- Player jump ---
  function jump(){
    if(!running) return;
    if(player.onGround || player.jumps < player.maxJumps){
      player.vy = -11;
      player.onGround = false;
      player.jumps++;
    }
  }

  // --- Obstacles ---
  function spawnObstacle(){
    const size = 18 + Math.random() * 18;
    obstacles.push({
      x: W + 20,
      w: size,
      h: size,
      y: groundY() - size,
      passed: false,
      phase: Math.random() * Math.PI * 2
    });
  }

  // --- Sparkles ---
  const sparkles = [];
  for(let i=0;i<50;i++){
    sparkles.push({
      x: Math.random()*W,
      y: Math.random()*H/2,
      size: 1 + Math.random()*3,
      vy: 0.2 + Math.random()*0.5,
      alpha: 0.6 + Math.random()*0.4
    });
  }

  // --- Cat Image ---
  const catImg = new Image();
  catImg.src = 'ketty_sprite.png';

  function drawPlayer(){
    if(catImg.complete){
      ctx.drawImage(catImg, player.x, player.y, player.w, player.h);
    } else {
      ctx.fillStyle = '#ff70a6';
      ctx.fillRect(player.x, player.y, player.w, player.h);
    }
  }

  // --- Collision ---
  function collides(a,b){
    return a.x < b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y;
  }

  // --- Update ---
  function update(dt){
    if(!running) return;

    // spawn obstacles
    spawnTimer -= dt;
    if(spawnTimer <= 0){
      spawnTimer = 900 - Math.min(500, score*6); // balanced spawn rate
      spawnObstacle();
    }

    // speed increase, capped
    speed += 0.0008 * dt;
    if(speed > MAX_SPEED) speed = MAX_SPEED;

    // player physics
    player.vy += gravity*(dt/16);
    player.y += player.vy*(dt/16);
    player.onGround = (player.y + player.h >= groundY());
    if(player.onGround){
      player.y = groundY() - player.h;
      player.jumps = 0;
    }

    // move obstacles
    obstacles.forEach(o => {
      o.x -= speed*(dt/16);
      o.phase += 0.1;
      if(!o.passed && o.x + o.w < player.x){
        o.passed = true;
        score++;
        updateHUD();
      }
    });
    obstacles = obstacles.filter(o => o.x + o.w > -20);

    // collision check
    for(const o of obstacles) if(collides(player,o)){ running=false; animateDeath(); }

    // update sparkles
    sparkles.forEach(s => { s.y += s.vy; if(s.y > H) s.y = 0; });
  }

  // --- Draw ---
  function draw(){
    ctx.clearRect(0,0,W,H);

    // background
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,'#ffd6e8'); grad.addColorStop(1,'#fff6fb');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    // ground
    ctx.fillStyle='#ffe6f0';
    ctx.fillRect(0, groundY(), W, H-groundY());

    // dashed lines
    const dashW = 14;
    let offset = (performance.now()/6) % (dashW*2);
    ctx.fillStyle = '#ffb3d9';
    for(let x=-offset;x<W;x+=dashW*2) ctx.fillRect(x, groundY()-4, dashW,4);

    // sparkles
    sparkles.forEach(s=>{
      ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
      ctx.fill();
    });

    drawPlayer();
    obstacles.forEach(o => drawYarn(o.x,o.y,o.w,o.phase));

    ctx.fillStyle='#222';
    ctx.font='14px system-ui,Segoe UI,Roboto';
    ctx.fillText('Score: ' + score, 10, 20);
  }

  // --- Yarn obstacle ---
  function drawYarn(x,y,size,phase=0){
    ctx.save();
    ctx.translate(x + size/2, y + size/2 + Math.sin(phase)*5);
    ctx.fillStyle='#d3547a';
    ctx.beginPath(); ctx.arc(0,0,size/2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.06)';
    ctx.lineWidth=1.5;
    for(let i=0;i<6;i++){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(Math.cos(i/6*Math.PI*2)*(size/2-2), Math.sin(i/6*Math.PI*2)*(size/2-2));
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- Game loop ---
  let last = performance.now();
  function loop(now){
    const dt = Math.min(40, now - last);
    update(dt);
    draw();
    last = now;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // --- Controls ---
  window.addEventListener('keydown', e=>{
    if(e.code==='Space'){ e.preventDefault(); jump(); }
    if(e.code==='KeyR' && !running) reset();
  });
  canvas.addEventListener('pointerdown', jump);
  document.getElementById('restart').addEventListener('click', reset);

  // --- Death animation ---
  function animateDeath(){
    let t=0, dur=700, startY=player.y;
    const anim = ()=>{
      t += 16;
      player.y = startY - Math.sin((t/dur)*Math.PI)*30;
      if(t < dur) requestAnimationFrame(anim);
      else player.y = startY;
    };
    anim();
    if(score>hi) hi=score;
    hiEl.textContent = hi;
  }

  function updateHUD(){ scoreEl.textContent = score; }

  reset();

  // --- Music Player ---
  const tracks=['Needy girl overdose.mp3','suzumarai.mp3'];
  let currentTrack=0;
  const bgMusic=document.getElementById('bgMusic');

  function playTrack(index){
    bgMusic.src = tracks[index];
    bgMusic.play().catch(()=>{});
  }
  bgMusic.addEventListener('ended', ()=>{
    currentTrack = (currentTrack+1)%tracks.length;
    playTrack(currentTrack);
  });

  window.startMusic = function(){
    playTrack(currentTrack);
    document.getElementById('musicPrompt').style.display='none';
  };
  window.toggleMusic = function(){
    if(bgMusic.paused) bgMusic.play(); else bgMusic.pause();
  };

  // --- Hall of Fame helper ---
  window.addToHallOfFame = function(name, score){
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}:</strong> ${score}`;
    document.getElementById('hofList').appendChild(li);
  };

  addToHallOfFame('Nyx-chanꉂ(˵˃ ᗜ ˂˵)⋆˚꩜｡', 60);

})();
