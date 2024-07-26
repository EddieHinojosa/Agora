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
                firstName: 'Emily',
                lastName: 'Clark',
                email: 'emily.clark@example.com',
                username: 'emilyc',
                password: await bcrypt.hash('mypassword123', 12),
                billingAddress: {
                    street: '321 Elm St',
                    city: 'Lakeview',
                    state: 'CA',
                    zip: '90210',
                    country: 'USA'
                },
                mailingAddress: {
                    street: '321 Elm St',
                    city: 'Lakeview',
                    state: 'CA',
                    zip: '90210',
                    country: 'USA'
                },
                shopName: 'Emily\'s Emporium',
                isGmail: false
            },
            {
                firstName: 'Michael',
                lastName: 'Brown',
                email: 'michael.brown@example.com',
                username: 'michaelb',
                password: await bcrypt.hash('securePassword456', 12),
                billingAddress: {
                    street: '987 Maple Ave',
                    city: 'Hometown',
                    state: 'NY',
                    zip: '10001',
                    country: 'USA'
                },
                mailingAddress: {
                    street: '987 Maple Ave',
                    city: 'Hometown',
                    state: 'NY',
                    zip: '10001',
                    country: 'USA'
                },
                shopName: 'Michael\'s Market',
                isGmail: true
            },
            {
                firstName: 'Sophia',
                lastName: 'Davis',
                email: 'sophia.davis@example.com',
                username: 'sophiad',
                password: await bcrypt.hash('password789!', 12),
                billingAddress: {
                    street: '456 Birch Rd',
                    city: 'Greenville',
                    state: 'WA',
                    zip: '98101',
                    country: 'USA'
                },
                mailingAddress: {
                    street: '456 Birch Rd',
                    city: 'Greenville',
                    state: 'WA',
                    zip: '98101',
                    country: 'USA'
                },
                shopName: 'Sophia\'s Crafts',
                isGmail: true
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

