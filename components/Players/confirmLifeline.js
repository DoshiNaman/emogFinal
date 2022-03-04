import { useContext, useState } from "react";
const ConfirmLifeline = (props) => {
     
     const { gameCode, myTeam,setConfirmLifeline, lifeLine,currentRoundEmotion,OtherEmotions,setDeletedRow,setCorrectEmotion,setOtherEmotion,setThirdEmotion,setThisOrThat,setDeleteTheRow,setCallTheBot} = props;
     setCorrectEmotion('')
     setOtherEmotion('')
     setThirdEmotion('')
     
     const clickHandler = () => {
          const gameCode = sessionStorage.getItem('game-code')
          const teamName = sessionStorage.getItem('team-name')
          // props.setConfirmLifeline(false)
          // alert(currentRoundEmotion)
          switch(lifeLine){
               case 'This or That':
                    //socket.emit('this-or-that', {gameCode, teamName})
                    setThisOrThat(true)
                    break
               case 'Call the Bot':
                    const newArrayBot = [];
                    for(let i=0;i<OtherEmotions.length;i++){
                         for(let j=0;j<3;j++){
                              console.log(OtherEmotions[i][j])
                              if(OtherEmotions[i][j]!=currentRoundEmotion){
                                   newArrayBot.push(OtherEmotions[i][j])
                                   // alert('found')
                              }
                              // if(!OtherEmotions[i][j]==currentRoundEmotion){
                              //      console.log(OtherEmotions[i][j])
                              // }
                         }
                    }
                    console.log(newArrayBot)
                    const random1 = Math.floor(Math.random()*newArrayBot.length);
                    let random2 = Math.floor(Math.random()*newArrayBot.length);
                    if(newArrayBot[random1]==newArrayBot[random2]){
                         for(let i=0;i<1;i){
                              let newRandom2 = Math.floor(Math.random()*newArrayBot.length);
                              if(newRandom2!=random2){
                                   random2=newRandom2
                                   i++
                              }                              
                         }
                    }
                    setCorrectEmotion(currentRoundEmotion)
                    setOtherEmotion(newArrayBot[random1])
                    setThirdEmotion(newArrayBot[random2])
                    console.log(random1)
                    console.log(random2)
                    console.log(newArrayBot[random1])
                    console.log(newArrayBot[random2])
                    //socket.emit('call-the-bot', {gameCode, teamName})
                    setConfirmLifeline(false)
                    setCallTheBot(true)
                   break
               case 'Delete a row':
                    // setDeletedRow([{emotion:'JOY'},{emotion:'SERENITY'},{emotion:'ECSTACY'}])
                    const newArray = [];
                    const finalArray =[];
                    console.log(OtherEmotions)
                    console.log(currentRoundEmotion)
                    for(let i=0;i<OtherEmotions.length;i++){
                         if(OtherEmotions[i].includes(currentRoundEmotion)){
                              alert('found')
                         }
                         else{
                              newArray.push(OtherEmotions[i])
                         }
                    }
                    for(let i=0;i<newArray.length;i++){
                         const innerArr = [];
                         for(let j=0;j<3;j++){
                              const innerObj = {}
                              innerObj['emotion']=newArray[i][j]
                              innerArr.push(innerObj)
                         }
                         finalArray.push(innerArr)
                    }
                    const randomNumber = Math.floor(Math.random()*finalArray.length);
                    setDeletedRow([...finalArray[randomNumber]])
                    setConfirmLifeline(false)
                    setDeleteTheRow(true)
                   //socket.emit('delete-a-row', {gameCode, teamName})
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