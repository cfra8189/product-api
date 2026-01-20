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

router.get('/api/products', async (req, res) => {
	try {
		// extract query params
		const { category, minPrice, maxPrice, sortBy, page = '1', limit = '10' } = req.query;

		// build filter object based on provided params
		const filter = {};
		if (category) filter.category = category;

		if (minPrice !== undefined || maxPrice !== undefined) {
			filter.price = {};
			const min = Number(minPrice);
			const max = Number(maxPrice);
			if (!Number.isNaN(min)) filter.price.$gte = min;
			if (!Number.isNaN(max)) filter.price.$lte = max;
			// if price ended up empty, delete it
			if (Object.keys(filter.price).length === 0) delete filter.price;
		}

		// determine sort
		let sort = {};
		if (sortBy === 'price_asc') sort = { price: 1 };
		else if (sortBy === 'price_desc') sort = { price: -1 };

		// pagination
		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const lim = Math.max(1, parseInt(limit, 10) || 10);
		const skip = (pageNum - 1) * lim;

		const products = await Product.find(filter).sort(sort).skip(skip).limit(lim);
		return res.json(products);
	} catch (err) {
		console.error('GET /api/products error', err);
		return res.status(500).json({ error: 'Server error' });
	}
});


