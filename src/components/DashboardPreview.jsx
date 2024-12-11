import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Features from "./Features";

function DashboardPreview() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard Preview
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 400,
          bgcolor: "grey.200",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Mock Dashboard Interface
        </Typography>
      </Box>
      <Features />
    </Container>
  );
}

export default DashboardPreview;
