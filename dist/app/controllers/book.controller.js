"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// create a book
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
// get all books
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit = '10' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
// get a book
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
// update a book
exports.bookRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        if ((body === null || body === void 0 ? void 0 : body.copies) < 0) {
            res.status(400).json({
                success: false,
                message: 'Copies must be a positive number',
            });
        }
        else {
            if ((body === null || body === void 0 ? void 0 : body.copies) > 0) {
                body.available = true;
            }
            else if ((body === null || body === void 0 ? void 0 : body.copies) == 0) {
                body.copies = 0;
                body.available = false;
            }
            console.log(body);
            const book = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
            res.json({
                success: true,
                message: "Books updated successfully",
                data: book
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
// delete a book
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.json({
            success: true,
            message: "Books deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error
        });
    }
}));
