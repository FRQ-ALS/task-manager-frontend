import { createMuiTheme } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";

const theme = createMuiTheme({

palette : {
    primary: {
        main: "#2F3C7E"
        
    },
    secondary: {
        main: "#FBEAEB",
        contrastText: "#2F3C7E"
    },
    background: {
        default: "#d1e0e0"
      },

}


});

export default theme