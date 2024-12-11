import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import { Assessment, Pets, ShoppingCart, Timeline } from "@mui/icons-material";

const features = [
  {
    icon: <Pets />,
    title: "Track Stock Details",
    description: "Keep detailed records of your goat inventory.",
  },
  {
    icon: <Timeline />,
    title: "Breeding Insights",
    description: "Monitor and optimize your breeding program.",
  },
  {
    icon: <ShoppingCart />,
    title: "Trade Management",
    description: "Streamline buying and selling processes.",
  },
  {
    icon: <Assessment />,
    title: "Reporting & Analytics",
    description: "Gain valuable insights from your data.",
  },
];

function Features() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {feature.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Features;
