import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8081;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/api/getKeys', (req, res) => {
   
  const apiKeys = {
    username: process.env.GEONAMES,
    weatherKey: process.env.WEATHERBIT_API_KEY,
    pixabayKey: process.env.PIXABAY_API_KEY
  };
  res.json(apiKeys);
});
// Serve the index.html file from the 'dist' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
