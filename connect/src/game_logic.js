

export default class Board{

    constructor(num_players, size, turn = 1, board = null)
    {
        this.num_players = num_players; 
        // this.board = board ? board : new Array(size).fill(Array(size).fill(null));
        this.vert_board = new Array(size).fill(Array(size).fill(null));
        this.hor_board = new Array(size).fill(Array(size).fill(null));

        this.box =  new Array(size - 1).fill(Array(size - 1).fill(null));
        this.turn = turn;
        
        console.log("Board", board)
        console.log("Num Players", num_players)
        console.log("Turn", turn)

    }

    update_turn()
    {
        this.turn = this.turn == this.num_players ? 1 : this.turn += 1;
    }

    legal_move(row, col, type)
    {
        if (type == "vert") return this.vert_board[row][col] === null;
        if (type == "hori") return this.hori_board[row][col] === null;
    }

    score(row, col, type)
    {

    }

    apply_move(row, col, type)
    {
        if (this.legal_move(row, col)) this.board[row][col] = turn;  
        
        this.score(row, col, type);
    }

}