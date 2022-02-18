import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext'

const scene = () => {
    const socket = useContext(SocketContext)
    const router = useRouter()
    const [scene, setScene] = useState('')
    let status
    useEffect(() => {
        status = sessionStorage.getItem('status')
        socket.emit('get-game-scene', sessionStorage.getItem('game-code'))
        socket.on('game-scene', scene => {
            console.log(scene);
            setScene(scene)})
        if(status === '1')
            setTimeout(() => router.push('/host/hostDashboard'), 4000)
        else
            setTimeout(() => router.push(`/player/game/${sessionStorage.getItem('team-name')}`), 4000)
    }, [socket])
    return (
        <div className='flex flex-col items-center justify-center h-screen bgNormal'>
            <div className="heading rounded-xl w-2/5 text-center px-8 py-4">
                <h1 className='font-bold text-2xl'>Scene</h1>
                <div className="text-xl ebaText">{scene[0] && scene[0].scene}</div>
            </div>
        </div>
    )
}

export default scene
