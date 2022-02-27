import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
// import { SocketContext } from '../../context/socket/SocketContext'
import TeamPlayers from "../../components/TeamPlayers";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import styles from "../css/hostScreen.module.css"

const manual = () => {

    const router = useRouter()
    // const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState('')

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState("team1")
    const [role, setRole] = useState("")
    const [mode, setMode] = useState("")
    const [guessingTime,setGuessingTime] = useState(0);
    const [typingTime,setTypingTime] = useState(0);
    const db = getDatabase()

    useEffect(() => {
        const gameId = sessionStorage.getItem('game-code');
        setGameCode(gameId);
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        const clientRole = window.sessionStorage.getItem('role')
        setRole(clientRole)
    }, []);


    useEffect(() => {
        if (!gameCode) {
            return
        }
        const db = getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setNumberOfPlayers(data)
            }
        });
    }, [gameCode]);

    useEffect(()=>{
        const db = getDatabase();
        const hostRef = ref(db,`${gameCode}/hostDetails`);
        onValue(hostRef,(snapshot)=>{
            if(snapshot.exists()){
                const snapData = snapshot.val();
                const guessingTimeData = snapData.guessingTime;
                const typingTimeData = snapData.typingTime;
                setGuessingTime(guessingTimeData);
                setTypingTime(typingTimeData);
            }
        })
    },[gameCode]);

    useEffect(() => {
        if (!gameCode) {
            return
        }
        const modeRef = ref(db, `${gameCode}/gameMode`);
        onValue(modeRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                alert(data)
                setMode(data)
            }
        }, {
            onlyOnce: true
        });
    }, [gameCode]);

    //lobbyPlayers
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const usersRef = ref(db, `${gameCode}/inLobbyPlayers2`);
        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const lobbyPlayersObj = snapshot.val();
                const userNamesArr = Object.keys(lobbyPlayersObj);
                let playerArr = [], obj
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
                setPlayers(playerArr)
            }
            else {
                setPlayers([])
            }
        });
    }, [gameCode]);

    //teamComponent
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase()
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
                    console.log(typeof (teamMembersNames[j]));
                    if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {

                    }
                    else {
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
        });

    }, [gameCode]);

    const clickHandler = () => {
        if(teams && gameCode){
            // alert('teams coming in console')
            const db = getDatabase();
            const updates = {};
            for(let i=0;i<teams.length;i++){
                const teamNome = teams[i].teamName;
                console.log(teamNome);
                updates[`${gameCode}/timingDetails/${teamNome}/endGuessingTime`]=parseInt(guessingTime);
                updates[`${gameCode}/timingDetails/${teamNome}/endTypingTime`]=parseInt(typingTime);
                updates[`${gameCode}/timingDetails/${teamNome}/guessingTimeRunning`]=false;
                updates[`${gameCode}/timingDetails/${teamNome}/typingTimeRunning`]=true;
            }
            console.log(updates)
            updates[`${gameCode}/isActive`] = 1
            update(ref(db), updates)
            //sessionStorage.setItem('status', 1);
            router.push('/scene')
            // socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
            // socket.on('scene-page', () => router.push('/scene'))
        }
    }

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return (
        <div className="flex flex-col bgNormal justify-center items-center h-screen">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} /></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams ? (<TeamComponent role={role} teams={teams} activeTeam={activeTeam} activeIcon={activeButton} />) : (null)}
                    {/*  playersWithoutTeams={players} */}
                </div>
                <div className='w-3/12'>
                    {teams ? <TeamPlayers role={role} mode={mode} team={teams.find(t => t.teamName == activeTeam)} activeTeam={activeTeam} allTeams={teams} status={true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text={'Start'} clickHandler={() => clickHandler()} /></div>
        </div>
    );
}

export default manual;