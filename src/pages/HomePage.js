// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CryptoList from '../components/CryptoList';
import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import fetchCryptos from '../api/coinMarketCap';

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCryptos = async () => {
    setLoading(true);
    try {
      const data = await fetchCryptos();
      setCryptos(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching cryptocurrencies: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCryptos();
  }, []);

  if (loading) {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Header />
      <CryptoList cryptos={cryptos} />
    </Box>
  );
};

export default HomePage;
