import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Calendar from './components/Calendar';
import Catalogs from './components/Catalogs';
import Header from './components/Header';
import MediaPlayer from './components/MediaPlayer';
import Tabs from './components/Tabs';
import { COLORS } from './utils/colors';

function App() {
  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: COLORS.gray,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
        <Header />
        <Tabs />
        <div className='main'>
          <div className='section--left'>
            <Calendar />
            <Catalogs />
          </div>
          <div className='section--right'>
            <MediaPlayer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
