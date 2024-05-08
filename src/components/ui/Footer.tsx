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
import { Box, styled, useTheme } from "@mui/material";
import footerAdornment from "../../assets/Footer Adornment.svg";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.common.blue,
  width: "100%",
  zIndex: theme.zIndex.modal + 2,
  position: "relative",
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
};

export default Footer;
