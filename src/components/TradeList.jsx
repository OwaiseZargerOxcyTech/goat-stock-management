import dayjs from "dayjs";
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
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import api from "../api/config";
import { CommonTable } from "./CommonTable";
import { useNavigate } from "react-router-dom";

const TradeList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [viewData, setViewData] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);

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

  const handleViewClick = (row) => {
    setViewData(row.original);
    setOpenViewDialog(true);
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

  const handleDownload = () => {
    const transformedData = data.map((row) => ({
      ...row,
      entryDate: row.entryDate
        ? dayjs(row.entryDate).format("DD MMM YYYY")
        : "",
      exitDate: row.exitDate ? dayjs(row.exitDate).format("DD MMM YYYY") : "",
      createdAt: row.createdAt
        ? dayjs(row.createdAt).format("DD MMM YYYY")
        : "",
      updatedAt: row.updatedAt
        ? dayjs(row.updatedAt).format("DD MMM YYYY")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TradeStock");
    XLSX.writeFile(workbook, "TradeStockList.xlsx");
  };

  const columns = [
    { accessorKey: "goatName", header: "Goat Name" },
    { accessorKey: "purchaserInformation", header: "Purchaser Information" },
    { accessorKey: "customerDetails", header: "Customer Details" },
    { accessorKey: "weight", header: "Weight (kg)" },
    { accessorKey: "height", header: "Height (cm)" },
    { accessorKey: "salesStatus", header: "Sales Status" },
    { accessorKey: "price", header: "Price" },
    {
      accessorKey: "actions",
      header: "Actions",
      size: 300,
      Cell: ({ row }) => (
        <Box>
          <Button
            onClick={() => handleViewClick(row)}
            color="info"
            variant="contained"
            size="small"
          >
            View
          </Button>
          <Button
            onClick={() => handleEditClick(row)}
            color="primary"
            variant="contained"
            size="small"
            style={{ marginLeft: "8px" }}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 2, sm: 0 },
          mb: { xs: 2, sm: 0 }, // Add margin below for mobile screens
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Trade Stock List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 2, sm: "8px" },
          }}
        >
          <Button
            onClick={handleDownload}
            color="secondary"
            variant="contained"
            size="small"
            sx={{ mb: { xs: 0, sm: 2 }, marginRight: { xs: 0, sm: "8px" } }}
          >
            Download
          </Button>
          <Button
            onClick={() => navigate("/add-trade")}
            color="primary"
            variant="contained"
            size="small"
            sx={{ mb: { xs: 0, sm: 2 } }}
          >
            Add
          </Button>
        </Box>
      </Box>

      <CommonTable columns={columns} data={data} />

      {/* Edit Dialog */}
      {openEditDialog && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Trade Stock</DialogTitle>
          <DialogContent>
            {Object.keys(editData || {}).map(
              (key) =>
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "photographUrl" &&
                (key === "entryDate" || key === "exitDate" ? (
                  <TextField
                    key={key}
                    label={key}
                    type="date"
                    fullWidth
                    margin="dense"
                    value={editData[key]?.split("T")[0] || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                ) : key === "salesStatus" ? (
                  <TextField
                    key={key}
                    label={key}
                    select
                    fullWidth
                    margin="dense"
                    value={editData[key] || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="Sold">Sold</MenuItem>
                    <MenuItem value="Unsold">Unsold</MenuItem>
                  </TextField>
                ) : key === "description" || key === "maintenanceRecords" ? (
                  <TextField
                    key={key}
                    label={key}
                    fullWidth
                    margin="dense"
                    value={editData[key] || ""}
                    multiline
                    rows={3} // Set to 3 rows
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                ) : (
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
                ))
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

      {openViewDialog && (
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
          <DialogTitle>View Trade Stock</DialogTitle>
          <DialogContent>
            {Object.keys(viewData || {}).map(
              (key) =>
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "photographUrl" &&
                (key === "entryDate" || key === "exitDate" ? (
                  <TextField
                    key={key}
                    label={key}
                    type="date"
                    fullWidth
                    margin="dense"
                    value={viewData[key]?.split("T")[0] || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                ) : key === "description" || key === "maintenanceRecords" ? (
                  <TextField
                    key={key}
                    label={key}
                    fullWidth
                    margin="dense"
                    value={viewData[key] || ""}
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                ) : (
                  <TextField
                    key={key}
                    label={key}
                    fullWidth
                    margin="dense"
                    value={viewData[key] || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TradeList;
