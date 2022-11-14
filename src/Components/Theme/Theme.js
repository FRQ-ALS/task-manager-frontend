import { createMuiTheme } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";

const theme = createMuiTheme({

palette : {
    primary: {
        main: deepPurple[600]
        
    },
    secondary: {
        main: amber[900],
        contrastText: deepPurple[900]
    },
    background: {
        default: "#222222"
      },

}


});

export default theme