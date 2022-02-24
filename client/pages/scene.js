import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
//import { SocketContext } from '../context/socket/SocketContext'
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

const scene = () => {
    //const socket = useContext(SocketContext)
    const router = useRouter()
    const [gameCode, setGameCode] = useState("")
    const [scenes, setScenes] = useState({})
    let status=0
    const db = getDatabase();

    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
    }, []);

    useEffect(() => {
        const sceneRef = ref(db, `${gameCode}/hostDetails/sceneId`);
        get(sceneRef).then((snapshot) => {
            if (snapshot.exists()) {
                const sceneObj = parseInt(snapshot.val())
                console.log(sceneObj)
                const sceneRef2 = ref(db, `${gameCode}/scenes/${sceneObj}`);
                get(sceneRef2).then((snapshot) => {
                    if (snapshot.exists()) {
                        let sceneObj2 = snapshot.val()
                        console.log(sceneObj2)
                        setScenes(sceneObj2)
                        //console.log(scenes)
                    } else {
                        console.log("no scene.scene");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.log("no scene");
            }
        }).catch((error) => {
            console.error(error);
        });

        status = sessionStorage.getItem('status')
        //socket.emit('get-game-scene', sessionStorage.getItem('game-code'))
        // socket.on('game-scene', scene => {
        //     console.log(scene);
        //     setScene(scene)})
        if(status === '1'){
            setTimeout(() => router.push('/host/hostDashboard'), 4000)
        }
        else{
            setTimeout(() => router.push(`/player/game/${sessionStorage.getItem('team-name')}`), 4000)
        }
    }, [gameCode]);


    return (
        <div className='flex flex-col items-center justify-center h-screen bgNormal'>
            <div className="heading rounded-xl w-2/5 text-center px-8 py-4">
                <h1 className='font-bold text-2xl'>Scene</h1>
                <div className="text-xl ebaText">{scenes && scenes.scene}</div>
            </div>
        </div>
    )
}

export default scene
