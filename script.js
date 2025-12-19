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

const buttonsContainer = document.getElementById("buttonsContainer");
const activityMessage = document.getElementById("activityMessage");
const bubblesContainer = document.getElementById("bubbles");

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
  heart.style.fontSize = (12 + Math.random() * 10) + "px";
  heart.style.animationDuration = (6 + Math.random() * 4) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 500);

/* ================================
   DAILY ACTIVITY MESSAGES
================================ */
const messages = {
  1: "Good morning, Moon 🌙! Smile bright today 💛",
  2: "You're amazing, precious Moon 🌸",
  3: "A little sparkle for you ✨",
  4: "Sending moonlight your way 🌙",
  5: "Keep shining, beautiful 💖",
  6: "Today's your special daily surprise 🎁",
  7: "Moon, you're lovable and magical 🌟",
  8: "Remember to have fun and laugh 😄",
  9: "A playful hug from afar 🤗",
  10: "Moonlight vibes only 🌙✨",
  11: "You are the star of today ⭐",
  12: "A little note: You're incredible 💌",
  13: "Moon, you make the world brighter 🌸",
  14: "Shine on, beautiful Moon 💛",
  15: "Tiny joys make big smiles 😊",
  16: "Moon, you're playful and lovable 💖",
  17: "Keep sparkling today ✨",
  18: "Moonlight kisses 😘",
  19: "You are precious beyond words 💛",
  20: "Today is full of joy 🌸",
  21: "A small surprise for you 🎁",
  22: "Moon, you shine so bright 🌟",
  23: "Happiness looks good on you 😄",
  24: "Playful moonlight magic 🌙✨",
  25: "Your day is special, Moon 💖",
  26: "Keep dreaming and smiling 🌸",
  27: "A note to say you're amazing 💌",
  28: "Shine like the moon tonight 🌙",
  29: "Lovely Moon, enjoy your day 💛",
  30: "Final daily surprise: love & joy 💖"
};

// Create buttons dynamically for 30 days
for (let day = 1; day <= 30; day++) {
  const btn = document.createElement("button");
  btn.textContent = `Day ${day}`;
  btn.onclick = () => showMessage(day);
  buttonsContainer.appendChild(btn);
}

// Show daily message with bubble
function showMessage(day) {
  if (messages[day]) {
    activityMessage.textContent = messages[day];
    activityMessage.style.display = "block";
    activityMessage.style.animation = "fadeUp 0.8s";
    createBubble();
  }
}

// Create bubble effect
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left = Math.random() * 90 + "vw";
  bubblesContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2000);
}

/* ================================
   COUNTDOWN TIMER
================================ */
function updateTimer() {
  const now = new Date();
  let diff = (birthdayDate - now) / 1000;

  if (diff <= 0) {
    countdownScreen.style.display = "none";
    revealScreen.style.display = "flex";

    // play music
    if (music) {
      music.volume = 0.6;
      music.play().catch(() => {});
    }

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
   SWIPE UP TO REVEAL FIXED
================================ */
// Only allow reveal if timer is 0
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  const now = new Date();
  if (birthdayDate - now <= 0 && startY - endY > 80) {
    countdownScreen.style.display = "none";
    revealScreen.style.display = "flex";
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
