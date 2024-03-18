class Node
{
    constructor(board, depth)
    {
        this.board = board;
        this.depth = depth;
        this.origin_move = null;
        this.value = null;
        
        this.children = [];

    }
}

class Bot
{

    constructor(strength)
    {
        this.strength = strength;
        this.level = [1, 3, 5][Number(strength)];
        this.head = null;
        
    }

    gen_tree(node, board)
    {
        if ( node.depth >= this.level || board.done)
        {
            node.value = board.score['Bot'];
            console.log("END", node.value)
            console.log("SCORE", board.score)
            return
        }

        for (const move of board.available_moves())
        {
            console.log("MOVES", move)
            const [row, col, dir] = move;
            const p1 = board.size * row + col
            let p2;
    
            if (dir === "right") p2 = p1 + 1;
            else p2 = p1 + board.size;
            
            const temp_board = board.copy();
            temp_board.apply_move(p1, p2);
            
            const new_node = new Node(temp_board, node.depth + 1);
            
            new_node.origin_move = [p1, p2];
            
            node.children.push(new_node);

            this.gen_tree(new_node, temp_board);
        }
    }

    recommend_best(board)
    {
        if (this.level === 1)
        {
            let best_moves = [];
            let most_points = 0;
            let best_dir = null;
            let best_move;

            for (const available_move of board.available_moves())
            {
                const [row, col, dir] = available_move;
                const gained_points = board.simulate_move(row, col, dir);
                
                if ( gained_points > most_points )
                {
                    best_moves = [ [row, col] ];
                    best_dir = dir;
                    most_points = gained_points;
                }
                else if ( gained_points === most_points )
                {
                    best_moves.push([row, col]);
                    best_dir = dir;
                }
            }

            if ( best_moves.length > 1) best_move = best_moves[Math.floor(Math.random() * best_moves.length)];
            else best_move = best_moves[0]

            console.log("MOVES", best_moves);
            console.log("BEST MOVE", best_move);

            const p1 = board.size * best_move[0] + best_move[1];
            let p2;
    
            if (best_dir === "right") p2 = p1 + 1;
            else p2 = p1 + board.size;

            return [p1, p2]; 
        }
        else
        {
            this.head = new Node(board, 0);
            this.gen_tree(this.head, board);
            
            console.log("FINISHED TREE");

            let high_scores = []

            for (const child of this.head.children)
            {
                let stack = [child];
                let move_score = [];
    
                while ( stack.length > 0 )
                {
                    let node = stack.pop();
                    if (node.children.length === 0) move_score.push(node.score);
                    else stack = [...stack, ...node.children];
                }
    
                high_scores.push([child.origin_move, Math.max(move_score)]);
            }
    
        
            const best_move = high_scores.reduce((max, cur_move) => {
                if (cur_move[1] > max[1]) return cur_move;
                else return max;
    
              }, high_scores[0]);
    
            return best_move[0];
        }

    }

}

module.exports = { Bot };
