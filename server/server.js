import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// System Health & Testing Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'active', application: 'Axara' });
});

app.get('/api/test', (req, res) => {
    res.status(200).json({ 
        users: ['Akshay', 'Devi'], 
        locations: ['Nagpur', 'Gondiya', 'Pune', 'Mumbai'] 
    });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server executing on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });