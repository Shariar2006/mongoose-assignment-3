import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
import { Book } from '../models/book.model'

export const borrowRoutes = express.Router()

// create a book
borrowRoutes.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body

        const book = await Book.findById(body.book)

        if (!book?.available || book?.copies < body?.quantity) {
            res.status(409).json({
                success: false,
                message: "There are not enough copies of this book."
            })
        } else {
            const borrow = await Borrow.create(body)

            res.json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
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

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const borrows = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        })
    }
})
