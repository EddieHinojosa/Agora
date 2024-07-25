import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
    const client = new MongoClient(uri, {
        tls: true,
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    } finally {
        await client.close();
    }
}

testConnection();



