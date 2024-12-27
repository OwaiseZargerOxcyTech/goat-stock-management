import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import api from "../api/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthProvider";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post("/admin/login", { username, password });
      console.log("Login successful:", response.data);
      navigate("/");
      login();
      // Handle successful login (e.g., store token, redirect, etc.)
    } catch (error) {
      setError("Invalid username or password.");
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Admin Login is the best
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
