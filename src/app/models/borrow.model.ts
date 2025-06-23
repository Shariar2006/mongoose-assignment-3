import mongoose, { Schema, Types, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

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

export const Borrow = model<IBorrow>("Borrow", borrowSchema)