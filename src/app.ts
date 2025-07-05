import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/book.controller'
import { borrowRoutes } from './app/controllers/borrow.controller'
import cors from 'cors'

const app: Application = express()

// cors
app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())

// routes
app.use("/api/books", bookRoutes)
app.use("/api/borrow", borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('server starting')
})

app.use((req: Request, res: Response) => {
    res.status(404).json({message:'404 route not found'})
})

export default app