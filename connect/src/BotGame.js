import { useContext, useState } from "react";
import { BotParamsCxt, NewBotCxt } from "./App";
import Bot from "./Bot";

const colorScheme = [ "rgb(107, 170, 255)", "#EEE8A9" ];

const r = document.querySelector(':root');

export default function BotGame()
{
    const { bot_params, set_bot_params } = useContext(BotParamsCxt);
    const { new_bot, set_new_bot } = useContext(NewBotCxt);
    const [ game, set_game ] = useState();
    const [ bot, set_bot ] = useState();

    useEffect(() => {
        const cached = JSON.parse(localStorage.getItem('bot'));
        console.log(bot_params, cached)

        if ( cached )
        {
            set_bot_params( {size: cached.size, bot_strength: cached.bot_strength} );

            const new_board = new Board(2, cached.size, ["Player", "Bot"], cached.board, cached.box_1d, cached.turn);
            set_game( new_board );

            set_bot( new Bot(cached.bot_strength) );

            r.style.setProperty('--hover-color', colorScheme[cached.turn - 1]);

            setTimeout(() => {
                document.getElementById("turn").textContent = cached.names[cached.turn - 1];
            }, 100);
            console.log('CACHED GAME');
        }
        else if (bot_params.size && bot_params.bot_strength)
        {
            let new_board = new Board( 2, bot_params.size, ["Player", "Bot"] );
            set_game( new_board );

            set_bot( new Bot(bot_params.bot_strength) );

            r.style.setProperty('--hover-color', colorScheme[0]);
            localStorage.setItem('bot', JSON.stringify(new_board));

            setTimeout(() => {
                if (game.solved){
                    if ( game.winner.length > 1 )
                    { 
                        const winners = game.winner.join(', ')
                        document.getElementById("turn").textContent = "Tie between: " + game.winner;
                    }
                    else if ( game.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + game.winner;
                    
                } 
                else document.getElementById("turn").textContent = game.names[game.turn - 1];

            }, 100);
            console.log('NEW GAME');            
        }
        else set_new_bot( true );

    }, []);

    // useEffect(() => {

    //     set_game(null);
    //     if (bot_params.size && bot_params.bot_strength)
    //     {
    //         let new_board = new Board( 2, bot_params.size, ["Player", "Bot"] );

    //         set_game( new_board );
    //         r.style.setProperty('--hover-color', colorScheme[0]);

    //         localStorage.setItem('bot', JSON.stringify(new_board));
    //         setTimeout(() => {
    //             if (game.solved){
    //                 if ( game.winner.length > 1 )
    //                 { 
    //                     const winners = game.winner.join(', ')
    //                     document.getElementById("turn").textContent = "Tie between: " + game.winner;
    //                 }
    //                 else if ( game.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + game.winner;
                    
    //             } 
    //             else document.getElementById("turn").textContent = game.names[game.turn - 1];

    //         }, 100);          
    //     }
    //     else set_new_bot( true );

    // }, [bot_params]);

    const is_first_col = (ind) =>  ind % (bot_params.size - 1) === 0;
    const is_last_row = (ind) => Math.floor(ind / (bot_params.size - 1)) === (bot_params.size - 2);
    
    const bot_move = () => {
        const move = bot.bet_move();
    }

    const get_row_col = (ind, side) => {
        let pos1, pos2;
        const row_inner = Math.floor(ind / (bot_params.size - 1));
        const col_inner = ind % (bot_params.size - 1);

        switch(side){
            case 'up':
                pos1 = ind + row_inner;
                pos2 = pos1 + 1;
                break;
            case "down":
                pos1 = ind + row_inner + bot_params.size;
                pos2 = pos1 + 1;    
                break;
            case "right":
                pos1 = ind + 1 + row_inner;
                pos2 = pos1 + bot_params.size;
                break;
            case "left":
                pos1 = ind + row_inner;
                pos2 = pos1 + bot_params.size;
                break;
        }

        const row1 = Math.floor(pos1 / (bot_params.size))
        const col1 = pos1 % (bot_params.size)
        
        return [pos1, pos2, row1, col1]
    };

    const handleClick = (e) => {
        const bar = e.target;
        
        if (bar.style.backgroundColor === "")
        {
            const ind = Number(e.target.parentNode.id);
            
            let [pos1, pos2, ..._] = get_row_col(ind, bar.className)

            console.log(pos1, pos2, "pos");

            bar.style.backgroundColor = colorScheme[game.turn - 1];
            bar.style.borderStyle = 'none';

            const state = game.apply_move(pos1, pos2);
            localStorage.setItem('board', JSON.stringify(game));
            r.style.setProperty('--hover-color', colorScheme[game.turn - 1])

            if (typeof state === 'object' && state.length > 0)  
            {   
                for (let close_dir of state)
                {
                    console.log(bot_params.names[game.turn - 1], "BOX")
                    const text = document.createTextNode(game.names[game.turn - 1]);
                    document.getElementById(String(close_dir)).appendChild(text);      
                }
                
            }

            console.log("scores", game.solved, game.score);
            if (game.solved){
                if ( game.winner.length > 1 )
                { 
                    const winners = game.winner.join(', ')
                    document.getElementById("turn").textContent = "Tie between: " + game.winner;
                }
                else if ( game.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + game.winner;
                
            } 
            else document.getElementById("turn").textContent = game.names[game.turn - 1];
        }
    };

    const is_connected = (ind, dir) => 
    {
        switch(dir)
        {
            case "up":
            case "down":
                return game.board[get_row_col(ind, dir)[2]][get_row_col(ind, dir)[3]].right;

            case "left":
            case "right":
                return game.board[get_row_col(ind, dir)[2]][get_row_col(ind, dir)[3]].down;
        }
    };

    return (
        <div className="flex_col_center p-5 bg-off-white" style={{width: 'fit-content', height: 'fit-content'}}>
            
            <div className="p-3 fs-2" id="turn"> </div>

            <div className="grid_display p-5 rounded shadow-lg border border-1 border-black" style={{'--num-cols': bot_params.size - 1}}>
                
                {   game ?
                    game.box_1d.map((name,ind) => (
                        <div key = {ind} id={ind} className="box flex_col_center">
                            { name ? name : '' }
                            <div onClick={handleClick} className="up" 
                                style={{
                                    backgroundColor: `${ is_connected(ind, "up") ? colorScheme[is_connected(ind, "up") - 1] : ''}`, 
                                    borderStyle: `${is_connected(ind, "up") ? 'none': 'dashed'}`}}></div>

                            <div onClick={handleClick} className="right" 
                                style={{
                                    backgroundColor: `${is_connected(ind, "right") ? colorScheme[is_connected(ind, "right") - 1]: ''}`,  
                                    borderStyle: `${is_connected(ind, "right") ? 'none': 'dashed'}`}}></div>
                            
                            { is_first_col(ind) ? <div onClick={handleClick} className="left" 
                                style={{
                                    backgroundColor: `${is_connected(ind, "left") ? colorScheme[is_connected(ind, "left") - 1]: ''}`, 
                                    borderStyle: `${is_connected(ind, "left") ? 'none': 'dashed'}`}}></div> : <></> }

                            { is_last_row(ind) ? <div  onClick={handleClick} className="down"  
                                    style={{
                                    backgroundColor: `${ is_connected(ind, "down") ? colorScheme[is_connected(ind, "down") - 1]: ''}`,  
                                    borderStyle: `${ is_connected(ind, "down") ? 'none': 'dashed'}`}}></div> : <></> }

                            <div className="top-right"></div>

                            { is_first_col(ind) ? <div className="top-left"></div> : <></> }
                            { is_last_row(ind) ?  <div className="bottom-right"></div>: <></>}
                            { is_last_row(ind) && is_first_col(ind) ? <div className="bottom-left"></div>: <></>}

                            
                        </div>
                    ))
                    : <></>
                }
            </div>
    
        </div>
    );
}