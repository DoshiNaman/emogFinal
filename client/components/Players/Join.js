import React, { useContext, useState } from 'react'
import Button from '../Button'
// import { SocketContext } from '../../context/socket/SocketContext'
import { useRouter } from "next/router";
import { getDatabase, set, ref, get, child, onValue, update } from 'firebase/database';

const Join = () => {
    const db = getDatabase()
    const router = useRouter()
    const dbRef = ref(getDatabase());
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [pressed, setPressed] = useState(false)
    // const socket = useContext(SocketContext)
    const colors = ["https://i.imgur.com/Lh9JoJn.png", "https://i.imgur.com/9nKWnVE.png", "https://i.imgur.com/hYZIEEV.png", "https://i.imgur.com/02wPaiQ.png", "https://i.imgur.com/h1fCyBi.png", "https://i.imgur.com/SkvFWSY.png", "https://i.imgur.com/LptRaIW.png", "https://i.imgur.com/0EkGcud.png", "https://i.imgur.com/8pfgcFz.png"]

    const clickHandler = () => {
        if (name === "" || code === "")
            return

        const roomRef = ref(db, code);
        get(roomRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("found room")
                const data = snapshot.val()
                const { isActive, userDetails } = snapshot.val()
                // const isActiveRef = roomRef.child("isActive")
                if (isActive === 0) {
                    const playerName = name.toLowerCase();
                    get(child(roomRef, `userDetails/${playerName}`)).then((snapshot) => {
                        if (snapshot.exists())
                            alert("username already taken");
                        else {
                            const playerAvatar = colors[Math.floor(Math.random() * colors.length)]
                            const userData = {
                                isConnected: true,
                                avatar: playerAvatar
                            }
                            console.log(userData.avatar);
                            const userCount = userDetails.noOfPlayer
                            const updates = {};
                            updates[`/${code}/userDetails/${playerName}`] = userData;
                            updates[`/${code}/userDetails/noOfPlayer`] = userCount + 1
                            updates[`/${code}/inLobbyPlayers2/${playerName}`] = playerAvatar
                            console.log(playerName)

                            update(ref(db), updates);
                            window.sessionStorage.setItem("game-code", code)
                            window.sessionStorage.setItem("player-name", playerName)
                            window.sessionStorage.setItem("role", "player")
                            router.push('/player/avatar')

                        }
                    })
                }
                else
                    alert("room started");
            } else {
                alert("room not found")
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const onChangeHandler = (e) => {
        e.target.name === 'code' ? setCode(e.target.value) : setName(e.target.value)
    }

    return (
        <div className='h-full flex flex-col'>
            <br />
            <input name='name' className='inputs rounded-md p-2 text-black text-center' placeholder='Name' value={name} onChange={e => onChangeHandler(e)} />
            <input name='code' className='inputs rounded-md p-2 mt-3 text-black text-center' placeholder='Game Code' value={code} onChange={e => onChangeHandler(e)} />
            {/* <div className="absolute xs-mobile:bottom-36 tall-devices:bottom-72 left-0 flex justify-center w-100"> */}
            <div style={{ textAlign: "center" }}>
                <Button text={'JOIN'} clickHandler={clickHandler} />
            </div>
        </div>
    )
}

export default Join