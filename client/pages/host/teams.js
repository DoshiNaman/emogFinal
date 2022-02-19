import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
import Button from '../../components/Button'
import EndGame from "../../components/endGame"
import useAuth from "../../hooks/useAuth"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const teams = () => {
    const {playersNO, setPlayersNO} = useAuth();
    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState('')
    const [mode, setMode] = useState('random')
    const [numberTeams, setNumberTeams] = useState(0)
    const [players, setPlayers] = useState([])
    const [playersPerTeam, setPlayersPerTeam] = useState(0)

    /* useEffect(() => {
        let isMounted = true
        setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('join-teams', sessionStorage.getItem('game-code'))
        
            if(isMounted){
            socket.on('players', numberPlayers => {
                if(isMounted){
                    setNumberOfPlayers(numberPlayers.length)
                }
                if(isMounted)
                    setPlayers(numberPlayers)
            })
        }
        
        return() => {
            isMounted = false
        }
    }, [socket]) */

    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
    }, []);

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            const data = snapshot.val();
            setPlayersPerTeam(data)
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



    const continueGame = () => {
        setPlayersNO(playersPerTeam)
        /* socket.emit('max-players', {gameCode, playersPerTeam})
        socket.emit('mode', {gameCode, mode}) */
        if(mode === 'random')
        {  
            let totalTeam=Math.ceil(numberOfPlayers/playersPerTeam);
            const db = getDatabase();
            const usersRef = ref(db, `${gameCode}/users/`);
            let arrUsers = [];
            onValue(usersRef, (snapshot) => {
                arrUsers = Object.keys(snapshot.val());
                let updates = {};
                if(arrUsers.length === 0){
                    return
                }
                for (var i = arrUsers.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = arrUsers[i];
                    arrUsers[i] = arrUsers[j];
                    arrUsers[j] = temp;
                }
                let teamD = {}
                let k=0
                for(let i = 0; i < totalTeam; i++){
                    let teamArr=[]
                    for(let j=0;j < playersPerTeam;j++){
                        if(k!==arrUsers.length)                        
                            teamArr.push(arrUsers[k++])
                    }
                    updates[`/${gameCode}/teamDetails/team${i+1}/teamPlayers`] = teamArr;
                } 
                update(ref(db), updates)
            });

            const sceneRef = ref(db, `${gameCode}/hostDetails/sceneId`);
            onValue(sceneRef, (snapshot) => {
                const sceneID = snapshot.val();
            });
            router.push('/host/random')
        }
        else if(mode === 'manual'){

            let totalTeam=Math.ceil(numberOfPlayers/playersPerTeam);
            const db = getDatabase();
            const usersRef = ref(db, `${gameCode}/users/`);
            const updates = {};
            for(let i=0;i<totalTeam;i++){
                let teamArr = [0];
                updates[`/${gameCode}/teamDetails/team${i+1}/teamPlayers`] = teamArr;
            }
            console.log(updates);
            update(ref(db), updates)
            router.push('/host/manual');
        }
        else if(mode === 'choice'){
            router.push('/host/choice')
        }
    }

    const onChangeHandler = (e) => {
        
        setPlayersPerTeam(e.target.value)
    }

    return ( 
        <div className="flex flex-row justify-center h-screen bgNormal">
            <SettingsAndBack link="/host/scoring" player={false}/>
            <div className="flex flex-column justify-evenly">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>

                <div className="flex flex-row justify-between items-center container">
                    <div className="heading ebaText rounded-xl px-12 py-8 mr-12 flex flex-column justify-evenly" style={{flex:4}}>
                        <div className="font-bold burlywoodText text-xl mt-1">Divide players into Teams</div>
                        <div className="text-xl mt-4 flex justify-between">Players per team:  <input type="number" min="2" max = "10" className="w-12 ebaBorder rounded pl-2"
                        value = {playersPerTeam}
                        onChange = {(e) => onChangeHandler(e)}
                        /></div>
                        <div className="text-xl mt-1 flex justify-between">No of Teams:  <input type="number" className="w-12 ebaBorder rounded pl-2"
                        value = {Math.ceil(numberOfPlayers/playersPerTeam)} onChange = {(e) => setNumberTeams(e.target.value)}
                        /></div>
                        <div className="text-xl mt-4"> <input type="radio" defaultChecked name = 'option' onClick = {() => setMode('random')} /> Random  </div>
                        <div className="text-xl"> <input type="radio" name = 'option' onClick = {() => setMode('manual')} /> Manual  </div>
                        <div className="text-xl mb-1"> <input type="radio" name = 'option' onClick = {() => setMode('choice')} /> Player's choice  </div>
                    
                    </div>
                    <div className="ml-28 heading rounded-xl" style={{flex:9}}>
                        {players.length > 0?   
                        <PlayerComponent players = {players} width = {'large'} largeWidth = {'md'} />
                        : null
                        }
                    </div>
                </div>

                <div className="text-center">
                    <Button clickHandler = {continueGame} text = 'Continue' />
                </div>
            </div>

            <EndGame />
        </div>
     )
}
 
export default teams;