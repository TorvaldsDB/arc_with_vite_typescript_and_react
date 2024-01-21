import { Button, SxProps, Theme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { createStyles, makeStyles } from "@mui/styles";
import {
  FC,
  Fragment,
  ReactElement,
  SyntheticEvent,
  cloneElement,
  useEffect,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
interface Props {
  children: ReactElement;
}

interface HeaderProps {
  children?: ReactElement;
}

interface PathValueMap {
  [key: string]: number;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
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

const pathValueMap: PathValueMap = {
  "/": 0,
  "/services": 1,
  "/revolution": 2,
  "/about": 3,
  "/contact": 4,
};

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    // Get the corresponding value based on the current pathname
    const newValue = pathValueMap[pathname];

    // Update the value only if it's different
    if (newValue !== undefined && newValue !== value) {
      setValue(newValue);
    }
  }, [pathname, value]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              textColor="inherit"
              indicatorColor="primary"
            >
              <Tab sx={TabStyles} label="Home" component={Link} to="/" />
              <Tab
                sx={TabStyles}
                label="Services"
                component={Link}
                to="/services"
              />
              <Tab
                sx={TabStyles}
                label="The Revolution"
                component={Link}
                to="/revolution"
              />
              <Tab
                sx={TabStyles}
                label="About Us"
                component={Link}
                to="/about"
              />
              <Tab
                sx={TabStyles}
                label="Contact Us"
                component={Link}
                to="/contact"
              />
            </Tabs>
            <Button variant="contained" color="secondary" sx={ButtonStyles}>
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};
export default Header;
