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
        status = sessionStorage.getItem('status')
        if(gameCode){
            const sceneRef = ref(db, `${gameCode}/hostDetails`);
            get(sceneRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const sceneObj = snapshot.val()
                    const sceneIDD = parseInt(sceneObj["sceneId"])
                    let noOfROUNDSS = parseInt(sceneObj["noOfRounds"])
                    alert(noOfROUNDSS)
                    console.log(sceneObj)
                    const sceneRef2 = ref(db, `${gameCode}/scenes/${sceneIDD}`);
                    get(sceneRef2).then((snapshot) => {
                        if (snapshot.exists()) {
                            let sceneObj2 = snapshot.val()
                            console.log(sceneObj2)
                            setScenes(sceneObj2)
                            if(status === '1')
                            {
                                const teamRef = ref(db, `${gameCode}/teamDetails`);
                                get(teamRef).then((snapshot) => {
                                    if (snapshot.exists()){
                                        
                                        const teamsObj = snapshot.val();
                                        let teamsNames = Object.keys(teamsObj);
                                        //alert(teamsNames.length)
                                        let updates = {}
                                        for (let i = 0; i < teamsNames.length; i++) {
                                            let noOfROUNDS = noOfROUNDSS
                                            let roundDetailsArr = []
                                            let teamName = teamsNames[i]
                                            //alert(teamName)
                                            roundDetailsArr.push({
                                                sender:"pre",
                                                msg:sceneObj2.statementOne
                                            })
                                            roundDetailsArr.push({
                                                sender:"pre",
                                                msg:sceneObj2.statementTwo
                                            })
                                            console.log(roundDetailsArr)
                                            let teamObj = teamsObj[teamName]
                                            let teamMembersNames = Object.keys(teamObj);
                                            //r=2,p=3
                                            while(noOfROUNDS!=0){
                                                if(noOfROUNDS>teamMembersNames.length){
                                                    for (let j = 0; j < teamMembersNames.length; j++) {
                                                        let obj2 = {}
                                                        //console.log(typeof (teamMembersNames[j]));
                                                        if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {
        
                                                        }
                                                        else {
                                                            //console.log(teamMembersNames[j])
                                                            obj2 = {
                                                                sender:teamMembersNames[j],
                                                                msg:"NoN"
                                                            }
                                                            roundDetailsArr.push(obj2)
                                                        }
                                                    }
                                                    noOfROUNDS=noOfROUNDS-(teamMembersNames.length-2) 
                                                }
                                                else if(noOfROUNDS<=teamMembersNames.length){
                                                    for (let j = 0; j < noOfROUNDS; j++) {
                                                        let obj2 = {}
                                                        //console.log(typeof (teamMembersNames[j]));
                                                        if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {
        
                                                        }
                                                        else {
                                                            //console.log(teamMembersNames[j])
                                                            obj2 = {
                                                                sender:teamMembersNames[j],
                                                                msg:"NoN"
                                                            }
                                                            roundDetailsArr.push(obj2)
                                                        }
                                                    }
                                                    noOfROUNDS=0
                                                }
                                               
                                                //for (let j = 0; j < teamMembersNames.length; j++) {
                                                    
                                                //} 

                                            }
                                            
                                            console.log(roundDetailsArr)
                                            updates[`${gameCode}/roundDetails/${teamName}`] = roundDetailsArr
                                        }
                                        update(ref(db), updates)
                                    }
                                }).catch((error) => {
                                    console.error(error);
                                });
                            }
                            else{
                                if(sessionStorage.getItem('team-name') != "" && sessionStorage.getItem('team-name') != null){
                                    const teamName=sessionStorage.getItem('team-name')
                                    let updates = {}
                                    updates[`${gameCode}/teamDetails/${teamName}/currentRound`] = 1
                                    update(ref(db), updates)
                                    //setTimeout(() => router.push(`/player/game/${sessionStorage.getItem('team-name')}`), 4000)
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
    }, [gameCode]);

    /* useEffect(() => {        
        //socket.emit('get-game-scene', sessionStorage.getItem('game-code'))
        // socket.on('game-scene', scene => {
        //     console.log(scene);
        //     setScene(scene)})
        
    }, [gameCode,scenes]); */


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
