import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../context/socket/SocketContext";
import Wheel from '../../../components/wheel'
import ConfirmLifeline from "../../../components/Players/confirmLifeline";
import SettingsAndBack from "../../../components/settingsAndBack"
import Summary from "../../../components/Players/summary";

const game = () => {

    const router = useRouter()


    const [ruleBook, ruleBookClicked] = useState(false)
    const [team, setTeam] = useState({})
    const [players, setPlayers] = useState([])
    const [roundNo, setRoundNo] = useState(1)
    const maxRounds = useRef(10)
    const [scene, setScene] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useContext(SocketContext)
    const [statement, setStatement] = useState('')
    const [player, setPlayer] = useState({})
    const [activePlayer, setActivePlayer] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [playerName, setPlayerName] = useState('')
    const [emotion, setEmotion] = useState('')
    const [isTimerOver, setIsTimerOver] = useState(false)
    const [timeFormat, setTimeFormat] = useState('')
    const [timeGuesserFormat, setTimeGuesserFormat] = useState('')
    const [counter, setCounter] = useState(90)
    const [guessCounter, setGuessCounter] = useState(180)
    const [gameCode, setGameCode] = useState('')
    const timerRef = useRef()
    const [currentRoundEmotion, setCurrentRoundEmotion] = useState('')
    const [status, setStatus] = useState('')
    const [confirmLifeline, setConfirmLifeline] = useState()
    const [thisOrThatBool, setThisOrThatBool] = useState(false)

    // call bot
    const [correctEmotion, setCorrectEmotion] = useState('')
    const [otherEmotion, setOtherEmotion] = useState('')
    const [thirdEmotion, setThirdEmotion] = useState('')

    // delete row
    const [deletedRow, setDeletedRow] = useState([])

    
    const [guessedEmotions, setGuessedEmotions] = useState([])
    const [gameLog, setGameLog] = useState([])

    const [callHost, setCallHost] = useState(false)
    
    // popup after every round
    const [summary, setSummary] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [yourAnswer, setYourAnswer] = useState([])
    const [currScore, setCurrScore] = useState(0)
    const [nextPlayer,setNextPlayer] = useState("")

    useEffect(() => {
        setStatus(sessionStorage.getItem('status'))
        setPlayerName(sessionStorage.getItem('player-name'))
        const code = sessionStorage.getItem('game-code')
        const pName = sessionStorage.getItem('player-name')
        setGameCode(sessionStorage.getItem('game-code'))  
        let teamName = sessionStorage.getItem('team-name')
        let isMounted = true
        if(isMounted)
            socket.emit('join-team-room', {code, teamName, pName })

        socket.on('team-players', players => {
            setPlayer(players.find(p => p.isRandomlySelected === true))    
            setPlayers(players)
            }
        )

        socket.on('quit-game', () => {
            sessionStorage.clear()
            alert('The Host decided to quit the game!')
            router.push('/')
        })
        
        socket.on('current-team', team => setTeam(team))
        socket.on('current-round-emotion', emotion => {
            setCurrentRoundEmotion(emotion)
        })

        socket.on('next-round-emotion', emotion => setCorrectAnswer(emotion))

        socket.on('show-summary', bool => setSummary(bool))
        
        socket.on('team-round', roundNumber => {
                if(sessionStorage.getItem('round-no-team') && roundNumber > Number(sessionStorage.getItem('round-no-team')))
                {    
                    sessionStorage.removeItem('type-counter')
                    sessionStorage.removeItem('guess-counter')
                }
                setGuessedEmotions([])
                sessionStorage.setItem('round-no-team', roundNumber)
                setRoundNo(roundNumber)
        })

        socket.on('set-this-to-true', bool => setThisOrThatBool(bool))

        socket.on('max-rounds', maxRound => { maxRounds.current = maxRound })
        socket.on('go-to-leaderboard', () => router.push('/leaderboard'))
        socket.on('game-log', gameLog => {
            setGameLog(gameLog)})

        socket.on('reset-emotions', () => {
            setDeletedRow([])
            setOtherEmotion("")
            setCorrectEmotion("")
            setThirdEmotion("")
        })

        socket.on('active-player', activePlayer => {
            activePlayer.isRandomlySelected? setActivePlayer(activePlayer) : setActivePlayer('')
            activePlayer.isRandomlySelected? setNextPlayer(activePlayer) : setActivePlayer('')
        })

        socket.on('team-score', newScore => {
            console.log(score);
            let curScore = 0
            if(sessionStorage.getItem('curr-round-score-val'))
                curScore = Number(sessionStorage.getItem('curr-round-score-val'))
            setCurrScore(newScore - curScore)
            sessionStorage.setItem('curr-round-score-val', newScore)
            setScore(newScore)
        })

        socket.on('your-answer', emotion => {
            setTimeout(() => {
                setSummary(false)
            }, 5000)
            let arr = yourAnswer.slice()
            if(typeof(emotion) === 'string'){
                arr.push(emotion)
                setYourAnswer(arr)
            }
            else
            {
                arr.push(emotion[0])
                arr.push(emotion[1])
                setYourAnswer(arr)
            }
            
        })



        socket.on('scene', scene => setScene(scene))
        socket.on('team-messages', messages => setMessages(messages))
        socket.on('typing-counter', counter => {
            if(!sessionStorage.getItem('type-counter')){
                setCounter(counter)}})
        socket.on('guessing-counter', counter => {
            if(!sessionStorage.getItem('guess-counter'))
            setGuessCounter(counter)})
        socket.on('team-disabled', bool => {
            setIsTimerOver(bool)
            if(bool)
                setCounter(0)
            setIsDisabled(bool)
        })

    }, [socket])

    useEffect(() => {
        var objDiv = document.getElementById("chatBox");
        objDiv.scrollTop = objDiv.scrollHeight;
        var objDiv2 = document.getElementById("gameLog");
        objDiv2.scrollTop = objDiv2.scrollHeight;
    })

    useEffect(() => {

        const teamName = sessionStorage.getItem('team-name')
        socket.on('your-three-choices', ({correctEmotion, otherEmotion, thirdEmotion}) => {
            setCorrectEmotion(correctEmotion)
            setOtherEmotion(otherEmotion)
            setThirdEmotion(thirdEmotion)
        })

        socket.on('deleted-row', ({deletedRow}) => {
            setDeletedRow(deletedRow)
        })


        if(sessionStorage.getItem('guess-counter'))
            setGuessCounter(Number(sessionStorage.getItem('guess-counter')))
        if(sessionStorage.getItem('type-counter')){
            setCounter(Number(sessionStorage.getItem('type-counter')))
        }
        let active = false
        if(!active)
        {
            if(counter !== 0){
            timerRef.current = setInterval(() => {
                    const secondCounter = counter % 60;
                    const minuteCounter = Math.floor(counter / 60);
                    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
                    setTimeFormat(computedMinute + ':' + computedSecond)
                    sessionStorage.setItem('time-format', computedMinute + ':' + computedSecond)
                    setCounter(counter => counter - 1);
                    sessionStorage.setItem('type-counter', counter - 1)
            }, 1000)
            }
            else{
                sessionStorage.setItem('type-counter', 0)
                setIsDisabled(true)
                sessionStorage.setItem('is-disabled', JSON.stringify(true))
                setIsTimerOver(true)
                sessionStorage.setItem('is-time-over', JSON.stringify(true))
                if(guessCounter !== 0){
                    timerRef.current = setInterval(() =>{
                    const secondCounter = guessCounter % 60;
                    const minuteCounter = Math.floor(guessCounter / 60);
                    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
                    setTimeGuesserFormat(computedMinute + ':' + computedSecond)
                    setGuessCounter(counter => counter - 1);
                    sessionStorage.setItem('guess-counter', guessCounter - 1)
                    }, 1000)
                }
                else{
                    const emotion = ''
                    console.log('Alohomora');
                    console.log(guessCounter);
                    if(!player.isRandomlySelected && player.name !== playerName)
                        socket.emit('guessed', {gameCode, teamName, emotion, playerName })
                    clearInterval(timerRef.current)
                    setTimeGuesserFormat('00:00')
                    setGuessCounter(0)
                    sessionStorage.setItem('guess-counter', 0)
                }
            }
        }
        return() => {
            clearInterval(timerRef.current)
            active = true
        }

    }, [counter, guessCounter, socket])

    const callHostF = () => {
        let teamName = sessionStorage.getItem('team-name')
        socket.emit('call-the-host', {gameCode, teamName})
        setCallHost(false)
    }

    const guessEmotion = (e) => {
        // if(guessedEmotions.length >= 2){
        //     alert('You guessed two emotions already!')
        //     return
        // }
        if (thisOrThatBool){
            guessedEmotions.length >= 2?guessedEmotions.shift():null
            guessedEmotions.push(e)
        } else {
            setEmotion(e)
        }
        console.log(guessedEmotions, "hi");
    }

    const confirmTheLifeline = (text) => {
        setConfirmLifeline(text)
    }

    const clickHandler = () => {
        setDeletedRow([])
        setOtherEmotion("")
        setCorrectEmotion("")
        setThirdEmotion("")
        sessionStorage.removeItem('is-disabled')
        sessionStorage.removeItem('is-time-over')
        sessionStorage.removeItem('type-counter')
        sessionStorage.removeItem('guess-counter')
        setIsTimerOver(false)
        if(!thisOrThatBool && emotion === '')
        {
            alert('Please select an emotion.')
            return
        }
        if(thisOrThatBool && guessedEmotions.length < 2){
            alert('Please select two emotions.')
            return
        }
        const teamName = sessionStorage.getItem('team-name')
        
        thisOrThatBool?
        socket.emit('guessed-array', {gameCode, teamName, guessedEmotions, playerName})
        :
        socket.emit('guessed', {gameCode, teamName, emotion, playerName})
    }

    const onChangeHandler = (e) => {
        setStatement(e.target.value)
    }

    const onSubmit = () => {
        let teamName = sessionStorage.getItem('team-name')
        setStatement('')
        let message = messages.slice(0)
        message.push(statement)
        setIsTimerOver(true)
        setTimeFormat('0:00')
        setCounter(0)
        sessionStorage.setItem('type-counter', 0)
        socket.emit('submit-statement', {gameCode, teamName, message})
    }

    // const [screenZoom, setScreenZoom] = useState(1)

    // useEffect(() => {
    //     if(window.innerWidth<1280){
    //         setScreenZoom(0.9)
    //     }
    // }, [])

    return ( 
        <div className="flex flex-column h-screen bgNormal">
            <div className="flex justify-end my-8">
                {status === '1' ? <SettingsAndBack link = '/host/hostDashboard' /> : null}
            </div>
            <div className="flex flex-row px-8 pb-4" style={{flex:"1"}}>
                <div className="flex heading rounded-xl mx-2 flex-column items-center flex-1" style={{height:"80vh"}}>
                    {players.map((player, index) => (
                        <div className={player.name===activePlayer.name?"mt-4 p-2 burlywoodBorder rounded-lg":"mt-4 p-2"} key = {index}>
                            <div className="flex justify-center">
                                <img src = {player.avatar} alt = 'avatar' className='h-20 w-20' />
                            </div>
                            <div className="text-center">
                                {player.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-column heading rounded-xl mx-2" style={{flex:"4", height:"80vh"}}>
                    <div className="flex justify-between rounded-t-xl ebaBg whiteText text-xl px-8 pt-4 flex-1">
                        <div>
                            Round {roundNo}/{maxRounds.current}                            
                        </div>
                        <div>
                            {isTimerOver?  `Guessing time: ${timeGuesserFormat}` : `Typing time: ${timeFormat}`}
                        </div>
                    </div>
                    <div className="flex flex-column-reverse overflow-y-auto" style={{flex:"9"}}>
                            {player.name === playerName && player.isRandomlySelected || playerName === 'host'?
                            <div className='flex flex-row justify-between py-2 px-3'>
                                
                                <input placeholder='Be Careful! You can only submit one statement in a round.' className="ebaBg w-full input pl-2 border-2 font-extralight rounded-lg ebaBorder whiteText h-8" value = {statement} onChange = {e => onChangeHandler(e)} onKeyPress={(e) => e.key === 'Enter' && onSubmit()} disabled = {isDisabled? true: false} />
                                <button className='flex-1 ebaText h-full' onClick = {onSubmit} disabled = {isDisabled? true: false} > 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                                : null}
                        <div className="flex-1 ml-4 overflow-y-auto scl pr-2" id="chatBox">
                            <div className="inline-block w-full">
                                {messages.map((message, index) => (
                                    index % 2 !== 0?
                                        <div className="text-left my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleOne}</h6>
                                            <div className="mr-8 ebaBg whiteText inline-block px-4 py-2 rounded-t-md rounded-r-md">
                                                {message}
                                            </div>
                                        </div>
                                    :
                                        <div className="text-right my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleTwo}</h6>
                                            <div className="ml-8 ebaBg whiteText inline-block px-4 py-2 rounded-t-md rounded-l-md">
                                                {message}
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column mx-2 items-center" style={{flex:"4", height:"80vh"}}>
                    <div className="font-bold px-8 py-4 heading rounded-xl w-3/4 text-lg">
                        Scene: {scene.scene}
                    </div>
                    {player.isRandomlySelected && player.name === playerName? <Wheel emotionFunction = {guessEmotion} currentRoundEmotion={currentRoundEmotion} /> : <Wheel emotionFunction = {guessEmotion} deletedRow={deletedRow} callRobot={[correctEmotion, otherEmotion, thirdEmotion]} thisOrThatBool={thisOrThatBool} guessedEmotions={guessedEmotions}/> }
                </div>
                <div className="flex flex-column mx-2 flex-1" style={{height:"80vh"}}>
                    <div className="font-bold flex p-2 heading rounded-lg text-lg">
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ebaBg rounded-lg">{score.toString().length>1?score.toString().slice(0,1):"0"}</div>
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ml-2 ebaBg rounded-lg">{score.toString().length>1?score.toString().slice(1,2):score}</div>
                    </div>
                    <div className="h-full flex flex-column pt-2">

                        <button className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("This or That")} disabled={team.thisOrThat || (player.isRandomlySelected && player.name === playerName)} >
                            This or That
                        </button>
                        <button className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("Delete a row")} disabled={team.deleteARow || (player.isRandomlySelected && player.name === playerName)} >
                            Delete a row
                        </button>
                        <button className="my-2 text-sm rounded-md px-3 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("Call the Bot")} disabled={team.callTheBot || (player.isRandomlySelected && player.name === playerName)} >
                            Call the bot
                        </button>

                        {player.name === playerName && player.isRandomlySelected? null:
                        <button className='buttonNew rounded-md px-3 py-2 mb-3 mt-4 text-lg font-bold text-center'
                        onClick = {() => clickHandler()} disabled = {!isDisabled} >Confirm</button>}
                        <div className="heading rounded-xl py-3 h-auto">
                            <div className="text-center">Game Log</div>
                            <div className="scl overscroll-y-auto px-1 py-1 text-xs text-center h-48" id="gameLog">
                                {gameLog.map((game, index) => 
                                    typeof(game.emotion) === "object" && roundNo > 1?
                                    <div key={index} className='py-2'>{game.guesser} Guessed {game.emotion[0]} and {game.emotion[1]}</div>
                                    :
                                    <div key={index} className='py-2'>{game.guesser} Guessed {game.emotion}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end absolute bottom-4 right-0">
                <div className="buttonNew rounded font-bold py-2 px-4 mx-2 cursor-pointer" onClick={() => setCallHost(true)}>
                    Call host
                </div>
                <div className="buttonNew rounded font-bold py-2 px-4 mx-2 cursor-pointer" onClick={() => ruleBookClicked(true)}>
                    Rule Book
                </div>
                <div className="py-2 px-3 cursor-pointer">
                </div>
            </div>

            {ruleBook?
            <div className="flex justify-center h-screen w-screen burlywoodOverlay bg-opacity-50 overflow-hidden items-center absolute top-0 left-0 z-50">
                <div className="heading rounded-xl overflow-y-auto scl h-4/5 w-4/5 relative">
                    <div className="text-3xl cursor-pointer absolute top-6 right-8" onClick={() => ruleBookClicked(false)}>&times;</div>
                    <div className="text-center font-bold text-2xl mt-4">RULE BOOK</div>
                    <div className="ebaText px-16">
                        <div className="font-bold text-xl burlywoodText">Game Play:</div>
                        <br />
                        <ul className="list-decimal">
                            <li>The player are divided into multiple teams</li>
                            <li>All the teams are given a scene with two roles</li>
                            <li>One player is randomly selected from the team and is given a role and an emotion</li>
                            <li>The player has to type a statement emoting the emotion in that role</li>
                            <li>The statement has to be a reply to previous statement</li>
                            <li>Other players of the same team have to guess the emotion</li>
                            <li>Each round is of one statement</li>
                        </ul>                        
                        <div className="font-bold text-xl burlywoodText">Lifelines:</div>
                        <br />
                        <ul className="list-disc">
                            <li>Each team has 3 lifelines to use throughout the game.</li>
                            <li>Only one lifeline can be used in a round.</li>
                        </ul>
                            
                        <div>This or That: Players get a chance to choose 2 options</div>
                        <div>Drop a Row: System will drop a row with wrong answer</div>
                        <div>Call the bot: The system will shortlist 3 answers for you with one correct answer </div>

                        <div className="font-bold text-xl burlywoodText mt-4">Scoring:</div>
                        <br />
                        <ul className="list-disc">
                            <li>2 points: Correct Emotion</li>
                            <li>1 point: Adjacent 2</li>
                            <li>3 points: Compound emotion</li>
                            <li>0 point: Incorrect guess</li>
                        </ul>  
                    </div>  
                </div>
            </div>:<></>}

            {callHost?
                <div className="h-screen w-screen bg-opacity-50 absolute top-0 left-0 flex justify-center items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
                    <div className="bg-gray-200 rounded-lg p-4 text-center" style={{backgroundColor:"#fffaee", color:"#da764b"}}>
                        <div className="text-xl font-bold">
                            Do you want to call<br />the Host?
                        </div>
                        <div className="flex justify-evenly items-center">
                            <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => callHostF()}>Yes</div>
                            <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => setCallHost(false)}>No</div>
                        </div>
                    </div>                
                </div>
            :<></>}

            {summary?<Summary setSummary={setSummary} correctAnswer={correctAnswer} yourAnswer={yourAnswer} pointsEarnerd={currScore}  nextPlayer={nextPlayer.name}/>:<></>}

            {confirmLifeline?<ConfirmLifeline setConfirmLifeline={setConfirmLifeline} lifeLine={confirmLifeline}/>:<></>}
        </div>
     );
}

export default game;
