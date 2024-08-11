import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  borderRadius: 4,
  gap: 4
};

function AddBook({ open, handleClose, handleAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    handleAddBook({ title, author, category });
    handleClose();
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ alignItems: "center" }}>
          Add Book
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="book-name"
            label="Book Name"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="author-name"
            label="Author Name"
            variant="filled"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
       <FormControl variant="filled" fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="Fiction">Fiction</MenuItem>
        <MenuItem value="Self Help">Self Help</MenuItem>
        <MenuItem value="Business">Business</MenuItem>
      </Select>
    </FormControl>
          <Button
            variant="contained"
            disableElevation
            sx={{ backgroundColor: "#00ABFF", color: "#fff", padding: 2 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddBook;
