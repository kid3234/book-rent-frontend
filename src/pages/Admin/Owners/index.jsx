// import React, { useEffect, useState } from "react";
// import SideBar from "../../../components/Sidebar";
// import NaveBar from "../../../components/NaveBar";
// import ReactVirtualizedTable from "../../../components/Table";
// import SeeMore from "../../../components/seeMore";
// import axios from "axios";

// function Owners() {
//   const [owners, setOwners] = useState();
//   const [open, setOpen] = React.useState(false);

//   const [opensuc, setOpensuc] = React.useState(false);
//   const [opensee, setOpensee] = React.useState(false);
//   const handleClosesee = () => setOpensee(false);
//   const handleOpensee = () => {
//     console.log("clicked ");

//     setOpensee(true);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleOpensuc = () => setOpensuc(true);
//   const handleClosesuc = () => setOpensuc(false);

//   const columns = [
//     { width: 50, label: "No.", dataKey: "number" },
//     { width: 120, label: "Owner", dataKey: "owner" },
//     { width: 80, label: "Upload", dataKey: "upload" },
//     { width: 120, label: "Location", dataKey: "location" },
//     { width: 100, label: "Status", dataKey: "status" },
//     { width: 120, label: "Action", dataKey: "action" },
//   ];

//   const sample = [
//     ["Frozen yoghurt", 159, 6.0, 24, 4.0],
//     ["Ice cream sandwich", 237, 9.0, 37, 4.3],
//     ["Eclair", 262, 16.0, 24, 6.0],
//     ["Cupcake", 305, 3.7, 67, 4.3],
//     ["Gingerbread", 356, 16.0, 49, 3.9],
//   ];

//   const rows = Array.from({ length: 200 }, (_, index) => {
//     const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//     return {
//       id: index,
//       number: index + 1,
//       location: "addis ababa",
//       upload: "true",
//       bookNo: randomSelection[1],
//       // status: { text: 'FREE', checked: Math.random() > 0.5 },
//       owner: { name: "John Doe", image: "https://via.placeholder.com/40" },
//       status: { text: "Active", checked: true },
//       price: randomSelection[4],
//     };
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/V1/users/admin/owners", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setOwners(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-[#F0F2FF]">
//       <SideBar />
//       <NaveBar />

//       <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
//         <div className="w-[90%]  p-4">
//           <ReactVirtualizedTable
//             columns={columns}
//             text="List of Owners"
//             rows={rows}
//             handleOpensee={handleOpensee}
//           />
//         </div>
//       </div>

//       <SeeMore handleClose={handleClosesee} open={opensee} />
//     </div>
//   );
// }

// export default Owners;


import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";
import SeeMore from "../../../components/seeMore";
import axios from "axios";

function Owners() {
  const [data,setData] = useState()
  const [owners, setOwners] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [opensee, setOpensee] = React.useState(false);
  
  const handleClosesee = () => setOpensee(false);
  const handleOpensee = (owner) =>{
    console.log('this owner',owner);
    
    setData(owner);
    setOpensee(true);
  } 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  
  const columns = [
    { width: 50, label: "No.", dataKey: "number" },
    { width: 120, label: "Owner", dataKey: "name" },
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
          />
        </div>
      </div>

      <SeeMore data={data} handleClose={handleClosesee} open={opensee} />
    </div>
  );
}

export default Owners;

