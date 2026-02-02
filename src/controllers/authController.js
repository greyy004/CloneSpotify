import bcrypt from 'bcrypt';
import User from '../models/userModel.js'; // Import User model

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(401).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).send('Invalid password credentials');
        }

        if (user.isadmin) {
            // Do admin stuff
            res.redirect('/admin/dashboard');
        }
        else
        {
            res.redirect('/user/dashboard');
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error during login.');
    }
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
