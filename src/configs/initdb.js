import { createUserTable } from '../models/userModel.js'
import { createMusicTable } from '../models/musicModel.js'

export const initdb = async ()=>{
    try {
        await createUserTable();
        await createMusicTable();
        console.log('Tables created successfully.');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}