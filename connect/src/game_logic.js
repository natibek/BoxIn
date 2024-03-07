
class Vertex {
    constructor(){
        
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        
    }
}

export default class Board{

    constructor(num_players, size, old_board = null, old_board_1d = null, turn = 1)
    {
        this.num_players = num_players; 
        this.size = size;
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
        if (old_board_1d) this.box_1d = old_board_1d;
        else this.box_1d = new Array((size-1) * (size - 1)).fill(null);
        // this.box = []
        // for (let i = 0; i < size - 1; i++){
        //     let row = [];
        //     for (let j = 0; j < size -1; j++){
        //         row.push(null);
        //     }                  
        //     this.box.push(row);
        // }
        this.turn = turn;
        
        // console.log("Board", this.board)
        // console.log("Box", this.box)
        // console.log("Num Players", this.num_players)
        // console.log("Turn", this.turn)

    }

    update_turn()
    {
        this.turn = this.turn === this.num_players ? 1 : this.turn += 1;
        console.log("change turn");
    }

    legal_move(pos1_mat, pos2_mat)
    {
        const [row1, col1] = pos1_mat;
        const [row2, col2] = pos2_mat;
        
        if(this.is_vert(pos1_mat, pos2_mat)) return !this.board[row1][col1].down && !this.board[row2][col2].up;
        if(this.is_hori(pos1_mat, pos2_mat)) return !this.board[row1][col1].right && !this.board[row2][col2].left;

        return false;
 
    }

    location(pos)
    {
        // console.log([Math.floor(pos/this.size) , pos % this.size], "pos")
        return [Math.floor(pos/this.size) , pos % this.size]
    }

    is_hori(pos1_mat, pos2_mat)
    {
        const [row1, col1] = pos1_mat;
        const [row2, col2] = pos2_mat;

        return Math.abs(col1 - col2) === 1;
    }

    is_vert(pos1_mat, pos2_mat)
    {
        const [row1, col1] = pos1_mat;
        const [row2, col2] = pos2_mat;

        return Math.abs(row1 - row2) === 1;
    }


    is_box(pos1_mat, pos2_mat)
    {
        const [row1, col1] = pos1_mat;
        const [row2, col2] = pos2_mat;
        let state = []
        if(this.is_vert(pos1_mat, pos2_mat))
        {
            let left_boxed = false; 
            let right_boxed = false;
            
            if (col1 !== 0 && col2 !==0)
            {
                // check left
                left_boxed = this.board[row1][col1].left && this.board[row2][col2].left && this.board[row1][col1-1].down;
                // console.log(left_boxed, "left")
                if (left_boxed) {
                    let ind = row1 * (this.size - 1) + (col1 - 1);
                    this.box_1d[ind] = this.turn;
                    // this.box[row1][col1-1] = this.turn;
                    state.push(ind)
                    console.log('box left');
                }
            }
            
            if (col1 !== this.size - 1 && col2 !== this.size - 1)
            {
                // check right
                right_boxed = this.board[row1][col1].right && this.board[row2][col2].right && this.board[row1][col1+1].down;
                // console.log(right_boxed, "right")
                if (right_boxed) {
                    let ind = row1 * (this.size - 1) + col1;
                    this.box_1d[ind] = this.turn;

                    // this.box[row1][col1] = this.turn;
                    state.push(ind)
                    console.log('box right');
                
                }

            }
            if (left_boxed || right_boxed) return state;
            return false;
        } 

        else if(this.is_hori(pos1_mat, pos2_mat))
        {
            let up_boxed = false;
            let down_boxed = false;
            if (row1 !== 0 && row2 !==0)
            {
                // check up
                up_boxed = this.board[row1][col1].up && this.board[row2][col2].up && this.board[row1-1][col1].right;
                if (up_boxed) {
                    let ind = (row1-1) * (this.size - 1) + col1
                    this.box_1d[ind] = this.turn;
                    // this.box[row1-1][col1] = this.turn;
                    state.push(ind);
                    console.log('box up')
                    
                }

            }
            if (row1 !== this.size - 1 && row2 !== this.size - 1)
            {
                // check down
                down_boxed = this.board[row1][col1].down && this.board[row2][col2].down && this.board[row1+1][col1].right
                if (down_boxed) {
                    let ind = row1 * (this.size - 1) + col1
                    this.box_1d[ind] = this.turn;
                    // this.box[row1][col1] = this.turn;
                    state.push(ind);
                    console.log('box down')
                }

            }

            if (up_boxed || down_boxed) return state;
            return false;
        }
    }

    apply_move(pos1, pos2)
    {
        const [row1, col1] = this.location(pos1)
        const [row2, col2] = this.location(pos2)

        console.log(row1, col1)
        console.log(row2, col2)

        if (this.legal_move([row1, col1], [row2, col2])) 
        {
            if(this.is_vert([row1, col1], [row2, col2]))
            {
                this.board[row1][col1].down = true;
                this.board[row2][col2].up = true;
            }
            else
            {
                this.board[row1][col1].right = true;
                this.board[row2][col2].left = true;
            }
        }
        else return false;
        
        const state = this.is_box([row1, col1], [row2, col2]);
        if (!state) this.update_turn();
        return state;
    }

}