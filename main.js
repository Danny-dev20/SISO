const pages = document.querySelectorAll('.page');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const continueBtn = document.getElementById('continueBtn');
const menuPage = document.getElementById('menuPage');
let pageIndex = 0;

// show page function
function showPage(i) {
  pages.forEach(p => p.classList.remove('active'));
  const page = pages[i];
  page.classList.add('active');

  const textSpan = page.querySelector('.text');
  if (textSpan) typeText(textSpan);

  // hide nextBtn on question or menu pages
  if (i === 5 || i === 6 || page.id === "menuPage") {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
}

// typewriter effect
function typeText(element, speed = 25) {
  const full = element.textContent;
  element.textContent = "";
  let i = 0;
  clearInterval(element._typeInterval);
  element._typeInterval = setInterval(() => {
    element.textContent += full[i] ?? '';
    i++;
    if (i >= full.length) {
      clearInterval(element._typeInterval);
      element._typeInterval = null;
    }
  }, speed);
}

// next button
nextBtn.addEventListener('click', () => {
  pageIndex++;
  if (pageIndex < pages.length) showPage(pageIndex);
});

// yes button
yesBtn.addEventListener('click', () => {
  pageIndex = 6;
  showPage(pageIndex);
  spawnHearts();

  // make background more red ❤️
  document.body.classList.add('love-mode');

  setTimeout(() => continueBtn.style.display = 'inline-block', 2000);
});

// no button (runaway)
noBtn.addEventListener('mouseover', () => {
  noBtn.style.position = 'absolute';
  noBtn.style.top = Math.random() * 80 + 'vh';
  noBtn.style.left = Math.random() * 80 + 'vw';
});

// continue button
continueBtn.addEventListener('click', () => {
  pageIndex = [...pages].indexOf(menuPage);
  showPage(pageIndex);
});

// open section (with back button support)
function openSection(id) {
  const target = document.getElementById(id);
  if (target) {
    showPage([...pages].indexOf(target));
    addBackButton(target);
  }
}

// create a back button dynamically
function addBackButton(section) {
  if (!section.querySelector('.backBtn')) {
    const backBtn = document.createElement('button');
    backBtn.textContent = "⬅️ Back";
    backBtn.className = 'menuBtn backBtn';
    backBtn.onclick = () => showPage([...pages].indexOf(menuPage));
    section.appendChild(backBtn);
  }
}

function spawnHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 3 + Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }
}

// make hearts keep spawning every few seconds 💕
setInterval(spawnHearts, 3000);

// music autoplay + start typing
window.addEventListener('load', () => {
  const music = document.getElementById('bgMusic');
  music.volume = 0.3;
  const playMusic = () => {
    music.play().catch(() => {});
    document.removeEventListener('click', playMusic);
  };
  document.addEventListener('click', playMusic);

  const first = document.querySelector('.page.active .text');
  if (first) typeText(first);
});
