import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import PlayerComponent from "../../components/Host/PlayerComponent";
import RuleBook from "../../components/RuleBook";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
import random from "../host/random";
import { route } from "next/dist/server/router";

const avatar = () => {

    const router = useRouter()
    const db = getDatabase()
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [playerName, setPlayerName] = useState()

    const [players, setPlayers] = useState([])
    const [color, setColor] = useState(0)
    const colors = ["https://i.imgur.com/Lh9JoJn.png", "https://i.imgur.com/9nKWnVE.png", "https://i.imgur.com/hYZIEEV.png", "https://i.imgur.com/02wPaiQ.png", "https://i.imgur.com/h1fCyBi.png", "https://i.imgur.com/SkvFWSY.png", "https://i.imgur.com/LptRaIW.png", "https://i.imgur.com/0EkGcud.png", "https://i.imgur.com/8pfgcFz.png"]
    const [avatar, setAvatar] = useState("") // rn color is stored, once the avatar images are ready, we can use them
    const [gameCode, setGameCode] = useState("")
    const [gameMode, setGameMode] = useState("")
    // const [lobbyPlayers,setLobbyPlayers] = useState([]);
    // const [teamJoinedPl,setTeamJoinedPl] = useState([]);
    // const [teams,setTeams] = useState(true)

    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        const playerName = window.sessionStorage.getItem('player-name')
        setPlayerName(playerName)
        // socket.emit('join-avatar', { gameCode, playerName })
        // socket.on('players', players => {
        //     setNumberOfPlayers(players.length)
        //     setPlayers(players)
        // })
        // socket.on('late-comers', () => router.push('/player/choice'))
        // socket.on('come-to-teams', () => router.push('/player/choice'))
    }, [])


    /* useEffect(()=>{
        if(gameCode && playerName){
            const db = getDatabase();
            const teamJoinedRef = ref(db,`${gameCode}/teamPlayerJoined`);
            onValue(teamJoinedRef, (snapshot)=>{
                if(snapshot.exists()){
                    const teamKeys = Object.keys(snapshot.val());
                    setTeamJoinedPl(teamKeys);
                }
                else{
                    alert("doesn't exists")
                }
            })
        }
    },[gameCode]); */


    useEffect(() => {
        if (gameCode && playerName) {
            const db = getDatabase();
            const gModeRef = ref(db, `${gameCode}/gameMode`);
            onValue(gModeRef, (snapshot) => {
                if (snapshot.exists()) {
                    setGameMode(snapshot.val())
                }
                else {
                    //alert("doesn't exists")
                }
            })
        }
    }, [gameCode]);


    useEffect(() => {
        if (!gameCode || !gameMode || !playerName) {
            return
        }
        else {
            if (gameMode === 'random') {
                console.log('this is random')
                const db = getDatabase();
                const dbRef = ref(db, `${gameCode}/teamJoinedPlayers`)
                onValue(dbRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const snapData = snapshot.val();
                        const teamJoinedArr = Object.keys(snapData)
                        console.log(teamJoinedArr)
                        if (teamJoinedArr.includes(playerName)) {
                            //alert('route changing')
                            router.push('/player/choice')
                        }
                    }
                })
            }
            else if (gameMode === 'manual') {
                console.log('this is manual')
                const db = getDatabase();
                const dbRef = ref(db, `${gameCode}/teamJoinedPlayers`)
                onValue(dbRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const snapData = snapshot.val();
                        const snapObj = Object.keys(snapData)
                        console.log(snapObj)
                        if (snapObj.includes(playerName)) {
                            //alert('route changing')
                            router.push('/player/choice')
                        }
                    }
                })
            }
            else if (gameMode === 'choice') {
                console.log('this is choice')
                router.push('/player/choice')
            }
        }
    }, [gameMode])
    /* useEffect(()=>{
        if (gameCode && playerName) {
            const db = getDatabase();
            const updateRoute = ref(db, `${gameCode}/isChoice`);
            onValue(updateRoute, (snapshot) => {
                let uR = snapshot.val();
                uR=parseInt(uR);
                if(uR===0){

                }
                else if(uR===1){
                    const getLobbyPlayers = ref(db, `${gameCode}/inLobbyPlayers2`);
                    onValue(getLobbyPlayers, (snapshot) => {
                        let lP = Object.keys(snapshot.val());
                        for(let i=0;i<lP.length;i++){
                            if(playerName==lP[i]){
                                return
                            }
                        }
                        router.push("/player/choice")
                    });
                }
            });
        }
    }, [gameCode])
 */
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
                        if (usersInfo[i] == playerName) {
                            setAvatar(usersObj[usersInfo[i]].avatar)
                            /* const updates = {};
                            updates[`/${gameCode}/inLobbyPlayers2/${playerName}`] = usersObj[usersInfo[i]].avatar
                            update(ref(db), updates) */
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
        updates[`/${gameCode}/inLobbyPlayers2/${playerName}`] = avatar
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
            <h1 style={{ textAlign: "center" }}>{playerName}</h1>
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
                        <div className="font-bold text-xl" style={{ textAlign: "center" }}>
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