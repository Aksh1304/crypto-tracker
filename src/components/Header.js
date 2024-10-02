// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';


const MotionButton = motion(Button);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        width: 250,
      }}
    >
      <MotionButton component={Link} to="/" sx={{ mb: 1 }}>
        Home
      </MotionButton>
      <MotionButton component={Link} to="/converter" sx={{ mb: 1 }}>
        Converter
      </MotionButton>
      
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #007991 0%, #78ffd6 100%)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '0 0 20px 20px',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem' }}>
          {/* Logo and Title */}
          <Link to="/" style={{ textDecoration: 'none' }}> {/* Added Link here */}
            <Typography
              variant="h4"
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                fontWeight: 'bold',
                letterSpacing: '1.5px',
                color: '#ffffff',
                textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
            >
              Crypto Tracker
            </Typography>
          </Link>

          {/* Hamburger Menu for Mobile View */}
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, color: '#ffffff' }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Links for Desktop View */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MotionButton
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginRight: '1rem',
                padding: '0.5rem 1rem',
              }}
              whileHover={{ scale: 1.1, color: '#ffeb3b' }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </MotionButton>
            <MotionButton
              color="inherit"
              component={Link}
              to="/converter"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
              whileHover={{ scale: 1.1, color: '#ffeb3b' }}
              whileTap={{ scale: 0.95 }}
            >
              Converter
            </MotionButton>
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {navItems}
      </Drawer>
    </>
  );
};

export default Header;
