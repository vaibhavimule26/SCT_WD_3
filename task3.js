let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameOver = true;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "It's a Draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}
