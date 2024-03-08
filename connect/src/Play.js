
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";

export default function Play()
{
    return (
        <div className="flex_col_center" style={{minHeight: "100vh"}}>
            <Nav  page={"Play"} />

            <div className="flex_col_center" style={{width: "100%"}}>    
                <Game />                     
            </div>
            <Footer />

        </div>
    );
}