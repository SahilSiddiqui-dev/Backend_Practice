const express = require('express'); 
const app = express();

app.use(express.json());

let products = [
    {
        id: 1,
        name: "Wireless Headphones",
        totalRatings: 0,
        ratingSum: 0,
        averageRating: 0
    },
    {
        id: 2,
        name: "Smart Watch",
        totalRatings: 0,
        ratingSum: 0,
        averageRating: 0
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        totalRatings: 0,
        ratingSum: 0,
        averageRating: 0
    }
];

// Task 1: GET /api/products
app.get('/api/products', (req, res) => {
    return res.status(200).json({
        message: "Products retrieved successfully",
        products: products
    });
});

// Task 2: POST /api/rate
app.post('/api/rate', (req, res) => {
    const { productId, rating } = req.body;

    // 1. Missing fields check
    if (productId === undefined || rating === undefined || productId === null || rating === null) {
        return res.status(400).json({ message: "productId and rating are required" });
    }

    // 2. Rating range check (1 to 5)
    const numRating = Number(rating);
    if (typeof rating !== 'number' || isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // 3. Product existence check
    const product = products.find(p => p.id === Number(productId));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // 4. Update rating statistics
    product.totalRatings += 1;
    product.ratingSum += numRating;
    product.averageRating = Number((product.ratingSum / product.totalRatings).toFixed(2));

    return res.status(200).json({
        message: "Rating submitted successfully",
        product: product
    });
});

// Task 3: GET /api/ratings
app.get('/api/ratings', (req, res) => {
    const ratingsSummary = products.map(p => ({
        name: p.name,
        totalRatings: p.totalRatings,
        averageRating: p.averageRating
    }));

    return res.status(200).json({
        message: "Product ratings retrieved successfully",
        ratings: ratingsSummary
    });
});

// Specification requires Port 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});