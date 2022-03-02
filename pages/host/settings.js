import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import SettingsAndBack from "../../components/settingsAndBack"
import styles from '../../styles/Settings.module.css'
import EndGame from "../../components/endGame"
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

const settings = () => {

    // const db = getDatabase();
    const router = useRouter()
    const [numberOfRounds, setNumberOfRounds] = useState(10)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    // gameCode from sessionStorage
    const [gameCode, setGameCode] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [guessingTimeInSeconds, setGuessingTimeInSeconds] = useState('')
    const [typingTimeInSeconds, setTypingTimeInSeconds] = useState('')
    const [disableRounds, setDisableRounds] = useState(true)

    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        console.log(gameCode);
    }, [])
    /* useEffect(() => {
        let isMounted = true
        sessionStorage.setItem('status', 1)
        socket.emit('create-game')
        socket.on('Room-code', code => {
            sessionStorage.setItem('game-code', code)
            if(isMounted)
                setGameCode(code)}
        )
        socket.on('players', players => {
            console.log(players);
            if(isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('guessing-timer', guessTime => {
            let secondArr = guessTime.split(':')
            if(isMounted){
                setGuessingTime(secondArr[0])
                setGuessingTimeInSeconds(secondArr[1])
            }
        })
        socket.on('typing-timer', typeTime => {
            let secondArr = typeTime.split(':')
            if(isMounted){
                setTypingTime(secondArr[0])
                setTypingTimeInSeconds(secondArr[1])
            }
        })
        return () => {
            isMounted = false
        }
    }, [socket]) */

    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const hostDetails = ref(db, `${gameCode}/hostDetails`);
        onValue(hostDetails, (snapshot) => {
            const data = snapshot.val();

            setGuessingTime(Math.floor(data.guessingTime / 60));
            setGuessingTimeInSeconds(data.guessingTime % 60);
            setTypingTime(Math.floor(data.typingTime / 60));
            setTypingTimeInSeconds(data.typingTime % 60);
            setNumberOfRounds(data.noOfRounds);
        }, {
            onlyOnce: true
        });
    }, [gameCode]);
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        const db = getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            const data = snapshot.val();
            setNumberOfPlayers(data)
        });
    }, [gameCode]);


    const continueGame = () => {
        const db = getDatabase();
        // setting the routes of database with updated value 
        const updates = {};
        updates[`/${gameCode}/hostDetails/guessingTime`] = parseInt(guessingTime) * 60 + parseInt(guessingTimeInSeconds)
        updates[`/${gameCode}/hostDetails/noOfRounds`] = parseInt(numberOfRounds);
        updates[`/${gameCode}/hostDetails/typingTime`] = parseInt(typingTime) * 60 + parseInt(typingTimeInSeconds);

        // updating the database
        update(ref(db), updates)

        // running in socket
        // const guesser = `${guessingTime}:${guessingTimeInSeconds}`
        // const typer = `${typingTime}:${typingTimeInSeconds}`
        // socket.emit('set-time', {guesser, typer, gameCode})
        // const MAX_ROUND = numberOfRounds
        // socket.emit('no-of-rounds', {MAX_ROUND, gameCode} )

        // going to next page 
        router.push('/host/scenes')
    }

    const onChangeHandlerInMinutes = (e) => {
        e.target.name === 'guess' ? setGuessingTime(e.target.value) : setTypingTime(e.target.value)
    }
    const onChangeHandlerInSeconds = (e) => {
        e.target.name === 'guessInSeconds' ? setGuessingTimeInSeconds(e.target.value) : setTypingTimeInSeconds(e.target.value)
    }

    return (
        <div className="flex flex-row justify-center h-screen w-screen bgNormal">
            {/* <SettingsAndBack link = '/play' /> */}
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />
                <div className="heading w-80 px-8 py-8 rounded-2xl">
                    <div className="pr-4 font-bold text-xl">Set Timer</div>
                    <br />
                    <div className="container-fluid my-2 text-lg">
                        <div className="row">
                            <div className="col-6 ebaText p-0">Guessing time</div>
                            <div className="col-6 ebaText p-0">
                                <input type="number"
                                    min="1"
                                    max="10"
                                    onChange={e => onChangeHandlerInMinutes(e)}
                                    value={guessingTime}
                                    className={`ml-1 text-center w-14 counterInput`}
                                    name="guess"
                                />
                                <input type="number"
                                    min="1"
                                    max="60"
                                    className={`ml-1 text-center w-14 counterInput`}
                                    onChange={e => onChangeHandlerInSeconds(e)}
                                    value={guessingTimeInSeconds}
                                    name="guessInSeconds"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 text-lg container-fluid">
                        <div className="row">
                            <div className="col-6 ebaText font-normal p-0">Typing time</div>
                            <div className="col-6 ebaText p-0">
                                <input
                                    type="number"
                                    min='1'
                                    max='10'
                                    value={typingTime}
                                    className={`ml-1 text-center w-14 counterInput`}
                                    name='type'
                                    onChange={e => onChangeHandlerInMinutes(e)}
                                />
                                <input
                                    type="number"
                                    min='1'
                                    max='60'
                                    value={typingTimeInSeconds}
                                    className={`ml-1 text-center w-14 counterInput`}
                                    name='type'
                                    onChange={e => onChangeHandlerInSeconds(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="font-bold text-xl">Rounds</div>
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 ebaText text-lg font-normal p-0">
                                No. of rounds
                            </div>
                            <div className="col-6 ebaText p-0">
                                <input
                                    value={numberOfRounds}
                                    onChange={event => setNumberOfRounds(event.target.value)}
                                    type="number" min="2"
                                    placeholder='Set Number of Rounds'
                                    className={'ml-1 text-center h-7 w-14 counterInput'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center"><button onClick={continueGame} className="buttonNew rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
            <EndGame />
        </div>
    );
}

export default settings;