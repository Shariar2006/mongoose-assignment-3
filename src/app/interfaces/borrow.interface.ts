import { Model, Types } from 'mongoose'
import { IBook } from './book.interface'

export interface IBorrow {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}