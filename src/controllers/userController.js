import path from 'path';
import { fileURLToPath } from 'url';
import * as Music from '../models/musicModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'userDashboard.html'));
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

export const getMusicById = async (req, res) => {
    try {
        const music = await Music.getMusicById(req.params.id);
        if (!music) return res.status(404).json({ error: 'Music not found' });
        res.json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch music' });
    }
};

export const searchMusic = async (req, res) => {
    try {
        const query = req.query.q || '';
        const music = await Music.searchMusic(query);
        res.json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to search music' });
    }
};

export const likeMusic = async (req, res) => {
    try {
        const music = await Music.incrementLikes(req.params.id);
        if (!music) return res.status(404).json({ error: 'Music not found' });
        res.json(music);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to like music' });
    }
};
