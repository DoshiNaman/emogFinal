import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
import TeamPlayers from "../../components/TeamPlayers";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import styles from "../css/hostScreen.module.css"

const manual = () => {
    const {playersNO, setPlayersNO ,totalUsers, setTotalUsers,lobbyUsers, setLobbyUsers} = useAuth();
    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)
    
    
    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
        alert(playersNO)
    }, []);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const usersRef = ref(db, `${gameCode}/userDetails`);
        let playerArr=[],p2=[];
        onValue(usersRef, (snapshot) => {
            const usersObj = snapshot.val();
            const usersInfo = Object.keys(snapshot.val());
            let obj = {};
            for (let i = 0; i < (usersInfo.length); i++) {
                if (usersInfo[i] !== "noOfPlayer")
                {  
                    obj = {
                        name: usersInfo[i],
                        avatar: usersObj[usersInfo[i]].avatar
                    }
                    playerArr.push(obj)
                    p2.push(usersInfo[i])
                }
                    
            }
                // console.log(persons[usersInfo[i]].avatar)
        });
        setPlayers(playerArr)
        setLobbyUsers([...p2])
        
    }, [gameCode,lobbyUsers]);



    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
    console.log(totalUsers);
    const db = getDatabase();
    const usersRef = ref(db, `${gameCode}/userDetails`);
            
    onValue(usersRef, (snapshot) => {
        const usersObj = snapshot.val();
        const usersInfo = Object.keys(snapshot.val());
        const playerArr=[],obj = {}
        console.log(totalUsers);
        console.log(lobbyUsers);
        /* for (let i = 0; i < (usersInfo.length); i++) {
            if (usersInfo[i] !== "noOfPlayer")
            {   
                if(totalUsers.length!==0){
                    for(let k=0;k<totalUsers.length;k++){
                        //alert(totalUsers[k])
                        if (usersInfo[i] !== totalUsers[k]){
                            console.log(totalUsers.length)
                            console.log(usersInfo[i])
                             obj = {
                                name: usersInfo[i],
                                avatar: usersObj[usersInfo[i]].avatar
                            }
                            playerArr.push(obj) 
                        } 
                    }
                }
                else{
                    obj = {
                        name: usersInfo[i],
                        avatar: usersObj[usersInfo[i]].avatar
                    }
                    playerArr.push(obj)
                }
            }
        } */
        //setPlayers(playerArr)
    });
    }, [gameCode,totalUsers,lobbyUsers]); 


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

                    let team = []
                    
                    if(teams.length===usersInfo.length){
                        alert("METCH");
                        return
                    }

                    for(let i=0;i<usersInfo.length;i++){    
                        let teamName = usersInfo[i]
                        console.log(teamName)
                        let teamMembers = []
                        for(let j=0;j<teamsObj[usersInfo[i]].teamPlayers.length;j++){
                            //console.log(teamsObj[usersInfo[i]].teamPlayers[j])
                            if(teamsObj[usersInfo[i]].teamPlayers[j]==0){
                                //alert("Zero")
                                break
                            }
                            let obj = {
                                name: teamsObj[usersInfo[i]].teamPlayers[j],
                                avatar: avtars[teamsObj[usersInfo[i]].teamPlayers[j]]
                            }
                            //console.log(obj)
                            teamMembers.push(obj)
                        }
                        team.push({ teamName, teamMembers })
                    }
                    console.log(team)

                    setTeams(team)
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

    /* useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const teamsRef = ref(db, `${gameCode}/teamDetails`);
        
        onValue(teamsRef, (snapshot) => {
            let tUsers=[]
            const teamsObj = snapshot.val();
            const teamsInfo = Object.keys(teamsObj);
            for(let i=0;i<teamsInfo.length;i++){    
                let teamName = teamsInfo[i]
                //console.log(teamName)
                for(let j=0;j<teamsObj[`${teamName}`].teamPlayers.length;j++){
                    if(teamsObj[`${teamName}`].teamPlayers[0]!==0){
                        tUsers.push(teamsObj[`${teamName}`].teamPlayers[j])
                    }
                }
            }
            setTeamUsers([...tUsers])
            console.log(tUsers)
            const usersRef = ref(db, `${gameCode}/userDetails`);
            
            onValue(usersRef, (snapshot) => {
                const usersObj = snapshot.val();
                const usersInfo = Object.keys(snapshot.val());
                let playerArr=[],obj = {}
                console.log(tUsers);
                for (let i = 0; i < (usersInfo.length); i++) {
                    if (usersInfo[i] !== "noOfPlayer")
                    {   
                        if(tUsers.length!==0){
                            for(let k=0;k<tUsers;k++){
                                alert(tUsers[k])
                                 if (usersInfo[i] !== tUsers[k]){
                                    obj = {
                                        name: usersInfo[i],
                                        avatar: usersObj[usersInfo[i]].avatar
                                    }
                                    playerArr.push(obj)
                                } 
                            }
                        }
                        else{
                            obj = {
                                name: usersInfo[i],
                                avatar: usersObj[usersInfo[i]].avatar
                            }
                            playerArr.push(obj)
                        }
                    }
                }
                setPlayers(playerArr)
            });
        });
    }, [gameCode]); */

   /* useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        
        const usersRef = ref(db, `${gameCode}/userDetails`);
        let playerArr=[];
        onValue(usersRef, (snapshot) => {
            const usersObj = snapshot.val();
            const usersInfo = Object.keys(snapshot.val());
            let obj = {}
            console.log(tUsers)
            for (let i = 0; i < (usersInfo.length); i++) {
                if (usersInfo[i] !== "noOfPlayer")
                {  
                    if(tUsers.length==0){
                        obj = {
                            name: usersInfo[i],
                            avatar: usersObj[usersInfo[i]].avatar
                        }
                        playerArr.push(obj)
                    }
                    else{
                        for(let k=0;k<tUsers.length;k++){
                            if(usersInfo[i]!==tUsers[k]){    
                                obj = {
                                    name: usersInfo[i],
                                    avatar: usersObj[usersInfo[i]].avatar
                                }
                                playerArr.push(obj)
                            }
                        }
                    }
                    
                    
                }
                // console.log(persons[usersInfo[i]].avatar)
            }
        });
        setPlayers(playerArr)


        
    }, [gameCode]);*/


    const clickHandler = () => {
        // socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
        // socket.on('scene-page', () => router.push('/scene'))
    }

    /* useEffect(() => {
        socket.emit('manual-division', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            setNumberOfPlayers(players.length)
        })
        socket.on('teams', teams => setTeams(teams))
        socket.on('players-without-teams', playersWithoutTeams => {
            console.log('no teams :(');
            setPlayers(playersWithoutTeams)
        })
        socket.on('manual-teams', teams => {
            setTeams(teams)
        })
        setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        
    }, [socket]) */

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col bgNormal justify-center items-center h-screen">
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
 
export default manual;