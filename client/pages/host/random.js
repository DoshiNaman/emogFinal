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
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
    }, []);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db=getDatabase();
        const users=ref(db, `${gameCode}/users`);
        onValue(users, (snapshot) => {
            if(snapshot.exists()){
                const avtars=snapshot.val()
                console.log(avtars);
                const teams=[] 
                const teamsRef = ref(db, `${gameCode}/teamDetails`);
                let teamsArr = []
                onValue(teamsRef, (snapshot) => {
                    const teamsObj = snapshot.val();
                    const usersInfo = Object.keys(teamsObj);
                    for(let i=0;i<usersInfo.length;i++){    
                        let teamName = usersInfo[i]
                        console.log(teamName)
                        let teamMembers = []
                        for(let j=0;j<teamsObj[usersInfo[i]].teamPlayers.length;j++){
                            //console.log(teamsObj[usersInfo[i]].teamPlayers[j])
                            let obj = {
                                name: teamsObj[usersInfo[i]].teamPlayers[j],
                                avatar: avtars[teamsObj[usersInfo[i]].teamPlayers[j]]
                            }
                            console.log(obj)
                            teamMembers.push(obj)
                        }
                        let team = { teamName, teamMembers }
                        teams.push(team)
                    }
                    
                    setTeams(teams) 
                });
            }
            else{
                alert("NOT WORK")
            }
            //const nameUsers = Object.keys(snapshot.val());
        });
        
    }, [gameCode]);
    


    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            const data = snapshot.val();
            setNumberOfPlayers(data)
        });
    }, [gameCode]);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const usersRef = ref(db, `${gameCode}/userDetails`);
        onValue(usersRef, (snapshot) => {
            const usersObj = snapshot.val();
            const usersInfo = Object.keys(snapshot.val());
            let playerArr = [], obj = {}
            for (let i = 0; i < (usersInfo.length); i++) {
                if (usersInfo[i] !== "noOfPlayer")
                {
                    obj = {
                        name: usersInfo[i],
                        avatar: usersObj[usersInfo[i]].avatar
                    }
                    playerArr.push(obj)
                }
                // console.log(persons[usersInfo[i]].avatar)
            }
            setPlayers(playerArr)
        });
    }, [gameCode]); 



    /*
    const clickHandler = () => {
        socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
        socket.on('scene-page', () => router.push('/scene'))
    }

    useEffect(() => {
        let isMounted = true
        if(isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        socket.emit('random-division', sessionStorage.getItem('game-code'))
        socket.on('random-teams', teams => {
            console.log(teams);
            if(isMounted)
                setTeams(teams)
        })
        socket.on('players', players => {
            if(isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('players-without-teams', playersWithoutTeams => {
            console.log('no teams :(');
            if(isMounted)
                setPlayers(playersWithoutTeams)
        })
        socket.on('teams', teams => {
            console.log(teams);
            setTeams(teams)})

        return () => {
            isMounted = false
        }
    }, [socket])*/

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col justify-center items-center h-screen bgNormal">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeTeam={activeTeam} activeIcon = {activeButton} playersWithoutTeams = {players} />) : (null)}
                </div>
                <div className='w-3/12'>
                    {teams? <TeamPlayers teams = {teams.find(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} status = {true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text = {'Start'} clickHandler = {() => clickHandler()} /></div>
        </div>
     );
}
 
export default random;