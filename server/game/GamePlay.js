const { Emotions, CompoundEmotions, EmotionsAccordingToColor, EmotionsAccordingToColorSeparatedInArray } = require("../data/Emotions");
const { roomArrayMap } = require("./GameVariables")
const { getRandomInt } = require('./GameFunctions')

module.exports = (io, socket) => {

    const joinTeamRoom = ({code, teamName}) => {
        try{
        console.log('My team is ', teamName)
        socket.join(code)
        socket.join(`${code}-${teamName}`)
        const roomObject = roomArrayMap.get(code)
        console.log(roomObject.playerDetails);
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        const player = team.teamMembers.find(p => p.isRandomlySelected === true)
        team.showSummary = false
        io.to(socket.id).emit('team-score', team.score)
        io.to(socket.id).emit('team-messages', team.messages)
        io.to(socket.id).emit('team-players', team.teamMembers)
        io.to(socket.id).emit('team-round', team.roundNo)
        io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
        io.to(socket.id).emit('typing-timer', roomObject.typingTimer)
        io.to(socket.id).emit('guessing-timer', roomObject.guessingTimer)
        io.to(socket.id).emit('scene', roomObject.scene[0])
        io.to(socket.id).emit('team-disabled', team.isDisabled)
        io.to(socket.id).emit('typing-counter', team.typingCounter)
        io.to(socket.id).emit('guessing-counter', team.guessingCounter)
        io.to(socket.id).emit('current-team', team)
        io.to(socket.id).emit('game-log', team.emotionPerRound)
        io.to(socket.id).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.to(socket.id).emit('next-round-emotion', roomObject.emotion[team.roundNo - 2])
        io.to(socket.id).emit('active-player', player)
        io.in(`${code}-${teamName}`).emit('show-summary', team.showSummary)
        io.in(code).emit('team-details', roomObject.teams)
        }
        catch(e){
            console.log(e);
        }
    }

    const addedMessage = ({gameCode,teamName, message}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.messages = message
        console.log(team.roundNo);
        team.isDisabled = true
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
    }

    const emotionGuessed = ({gameCode, teamName, emotion, playerName}) => {
        emotion = emotion.toUpperCase()
        console.log('The Player guessed an emotion! ');
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))

        if(Emotions.some(row => row.includes(emotion)) || CompoundEmotions.includes(emotion))
        {
            console.log(emotion);
            if(roomObject.emotion[team.roundNo- 1] === emotion)
            {   
                console.log('Yes');
                let emotionRow = Emotions.filter(row => row.find(e => e === emotion))
                if(emotionRow.length >= 1){
                    team.score += roomObject.otherCorrect
                }
                let compoundEmotionRow = CompoundEmotions.find(e => e === emotion)
                if(compoundEmotionRow)
                    team.score += roomObject.compoundCorrect
                else if(!emotionRow && !compoundEmotionRow)
                    team.score += roomObject.compoundIncorrect
            }
            else if(!CompoundEmotions.includes(emotion)){
                const coloredEmotion = EmotionsAccordingToColor.find(e => e.emotion === emotion).color
                const allEmotionsOfThisColor = EmotionsAccordingToColor.filter(e => e.color === coloredEmotion)
                let correctColoredEmotion = ''
                let colorTwoCorrectColoredEmotion = ''
                if(!CompoundEmotions.includes(roomObject.emotion[team.roundNo - 1])){
                    correctColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).color
                    colorTwoCorrectColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).colorTwo
                }
                let localVar = 0
                for(let i of allEmotionsOfThisColor){
                    if(i.color === correctColoredEmotion){
                    localVar += roomObject.adjacent
                    team.score += roomObject.adjacent
                        break
                    }
                    else if(i.colorTwo === colorTwoCorrectColoredEmotion){
                    localVar += roomObject.adjacent
                    team.score += roomObject.adjacent
                        break
                    }
                }
                if(localVar === 0){
                    team.score += roomObject.otherIncorrect
                }
            }
        }
        

        let t = getRandomInt(0, team.teamMembers.length - 1)
        while(t === team.randomIndex){
            t = getRandomInt(0, team.teamMembers.length - 1)
        }

        team.teamMembers[t].isRandomlySelected = true
        team.randomIndex = t

        for(let i = 0; i < team.teamMembers.length; i++){
            if(i !== team.randomIndex)
                team.teamMembers[i].isRandomlySelected = false
        }
        if(team.roundNo < roomObject.MAX_ROUNDS)
            team.roundNo += 1
        else{
            team.emotionsGuessed.push(emotion)
            io.in(`${gameCode}-${teamName}`).emit('go-to-leaderboard')
            io.in(gameCode).emit('team-details', roomObject.teams)
            let j = 0
            for(var i of roomObject.teams){
                if(i.emotionsGuessed.length === roomObject.MAX_ROUNDS)
                    j += 1
            }
            if(j === roomObject.teams.length)
            {
                io.in(gameCode).emit('leaderboard-js')
            }
            return
        }
        team.emotionsGuessed.push(emotion)
        team.typingTimer = roomObject.typingTimer
        team.guessingTimer = roomObject.guessingTimer
        team.isDisabled = false
        team.showSummary = true
        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        team.typingCounter = totalTimerT
        team.guessingCounter = totalTimerG

        team.emotionPerRound.push({
            guesser : playerName,
            emotion : emotion
        })

        if(team.roundNo === roomObject.scene[0].nudgeRoundNo){
            team.messages.push(roomObject.scene[0].nudge)
        }

        
        const playerDude = team.teamMembers.find(p => p.isRandomlySelected === true)



        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', playerDude)
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
        io.in(`${gameCode}-${teamName}`).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.in(`${gameCode}-${teamName}`).emit('next-round-emotion', roomObject.emotion[team.roundNo - 2])
        io.in(`${gameCode}-${teamName}`).emit('game-log', team.emotionPerRound)
        io.in(`${gameCode}-${teamName}`).emit('reset-emotions')
        io.in(`${gameCode}-${teamName}`).emit('your-answer', emotion)
        io.in(`${gameCode}-${teamName}`).emit('show-summary', team.showSummary)
        io.in(gameCode).emit('team-details', roomObject.teams)
        let j = 0
        for(var i of roomObject.teams){
            if(i.emotionsGuessed.length === roomObject.MAX_ROUNDS)
                j += 1
        }
        if(j === roomObject.teams.length)
        {
            io.in(gameCode).emit('leaderboard-js')
        }
    }

    const emotionGuessedArray = ({gameCode, teamName, guessedEmotions, playerName}) => {
        console.log(guessedEmotions);
        const roomObject = roomArrayMap.get(gameCode)
        guessedEmotions = guessedEmotions.map(g => g.toUpperCase())
        console.log(guessedEmotions);
        console.log(guessedEmotions[0]);
        console.log(guessedEmotions[1]);
        console.log(gameCode);
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        if(guessedEmotions.includes(roomObject.emotion[team.roundNo - 1])){
            console.log(roomObject.emotion[team.roundNo - 1]);
            team.score += roomObject.otherCorrect
        }
        else if(!CompoundEmotions.includes(guessedEmotions[0]) || !CompoundEmotions.includes(guessedEmotions[1])){
            console.log('Getting Points for adjacent cell...');
            const coloredEmotion = EmotionsAccordingToColor.find(e => e.emotion === guessedEmotions[0]).color
            const coloredOtherEmotion = EmotionsAccordingToColor.find(e => e.emotion === guessedEmotions[1]).color
            const allEmotionsOfThisColor = EmotionsAccordingToColor.filter(e => e.color === coloredEmotion)
            const allOtherEmotionsOfThisColor = EmotionsAccordingToColor.filter(e => e.color === coloredOtherEmotion)
            let correctColoredEmotion = ''
            let colorTwoCorrectColoredEmotion = ''
            if(!CompoundEmotions.includes(roomObject.emotion[team.roundNo - 1])){
                correctColoredEmotion = EmotionsAccordingToColor.find
                (e => e.emotion === roomObject.emotion[team.roundNo - 1]).color
                colorTwoCorrectColoredEmotion = EmotionsAccordingToColor.find
                (e => e.emotion === roomObject.emotion[team.roundNo - 1]).colorTwo
                
            }
            let localVar = 0
            for(let i of allEmotionsOfThisColor){
                if(i.color === correctColoredEmotion){
                    console.log('Match found!');
                    team.score += roomObject.adjacent
                    localVar += roomObject.adjacent
                    break
                }
                else if(i.colorTwo === colorTwoCorrectColoredEmotion){
                    console.log('Other match found!');
                    team.score += roomObject.adjacent
                    localVar += roomObject.adjacent
                    break
                }
            }
            for(let i of allOtherEmotionsOfThisColor){
                if(i.color === correctColoredEmotion){
                    console.log('Match found!');
                    localVar += roomObject.adjacent
                    team.score += roomObject.adjacent
                    break
                }
                else if(i.colorTwo === colorTwoCorrectColoredEmotion){
                    console.log('Other match found!');
                    localVar += roomObject.adjacent
                    team.score += roomObject.adjacent
                    break
                }
                if(localVar === 0){
                    team.score += roomObject.otherIncorrect
                }
            }
        }

        let t = getRandomInt(0, team.teamMembers.length - 1)

        while(t === team.randomIndex){
            t = getRandomInt(0, team.teamMembers.length - 1)
        }

        team.teamMembers[t].isRandomlySelected = true
        team.randomIndex = t

        for(let i = 0; i < team.teamMembers.length; i++){
            if(i !== team.randomIndex)
                team.teamMembers[i].isRandomlySelected = false
        }

        if(team.roundNo < roomObject.MAX_ROUNDS)
            team.roundNo += 1
        else{
            io.in(`${gameCode}-${teamName}`).emit('go-to-leaderboard')
            return
        }
        
        team.emotionsGuessed.push(guessedEmotions)
        team.typingTimer = roomObject.typingTimer
        team.guessingTimer = roomObject.guessingTimer
        team.isDisabled = false
        team.showSummary = true
        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        team.typingCounter = totalTimerT
        team.guessingCounter = totalTimerG
        
        team.emotionPerRound.push({
            guesser : playerName,
            emotion : guessedEmotions
        })


        if(team.roundNo === roomObject.scene[0].nudgeRoundNo){
            team.messages.push(roomObject.scene[0].nudge)
        }
        
        const playerDude = team.teamMembers.find(p => p.isRandomlySelected === true)


        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', playerDude)
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
        io.in(`${gameCode}-${teamName}`).emit('set-this-to-true', false)
        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
        io.in(`${gameCode}-${teamName}`).emit('current-team', team)
        io.in(`${gameCode}-${teamName}`).emit('game-log', team.emotionPerRound)
        io.in(`${gameCode}-${teamName}`).emit('reset-emotions')
        io.in(`${gameCode}-${teamName}`).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.in(`${gameCode}-${teamName}`).emit('your-answer', guessedEmotions)
        io.in(`${gameCode}-${teamName}`).emit('show-summary', team.showSummary)
        io.in(gameCode).emit('team-details', roomObject.teams)
        let j = 0
        for(var i of roomObject.teams){
            if(i.emotionsGuessed.length === roomObject.MAX_ROUNDS)
                j += 1
        }
        if(j === roomObject.teams.length)
        {
            io.in(gameCode).emit('leaderboard-js')
        }
    }

    const hostDashboard = (gameCode) => {
        socket.join(gameCode)
        const roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('team-details', roomObject.teams)
        io.to(socket.id).emit('game-scenes', roomObject.scene)
        io.to(socket.id).emit('typing-timer', roomObject.typingTimer)
        io.to(socket.id).emit('guessing-timer', roomObject.guessingTimer)
        io.to(socket.id).emit('emotions', roomObject.emotion)
        io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
        io.to(socket.id).emit('compound-correct', roomObject.compoundCorrect)
        io.to(socket.id).emit('compound-incorrect', roomObject.compoundIncorrect)
        io.to(socket.id).emit('adjacent', roomObject.adjacent)
        io.to(socket.id).emit('other-correct', roomObject.otherCorrect)
        io.to(socket.id).emit('other-incorrect', roomObject.otherIncorrect)
    }

    const quitGame = (gameCode) => {
        console.log('Quitting Game...');
        roomArrayMap.delete(gameCode)
        io.in(gameCode).emit('quit-game')
    }

    socket.on('submit-statement', addedMessage)
    socket.on('join-team-room', joinTeamRoom)
    socket.on('guessed', emotionGuessed)
    socket.on('host-dashboard', hostDashboard)
    socket.on('guessed-array', emotionGuessedArray)
    socket.on('quit-game', quitGame)
}