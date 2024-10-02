import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/converter" element={<ConverterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
