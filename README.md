# Products API — Practice Express (sba-13)

## Description

Simple, beginner-friendly REST API for managing products built with Express and Mongoose. Implements CRUD endpoints and a basic querying endpoint for reading products. This project is intentionally vanilla and easy to follow for learning purposes.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation & Run](#installation)
- [Testing (Postman / curl)](#testing)
- [Future Ideas](#future)
- [Author](#author)

## <a name="technologies-used"></a>Technologies Used

- **Node.js** — JavaScript runtime
- **Express** — Web framework
- **Mongoose** — MongoDB ODM
- **dotenv** — Environment variable management
- **MongoDB Atlas or Local MongoDB** — Database

## <a name="features"></a>Features

- Create, read, update, delete (CRUD) products
- Read all products with optional querying (category, min/max price, sort, pagination)
- Simple, beginner-friendly code structure: `server.js`, `db/connection.js`, `models/Product.js`, `routes/productRoutes.js`

## <a name="api-endpoints"></a>API Endpoints

- POST /api/products — Create a product (returns 201)
- GET /api/products — Read products (supports optional query params)
- GET /api/products/:id — Read a single product by _id
- PUT /api/products/:id — Update a product by _id (returns the updated product)
- DELETE /api/products/:id — Delete a product by _id

All endpoints return JSON and use proper HTTP status codes for success and errors.

## <a name="installation"></a>Installation & Run

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with:

```
MONGO_URI="your-mongodb-uri"
PORT=3000
```

3. Start the server:

```bash
npx nodemon server.js
```

Server runs at `http://localhost:3000` by default.

## <a name="testing"></a>Testing (Postman / curl)

Create product (curl):
```bash
curl -i -X POST http://localhost:3000/api/products \
   -H "Content-Type: application/json" \
   -d '{"name":"Test","description":"x","price":9.99,"category":"misc"}'
```

Get all products:
```bash
curl -i http://localhost:3000/api/products
```

Get single product:
```bash
curl -i http://localhost:3000/api/products/<product_id>
```

Update product:
```bash
curl -i -X PUT http://localhost:3000/api/products/<product_id> \
   -H "Content-Type: application/json" \
   -d '{"price":12.99}'
```

Delete product:
```bash
curl -i -X DELETE http://localhost:3000/api/products/<product_id>
```

Advanced read (querying):
```bash
curl -i "http://localhost:3000/api/products?category=misc&minPrice=5&maxPrice=20&sortBy=price_desc&page=1&limit=5"
```

## <a name="future"></a>Future Ideas

- Add user authentication and saved user data
- Improve validation and error messages
- Add tests for routes
- Add frontend to consume this API

## <a name="author"></a>Author

- **Clarence Franklin** — `cfra8189`

---

Notes:
- Make sure `.env` and `node_modules/` are listed in `.gitignore` before committing or pushing.

