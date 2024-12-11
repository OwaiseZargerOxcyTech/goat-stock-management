import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import api from "../api/config";
import { CommonTable } from "./CommonTable";
import { useNavigate } from "react-router-dom";

const TradeList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/trade");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (row) => {
    setEditData(row.original);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/trade/${editData.id}`, editData);
      setOpenEditDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/trade/${deleteId}`);
      setOpenDeleteDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    { accessorKey: "goatName", header: "Goat Name" },
    { accessorKey: "intendedUse", header: "Intended Use" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "transactionDetails", header: "Transaction Details" },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Box>
          <Button
            onClick={() => handleEditClick(row)}
            color="primary"
            variant="contained"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteClick(row.original.id)}
            color="secondary"
            variant="contained"
            size="small"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  const navigate = useNavigate();

  return (
    <Box sx={{ m: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Trade List
        </Typography>
        <Button
          onClick={() => navigate("/add-trade")}
          color="primary"
          variant="contained"
          size="small"
          sx={{ mb: 2 }}
        >
          Add
        </Button>
      </Box>
      <CommonTable columns={columns} data={data} />

      {/* Edit Dialog */}
      {openEditDialog && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Trade</DialogTitle>
          <DialogContent>
            {Object.keys(editData || {}).map(
              (key) =>
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" && (
                  <TextField
                    key={key}
                    label={key}
                    fullWidth
                    margin="dense"
                    value={editData[key] || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button
              onClick={handleEditSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {openDeleteDialog && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this record?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="secondary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TradeList;
