let current_move = ""
const gameboard = (function(){
    let counter = 0
    let board = ["A", "A", "A", "A", "A", "A", "A", "A", "A"]

    let RandomMove = () => (Math.floor(Math.random() * 100)) % 9

    let MakeMove = function(symbol){
        let move = RandomMove()
        while (board[move] !== "A"){
             move = RandomMove()
        }
        counter ++
        board[move] = symbol
        console.log(`${counter} - ${symbol} - ${move}`)
    }

    let CheckBoard = function(symbol){
        if ((board[0] === symbol && board[1] === symbol && board[2] === symbol)||(board[3] === symbol && board[4] === symbol && board[5] === symbol)||(board[6] === symbol && board[7] === symbol && board[8] === symbol)) return true
        else if ((board[0] === symbol && board[3] === symbol && board[6] === symbol)||(board[1] === symbol && board[4] === symbol && board[7] === symbol)||(board[2] === symbol && board[5] === symbol && board[8] === symbol)) return true
        else if ((board[0] === symbol && board[4] === symbol && board[8] === symbol)||(board[2] === symbol && board[4] === symbol && board[6] === symbol)) return true  
    }

    let PlayGame = function(){
        const player1 = Player("Ishraq", "X")
        const player2 = Player("Benjamin", "O")
        let current_player = player1
        while (counter < 9){
            MakeMove(current_player.symbol)
            if (CheckBoard(current_player.symbol)) {
                console.log(`${current_player.name} has won!`)
                return
            }
            current_player = current_player === player1 ? player2 : player1
        }
        console.log("The game is a tie!")
    }

    return {counter, board, RandomMove, MakeMove, CheckBoard, PlayGame}

})()

function Player(name, symbol){
    return {name, symbol}
}

gameboard.PlayGame()