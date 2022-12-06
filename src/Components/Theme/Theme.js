import { createMuiTheme } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";

const theme = createMuiTheme({

palette : {
    primary: {
        main: "rgb(9, 19, 121)",
        mainGradient: "linear-gradient(63deg,rgba(9, 19, 121, 1) 0%,rgba(6, 27, 163, 1) 21%,rgba(0, 44, 255, 1) 100%)"
        
    },
    secondary: {
        main: "#FBEAEB",
        contrastText: "#2F3C7E"
    },
    background: {
        default: "#2c2e33"
        
      },

}


});

export default theme