import pool from '../configs/db.js';

export const createMusicTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS music (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            album VARCHAR(255),
            genre VARCHAR(100),
            release_date DATE,
            duration INTEGER,
            url TEXT NOT NULL,
            cover_image TEXT,
            likes INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
};
