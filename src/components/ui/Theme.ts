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

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tab: React.CSSProperties;
    estimate: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tab?: React.CSSProperties;
    estimate?: React.CSSProperties;
  }
  interface BreakpointOverrides {
    xs: true; // add the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tab: true;
    estimate: true;
  }
}

const Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
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
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
      padding: "6px 12px", // 另外添加的
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
  },
});

export default Theme;
