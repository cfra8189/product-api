const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/api/products', async (req, res) => {
	try {
		const { name, description, price, category, inStock = true, tags } = req.body;

		if (!name || !description || !category || price === undefined) {
			return res.status(400).json({ error: 'name, description, price and category are required' });
		}

		if (typeof price !== 'number' || price <= 0) {
			return res.status(400).json({ error: 'price must be a number greater than 0' });
		}

		const product = await Product.create({ name, description, price, category, inStock, tags });
		return res.status(201).json(product);
	} catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}
		console.error('POST /api/products error', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;


