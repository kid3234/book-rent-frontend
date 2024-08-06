import React from 'react'
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";

function Owners() {

  const columns = [
    { width: 50, label: "No.", dataKey: "number" },
    { width: 120, label: "Owner", dataKey: "owner" },
    { width: 80, label: "Upload", dataKey: "upload" },
    { width: 120, label: "Location", dataKey: "location" },
    { width: 100, label: "Status", dataKey: "status" },
    { width: 120, label: "Action", dataKey: "action" },
  ];

  
  const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
  ];
  
const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return {
    id: index,
    number: index + 1,
    location: "addis ababa",
    upload:'true',
    bookNo: randomSelection[1],
    // status: { text: 'FREE', checked: Math.random() > 0.5 },
    owner: { name: 'John Doe', image: 'https://via.placeholder.com/40' },
    status:{ text: 'Active', checked: true },
    price: randomSelection[4],
  };
});
  
  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />

      <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
        <div className="w-[90%]  p-4">
        <ReactVirtualizedTable columns={columns} text="List of Books" rows={rows}/>

        </div>
      </div>
    </div>
  )
}

export default Owners