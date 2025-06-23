import express, { Application, Request, Response } from 'express'
import { Schema, model } from 'mongoose'

const app: Application = express()

app.use(express.json())

// routes


app.get('/', (req: Request, res: Response) => {
    res.send('server starting')
})

export default app