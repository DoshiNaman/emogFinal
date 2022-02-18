import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext'

const leaderboard = () => {
    const socket = useContext(SocketContext)
    const [teams, setTeams] = useState([])
    const bg={
        backgroundImage: 'url("https://i.imgur.com/wi33LKy.jpg")',
        backgroundSize: "100vw 100vh"
    }

    useEffect(() => {
        socket.emit('join-leaderboard',sessionStorage.getItem('game-code'))
        socket.on('team-scores', teams => setTeams(teams))
    },[socket])

    return (
        <div className='h-screen flex flex-col justify-center items-center' style={bg}>
            <div className="px-12 flex-col py-12 h-2/3 w-1/2 heading rounded-lg">
                <div className="text-center font-bold text-4xl">LEADERBOARD</div>
                <div className="h-5/6 overflow-y-auto scl pr-1 mt-2">
                    {teams.map((team,index) => 
                    <div className="w-full flex mt-2" key = {index}>
                        <div className="ebaBg p-2 whiteText rounded-lg w-16 h-16 text-4xl flex justify-center items-center">0{index + 1}</div>
                        <div className="ebaBg p-2 whiteText rounded-lg mx-2 w-60 h-16 text-4xl flex flex-1 items-center">Team {team.teamName}</div>
                        <div className="ebaBg p-2 whiteText rounded-lg w-16 h-16 text-5xl flex justify-center items-center">{team.score.toString().length>1?team.score.toString().slice(0, 1):"0"}</div>
                        <div className="ebaBg ml-1 p-2 whiteText rounded-lg w-16 h-16 text-5xl flex justify-center items-center">{team.score.toString().length>1?team.score.toString().slice(1, 2):team.score}</div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default leaderboard
