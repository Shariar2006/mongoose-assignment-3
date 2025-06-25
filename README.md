# 📚 Library Management System

A full-featured Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**. This API enables you to manage books and borrowing logic with proper validation, filtering, business rules, and aggregation.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**

---

## ✅ Features

- Create, Read, Update, Delete (CRUD) operations for books
- Borrow book functionality with availability and quantity validation
- Book filtering and sorting
- Aggregated report of borrowed books
- Mongoose:
  - Schema validation
  - Middleware
  - Aggregation

---

## 📂 Project Structure

📦src
 ┣ 📂app
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜book.controller.ts
 ┃ ┃ ┗ 📜borrow.controller.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜book.interface.ts
 ┃ ┃ ┗ 📜borrow.interface.ts
 ┃ ┗ 📂models
 ┃ ┃ ┣ 📜book.model.ts
 ┃ ┃ ┗ 📜borrow.model.ts
 ┣ 📜app.ts
 ┗ 📜server.ts

 ---

 ## 🔌 API Endpoints

 ### 📚 BOOK ROUTES

 #### 1️⃣ Create a Book
Endpoint: POST ```/api/books```

Description: Add a new book to the system.

#### ✅ Request Body:
````
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
````
#### 🔄 Response:
````
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
````
---

#### 📖 Get All Books
GET ```/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5```

Query Params:

- ```filter```: Filter by genre

- ```sort```: ```asc``` or ```desc```

- ```sortBy```: Field to sort

- ```limit```: Number of books

 #### 🔄 Response:

 ````
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
````

---

#### 🔍 Get Book by ID
Endpoint: GET ```/api/books/:bookId```

Description: Fetch a single book by its ID.

#### 🔄 Response:
````
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
````

---

#### 🔄 Update Book
Endpoint: PUT ```/api/books/:bookId```

Description: Update one or more fields in a book. If the copy of the book is 0 and is updated and incremented, then available will be true.

#### ✅ Request Body (example):
````
{
  "copies": 50
}
````

#### 🔄 Response:
````
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
````

---

#### ❌ Delete Book
Endpoint: DELETE ```/api/books/:bookId```

Description: Permanently delete a book.

#### 🔄 Response:
````
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
````

---

### 🔄 Borrow Routes

#### 📦 Borrow a Book
Endpoint: POST ```/api/borrow```
#### ✅ Request:
````
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
````
Enforces business logic:

 - Checks available copies

 - Deducts quantity

 - Sets ```available``` to false if ```copies``` becomes 0

#### 🔄 Response
````
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
````

---

#### 📊 Borrowed Books Summary
Endpoint: GET ```/api/borrow```
Description: Get a summary of all borrowed books, with total quantity and book details.

#### 🔄 Response (Aggregation):
````
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
````

---
