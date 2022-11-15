import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/system";
import theme from "./Components/Theme/Theme";
import { Button } from "@mui/material";
import AppBar from "./Components/AppBar/AppBar";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar/>
          <Routes>
            <Route path="/login" element={<SignUp/>}/>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
