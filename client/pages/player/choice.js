import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import TeamPlayers from "../../components/TeamPlayers";
import { SocketContext } from "../../context/socket/SocketContext";
import useAuth from "../../hooks/useAuth";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import styles from "../css/hostScreen.module.css"

const choice = () => {
    const { playersNO} = useAuth();

    const router = useRouter()

    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const socket = useContext(SocketContext)
    const [playerMax, setPlayerMax] = useState()
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)
    const [mode, setMode] = useState('')
    const [playerName, setPlayerName] = useState("")

    // numberOfPlayers -> done
    // gameCode --> done
    // playerMax --> done
    // teams --> done
    // activeTeam
    // mode -> done
    // playerName -> done


    // setting gamecode and player name 
    useEffect(() => {
        const gameCode = window.localStorage.getItem('game-code')
        setGameCode(gameCode)
        const playerName = window.localStorage.getItem('player-name')
        setPlayerName(playerName)
        setPlayerMax(playersNO)
    }, [])

    useEffect(()=>{
        if(gameCode){
            const db = getDatabase();
            const gModeRef = ref(db,`${gameCode}/gameMode`);
            onValue(gModeRef, (snapshot)=>{
                if(snapshot.exists()){
                    setMode(snapshot.val())
                }
                else{
                    alert("doesn't exists")
                }
            })
        }
    },[gameCode]);

    useEffect(() => {
        if (!gameCode) {
            return
        }
        const db=getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setNumberOfPlayers(data)
            }
        });
    }, [gameCode]);

    //teamComponent
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db=getDatabase()
        const teamsRef = ref(db, `${gameCode}/teamDetails`);
        onValue(teamsRef, (snapshot) => {
            if (!snapshot.exists())
                return
            const teamsObj = snapshot.val();
            let teamsNames = Object.keys(teamsObj);
            let teamsArr = []
            for (let i = 0; i < teamsNames.length; i++) {
                let teamMembers = []
                let teamName = teamsNames[i]
                let teamObj = teamsObj[teamName]
                let teamMembersNames = Object.keys(teamObj);
                console.log(teamObj, "ss");
                for (let j = 0; j < teamMembersNames.length; j++) {
                    console.log(typeof(teamMembersNames[j]));
                    if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {
                        
                    }
                    else{
                        let obj = {
                            name: teamMembersNames[j],
                            avatar: teamObj[teamMembersNames[j]]
                        }
                        teamMembers.push(obj)
                    }
                }
                teamsArr.push({ teamName, teamMembers })
            }
            setTeams(teamsArr)
            alert(teams)
        });

    }, [gameCode]);


    /* useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        socket.on('players', players => setNumberOfPlayers(players.length))
        socket.on('removed', () => window.location.href = '/play')
        const playerName = sessionStorage.getItem('player-name')
        setPlayerName(playerName)
        const gameCode = sessionStorage.getItem('game-code')
        socket.emit('player-in-teams', {gameCode, playerName})
        socket.on('player-teams', ({teams,mode}) => {
            console.log('pop ',teams);
            const myTeam  = teams.find(t => t.teamMembers.find(p => p.name === sessionStorage.getItem('player-name')));
            if(myTeam)
                sessionStorage.setItem('team-name', myTeam.teamName)
            setMode(mode)
            setTeams(teams)})
        socket.on('teams', teams => {
            console.log(teams);
            const myTeam  = teams.find(t => t.teamMembers.find(p => p.name === sessionStorage.getItem('player-name')));
            if(myTeam)
                sessionStorage.setItem('team-name', myTeam.teamName)
            setTeams(teams)})
        socket.on('err', ({message}) => alert(message))
        //Max players per team
        socket.on('max-players', maxPlayers => setPlayerMax(maxPlayers))
        socket.on('scene-page', () => router.push('/scene'))
    }, [socket]) */

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col justify-center items-center bgNormal h-screen">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeIcon = {activeButton} activeTeam={activeTeam} player={true} playerName={playerName}/>) : (null)}
                </div>
                <div className='w-3/12'>
                {teams? <TeamPlayers teams = {teams.find(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} player={true} mode = {mode} playerMax={playerMax}/> : null}
                </div>
            </div>
            </div>
     );
}
 
export default choice;