const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {
    const joinScoreSettings = (gameCode) => {
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).playerDetails)
    }
    const scoreSettings = ({compoundCorrect, compoundIncorrect, otherCorrect, otherIncorrect, otherAdjacent, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.adjacent = Number(otherAdjacent)
        roomObject.compoundCorrect = Number(compoundCorrect)
        roomObject.compoundIncorrect = Number(compoundIncorrect)
        roomObject.otherCorrect = Number(otherCorrect)
        roomObject.otherIncorrect = Number(otherIncorrect)
    }

    const showLeaderBoard = (gameCode) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.teams = roomObject.teams.sort((a, b) => b.score - a.score)
        io.in(gameCode).emit('team-scores',roomObject.teams)
    }
    
    socket.on('join-leaderboard', showLeaderBoard)
    socket.on('join-score-settings', joinScoreSettings)
    socket.on('Score-Settings', scoreSettings)
}