import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  SxProps,
  Theme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
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

const LogoImage = styled("img")(({ theme }) => ({
  height: "8em",
  [theme.breakpoints.down("lg")]: {
    height: "7em",
  },
  [theme.breakpoints.down("sm")]: {
    height: "5.5em",
  },
}));

const Placeholder = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: "3em",
  [theme.breakpoints.down("lg")]: {
    marginBottom: "2em",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.25em",
  },
}));

const TabStyles: SxProps<Theme> = (theme: Theme) => ({
  ...theme.typography.tab,
  minWidth: 10,
  marginLeft: "25px",
  padding: "6px 12px", // 另外添加的
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

const ListItemStyles: SxProps<Theme> = (theme: Theme) => ({
  ...theme.typography.tab,
  color: "white",
  opacity: 0.7,
});
const ListItemSelectedStyles: SxProps<Theme> = (theme: Theme) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.dark,
    "& .MuiListItemText-root": {
      opacity: 1,
    },
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
  const theme = useTheme();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
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
    ariaHaspopup?: boolean;
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
        ariaHaspopup: true,
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

  const tabs = (
    <Fragment>
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
            "aria-owns"?: string | undefined;
            "aria-haspopup"?: "true" | undefined;
          } = {};
          if (route.ariaOwns) {
            ariaProps["aria-owns"] = anchorEl ? "simple-menu" : undefined;
          }
          if (route.ariaHaspopup) {
            ariaProps["aria-haspopup"] = anchorEl ? "true" : undefined;
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
        open={openMenu}
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
            backgroundColor: "common.blue",
            color: "white",
            borderRadius: "0px",
          },
          zIndex: theme.zIndex.modal + 2,
        }}
        MenuListProps={{ onMouseLeave: handleClose }} // mouse leave menu event
        elevation={0}
        // style={{ zIndex: theme.zIndex.modal + 2 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}_${i}`}
            component={Link}
            to={option.link}
            sx={(theme) => ({
              "&.MuiMenuItem-root": {
                ...theme.typography.tab,
                padding: "6px 12px", // 另外添加的
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                },
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
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
    </Fragment>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "common.blue",
            color: "white",
          },
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
      >
        <Placeholder />
        <List sx={{ py: 0 }}>
          {routes.map((route, index) => (
            <ListItem disablePadding key={`${route}${index}`}>
              <ListItemButton
                sx={ListItemSelectedStyles}
                selected={value === route.activeIndex}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
                divider
                component={Link}
                to={route.link}
              >
                <ListItemText sx={ListItemStyles} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                ...ListItemSelectedStyles,
                backgroundColor: "common.orange",
              }}
              selected={value === 5}
              onClick={() => {
                setOpenDrawer(false);
                setValue(5);
              }}
              divider
              component={Link}
              to="/estimate"
            >
              <ListItemText sx={ListItemStyles} disableTypography>
                Free Estimate
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        sx={{
          ml: "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={{ height: "50px", width: "50px" }} />
      </IconButton>
    </Fragment>
  );
  return (
    <Fragment>
      <ElevationScroll>
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            zIndex: theme.zIndex.modal + 1,
          }}
        >
          <Toolbar disableGutters>
            <Button sx={logoButtonStyles} component={Link} to="/" disableRipple>
              <LogoImage alt="company logo" src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Placeholder />
    </Fragment>
  );
};
export default Header;
