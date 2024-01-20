import {
  SxProps,
  Theme,
  Button,
  Typography,
  TypographyProps,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import logo from "../../assets/logo.svg";
import CustomizedButtons from "../MuiComponents/CustomizedButtons";

import { styled } from "@mui/material/styles";
interface Props {
  children: React.ReactElement;
}

interface HeaderProps {
  children?: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: "3em",
    },
    logo: {
      height: "7em",
    },
    tabContainer: {
      marginLeft: "auto",
    },
    button: {
      ...theme.typography.estimate,
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px",
      height: "45px",
      "&:hover": {
        backgroundColor: theme.palette.secondary,
      },
    },
    poster: {
      ...theme.typography.poster,
    },
  })
);

const TabStyles: SxProps<Theme> = (theme: Theme) => ({
  ...theme.typography.tab,
  minWidth: 10,
  marginLeft: "25px",
});
const ButtonStyles: SxProps<Theme> = (theme: Theme) => ({
  ...theme.typography.estimate,
  borderRadius: "50px",
  marginLeft: "50px",
  marginRight: "25px",
  height: "45px",
  "&:hover": {
    backgroundColor: theme.palette.secondary,
  },
});
const ColorButton = styled(Typography)<TypographyProps>(({ theme }) => ({
  ...theme.typography.poster,
}));
const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Tabs className={classes.tabContainer}>
              <Tab sx={TabStyles} label="Home" />
              <Tab sx={TabStyles} label="Services" />
              <Tab sx={TabStyles} label="The Revolution" />
              <Tab sx={TabStyles} label="About Us" />
              <Tab sx={TabStyles} label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" sx={ButtonStyles}>
              FREE ESTIMATE
            </Button>
            <CustomizedButtons />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
      <Typography className={classes.poster}>poster</Typography>
      <Typography
        sx={(theme: Theme) => ({
          ...theme.typography.poster,
        })}
      >
        poster
      </Typography>
      <Typography variant="poster">poster</Typography>
      <ColorButton>poster</ColorButton>
    </React.Fragment>
  );
};
export default Header;
