import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'Atelier Backend Live', version: '1.0.0' });
});

// Future: Handle orders, inventory, and appointments via real DB
app.get('/api/orders', (req, res) => {
  const ordersPath = path.join(__dirname, 'data', 'orders.json');
  if (fs.existsSync(ordersPath)) {
    const data = fs.readFileSync(ordersPath);
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Etashaa Backend running on port ${PORT}`);
});
