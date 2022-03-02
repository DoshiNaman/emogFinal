import { useState } from "react";
import ExitGame from "./exitGame";

const EndGame = (props) => {

    const [endGame, setEndGame] = useState(false)

    return ( 
        <>
        <div className="absolute bottom-12 cursor-pointer font-bold left-12 endGame px-4 py-2" onClick={() => setEndGame(true)}>
            End Game
        </div>
        {endGame?<ExitGame cancelPress={setEndGame}/>:<></>}
        </>
     );
}
 
export default EndGame;