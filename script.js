/* ================================
   CONFIGURATION
================================ */
const TEST_MODE = false; // change to false on real birthday
let birthdayDate;

if (TEST_MODE) {
  birthdayDate = new Date();
  birthdayDate.setSeconds(birthdayDate.getSeconds() + 5); // quick test
} else {
  birthdayDate = new Date(2026, 0, 18); // Jan 18, 2026
}

/* ================================
   ELEMENT REFERENCES
================================ */
const loader = document.getElementById("loader");
const countdownScreen = document.getElementById("countdownScreen");
const revealScreen = document.getElementById("revealScreen");
const music = document.getElementById("bgMusic");

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

/* ================================
   LOADER HANDLING
================================ */
setTimeout(() => {
  loader.style.display = "none";
  countdownScreen.style.display = "block";
}, 1000);

/* ---------- DAY/NIGHT BACKGROUND ---------- */
const hour = new Date().getHours();
if (hour >= 18 || hour < 6) {
  document.body.classList.add("night");
} else {
  document.body.classList.add("day");
}

/* ---------- FLOATING HEARTS ANIMATION ---------- */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💛";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random()*10) + "px";
  heart.style.animationDuration = (6 + Math.random()*4) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

// spawn hearts every 0.5s
setInterval(createHeart, 500);


/* ================================
   COUNTDOWN TIMER
================================ */
function updateTimer() {
  const now = new Date();
  let diff = (birthdayDate - now) / 1000;

  if (diff <= 0) {
    countdownScreen.style.display = "none";
    revealScreen.style.display = "flex";

    // play music (mobile-safe)
    if (music) {
      music.volume = 0.6;
      music.play().catch(() => {});
    }

    // mobile vibration
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    return;
  }

  const days = Math.floor(diff / 86400);
  diff %= 86400;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor(diff % 60);

  dEl.textContent = days;
  hEl.textContent = hours.toString().padStart(2, "0");
  mEl.textContent = minutes.toString().padStart(2, "0");
  sEl.textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateTimer, 1000);
updateTimer();

/* ================================
   SWIPE UP TO REVEAL (MOBILE)
================================ */
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  if (startY - endY > 80) {
    countdownScreen.style.display = "none";
    revealScreen.style.display = "flex";
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
