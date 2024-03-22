import { useContext, useEffect, useState } from "react";
import { BotParamsCxt, NewBotCxt } from "./App";
import Bot from "./bot_logic";
import Board from "./game_logic";

const colorScheme = [ "rgb(107, 170, 255)", "#EEE8A9" ];

const r = document.querySelector(':root');

export default function BotGame()
{
    const { bot_params, set_bot_params } = useContext(BotParamsCxt);
    const { new_bot, set_new_bot } = useContext(NewBotCxt);
    const [ game, set_game ] = useState();
    const [ bot, set_bot ] = useState();

    useEffect(() => {
        const cached = JSON.parse(localStorage.getItem('bot_board'));
        const bot_strength = JSON.parse(localStorage.getItem('bot_strength'));
        console.log(bot_params, cached)

        if ( cached )
        {
            set_bot_params( {size: cached.size, bot_strength: cached.bot_strength} );

            const new_board = new Board(2, cached.size, ["You", "Bot"], cached.board, cached.box_1d, cached.turn, cached.score, cached.done, cached.winner);
            set_game( new_board );

            set_bot( new Bot(bot_strength) );

            r.style.setProperty('--hover-color', colorScheme[cached.turn - 1]);

            setTimeout(() => {
                if (new_board.done){
                    if ( new_board.winner.length > 1 )
                    { 
                        const winners = new_board.winner.join(', ')
                        document.getElementById("turn").textContent = "Tie between: " + winners;
                    }
                    else if ( new_board.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + new_board.winner;
                    
                } 
                else if (new_board.turn === 1)
                {
                    document.getElementById("turn").textContent = new_board.names[new_board.turn - 1];
                    bot_move();
                    r.style.setProperty('--hover-color', colorScheme[cached.turn - 1]);
                    localStorage.setItem('bot_board', JSON.stringify(new_board));   
                }
                else document.getElementById("turn").textContent = new_board.names[new_board.turn - 1];
                

            }, 100);

            console.log('CACHED BOT GAME');
        }
        else if (bot_params.size)
        {
            console.log("HERE")
            const new_board = new Board( 2, bot_params.size, ["You", "Bot"] );
            set_game( new_board );
            set_bot( new Bot(bot_params.bot_strength) );

            r.style.setProperty('--hover-color', colorScheme[0]);
            localStorage.setItem('bot_board', JSON.stringify(new_board));
            localStorage.setItem('bot_strength', JSON.stringify(bot_params.bot_strength));   
            setTimeout(() => {
                document.getElementById("turn").textContent = new_board.names[new_board.turn - 1];
            }, 100);

            console.log('NEW BOT GAME');            
        }
        else set_new_bot( true );

    }, []);

    const is_first_col = (ind) =>  ind % (bot_params.size - 1) === 0;
    const is_last_row = (ind) => Math.floor(ind / (bot_params.size - 1)) === (bot_params.size - 2);
    
    function bot_move()
    {
        if (bot)
        {
            const [ p1, p2 ] = bot.recommend_best(game);
            const state = game.apply_move(p1, p2);

            if (state.length > 0)  
            {   
                for (let close_dir of state)
                {
                    const text = document.createTextNode(game.names[game.turn - 1]);
                    document.getElementById(String(close_dir)).appendChild(text);      
                }
                
            }
            
            localStorage.setItem('bot_board', JSON.stringify(game));

            // console.log("HERE", p1, p2);
    
            const [row1, col1] = game.location(p1);
            const [row2, col2] = game.location(p2);
    
            // console.log(row1, col1)
            // console.log(row2, col2)
    
            if (game.is_vert([row1, col1], [row2, col2]))
            {
                let ind, class_name;
    
  
                if (col1 === game.size - 1)
                {
                    ind = (row1) * (game.size - 1) + (col1 - 1);
                    class_name = "right";
                }
                else if (col1 === game.size - 2)
                {
                    ind = (row1) * (game.size - 1) + (col1 - 1);
                    class_name = "right";
                }
                else if (col1 > 0) 
                {
                    ind = (row1 * (game.size - 1)) + (col1 - 1);
                    class_name = 'right';
                }
                else 
                {
                    ind = (row1 * (game.size - 1)) + col1;
                    class_name = 'left';
                }
                const center = document.getElementById(String(ind));
                // console.log(ind, class_name, center);
                // console.log(center.childNodes)
    
                for (const child of center.childNodes)
                {
                    if (child.className === class_name)
                    {
                        child.style.backgroundColor = colorScheme[1];
                        child.style.borderStyle = 'none';
                        break;
                    }
                }
            }
            else
            {
                let ind, class_name;
    
                if (row1 !== game.size - 1) // not the last column
                {
                    ind = (row1 * (game.size - 1)) + col1;
                    class_name = 'up';
                }
                else
                {
                    ind = (row1 - 1) * (game.size - 1) + (col1);
                    class_name = "down";
                }
                const center = document.getElementById(String(ind));
                // console.log(ind, class_name, center);
                // console.log(center.childNodes)
    
                for (const child of center.childNodes)
                {
                    if (child.className === class_name)
                    {
                        child.style.backgroundColor = colorScheme[1];
                        child.style.borderStyle = 'none';
                        break;
                    }
                }
            }
    
            if (game.done){
                if ( game.winner.length > 1 )
                { 
                    const winners = game.winner.join(', ')
                    document.getElementById("turn").textContent = "Tie between: " + winners;
                }
                else if ( game.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + game.winner;
                
            } 
            else if (game.turn === 2) 
            {
                setTimeout(() => {
                    bot_move();                    
                }, 1000);
            }
            else 
            {
                document.getElementById("turn").textContent = game.names[0];
                r.style.setProperty('--hover-color', colorScheme[0]);
                console.log("scores", game.done, game.score);
            }
        }

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
        
        if (bar.style.backgroundColor === "" && game.turn === 1)
        {
            const ind = Number(e.target.parentNode.id);
            
            let [pos1, pos2, ..._] = get_row_col(ind, bar.className)

            bar.style.backgroundColor = colorScheme[game.turn - 1];
            bar.style.borderStyle = 'none';

            const state = game.apply_move(pos1, pos2);
            localStorage.setItem('bot_board', JSON.stringify(game));

            if (state.length > 0)    
            {   
                for (let close_dir of state)
                {
                    const text = document.createTextNode(game.names[game.turn - 1]);
                    document.getElementById(String(close_dir)).appendChild(text);      
                }
                
            }

            console.log("scores", game.done, game.score);
            if (game.done){
                if ( game.winner.length > 1 )
                { 
                    const winners = game.winner.join(', ')
                    document.getElementById("turn").textContent = "Tie between: " + winners;
                }
                else if ( game.winner.length == 1) document.getElementById("turn").textContent = "Winner: " + game.winner;
                
            } 
            else if (game.turn === 2)
            {
                document.getElementById("turn").textContent = game.names[game.turn - 1];
                r.style.setProperty('--hover-color', colorScheme[1]);
                setTimeout(() => {
                    bot_move();
                }, 1000);

                localStorage.setItem('bot_board', JSON.stringify(game));
            }
            else 
            {
                document.getElementById("turn").textContent = game.names[game.turn - 1];
                r.style.setProperty('--hover-color', colorScheme[0]);
            }
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