import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ServerSocket } from './src/socket';

import {
    login,
    register
} from './src/routes'
const {
    PORT,
    MONGO_ATLAS_URL,
} = require('./const')

const app: Express = express()
const httpServer= http.createServer(app)

const socketServer = new ServerSocket(httpServer)

const initializeDb = async (mongoUrl: string) => {
    try {
        await connect(mongoUrl)
        console.info('Connected to db')
    } catch (error) {
        console.error('db connection failed', error)
    }
}

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use(cors({origin: '*'}))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.send(`Express server is up and running at port ${PORT}`)
});

app.post('/login', login)
app.post('/register', register)

initializeDb(MONGO_ATLAS_URL)

httpServer.listen(PORT, () => {
    console.log(`Express server is up and running at port ${PORT}`)
})