import React, { useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddBook from "../../../components/AddBook";
import axios from "axios";
import Success from "../../../components/successPopup";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function BookUpload() {
  const [selectedBook, setSelectedBook] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [POPUPData, setPOupData] = useState();
  const [image, setImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [opensuc, setOpensuc] = useState(false);

  const handleOpensuc = () => setOpensuc(true);
  const handleClosesuc = () => setOpensuc(false);

  const handleFiles = async (files) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "santimevent");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/ddpaeqokl/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
      setIsUploading(false);
      console.log("event image ....", response.data.secure_url);
    } catch (error) {
      setIsUploading(false);
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleAddBook = (newBook) => {
    setPOupData(newBook);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    const data = { ...POPUPData, price, quantity, image };
    console.log("this is the data", data);

    axios
      .post("https://book-rent-api-1.onrender.com/api/V1/books", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("book  upload", res.data);
        handleOpensuc();
      })
      .catch((err) => {
        console.log("error ", err);
      });

    console.log("new book added", data);
  };

  const handleBookChange = async (event) => {
    const value = event.target.value;
    const token = localStorage.getItem("token");
    setSelectedBook(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://book-rent-api-1.onrender.com/api/V1/books/filter?value=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults([response.data.book]);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setSearchResults([]);
        }
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className="w-full min-h-screen p-10 lg:pl-72 pt-20 flex gap-4">
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

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <FormControl
                fullWidth
                sx={{ marginBottom: 2, margin: "auto" }}
                className="w-[100%] lg:w-[50$]"
              >
                <TextField
                  label="Search book by name or Author"
                  onChange={handleBookChange}
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={selectedBook}
                />

                {searchResults.length > 0 &&
                  searchResults.map((result) => (
                    <MenuItem key={result.id} value={result.name}>
                      {result.name} by {result.author}
                    </MenuItem>
                  ))}

                {searchResults.length === 0 && selectedBook.length > 2 && (
                  <Button onClick={handleOpen}>Add New Book</Button>
                )}
              </FormControl>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <FormControl
                sx={{ marginBottom: 2 }}
                className="w-[100%] lg:w-[50$]"
              >
                <TextField
                  id="outlined-number"
                  label="Book Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormControl>
              <FormControl
                sx={{ marginBottom: 2 }}
                className="w-[100%] lg:w-[50$]"
              >
                <TextField
                  id="price"
                  label="Rent Price for 2 weeks"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
            </Box>

            <Button
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                marginBottom: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                font: 60,
                color: "#00ABFF",
              }}
              onChange={handleFileChange}
            >
              Upload Book Cover
              <VisuallyHiddenInput type="file" />
            </Button>

            {isUploading ? (
              <CircularProgress />
            ) : (
              image && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 2,
                  }}
                >
                  <img
                    src={image}
                    alt="Book Cover"
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  />
                </Box>
              )
            )}

            <Button
              variant="contained"
              sx={{
                paddingY: 3,
                background: "#00ABFF",
                borderRadius: "20px",
                width: "320px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>

      <AddBook
        open={open}
        handleClose={handleClose}
        handleAddBook={handleAddBook}
      />

      <Success handleClose={handleClosesuc} open={opensuc} />
    </div>
  );
}

export default BookUpload;
