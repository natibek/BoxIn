import Footer from "./Footer";
import Nav from "./Nav";

export default function Multiplayer()
{
    return (
        <div className="flex_col_center" style={{height: '100vh'}}>
        <Nav page={"Multiplayer"} />
        <div className="flex_col_center" style={{ width: "100%", flexGrow: 1}}>

        </div>
        <Footer />
        </div>
    );
}