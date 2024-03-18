
class Vertex {
    constructor(){
        
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        
    }
}

class Board{

    constructor(num_players, size, names, old_board = null, old_board_1d = null, turn = 1, score = null, done = null, winner = null)
    {
        this.num_players = num_players; 
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
        if (old_board_1d) this.box_1d = old_board_1d;
        else this.box_1d = new Array((size-1) * (size - 1)).fill(null);
        this.turn = turn;
        
        if (score) this.score = score;
        else this.score = Object.fromEntries(this.names.map(name => [name, 0]));
        
        if (done) this.done = done;
        else this.done = false;
        
        if (winner) this.winner = winner;
        else this.winner = [];
    }

    update_turn()
    {
        this.turn = this.turn === this.num_players ? 1 : this.turn += 1;
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


    is_box(pos1_mat, pos2_mat, simulating = false)
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
                if (left_boxed) {
                    let ind = row1 * (this.size - 1) + (col1 - 1);
                    this.box_1d[ind] = this.names[this.turn - 1];
                    state.push(ind)
                    // console.log('box left');
                    this.score[ this.names[this.turn - 1] ] += 1
                }
            }
            
            if (col1 !== this.size - 1 && col2 !== this.size - 1)
            {
                // check right
                right_boxed = this.board[row1][col1].right && this.board[row2][col2].right && this.board[row1][col1+1].down;
                if (right_boxed) {
                    let ind = row1 * (this.size - 1) + col1;
                    this.box_1d[ind] = this.names[this.turn - 1];
                    state.push(ind)
                    // console.log('box right');
                    this.score[ this.names[this.turn - 1] ] += 1

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
                    this.box_1d[ind] = this.names[this.turn - 1];
                    state.push(ind);
                    // console.log('box up')
                    this.score[ this.names[this.turn - 1] ] += 1

                }

            }
            if (row1 !== this.size - 1 && row2 !== this.size - 1)
            {
                // check down
                down_boxed = this.board[row1][col1].down && this.board[row2][col2].down && this.board[row1+1][col1].right
                if (down_boxed) {
                    let ind = row1 * (this.size - 1) + col1
                    this.box_1d[ind] = this.names[this.turn - 1];
                    state.push(ind);
                    // console.log('box down')
                    this.score[ this.names[this.turn - 1] ] += 1
                }
            }

            if (up_boxed || down_boxed) return state;
            return false;
        }
    }

    is_completed()
    {
        let total = 0;

        Object.entries(this.score).forEach(([key, value])=> {
            total += value
        });
        // console.log(total)
        // console.log((this.size - 1)**2, "TOTAL")
        
        return total === ((this.size - 1) ** 2);
    }

    apply_move(pos1, pos2)
    {
        const [row1, col1] = this.location(pos1);
        const [row2, col2] = this.location(pos2);

        if (this.legal_move([row1, col1], [row2, col2])) 
        {
            if(this.is_vert([row1, col1], [row2, col2]))
            {
                this.board[row1][col1].down = this.turn;
                this.board[row2][col2].up = this.turn;
            }
            else
            {
                this.board[row1][col1].right = this.turn;
                this.board[row2][col2].left = this.turn;
            }
        }
        else return false;
        
        const state = this.is_box([row1, col1], [row2, col2]);
        if (!state) this.update_turn();

        this.done = this.is_completed();
        
        if (this.done)
        {
            let max = 0;
            
            Object.entries(this.score).forEach(([key, value]) => {
                if (value > max) 
                {
                    this.winner = [key];
                    max = value;
                }
                else if (value === max) this.winner.push(key);
            })
        }

        return state;
    }
    
    copy()
    {
        return new Board(this.num_players, this.size, this.names, this.board, this.old_board_1d, this.turn, this.score, this.done, this.winner);
    }

    simulate_move(row, col, dir)
    {
        if ( dir === "right" )
        {
            console.assert(col < this.size - 1);
            let gained_points = 0;
            
            if ( row > 0 && (this.board[row][col].up && this.board[row][col + 1].up && this.board[row-1][col].right)) gained_points += 1;
            // check up
            if ( row < this.size - 1 && (this.board[row][col].down && this.board[row][col + 1].down && this.board[row+1][col].right)) gained_points += 1;
            // check down
            return gained_points;
        }
        
        if ( dir === "down" )
        {
            console.assert(row < this.size - 1);
            let gained_points = 0;
            
            if ( col > 0 && (this.board[row][col].left && this.board[row + 1][col].left && this.board[row][col - 1].down)) gained_points += 1;
            // check left
            if ( col < this.size - 1 && (this.board[row][col].right && this.board[row + 1][col].right && this.board[row][col + 1].down)) gained_points += 1;
            // check right
            return gained_points;
        }
    }

    available_moves()
    {
        const move_dirs = []

        // if not the last col, check right
        // if not the last row, check down

        for( let row = 0; row < this.size; row++ )
        {
            for ( let col = 0; col < this.size; col++)
            {
                if (col < this.size - 1)
                {
                    if (!this.board[row][col].right && !this.board[row][col + 1].left) move_dirs.push([row, col, 'right']);
                }
                if (row < this.size - 1)
                {
                    if (!this.board[row][col].down && !this.board[row + 1][col].up) move_dirs.push([row, col, 'down']);
                }
            }
        }
        // console.log(move_dirs);
        return move_dirs;
    }

}

module.exports = { Board };