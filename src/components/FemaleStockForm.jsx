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

export default function FemaleStockForm() {
  const [formData, setFormData] = useState({
    goatName: "",
    purchaserInformation: "",
    weight: "",
    height: "",
    entryDate: "",
    exitDate: "",
    salesStatus: "",
    maintenanceRecords: "",
    price: "",
    description: "",
    uniqueIdentificationNumber: "",
    image: null,
    mateDate: "",
    pregnancyStatus: "",
    matingPartnerInformation: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight" || name === "height" || name === "price") {
      setFormData({ ...formData, [name]: parseFloat(value) || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value) {
          formDataObj.append(key, value);
        } else {
          formDataObj.append(key, value || "");
        }
      });

      await api.post("/female-stock", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({ open: true, message: "Female stock created successfully" });
      setFormData({
        goatName: "",
        purchaserInformation: "",
        weight: "",
        height: "",
        entryDate: "",
        exitDate: "",
        salesStatus: "",
        maintenanceRecords: "",
        price: "",
        description: "",
        uniqueIdentificationNumber: "",
        image: null,
        mateDate: "",
        pregnancyStatus: "",
        matingPartnerInformation: "",
      });
      setImageName("");
    } catch (error) {
      setSnackbar({ open: true, message: "Error creating female stock" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Female Stock Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Include all fields from MaleStockForm */}
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
          {/* Additional fields for FemaleStockForm */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mate Date"
              name="mateDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.mateDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Pregnancy Status"
              name="pregnancyStatus"
              value={formData.pregnancyStatus}
              onChange={handleChange}
            >
              <MenuItem value="1 Month Loaded">1 Month Loaded</MenuItem>
              <MenuItem value="2 Month Loaded">2 Month Loaded</MenuItem>
              <MenuItem value="3 Month Loaded">3 Month Loaded</MenuItem>
              <MenuItem value="4 Month Loaded">4 Month Loaded</MenuItem>
              <MenuItem value="5 Month Loaded">5 Month Loaded</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mating Partner Information"
              name="matingPartnerInformation"
              value={formData.matingPartnerInformation}
              onChange={handleChange}
            />
          </Grid>

          {/* Image Upload Field */}
          <Grid item xs={12}>
            <label
              htmlFor="image"
              style={{ display: "block", marginBottom: "8px" }}
            >
              {imageName ? imageName : "Upload Goat Image"}
            </label>
            <TextField
              type="file"
              id="image"
              name="image"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleImageChange}
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
