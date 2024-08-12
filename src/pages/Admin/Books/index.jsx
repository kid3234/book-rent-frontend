import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import axios from "axios";
import MaterialReactTableBook from "../../../components/Booktable";

function Books() {
const [books,setBooks] = useState()

const refreshList = () => { 
  const token = localStorage.getItem('token')
  axios.get('https://book-rent-api.onrender.com/api/V1/users/admin/books',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{

    const mappedBooks = res.data.map((book, index) => ({
      ...book,
      number: index + 1,
   
    }));
    setBooks(mappedBooks);
    
  }).catch((err)=>{
  
    
  })
}

useEffect(()=>{
  refreshList()
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
        <div className="w-[100%]  p-4">
        <MaterialReactTableBook columns={columns} text="List of Books" rows={books} refreshList={refreshList}/>

        </div>
      </div>
    </div>
  );
}

export default Books;
