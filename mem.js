const imagePaths = [
  "MemImg/img1.jpg",
  "MemImg/img2.jpg",
  "MemImg/img3.jpg",
  "MemImg/img4.jpg",
  "MemImg/img5.jpg",
  "MemImg/img6.jpg",
  "MemImg/img7.jpg",
  "MemImg/img8.jpg",
];

let cards = shuffle([...imagePaths, ...imagePaths]);
const board = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");
const reshuffleBtn = document.getElementById("reshuffleBtn");

let first = null;
let second = null;
let lock = false;
let timeElapsed = 0;
let timerInterval = null;
let moves = 0;

function startTimer() {
  if (timerInterval === null) {
    timerInterval = setInterval(() => {
      timeElapsed++;
      updateTimerDisplay();
    }, 1000);
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function clearTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(imageSrc, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.image = imageSrc;
  card.dataset.index = index;

  const img = document.createElement("img");
  img.src = "MemImg/back.jpg";
  card.appendChild(img);

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
}

function initializeGame() {
  board.innerHTML = "";
  cards = shuffle([...imagePaths, ...imagePaths]);
  cards.forEach((src, i) => createCard(src, i));

  first = null;
  second = null;
  lock = false;
  timeElapsed = 0;
  moves = 0;
  clearTimer();
  timerDisplay.textContent = "0:00";
  movesDisplay.textContent = "0";
  reshuffleBtn.style.display = "none";
}

initializeGame();

function flipCard(card) {
  if (
    lock ||
    card.classList.contains("matched") ||
    card.classList.contains("revealed")
  )
    return;

  startTimer();

  const img = card.querySelector("img");
  img.src = card.dataset.image;
  card.classList.add("revealed");

  if (!first) {
    first = card;
    return;
  }

  second = card;
  lock = true;
  moves++;
  movesDisplay.textContent = moves;

  if (first.dataset.image === second.dataset.image) {
    first.classList.add("matched");
    second.classList.add("matched");
    resetTurn();
    checkGameComplete();
  } else {
    setTimeout(() => {
      first.querySelector("img").src = "MemImg/back.jpg";
      second.querySelector("img").src = "MemImg/back.jpg";
      first.classList.remove("revealed");
      second.classList.remove("revealed");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [first, second] = [null, null];
  lock = false;
}

function checkGameComplete() {
  const allCards = document.querySelectorAll(".card");
  const matchedCards = document.querySelectorAll(".card.matched");

  if (allCards.length === matchedCards.length) {
    clearTimer();
    reshuffleBtn.style.display = "block";
    setTimeout(() => {
      alert(
        `You won! Time: ${timerDisplay.textContent} | Moves: ${movesDisplay.textContent}`
      );
    }, 500);
  }
}

reshuffleBtn.addEventListener("click", initializeGame);
