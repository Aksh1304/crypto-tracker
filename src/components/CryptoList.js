// src/components/CryptoList.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const CryptoList = ({ cryptos }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{ p: 3 }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Cryptocurrency Prices
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#64ffda' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#64ffda' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#64ffda' }}>Symbol</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#64ffda' }} align="right">
                Price (USD)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#64ffda' }} align="right">
                Market Cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos.map((crypto, index) => (
              <TableRow
                key={crypto.id}
                hover
                component={motion.tr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{crypto.name}</TableCell>
                <TableCell>{crypto.symbol}</TableCell>
                <TableCell align="right">
                  ${crypto.quote?.USD?.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell align="right">
                  ${crypto.quote?.USD?.market_cap?.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CryptoList;
