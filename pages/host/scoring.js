import { useContext, useEffect, useState } from "react";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import EndGame from "../../components/endGame";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

const Scoring = () => {

    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)

    const [otherCorrect, setOtherCorrect] = useState(2)
    const [otherIncorrect, setOtherIncorrect] = useState(0)
    const [otherAdjacent, setOtherAdjacent] = useState(1)
    const [compoundCorrect, setCompoundCorrect] = useState(3)
    const [compoundIncorrect, setCompoundIncorrect] = useState(0)

    const router = useRouter()

    useEffect(() => {
        const gameId = sessionStorage.getItem('game-code');
        setGameCode(gameId);
    }, []);

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

    /*useEffect(() => {
        let isMounted = true
        sessionStorage.setItem('player-name', 'host')
        setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('join-score-settings', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            if(isMounted)
                setNumberOfPlayers(players.length)
        })
        return () => {
            isMounted = false
        }
    })*/

    const clickHandler = () => {
        //socket.emit('Score-Settings', {compoundCorrect, compoundIncorrect, otherCorrect, otherIncorrect, otherAdjacent, gameCode})
        const db = getDatabase();
        const updates = {};
        updates[`/${gameCode}/hostDetails/compoundEmotion/correctGuess`] = compoundCorrect;
        updates[`/${gameCode}/hostDetails/compoundEmotion/incorrectGuess`] = compoundIncorrect;
        updates[`/${gameCode}/hostDetails/otherEmotion/correctGuess`] = otherCorrect;
        updates[`/${gameCode}/hostDetails/otherEmotion/incorrectGuess`] = otherIncorrect;
        updates[`/${gameCode}/hostDetails/otherEmotion/adjacentCell`] = otherAdjacent;

        // updating the database
        update(ref(db), updates)
        router.push('/host/teams')
    }


    return (
        <div className="flex flex-row bgNormal justify-center h-screen">
            <SettingsAndBack link="/host/scenes" player={false} />
            <div className="flex flex-col items-center justify-evenly">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} /></div>
                </div>

                <div className="heading rounded-xl flex justify-around items-center h-1/2" style={{ width: "50vw" }}>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotions</div>
                        <div className="text-xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input type="number" value={otherCorrect} onChange={(event) => setOtherCorrect(event.target.value)} className="ml-4 w-16 rounded-lg pl-2 ebaText inputs ebaBorder" />
                        </div>
                        <br />
                        <div className="text-xl flex justify-between">
                            <div>Adjacent Cell:</div>
                            <input type="number" value={otherAdjacent} onChange={(event) => setOtherAdjacent(event.target.value)} className="ml-4 w-16 rounded-lg pl-2 ebaText inputs ebaBorder" />
                        </div>
                        <br />
                        <div className="text-xl flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input type="number" value={otherIncorrect} onChange={(event) => setOtherIncorrect(event.target.value)} className="ml-4 w-16 rounded-lg pl-2 ebaText inputs ebaBorder" />
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotions</div>
                        <div className="text-xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input type="number" value={compoundCorrect} onChange={(event) => setCompoundCorrect(event.target.value)} className="ml-4 w-16 rounded-lg pl-2 ebaText inputs ebaBorder" />
                        </div>
                        <br />
                        <div className="text-xl font-thin flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input type="number" value={compoundIncorrect} onChange={(event) => setCompoundIncorrect(event.target.value)} className="ml-4 w-16 rounded-lg pl-2 ebaText inputs ebaBorder" />
                        </div>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => clickHandler()} className="buttonNew rounded-md px-4 py-2 text-lg font-bold">Continue</button></div>
            </div>

            <EndGame />
        </div>
    );
}

export default Scoring;
