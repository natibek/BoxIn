export default class Board_{

    constructor(size, names, old_board = null, turn = 1, score = null)
    {
        this.size = size;
        this.names = names.map((name, ind) => (name === "" ? String(ind + 1) : name));
        if (old_board) this.board = old_board;
        else
        {
            this.board = [];
            for (let i = 0; i < size; i++){
                let row = [];
                for (let j = 0; j < size; j++){
                    row.push(new Vertex());
                }                  
                this.board.push(row);
            }
        }
        this.turn = turn;
        if (score) this.score = score;
        else this.score = Object.fromEntries(this.names.map(name => [name, 0]));
        
    }
    

}