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
setInterval(createHeart, 1500);


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
/*
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
});*/

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

/* ================================
   DISABLE SWIPE-UP TO REVEAL
================================ */
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;

  // BLOCK swipe-up reveal: do nothing
  // Previously, this would show revealScreen on swipe up
  // Now, no action is taken
});

// Function to initialize Moon button
function initMoonButton() {
  const touchMoon = document.getElementById("touchMoon");
  const moonMessage = document.getElementById("moonMessage");

  touchMoon.addEventListener("click", () => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    moonMessage.textContent = msg;
    moonMessage.style.opacity = 1;

    setTimeout(() => {
      moonMessage.style.opacity = 0;
    }, 3000);
  });
}

// Call after loader hides
setTimeout(() => {
  loader.style.display = "none";
  countdownScreen.style.display = "block";

  // Initialize Moon button here
  initMoonButton();
}, 1000);

const messages = [
  "Hello Moon 🌙, you are precious!",
  "You make the world brighter 💛",
  "Keep smiling, lovely Moon 😄",
  "Shine bright like the stars ✨",
  "Moon, you light up my day 🌟",
  "Sending you a little magical sparkle ✨",
  "You are amazing just the way you are 💖",
  "Smile, Moon! The world loves you 😄",
  "A tiny elephant says hi 🐘💌",
  "Your laughter is contagious 😍",
  "Keep shining, playful Moon 🌙",
  "Every day is brighter with you around 💛",
  "You are my little sunshine 🌞",
];


const touchMoon = document.getElementById("touchMoon");
const moonMessage = document.getElementById("moonMessage");

let messageTimeout = null;

touchMoon.addEventListener("click", () => {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  moonMessage.textContent = msg;

  // show message
  moonMessage.style.opacity = "1";
  moonMessage.style.transition = "opacity 0.3s ease";

  // clear previous timeout so it doesn't vanish early
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  // set the timeout again
  messageTimeout = setTimeout(() => {
    moonMessage.style.opacity = "0";
    messageTimeout = null;
  }, 7000); // visible for 5 seconds
});




