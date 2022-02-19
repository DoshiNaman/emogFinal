import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamComponent = ({teams, activeIcon, player, playersWithoutTeams, activeTeam, playerName}) => {
    console.log(playersWithoutTeams);
    const [display, setDisplay] = useState("teams")    
    const [players, setPlayers] = useState(playersWithoutTeams)
    const [myTeam, setMyTeam] = useState()
    const socket = useContext(SocketContext)

    const [menu, setMenu] = useState(undefined)

    /* useEffect(() => {
        socket.emit('get-players-no-teams', sessionStorage.getItem('game-code'))
        socket.on('players-without-teams' , players => setPlayers(players))
    }, [socket]) */
    useEffect(()=>{
        const GameId = localStorage.getItem('game-code');
        setGameCode(gameId)
    },[gameCode]);


    useEffect(() => {
        document.addEventListener("contextmenu", function(event){event.preventDefault()})
    },[])

    useEffect(() => {
        teams.forEach((team) => {
            if(team?.teamMembers?.length>0){
                team.teamMembers.forEach((member) => {
                    if (member.name===playerName){
                        setMyTeam(team.teamName)
                        console.log(team.teamName, "Teamname")
                    }
                })
            }
        })
    }, [teams])

    const createNewTeam = () => {
        // socket.emit('create-team', sessionStorage.getItem('game-code'))
    }

    return (
        <div className="heading rounded-xl px-12 py-8 mt-5 overflow-y-hidden scl" style={{minHeight:"50vh", maxHeight:"26rem"}}>
            <div className='flex flex-row justify-between items-center'>
                <div  className='flex flex-row items-center'>
                    <div className='text-lg' onClick={() => setDisplay("teams")}>
                        <div className={display==="teams"?"burlywoodBg whiteText rounded-xl flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2":"heading rounded-xl flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2"}>
                            <div className='self-start font-bold'>
                                Teams
                            </div>
                            <div>
                                {teams.length} team(s)
                            </div>
                        </div>
                    </div>
                    {!player?<div className='text-lg ml-4' onClick={() => setDisplay("lobby")}>
                        <div className={display==="lobby"?"burlywoodBg whiteText rounded-xl flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2":"heading rounded-xl flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2"}>
                            <div className='self-start font-bold'>
                                Lobby
                            </div>
                            <div>
                                {players.length} Player(s)
                            </div>
                        </div>
                    </div>:<></>}
                </div>
                {!player?
                    <button className="buttonNew rounded px-3 py-2 text-lg font-bold" onClick = {createNewTeam}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        New Team
                    </button>:<></>}
            </div>
            <div className='flex max-h-64 justify-between scl flex-row flex-wrap overflow-y-auto'>
                {display==="teams"?teams.map((team, index) => {
                    console.log(team, "team")
                    return(
                        <div className='text-lg' key = {index} onClick={(event) => console.log(event, "click")}>
                            <div className={team.teamName===myTeam?'flex w-40 h-24 inputs flex-col items-start justify-around whiteText rounded-lg ebaBg mb-3 px-3 cursor-pointer py-2 m-2 flex-wrap':team.teamName===activeTeam?'flex w-40 h-24 inputs flex-col items-start justify-around burlywoodText rounded-lg burlywoodBorder border-3 mb-3 px-3 cursor-pointer py-2 m-2 flex-wrap':"flex w-40 h-24 inputs flex-col items-start justify-around burlywoodText rounded-lg ebaBorder mb-3 px-3 cursor-pointer py-2 m-2 flex-wrap border-1"} onClick = {() => activeIcon(team.teamName)}>
                                <div className='self-start font-bold flex-wrap'>
                                    {index < 9? `Team 0${index+1}` : `Team ${index+1}`}
                                </div>
                                <div className={team.teamName===myTeam?"whiteText":"ebaText"}>
                                    {team.teamMembers.length} players
                                </div>
                            </div>
                            {
                            menu && !player?
                            <div className="h-screen w-screen" style={{position:"absolute", top:0, left:0}} onClick={() => setMenu(undefined)} onContextMenu={() => {console.log("right")}} onMouseOver={() => console.log("in")}>
                                <div className="flex flex-row" style={{position:"absolute", top:menu.y, left:menu.x, zIndex:2}}>
                                    <div className="bg-gray-200 border-2 border-black cursor-pointer h-full">
                                        <div>Remove</div>
                                    </div>
                                </div>
                            </div>:<></>}
                        </div>
                    )
                }):<div className="w-full" style={{zoom:0.85}}><PlayerComponent players = {playersWithoutTeams} player={player} teams = {teams} /></div>}
            </div>
        </div>
    )
}

export default TeamComponent
