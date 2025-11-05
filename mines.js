const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

let bombs = [];
let revealed = [];
let moves = 0;
let gameOver = false;
let bombCount = 5; // Default bomb count

function createBoard(numBombs = 5) {
  board.innerHTML = "";
  bombs = [];
  revealed = [];
  moves = 0;
  gameOver = false;
  movesDisplay.textContent = moves;

  // Place bombs randomly
  while (bombs.length < numBombs) {
    const randomIndex = Math.floor(Math.random() * 25);
    if (!bombs.includes(randomIndex)) {
      bombs.push(randomIndex);
    }
  }

  // Create 25 cells (5x5 grid)
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.textContent = "?";

    cell.addEventListener("click", () => revealCell(cell, i));
    board.appendChild(cell);
  }
}

function revealCell(cell, index) {
  if (gameOver || revealed.includes(index)) return;

  revealed.push(index);
  moves++;
  movesDisplay.textContent = moves;
  cell.classList.add("revealed");

  if (bombs.includes(index)) {
    // Hit a bomb - game over
    cell.textContent = "💣";
    cell.classList.add("bomb");
    gameOver = true;
    revealAllBombs();
    setTimeout(() => {
      alert(`Game Over! You hit a bomb in ${moves} moves.`);
    }, 500);
  } else {
    // Safe cell
    cell.textContent = "✅";
    cell.classList.add("safe");

    // Check if won (all safe cells revealed)
    if (revealed.length === 25 - bombs.length) {
      gameOver = true;
      setTimeout(() => {
        alert(
          `You Win! You avoided all ${bombs.length} bombs in ${moves} moves!`
        );
      }, 500);
    }
  }
}

function revealAllBombs() {
  bombs.forEach((bombIndex) => {
    const cell = document.querySelector(`[data-index="${bombIndex}"]`);
    if (!revealed.includes(bombIndex)) {
      cell.textContent = "💣";
      cell.classList.add("bomb", "revealed");
    }
  });
}

// Initialize game
createBoard(5);
