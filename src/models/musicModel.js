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

export const getAllMusic = async () => {
    const result = await pool.query('SELECT * FROM music ORDER BY created_at DESC');
    return result.rows;
};

export const getMusicById = async (id) => {
    const result = await pool.query('SELECT * FROM music WHERE id = $1', [id]);
    return result.rows[0];
};

export const searchMusic = async (query) => {
    const result = await pool.query(
        `SELECT * FROM music 
         WHERE LOWER(title) LIKE LOWER($1) OR LOWER(artist) LIKE LOWER($1) OR LOWER(genre) LIKE LOWER($1) 
         ORDER BY created_at DESC`,
        [`%${query}%`]
    );
    return result.rows;
};

export const createMusic = async (data) => {
    const { title, artist, album, genre, release_date, duration, url, cover_image } = data;
    const result = await pool.query(
        `INSERT INTO music (title, artist, album, genre, release_date, duration, url, cover_image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [title, artist, album || null, genre || null, release_date || null, duration || null, url, cover_image || null]
    );
    return result.rows[0];
};

export const updateMusic = async (id, data) => {
    const { title, artist, album, genre, release_date, duration, url, cover_image } = data;
    const result = await pool.query(
        `UPDATE music SET 
            title = COALESCE($2, title),
            artist = COALESCE($3, artist),
            album = COALESCE($4, album),
            genre = COALESCE($5, genre),
            release_date = COALESCE($6, release_date),
            duration = COALESCE($7, duration),
            url = COALESCE($8, url),
            cover_image = COALESCE($9, cover_image)
         WHERE id = $1 RETURNING *`,
        [id, title, artist, album, genre, release_date, duration, url, cover_image]
    );
    return result.rows[0];
};

export const deleteMusic = async (id) => {
    const result = await pool.query('DELETE FROM music WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

export const incrementLikes = async (id) => {
    const result = await pool.query(
        'UPDATE music SET likes = likes + 1 WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
