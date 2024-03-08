import Footer from "./Footer";
import Nav from "./Nav";

export default function Multiplayer()
{
    return (
        <div className="flex_col_center" style={{ minHeight: "100vh" }}>
            <Nav page={"Multiplayer"} />
            <div className="flex_col_center" style={{ width: "100%"}}>

            </div>
            
            <Footer />
        </div>
    );
}