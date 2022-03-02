import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

const leaderboard = () => {
    const [teams, setTeams] = useState([])
    const [gameCode, setGameCode] = useState("")
    const bg={
        backgroundImage: 'url("https://i.imgur.com/wi33LKy.jpg")',
        backgroundSize: "100vw 100vh"
    }
    const db = getDatabase();

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const gameId = sessionStorage.getItem('game-code');
        setGameCode(gameId);
        const reRef = ref(db, `${gameId}/teamDetails`);
        onValue(reRef, (snapshot) => {
            if (snapshot.exists()) {
                const ScoreArr = []
                const teamDetail = snapshot.val();
                const teamNames = Object.keys(snapshot.val());
                for(let i=0;i<teamNames.length;i++){
                    const currentTeam = teamNames[i];
                    
                    const currentScore = parseInt(teamDetail[`${currentTeam}`].score);
                    currentTeam = currentTeam.slice(currentTeam.length - 1);
                    let obj={
                        teamName:currentTeam,
                        score:currentScore
                    }
                    console.log(obj)
                    ScoreArr.push(obj)
                }
                setTeams(ScoreArr)
            }
            else{
                alert("No Snapshot")
            }
        });
            //setTeams([{teamName:1,score:5}])
        
    }, []);

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
