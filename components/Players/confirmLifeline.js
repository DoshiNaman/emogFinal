import { useContext, useState } from "react";
import { SocketContext } from "../../context/socket/SocketContext";

const ConfirmLifeline = (props) => {
     const socket = useContext(SocketContext)

     const clickHandler = () => {
          const gameCode = sessionStorage.getItem('game-code')
          const teamName = sessionStorage.getItem('team-name')
          props.setConfirmLifeline(false)
          switch(props.lifeLine){
               case 'This or That':
                   socket.emit('this-or-that', {gameCode, teamName})
                   break
               case 'Call the Bot':
                   socket.emit('call-the-bot', {gameCode, teamName})
                   break
               case 'Delete a row':
                   socket.emit('delete-a-row', {gameCode, teamName})
                   break
           }
     }

     return ( 
          <div className="h-screen w-screen bg-opacity-50 absolute top-0 left-0 flex justify-center items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
               <div className="bg-gray-200 rounded-lg p-4 text-center" style={{backgroundColor:"#fffaee", color:"#da764b"}}>
                    <div className="text-xl font-bold">
                         Do you want to use the lifeline<br />{props.lifeLine}?
                    </div>
                    <div className="ebaText my-3">{props.lifeLine==="This or That"?"This will allow you to make two guesses":props.lifeLine==="Call the Bot"?"System will give 3 answers to choose from":props.lifeLine==="Delete a row"?"System will drop a row of incorrect answers":""}</div>
                    <div className="flex justify-evenly items-center">
                         <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => clickHandler()}>Yes</div>
                         <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => props.setConfirmLifeline(false)}>No</div>
                    </div>
               </div>                
          </div>
          );
     }
 
export default ConfirmLifeline;