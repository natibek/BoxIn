import { useEffect, useState, useContext } from "react";
import { GameParamsCxt } from "./App";
import Board from "./game_logic";

export default function Game()
{
    const [ game, set_game ] = useState();
    const [ solved, set_solved ] = useState(false);
    const [ board, set_board ] = useState();
    const { game_params, set_game_params } = useContext(GameParamsCxt);

    useEffect(() => {
        if (game_params.size && game_params.num_players){
            let new_board = new Board( game_params.num_players, game_params.size );
    
            set_game( new_board );
            set_board( new Array(game_params.size ** 2))
            localStorage.setItem('board', JSON.stringify(new_board));
            // console.log('here')
            
        }
    }, [game_params])

    // useEffect(() => {        
    //     if (game) console.log(game.box_1d);
    // }, [game])

    const is_first_col = (ind) =>  ind % (game_params.size - 1) === 0;
    const is_last_row = (ind) => Math.floor(ind / (game_params.size - 1)) === (game_params.size - 2);


    return (
        <>
        <div className="flex_col_center w-75 h-75 p-5 position-relative" style={{width: 'fit-content', height: 'fit-content'}}>
            {
                game ? 
                    <div className="grid_display" style={{'--num-cols': game_params.size - 1}}>
                        { 
                            game.box_1d.map((name,ind) => (
                                <div key = {ind} className="box">
                                    { name ? name : '' }
                                    <div className="up"></div>
                                    <div className="right"></div>
                                    { is_first_col(ind) ? <div className="left"></div> : <></> }
                                    { is_last_row(ind) ? <div  className="down"></div> : <></> }
                                    

                                    <div className="top-right"></div>

                                    { is_first_col(ind) ? <div className="top-left"></div> : <></> }
                                    { is_last_row(ind) ?  <div className="bottom-right"></div>: <></>}
                                    { is_last_row(ind) && is_first_col(ind) ? <div className="bottom-left"></div>: <></>}

                                    
                                </div>
                            ))
                        }
                    </div>

                :
                    <></>

            }
        </div>
        </>
    );
}