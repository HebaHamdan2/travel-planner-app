import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "../../dist")));

// Define routes
app.get("/api/getKeys", (req, res) => {
  const apiKeys = {
    username: process.env.GEONAMES,
    weatherKey: process.env.WEATHERBIT_API_KEY,
    pixabayKey: process.env.PIXABAY_API_KEY,
  };
  res.json(apiKeys);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../../dist", "index.html"));
});

describe('Express Server', () => {
  let server;

  beforeAll(() => {
    server = app.listen(port);
  });

  afterAll(() => {
    server.close();
  });

  test('GET /api/getKeys should return API keys', async () => {
    const response = await request(server).get('/api/getKeys');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('weatherKey');
    expect(response.body).toHaveProperty('pixabayKey');
  });
});
