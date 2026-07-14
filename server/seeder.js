import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });
const sampleProducts = [
            {
                name: 'Minimalist Cotton T-Shirt',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
                description: 'Premium heavyweight cotton, relaxed fit.',
                price: 1499,
                category: 'Apparel',
                stock: 50
            },
            {
                name: 'Urban Cargo Pants',
                image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop', 
                description: 'Utility pockets, adjustable cuffs, water-resistant.',
                price: 2999,
                category: 'Bottoms',
                stock: 30
            }
        ];
const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const users = [
            { 
                name: 'Akshay', 
                email: 'admin@axara.com', 
                password: 'password123', 
                role: 'admin', 
                activeLocations: ['Nagpur', 'Pune'] 
            },
            { 
                name: 'Devi', 
                email: 'devi@axara.com', 
                password: 'password123', 
                role: 'user', 
                activeLocations: ['Mumbai', 'Gondiya'] 
            }
        ];

        const createdUsers = [];
        for (const user of users) {
            createdUsers.push(await User.create(user))
        }
        const adminUser = createdUsers[0]._id;

        const sampleProducts = [
            {
                name: 'Minimalist Cotton T-Shirt',
                description: 'Premium heavyweight cotton, relaxed fit.',
                price: 1499,
                category: 'Apparel',
                stock: 50
            },
            {
                name: 'Urban Cargo Pants',
                description: 'Utility pockets, adjustable cuffs, water-resistant.',
                price: 2999,
                category: 'Bottoms',
                stock: 30
            }
        ];

        await Product.insertMany(sampleProducts);

        console.log('Database Seeded Successfully.');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // Add logic later if you want a flag to destroy data
} else {
    importData();
}