import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ServerSocket } from './src/socket';

import {
    login
} from './src/routes'
const { PORT } = require('./const')

const app: Express = express()
const httpServer= http.createServer(app)

const socketServer = new ServerSocket(httpServer)

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

httpServer.listen(PORT, () => {
    console.log(`Express server is up and running at port ${PORT}`)
})