import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './src/routes/indexRoute.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from public
app.use(express.static(path.resolve(__dirname, 'public')));

// All routes go through indexRoutes
app.use('/', indexRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
