import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http'
import cors from 'cors'
import { ServerSocket } from './src/socket';

const app: Express = express()
const httpServer= http.createServer(app)

const port = 3050

const socketServer = new ServerSocket(httpServer)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    
    next()
})

app.use(cors({origin: '*'}))


app.get('/health', (req: Request, res: Response) => {
    res.send(`Express server is up and running at port ${port}`)
});

httpServer.listen(port, () => {
    console.log(`Express server is up and running at port ${port}`)
})