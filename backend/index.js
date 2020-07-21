import express from 'express'

const app = express()
const server = app.listen(8080,() => {
    console.log('Servidor Inicializou com Sucesso!')
})


const io = require('socket.io')(server)


var data_mensagens = []


io.on('connection', (socket) => {

    io.emit('chat_history', data_mensagens)
    console.log('Alguem se conectou no chat!')

    socket.on('chat',(data) => {
      data_mensagens.push(data)
      io.emit('chat_update',data_mensagens)
    })
})