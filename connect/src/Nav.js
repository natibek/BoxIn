import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Nav({ page }){
    const navigate = useNavigate();

    const handleNewGame = () => {           
        navigate("/new");
    };

    const handleContinue = () => {  
        navigate("/play");
    };
    
    const handleOnline = () => {
        navigate("/multiplayer")
    };

    const handleInstructions = () => {

    };

    return (
        <div className='flex_row_center p-4 bg-white border-bottom w-100 nav' style={{height: 'fit-content'}}>
            
            <div className='position-absolute' style={{left: "50px"}}>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-style btn bg-off-white">
                        &#9776;
                    </      Dropdown.Toggle>

                    <Dropdown.Menu>                
                        <Dropdown.Item onClick={ () => { navigate("/") } }> <i className="bi bi-house"></i> <> &nbsp; Home</> </Dropdown.Item>   
                        <Dropdown.Item onClick={ handleNewGame }> <i className="bi bi-plus-square"></i> <> &nbsp; New Game</> </Dropdown.Item>   
                        <Dropdown.Item onClick={ handleContinue }> <i className="bi bi-bounding-box-circles"></i> <> &nbsp; Continue Game</> </Dropdown.Item>
                        <Dropdown.Item onClick={ handleOnline }> <i className="bi bi-router"></i> <> &nbsp; Multiplayer</> </Dropdown.Item>   
                        <Dropdown.Item onClick={ handleInstructions }> <i className="bi bi-question"> </i> <>&nbsp; Instructions</></Dropdown.Item>                     
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div>
                <div className='d-flex justify-content-center align-items-start'>
                    <h1 className="text-center pt-2 fs-3"> <i className='bi bi-bounding-box-circles px-1'></i> BoxIn </h1>
                    <h2 className="text-center pt-2 fs-5"> &nbsp; {page} </h2>                    

                </div>    
            </div>
            
        </div>
    );
}
