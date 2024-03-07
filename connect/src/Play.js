
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";

export default function Play()
{
     
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
        <div className="flex_col_center" style={{height: '100%'}}>
            <Nav  page={"Play"} />

            <div className="flex_col_center" style={{width: "100%", flexGrow: 1}}>    
                <Game />                     
            </div>
            <Footer />

        </div>
    );
}