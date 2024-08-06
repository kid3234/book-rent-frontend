import React, { useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function BookUpload() {
  const [open, setOpen] = React.useState(false);

  const [opensuc, setOpensuc] = React.useState(false);
  const [opensee, setOpensee] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpensuc = () => setOpensuc(true);
  const handleClosesuc = () => setOpensuc(false);

  const handleOpensee = () => setOpensee(true);
  const handleClosesee = () => setOpensee(false);

  const [selectedBook, setSelectedBook] = useState("");
  const [questionnaires, setQuestionnaires] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // Example of disabling the price input

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleQuestionnairesChange = (event) => {
    const {
      target: { value },
    } = event;
    setQuestionnaires(typeof value === "string" ? value.split(",") : value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
        <div className="w-full bg-white ">

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            gap: 3,
            backgroundColor: "white",
            borderRadius: 1,
            width: "50%",
            margin: "50px auto",
          }}
        >
          <Typography variant="h5" component="h1">
            Upload New Book
          </Typography>

          <Box sx={{width: "100%" , display: "flex", justifyContent: "space-between", gap: 4 }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                label="Search book by name or Author"
                select
                value={selectedBook}
                onChange={handleBookChange}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Search...</option>
                <option value="Book1">Book 1</option>
                <option value="Book2">Book 2</option>
                <option value="Add">Add</option>
              </TextField>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Add questionnaire</InputLabel>
              <Select
                multiple
                value={questionnaires}
                onChange={handleQuestionnairesChange}
                renderValue={(selected) => selected.join(", ")}
                variant="outlined"
              >
                {["Add Phone Number", "Add Location", "Add Email"].map(
                  (name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={questionnaires.indexOf(name) > -1} />
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{width: '100%' , display: "flex", justifyContent: "space-between" ,gap: 4 }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Book Quantity</InputLabel>
              <Select
                value={quantity}
                onChange={handleQuantityChange}
                variant="outlined"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Rant price for 2 weeks"
              variant="outlined"
              disabled={isDisabled}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Box>

          <Button variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <Typography>Upload Book Cover</Typography>
          </Button>

          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
        </div>
      </div>
    </div>
  );
}

export default BookUpload;
