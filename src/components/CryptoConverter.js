// src/components/CryptoConverter.js
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import fetchCryptos from '../api/coinMarketCap';

const CryptoConverter = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data);
        setFromCrypto(data[0]?.id || '');
        setToCrypto(data[1]?.id || '');
      } catch (error) {
        console.error('Failed to load cryptocurrencies', error);
        setError('Failed to load cryptocurrencies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadCryptos();
  }, []);

  const handleConvert = () => {
    // Input validation
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      setConvertedAmount(null);
      return;
    }

    const from = cryptos.find((c) => c.id === fromCrypto);
    const to = cryptos.find((c) => c.id === toCrypto);
    if (from && to) {
      const usdAmount = amount * from.quote?.USD?.price;
      const result = usdAmount / to.quote?.USD?.price;
      setConvertedAmount(result);
      setError('');
    } else {
      setError('Invalid cryptocurrency selection.');
      setConvertedAmount(null);
    }
  };

  const handleSwap = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
    setConvertedAmount(null);
    setError('');
  };

  if (loading)
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '80vh',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: '1rem', sm: '2rem' }, // Adjust padding for smaller screens
          borderRadius: '15px',
          maxWidth: '500px',
          width: '100%',
          backgroundColor: '#ffffff',
        }}
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Crypto Converter
        </Typography>

        <Grid container spacing={2} alignItems="center">
          {/* From Cryptocurrency */}
          <Grid item xs={12} sm={5}>
            <TextField
              select
              label="From"
              value={fromCrypto}
              onChange={(e) => setFromCrypto(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {cryptos.map((crypto) => (
                <MenuItem key={crypto.id} value={crypto.id}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={crypto.logo_url} // Ensure `logo_url` exists in your data
                      alt={crypto.name}
                      sx={{ width: 24, height: 24, marginRight: '0.5rem' }}
                    />
                    {crypto.name}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          
          <Grid item xs={12} sm={2} textAlign="center">
            <IconButton onClick={handleSwap} color="primary" sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
              <SwapHorizIcon />
            </IconButton>
          </Grid>

         
          <Grid item xs={12} sm={5}>
            <TextField
              select
              label="To"
              value={toCrypto}
              onChange={(e) => setToCrypto(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {cryptos.map((crypto) => (
                <MenuItem key={crypto.id} value={crypto.id}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={crypto.logo_url} // Ensure `logo_url` exists in your data
                      alt={crypto.name}
                      sx={{ width: 24, height: 24, marginRight: '0.5rem' }}
                    />
                    {crypto.name}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        
        <Box mt={3}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{ min: '0', step: 'any' }}
            error={!!error}
            helperText={error}
          />
        </Box>

       
        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvert}
            disabled={loading}
            sx={{
              paddingX: '2rem',
              paddingY: '0.75rem',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0px 4px 15px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0px 6px 20px rgba(102, 126, 234, 0.6)',
              },
            }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Convert'}
          </Button>
        </Box>

        {/* Conversion Result */}
        {convertedAmount !== null && !loading && (
          <Box
            mt={4}
            p={2}
            borderRadius="10px"
            sx={{
              background: '#f0f4f8',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
            }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {amount} {cryptos.find((c) => c.id === fromCrypto)?.symbol} ={' '}
              {convertedAmount.toFixed(6)} {cryptos.find((c) => c.id === toCrypto)?.symbol}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CryptoConverter;
