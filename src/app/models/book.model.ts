import mongoose, { model } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new mongoose.Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, 'Genre is required. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.'],
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            uppercase: true,
            trim: true
        },
        isbn: {
            type: String,
            required: [true, 'Isbn (International Standard Book Number) is required.'],
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        copies: {
            type: Number,
            required: [true, 'Copies number is required'],
            min: [0, 'Copies must be a positive number'],
            trim: true
        },
        available: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)


export const Book = model<IBook>("Book", bookSchema)