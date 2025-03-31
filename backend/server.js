// Load environment variables from .env file
require('dotenv').config(); // <-- Added dotenv configuration

const express = require('express');
const cors = require('cors');
// Uncomment the following line if using Node.js version <18 and install node-fetch
// const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Use environment variables from your .env file
const API_URL = process.env.REACT_APP_API_URL; // <-- Using provided REACT_APP_API_URL

app.use(cors());
app.use(express.json());

app.get('/api/rates/:baseCurrency', async (req, res) => {
  const baseCurrency = req.params.baseCurrency;
  try {
    // Fetch exchange rates from the external API using the provided API URL and base currency
    const response = await fetch(`${API_URL}${baseCurrency}`); // <-- Fetch from API_URL appended with baseCurrency
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch exchange rates' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'Server error fetching exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
