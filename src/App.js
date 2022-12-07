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
import AddProjectPage from "./Components/AddProjectPage/AddProjectPage";
import JoinProjectCard from "./Components/JoinProjectCard/JoinProjectCard";



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
            <Route exact path="/joinProject=:token" element={<JoinProjectCard/>}/>
            <Route exact path="/project/:id" element={<ProjectView/>}/>
            <Route exact path="/new" element={<AddProjectPage/>}/>
      
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
