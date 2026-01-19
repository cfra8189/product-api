const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
require('./db/connection');

app.use(express.json());
app.use(require('./routes/productRoutes'));

app.get('/', (req, res) => {
	res.send('Hello, World!');
});


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});