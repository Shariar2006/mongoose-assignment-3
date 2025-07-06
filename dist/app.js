"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)({ origin: ['http://localhost:5173', 'https://readify-phi.vercel.app'] }));
app.use(express_1.default.json());
// routes
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('server starting');
});
app.use((req, res) => {
    res.status(404).json({ message: '404 route not found' });
});
exports.default = app;
