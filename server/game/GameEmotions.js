const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {
    const joinEmotions = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('players', roomObject.playerDetails)
        io.to(socket.id).emit('max-round-no', roomObject.MAX_ROUNDS)
    }

    const getEmotions = ({gameCode, emotionArray}) => {
        let roomObject = roomArrayMap.get(gameCode)
        console.log(emotionArray);
        console.log('Emotions set');
        roomObject.emotion = emotionArray
        roomObject.manuallySetEmotion = true
        io.to(socket.id).emit('received-emotions', roomObject.manuallySetEmotion)
    }

    socket.on('send-emotions', getEmotions)
    socket.on('game-emotions', joinEmotions)
}