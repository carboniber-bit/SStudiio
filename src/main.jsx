import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/roboto';
import '@fontsource-variable/roboto-condensed';
import '@fontsource-variable/roboto-serif';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
