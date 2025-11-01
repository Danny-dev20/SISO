const pages = document.querySelectorAll('.page');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const continueBtn = document.getElementById('continueBtn');
const menuPage = document.getElementById('menuPage');
let pageIndex = 0;

function showPage(i) {
  pages.forEach(p => p.classList.remove('active'));
  const page = pages[i];
  page.classList.add('active');

  const textSpan = page.querySelector('.text');
  if (textSpan) typeText(textSpan);

  if (i === 5 || i === 6 || page.id === "menuPage") {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
}

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

nextBtn.addEventListener('click', () => {
  pageIndex++;
  if (pageIndex < pages.length) showPage(pageIndex);
});

yesBtn.addEventListener('click', () => {
  pageIndex = 6;
  showPage(pageIndex);
  spawnHearts();
  document.body.classList.add('love-mode');

  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.style.background = '#fff'; 
    btn.style.color = ' #ff003c';
  });

  const style = document.createElement('style');
  style.textContent = `
    button:hover {
      background: #ff4d88 !important;
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => continueBtn.style.display = 'inline-block', 2000);
});


noBtn.addEventListener('mouseover', () => {
  noBtn.style.position = 'absolute';
  noBtn.style.top = Math.random() * 80 + 'vh';
  noBtn.style.left = Math.random() * 80 + 'vw';
});

continueBtn.addEventListener('click', () => {
  pageIndex = [...pages].indexOf(menuPage);
  showPage(pageIndex);
});

function openSection(id) {
  const target = document.getElementById(id);
  if (target) {
    showPage([...pages].indexOf(target));
    addBackButton(target);
  }
}

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
  setTimeout(spawnHearts, 3000);

}

window.addEventListener('load', () => {
  const music = document.getElementById('bgMusic');
  music.volume = 0.3;
  const playMusic = () => {
    music.play().catch(() => { });
    document.removeEventListener('click', playMusic);
  };
  document.addEventListener('click', playMusic);

  const first = document.querySelector('.page.active .text');
  if (first) typeText(first);
});
