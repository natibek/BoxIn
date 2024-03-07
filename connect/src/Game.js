import { useEffect, useState, useContext } from "react";
import { GameParamsCxt } from "./App";
import Board from "./game_logic";
import { useNavigate } from "react-router-dom";

export default function Game()
{
    const [ game, set_game ] = useState();
    const { game_params, set_game_params } = useContext(GameParamsCxt);
    const navigate = useNavigate();


    useEffect(() => {
        const cached = JSON.parse(localStorage.getItem('board'));
        console.log(game_params, cached)
        if ( cached )
        {
            console.log("CACHED")
            set_game_params( {size: cached.size, num_players: cached.num_players} );

            const new_board = new Board(cached.num_players, cached.size, cached.board, cached.box_1d, cached.turn)
            set_game( new_board );
            setTimeout(() => {
                console.log('wait')
                console.log( new_board , game)
            }, 100);
        }
        else if (game_params.size && game_params.num_players){
            let new_board = new Board( game_params.num_players, game_params.size );
            set_game( new_board );
            localStorage.setItem('board', JSON.stringify(new_board));
            console.log('NEW GAME')
            
        }
    }, [])

    const is_first_col = (ind) =>  ind % (game_params.size - 1) === 0;
    const is_last_row = (ind) => Math.floor(ind / (game_params.size - 1)) === (game_params.size - 2);
    
    const get_row_col = (ind, side) => {
        let pos1, pos2;
        const row_inner = Math.floor(ind / (game_params.size - 1));
        const col_inner = ind % (game_params.size - 1);

        switch(side){
            case 'up':
                pos1 = ind + row_inner;
                pos2 = pos1 + 1;
                break;
            case "down":
                pos1 = ind + row_inner + game_params.size;
                pos2 = pos1 + 1;    
                break;
            case "right":
                pos1 = ind + 1 + row_inner;
                pos2 = pos1 + game_params.size;
                break;
            case "left":
                pos1 = ind + row_inner;
                pos2 = pos1 + game_params.size;
                break;
        }

        const row1 = Math.floor(pos1 / (game_params.size))
        const col1 = pos1 % (game_params.size)
        
        return [pos1, pos2, row1, col1]
    }

    const handleClick = (e) => {
        const bar = e.target;
        
        if (bar.style.backgroundColor === "")
        {
            const ind = Number(e.target.parentNode.id);
            
            let [pos1, pos2, ..._] = get_row_col(ind, bar.className)

            console.log(pos1, pos2, "pos");
            const state = game.apply_move(pos1, pos2);
            localStorage.setItem('board', JSON.stringify(game));

            bar.style.backgroundColor = 'rgb(107, 170, 255)';
            bar.style.borderStyle = 'none';

            if (typeof state === 'object')  
            {   
                if (state.length > 0)
                {
                    for (let close_dir of state)
                    {
                        const text = document.createTextNode(String(game.turn));
                        document.getElementById(String(close_dir)).appendChild(text);                            
                    }
                }

            }

        }

    };

    return (
        <>
        <div className="flex_col_center p-5" style={{width: 'fit-content', height: 'fit-content'}}>
            {
                game ? 
                    <div className="grid_display" style={{'--num-cols': game_params.size - 1}}>
                        { 
                            game.box_1d.map((name,ind) => (
                                <div key = {ind} id={ind} className="box flex_col_center">
                                    { name ? name : '' }
                                    <div onClick={handleClick} className="up" 
                                        style={{
                                            backgroundColor: `${ game.board[get_row_col(ind, "up")[2]][get_row_col(ind, "up")[3]].right ? 'rgb(107, 170, 255)': ''}`, 
                                            borderStyle: `${game.board[get_row_col(ind, "up")[2]][get_row_col(ind, "up")[3]].right ? 'none': 'dashed'}`}}></div>

                                    <div onClick={handleClick} className="right" 
                                        style={{
                                            backgroundColor: `${game.board[get_row_col(ind, "right")[2]][get_row_col(ind, "right")[3]].down ? 'rgb(107, 170, 255)': ''}`,  
                                            borderStyle: `${game.board[get_row_col(ind, "right")[2]][get_row_col(ind, "right")[3]].down ? 'none': 'dashed'}`}}></div>
                                    
                                    { is_first_col(ind) ? <div onClick={handleClick} className="left" 
                                        style={{
                                            backgroundColor: `${game.board[get_row_col(ind, "left")[2]][get_row_col(ind, "left")[3]].down ? 'rgb(107, 170, 255)': ''}`, 
                                            borderStyle: `${game.board[get_row_col(ind, "left")[2]][get_row_col(ind, "left")[3]].down ? 'none': 'dashed'}`}}></div> : <></> }

                                    { is_last_row(ind) ? <div  onClick={handleClick} className="down"  
                                         style={{
                                            backgroundColor: `${game.board[get_row_col(ind, "down")[2]][get_row_col(ind, "down")[3]].right ? 'rgb(107, 170, 255)': ''}`,  
                                            borderStyle: `${game.board[get_row_col(ind, "down")[2]][get_row_col(ind, "down")[3]].right ? 'none': 'dashed'}`}}></div> : <></> }

                                    <div className="top-right"></div>

                                    { is_first_col(ind) ? <div className="top-left"></div> : <></> }
                                    { is_last_row(ind) ?  <div className="bottom-right"></div>: <></>}
                                    { is_last_row(ind) && is_first_col(ind) ? <div className="bottom-left"></div>: <></>}

                                    
                                </div>
                            ))
                        }
                    </div>

                :
                    
                    <button onClick={() => { navigate('/new') }} className="button bg-off-white p-4 rounded shadow-lg">Create New Game</button>

            }
        </div>
        </>
    );
}