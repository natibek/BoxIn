
import { useState, useEffect, useContext } from "react";
import { GameParamsCxt, NewGameCxt } from "./App";

export default function NewGame()
{
    const [ num_players, set_num_players ] = useState(2);
    const [ size, set_size ] = useState(5);
    const [ temp_names, set_temp_names ] = useState(Array(2).fill(''));
    const { game_params, set_game_params } = useContext(GameParamsCxt);
    const { new_game, set_new_game } = useContext(NewGameCxt);

    const handleGameSetting = () => 
    {    
        localStorage.setItem('board', JSON.stringify(null));

        set_game_params({
            size: Number(size),
            num_players: Number(num_players),
            names: temp_names
        });

        set_new_game(false);
    };

    const handleNumInput = (e) => 
    {
        const input = e.target.value;
        set_num_players(input);
        set_temp_names( Array(Number(input)).fill('') );
        
        const offset = (30 * (0.5 - ((input - e.target.min)/ (e.target.max - e.target.min)) )) - 5;
        const pos = ((input - e.target.min)/ (e.target.max - e.target.min)) * 100;
        const display_element = document.getElementById("num_players_text");     

        display_element.style.left =  `calc(${pos}% + ${offset}px)`;
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

    const handleName = (e) => 
    {
        const ind = Number(e.target.id);
        const regex = /^[A-Z]$/;
        const input = e.target.value;

        if ((input.match(regex) && !temp_names.includes(input)) || input == '')  
        {   
            let temp = temp_names.slice(0);
            temp[ind] = input;
            set_temp_names( temp )
        }

    }

    return ( 
        <div className="flex_col_center bg-white shadow-lg gap_20 px-2 py-5 m-4 rounded border border-1 border-black" style={{minHeight : '150px', width : '400px'}}>               
        {/* <div className="flex_col_center gap_20 m-3">             */}
            <h3 className="text-center "> Game Setup </h3>
            
            <div className="input_div gap_10 d-flex flex-column position-relative">
                <div id = "num_players_text" className="slider_label text-center"> { num_players }</div>

                <h4 className="text-center fs-5">Number of players</h4>
                
                <input 
                    id="num_players_input" 
                    onChange={ handleNumInput } 
                    value={ num_players }
                    type="range" 
                    min="2" max="8" step="1" 
                    list="num_markers"/>

                <div className="legend">
                    <span className="legend_min"> | 2 </span>
                    <span className="legend_max">8 |</span>
                </div>
            </div>            

            <div className="flex_row_center gap_10 px-5 mb-3" style={{flexWrap: "wrap"}}>
                {
                    temp_names.map((name, ind ) => (
                        <input 
                            title= {`Letter to represent a player ${ind + 1}`}
                            placeholder= { ind + 1 }
                            value= { name ? name : "" }
                            id= { ind }
                            key= { ind }
                            onChange={ handleName }
                            className="text-center"
                            style={{ height: '45px', width: '45px' }}
                        />
                    ))
                }
            </div>   

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
                    <span className="legend_max">20 |</span>    
                </div>
            </div>            

            <button className="button bg-light-grey rounded px-5 py-2 mt-3" onClick={ handleGameSetting }>Play</button>        
        </div>                            
    );
}

{/*             
<ul hidden = { !warn_num && !warn_size } className="flex_col_start gap_20" style={{color: 'red'}}>
    <li hidden={ !warn_num }>Number of players should be between 2 and 8.</li>
    <li hidden={ !warn_size }>Size should be between 5 and 20.</li>
</ul> */}

{/* <input 
    title="Size should be between 5 and 20"
    placeholder="Size"
    value = {size}
    onChange = { handleSizeInput }
    className= {`text-center ${input_error_size ? 'shake': ''}`}
    style={{minWidth: '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
    /> */}

{/* <input 
    title="Number of players should be between 2 and 8"
    placeholder="Number of Players"
    value = { num_players }
    onChange = { handleNumInput }
    className= {`text-center ${input_error_num ? 'shake': ''}`}
    style={{minWidth : '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
    
    /> */}

// const [ input_error_size, set_input_error_size ] = useState(false);
// const [ input_error_num, set_input_error_num ] = useState(false);
// const [ warn_size, set_warn_size ] = useState(false);
// const [ warn_num, set_warn_num ] = useState(false);