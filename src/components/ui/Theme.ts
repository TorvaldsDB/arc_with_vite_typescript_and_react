import { createTheme } from "@mui/material/styles";
import "@mui/material/styles/createPalette";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    blue: string;
    orange: string;
  }
}

const Theme = createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
});

export default Theme;
