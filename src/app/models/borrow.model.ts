import mongoose, { Schema, Types, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new mongoose.Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: [true, 'Book ID is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required']
        },
        dueDate: {
            type: Date,
            required: [true, 'Deu date is required'],
            validate: {
                validator: function (value) {
                    return value > Date.now()
                },
                message: 'Due date must be in the future'
            }
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

borrowSchema.post('save', async function (doc) {
    const book = await Book.findById(doc.book)

    if (!book) {
        console.error("Book not found!");
        return;
      }

    book.copies = book.copies - doc.quantity;

    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();
})

export const Borrow = model<IBorrow>("Borrow", borrowSchema)