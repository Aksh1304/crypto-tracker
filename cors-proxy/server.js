// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

app.get('/cryptos', async (req, res) => {
  try {
    const response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: '1',
        limit: '10',
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      },
    });

    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
