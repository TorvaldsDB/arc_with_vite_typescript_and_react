// how to write a footer
// https://stackoverflow.com/questions/72440972/how-to-push-the-footer-in-mui-at-the-very-bottom-and-make-it-stick

// const StyledFooterAdornment = styled("img")(({ theme }) => ({
//   width: "25em",
//   verticalAlign: "bottom",
//   [theme.breakpoints.down("lg")]: {
//     width: "21em",
//   },
//   [theme.breakpoints.down("sm")]: {
//     width: "15em",
//   },
// }));
// <Box
//   component="img"
//   alt="black decorative slash"
//   src={footerAdornment}
//   sx={{
//     width: "25em",
//     verticalAlign: "bottom",
//     [theme.breakpoints.down("lg")]: {
//       width: "21em",
//     },
//     [theme.breakpoints.down("sm")]: {
//       width: "15em",
//     },
//   }}
// />
// <StyledFooterAdornment
//   alt="black decorative slash"
//   src={footerAdornment}
// />
import { Box, Grid, SxProps, Theme, styled, useTheme } from "@mui/material";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import footerAdornment from "../../assets/Footer Adornment.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";

interface FooterProps {
  setValue: (value: number) => void;
  setSelectedIndex: (index: number) => void;
  children?: ReactElement;
}
const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.common.blue,
  width: "100%",
  zIndex: theme.zIndex.modal + 2,
  position: "relative",
}));

const StyledGridItem = styled(Grid)(() => ({
  margin: "3em",
}));

// https://mui.com/material-ui/guides/typescript/#complications-with-the-component-prop
// const StyledItemLink = styled(Grid)(() => ({
//   color: "white",
//   fontFamily: "Arial",
//   fontSize: "0.75rem",
//   fontWeight: "bold",
//   textDecoration: "none",
// })) as typeof Grid;

const LinkStyles: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.common.white,
  fontFamily: "Arial",
  fontSize: "0.75rem",
  fontWeight: "bold",
  textDecoration: "none",
});

const IconStyles: SxProps<Theme> = (theme: Theme) => ({
  height: "4em",
  width: "4em",
  [theme.breakpoints.down("xs")]: {
    height: "2.5em",
    width: "2.5em",
  },
});

const Footer: FC<FooterProps> = ({ setValue, setSelectedIndex }) => {
  const theme = useTheme();
  return (
    <StyledFooter>
      <Grid
        justifyContent="center"
        container
        sx={{
          position: "absolute",
        }}
      >
        <StyledGridItem>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              sx={LinkStyles}
              component={Link}
              to="/"
              onClick={() => {
                setValue(0);
              }}
            >
              Home
            </Grid>
          </Grid>
        </StyledGridItem>
        <StyledGridItem>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              sx={LinkStyles}
              component={Link}
              to="/services"
              onClick={() => {
                setValue(1);
                setSelectedIndex(0);
              }}
            >
              Services
            </Grid>
            <Grid
              item
              component={Link}
              to="/customsoftware"
              sx={LinkStyles}
              onClick={() => {
                setValue(1);
                setSelectedIndex(1);
              }}
            >
              Custom Software Development
            </Grid>
            <Grid
              item
              component={Link}
              to="/mobileapps"
              sx={LinkStyles}
              onClick={() => {
                setValue(1);
                setSelectedIndex(2);
              }}
            >
              iOS/Android App Development
            </Grid>
            <Grid
              item
              component={Link}
              to="/websites"
              sx={LinkStyles}
              onClick={() => {
                setValue(1);
                setSelectedIndex(3);
              }}
            >
              Website Development
            </Grid>
          </Grid>
        </StyledGridItem>
        <StyledGridItem>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/revolution"
              sx={LinkStyles}
              onClick={() => {
                setValue(2);
              }}
            >
              The Revolution
            </Grid>
            <Grid
              item
              component={Link}
              to="/revolution"
              sx={LinkStyles}
              onClick={() => {
                setValue(2);
              }}
            >
              Vision
            </Grid>
            <Grid
              item
              component={Link}
              to="/revolution"
              sx={LinkStyles}
              onClick={() => {
                setValue(2);
              }}
            >
              Technology
            </Grid>
            <Grid
              item
              component={Link}
              to="/revolution"
              sx={LinkStyles}
              onClick={() => {
                setValue(2);
              }}
            >
              Process
            </Grid>
          </Grid>
        </StyledGridItem>
        <StyledGridItem>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/about"
              sx={LinkStyles}
              onClick={() => {
                setValue(3);
              }}
            >
              About Us
            </Grid>
            <Grid
              item
              component={Link}
              to="/about"
              sx={LinkStyles}
              onClick={() => {
                setValue(3);
              }}
            >
              History
            </Grid>
            <Grid
              item
              component={Link}
              to="/about"
              sx={LinkStyles}
              onClick={() => {
                setValue(3);
              }}
            >
              Team
            </Grid>
          </Grid>
        </StyledGridItem>
        <StyledGridItem>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/contact"
              sx={LinkStyles}
              onClick={() => {
                setValue(4);
              }}
            >
              Contact Us
            </Grid>
          </Grid>
        </StyledGridItem>
      </Grid>
      <Box
        component="img"
        alt="black decorative slash"
        src={footerAdornment}
        sx={{
          width: "25em",
          verticalAlign: "bottom",
          [theme.breakpoints.down("lg")]: {
            width: "21em",
          },
          [theme.breakpoints.down("sm")]: {
            width: "15em",
          },
        }}
      />
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        sx={{
          position: "absolute",
          marginTop: "-6em",
          right: "1.5em",
          [theme.breakpoints.down("xs")]: {
            right: "0.6em",
          },
        }}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Box
            component="img"
            alt="facebook logo"
            src={facebook}
            sx={IconStyles}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Box
            component="img"
            alt="twitter logo"
            src={twitter}
            sx={IconStyles}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Box
            component="img"
            alt="instagram logo"
            src={instagram}
            sx={IconStyles}
          />
        </Grid>
      </Grid>
    </StyledFooter>
  );
};

export default Footer;
