import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Vs} from './assets/against.svg';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
        <div className='flex_row_center p-4 bg-white border-bottom w-100 nav shadow-lg border-bottom border-2 border-black' style={{height: 'fit-content'}}>
            
            <div className='position-absolute border border-1 border-black rounded' style={{left: "50px"}}>

                <Dropdown>
                    <Dropdown.Toggle className="dropdown-style flex_row_center"> &#9776; &nbsp; </Dropdown.Toggle>

                    <Dropdown.Menu>                
                        <Dropdown.Item onClick={ () => { navigate("/") } } className='flex_row_start dropdown-items'> <i className="bi bi-house"></i> <> &nbsp; Home</> </Dropdown.Item>   
                
                        <Dropdown  drop='end'>
                            <Dropdown.Toggle className="sub_dropdown_style w-100 flex_row_start">
                                <div className = "position-relative" style = {{left: '-5px'}}>
                                    <Vs width = "22px" height = "22px" className = "position-relative" style = {{left: '6px', top: '-2px'}}/><> &nbsp; Against Friends </> 
                                </div>  
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='dropdown-submenu'>                
                                <Dropdown.Item onClick={ handleNewGame }  className='flex_row_start dropdown-items'> <i className="bi bi-plus-square"></i> <> &nbsp; New </> </Dropdown.Item>   
                                <Dropdown.Item onClick={ handleNewGame }  className='flex_row_start dropdown-items'> <i className="bi bi-repeat"></i> <> &nbsp; Conitnue </> </Dropdown.Item>   
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown drop='end'>
                            <Dropdown.Toggle className="sub_dropdown_style bg-white w-100 flex_row_start">
                                <div className = "position-relative" style = {{left: '1px'}}>
                                    <i className="bi bi-robot position-relative" style = {{left: '2px', top: '-2px'}}></i> <> &nbsp; Against Bot &nbsp;</>  
                                </div>  
                            </Dropdown.Toggle>

                            <Dropdown.Menu>                
                                <Dropdown.Item onClick={ handleNewGame }  className='flex_row_start dropdown-items'> <i className="bi bi-plus-square"></i> <> &nbsp; New </> </Dropdown.Item>   
                                <Dropdown.Item onClick={ handleNewGame }  className='flex_row_start dropdown-items'> <i className="bi bi-repeat"></i> <> &nbsp; Conitnue </> </Dropdown.Item>   
                            </Dropdown.Menu>
                        </Dropdown>
                    
                        <Dropdown.Item onClick={ handleOnline } className='flex_row_start dropdown-items'> <i className="bi bi-router"></i> <> &nbsp; Multiplayer</> </Dropdown.Item>   

                        <Dropdown.Item onClick={ handleInstructions } className='flex_row_start dropdown-items'> <i className="bi bi-question"> </i> <>&nbsp; Instructions</></Dropdown.Item>                     
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
