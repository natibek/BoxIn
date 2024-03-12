
import { useState, useContext } from "react";
import { GameParamsCxt, NewBotCxt } from "./App";

export default function NewBot()
{
    const [ bot_strength, set_bot_strength ] = useState(1);
    const [ size, set_size ] = useState(5);
    const { game_params, set_game_params } = useContext(GameParamsCxt);
    const { new_bot, set_new_bot } = useContext(NewBotCxt);

    const handleGameSetting = () => 
    {    
        localStorage.setItem('bot', JSON.stringify(null));
        
        set_game_params({
                size: Number(size),
                bot_strength: Number(bot_strength)
        });

        set_new_bot(false);        
    };

    const handleSizeInput = (e) => 
    {
        const input = e.target.value;
        set_size(input);

        const offset = (32 * (0.5 - ((input - e.target.min)/ (e.target.max - e.target.min)))) - 7;
        const pos = ((input - e.target.min)/ (e.target.max - e.target.min)) * 100;
        const display_element = document.getElementById("size_text");     

        display_element.style.left =  `calc(${pos}% + ${offset}px)`;
    };

    return ( 
        <div className="flex_col_center bg-white shadow-lg gap_20 px-2 py-5 m-4 rounded border border-1 border-black" style={{minHeight : '150px', width : '400px'}}>               
            <h3 className="text-center "> Bot Setup </h3>
            
            <div className="input_div gap_10 d-flex flex-column position-relative">
                <h4 className="text-center fs-5">Bot Strength</h4>
                
                <input 
                    id="num_players_input" 
                    onChange={ (e) => { set_bot_strength(e.target.value) } } 
                    value={ bot_strength }
                    type="range" 
                    min="1" max="3" step="1" 
                    list="num_markers"/>

                <div className="legend">
                    <span className="legend_min"> Easy </span>
                    <span className="legend_min"> Medium </span>
                    <span className="legend_max"> Hard </span>
                </div>
            </div>             

            <br />
            <div className="input_div d-flex flex-column gap_10 position-relative">                
                <h4 className="text-center fs-5">Board Size</h4>

                <input 
                    id="size_input" 
                    onChange= { handleSizeInput }
                    value={ size }
                    type="range" 
                    min="5" max="20" step="1" 
                    list="size_markers"/>
                <div id = "size_text" className="slider_label"> { size } </div>

                <div className="legend">
                    <span className="legend_min">| 5</span>
                    <span className="legend_max">15 |</span>    
                </div>
            </div>            

            <button className="button bg-light-grey rounded px-5 py-2 mt-3" onClick={ handleGameSetting }>Play</button>        
        </div>                            
    );
}