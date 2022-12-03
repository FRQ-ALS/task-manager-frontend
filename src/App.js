import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/system";
import theme from "./Components/Theme/Theme";
import { Button } from "@mui/material";
import AppBar from "./Components/AppBar/AppBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import EmailVerification from "./Components/EmailVerification/EmailVerification";
import ProjectView from "./Components/ProjectView/ProjectView";



function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar/>
          <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/verify/:token" element={<EmailVerification/>}/>
            <Route exact path="/project/:id" element={<ProjectView/>}/>

          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
