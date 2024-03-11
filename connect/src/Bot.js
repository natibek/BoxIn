import { useContext } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { NewBotCxt } from "./App";
import NewBot from "./NewBot";

export default function Bot()
{
    const { new_bot, set_new_bot } = useContext(NewBotCxt);

    return (
        <div className="flex_col_center" style={{ minHeight: "100vh" }}>
            <Nav page={"Bot"} />
            <div className="flex_col_center" style={{ width: "100%"}}>
                { new_bot ? <NewBot /> : <></> }
            </div>
            
            <Footer />
        </div>
    );
}