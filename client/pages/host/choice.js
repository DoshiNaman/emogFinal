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
    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    // const [players, setPlayers] = useState([])
    const [playersInLobby, setPlayersInLobby] = useState([])
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState("team1")
    const [mode, setMode] = useState("")
    const [role, setRole] = useState("")
    const db = getDatabase()
    // numberOfPlayers -> done
    // gameCode -> done
    // players -> done
    // teams -> done
    // activeTeam 

    // setting gamecode and player name 
    useEffect(() => {
        const gameCode = window.localStorage.getItem('game-code')
        setGameCode(gameCode)
        const clientRole = window.localStorage.getItem('role')
        setRole(clientRole)
    }, [])

    // setting number of players
    useEffect(() => {
        if (!gameCode) {
            return
        }
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                alert(data)
                setNumberOfPlayers(data)
            }
        });
    }, [gameCode]);


    // setting the players
    // useEffect(() => {
    //     if (!gameCode) {
    //         return
    //     }
    //     const playersRef = ref(db, `${gameCode}/inLobbyPlayers2`);
    //     onValue(playersRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const data = snapshot.val();
    //             setPlayers(data)
    //         }
    //     });
    // }, [gameCode]);

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

    // setting the teams 
    //teamComponent
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        // const db = getDatabase()
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
                // console.log(teamObj, "ss");
                for (let j = 0; j < teamMembersNames.length; j++) {
                    // console.log(typeof (teamMembersNames[j]));
                    if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {
                        continue;
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
            console.log(teamsArr);
            setTeams(teamsArr)
        });

    }, [gameCode]);

    const clickHandler = () => {
        // socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
        // socket.on('scene-page', () => router.push('/scene'))
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
                    {/* playersWithoutTeams={players} */}
                </div>
                <div className='w-3/12'>
                    {/* {console.log(teams.map(t => console.log(t.teamName === activeTeam)))} */}
                    {teams ? <TeamPlayers role={role} mode={mode} team={teams.find(t => t.teamName == activeTeam)} activeTeam={activeTeam} allTeams={teams} status={true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text={'Start'} clickHandler={() => clickHandler()} /></div>
        </div>
    );
}

export default choice;