// ==========================================
// Audio Player State
// ==========================================

let currentSide = "A";
let isPlaying = false;
let noteTimers = [];

// Audio elements
const audioA = document.getElementById("audio-side-a");
const audioB = document.getElementById("audio-side-b");

// Player elements
const player = document.getElementById("player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const sideLabel = document.getElementById("side-label");
const sideBtns = document.querySelectorAll(".side-btn");
const notesContainer = document.getElementById("notes");

// ==========================================
// Memory Notes Arrays (EDIT THESE!)
// ==========================================

const notesA = [
  "Remember that rainy afternoon when we couldn't stop laughing at absolutely nothing?",
  "Your smile is still my favorite thing in the world.",
  "Thank you for being patient with me, even when I'm being impossible.",
  "Every playlist I make reminds me of you."
];

const notesB = [
  "That time you tried to cook and we ended up ordering pizza anyway? Classic.",
  "I love how you dance when you think no one's watching.",
  "Our inside jokes are better than anyone else's actual jokes.",
  "You make the chaotic moments feel like adventures."
];

// ==========================================
// Helper Functions
// ==========================================

function getCurrentAudio() {
  return currentSide === "A" ? audioA : audioB;
}

function getOtherAudio() {
  return currentSide === "A" ? audioB : audioA;
}

function getCurrentNotes() {
  return currentSide === "A" ? notesA : notesB;
}

function updateSideLabel() {
  const sideName = currentSide === "A" ? "Side A" : "Side B";
  const sideMood = currentSide === "A" ? "Soft / Sappy" : "Chaotic / Goofy";

  sideLabel.innerHTML = `
    <span class="side-name">${sideName}</span>
    <span class="side-mood">${sideMood}</span>
  `;
}

function updatePlayPauseIcon() {
  if (isPlaying) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

// ==========================================
// Memory Notes System
// ==========================================

function clearNotes() {
  // Clear all timers
  noteTimers.forEach(timer => clearTimeout(timer));
  noteTimers = [];

  // Clear notes container
  notesContainer.innerHTML = "";
}

function showNotes() {
  clearNotes();

  const notes = getCurrentNotes();
  const delayBetweenNotes = 22000; // 22 seconds between each note

  notes.forEach((noteText, index) => {
    const timer = setTimeout(() => {
      const noteEl = document.createElement("div");
      noteEl.className = "note";
      noteEl.textContent = noteText;
      notesContainer.appendChild(noteEl);
    }, index * delayBetweenNotes);

    noteTimers.push(timer);
  });
}

// ==========================================
// Play/Pause Logic
// ==========================================

function play() {
  const audio = getCurrentAudio();
  const otherAudio = getOtherAudio();

  // Pause other side
  otherAudio.pause();

  // Play current side
  audio.play().then(() => {
    isPlaying = true;
    player.classList.add("is-playing");
    updatePlayPauseIcon();
    showNotes();
  }).catch(err => {
    console.error("Playback failed:", err);
  });
}

function pause() {
  const audio = getCurrentAudio();
  audio.pause();
  isPlaying = false;
  player.classList.remove("is-playing");
  updatePlayPauseIcon();
  clearNotes();
}

// ==========================================
// Event Listeners: Play/Pause
// ==========================================

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

// ==========================================
// Event Listeners: Side Toggle
// ==========================================

sideBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const newSide = btn.dataset.side;

    if (newSide === currentSide) return;

    // Update active button state
    sideBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Pause current audio
    const oldAudio = getCurrentAudio();
    oldAudio.pause();

    // Switch side
    currentSide = newSide;

    // Update UI
    updateSideLabel();
    player.setAttribute("data-current-side", currentSide);

    // If was playing, start new side
    if (isPlaying) {
      clearNotes();
      play();
    }
  });
});

// ==========================================
// Easter Egg: Love Letter Modal
// ==========================================

const headphoneJack = document.getElementById("headphone-jack");
const loveLetterModal = document.getElementById("love-letter-modal");
const closeModal = document.getElementById("close-modal");

headphoneJack.addEventListener("click", () => {
  loveLetterModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  loveLetterModal.classList.remove("show");
});

loveLetterModal.addEventListener("click", (e) => {
  if (e.target === loveLetterModal) {
    loveLetterModal.classList.remove("show");
  }
});

// ==========================================
// Easter Egg: Eject Modal
// ==========================================

const ejectBtn = document.getElementById("eject-btn");
const ejectModal = document.getElementById("eject-modal");
const closeEjectModal = document.getElementById("close-eject-modal");

ejectBtn.addEventListener("click", () => {
  ejectModal.classList.add("show");
});

closeEjectModal.addEventListener("click", () => {
  ejectModal.classList.remove("show");
});

ejectModal.addEventListener("click", (e) => {
  if (e.target === ejectModal) {
    ejectModal.classList.remove("show");
  }
});

// ==========================================
// Audio End Behavior
// ==========================================

audioA.addEventListener("ended", () => {
  pause();
});

audioB.addEventListener("ended", () => {
  pause();
});

// ==========================================
// Initialize
// ==========================================

updateSideLabel();
updatePlayPauseIcon();
player.setAttribute("data-current-side", "A");
