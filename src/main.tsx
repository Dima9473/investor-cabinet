import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppWrapper from './app/AppWrapper.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
