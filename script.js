/* ---------------- Data ---------------- */
const CATEGORIES = [
  { id:'shortform',   name:'Short-Form',       color:'#ff3366' },
  { id:'longform',    name:'Long-Form',        color:'#4c6fff' },
  { id:'gaming',      name:'Gaming',           color:'#7b5cff' },
  { id:'football',    name:'Football Edits',   color:'#00c853' },
  { id:'ecommerce',   name:'eCommerce Ads',    color:'#ffb300' },
  { id:'documentary', name:'Documentary',      color:'#00b8d4' },
  { id:'grading',     name:'Color Grading',    color:'#ff6e40' },
  { id:'anime',       name:'Anime',            color:'#e040fb' },
  { id:'ads',         name:'Ads',              color:'#ff5252' },
];

// Placeholder catalogue — each "thumb" points at /images, "video" is left
// empty until real Editkaro.in footage is dropped into /videos (see
// videos/README.txt). Add a video path and the card will auto-preview on hover.
const CLIPS = [
  { cat:'shortform',   title:'Reel Drop — Weekend Series',     tc:'00:32', thumb:'images/thumb-shortform.svg',   video:'', desc:'Fast-cut vertical reel built for retention on the first three seconds.' },
  { cat:'shortform',   title:'POV Transition Pack',            tc:'00:24', thumb:'images/thumb-shortform.svg',   video:'', desc:'Whip-pan transitions synced to a trending audio cue.' },
  { cat:'longform',    title:'Brand Story — Founder Interview', tc:'08:14', thumb:'images/thumb-longform.svg',    video:'', desc:'A-roll/B-roll interview cut with lower-third graphics and pacing edits.' },
  { cat:'longform',    title:'YouTube Vlog Edit',               tc:'11:02', thumb:'images/thumb-longform.svg',    video:'', desc:'Full episode edit with jump-cut cleanup and chapter markers.' },
  { cat:'gaming',      title:'Clutch Montage — FPS Highlights', tc:'01:10', thumb:'images/thumb-gaming.svg',      video:'', desc:'Kill-cam sync with impact zooms and hit-marker SFX.' },
  { cat:'gaming',      title:'Battle Royale Recap',             tc:'02:40', thumb:'images/thumb-gaming.svg',      video:'', desc:'Match recap cut down from a 40-minute VOD.' },
  { cat:'football',    title:'Matchday Highlight Reel',         tc:'01:45', thumb:'images/thumb-football.svg',    video:'', desc:'Goal-by-goal recap with score-bug graphics and crowd audio layering.' },
  { cat:'football',    title:'Player Skill Showcase',           tc:'00:58', thumb:'images/thumb-football.svg',    video:'', desc:'Slow-motion skill compilation with beat-synced cuts.' },
  { cat:'ecommerce',   title:'Product Launch — 15s Cutdown',    tc:'00:15', thumb:'images/thumb-ecommerce.svg',   video:'', desc:'Platform-spec cutdown optimized for paid social placement.' },
  { cat:'ecommerce',   title:'UGC Testimonial Ad',              tc:'00:41', thumb:'images/thumb-ecommerce.svg',   video:'', desc:'Customer testimonial edit with captions and CTA end-card.' },
  { cat:'documentary', title:'Field Notes — Short Doc',         tc:'06:20', thumb:'images/thumb-documentary.svg', video:'', desc:'Observational cut with natural sound and minimal scoring.' },
  { cat:'documentary', title:'Behind the Craft',                tc:'04:35', thumb:'images/thumb-documentary.svg', video:'', desc:'Process-driven documentary segment with interview overlay.' },
  { cat:'grading',     title:'Cinematic LUT Pass — Travel',     tc:'00:52', thumb:'images/thumb-grading.svg',     video:'', desc:'Full grading pass demonstrating a warm film-emulation LUT.' },
  { cat:'grading',     title:'Before / After Grade Reel',       tc:'00:38', thumb:'images/thumb-grading.svg',     video:'', desc:'Split-frame comparison showing raw vs. graded footage.' },
  { cat:'anime',       title:'AMV — Motion Sync Cut',           tc:'01:20', thumb:'images/thumb-anime.svg',       video:'', desc:'Beat-synced anime music video with speed ramps and glow FX.' },
  { cat:'anime',       title:'Fan Edit — Character Study',      tc:'00:47', thumb:'images/thumb-anime.svg',       video:'', desc:'Tribute edit with layered typography and color pop treatment.' },
  { cat:'ads',         title:'Instagram Story Ad — 3 Frame',    tc:'00:15', thumb:'images/thumb-ads.svg',         video:'', desc:'Story-format ad built across three swipeable frames.' },
  { cat:'ads',         title:'App Install Campaign Cut',        tc:'00:29', thumb:'images/thumb-ads.svg',         video:'', desc:'Performance-ad edit optimized for a hard CTA at second 3 and 28.' },
];

/* ---------------- Build scrubber ---------------- */
const scrubberTrack = document.getElementById('scrubberTrack');
const playhead = document.getElementById('playhead');
let activeCat = 'all';

function buildScrubber(){
  const all = document.createElement('button');
  all.className = 'clip active';
  all.dataset.cat = 'all';
  all.innerHTML = `<span class="swatch" style="background:#f1f1f4"></span>All Tracks`;
  scrubberTrack.appendChild(all);

  CATEGORIES.forEach(c=>{
    const b = document.createElement('button');
    b.className = 'clip';
    b.dataset.cat = c.id;
    b.innerHTML = `<span class="swatch" style="background:${c.color}"></span>${c.name}`;
    scrubberTrack.appendChild(b);
  });

  scrubberTrack.querySelectorAll('.clip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      activeCat = btn.dataset.cat;
      scrubberTrack.querySelectorAll('.clip').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      movePlayhead(btn);
      renderGrid();
    });
  });
}

function movePlayhead(el){
  playhead.style.left = el.offsetLeft + 'px';
  playhead.style.width = el.offsetWidth + 'px';
}

/* ---------------- Build grid ---------------- */
const grid = document.getElementById('grid');

function catInfo(id){ return CATEGORIES.find(c=>c.id===id); }

function renderGrid(){
  grid.innerHTML = '';
  const list = activeCat === 'all' ? CLIPS : CLIPS.filter(c=>c.cat===activeCat);
  grid.dataset.empty = list.length === 0;

  list.forEach((clip, i)=>{
    const info = catInfo(clip.cat);
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = (i*0.04)+'s';
    card.innerHTML = `
      <div class="card-thumb">
        <img class="grad-img" src="${clip.thumb}" alt="${clip.title} thumbnail" loading="lazy">
        ${clip.video ? `<video class="grad-video" src="${clip.video}" muted loop playsinline preload="none"></video>` : ''}
        <div class="scan"></div>
        <span class="cat-badge" style="background:${info.color}">${info.name}</span>
        <span class="tc-badge">${clip.tc}</span>
        <div class="play-btn"><img src="icons/play.svg" alt="Play" width="16" height="16"></div>
      </div>
      <div class="card-body">
        <h3>${clip.title}</h3>
        <div class="meta"><span>${info.name}</span><span>${clip.tc}</span></div>
      </div>`;
    card.addEventListener('click', ()=>openLightbox(clip, info));

    // Optional hover-preview: only kicks in once a real video file is linked.
    if(clip.video){
      const vid = card.querySelector('.grad-video');
      card.addEventListener('mouseenter', ()=> vid.play().catch(()=>{}));
      card.addEventListener('mouseleave', ()=>{ vid.pause(); vid.currentTime = 0; });
    }

    grid.appendChild(card);
  });
}

/* ---------------- Lightbox ---------------- */
const lightbox = document.getElementById('lightbox');
function openLightbox(clip, info){
  const thumbEl = document.getElementById('lightboxThumb');
  thumbEl.style.backgroundImage = `url('${clip.thumb}')`;
  document.getElementById('lightboxCat').textContent = info.name;
  document.getElementById('lightboxTitle').textContent = clip.title;
  document.getElementById('lightboxDesc').textContent = clip.desc + ' — Drop the real Editkaro.in cut into this slot to replace the placeholder frame.';
  lightbox.classList.add('open');
}
document.getElementById('lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') lightbox.classList.remove('open'); });

/* ---------------- Mobile nav ---------------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

/* ---------------- Running timecode ---------------- */
let frame = 0;
setInterval(()=>{
  frame++;
  const totalSec = Math.floor(frame/24);
  const h = String(Math.floor(totalSec/3600)).padStart(2,'0');
  const m = String(Math.floor((totalSec%3600)/60)).padStart(2,'0');
  const s = String(totalSec%60).padStart(2,'0');
  const f = String(frame%24).padStart(2,'0');
  document.getElementById('tc').textContent = `${h}:${m}:${s}:${f}`;
}, 1000/24);

/* ---------------- Init ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('statClips').textContent = String(CLIPS.length).padStart(2,'0');
buildScrubber();
renderGrid();
window.addEventListener('resize', ()=>{
  const active = scrubberTrack.querySelector('.clip.active');
  if(active) movePlayhead(active);
});
requestAnimationFrame(()=>{
  const active = scrubberTrack.querySelector('.clip.active');
  if(active) movePlayhead(active);
});
