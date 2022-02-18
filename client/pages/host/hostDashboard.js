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
import { SocketContext } from "../../context/socket/SocketContext"
import router from "next/router"

const hostDashboard = () => {

    const socket = useContext(SocketContext)
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [scene, setScene] = useState('')
    const [selected, setSelected] = useState("emotion")
    const [emotionArray, setEmotionArray] = useState(["Hate", "Love", "Greed", "Jealous"])
    const [playersWithoutTeams, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [rounds, setMaxRounds] = useState()
    
    const [otherCorrect, setOtherCorrect] = useState(2)
    const [otherIncorrect, setOtherIncorrect] = useState(0)
    const [otherAdjacent, setOtherAdjacent] = useState(1)
    const [compoundCorrect, setCompoundCorrect] = useState(3)
    const [compoundIncorrect, setCompoundIncorrect] = useState(0)

    useEffect(() => {
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
    },  [socket])


    return ( <div className="flex flex-row bgNormal">

        <Sidebar selected={selected} setSelected={setSelected}/>
         
        <div style={{flex:10}}>



            {selected==="timeRound"?
// timeround            
            <TimeRound typingTime = {typingTime} guessingTime={guessingTime} MAX_ROUND = {rounds} />:

            selected==="scene"?
// scene
            // <Scene scene = {scene} />:
            <DashboardScene scene = {scene[0]} />:

            selected==="emotion"?
// emotion
            <Emotion emotionArray={emotionArray} Wheel={<Wheel />}/>:

            selected==="scoring"?
// scoring 
            <Scoring 
            otherAdjacent = {otherAdjacent}
            otherCorrect = {otherCorrect}
            otherIncorrect = {otherIncorrect}
            compoundCorrect = {compoundCorrect}
            compoundIncorrect = {compoundIncorrect}
            />:

            selected==="teams"?
// teams     
            <Teams teams={teams} rounds = {rounds} />:

// lobby 
            <div className="flex justify-center items-center h-screen">
                <PlayerComponent players = {playersWithoutTeams} teams = {teams} />
            </div>}
        </div>
    </div> );
}
 
export default hostDashboard;