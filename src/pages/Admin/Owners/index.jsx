import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";
import SeeMore from "../../../components/seeMore";
import DeletePopup from "../../../components/DeletePopup";
import axios from "axios";

function Owners() {
  const [data,setData] = useState()
  const [owners, setOwners] = useState([]);
  const [opensee, setOpensee] = React.useState(false);
  const [opendelete, Setdelete] = useState(false);
  const [owner, setOwner] = useState();

const handleOwnerAproval =async (id)=>{
  const token = localStorage.getItem('token')
  await axios.patch(`http://localhost:5000/api/V1/users/${id}/approve`,{},{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
}
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
  const handleOpensee = (owner) =>{
    console.log('this owner',owner);
    
    setData(owner);
    setOpensee(true);
  } 
 
 
  
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
      .get("http://localhost:5000/api/V1/users/admin/owners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('this one mmm',res.data);
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

      <SeeMore data={data} handleClose={handleClosesee} open={opensee} />
      <DeletePopup
        handleClose={handleCloseDelete}
        open={opendelete}
        data={owner}
      />
    </div>
  );
}

export default Owners;

