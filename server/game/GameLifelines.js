const { allEmotions, EmotionsAccordingToColor, EmotionsAccordingToColorSeparatedInArray } = require("../data/Emotions");
const { getRandomInt } = require("./GameFunctions");
const { roomArrayMap } = require("./GameVariables")
module.exports = (io, socket) => {
    
    const callTheBot = ({gameCode, teamName}) => {
        console.log('LifeLine used: Call the bot!');
        let roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.callTheBot = true
        const correctEmotion = roomObject.emotion[team.roundNo - 1]
        let otherEmotion = allEmotions[getRandomInt(0, allEmotions.length - 1)]
        while(otherEmotion === correctEmotion){
            otherEmotion = allEmotions[getRandomInt(0, allEmotions.length - 1)]
        }
        let thirdEmotion = allEmotions[getRandomInt(0, allEmotions.length - 1)]
        while(thirdEmotion === correctEmotion || otherEmotion === thirdEmotion){
            thirdEmotion = allEmotions[getRandomInt(0, allEmotions.length - 1)]
        }
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
        io.in(`${gameCode}-${teamName}`).emit('your-three-choices', {correctEmotion, otherEmotion, thirdEmotion})
    }

    const deleteARow = ({gameCode, teamName}) => {
        console.log('LifeLine used: Delete A Row!');
        let roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.deleteARow = true
        let colorOfCorrectEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).colorThree
        let deleteRowEmotions = EmotionsAccordingToColorSeparatedInArray.map(e => e.filter(i => i.colorThree !== colorOfCorrectEmotion))
        deleteRowEmotions = deleteRowEmotions.filter(d => d.length > 0)
        const deletedRow = deleteRowEmotions[getRandomInt(0, deleteRowEmotions.length - 1)]
        io.in(`${gameCode}-${teamName}`).emit('deleted-row', {deletedRow})
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
     }

    const thisOrThat = ({gameCode, teamName}) => {
        console.log('LifeLine used: This or That!');
        let roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.thisOrThat = true
        io.in(`${gameCode}-${teamName}`).emit('set-this-to-true', true)
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
    }

    const callTheHost = ({gameCode, teamName}) => {
        console.log('Calling the host!');
        let roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.callTheHost = true
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
        io.in(gameCode).emit('team-details', roomObject.teams)
    }

    socket.on('call-the-bot', callTheBot)
    socket.on('delete-a-row', deleteARow)
    socket.on('this-or-that', thisOrThat)
    socket.on('call-the-host', callTheHost)
}