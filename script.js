const imagePaths = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
];

// If imagePaths = ["a", "b", "c"], then:
// [...imagePaths, ...imagePaths]
// becomes ["a", "b", "c", "a", "b", "c"]
const cards = shuffle([...imagePaths, ...imagePaths]);
const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

let first = null;
let second = null;
let lock = false;
let moves = 0;

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
  // Store the image source in a custom data attribute
  // This makes it easy to identify which image the card represents
  card.dataset.image = imageSrc;

  // Store the index of the card in a custom data attribute
  // Useful for tracking card positions or preventing double clicks
  card.dataset.index = index;

  const img = document.createElement("img");
  img.src = "images/back.jpg"; // face-down initially
  card.appendChild(img);

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
}

cards.forEach((src, i) => createCard(src, i));

function flipCard(card) {
  if (
    lock ||
    card.classList.contains("matched") ||
    card.classList.contains("revealed")
  )
    return;

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
  } else {
    setTimeout(() => {
      first.querySelector("img").src = "images/back.jpg";
      second.querySelector("img").src = "images/back.jpg";
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
