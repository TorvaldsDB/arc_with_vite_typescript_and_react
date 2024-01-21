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
      height: "8em",
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

const logoButtonStyles: SxProps<Theme> = () => ({
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const pathValueMap: PathValueMap = {
  "/": 0,
  "/services": 1,
  "/revolution": 2,
  "/about": 3,
  "/contact": 4,
};

function a11yProps(index: number) {
  return {
    id: `header-tab-${index}`,
    "aria-controls": `header-tabpanel-${index}`,
  };
}

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
            <Button sx={logoButtonStyles} component={Link} to="/" disableRipple>
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              textColor="inherit"
              indicatorColor="primary"
              aria-label="arc development header tabs"
            >
              <Tab
                sx={TabStyles}
                label="Home"
                component={Link}
                to="/"
                {...a11yProps(0)}
              />
              <Tab
                sx={TabStyles}
                label="Services"
                component={Link}
                to="/services"
                {...a11yProps(1)}
              />
              <Tab
                sx={TabStyles}
                label="The Revolution"
                component={Link}
                to="/revolution"
                {...a11yProps(2)}
              />
              <Tab
                sx={TabStyles}
                label="About Us"
                component={Link}
                to="/about"
                {...a11yProps(3)}
              />
              <Tab
                sx={TabStyles}
                label="Contact Us"
                component={Link}
                to="/contact"
                {...a11yProps(4)}
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
