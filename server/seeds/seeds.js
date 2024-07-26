import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const uri = process.env.MONGO_URI;

const seedData = async () => {
    try {
        await mongoose.connect(uri);

        console.log('Atlas connected');

        const users = [
            {
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice.johnson@example.com',
                username: 'alicej',
                password: await bcrypt.hash('securePass123', 12),
                billingAddress: {
                    street: '789 Oak St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62704',
                    country: 'USA'
                },
                mailingAddress: {
                    street: '789 Oak St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62704',
                    country: 'USA'
                },
                shopName: 'Alice\'s Art',
                isGmail: true
            },
            {
                firstName: 'Bob',
                lastName: 'Williams',
                email: 'bob.williams@example.com',
                username: 'bobbyw',
                password: await bcrypt.hash('password321', 12),
                billingAddress: {
                    street: '654 Pine St',
                    city: 'Metropolis',
                    state: 'TX',
                    zip: '75001',
                    country: 'USA'
                },
                mailingAddress: {
                    street: '654 Pine St',
                    city: 'Metropolis',
                    state: 'TX',
                    zip: '75001',
                    country: 'USA'
                },
                shopName: 'Bob\'s Books',
                isGmail: false
            }
        ];

        await User.insertMany(users);
        console.log('Seed data added');
        mongoose.connection.close();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();

