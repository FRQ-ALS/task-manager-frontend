import { createMuiTheme } from "@mui/material";
import { deepPurple, amber } from "@mui/material/colors";

const theme = createMuiTheme({

palette : {
    primary: {
        main: deepPurple[500]
    },
    secondary: {
        main: amber[500],
        contrastText: deepPurple[900]
    }
}
});

export default theme;