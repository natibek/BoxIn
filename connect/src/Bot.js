import Footer from "./Footer";
import Nav from "./Nav";

export default function Bot()
{
    return (
        <div className="flex_col_center" style={{ minHeight: "100vh" }}>
            <Nav page={"Bot"} />
            <div className="flex_col_center" style={{ width: "100%"}}>

            </div>
            
            <Footer />
        </div>
    );
}