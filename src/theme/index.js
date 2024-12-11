import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#78B3CE", //
      light: "#F1FAEE", // Off-white
      dark: "#457B9D", // Steel blue
    },
    secondary: {
      main: "#E63946", // Soft red
      light: "#FF6F61", // Coral
      dark: "#B91C1C", // Deep red
    },
    background: {
      default: "#F8F9FA", // Very light grey
      paper: "#FFFFFF", // Pure white
    },
    text: {
      primary: "#1D3557", // Dark blue
      secondary: "#457B9D", // Steel blue
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.2rem",
      color: "#1D3557",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.8rem",
      color: "#1D3557",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.6rem",
      color: "#1D3557",
    },
    body1: {
      color: "#457B9D",
    },
    body2: {
      color: "#1D3557",
    },
  },
});
