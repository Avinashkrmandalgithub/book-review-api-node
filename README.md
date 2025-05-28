# 📚 Book Review API

A RESTful API for a book review platform built with **Node.js**, **Express**, and **MongoDB**. Authenticated users can add books, submit one review per book, and view detailed review statistics.

---

## 🚀 Features

- 🔐 JWT-based user authentication  
- 📘 Add and fetch books (with filters + pagination)  
- ⭐ Book details with average ratings and paginated reviews  
- 📝 Submit, edit, and delete your own reviews  
- 🔍 Search books by title or author (partial + case-insensitive)

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Auth:** JWT (JSON Web Token)  
- **Dev Tools:** Nodemon, dotenv, Postman

---

## 🧩 Project Structure

```
📦 Book Review API
├── controllers/       # Route logic
├── middleware/        # Auth middleware
├── models/            # Mongoose models
├── routes/            # API route handlers
├── .env               # Environment config
├── .gitignore
├── README.md
└── server.js          # Entry point
```

---

## 🔑 Environment Setup

Create a `.env` file in the root with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookReviewDB
JWT_SECRET=your_secret_key
```

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

---

## 📮 API Endpoints

### 🔐 Authentication

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | `/api/signup` | Register a new user      |
| POST   | `/api/login`  | Login and get JWT token  |

---

### 📘 Books

| Method | Endpoint         | Auth Required | Description                            |
|--------|------------------|---------------|----------------------------------------|
| POST   | `/api/books`     | ✅            | Add a new book                         |
| GET    | `/api/books`     | ❌            | Get all books (pagination + filters)   |
| GET    | `/api/books/:id` | ❌            | Get single book details w/ reviews     |

Query Filters:
- `?author=xyz`
- `?genre=fiction`
- `?page=1&limit=5`

---

### ✍️ Reviews

| Method | Endpoint               | Auth Required | Description                      |
|--------|------------------------|---------------|----------------------------------|
| POST   | `/api/books/:id/reviews` | ✅            | Add a review to a book           |
| PUT    | `/api/reviews/:id`     | ✅            | Update your review               |
| DELETE | `/api/reviews/:id`     | ✅            | Delete your review               |

---

### 🔍 Search

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| GET    | `/api/search` | Search books by title or author    |

Example:
```
GET /api/search?q=harry
```

---

## 💬 Sample API Calls (with `curl`)

### 🔐 Signup

```bash
curl -X POST http://localhost:5000/api/signup \
-H "Content-Type: application/json" \
-d '{"name":"Alice","email":"alice@example.com","password":"pass123"}'
```

### 📘 Add Book (Authenticated)

```bash
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title":"1984","author":"George Orwell","genre":"Dystopian","description":"Classic novel."}'
```

---

## 🗃️ MongoDB Schema Overview

### User

```js
{
  name: String,
  email: String,
  password: String (hashed)
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  description: String,
  createdBy: ObjectId (User)
}
```

### Review

```js
{
  book: ObjectId,
  user: ObjectId,
  rating: Number (1–5),
  comment: String
}
```

---

## 🧠 Design Decisions

- JWT used for stateless, secure auth.
- MongoDB/Mongoose for easy population of nested data.
- One-review-per-user-per-book enforced in code logic.
- Filters and pagination added for scalability.

---

## 🧾 License

MIT

---

## ✍️ Author

[Pankaj Mandal](https://github.com/Pankaj7808)
