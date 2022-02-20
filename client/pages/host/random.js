import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "../../context/socket/SocketContext";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import TeamPlayers from "../../components/TeamPlayers";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import styles from "../css/hostScreen.module.css"

const random = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)
    const [playersInLobby, setPlayersInLobby] = useState([])
    const [playerName, setPlayerName] = useState("")
    const [isPlayer, setIsPlayer] = useState(false)
    const db = getDatabase();

    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
        const name = localStorage.getItem('player-name');
        if (name !== undefined) {
            setPlayerName(name)
            // setIsPlayer(true)
        }
    }, []);

    useEffect(() => {
        if (!gameCode) {
            return
        }
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setNumberOfPlayers(data)
            }
        });
    }, [gameCode]);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        // const users = ref(db, `${gameCode}/users`);
        // onValue(users, (snapshot) => {

        //     if (snapshot.exists()) {
        //         const avtars = snapshot.val()
        //         console.log(avtars);
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
                // console.log(teamName)
                let teamObj = teamsObj[teamName]
                let teamMembersNames = Object.keys(teamObj);
                console.log(teamObj, "ss");
                // teamsObj[usersInfo[i]].teamPlayers.length
                for (let j = 0; j < teamMembersNames.length; j++) {
                    if (teamMembersNames[j] !== "score") {
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
        //console.log(teamsObj[usersInfo[i]].teamPlayers[j])
        // if (teamsObj[usersInfo[i]].teamPlayers[j] == 0) {
        //     alert("Zero")
        //     return
        // }
        // name: teamsObj[usersInfo[i]].teamPlayers[j],
        // avatar: avtars[teamsObj[usersInfo[i]].teamPlayers[j]]
        //     }
        //     else {
        //         alert("NOT WORK")
        //     }
        //     //const nameUsers = Object.keys(snapshot.val());
        // });

    }, [gameCode]);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const usersRef = ref(db, `${gameCode}/inLobbyPlayers`);
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
                setPlayersInLobby(playerArr)
            }
        });
    }, [gameCode]);

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    const createNewTeam = () => {
        let length = teams.length
        let updates = {}
        updates[`${gameCode}/teamDetails/${length + 1}`] = { score: 0 }
        update(db, updates)
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bgNormal">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} /></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams ? (<TeamComponent teams={teams} createNewTeam={createNewTeam} playerName={playerName} activeTeam={activeTeam} player={isPlayer} activeIcon={activeButton} playersWithoutTeams={playersInLobby} />) : (null)}
                </div>
                <div className='w-3/12'>
                    {teams ? <TeamPlayers team={teams.find(t => t.teamName == activeTeam)} activeTeam={activeTeam} allTeams={teams} status={true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text={'Start'} clickHandler={() => clickHandler()} /></div>
        </div>
    );
}

export default random;