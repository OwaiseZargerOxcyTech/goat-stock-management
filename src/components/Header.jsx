import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../routes/AuthProvider";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GOAT STOCK
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/male-stock-list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Male Stock
            </Button>
            <Button
              component={RouterLink}
              to="/female-stock-list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Female Stock
            </Button>
            <Button
              component={RouterLink}
              to="/trade-list"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Trade
            </Button>
            {isAuthenticated && (
              <Button
                onClick={logout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            )}
          </Box>

          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GOAT STOCK
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
