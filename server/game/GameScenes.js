const { getRandomInt } = require('./GameFunctions')
let { roomArrayMap} = require('./GameVariables')

module.exports = (io, socket) => {
    
    const joinScenes = (gameCode) => {
        io.to(socket.id).emit('scenes', roomArrayMap.get(gameCode).GAME_SCENES)
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).players)
    }

    const editScenes = ({sceneID, scene, gameCode, nudgeRole1, nudgeRole2, nudgeStatement, initialStatementOne, initialStatementTwo, nudgeRoundNo}) => {
        let roomObject = roomArrayMap.get(gameCode)
        let sceneIndex
        for(let j = 0; j < roomObject.GAME_SCENES.length; j++){
            if(roomObject.GAME_SCENES[j].id === sceneID){
                sceneIndex = j
            }
        }
        console.log(sceneIndex);    
        if(sceneIndex){           
            roomObject.scene[0].scene = scene
            roomObject.scene[0].roleOne = nudgeRole1
            roomObject.scene[0].roleTwo = nudgeRole2
            roomObject.scene[0].statementOne = initialStatementOne
            roomObject.scene[0].statementTwo = initialStatementTwo
            roomObject.scene[0].nudge = nudgeStatement
            roomObject.scene[0].nudgeRoundNo = nudgeRoundNo
            roomObject.GAME_SCENES[sceneIndex].scene = scene
            roomObject.GAME_SCENES[sceneIndex].roleOne = nudgeRole1
            roomObject.GAME_SCENES[sceneIndex].roleTwo = nudgeRole2
            roomObject.GAME_SCENES[sceneIndex].statementOne = initialStatementOne
            roomObject.GAME_SCENES[sceneIndex].statementTwo = initialStatementTwo
            roomObject.GAME_SCENES[sceneIndex].nudge = nudgeStatement
            roomObject.GAME_SCENES[sceneIndex].nudgeRoundNo = nudgeRoundNo
        }
        console.log('hello', roomObject.scene);
        io.to(socket.id).emit('updated-scenes', roomObject.GAME_SCENES)
    }

    const gameScenes = (gameCode) => {
        socket.join(gameCode)
        io.in(gameCode).emit('players',roomArrayMap.get(gameCode).playerDetails)
    }

    const addScene = ({scene, nudgeStatement, nudgeRole1, nudgeRole2, gameCode, initialStatementOne, initialStatementTwo, nudgeRoundNo}) => {
        console.log(initialStatementOne);
        console.log(initialStatementTwo);
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.scene.splice(1, 0,{
            id: roomObject.scene.length + 1,
            scene : scene,
            nudge : nudgeStatement,
            roleOne : nudgeRole1,
            roleTwo : nudgeRole2,
            statementOne : initialStatementOne,
            statementTwo : initialStatementTwo,
            nudgeRoundNo : nudgeRoundNo
        })
        roomObject.GAME_SCENES.splice(1 ,0,{
            id : roomObject.scene.length + 1,
            scene : scene,
            nudge : nudgeStatement,
            roleOne : nudgeRole1,
            roleTwo : nudgeRole2,
            statementOne : initialStatementOne,
            statementTwo : initialStatementTwo,
            nudgeRoundNo : nudgeRoundNo
        })
        io.to(socket.id).emit('scenes',roomObject.GAME_SCENES)
    }

    const addNewScenes = ({addScenesToGame, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.scene = addScenesToGame
        console.log('hi', addScenesToGame);
        roomObject.manuallySetScene = true
        io.to(socket.id).emit('received-scenes', roomObject.manuallySetScene)
    }

    const sendGameScene = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('game-scene', roomObject.scene)
    }

    const comeToScene = (gameCode) => {
        console.log('Hello');
        let roomObject = roomArrayMap.get(gameCode)
        for(let i = 0; i < roomObject.teams.length; i++){
            if(roomObject.teams[i].teamMembers.length !== 0){
                let t = getRandomInt(0, roomObject.teams[i].teamMembers.length - 1)
                roomObject.teams[i].teamMembers[t].isRandomlySelected = true
                roomObject.teams[i].randomIndex = t
            }
        }
        for(let i of roomObject.teams)
        {
            console.log(i.teamMembers);
        }
        io.in(gameCode).emit('scene-page')
        io.to(socket.id).emit('scene-page')
    }

    const getMaxRounds = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('sent-max-rounds', roomObject.MAX_ROUNDS)
    }

    socket.on('come-to-scene', comeToScene)
    socket.on('edit-scenes', editScenes)
    socket.on('game-scenes', gameScenes)
    socket.on('join-scenes', joinScenes)
    socket.on('new-scenes', addNewScenes)
    socket.on('add-scene', addScene)
    socket.on('get-game-scene', sendGameScene)
    socket.on('get-max-rounds', getMaxRounds)
}