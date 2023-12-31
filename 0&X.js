var board;
var playerO = "O";
var playerX = "X";
var bot = "X"; // The bot's marker
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
    document.getElementById("reset").addEventListener("click", resetGame);
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }

    // Start the game with the player's move
    currPlayer = playerO;
    gameOver = false;
}

function resetGame() {
    document.querySelectorAll(".tile").forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("winner");
    });

    setGame();
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    checkWinner();

    if (!gameOver) {
        // Switch turns
        currPlayer = (currPlayer === playerO) ? bot : playerO;
        if (currPlayer === bot) {
            botMove();
        }
    }
}

function botMove() {
    // Implement your bot's logic here (e.g., random move)
    // For simplicity, the bot makes a random move in this example.

    setTimeout(() => {
        let emptyCells = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === ' ') {
                    emptyCells.push([r, c]);
                }
            }
        }

        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let [r, c] = emptyCells[randomIndex];
            board[r][c] = currPlayer;
            document.getElementById(r.toString() + "-" + c.toString()).innerText = currPlayer;
            checkWinner();
            currPlayer = playerO; // Switch back to the player's turn
        }
    }, 500); // Delay the bot's move for a more natural feel
}

// Add the checkWinner function here (as in your original code)



function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}