import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
//import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamPlayers = ({ team, teams, allTeams, role, mode, status, playerMax, gameCode, playerName, avatar, activeTeam }) => {

    // const [gameCode, setGameCode] = useState('')
    const db = getDatabase()

    // useEffect(() => {
    //     const gameId = localStorage.getItem('game-code');
    //     setGameCode(gameId);
    // }, []);

    const joinTeam = (teamName) => {
        console.log('Joining team');

        // update(db, `${gameCode}/inLobbyPlayers2/`)
        const lobbyRef = ref(db, `${gameCode}/inLobbyPlayers2/`)
        let updates = {}
        onValue(lobbyRef, (snapshot) => {
            if (snapshot.exists()) {
                console.log('sesj');
                const playersObj = snapshot.val();
                const playersArr = Object.keys(playersObj)
                for (let i = 0; i < playersArr.length; i++) {
                    if (playerName === playersArr[i]) {
                        updates[`${gameCode}/inLobbyPlayers2/${playerName}`] = null
                        let x = playersObj[playersArr[i]]
                        // console.log(x);
                        updates[`${gameCode}/teamDetails/${teamName}/${playerName}`] = playersObj[playersArr[i]]
                        updates[`${gameCode}/teamPlayerJoined/${playerName}`] = { name: playerName, avatar: playersObj[playersArr[i]] }
                        break;
                    }
                }
            }
        }, {
            onlyOnce: true
        })
        // updates[`${gameCode}/inLobbyPlayers2/${playerName}`] = ""
        update(ref(db), updates)
        //socket.emit('choice',{gameCode, playerName, teamName})
    }

    const leaveTeam = (teamName) => {
        console.log('Leaving team');
        let updates = {}
        updates[`${gameCode}/teamDetails/${teamName}/${playerName}`] = null
        updates[`${gameCode}/teamPlayerJoined/${playerName}`] = null
        if (avatar !== "")
            updates[`${gameCode}/inLobbyPlayers2/${playerName}`] = avatar
        update(ref(db), updates)
        //socket.emit('leave-team', {gameCode, playerName, teamName})
    }

    return (
        <div className={'flex flex-col heading rounded-xl mt-5 w-full pb-2'} style={{ minHeight: "50vh", zoom: 0.95 }}>
            <div className="ebaBg whiteText rounded-t-xl">
                <div className='font-bold text-xl flex justify-between items-center'>
                    <div className="pl-8 py-4" style={{ textTransform: 'capitalize' }}>{team ? `${team.teamName}` : null}</div>
                    {(role === "player") && mode === 'choice' && team ?
                        <div>
                            <button className={team.teamMembers?.length === playerMax && !team.teamMembers.find(p => p.name === playerName) ? "rounded font-normal text-base mr-8 px-2 py-1 cursor-pointer endGame" : "buttonNew rounded font-normal text-base mr-8 px-2 py-1 cursor-pointer"}
                                onClick={!team.teamMembers.find(p => p.name === playerName) ? () => joinTeam(team.teamName) : () => leaveTeam(team.teamName)}>
                                {(role === "player") ? team.teamMembers.find(p => p.name === playerName) ? 'LEAVE' : team.teamMembers?.length === playerMax ? "FULL" : 'JOIN' : ""}
                            </button>
                        </div>
                        : null}
                </div>
                <div className='font-semibold text-lg pb-4 pl-8'>
                    {team ? `${team.teamMembers.length} players` : `0 Players`}
                </div>
            </div>
            <div className='w-full'>
                <PlayerComponent activeTeam={activeTeam} team='hello' players={team && team.teamMembers} role={role} teams={allTeams} status={status} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
