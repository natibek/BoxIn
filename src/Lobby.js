import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";
import NewGame from "./NewGame";

export default function Lobby()
{
    return (
        <div className="flex_col_center" style={{minHeight: "100vh"}}>
            <Nav  page={"Lobby"} />

            <div className="flex_col_center" style={{width: "100%"}}>    
                {/* {new_game ? <NewGame /> : <Game />} */}
                LOBBY
            </div>
            <Footer />

        </div>
    );
}