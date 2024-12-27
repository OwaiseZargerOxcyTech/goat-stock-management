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
        <Toolbar
          disableGutters
          sx={{
            flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for large screens
            justifyContent: { xs: "center", md: "space-between" }, // Center align on small screens, space-between on large screens
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mb: { xs: 2, md: 0 }, // Add margin below title for small screens
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: { xs: "center", md: "left" }, // Center text on small screens, left align on large screens
            }}
          >
            GOAT STOCK
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack buttons on small screens, horizontal on large screens
              alignItems: { xs: "center", md: "center" }, // Center align on both small and large screens
              justifyContent: { xs: "center", md: "flex-end" }, // Buttons move to the right on large screens
              gap: { xs: 2, md: 1 }, // Add spacing between buttons
              width: { xs: "100%", md: "auto" }, // Full width on small screens
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                component={RouterLink}
                to="/male-stock-list"
                sx={{ color: "white" }}
              >
                Male Stock
              </Button>
              <Button
                component={RouterLink}
                to="/female-stock-list"
                sx={{ color: "white" }}
              >
                Female Stock
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                component={RouterLink}
                to="/trade-list"
                sx={{ color: "white" }}
              >
                Trade
              </Button>
              {isAuthenticated && (
                <Button onClick={logout} sx={{ color: "white" }}>
                  Logout
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
