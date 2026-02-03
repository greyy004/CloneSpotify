import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { initdb } from './src/configs/initdb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './src/routes/indexRoute.js';
import authRoute from './src/routes/authRoute.js';
import adminRoute from './src/routes/adminRoute.js';
import userRoute from './src/routes/userRoute.js';
import { jwtAuthMiddleware } from './src/middlewares/authMiddleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

await initdb();
// Middleware to parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoute);           
app.use('/auth', authRoute);  
app.use('/admin', jwtAuthMiddleware, adminRoute);
app.use('/user', jwtAuthMiddleware, userRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
