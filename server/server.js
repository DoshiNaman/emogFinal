//Initialize the app
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const http = require('http')

const app = express()
app.use(express.json())

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 9000
const MODE = process.env.MODE || 'development'


const httpServer=http.createServer(app)

const io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:3000', '*'],
    },
})

const gameSetup = require('./game/GameSetup')
const gameAuth = require('./game/GameAuth')
const gamePlay = require('./game/GamePlay')
const gameScenes = require('./game/GameScenes')
const gameTeams = require('./game/GameTeams')
const gameEmotions = require('./game/GameEmotions')
const gameScores = require('./game/GameScores')
const gameLifeLines = require('./game/GameLifelines')

const onConnection = socket => {
  gameSetup(io, socket)
  gameAuth(io, socket)
  gamePlay(io, socket)
  gameScenes(io, socket)
  gameTeams(io, socket)
  gameEmotions(io, socket)
  gameScores(io, socket)
  gameLifeLines(io, socket)
}

io.on(
   'connection', onConnection 
)

httpServer.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${MODE.rainbow.bold + ' mode'.yellow.bold} `.yellow.bold
  )
)