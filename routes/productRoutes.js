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

router.get('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) return res.status(404).json({ error: 'Product not found' });
		return res.json(product);
	} catch (err) {
		if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid product id' });
		console.error('GET /api/products/:id error', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

router.put('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const product = await Product.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!product) return res.status(404).json({ error: 'Product not found' });
		return res.json(product);
	} catch (err) {
		if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid product id' });
		if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
		console.error('PUT /api/products/:id error', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

router.delete('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) return res.status(404).json({ error: 'Product not found' });
		return res.json({ message: 'Product deleted' });
	} catch (err) {
		if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid product id' });
		console.error('DELETE /api/products/:id error', err);
		return res.status(500).json({ error: 'Server error' });
	}
});


