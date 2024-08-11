import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";

import DeletePopup from "../../../components/DeletePopup";
import axios from "axios";
// import SeeMore from "../../../components/SeeMore";
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


function Owners() {
  const [data, setData] = useState();
  const [owners, setOwners] = useState([]);
  const [opensee, setOpensee] = React.useState(false);
  const [opendelete, Setdelete] = useState(false);
  const [owner, setOwner] = useState();

  const handleOwnerAproval = async (id) => {
    const token = localStorage.getItem("token");
    await axios.patch(
      `https://book-rent-api.onrender.com/api/V1/users/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const handleOpenDelete = (data) => {
    console.log("oiuytrewq", opendelete);

    Setdelete(true);
    setOwner(data);
  };

  const handleCloseDelete = () => {
    Setdelete(false);

    console.log("asdfghjkl", opendelete);
  };

  const handleClosesee = () => setOpensee(false);
  const handleOpensee = (owner) => {
    console.log("this owner", owner);

    setData(owner);
    setOpensee(true);
  };

  const columns = [
    { width: 50, label: "No.", dataKey: "number" },
    { width: 120, label: "Owner", dataKey: "owner" },
    { width: 80, label: "Upload", dataKey: "booksCount" },
    { width: 120, label: "Location", dataKey: "location" },
    { width: 100, label: "Status", dataKey: "status" },
    { width: 120, label: "Action", dataKey: "action" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://book-rent-api.onrender.com/api/V1/users/admin/owners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("this one mmm", res.data);
        const mappedOwners = res.data.map((owner, index) => ({
          ...owner,
          number: index + 1,
          action: "Action",
        }));
        setOwners(mappedOwners);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />

      <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
        <div className="w-[90%] p-4">
          <ReactVirtualizedTable
            columns={columns}
            text="List of Owners"
            rows={owners}
            handleOpensee={handleOpensee}
            handleOpenRemove={handleOpenDelete}
            handleOwnerAproval={handleOwnerAproval}
          />
        </div>
      </div>

      {/* <SeeMore data={data} handleClose={handleClosesee} open={opensee} /> */}
      <DeletePopup
        handleClose={handleCloseDelete}
        open={opendelete}
        data={owner}
      />
       <Modal
      keepMounted
      open={opensee}
      onClose={handleClosesee}
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
    </div>
  );
}

export default Owners;
