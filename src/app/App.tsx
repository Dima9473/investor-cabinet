/*
 * import viteLogo from '/vite.svg';
 * import { useState } from 'react';
 */
import { BrowserRouter } from 'react-router';

import { Routes } from './routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
