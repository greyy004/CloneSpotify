import User from '../models/userModel.js'; // Import User model

export const validateRegistration = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    // 1. Basic presence and format validation (re-check from client-side)
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields are required.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long.');
    }

    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        return res.status(400).send('Please enter a valid email address.');
    }

    // 2. Uniqueness checks against the database
    try {
        // Check if username already exists
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.status(409).send('Username already taken.');
        }

        // Check if email already exists
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(409).send('Email already registered.');
        }

        // If all checks pass, proceed to the next middleware/controller
        next();

    } catch (error) {
        console.error('Database validation error:', error);
        res.status(500).send('Server error during validation.');
    }
};
