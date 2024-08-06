import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  borderRadius: 10,
};

function Success({ open, handleClose }) {
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <svg
            width="150"
            height="134"
            viewBox="0 0 150 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.7385 24.2C47.7305 24.2 26 45.9579 26 73C26 100.042 47.7305 121.8 74.7385 121.8C101.746 121.8 123.477 100.042 123.477 73C123.477 45.9579 101.746 24.2 74.7385 24.2ZM74.7385 117.732C50.1674 117.732 30.0628 97.602 30.0628 73C30.0628 48.3979 50.1674 28.2679 74.7385 28.2679C99.3095 28.2679 119.414 48.3979 119.414 73C119.414 97.602 99.3095 117.732 74.7385 117.732Z"
              fill="#00ABFF"
            />
            <path
              d="M100.124 84.59C99.1077 84.1821 97.8892 84.388 97.4856 85.4021C93.0192 94.1442 84.2843 99.4321 74.7422 99.4321C64.9945 99.4321 56.4653 94.1442 51.9989 85.4021C51.5915 84.3842 50.373 83.98 49.3602 84.59C48.3435 84.998 47.9399 86.218 48.3435 87.2321C53.4192 97.1942 63.3725 103.5 74.7422 103.5C85.9102 103.5 96.0653 97.198 100.939 87.2321C101.548 86.2142 101.141 84.9942 100.128 84.59H100.124Z"
              fill="#00ABFF"
            />
            <path
              d="M64.5833 62.8321C64.5833 66.2023 61.857 68.9321 58.491 68.9321C55.125 68.9321 52.3987 66.2023 52.3987 62.8321C52.3987 59.4618 55.125 56.7321 58.491 56.7321C61.857 56.7321 64.5833 59.4618 64.5833 62.8321Z"
              fill="#00ABFF"
            />
            <path
              d="M97.0782 62.8321C97.0782 66.2023 94.3519 68.9321 90.9859 68.9321C87.6199 68.9321 84.8936 66.2023 84.8936 62.8321C84.8936 59.4618 87.6199 56.7321 90.9859 56.7321C94.3519 56.7321 97.0782 59.4618 97.0782 62.8321Z"
              fill="#00ABFF"
            />
            <path
              d="M18 116C22.1787 116 24 114.242 24 110C24 114.242 25.8087 116 30 116C25.8087 116 24 117.809 24 122C24 117.809 22.1787 116 18 116Z"
              stroke="#00ABFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M108 17C114.268 17 117 14.363 117 8C117 14.363 119.713 17 126 17C119.713 17 117 19.713 117 26C117 19.713 114.268 17 108 17Z"
              stroke="#00ABFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M128 91C132.179 91 134 89.242 134 85C134 89.242 135.809 91 140 91C135.809 91 134 92.8087 134 97C134 92.8087 132.179 91 128 91Z"
              stroke="#00ABFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <Typography variant="h6" component="h1" align="center">
            Congrats!
          </Typography>
          <Typography variant="body1" component="p" align="center" >
            You have uploaded the book successfully. Wait until we approve it.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#00ABFF",
                color: "#fff",
                padding: "4px 8px",
                width: 40,
                textAlign: "center",
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default Success;
