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

export default function TradeStockForm() {
  const [formData, setFormData] = useState({
    goatName: "",
    purchaserInformation: "",
    customerDetails: "",
    weight: "",
    height: "",
    entryDate: "",
    exitDate: "",
    salesStatus: "",
    maintenanceRecords: "",
    price: "",
    description: "",
    uniqueIdentificationNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "weight" || name === "height"
          ? parseFloat(value) || ""
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/trade", formData);
      setSnackbar({ open: true, message: "Trade stock created successfully" });
      setFormData({
        goatName: "",
        purchaserInformation: "",
        customerDetails: "",
        weight: "",
        height: "",
        entryDate: "",
        exitDate: "",
        salesStatus: "",
        maintenanceRecords: "",
        price: "",
        description: "",
        uniqueIdentificationNumber: "",
      });
    } catch (error) {
      setSnackbar({ open: true, message: "Error creating trade stock" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Trade Stock Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Fields for the Form */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Goat Name"
              name="goatName"
              value={formData.goatName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Purchaser Details"
              name="purchaserInformation"
              value={formData.purchaserInformation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Details"
              name="customerDetails"
              value={formData.customerDetails}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Entry Date"
              name="entryDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.entryDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Exit Date"
              name="exitDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.exitDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Sales Status"
              name="salesStatus"
              value={formData.salesStatus}
              onChange={handleChange}
            >
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Unsold">Unsold</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Maintenance Records"
              name="maintenanceRecords"
              multiline
              rows={4}
              value={formData.maintenanceRecords}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Unique Identification Number"
              name="uniqueIdentificationNumber"
              value={formData.uniqueIdentificationNumber}
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
