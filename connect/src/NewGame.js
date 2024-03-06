
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function NewGame()
{
    const [ num_players, set_num_players ] = useState("");
    const [ size, set_size ] = useState("");

    const [ input_error_size, set_input_error_size ] = useState(false);
    const [ input_error_num, set_input_error_num ] = useState(false);
    const [ warn_size, set_warn_size ] = useState(false);
    const [ warn_num, set_warn_num ] = useState(false);

    const navigate = useNavigate();

    
    const handleGameSetting = () => {    
        if (Number(size) >= 5 && Number(size) <= 30 && Number(num_players) >= 2 && Number(num_players) <= 8)
        {   
            navigate('/play');
        }
        else 
        {
            const regex=/^[0-9]+$/;

            set_input_error_size((!size.match(regex) || Number(size) < 5 || Number(size) > 30));
            set_warn_size((!size.match(regex) || Number(size) < 5 || Number(size) > 30))
            set_input_error_num((!num_players.match(regex) || Number(num_players) < 2 || Number(num_players) > 8));
            set_warn_num((!num_players.match(regex) || Number(num_players) < 2 || Number(num_players) > 8))
            setTimeout(() => {
                set_input_error_num(false);
                set_input_error_size(false)                
            }, 500);

        }
    }
    

    const handleNumInput = (e) => {
        const regex=/^[0-9]+$/;
        
        if (e.target.value.match(regex)|| e.target.value == ''){ set_num_players(e.target.value); }

    };

    const handleSizeInput = (e) => {
        const regex=/^[0-9]+$/;
        if (e.target.value.match(regex) || e.target.value == ''){ set_size(e.target.value); }

    };

    return (
        <div className="flex_col_center" style={{height: '100vh'}}>
            <Nav  page={"Play"} />
            
            <div className="flex_col_center" style={{width: "100%", flexGrow: 1}}>       
                <div className="shadow-lg flex_col_center gap_20 px-2 py-5 m-4 rounded" style={{minHeight : '150px', width : '30%', minWidth: 'fit-content'}}>            
                    
                    <h3>Game Setup</h3>

                    <input 
                        title="Number of players should be between 2 and 8"
                        placeholder="Number of Players"
                        value = {String(num_players)}
                        onChange = { handleNumInput }
                        className= {`text-center ${input_error_num ? 'shake': ''}`}
                        style={{minWidth : '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                        
                        />
                    
                    <input 
                        title="Size should be between 5 and 30"
                        placeholder="Size"
                        value = {String(size)}
                        onChange = { handleSizeInput }
                        className= {`text-center ${input_error_size ? 'shake': ''}`}
                        style={{minWidth: '70%',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                        />
                    
                    
                    <ul hidden = { !warn_num && !warn_size } className="flex_col_start gap_20" style={{color: 'red'}}>
                        <li hidden={!warn_num}>Number of players should be between 2 and 8.</li>
                        <li hidden={!warn_size}>Size should be between 5 and 30.</li>
                    </ul>
            
                    <button className="button bg-light-grey rounded px-5 py-2 mt-3" onClick={handleGameSetting}>Play</button>
                
                </div>                
                
            </div>

                <Footer />

        </div>
    );
}