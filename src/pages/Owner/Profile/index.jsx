import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  styled,
} from "@mui/material";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function ProfilePage() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleFiles = async (files) => {
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "santimevent");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/ddpaeqokl/image/upload`,
        formData
      );
      setImage(response.data.secure_url);

      console.log("event image ....", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const formdata = {
      name,
      image,
      email,
      phone,
    };
    console.log("form data", formdata);

    try {
      const res = await axios.put(
        "https://book-rent-api-4.onrender.com/api/V1/users/update",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hii");
      
      toast.success(res.data.message)
    } catch (err) {
      toast.error(err.response.data.error)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://book-rent-api-4.onrender.com/api/V1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setImage(res.data.image);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-[#F0F2FF]">
      <NaveBar />
      <Grid container>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10} style={{ padding: "20px" }}>
          <Container>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h4" gutterBottom>
                Profile
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Avatar
                    alt="Profile Image"
                    src={image || "/profile-image.jpg"}
                    sx={{ width: 120, height: 120 }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
                    Upload Image
                    <VisuallyHiddenInput type="file" />
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", background: "black" }}
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </Grid>
        <ToastContainer />
    </div>
  );
}

export default ProfilePage;
