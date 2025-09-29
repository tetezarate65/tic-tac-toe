

function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (index, mark) => {
        board[index] = mark;
    }

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    return { board, setCell, resetBoard }
}

function Player(name, mark) {
    let score = 0;
    const increaseScore = () => {
        score += 1;
    }
    const getScore = () => score;
    return { name, mark, increaseScore, getScore }
}

function PlayGame() {
    // Create Players
    const player1 = Player("Player 1", "X");
    const player2 = Player("CPU", "O");

    let isPlayable = true;

    // Create Gameboard
    const gameboard = Gameboard();
    const board = gameboard.board;

    // Parameters
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let currentPlayer = player1;

    // Functions
    const checkWin = () => {
        winningCombos.forEach(win => {
            const [a, b, c] = win;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                currentPlayer.increaseScore();
                updateScoreboard();
                isPlayable = false;
                console.log(`${currentPlayer.name} wins!`);
                showOverlay(`${currentPlayer.name} wins!`);
            }
        });
    }

    const updateScoreboard = () => {
        const player1Score = document.getElementById("player1-score");
        const player2Score = document.getElementById("player2-score");
        player1Score.textContent = player1.getScore();
        player2Score.textContent = player2.getScore();
    }

    const checkTie = () => {
        if (!board.includes("")) {
            console.log("It's a tie!");
            isPlayable = false;
            showOverlay("It's a tie!");
        }
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // Play Game

    const playTurn = (index) => {
        if (board[index] === "") {
            board[index] = currentPlayer.mark
            checkWin();
            checkTie();
            changePlayer();
        } else {
            console.log("Cell already taken")
        }
    }

    const changePlayable = () => {
        isPlayable = !isPlayable;
    }

    const getPlayable = () => isPlayable;

    return { playTurn, board, resetBoard: gameboard.resetBoard, changePlayable, getPlayable }
}

const game = PlayGame();

const gameboardDiv = document.getElementById("gameboard");

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        gameboardDiv.appendChild(cell);
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = game.board[index];
    });
}

createBoard();
hideOverlay();

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        if (!game.getPlayable()) return;
        game.playTurn(e.target.dataset.index);
        updateBoard();
        console.log(game.board);
    });
});

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
    game.resetBoard();
    updateBoard();
    game.changePlayable();
    hideOverlay();
});

function showOverlay(message) {
    const overlay = document.getElementById("overlay");
    const overlayMessage = document.getElementById("overlay-message");
    overlayMessage.textContent = message;
    overlay.classList.remove("hidden");
}

function hideOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("hidden");
}

