import { Server as HTTPServer } from 'http'
import { Socket, Server } from 'socket.io'
import { v4 } from 'uuid'

interface userInterface {
    _id: string;
    socketID?: string;
    name: string;
    friends: string[];
  }

export class ServerSocket {
    public static instance: ServerSocket
    public io: Server

    public users: userInterface[]

    constructor(server: HTTPServer) {
        ServerSocket.instance = this
        this.users = []
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*',
            }
        })

        this.io.on('connection', this.StartListeners)

        console.info('Socket IO started.')
    }

    StartListeners = (socket: Socket) => {
        console.info('Message recived from ' + socket.id)
        
        socket.on('new_user', (user) => {
            this.users.push({ ...user, socketId: socket.id })
            this.io.emit('update_user_socketId', socket.id)
            this.io.emit('users_online', this.users)
        })
        
        socket.on('send_message', (message) => {
            const { userId, value } = message
            this.io.emit('send_message_to_client', { _id: v4(), socketId: socket.id, value, userId})
        })
        
        socket.on('disconnect', () => {
            this.users = this.users.filter((user) => {
                return user.socketID !== socket.id
            })
            this.io.emit('users_online', this.users)
            console.info('disconect recived from ' + socket.id)
            console.info(this.users)
            socket.disconnect()
        })
    }
}