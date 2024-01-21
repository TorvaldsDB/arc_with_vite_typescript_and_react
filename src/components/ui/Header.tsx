import { SxProps, Theme, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import logo from "../../assets/logo.svg";

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
    backgroundColor: theme.palette.secondary.light,
  },
});

const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab sx={TabStyles} label="Home" />
              <Tab sx={TabStyles} label="Services" />
              <Tab sx={TabStyles} label="The Revolution" />
              <Tab sx={TabStyles} label="About Us" />
              <Tab sx={TabStyles} label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" sx={ButtonStyles}>
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};
export default Header;
