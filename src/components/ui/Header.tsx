import { Button, Menu, MenuItem, SxProps, Theme, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  FC,
  Fragment,
  ReactElement,
  SyntheticEvent,
  cloneElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
interface Props {
  children: ReactElement;
}

interface HeaderProps {
  children?: ReactElement;
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

const LogoImage = styled("img")`
  height: 8em;
`;

const Placeholder = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3em",
}));

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

function a11yProps(index: number) {
  return {
    id: `header-tab-${index}`,
    "aria-controls": `header-tabpanel-${index}`,
  };
}

const Header: FC<HeaderProps> = () => {
  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    handleClose();
    setValue(1);
  };

  interface RouteType {
    name: string;
    link: string;
    activeIndex: number;
    ariaOwns?: boolean;
    ariaPopup?: boolean;
    selectedIndex?: number | undefined;
    mouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
  }
  const routes: RouteType[] = useMemo(
    () => [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Services",
        link: "/services",
        activeIndex: 1,
        ariaOwns: true,
        ariaPopup: true,
        mouseOver: handleClick,
      },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About Us", link: "/about", activeIndex: 3 },
      { name: "Contact Us", link: "/contact", activeIndex: 4 },
    ],
    []
  );

  const menuOptions: RouteType[] = useMemo(
    () => [
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "iOS/Android App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: "Website Development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
      },
    ],
    []
  );

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/estimate":
          setValue(5);
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button sx={logoButtonStyles} component={Link} to="/" disableRipple>
              <LogoImage alt="company logo" src={logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                marginLeft: "auto",
              }}
              textColor="inherit"
              indicatorColor="primary"
              aria-label="arc development header tabs"
            >
              {routes.map((route, index) => {
                const ariaProps: {
                  ariaOwns?: string | undefined;
                  ariaPopup?: string | undefined;
                } = {};
                if (route.ariaOwns) {
                  ariaProps.ariaOwns = anchorEl ? "simple-menu" : undefined;
                }
                if (route.ariaPopup) {
                  ariaProps.ariaPopup = anchorEl ? "true" : undefined;
                }
                return (
                  <Tab
                    key={`${route}${index}`}
                    component={Link}
                    to={route.link}
                    label={route.name}
                    sx={TabStyles}
                    onMouseOver={route.mouseOver}
                    {...a11yProps(index)}
                    {...ariaProps}
                  />
                );
              })}
            </Tabs>
            <Button variant="contained" color="secondary" sx={ButtonStyles}>
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: (theme) => theme.palette.common.blue,
                  color: "white",
                  borderRadius: "0px",
                },
              }}
              MenuListProps={{ onMouseLeave: handleClose }} // mouse leave menu event
              elevation={0}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                  key={`${option}${i}`}
                  component={Link}
                  to={option.link}
                  sx={(theme) => ({
                    "&.MuiMenuItem-root": {
                      ...theme.typography.tab,
                      opacity: 0.7,
                      "&:hover": {
                        opacity: 1,
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  })}
                  onClick={handleMenuItemClick.bind(this, i)}
                  selected={i === selectedIndex && value === 1}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Placeholder />
    </Fragment>
  );
};
export default Header;
