import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js'; // Import User model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'login.html'));
};

export const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // In a real app, you'd establish a session or send a JWT here
        res.send('Login successful! Welcome, ' + user.username);

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error during login.');
    }
};

export const getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'register.html'));
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body; // Data is already validated by middleware

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const newUser = await User.create(username, email, hashedPassword);

        console.log('User registered with ID:', newUser.id);
        res.redirect('/login?registered=true'); // Redirect to login page with success

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
    }
};
