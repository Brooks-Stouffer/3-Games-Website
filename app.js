let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const result_p = document.getElementById("result-text");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");
const lizard_div = document.getElementById("l");
const spock_div = document.getElementById("sp");
const action_message = document.getElementById("action-message");
const result_div = document.querySelector(".result");

const choiceNames = {
  r: "Rock",
  p: "Paper",
  s: "Scissors",
  l: "Lizard",
  sp: "Spock",
};

const winConditions = {
  rs: "Rock crushes Scissors",
  rl: "Rock crushes Lizard",
  ps: "Paper covers Rock",
  psp: "Paper disproves Spock",
  sr: "Scissors cuts Paper",
  sl: "Scissors decapitates Lizard",
  lp: "Lizard eats Paper",
  lsp: "Lizard poisons Spock",
  spr: "Spock vaporizes Rock",
  sps: "Spock smashes Scissors",
};

function getChoiceElement(choice) {
  return document.getElementById(choice);
}
function getCompChoice() {
  const choices = ["r", "p", "s", "l", "sp"];
  const index = Math.floor(Math.random() * 5);
  return choices[index];
}

function game(userchoice) {
  const computer = getCompChoice();
  const combo = userchoice + computer;

  if (userchoice === computer) {
    draw(userchoice, computer);
  } else if (winConditions[combo]) {
    win(userchoice, computer, combo);
  } else {
    lose(userchoice, computer);
  }
}

function win(user, comp, combo) {
  const userChoice = getChoiceElement(user);
  const compChoice = getChoiceElement(comp);

  userChoice.classList.add("choice-selected");
  compChoice.classList.add("choice-selected");

  userScore++;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML = `${winConditions[combo]}! 🎉 You Win!`;
  result_div.classList.add("win-animation");
  setTimeout(() => result_div.classList.remove("win-animation"), 600);
  action_message.innerHTML = `You chose ${choiceNames[user]}, Computer chose ${choiceNames[comp]}`;

  setTimeout(() => {
    userChoice.classList.remove("choice-selected");
    compChoice.classList.remove("choice-selected");
  }, 1000);

  if (userScore === 10) {
    result_p.innerHTML = "🏆 YOU WON THE GAME! 🏆";
    action_message.innerHTML = "Game will reset...";
    setTimeout(resetGame, 2000);
  }
}

function lose(user, comp) {
  const userChoice = getChoiceElement(user);
  const compChoice = getChoiceElement(comp);

  userChoice.classList.add("choice-selected");
  compChoice.classList.add("choice-selected");

  compScore++;
  compScore_span.innerHTML = compScore;
  const compCombo = comp + user;
  result_p.innerHTML = `${winConditions[compCombo]}! 😢 You Lose!`;
  result_div.classList.add("lose-animation");
  setTimeout(() => result_div.classList.remove("lose-animation"), 500);
  action_message.innerHTML = `You chose ${choiceNames[user]}, Computer chose ${choiceNames[comp]}`;

  setTimeout(() => {
    userChoice.classList.remove("choice-selected");
    compChoice.classList.remove("choice-selected");
  }, 1000);

  if (compScore === 10) {
    result_p.innerHTML = "💀 COMPUTER WINS THE GAME! 💀";
    action_message.innerHTML = "Game will reset...";
    setTimeout(resetGame, 2000);
  }
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  userScore_span.innerHTML = 0;
  compScore_span.innerHTML = 0;
  result_p.innerHTML = "Make your move!";
  action_message.innerHTML = "Pick your move to begin!";
}

function draw(user, comp) {
  result_p.innerHTML = "It's a Draw! 🤝 Try again!";
  action_message.innerHTML = `Both chose ${choiceNames[user]}`;
}

rock_div.addEventListener("click", () => game("r"));
paper_div.addEventListener("click", () => game("p"));
scissor_div.addEventListener("click", () => game("s"));
lizard_div.addEventListener("click", () => game("l"));
spock_div.addEventListener("click", () => game("sp"));
