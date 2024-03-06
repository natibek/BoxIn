
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";
import { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';

export default function Play()
{
    const [ board, set_board ] = useState();
    const [ num_players, set_num_players ] = useState("");
    const [ size, set_size ] = useState("");
    const [ turn, set_turn ] = useState();
    const [ show_setup, set_show_setup ] = useState(true);
    const [ input_error_size, set_input_error_size ] = useState(false);
    const [ input_error_num, set_input_error_num ] = useState(false);
    const [ warn_size, set_warn_size ] = useState(false);
    const [ warn_num, set_warn_num ] = useState(false);

    let display = false;

    const handleGameSetting = () => {
        
        if (Number(size) >= 5 && Number(size) <= 30 && Number(num_players) >= 2 && Number(num_players) <= 8)
        {   
            set_show_setup(false);
            display = true;
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
    
    // useEffect(() => {
    //     const last_game = JSON.parse(localStorage.getItem("size"));

    //     if (last_game)
    //     {
    //         set_num_players(localStorage.getItem("num_players"));
    //         set_size(localStorage.getItem("size"));
    //         set_turn(localStorage.getItem)
    //     }
    //     else
    //     {
    //         set_show_setup(true);
    //     }

    //     const handleUnload = (e) => {
    //         localStorage.setItem("num_players", JSON.stringify(num_players));
    //         localStorage.setItem("size", JSON.stringify(size));
    //         localStorage.setItem("board", JSON.stringify(board));

    //     }

    //     window.addEventListener('beforeunload', handleUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleUnload);
    //     };

    // }, [])

    return (
        <>
        <Nav  page={"Play"} />
        {
            display ? <Game /> : <></>
        }
            
        <Footer />

        <Modal show = { show_setup } centered keyboard = {false} backdrop = 'static' className="shadow-lg" >            
            <Modal.Header>
                <Modal.Title >
                    <h3>Game Setup</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body  style={{minHeight : '150px'}}>
                
                <div className="flex_col_center gap_20">
                <input 
                    placeholder="Number of Players"
                    value = {String(num_players)}
                    onChange = {(e) => {set_num_players(e.target.value)}}
                    className= {`text-center ${input_error_num ? 'shake': ''}`}
                    style={{minWidth: '150px',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                    
                    />
                
                <input 
                    placeholder="Size"
                    value = {String(size)}
                    onChange = {(e) => {set_size(e.target.value)}}
                    className= {`text-center ${input_error_size ? 'shake': ''}`}
                    style={{minWidth: '150px',width: 'fit-content', maxWidth: '50%', height: '50px'}}
                    />
                </div>

                
                <ul className="flex_col_start gap_20 pt-4 mx-5" style={{color: 'red'}}>
                    <li hidden={!warn_num}>Number of players should be between 2 and 8.</li>
                    <li hidden={!warn_size}>Size should be between 5 and 30.</li>
                </ul>

            </Modal.Body>

            <Modal.Footer className="flex_col_center">
                <button className="button bg-light-grey rounded px-5 py-2" onClick={handleGameSetting}>Play</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}