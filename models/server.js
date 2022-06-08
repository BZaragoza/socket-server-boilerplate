// Servidor de Express
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import cors from 'cors'

import Sockets from './sockets.js'

import { __dirname } from '../config/index.js'

class SocketServer {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // Http server
    this.server = http.createServer(this.app)

    // Configuraciones de sockets
    this.io = new Server(this.server, { transports: ['websocket'] })
  }

  middlewares () {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')))

    // CORS
    this.app.use(cors())
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets () {
    new Sockets(this.io)
  }

  execute () {
    // Inicializar Middlewares
    this.middlewares()

    // Inicializar sockets
    this.configurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port)
    })
  }
}

export default SocketServer
