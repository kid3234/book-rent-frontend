import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  borderRadius: 4,
};

function SeeMore({ open, handleClose, data }) {
  console.log("data on pop up",data);
  
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Name"
            value={data?.name}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="email"
            label="Email address"
            value={data?.email}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="location"
            label="Location"
            value={data?.location}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="phone"
            label="Phone Number"
            value={data?.phone}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default SeeMore;
