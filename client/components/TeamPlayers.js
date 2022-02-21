import React, { useContext, useEffect, useState } from 'react'
//import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamPlayers = ({teams, allTeams, player, mode, status, playerMax}) => {
    //const socket  = useContext(SocketContext)
    const [playerName, setPlayerName] = useState('')
    const [gameCode, setGameCode] = useState('')
    // useEffect(() => {
    //     let isMounted = true
        
    //     setGameCode(sessionStorage.getItem('game-code'))
    //     setPlayerName(sessionStorage.getItem('player-name'))
    //     return() => {
    //         isMounted = false
    //     }
    // })

    useEffect(() => {
        const gameId = localStorage.getItem('game-code');
        setGameCode(gameId);
    }, []);

    const joinTeam = (teamName) => {
        console.log('Joining team');
        //socket.emit('choice',{gameCode, playerName, teamName})
    }

    const leaveTeam = (teamName) => {
        console.log('Leaving team');
        //socket.emit('leave-team', {gameCode, playerName, teamName})
    }

    return (
        <div className={'flex flex-col heading rounded-xl mt-5 w-full pb-2'} style={{minHeight:"50vh", zoom:0.95}}>
            <div className="ebaBg whiteText rounded-t-xl">
                <div className='font-bold text-xl flex justify-between items-center'>
                    <div className="pl-8 py-4">{teams? `Team 0${teams.teamName}` : null}</div>
                    {player && mode==='choice'?
                    <div><button className={teams.teamMembers?.length===playerMax && !teams.teamMembers.find( p=> p.name === playerName)?"rounded font-normal text-base mr-8 px-2 py-1 cursor-pointer endGame":"buttonNew rounded font-normal text-base mr-8 px-2 py-1 cursor-pointer"} onClick={ !teams.teamMembers.find( p=> p.name === playerName)? () => joinTeam(teams.teamName) : () => leaveTeam(teams.teamName)}>
                        {player? teams.teamMembers.find( p=> p.name === playerName)? 'LEAVE' : teams.teamMembers?.length===playerMax?"FULL":'JOIN':""}</button></div>
                    :null}
                </div>
                <div className='font-semibold text-lg pb-4 pl-8'>
                    {teams? `${teams.teamMembers.length} players` : `0 Players`}
                </div>
            </div>
            <div className='w-full'>
                <PlayerComponent players = {teams && teams.teamMembers} player={player} teams = {allTeams} status = {status} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
