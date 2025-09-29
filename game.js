

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
    const score = 0;
    let increaseScore = () => {
        score += 1;
    }
    return { name, mark, increaseScore }
}

function PlayGame() {
    // Create Players
    const player1 = Player("Player 1", "X");
    const player2 = Player("CPU", "O");

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
            }
        });
    }

    const checkTie = () => {
        if (!board.includes("")) {
            console.log("It's a tie!");
        }
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // Play Game

    const playTurn = (index) => {
        if (board[index] === "") {
            board[index] = currentPlayer.mark
            changePlayer();
            checkWin(currentPlayer);
            checkTie();
        } else {
            console.log("Cell already taken")
        }
        return {}
    }

    return { playTurn, board, resetBoard: gameboard.resetBoard }
}

export { Gameboard, Player, PlayGame }



