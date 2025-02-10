import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MediaPlayerContextProvider } from './contexts/mediaPlayerContext.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MediaPlayerContextProvider>
        <App />
      </MediaPlayerContextProvider>
    </LocalizationProvider>
  </StrictMode>
);
