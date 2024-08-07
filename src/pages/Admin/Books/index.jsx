import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";
import axios from "axios";

function Books() {
const [books,setBooks] = useState()

useEffect(()=>{
  const token = localStorage.getItem('token')
  axios.get('http://localhost:5000/api/V1/users/admin/books',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    console.log(res);
    setBooks(res.data);
    
  }).catch((err)=>{
    console.log(err);
    
  })
},[])

  const columns = [
    { width: 50, label: "No.", dataKey: "number" },
    { width: 80, label: "Author", dataKey: "author" },
    { width: 120, label: "Owner", dataKey: "owner" },
    { width: 120, label: "Category", dataKey: "category" },
    { width: 100, label: "Book Name", dataKey: "bName" },
    { width: 120, label: "Status", dataKey: "status" },
  ];

  const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
  ];
  
const rows = Array.from({ length: 20 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return {
    id: index,
    number: index + 1,
    location: "addis ababa",
    upload:'true',
    bookNo: randomSelection[1],
   
    owner: { name: 'John Doe', image: 'https://via.placeholder.com/40' },
    status:{ text: 'Inactive', checked: true },
    price: randomSelection[4],
  };
});
  
  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />

      <div className="w-full min-h-screen pl-72 pt-20 flex gap-4">
        <div className="w-[90%]  p-4">
        <ReactVirtualizedTable columns={columns} text="List of Books" rows={books} />

        </div>
      </div>
    </div>
  );
}

export default Books;
