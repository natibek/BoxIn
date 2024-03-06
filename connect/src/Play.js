
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";
import { useState, useEffect, useContext } from "react";

export default function Play()
{
    const [ board, set_board ] = useState();
    const [ num_players, set_num_players ] = useState("");
    const [ size, set_size ] = useState("");
    const [ turn, set_turn ] = useState();

    
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
        <div className="flex_col_center" style={{height: '100vh'}}>
            <Nav  page={"Play"} />

            <div className="flex_col_center" style={{width: "100%", flexGrow: 1}}>
                <Game />                     
            </div>

            <Footer />

        </div>
    );
}