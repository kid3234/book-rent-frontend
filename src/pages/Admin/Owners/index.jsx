import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";


import DeletePopup from "../../../components/DeletePopup";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialReactTableOwner from "../../../components/OwnerTable";


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



  const refreshList = () =>{
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
        console.log("kk",mappedOwners);
        
        setOwners(mappedOwners);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    ).then((res)=>{
      toast.success(res.data.message)
      refreshList()
    }).catch((err)=>{
      toast.error(err.response.data.error)
    });
  };
  const handleOpenDelete = (data) => {
    

    Setdelete(true);
    setOwner(data);
  };

  const handleCloseDelete = () => {
    Setdelete(false);

  };

  const handleClosesee = () => setOpensee(false);
  const handleOpensee = (owner) => {
    setData(owner);
    setOpensee(true);
  };

  

 

  useEffect(() => {
    refreshList()
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />

      <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
        <div className="w-[100%] p-4">
          <MaterialReactTableOwner
            
            text="List of Owners"
            rows={owners}
            handleOpensee={handleOpensee}
            handleOpenRemove={handleOpenDelete}
            handleOwnerAproval={handleOwnerAproval}
            refreshList={refreshList}
          />
        </div>
      </div>
      <DeletePopup
        handleClose={handleCloseDelete}
        open={opendelete}
        data={owner}
        refreshList={refreshList}
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
      <ToastContainer />
    </div>
  );
}

export default Owners;
