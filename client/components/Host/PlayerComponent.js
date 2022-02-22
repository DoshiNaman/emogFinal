import React, { useContext, useEffect, useState } from 'react'
//import {SocketContext} from '../../context/socket/SocketContext'
import useAuth from "../../hooks/useAuth"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';


const PlayerComponent = ({ players, width, largeWidth, teams, role }) => {
    const { playersNO, setPlayersNO } = useAuth();
    const [menu, setMenu] = useState()
    const [moveTeams, setMoveTeams] = useState(false)
    const [gameCode, setGameCode] = useState("")
    const [sliderPlayers, setSliderPlayers] = useState(4);
    const [slideIndex, setSlideIndex] = useState(0)
    console.log(playersNO)

    useEffect(() => {
        setSliderPlayers(window.innerWidth >= 1400 ? 10 : window.innerWidth >= 1200 ? 8 : 6)
    }, [])

    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
        //alert(`${playersNO} playersperTeam`)
    }, []);

    const clickHandler = (team) => {
        // alert('hello returning 27')
        const player = menu.player
        console.log(player)
        console.log(team)
        setMenu(false)
        const db = getDatabase();
        const teamsRef = ref(db, `${gameCode}/teamDetails/${team}`);
        let updates = {};
        onValue(teamsRef, (snapshot) => {
            if (snapshot.exists()) {
                const snapData = Object.keys(snapshot.val());
                console.log(snapData.length)
                console.log(parseInt(5))
                if (snapData.length >= parseInt(5)) {
                    console.log('ok')
                    alert(`Sorry! ${team} is full, please join another team.`)
                    return
                }
                else if (snapData.length < parseInt(5)) {
                    alert('updating')
                    updates[`${gameCode}/teamPlayerJoined/${player["name"]}`] = player;
                    updates[`${gameCode}/teamDetails/${team}/${player["name"]}`] = player["avatar"];
                    updates[`${gameCode}/inLobbyPlayers2/${player["name"]}`] = null;
                }
            }
        }, {
            onlyOnce: true
        })
        update(ref(db), updates);
        return
        // const gameCode = sessionStorage.getItem('game-code')
        // socket.emit('change-team', {team, player, gameCode})
        // socket.on('err', ({message}) => alert(message))
    }

    const removePlayer = (menu) => {
        console.log(menu.player)
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
                                    {teams ? teams.map((team, index) => <div className='w-auto px-2 ebaBg border-2 whiteText border-white ' onClickCapture={() => { setMoveTeams(false); clickHandler(team.teamName) }} key={index} >Team {team.teamName}</div>) : <></>}
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
