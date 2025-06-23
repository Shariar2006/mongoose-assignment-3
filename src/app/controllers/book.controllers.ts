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
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }

})

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy, sort, limit = '10' } = req.query;
        
        const query: any = {};
        if (filter) {
            query.genre = filter; 
        }
        
        const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));

        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})