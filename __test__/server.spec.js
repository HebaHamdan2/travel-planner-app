import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/getKeys", (req, res) => {
  const apiKeys = {
    username: process.env.GEONAMES,
    weatherKey: process.env.WEATHERBIT_API_KEY,
    pixabayKey: process.env.PIXABAY_API_KEY,
  };
  res.json(apiKeys);
});


const server = app.listen(port);

describe('Express Server', () => {
  afterAll(() => {
    server.close();
  });

  test('GET /api/getKeys should return API keys', async () => {
    const response = await request(app).get('/api/getKeys');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('weatherKey');
    expect(response.body).toHaveProperty('pixabayKey');
  });


});