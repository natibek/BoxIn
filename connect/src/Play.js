
import Footer from "./Footer";
import Nav from "./Nav";
import Game from "./Game";
import { NewGameCxt } from "./App";
import NewGame from "./NewGame";
import { Modal } from "react-bootstrap";
import { useContext } from "react";

export default function Play()
{
    const { new_game, set_new_game } = useContext(NewGameCxt);

    return (
        <div className="flex_col_center" style={{minHeight: "100vh"}}>
            <Nav  page={"Play"} />

            <div className="flex_col_center" style={{width: "100%"}}>    
                {new_game ? <NewGame /> : <Game />}
            </div>
            <Footer />

        </div>
    );
}


{/* <Modal show = { new_game } onHide={ () => set_new_game( !new_game ) } centered >
    <Modal.Header className='flex_col_center p-4' closeButton >
        <h3 className="text-center position-absolute" style={{top: '15px'}}> Game Setup </h3>
    </Modal.Header>
    
    <Modal.Body>            
        <NewGame />
    </Modal.Body>
</Modal>*/}