
import axios from 'axios';

const fetchCryptos = async () => {
  try {
    const response = await axios.get('/cryptos'); // Fetch from your backend
    return response.data; // Return the cryptocurrencies data
  } catch (error) {
    throw new Error(error.message); // Throw an error if the fetch fails
  }
};

export default fetchCryptos;
