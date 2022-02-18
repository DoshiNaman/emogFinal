// const game = []
// const {Teams} = require('../data/Teams')
// const {Scenes} = require('../data/Scenes')
// const defaultGame = Teams
// let mode = 'default'
// let { roomSpecificGamePlay, Password} = require('./GameVariables')

const { Emotions, CompoundEmotions } = require("../data/Emotions")
const { getRandomInt } = require("./GameFunctions")
const { roomArrayMap } = require("./GameVariables")
const GameEmotions = JSON.parse(JSON.stringify(Emotions))


module.exports = (io, socket) => {



    const setRounds = ({MAX_ROUND, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.MAX_ROUNDS = Number(MAX_ROUND)
        let myEmotionData = new Set()
        let j = 0
        while(myEmotionData.size !== Number(MAX_ROUND)){
            let i = getRandomInt(0, Emotions.length - 1)
            if(myEmotionData.size < MAX_ROUND - 2){
                myEmotionData.add(GameEmotions[i][j])
                j = 1
            }
            else{
                i = getRandomInt(0, CompoundEmotions.length - 1)
                myEmotionData.add(CompoundEmotions[i])
            }
        }
        myEmotionData = [...myEmotionData]

        roomObject.emotion = myEmotionData
        console.log(roomObject.emotion);
    }

    const setTimer = ({guesser, typer, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.guessingTimer = guesser
        roomObject.typingTimer = typer
    }

    const joinAvatar = ({gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomObject.playerDetails)
    }

    const saveAvatar = ({gameCodeRender, playerName, avatar}) => {
        let roomObject = roomArrayMap.get(gameCodeRender)
        let player = roomObject.playerDetails.find(p => p.name === playerName)
        player.avatar = avatar
        console.log('Player avatar saved!');
        io.in(gameCodeRender).emit('players', roomObject.playerDetails)
    }
    
    socket.on('set-time', setTimer)
    socket.on('no-of-rounds', setRounds)
    socket.on('join-avatar', joinAvatar)
    socket.on('save-avatar', saveAvatar)
}