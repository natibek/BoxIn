import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";


export default function Game()
{
    const [ board, set_board ] = useState();
    const [ num_players, set_num_players ] = useState();
    const [ size, set_size ] = useState();
    const [ turn, set_turn ] = useState();
    const [ solved, set_solved ] = useState(false);



    
    return (
        <>
        <div className="shadow-lg flex_row_center">
            <div>
                {
                    
                }

            </div>
        </div>

        </>
    );
}