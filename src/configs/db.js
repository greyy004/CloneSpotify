import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const testConnection = async () => {
    try {
        await pool.query('SELECT 1'); // Simple query to test connection
        console.log('Database connection successful!');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        return false;
    }
};

export default pool;
