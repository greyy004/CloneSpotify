import { createUserTable } from '../models/userModel.js';
import { createMusicTable } from '../models/musicModel.js';
import { testConnection } from './db.js'; // Import testConnection

export const initdb = async () => {
    try {
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('Skipping table creation due to database connection failure.');
            return; // Stop if connection failed
        }

        await createUserTable();
        await createMusicTable();
        console.log('Tables created successfully.');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};
