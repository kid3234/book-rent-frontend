import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Switch } from "@mui/material";
const StatusToggle = ({ checked, label, onChange, status, id }) => {
  console.log(status, label, onChange, checked, id);

  const [check, setCheck] = useState(checked);
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  console.log("check ", check);

  const togglecheck = () => {
    setCheck((prev) => !prev);
  };

  const handleCheck = async () => {
    const token = localStorage.getItem("token");
    const URL =
      path === "books"
        ? `https://book-rent-api-1.onrender.com/api/V1/books/${id}/approve`
        : `https://book-rent-api-1.onrender.com/api/V1/users/${id}/status`;
    await axios.patch(
      URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    togglecheck();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: check ? "#e0f7e9" : "#E3D9D8",
        borderRadius: 4,
        padding: "2px 2px",
        width: "max-content",
      }}
    >
      {check ? (
        <CheckIcon style={{ color: "#4caf50", marginRight: 6 }} />
      ) : (
        <ClearIcon style={{ color: "#ED6E60", marginRight: 6 }} />
      )}

      <Typography
        variant="body1"
        style={{
          color: check ? "#4caf50" : "#E55E4F",
          fontWeight: 500,
          marginRight: 12,
        }}
      >
        {check ? "Active" : "Disabled"}
      </Typography>
      <Switch
        checked={check}
        onChange={handleCheck}
        // a5d6a7
        sx={{
          "& .MuiSwitch-track": {
            backgroundColor: check ? "#3FC243" : "#D6B9B9",
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: check ? "#2e7d32" : "#E78D8D",
          },
        }}
      />
    </Box>
  );
};

export default StatusToggle;
