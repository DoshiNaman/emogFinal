import { useContext, useEffect, useState } from "react"
import PlayerComponent from "../../components/Host/PlayerComponent"
import Sidebar from "../../components/Host/Sidebar"
import Wheel from "../../components/wheel"
import TimeRound from "../../components/Host/Timeround"
// import Scene from "../../components/Host/Scene"
import DashboardScene from "../../components/Host/dashboardScene"
import Emotion from "../../components/Host/Emotion"
import Scoring from "../../components/Host/Scoring"
import Teams from "../../components/Host/Teams"
import router from "next/router"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';


const hostDashboard = () => {

    const [guessingTime, setGuessingTime] = useState(0)
    const [typingTime, setTypingTime] = useState(0)
    const [scene, setScene] = useState({})
    const [selected, setSelected] = useState("emotion")
    const [emotionArray, setEmotionArray] = useState(["Hate", "Love", "Greed", "Jealous"])
    const [playersWithoutTeams, setPlayersWithoutTeams] = useState([])
    const [teams, setTeams] = useState([])
    const [rounds, setMaxRounds] = useState(0)

    const [otherCorrect, setOtherCorrect] = useState(2)
    const [otherIncorrect, setOtherIncorrect] = useState(0)
    const [otherAdjacent, setOtherAdjacent] = useState(1)
    const [compoundCorrect, setCompoundCorrect] = useState(3)
    const [compoundIncorrect, setCompoundIncorrect] = useState(0)

    const [gameCode, setGameCode] = useState("")
    const [status, setStatus] = useState("")//status == host
    const db = getDatabase()

    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        if (gameCode !== undefined)
            setGameCode(gameCode)
        const stat = sessionStorage.getItem('role')
        if (stat !== undefined) {
            setStatus(stat)
            console.log(typeof stat);
        }
    }, [])


    useEffect(()=>{
        if(gameCode && status==='host'){
            const db = getDatabase();
            const notificationRef = ref(db,`${gameCode}/hostNotification`);
            onValue(notificationRef,(snapshot)=>{
                if(snapshot.exists()){
                    const snapData = snapshot.val();
                    // alert('this is coming from player side')
                    alert(` ${snapData['playerName']} of ${snapData['teamName']} is calling you.`)
                }
            })
        }
    },[gameCode,status]);

    useEffect(() => {
        if (gameCode && status === "host") {
            const hostRef = ref(db, `${gameCode}/hostDetails`)
            get(hostRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const hostObj = snapshot.val()
                    setTypingTime(hostObj.typingTime)
                    setGuessingTime(hostObj.guessingTime)
                    setMaxRounds(hostObj.noOfRounds)

                    const sceneID = parseInt(hostObj.sceneId)
                    const sceneRef = ref(db, `${gameCode}/scenes/${sceneID}`)
                    get(sceneRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const sceneObj = snapshot.val()
                            setScene(sceneObj)
                        }
                    }).catch(err => {
                        console.log("scene", err);
                    })
                    const emotionsObj = hostObj.setEmotion
                    const emotions = []
                    for (const [key, value] of Object.entries(emotionsObj)) {
                        let obj = {
                            round: key,
                            emotionName: value
                        }
                        emotions.push(obj)
                    }
                    setEmotionArray(emotions)

                    setOtherAdjacent(hostObj.otherEmotion.adjacentCell)
                    setOtherCorrect(hostObj.otherEmotion.correctGuess)
                    setOtherIncorrect(hostObj.otherEmotion.incorrectGuess)
                    setCompoundCorrect(hostObj.otherEmotion.correctGuess)
                    setCompoundIncorrect(hostObj.otherEmotion.incorrectGuess)

                }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [gameCode, status])

    useEffect(() => {
        if (gameCode) {
            const usersRef = ref(db, `${gameCode}/inLobbyPlayers2`);
            onValue(usersRef, (snapshot) => {
                if (snapshot.exists()) {
                    const lobbyPlayersObj = snapshot.val();
                    const userNamesArr = Object.keys(lobbyPlayersObj);
                    let playerArr = [];
                    let obj
                    for (let i = 0; i < (userNamesArr.length); i++) {
                        obj = {}
                        if (userNamesArr[i] !== "") {
                            obj = {
                                name: userNamesArr[i],
                                avatar: lobbyPlayersObj[userNamesArr[i]]
                            }
                            playerArr.push(obj)
                        }
                    }
                    // console.log(playerArr, "lobby players");
                    console.log("player adeedd to taemasa");
                    setPlayersWithoutTeams(playerArr)
                } else {
                    setPlayersWithoutTeams([])
                }
            });
        }
    }, [gameCode]);

    useEffect(() => {
        if (!gameCode || gameCode === 0 || rounds<=0) {
            return
        }
        const teamsRef = ref(db, `${gameCode}/teamDetails`);
        onValue(teamsRef, (snapshot) => {
            if (!snapshot.exists())
                return
            const teamsObj = snapshot.val();
            let teamsNames = Object.keys(teamsObj);
            let compTeams = 0
            let teamsArr = []

            for (let i = 0; i < teamsNames.length; i++) {
                let teamMembers = []
                let teamName = teamsNames[i]
                let teamScore = 0
                let teamRoundNo = 0
                //let tobj = {}
                // console.log(teamName)
                let teamObj = teamsObj[teamName]
                let teamMembersNames = Object.keys(teamObj);
                console.log(teamObj, "ss");
                // teamsObj[usersInfo[i]].teamPlayers.length
                for (let j = 0; j < teamMembersNames.length; j++) {
                    console.log(typeof (teamMembersNames[j]));
                    if (teamMembersNames[j] === "score"){
                        teamScore=teamObj["score"]
                        console.log(teamObj["score"])
                    }
                    else if(teamMembersNames[j] === "currentRound") {
                        teamRoundNo=teamObj["currentRound"]
                        console.log(teamObj["currentRound"],rounds)
                        if(teamObj["currentRound"] > rounds)
                            compTeams++
                    }
                    else {
                        let obj = {
                            name: teamMembersNames[j],
                            avatar: teamObj[teamMembersNames[j]]
                        }
                        teamMembers.push(obj)
                    }
                }
                teamsArr.push({ teamName, teamMembers , score:teamScore, roundNo:teamRoundNo})
            }
            console.log(compTeams)
            if(compTeams === teamsNames.length){
                //alert("LEADER")
                router.push('/leaderboard')
            }
            setTeams(teamsArr)
        });

    }, [gameCode,rounds]);

    return (<div className="flex flex-row bgNormal">

        <Sidebar gameCode={gameCode} selected={selected} setSelected={setSelected} />

        <div style={{ flex: 10 }}>



            {selected === "timeRound" ?
                // timeround            
                <TimeRound typingTime={typingTime} guessingTime={guessingTime} MAX_ROUND={rounds} /> :

                selected === "scene" ?
                    // scene
                    // <Scene scene = {scene} />:
                    <DashboardScene scene={scene} /> :

                    selected === "emotion" ?
                        // emotion
                        <Emotion emotionArray={emotionArray} Wheel={<Wheel />} /> :

                        selected === "scoring" ?
                            // scoring 
                            <Scoring
                                otherAdjacent={otherAdjacent}
                                otherCorrect={otherCorrect}
                                otherIncorrect={otherIncorrect}
                                compoundCorrect={compoundCorrect}
                                compoundIncorrect={compoundIncorrect}
                            /> :

                            selected === "teams" ?
                                // teams     
                                <Teams teams={teams} rounds={rounds} /> :

                                // lobby 
                                <div className="flex justify-center items-center h-screen">
                                    <PlayerComponent players={playersWithoutTeams} teams={teams} />
                                </div>}
        </div>
    </div>);
}

export default hostDashboard;

/* useEffect(() => {
       socket.emit('host-dashboard', sessionStorage.getItem('game-code'))
       socket.on('team-details', teams => {setTeams(teams)})
       socket.on('game-scenes', scene => setScene(scene))
       socket.on('typing-timer', typingTimer => setTypingTime(typingTimer))
       socket.on('guessing-timer', guessingTimer => setGuessingTime(guessingTimer))
       socket.on('player-without-teams', players => setPlayers(players))
       socket.on('emotions', emotions => setEmotionArray(emotions) )
       socket.on('max-rounds', maxRound => setMaxRounds(maxRound))
       socket.on('compound-correct', compoundCorrect => setCompoundCorrect(compoundCorrect))
       socket.on('compound-incorrect', compoundIncorrect => setCompoundIncorrect(compoundIncorrect))
       socket.on('adjacent', otherAdjacent => setOtherAdjacent(otherAdjacent))
       socket.on('other-correct', otherCorrect => setOtherCorrect(otherCorrect))
       socket.on('other-incorrect', otherIncorrect => setOtherIncorrect(otherIncorrect))
       socket.on('leaderboard-js', () => router.push('/leaderboard'))
},  [socket]) */