import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
} from "@mui/material";
import api from "../api/config";

export default function TradeModuleForm() {
  const [formData, setFormData] = useState({
    goatName: "",
    intendedUse: "",
    price: "",
    transactionDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData({ ...formData, [name]: parseFloat(value) || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/trade", formData);
      setSnackbar({ open: true, message: "Trade created successfully" });
      setFormData({
        goatName: "",
        intendedUse: "",
        price: "",
        transactionDetails: "",
      });
    } catch (error) {
      setSnackbar({ open: true, message: "Error creating trade" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Trade Module Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Goat Name"
              name="goatName"
              value={formData.goatName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              select
              label="Intended Use"
              name="intendedUse"
              value={formData.intendedUse}
              onChange={handleChange}
            >
              <MenuItem value="Sale">Sale</MenuItem>
              <MenuItem value="Exchange">Exchange</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Transaction Details"
              name="transactionDetails"
              multiline
              rows={4}
              value={formData.transactionDetails}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="reset"
            variant="outlined"
            onClick={() => setFormData({})}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
