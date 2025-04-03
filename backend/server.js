// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const cors = require('cors');
// const axios = require('axios'); // Use axios for API requests

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Load API credentials from .env
// const API_KEY = process.env.API_KEY; // Renamed for better clarity
// const API_URL = process.env.API_URL; 

// app.use(cors());
// app.use(express.json());

// app.get('/api/rates/:baseCurrency', async (req, res) => {
//   const baseCurrency = req.params.baseCurrency;
//   try {
//     // Make the API request with the correct URL format
//     const response = await axios.get(`${API_URL}${baseCurrency}?apikey=${API_KEY}`);
    
//     res.json(response.data); // Send response back to frontend
//   } catch (error) {
//     console.error('Error fetching exchange rates:', error);
//     res.status(500).json({ error: 'Server error fetching exchange rates' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });





// Using  fetch()  instead of  axios
require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Use node-fetch to make requests

const app = express();
const PORT = process.env.PORT || 5000;

// Access environment variables
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.use(cors());
app.use(express.json());

app.get('/api/rates/:baseCurrency', async (req, res) => {
  const baseCurrency = req.params.baseCurrency;
  try {
    // Use the API URL with the base currency appended, and add the API key as a query parameter
    const response = await fetch(`${API_URL.replace('USD', baseCurrency)}?apiKey=${API_KEY}`); // Add the API key here
    
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

