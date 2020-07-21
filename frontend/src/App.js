import React, {useState,useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import './App.css'

const socketIOClient = require('socket.io-client')

const App = () => {

  const [mensagens,setMensagens] = useState([])

  const [Mensagem,setMensagem] = useState('')
  const [Nome,setNome] = useState('Usuario')

  const [socket,setSocket] = useState()

  const [update,setUpdate] = useState(false)

  useEffect(() => {
    if(update == false) {
      const socket = socketIOClient('http://localhost:8080')
      setSocket(socket)
      setUpdate(true)

      socket.on('chat_history',(data) => {
       setMensagens(data)
      })

      socket.on('chat_update',(data) => {
        setMensagens(data)
      })

    }
  },[])


  const QuandoClicar = () => {
   socket.emit('chat', {
     Nome,
     Mensagem
   })
  }

  return (
   <div className="App">
     <h1 style={{
       color:'gray'
     }}>Chat Em Tempo Real</h1>
     <Divider/>
     <nav className="chat_area">
     <TextField placeholder="Nome" onChange={(e) => {
       setNome(e.target.value)
     }}/>
     <TextField placeholder="Mensagem" onChange={(e) => {
       setMensagem(e.target.value)
     }}/>
     <Button onClick={QuandoClicar}>Enviar</Button>
     </nav>
     <ul>
       {
         mensagens.map((mensagem) => {
           console.log(mensagem)
           return (
           <li style={{listStyle:'none'}}>{mensagem.Nome}: {mensagem.Mensagem}</li>
           )
         })
       }
     </ul>
   </div> 
  )
}

export default App;