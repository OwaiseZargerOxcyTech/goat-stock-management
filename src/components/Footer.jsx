import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Email
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Phone
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="text.secondary" sx={{ pr: 1 }}>
              <Facebook />
            </Link>
            <Link href="#" color="text.secondary" sx={{ pr: 1 }}>
              <Twitter />
            </Link>
            <Link href="#" color="text.secondary">
              <Instagram />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
              Goat Stock Management
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
