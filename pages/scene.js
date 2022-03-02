import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';

const scene = () => {
    const router = useRouter()
    const [gameCode, setGameCode] = useState("")
    const [scenes, setScenes] = useState({})
    const [role, setRole] = useState("")
    const db = getDatabase();

    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        if (!role) {
            const stat = sessionStorage.getItem('role')
            setRole(stat)
            console.log(stat);
        }
    }, []);

    useEffect(() => {
        console.log(gameCode, role);
        console.log(typeof role);
        if (gameCode) {
            const sceneRef = ref(db, `${gameCode}/hostDetails`);
            get(sceneRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const sceneObj = snapshot.val()
                    const sceneIDD = parseInt(sceneObj["sceneId"])
                    let noOfROUNDSS = parseInt(sceneObj["noOfRounds"])
                    // console.log(sceneObj)
                    const sceneRef2 = ref(db, `${gameCode}/scenes/${sceneIDD}`);

                    get(sceneRef2).then((snapshot) => {
                        if (snapshot.exists()) {
                            let sceneObj2 = snapshot.val()
                            // console.log(sceneObj2)
                            setScenes(sceneObj2)
                            if (role === "host") {
                                console.log("1 -> hjasyuyxasyewss ");
                                const teamRef = ref(db, `${gameCode}/teamDetails`);
                                get(teamRef).then((snapshot) => {
                                    if (snapshot.exists()) {
                                        const teamsObj = snapshot.val();
                                        let teamsNames = Object.keys(teamsObj);
                                        let updates = {}
                                        for (let i = 0; i < teamsNames.length; i++) {
                                            let noOfROUNDS = noOfROUNDSS
                                            let roundDetailsArr = []
                                            let teamName = teamsNames[i]
                                            roundDetailsArr.push({
                                                sender: "pre",
                                                msg: sceneObj2.statementOne
                                            })
                                            roundDetailsArr.push({
                                                sender: "pre",
                                                msg: sceneObj2.statementTwo
                                            })
                                            console.log(roundDetailsArr)
                                            let teamObj = teamsObj[teamName]
                                            let teamMembersNames = Object.keys(teamObj);
                                            var index = teamMembersNames.indexOf("currentRound");
                                            if (index !== -1) {
                                                teamMembersNames.splice(index, 1);
                                            }
                                            index = teamMembersNames.indexOf("score");
                                            if (index !== -1) {
                                                teamMembersNames.splice(index, 1);
                                            }
                                            console.log(teamMembersNames);
                                            let length = teamMembersNames.length
                                            for (let i = 0, x = 0; i < noOfROUNDS; i++) {
                                                let postion = x % length
                                                let obj = {
                                                    sender: teamMembersNames[postion],
                                                    msg: "NoN"
                                                }
                                                roundDetailsArr.push(obj)
                                                x++;
                                            }

                                            console.log(roundDetailsArr)
                                            updates[`${gameCode}/roundDetails/${teamName}`] = roundDetailsArr
                                        }
                                        update(ref(db), updates)
                                        setTimeout(() => router.push('/host/hostDashboard'), 3000)
                                    }
                                }).catch((error) => {
                                    console.error(error);
                                });
                            }
                            else {
                                let sessionTeamName = sessionStorage.getItem('team-name')
                                if (sessionTeamName !== undefined) {
                                    // const teamName = sessionTeamName
                                    let updates = {}
                                    updates[`${gameCode}/teamDetails/${sessionTeamName}/currentRound`] = 1
                                    update(ref(db), updates)
                                    setTimeout(() => router.push(`/player/game/${sessionStorage.getItem('team-name')}`), 3000)
                                }
                            }
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
        }
    }, [gameCode, role]);

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
