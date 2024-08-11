import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import ReactVirtualizedTable from "../../../components/Table";
import axios from "axios";

function Books() {
const [books,setBooks] = useState()

useEffect(()=>{
  const token = localStorage.getItem('token')
  axios.get('https://book-rent-api-1.onrender.com/api/V1/users/admin/books',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    console.log(res);
    const mappedBooks = res.data.map((book, index) => ({
      ...book,
      number: index + 1,
   
    }));
    setBooks(mappedBooks);
    
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
