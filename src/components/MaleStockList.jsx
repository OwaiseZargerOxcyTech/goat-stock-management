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
import api from "../api/config";
import { CommonTable } from "./CommonTable";
import { useNavigate } from "react-router-dom";

const MaleStockList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      setImageData(URL.createObjectURL(blob));
      setIsImageLoaded(true);
      setOpenImageDialog(true);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/male-stock");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setImageName(file.name);
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
      const formDataObj = new FormData();

      Object.entries(editData).forEach(([key, value]) => {
        if (key === "image" && value) {
        } else {
          formDataObj.append(key, value || "");
        }
      });

      console.log(editData);
      console.log(formDataObj);

      // Append image file if selected

      console.log(selectedImageFile);

      if (selectedImageFile) {
        formDataObj.append("image", selectedImageFile);
      }

      await api.put(`/male-stock/${editData.id}`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpenEditDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/male-stock/${deleteId}`);
      setOpenDeleteDialog(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    { accessorKey: "goatName", header: "Goat Name" },
    { accessorKey: "purchaserInformation", header: "Purchaser Information" },
    { accessorKey: "weight", header: "Weight (kg)" },
    { accessorKey: "height", header: "Height (cm)" },
    { accessorKey: "salesStatus", header: "Sales Status" },
    { accessorKey: "price", header: "Price" },
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
          {row.original.photographUrl && (
            <Button
              onClick={() => fetchImage(row.original.photographUrl)}
              color="info"
              variant="contained"
              size="small"
              style={{ marginLeft: "8px" }}
            >
              View Image
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ m: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Male Stock List
        </Typography>
        <Button
          onClick={() => navigate("/add-male-stock")}
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
          <DialogTitle>Edit Male Stock</DialogTitle>
          <DialogContent>
            {Object.keys(editData || {}).map(
              (key) =>
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
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
                    <MenuItem value="sold">Sold</MenuItem>
                    <MenuItem value="unsold">Unsold</MenuItem>
                  </TextField>
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

            {/* Image Upload Field */}
            <Box sx={{ mt: 2 }}>
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
            </Box>
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
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>Goat Image</DialogTitle>
        <DialogContent>
          {isImageLoaded ? (
            <img
              src={imageData}
              alt="Goat Image"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          ) : (
            <Typography>Loading image...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaleStockList;
