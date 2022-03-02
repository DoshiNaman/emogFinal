import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Wheel from '../../../components/wheel'
import ConfirmLifeline from "../../../components/Players/confirmLifeline";
import SettingsAndBack from "../../../components/settingsAndBack"
import Summary from "../../../components/Players/summary";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import Timer from "../../../components/Timer"

const game = () => {

    const router = useRouter()

    const [ruleBook, ruleBookClicked] = useState(false)
    const [team, setTeam] = useState({})
    const [myTeam, setMyTeam] = useState("")
    const [players, setPlayers] = useState([])
    const [roundNo, setRoundNo] = useState(1)
    const [maxRounds, setMaxRounds] = useState(10)
    const [scene, setScene] = useState({})
    const [messages, setMessages] = useState([])
    const [statement, setStatement] = useState('')
    const [player, setPlayer] = useState({})
    const [activePlayer, setActivePlayer] = useState('')
    const [score, setScore] = useState(0)
    const [emotion, setEmotion] = useState('')
    //timer
    // const [isTimerOver, setIsTimerOver] = useState(false)
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
    const [thirdEmotion, setThirdEmotion] = useState('joy')

    // delete row
    const [deletedRow, setDeletedRow] = useState([])


    const [guessedEmotions, setGuessedEmotions] = useState([])
    const [gameLog, setGameLog] = useState([])

    const [callHost, setCallHost] = useState(false)

    // popup after every round
    const [summary, setSummary] = useState(false)
    const [close, setClose] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [yourAnswer, setYourAnswer] = useState("")
    const [currScore, setCurrScore] = useState(0)
    const [nextPlayer, setNextPlayer] = useState("")

    //value
    const [compoundEmotionValue,setCompoundEmotionValue] = useState({
        correctGuess : 0,
        incorrectGuess : 0
    })
    const [otherEmotionValue,setOtherEmotionValue] = useState({
        correctGuess : 0,
        adjacentCell : 0,
        incorrectGuess : 0
    })
    const OtherEmotions = [['RAGE','ANGER', 'ANNOYANCE'], 
    ['LOATHING', 'DISGUST', 'BOREDOM'], 
    ['ADMIRATION','TRUST', 'ACCEPTANCE'],
    ['TERROR', 'FEAR', 'APPREHENSION'], 
    ['AMAZEMENT','SURPRISE', 'DISTRACTION'],
    ['GRIEF', 'SADNESS', 'PENSIVENESS'], 
    ['VIGILANCE','ANTICIPATION', 'INTEREST'], 
    ['ECSTACY','JOY', 'SERENITY']];
    const CompoundEmotions = ['AGGRESSIVENESS','CONTEMPT', 'REMORSE', 'DISAPPROVAL', 'AWE', 'SUBMISSION', 'LOVE','OPTIMISM'];
    const [Inother,setInother] = useState([])


    // my name 
    const [myNameEn, setMyNameEn] = useState('');
    const db = getDatabase();

    ///  27 feb -33:30pm

    const [typingDuration, setTypingDuration] = useState(100);
    const [guessingDuration, setGuessingDuration] = useState(100);

    const [isTyping, setIsTyping] = useState(false);
    const [isGuessing, setIsGuessing] = useState(false);
    // const [isGuessing, setIsGuessing] = useState(false);
    const [senderName, setSenderName] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    // const [tempTimer, setTempTimer] = useState({})
    const [totalTypingDuration, setTotalTypingDuration] = useState(0)
    const [totalGuessingDuration, setTotalGuessingDuration] = useState(0)

    /// 28-feb 12:27 pm
    // const [sender, setSender] = useState("")

    //GameCode
    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        const myT = window.sessionStorage.getItem('team-name')
        setMyTeam(myT)
        const myNome = window.sessionStorage.getItem('player-name');
        setMyNameEn(myNome);
    }, []);


    

    //  && isTyping === true && isGuessing === false
    useEffect(() => {
        if (gameCode && myTeam) {

            if(close === 1){
                setSummary(false)
                const updates = {};
                const time = new Date();
                console.log(time.getTime());
                time.setSeconds(time.getSeconds() + (totalTypingDuration + 1));
                updates[`${gameCode}/timingDetails/${myTeam}/endTypingTime`] = (time.getTime());
                updates[`${gameCode}/timingDetails/${myTeam}/guessingTimeRunning`] = false;
                updates[`${gameCode}/timingDetails/${myTeam}/typingTimeRunning`] = true;
                updates[`${gameCode}/timingDetails/${myTeam}/summary`] = false;
                /* let newR = parseInt(roundNo) + 1
                updates[`${gameCode}/teamDetails/${myTeam}/currentRound`] = parseInt(newR)
                update(ref(db), updates) */
                //clearInterval(guessingInterval)
                setIsDisabled(false)
                setClose(0)
            } 



            const timingRef = ref(db, `${gameCode}/timingDetails/${myTeam}/`)
            onValue(timingRef, (snapshot) => {
                if (snapshot.exists()) {
                    let timingObj = snapshot.val()
                    if(timingObj.summary === true){
                        
                        if(parseInt(roundNo)>parseInt(maxRounds)){
                            router.push('/leaderboard');
                            const updates = {};
                            updates[`${gameCode}/teamDetails/${myTeam}/currentRound`] = parseInt(maxRounds);
                            update(ref(db), updates);
                            return
                        }
                        let cuurR = parseInt(roundNo) +1;
                        const reRef = ref(db, `${gameCode}/roundDetails/${myTeam}/${cuurR}/selectedEmotion`);
                        get(reRef).then((snapshot) => {
                            if (snapshot.exists()) {
                                const summaryObj = snapshot.val();
                                setYourAnswer(summaryObj)
                            }
                        }).catch((error) => {
                            console.error(error);
                        });

                        const reRef2 = ref(db, `${gameCode}/roundDetails/${myTeam}/${cuurR}/currScore`);
                        get(reRef2).then((snapshot) => {
                            if (snapshot.exists()) {
                                const summaryObj2 = snapshot.val();
                                setCurrScore(parseInt(summaryObj2))
                            }
                        }).catch((error) => {
                            console.error(error);
                        });


                        setSummary(true)
                        setTimeout(function(){
                            setSummary(false)
                            const updates = {};
                            const time = new Date();
                            console.log(time.getTime());
                            time.setSeconds(time.getSeconds() + (totalTypingDuration + 1));
                            updates[`${gameCode}/timingDetails/${myTeam}/endTypingTime`] = (time.getTime());
                            updates[`${gameCode}/timingDetails/${myTeam}/guessingTimeRunning`] = false;
                            updates[`${gameCode}/timingDetails/${myTeam}/typingTimeRunning`] = true;
                            updates[`${gameCode}/timingDetails/${myTeam}/summary`] = false;
                            
                            update(ref(db), updates)
                            //clearInterval(guessingInterval)
                            setIsDisabled(false)
                        }, 6000);
                    }
                    
                    if (timingObj.typingTimeRunning === true) {
                        let endTime = timingObj.endTypingTime
                        console.log(endTime);
                        const time = new Date(endTime).getTime()
                        const distance = time - (new Date().getTime())
                        console.log(time, distance);
                        if (distance > 0) {
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                            console.log(minutes, seconds);
                            setTypingDuration(minutes * 60 + seconds)
                            setIsTyping(true)
                            setIsGuessing(false)
                        }
                    } else {
                        let endTime = timingObj.endGuessingTime
                        const time = new Date(endTime).getTime()
                        const distance = time - (new Date().getTime())
                        console.log(time, distance);
                        if (distance > 0) {
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                            console.log(minutes, seconds);
                            setGuessingDuration(minutes * 60 + seconds)
                            setIsTyping(false)
                            setIsGuessing(true)
                        }
                    }
                }
            })
        }
    }, [gameCode, myTeam, totalTypingDuration, isTyping, isGuessing, summary, close])

    useEffect(() => {
        let typingInterval
        if (senderName && myNameEn && isTyping === true && isGuessing === false && gameCode) {
            typingInterval = setInterval(() => {
                if (typingDuration > 0)
                    setTypingDuration(typingDuration => typingDuration - 1);
                else {
                    if (senderName === myNameEn) {
                        const updates = {};
                        const time = new Date();
                        console.log(time.getTime());
                        time.setSeconds(time.getSeconds() + (totalGuessingDuration + 1));
                        console.log(time.getTime());
                        updates[`${gameCode}/timingDetails/${myTeam}/endGuessingTime`] = (time.getTime());
                        updates[`${gameCode}/timingDetails/${myTeam}/guessingTimeRunning`] = true;
                        updates[`${gameCode}/timingDetails/${myTeam}/typingTimeRunning`] = false;
                        update(ref(db), updates)
                        clearInterval(typingInterval)
                        setIsDisabled(true)
                        // setIsTyping(false)
                        // setIsGuessing(true)
                    }
                }
            }, 1000);
        }
        return () => clearInterval(typingInterval);
    }, [typingDuration, isTyping, senderName, myNameEn]);


    useEffect(() => {
        let guessingInterval
        if (senderName && myNameEn && isGuessing === true && isTyping === false) {
            guessingInterval = setInterval(() => {
                if (guessingDuration > 0)
                    setGuessingDuration(guessingDuration => guessingDuration - 1);
                else {
                    currentRoundEmotion = currentRoundEmotion.toUpperCase();       
                    setCorrectAnswer(currentRoundEmotion)
                    setCurrScore(0)
                    let cuurR = parseInt(roundNo) +1;
                    const reRef = ref(db, `${gameCode}/roundDetails/${myTeam}/${cuurR}`);
                    get(reRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const summaryObj = snapshot.val();
                            const comp = summaryObj.selectedEmotion
                            setYourAnswer("NoN")
                            const otr = summaryObj.currScore
                            setCurrScore(parseInt(otr))
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    let newR = parseInt(roundNo) + 1
                    //alert("Guess Time Over")
                    if (senderName === myNameEn) {
                        const updates = {};               
                        updates[`${gameCode}/timingDetails/${myTeam}/summary`] = true;
                        let currR = parseInt(roundNo) + 1;
                        updates[`${gameCode}/roundDetails/${myTeam}/${currR}/currScore`] = 0;
                        updates[`${gameCode}/roundDetails/${myTeam}/${currR}/selectedEmotion`] = "NoN";
                        updates[`${gameCode}/teamDetails/${myTeam}/currentRound`] = parseInt(newR)
                        update(ref(db), updates)
                        //setIsDisabled(false)
                        // setIsTyping(true)
                    }
                    if(newR > maxRounds)
                        router.push('/leaderboard');
                    setIsGuessing(false)
                    setIsTyping(true)
                    clearInterval(guessingInterval)
                }
            }, 1000);
        }
        return () => clearInterval(guessingInterval);
    }, [guessingDuration, senderName, myNameEn, isTyping, isGuessing]);


    useEffect(() => {
        if (gameCode && roundNo > 0) {
            const a = "round" + roundNo;
            const reRef = ref(db, `${gameCode}/hostDetails`);
            get(reRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const hostObj = snapshot.val();
                    const comp = hostObj.compoundEmotion
                    setCompoundEmotionValue(comp)
                    const otr = hostObj.otherEmotion
                    setOtherEmotionValue(otr)                    
                    const roundEmotion = hostObj.setEmotion[`${a}`];
                    setCurrentRoundEmotion(roundEmotion)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [gameCode, roundNo, ]);

    //setTeams & Players & Scene
    useEffect(() => {
        if (myTeam != "" && !score) {
            const myP = window.sessionStorage.getItem('player-name')
            const teamRef = ref(db, `${gameCode}/teamDetails/${myTeam}`);
            onValue(teamRef, (snapshot) => {
                if (snapshot.exists()) {
                    const teamObj = snapshot.val()
                    const playerName = Object.keys(snapshot.val())
                    const playerArr = []
                    console.log(teamObj)
                    setTeam(teamObj)
                    for (let i = 0; i < playerName.length; i++) {
                        
                        if (playerName[i] == "currentRound") {
                            setRoundNo(teamObj[playerName[i]])

                            let rround = parseInt(teamObj[playerName[i]]) + 2;
                            const senderRef = ref(db, `${gameCode}/roundDetails/${myTeam}/${rround}`);
                            get(senderRef).then((snapshot) => {
                                if (snapshot.exists()) {
                                    const data = snapshot.val();
                                    console.log(data)
                                    setNextPlayer(data.sender)
                                } else {
                                    console.log("no rounds");
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                        else if (playerName[i] == "score") {
                            // alert("Found")
                            console.log("Found");
                            setScore(teamObj[playerName[i]])
                        }
                        else {
                            let obj = {
                                name: `${playerName[i]}`,
                                avatar: `${teamObj[playerName[i]]}`
                            }
                            if (myP == playerName[i]) {
                                setPlayer(obj)
                            }
                            playerArr.push(obj)
                        }
                    }
                    console.log(playerArr)
                    setPlayers(playerArr)
                } else {
                    console.log("no team");
                }
            });

            const sceneRef = ref(db, `${gameCode}/hostDetails`);
            get(sceneRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const sceneObj = snapshot.val()
                    const maxR = parseInt(sceneObj["noOfRounds"])
                    setMaxRounds(maxR)
                    setTotalTypingDuration(parseInt(sceneObj["typingTime"]))
                    setTotalGuessingDuration(parseInt(sceneObj["guessingTime"]))
                    const sceneIDD = parseInt(sceneObj["sceneId"])
                    console.log(sceneObj)
                    const sceneRef2 = ref(db, `${gameCode}/scenes/${sceneIDD}`);
                    get(sceneRef2).then((snapshot) => {
                        if (snapshot.exists()) {
                            let sceneObj2 = snapshot.val()
                            console.log(sceneObj2)
                            setScene(sceneObj2)
                            //console.log(scenes)
                        } else {
                            console.log("no scene.scene");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                } else {
                    console.log("no scene");
                }
            }).catch((error) => {
                console.error(error);
            });

        }
    }, [gameCode, myTeam , score]);

    useEffect(() => {
        var objDiv = document.getElementById("chatBox");
        objDiv.scrollTop = objDiv.scrollHeight;
        var objDiv2 = document.getElementById("gameLog");
        objDiv2.scrollTop = objDiv2.scrollHeight;
    })

    //setMessgae
    useEffect(() => {
        if (gameCode && myTeam != "") {
            const msgRef = ref(db, `${gameCode}/roundDetails/${myTeam}`);
            onValue(msgRef, (snapshot) => {
                if (snapshot.exists()) {
                    const newMsg = []
                    const rdObj = snapshot.val();
                    const newRN = roundNo + 1;
                    for (let i = 0; i <= newRN; i++) {
                        if(i>maxRounds+1)
                            return
                        if (rdObj[i].sender === "pre") {
                            newMsg.push(rdObj[i].msg);
                        }
                        else {
                            if(rdObj[i].msg !== "NoN"){
                                newMsg.push(rdObj[i].msg);
                            }
                            if (i == newRN) {
                                setSenderName(rdObj[i].sender);
                            }
                        }
                    }
                    setMessages(newMsg)
                } else {
                    console.log("nomsg");
                }
            });
        }
    }, [gameCode, myTeam, roundNo])


    const guessEmotion = (e) => {
        // if(guessedEmotions.length >= 2){
        //     alert('You guessed two emotions already!')
        //     return
        // }
        if (thisOrThatBool) {
            guessedEmotions.length >= 2 ? guessedEmotions.shift() : null
            guessedEmotions.push(e)
        } else {
            setEmotion(e)
        }
        console.log(guessedEmotions, "hi");
    }

    const confirmTheLifeline = (text) => {
        setConfirmLifeline(text)
    }

    useEffect(()=>{
        if(gameCode && currentRoundEmotion){
            for(let i=0;i<OtherEmotions.length;i++){
                if(OtherEmotions[i].includes(currentRoundEmotion))
                    setInother(OtherEmotions[i])
            }
        }      
    },[gameCode,currentRoundEmotion]);  


    const clickHandler = () => {
        //alert("Clicked")
        console.log(guessedEmotions)
        const updates = {}
        //console.log(emotion)
        emotion = emotion.toUpperCase();
        currentRoundEmotion = currentRoundEmotion.toUpperCase();       
        setEmotion(emotion)
        setYourAnswer(emotion)
        setCorrectAnswer(currentRoundEmotion)
        
        // for(let i=0;i<OtherEmotions.length;i++){
        //     if(OtherEmotions[i].includes(currentRoundEmotion))
        //         setInother(OtherEmotions[i])
        // }
        let currR = parseInt(roundNo) + 1;
        console.log(compoundEmotionValue,otherEmotionValue)
        let updatedScore = 0
        let value = 0;
        if(CompoundEmotions.includes(currentRoundEmotion)){
            if(emotion === currentRoundEmotion){
                //corret
                setCurrScore(compoundEmotionValue.correctGuess)
                updatedScore = parseInt(score) + parseInt(compoundEmotionValue.correctGuess);
                value = parseInt(compoundEmotionValue.correctGuess);
            }
            else{
                //incorrect
                setCurrScore(compoundEmotionValue.incorrectGuess)
                updatedScore = parseInt(score) + parseInt(compoundEmotionValue.incorrectGuess);
                value = parseInt(compoundEmotionValue.incorrectGuess);
            }
        }    
        else{
            if(emotion === currentRoundEmotion){
                //corret
                setCurrScore(otherEmotionValue.correctGuess)
                updatedScore = parseInt(score) + parseInt(otherEmotionValue.correctGuess);
                value = parseInt(otherEmotionValue.correctGuess);
            }
            else if(Inother.includes(emotion)){
                //adjusent
                setCurrScore(otherEmotionValue.adjacentCell)
                updatedScore = parseInt(score) + parseInt(otherEmotionValue.adjacentCell);
                value = parseInt(otherEmotionValue.adjacentCell);
            }
            else{
                //incorrect
                setCurrScore(otherEmotionValue.incorrectGuess)
                updatedScore = parseInt(score) + parseInt(otherEmotionValue.incorrectGuess);
                value = parseInt(otherEmotionValue.incorrectGuess);
            }
        }         
       
        let newR = parseInt(roundNo) + 1
        updates[`${gameCode}/teamDetails/${myTeam}/currentRound`] = parseInt(newR)
        if(newR > maxRounds)
            router.push('/leaderboard');
        updates[`${gameCode}/teamDetails/${myTeam}/score`] = updatedScore;
        updates[`${gameCode}/roundDetails/${myTeam}/${currR}/currScore`] = value;
        updates[`${gameCode}/roundDetails/${myTeam}/${currR}/selectedEmotion`] = emotion;
        updates[`${gameCode}/timingDetails/${myTeam}/summary`] = true;
        update(ref(db), updates)
        
    } 

    const onChangeHandler = (e) => {
        setStatement(e.target.value)
    }

    const onSubmit = () => {
        if (parseInt(roundNo) > parseInt(maxRounds)) {
            //alert("Oveeer")
            return
        }
        //alert(statement)

        if (senderName === myNameEn) {
            const updates = {};

            let newR = parseInt(roundNo + 1)
            updates[`${gameCode}/roundDetails/${myTeam}/${newR}/msg`] = statement
            //updates[`${gameCode}/teamDetails/${myTeam}/currentRound`] = parseInt(newR)

            const time = new Date();
            console.log(time.getTime());
            time.setSeconds(time.getSeconds() + (totalGuessingDuration + 1));
            updates[`${gameCode}/timingDetails/${myTeam}/endGuessingTime`] = (time.getTime());
            updates[`${gameCode}/timingDetails/${myTeam}/guessingTimeRunning`] = true;
            updates[`${gameCode}/timingDetails/${myTeam}/typingTimeRunning`] = false;
            update(ref(db), updates)
            // clearInterval(typingInterval)
            setIsDisabled(true)
            setStatement('')
            //setIsTyping(false)
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div className="flex flex-column h-screen bgNormal">
            <div className="flex justify-end my-8">
                {status === '1' ? <SettingsAndBack link='/host/hostDashboard' /> : null}
            </div>
            <div className="flex flex-row px-8 pb-4" style={{ flex: "1" }}>
                <div className="flex heading rounded-xl mx-2 flex-column items-center flex-1" style={{ height: "80vh" }}>
                    {players.map((player, index) => (
                        <div className={player.name === activePlayer.name ? "mt-4 p-2 burlywoodBorder rounded-lg" : "mt-4 p-2"} key={index}>
                            <div className="flex justify-center">
                                <img src={player.avatar} alt='avatar' className='h-20 w-20' />
                            </div>
                            <div className="text-center">
                                {player.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-column heading rounded-xl mx-2" style={{ flex: "4", height: "80vh" }}>
                    <div className="flex justify-between rounded-t-xl ebaBg whiteText text-xl px-8 pt-4 flex-1">
                        <div>
                            Round {roundNo}/{maxRounds}
                        </div>
                        {/* {console.log(tempTimer)} */}
                        {/* {tempTimer !== {} ? <Timer expiryTime={tempTimer} /> : null} */}
                        {/* <Timer expiryTime={time} /> */}
                        {console.log(typingDuration)}
                        <div>
                            {isGuessing && !isTyping ? `Guessing time :${Math.floor(guessingDuration / 60)}:${guessingDuration % 60}` : `Typing time: ${Math.floor(typingDuration / 60)}:${typingDuration % 60}`}
                        </div>
                    </div>
                    <div className="flex flex-column-reverse overflow-y-auto" style={{ flex: "9" }}>
                        {player.name === senderName || senderName === 'host' ?
                            <div className='flex flex-row justify-between py-2 px-3'>
                                <input placeholder='Be Careful! You can only submit one statement in a round.' className="ebaBg w-full input pl-2 border-2 font-extralight rounded-lg ebaBorder whiteText h-8" value={statement} onChange={e => onChangeHandler(e)} onKeyPress={(e) => e.key === 'Enter' && onSubmit()} disabled={isDisabled ? true : false} />
                                <button className='flex-1 ebaText h-full' onClick={onSubmit} disabled={isDisabled ? true : false} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            : null}
                        <div className="flex-1 ml-4 overflow-y-auto scl pr-2" id="chatBox">
                            <div className="inline-block w-full">
                                {messages.map((message, index) => (
                                    index % 2 !== 0 ?
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
                <div className="flex flex-column mx-2 items-center" style={{ flex: "4", height: "80vh" }}>
                    <div className="font-bold px-8 py-4 heading rounded-xl w-3/4 text-lg">
                        Scene: {scene.scene}
                    </div>
                    {player.name === senderName ? <Wheel emotionFunction={guessEmotion} currentRoundEmotion={currentRoundEmotion} /> : <Wheel emotionFunction={guessEmotion} deletedRow={deletedRow} callRobot={[correctEmotion, otherEmotion, thirdEmotion]} thisOrThatBool={thisOrThatBool} guessedEmotions={guessedEmotions} />}
                </div>
                <div className="flex flex-column mx-2 flex-1" style={{ height: "80vh" }}>
                    <div className="font-bold flex p-2 heading rounded-lg text-lg">
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ebaBg rounded-lg">{score.toString().length > 1 ? score.toString().slice(0, 1) : "0"}</div>
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ml-2 ebaBg rounded-lg">{score.toString().length > 1 ? score.toString().slice(1, 2) : score}</div>
                    </div>
                    <div className="h-full flex flex-column pt-2">

                        <button className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("This or That")} disabled={team.thisOrThat || (player.isRandomlySelected && player.name === senderName)} >
                            This or That
                        </button>
                        <button className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("Delete a row")} disabled={team.deleteARow || (player.isRandomlySelected && player.name === senderName)} >
                            Delete a row
                        </button>
                        <button className="my-2 text-sm rounded-md px-3 py-2 text-center font-bold buttonLifeline" onClick={() => confirmTheLifeline("Call the Bot")} disabled={team.callTheBot || (player.isRandomlySelected && player.name === senderName)} >
                            Call the bot
                        </button>

                        {player.name === senderName && player.isRandomlySelected ? null :
                            <button className='buttonNew rounded-md px-3 py-2 mb-3 mt-4 text-lg font-bold text-center'
                                onClick={() => clickHandler()} >Confirm</button>}
                        <div className="heading rounded-xl py-3 h-auto">
                            <div className="text-center">Game Log</div>
                            <div className="scl overscroll-y-auto px-1 py-1 text-xs text-center h-48" id="gameLog">
                                {gameLog.map((game, index) =>
                                    typeof (game.emotion) === "object" && roundNo > 1 ?
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

            {ruleBook ?
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
                </div> : <></>}

            {callHost ?
                <div className="h-screen w-screen bg-opacity-50 absolute top-0 left-0 flex justify-center items-center" style={{ backgroundColor: "rgba(235, 162, 130, 0.5)" }}>
                    <div className="bg-gray-200 rounded-lg p-4 text-center" style={{ backgroundColor: "#fffaee", color: "#da764b" }}>
                        <div className="text-xl font-bold">
                            Do you want to call<br />the Host?
                        </div>
                        <div className="flex justify-evenly items-center">
                            <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => callHostF()}>Yes</div>
                            <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => setCallHost(false)}>No</div>
                        </div>
                    </div>
                </div>
                : <></>}

            {summary ? <Summary setSummary={setSummary} setClose={setClose} correctAnswer={correctAnswer} yourAnswer={yourAnswer} pointsEarnerd={currScore} nextPlayer={nextPlayer} /> : <></>}

            {confirmLifeline ? <ConfirmLifeline setConfirmLifeline={setConfirmLifeline} lifeLine={confirmLifeline} /> : <></>}
        </div>
    );
}

export default game;