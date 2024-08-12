import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import NewPieChart from "../../../components/PieChart";

import EarningsSummaryChart from "../../../components/lineChart";
import axios from "axios";

import MaterialReactTableAdmin from "../../../components/Admintable";



function Dashboard() {
  const [books, setBooks] = useState();
  const [availableBooks, setAvailableBooks] = useState([]);
  const [currentMonthIncome, setCurrentMonthIncome] = useState([]);
  // const columns = [
  //   { width: 50, label: 'No.', dataKey: 'number' },
  //   { width: 80, label: 'Book no.', dataKey: 'bookNo' },
  //   { width: 120, label: 'Owner', dataKey: 'owner' },
  //   { width: 120, label: 'Status', dataKey: 'dashstatus' },
  //   { width: 100, label: 'Price', dataKey: 'price' },
  // ];

  const columns = [
    { header: "No.", accessorKey: "number" },
    { header: "Book no.", accessorKey: "bookNo" },
    { header: "Owner", accessorKey: "owner" },
    { header: "Status", accessorKey: "dashstatus" },
    { header: "Price", accessorKey: "price" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://book-rent-api.onrender.com/api/V1/users/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const mappedBooks = res.data.bookStatusData.map((book, index) => ({
          ...book,
          number: index + 1,
        }));
        console.log(mappedBooks);
        
        setBooks(mappedBooks);
        setAvailableBooks(res.data?.availableBooks);
        setCurrentMonthIncome(res?.data?.currentMonthIncome);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className=" min-w-max min-h-screen lg:pl-72 pt-20 flex gap-4 flex-col md:flex-row">
        <div className="bg-white w-full md:w-[300px] p-2 rounded-md h-auto md:h-[700px] flex flex-col gap-6 justify-center text-[#525256] relative">
          <div className="absolute top-4">
            <p className="font-semibold">This Month Statistics</p>
            <p className="text-sm text-gray-400">Tue, 14 Nov, 2024, 11:30 AM</p>
          </div>

          <div className="shadow-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center bg-white">
              <p className="font-bold text-[#656575]">Income</p>
              <div className="bg-[#F4F5F7] px-2 p-1">This Month</div>
            </div>
            <hr />
            <div>
              <p className="font-bold flex gap-2 text-lg">
                ETB {currentMonthIncome}{" "}
                <span className="text-[#FF2727] flex items-center font-normal text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#FF2727"
                      d="m205.66 149.66l-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32"
                    />
                  </svg>
                  1.5%
                </span>
              </p>
            </div>
            <p className="text-[#656575]">Compared to ETB 9940 last month</p>
            <div className="flex font-bold text-[#525256]">
              <p>Last Month Income</p>
              <p>ETB 25658.00</p>
            </div>
          </div>

          <div className="shadow-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p>Availabele Books</p>
              <p className="px-2 py-1 bg-[#F8F7F1]">Today</p>
            </div>
            <div className="w-full px-2">
              <NewPieChart data={availableBooks} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-3/4 min-h-screen px-6">
          <div className="bg-white w-full h-[51%] rounded-xl">
            <MaterialReactTableAdmin
              columns={columns}
              text="Live Book Status"
              rows={books}
            />
          </div>
          <div className="bg-white w-full h-fit">
            <EarningsSummaryChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
