import express, { Request, Response } from 'express'
import { Book } from '../models/book.model'

export const bookRoutes = express.Router()

// create a book
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

// get all books
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

// get a book
bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId

        const book = await Book.findById(bookId)

        res.json({
            success: true,
            message: "Books retrieved successfully",
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

// update a book
bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const body = req.body

        if (body?.copies < 0) {
            res.status(400).json({
                success: false,
                message: 'Copies must be a positive number',
            })
        } else {
            if (body?.copies > 0) {
                body.available = true
            }else if (body?.copies == 0) {
                body.copies = 0
                body.available = false
            }

console.log(body)

            const book = await Book.findByIdAndUpdate(bookId, body, { new: true })

            res.json({
                success: true,
                message: "Books updated successfully",
                data: book
            })
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})

// delete a book
bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId

        await Book.findByIdAndDelete(bookId)

        res.json({
            success: true,
            message: "Books deleted successfully",
            data: null
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})
