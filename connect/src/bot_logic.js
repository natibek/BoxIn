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

export default class Bot
{

    constructor(strength)
    {
        this.strength = strength;
        this.level = [1, 3, 5][Number(strength)];
        this.head = null;
        
    }

    start_bot(board)
    {
        if (this.level === 1)
        {
            let most_points = 0;
            let best_move = null;
            let best_dir = null;

            for (const available_move of board.available_moves())
            {
                const [row, col, dir] = available_move;
                const gained_points = bot_board.simulate_move(row, col, dir);
                
                if ( gained_points >= most_points )
                {
                    best_move = [row, col];
                    best_dir = dir;
                    most_points = gained_points;
                }
            }

            const p1 = board.size * best_move[0] + best_move[1];
            let p2;
    
            if (best_dir === "right") p2 = p1 + 1;
            else p2 = p1 + board.size;

            return [p1, p2]; 
        }
        else 
        {
            this.head = new Node(board, this.level);
            this.gen_tree(this.head, board)

        }
    }


    gen_tree(node, board)
    {
        if ( node.depth >= this.level || board.done)
        {
            node.value = board.score['Bot'];
            return
        }

        for (const move of board.available_moves)
        {
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

    recommend_best()
    {
        let high_scores = []

        for (const child of this.head.children)
        {
            let stack = [child];
            let move_score = [];

            while (stack)
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


//         score = []
//         for child in self.head.children:
//             stack = [child]
//             move_score = []

//             while stack:
//                 node = stack.pop()

//                 if node.children == []:
//                     move_score.append(node.value)
//                 else:
//                     stack.extend(node.children)
//                     # extends stack to include more children nodes

//             score.append((child.move_made, max(move_score)))
//             # stores the max score and the valid move that led to that state

//         max_tuple = max(score, key=lambda x: x[1])
//         # uses lambda and max function to find the move that has the highest score
//         return max_tuple[0]