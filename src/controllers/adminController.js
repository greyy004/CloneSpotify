import path from 'path';
import { fileURLToPath } from 'url';
import * as Music from '../models/musicModel.js';
import User from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAdminPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'adminDashboard.html'));
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getAllMusic = async (req, res) => {
    try {
        const music = await Music.getAllMusic();
        res.json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch music' });
    }
};

export const addMusic = async (req, res) => {
    try {
        const music = await Music.createMusic(req.body);
        res.status(201).json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add music' });
    }
};

export const updateMusic = async (req, res) => {
    try {
        const music = await Music.updateMusic(req.params.id, req.body);
        if (!music) return res.status(404).json({ error: 'Music not found' });
        res.json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update music' });
    }
};

export const deleteMusic = async (req, res) => {
    try {
        const music = await Music.deleteMusic(req.params.id);
        if (!music) return res.status(404).json({ error: 'Music not found' });
        res.json({ message: 'Music deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete music' });
    }
};
