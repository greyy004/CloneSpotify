import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './src/routes/indexRoute.js';
import authRoute from './src/routes/authRoute.js'; // Import authRoute

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000; // Changed to PORT for consistency

// Middleware to parse URL-encoded bodies (for HTML form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies (if you'll have API endpoints)
app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for consistency

// Use the indexRoute for the root path
app.use('/', indexRoute);
// Integrate the authRoute for authentication-related paths
app.use(authRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
