import express from 'express';
import dotenv from 'dotenv';
import { initdb } from './src/configs/initdb.js';``
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './src/routes/indexRoute.js';
import authRoute from './src/routes/authRoute.js';

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

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoute);           // root routes
app.use('/auth', authRoute);        // authentication routes (login, register)


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
