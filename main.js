const startbtn = document.querySelector("button")
const msg = document.querySelector("h1")

let first_player = ""
let second_player = ""

const gameboard = (function () {
    let counter = 0
    let board = Array(9).fill("A")
    let player1, player2
    let current_player

    const setPlayers = function (name1, name2) {
        player1 = Player(name1, "X")
        player2 = Player(name2, "O")
        current_player = player1
        msg.textContent = `${current_player.name}'s Turn`
    }

    const MakeMove = function (move, symbol) {
        if (board[move] !== "A" || counter >= 9) return false
        counter++
        board[move] = symbol

        if (CheckBoard(symbol)) {
            msg.textContent = `${current_player.name} has won! Refresh to play again.`
            return true
        } else if (counter === 9) {
            msg.textContent = "Game is a tie. Refresh to play again."
            return true
        }
        current_player = current_player === player1 ? player2 : player1
        msg.textContent = `${current_player.name}'s Turn`
        return true
    }

    const CheckBoard = function (symbol) {
        return (
            (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
            (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
            (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
            (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
            (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
            (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
            (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
            (board[2] === symbol && board[4] === symbol && board[6] === symbol)
        )
    }

    return { setPlayers, MakeMove, get current_player() { return current_player } }
})()

startbtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Button Clicked")

    first_player = document.getElementById("first-player").value
    second_player = document.getElementById("second-player").value

    gameboard.setPlayers(first_player, second_player)
    document.querySelector("form").style.display = "none"
    document.querySelector("#container").style.display = "flex"
})

const boardButtons = Array.from(document.querySelectorAll(".col"))
boardButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const temp_symbol = gameboard.current_player.symbol
        if (gameboard.MakeMove(index, gameboard.current_player.symbol)) {
            button.textContent = temp_symbol
        }
    })
})

function Player(name, symbol) {
    return { name, symbol }
}