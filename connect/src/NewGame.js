
import Footer from "./Footer";
import Nav from "./Nav";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameParamsCxt } from "./App";

export default function NewGame()
{
    const [ num_players, set_num_players ] = useState("");
    const [ size, set_size ] = useState("");
    const [ input_error_size, set_input_error_size ] = useState(false);
    const [ input_error_num, set_input_error_num ] = useState(false);
    const [ warn_size, set_warn_size ] = useState(false);
    const [ warn_num, set_warn_num ] = useState(false);
    const [ temp_names, set_temp_names ] = useState([]);

    const { game_params, set_game_params } = useContext(GameParamsCxt);
    const navigate = useNavigate();

    
    const handleGameSetting = () => 
    {    
        if (Number(size) >= 5 && Number(size) <= 20 && Number(num_players) >= 2 && Number(num_players) <= 8)
        {   
            set_game_params(
                (prev) => 
                ({
                    ...prev,
                    size: Number(size),
                    num_players: Number(num_players),
                    names: temp_names
                })
            );
            
            localStorage.setItem('board', JSON.stringify(null));
            setTimeout(() => {
                navigate('/play');                
            }, 100);
        }
        else 
        {
            const regex=/^[0-9]+$/;

            set_input_error_size((!size.match(regex) || Number(size) < 5 || Number(size) > 20));
            set_warn_size((!size.match(regex) || Number(size) < 5 || Number(size) > 20))
            set_input_error_num((!num_players.match(regex) || Number(num_players) < 2 || Number(num_players) > 8));
            set_warn_num((!num_players.match(regex) || Number(num_players) < 2 || Number(num_players) > 8))

            setTimeout(() => {
                set_input_error_num(false);
                set_input_error_size(false)                
            }, 500);

        }
    }
    

    const handleNumInput = (e) => 
    {
        const regex=/^[0-9]+$/;
        const input = e.target.value;

        if (input.match(regex)|| input === '') 
        {
            set_num_players(input)
            if (Number(input) >= 2 && Number(input) <= 8) set_temp_names( Array(Number(input)).fill('') )
            else set_game_params((prev) => ({ ...prev, names: []}))
        }; 
    };

    const handleSizeInput = (e) => 
    {
        const regex=/^[0-9]+$/;
        if (e.target.value.match(regex) || e.target.value === '') set_size(e.target.value); 
    };

    const handleName = (e) => 
    {
        const ind = Number(e.target.id);
        const regex = /^^[A-Z]$/;
        const input = e.target.value;
        console.log('name', input, input.match(regex));

        if ((input.match(regex) || input === '') && !temp_names.includes(input)) 
        {   
            let temp = temp_names.slice(0);
            temp[ind] = input;
            set_temp_names( temp )
        }

    }

    return (
        // <div className="flex_col_center bg-off-white" style={{minHeight: "100%"}}>
        //     <Nav  page={"Play"} />
            
        //     <div className="flex_col_center" style={{width: "100%", flexGrow: 1}}>       
                <div className="flex_col_center bg-white shadow-lg gap_20 px-2 py-5 m-4 rounded border border-1 border-black" style={{minHeight : '150px', width : '400px'}}>            
                    
                    <h3 className="text-center">Game Setup</h3>

                    <input 
                        title="Number of players should be between 2 and 8"
                        placeholder="Number of Players"
                        value = { num_players }
                        onChange = { handleNumInput }
                        className= {`text-center ${input_error_num ? 'shake': ''}`}
                        style={{minWidth : '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                        
                        />
                    
                    {
                        temp_names.length > 0
                        ? 
                            <div className="flex_row_center gap_10 px-5 mb-3" style={{flexWrap: "wrap"}}>
                                {
                                    temp_names.map((name, ind ) => (
                                        <input 
                                            title= {`Letter to represent a player ${ind + 1}`}
                                            placeholder= { ind + 1 }
                                            value= { name }
                                            id= { ind }
                                            key= { ind }
                                            onChange={ handleName }
                                            className="text-center"
                                            style={{ height: '45px', width: '45px' }}
                                        />
                                    ))
                                }
                            </div>
                        :   
                            <></>
                    }
                    <input 
                        title="Size should be between 5 and 20"
                        placeholder="Size"
                        value = {size}
                        onChange = { handleSizeInput }
                        className= {`text-center ${input_error_size ? 'shake': ''}`}
                        style={{minWidth: '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                        />
                    
                    
                    <ul hidden = { !warn_num && !warn_size } className="flex_col_start gap_20" style={{color: 'red'}}>
                        <li hidden={!warn_num}>Number of players should be between 2 and 8.</li>
                        <li hidden={!warn_size}>Size should be between 5 and 20.</li>
                    </ul>
            
                    <button className="button bg-light-grey rounded px-5 py-2 mt-3" onClick={handleGameSetting}>Play</button>
                
                </div>                
                
        //     </div>

        //     <Footer />

        // </div>
    );
}