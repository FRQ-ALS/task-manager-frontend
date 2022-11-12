import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/system';
import theme from './Components/Theme/Theme';
import { Button } from '@mui/material';
import AppBar from './Components/AppBar/AppBar';

function App() {
  return (
    <ThemeProvider theme={theme}>

      <AppBar></AppBar>
    </ThemeProvider>
  );
}

export default App;
