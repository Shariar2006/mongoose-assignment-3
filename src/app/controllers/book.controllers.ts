import express, { Request, Response } from 'express'
import { Book } from '../models/book.model'

export const bookRoutes = express.Router()

bookRoutes.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body

        const book = await Book.create(body)

        res.json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        res.json({
            message: error.message,
            success: false,
            error
        })
    }

})

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const book = await Book.find()

        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })
    } catch (error: any) {
        res.json({
            message: error.message,
            success: false,
            error
        })
    }
})