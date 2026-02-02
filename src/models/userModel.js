import pool from '../configs/db.js';

export const createUserTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            isAdmin BOOLEAN DEFAULT FALSE,
            password_hash VARCHAR(255) NOT NULL
        )
    `);
};

class User {
    static async findByUsername(username) {
        const result = await pool.query(
            'SELECT id, email, isAdmin, password_hash FROM users WHERE username = $1', 
            [username]
        );
        return result.rows[0];
    }
    
    static async findByEmail(email) {
        const result = await pool.query(
            'SELECT id, username, isAdmin, password_hash FROM users WHERE email = $1', 
            [email]
        );
        return result.rows[0];
    }

    static async create(username, email, passwordHash) {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, passwordHash]
        );
        return result.rows[0];
    }
}

export default User;
