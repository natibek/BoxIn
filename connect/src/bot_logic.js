class Node
{
    constructor(board, depth, value = 0)
    {
        this.board = board.copy();
        this.depth = depth;
        this.origin_move = null;
        this.value = value;
        
        this.children = [];

    }
}

class Bot
{

    constructor(strength)
    {
        this.strength = strength;
        this.level = [1, 2, 3][Number(strength)];
        this.head = null;
        
    }

    gen_tree(node, board)
    {
        if ( node.depth >= this.level || board.done)
        {
            return
        }

        for (const move of board.available_moves())
        {
            const [row, col, dir] = move;
            const p1 = (board.size * row) + col
            let p2;
    
            if (dir === "right") p2 = p1 + 1;
            else p2 = p1 + board.size;
            
            const temp_board = board.copy();
            temp_board.apply_move(p1, p2);
            
            const bot_score = node.value + (board.score["Bot"]/(node.depth + 1)) - board.score['You'];
            const new_node = new Node(temp_board, node.depth + 1, bot_score);
            new_node.origin_move = [p1, p2];
            node.children.push(new_node);
            this.gen_tree(new_node, temp_board);
        }
    }

    recommend_best(board)
    {
        console.log(this.level)
        if (this.level === 1)
        {
            let best_moves = [];
            let most_points = 0;
            let best_move;

            for (const available_move of board.available_moves())
            {
                const [row, col, dir] = available_move;
                const gained_points = board.simulate_move(row, col, dir);
                
                if ( gained_points > most_points )
                {
                    best_moves = [ [row, col, dir] ];
                    most_points = gained_points;
                }
                else if ( gained_points === most_points )
                {
                    best_moves.push([row, col, dir]);
                    
                }
            }

            if ( best_moves.length > 1) best_move = best_moves[Math.floor(Math.random() * best_moves.length)];
            else best_move = best_moves[0];

            const p1 = board.size * best_move[0] + best_move[1];
            let p2;
    
            if (best_move[2] === "right") p2 = p1 + 1;
            else p2 = p1 + board.size;

            return [p1, p2]; 
        }
        if (this.level !== 1)
        {
            this.head = new Node(board.copy(), 0);
            this.gen_tree(this.head, board.copy());
            
            console.log("FINISHED TREE");

            let high_scores = []

            for (const child of this.head.children){
                let stack = [child];
                let move_score = [];
    
                while ( stack.length > 0 )
                {
                    let node = stack.pop();
                    if (node.children.length === 0) {
                        move_score.push(node.value);
                    }
                    else stack = [...stack, ...node.children];
                }
                // console.log(child.origin_move, move_score, Math.max(...move_score))
                high_scores.push([child.origin_move, Math.max(...move_score)]);
            }
    
            // const best_move = high_scores.reduce((max, cur_move) => {
            //     if (cur_move[1] > max[1]) return cur_move;
            //     else return max;
            // }, high_scores[0]);

                        
            let max_score = high_scores[0][1];
            let max_moves = [];

            for (const move of high_scores){
                if (move[1] > max_score){
                    max_moves = [move];
                    max_score = move[1];
                } else if (move[1] == max_score){
                    max_moves.push(move)
                }
            }

            let best_move;

            if (max_moves.length > 1) best_move = max_moves[Math.floor(Math.random() * max_moves.length)];
            else best_move = max_moves[0] 
            console.log(best_move);
            return best_move[0];
        }

    }

}

export default Bot;
// module.exports = { Bot };
