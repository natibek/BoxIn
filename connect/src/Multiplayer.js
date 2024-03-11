import Footer from "./Footer";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

export default function Multiplayer()
{
    const navigate = useNavigate()

    return (
        <div className="flex_col_center" style={{ minHeight: "100vh" }}>
            <Nav page={"Multiplayer"} />
            
            <div className="flex_row_center gap_20" style={{ width: "100%"}}>

                <div className = "text-center p-5 multi_button rounded shadow-lg bg_white border border-2 border-black" onClick={() => { navigate('/multiplayer/lobby') }} > 
                    GLOBAL LOBBY 
                </div>
                
                <br />

                <div className = "text-center p-5 multi_button rounded shadow-lg bg_white border border-2 border-black" onClick={() => { navigate('/multiplayer/rooms') }} > 
                    PRIVATE ROOMS 
                </div>

            </div>
            
            <Footer />
        </div>
    );
}