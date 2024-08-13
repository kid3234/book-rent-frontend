import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 4,
  gap: 4,
};

function EditBook({ open, handleClose, data,refreshList }) {
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (data) {
      setPrice(data.price || '');
      setQuantity(data.quantity || '');
      setAvailability(data.availability || '');
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log("Submitting with id:", data?.id);

    const token = localStorage.getItem("token");
    const formdata = {
      price,
      availability,
      quantity,
    };

    try {
      const res = await axios.put(`https://book-rent-api-2.onrender.com/api/V1/books/${data?.id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message)
      handleClose();
      refreshList()
    } catch (err) {
      toast.error(err.response.data.error)
    }
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
          Edit Book
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
            id="price"
            label="Price"
            variant="filled"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id="quantity"
            label="Quantity"
            variant="filled"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Availability
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <MenuItem value="FREE">FREE</MenuItem>
              <MenuItem value="RENTED">RENTED</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            disableElevation
            sx={{ backgroundColor: "#00ABFF", color: "#fff", padding: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      
    </Modal>
  );
}

export default EditBook;
