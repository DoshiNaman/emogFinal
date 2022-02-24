import React, { useContext, useEffect, useState } from 'react'
//import {SocketContext} from '../../context/socket/SocketContext'
import useAuth from "../../hooks/useAuth"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
import useFirebase from '../../hooks/useFirebase';


const PlayerComponent = ({ players, width, largeWidth,activeTeam, teams, team,  role }) => {
    const { playersNO, setPlayersNO } = useAuth();
    const [menu, setMenu] = useState()
    const [moveTeams, setMoveTeams] = useState(false)
    const [gameCode, setGameCode] = useState("")
    const [sliderPlayers, setSliderPlayers] = useState(4);
    const [slideIndex, setSlideIndex] = useState(0)
    const [maxNoOfPlayer,setMaxNoOfPlayer] = useState(0);
    console.log(players)

    useEffect(() => {
        setSliderPlayers(window.innerWidth >= 1400 ? 10 : window.innerWidth >= 1200 ? 8 : 6)
    }, [])

    useEffect(() => {
        const gameId = sessionStorage.getItem('game-code');
        setGameCode(gameId);
        //alert(`${playersNO} playersperTeam`)
    }, []);

    useEffect(()=>{
        if(gameCode){
            const db = getDatabase();
            const pNoRef = ref(db,`${gameCode}/hostDetails/playerPerTeam`);
            onValue(pNoRef,(snapshot)=>{
                if(snapshot.exists()){
                    const snapData = snapshot.val();
                    setMaxNoOfPlayer(snapData+2)
                    console.log(snapData)
                }
            })
        }
    },[gameCode]);
    

    const clickHandler = (team) => {
        // alert('hello returning 27')
        const player = menu.player
        setMenu({})
        let updates = {};
        const db = getDatabase();
        const teamsRef = ref(db, `${gameCode}/teamDetails/${team}`);
        onValue(teamsRef, (snapshot) => {
            if (snapshot.exists()) {
                const snapData = Object.keys(snapshot.val());
                // checking if the player is in same team 
                if(snapData.includes(player.name)){
                    alert(`The player are already in ${team}`)
                    return
                }
                // checking if the team is full 
                else if (snapData.length >= maxNoOfPlayer) {
                    alert(`Sorry! ${team} is full, please join another team.`)
                    return
                }
                // checking if the team is not full and player can proceed 
                else if (snapData.length < maxNoOfPlayer) {
                    const teamJoinedREf = ref(db,`${gameCode}/teamJoinedPlayers`)
                    let teamOwned = false;
                    onValue(teamJoinedREf, (snapshot)=>{
                        if(snapshot.exists()){
                            const teamSnapData = Object.keys(snapshot.val());
                            // checking if the player is in any team 
                            if(teamSnapData.includes(player.name)){
                                teamOwned = true;
                            }
                            // checking if the player is not in any team 
                            else{
                                teamOwned = false;
                            }
                        }
                    })
                    // readding the player to new team from previous one 
                    if(teamOwned){
                        alert('moving to another team');
                        updates[`${gameCode}/teamDetails/${activeTeam}/${player["name"]}`] = null;
                        updates[`${gameCode}/teamDetails/${team}/${player["name"]}`] = player["avatar"];
                        updates[`${gameCode}/inLobbyPlayers2/${player["name"]}`] = null;
                        updates[`${gameCode}/teamJoinedPlayers/${player["name"]}/team`] = parseInt(team.slice(-1));
                    }
                    // adding to new team 
                    else if(!teamOwned){
                        alert('adding to new team')
                        updates[`${gameCode}/teamJoinedPlayers/${player["name"]}/avatar`] = player["avatar"];
                        updates[`${gameCode}/teamJoinedPlayers/${player["name"]}/team`] = parseInt(team.slice(-1));
                        updates[`${gameCode}/teamDetails/${team}/${player["name"]}`] = player["avatar"];
                        updates[`${gameCode}/inLobbyPlayers2/${player["name"]}`] = null;
                    }
                    
                }
            }
        }, {
            onlyOnce: true
        })
        update(ref(db), updates);
    }

    const removePlayer = (menu) => {
        // alert('removing')
        const updates = {};
        const pName = menu.player.name;
        const pAvatar = menu.player.avatar;
        console.log(pName);
        console.log(pAvatar);
        console.log(activeTeam);
        const db = getDatabase();
        let lobbyData = false;
        const lobbyPlayerRef = ref(db,`${gameCode}/inLobbyPlayers2`);
        onValue(lobbyPlayerRef,(snapshot)=>{
            if(snapshot.exists()){
                const lobbyDataKey = Object.keys(snapshot.val());
                console.log(lobbyDataKey);
                if(lobbyDataKey.includes(pName)){
                    lobbyData=true
                }
            }
        },{
            onlyOnce: true
        })
        if(lobbyData===true){
            // updates[`${gameCode}/inLobbyPlayers2/${pName}`]=null;
            console.log('it is true')
            alert(`This player is already in lobby`)
            return;
            // update(ref(db), updates);
        }else{
            const teamPlayerRef= ref(db,`${gameCode}/teamJoinedPlayers`);
            onValue(teamPlayerRef,(snapshot)=>{
                if(snapshot.exists()){
                    const teamDataKey = Object.keys(snapshot.val());
                    console.log('it is false')
                    console.log(teamDataKey)
                    if(teamDataKey.includes(pName)){
                        updates[`${gameCode}/inLobbyPlayers2/${pName}`]=pAvatar;
                        updates[`${gameCode}/teamJoinedPlayers/${pName}`]=null;
                        updates[`${gameCode}/teamDetails/${activeTeam}/${pName}`]=null;
                        update(ref(db), updates);
                    }
                }
            },{
                onlyOnce: true
            })
        }
        // const gameCode = sessionStorage.getItem('game-code')
        // const playerName = menu.player.name
        // socket.emit('remove-player', {gameCode, playerName})
    }

    let compWidth
    let respWidth
    width === 'large' ? compWidth = 'lg' : compWidth = 'xl'
    largeWidth === 'md' ? respWidth = 'md' : respWidth = 'xs'
    return (
        <div className="flex items-center w-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSlideIndex((slideIndex + Math.ceil(players.length / sliderPlayers) - 1) % (Math.ceil(players.length / sliderPlayers)))}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>

            <div className={`flex flex-row flex-wrap h-72 w-full justify-evenly items-center overflow-y-auto scl`} id="players" >
                {players && players.length > 0 ? players.map((player, index) => (
                    <div key={index}>{index >= sliderPlayers * slideIndex && index < sliderPlayers * (slideIndex + 1) ?
                        <div className="z-10 text-center" onClick={event => setMenu({ x: event.clientX, y: event.clientY, player: player })}>
                            <div className="mx-7" >
                                {player.avatar && <img src={player.avatar} alt='avatar' className='h-20 w-20' />}
                            </div>
                            {player.name && player.name}
                        </div> : <></>}</div>
                )) : null}
                {
                    menu && (role == "host") ?
                        <div className="h-screen w-screen absolute top-0 left-0" onClick={() => { setMenu(undefined); setMoveTeams(false) }} onMouseOver={() => console.log("in")}>
                            <div className="flex flex-row absolute z-10" style={{ top: menu.y, left: menu.x }}>
                                <div className="cursor-pointer h-full">
                                    <div className={moveTeams ? "burlywoodBg px-2 border-2 whiteText border-white" : "ebaBg px-2 border-2 whiteText border-white"} onClick={(event) => { setMoveTeams(!moveTeams); event.stopPropagation() }}>Move</div>
                                    <div className="ebaBg px-2 border-2 whiteText border-white " onClick={() => removePlayer(menu)}>Remove</div>
                                </div>
                                {moveTeams ? <div className="scl cursor-pointer max-h-32 overflow-y-auto">
                                    {teams ? teams.map((team, index) => <div className='w-auto px-2 ebaBg border-2 whiteText border-white ' onClick={() => { setMoveTeams(false); clickHandler(team.teamName) }} key={index} > {team.teamName}</div>) : <></>}
                                </div> : <></>}
                            </div>
                        </div> : <></>}
                {/* <div className="invisible">MADIEE is awesome</div> */}
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSlideIndex((slideIndex + 1) % (Math.ceil(players.length / sliderPlayers)))}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>


        </div>
    )
}

export default PlayerComponent
