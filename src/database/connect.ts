import { Client } from 'pg';

export const connect = async () => {
    const client = new Client({
        user: 'your_username',
        host: 'localhost',
        database: 'your_database',
        password: 'your_password',
        port: 5432, // Default PostgreSQL port
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
        return client;
    } catch (error) {
        console.error('Failed to connect to PostgreSQL database:', error);
        throw error;
    }
};
