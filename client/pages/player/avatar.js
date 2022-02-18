import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket/SocketContext";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import PlayerComponent from "../../components/Host/PlayerComponent";
import RuleBook from "../../components/RuleBook";
import { getDatabase, ref, onValue, update } from "firebase/database"

const avatar = () => {

    const router = useRouter()
    const db = getDatabase()
    // const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [playerName, setPlayerName] = useState()

    const [players, setPlayers] = useState([])
    const [color, setColor] = useState(0)
    const colors = ["https://i.imgur.com/Lh9JoJn.png", "https://i.imgur.com/9nKWnVE.png", "https://i.imgur.com/hYZIEEV.png", "https://i.imgur.com/02wPaiQ.png", "https://i.imgur.com/h1fCyBi.png", "https://i.imgur.com/SkvFWSY.png", "https://i.imgur.com/LptRaIW.png", "https://i.imgur.com/0EkGcud.png", "https://i.imgur.com/8pfgcFz.png"]
    const [avatar, setAvatar] = useState("") // rn color is stored, once the avatar images are ready, we can use them
    const [gameCode, setGameCode] = useState("")

    useEffect(() => {
        const gameCode = window.localStorage.getItem('game-code')
        setGameCode(gameCode)
        const playerName = window.localStorage.getItem('player-name')
        setPlayerName(playerName)
        // socket.emit('join-avatar', { gameCode, playerName })
        // socket.on('players', players => {
        //     setNumberOfPlayers(players.length)
        //     setPlayers(players)
        // })
        // socket.on('late-comers', () => router.push('/player/choice'))
        // socket.on('come-to-teams', () => router.push('/player/choice'))
    }, [])

    useEffect(() => {
        if (gameCode && playerName) {
            const db = getDatabase();
            const usersRef = ref(db, `${gameCode}/userDetails`);
            onValue(usersRef, (snapshot) => {
                const usersObj = snapshot.val();
                // const persons = {
                //     john: { avatar: 10 },
                //     doe: { avatar: 20 },
                // };
                const usersInfo = Object.keys(snapshot.val());
                let playerArr = [], obj = {}
                for (let i = 0; i < (usersInfo.length); i++) {
                    if (usersInfo[i] == "noOfPlayer")
                        setNumberOfPlayers(usersObj[usersInfo[i]])
                    else {
                        if (usersInfo[i] == playerName){
                            setAvatar(usersObj[usersInfo[i]].avatar)
                            const updates = {};
                            updates[`/${gameCode}/users/${playerName}`] = usersObj[usersInfo[i]].avatar
                            update(ref(db), updates)
                        }
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
        }
    }, [gameCode]);

    const switchBetweenAvatars = (option) => {
        option === 'FORWARD' ?
            setColor((color + 8) % 9)
            :
            setColor((color + 1) % 9)
        option === 'FORWARD' ?
            setAvatar((colors[(color + 8) % 9]))
            :
            setAvatar((colors[(color + 1) % 9]))
    }

    const saveAvatar = () => {
        const updates = {};
        updates[`/${gameCode}/userDetails/${playerName}/avatar`] = avatar
        updates[`/${gameCode}/users/${playerName}`] = avatar
        update(ref(db), updates)

        // const playerName = sessionStorage.getItem('player-name')
        // socket.emit('save-avatar', { gameCode, playerName, avatar })
    }

    return (
        <div className="bgNormal h-screen flex flex-col justify-evenly">
            <RuleBook />
            <div className="w-screen flex justify-center">
                <div className="w-2/6"><SendCodeToInvitePlayers gameCode={gameCode} text={"Waiting for the host to start the game"} numberOfPlayers={numberOfPlayers} /></div>
            </div>
            <div className="flex justify-evenly container px-10">
                <div style={{ flex: 4 }} className="px-2">
                    <div className="flex flex-column justify-evenly items-center heading rounded-xl px-4 h-80 w-80">
                        <div className="font-bold text-xl">
                            Choose your avatar
                        </div>
                        <div className="flex flex-row w-100 justify-evenly items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => switchBetweenAvatars('FORWARD')}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <img src={avatar} className="h-40 w-40" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => switchBetweenAvatars('BACKWARD')}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="font-bold text-xl">
                            {playerName}
                        </div>
                    </div>
                    <div className="flex pl-28">
                        <div className="rounded-lg px-4 py-2 mt-2 buttonNew text-xl font-bold" onClick={() => saveAvatar()}>Save</div>
                    </div>
                </div>
                <div style={{ flex: 9 }} className="flex flex-row h-80 px-8 flex-wrap w-full heading rounded-xl" id="players">
                    {players.length > 0 ?
                        <PlayerComponent players={players} player={true} width={'large'} largeWidth={'md'} />
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default avatar;