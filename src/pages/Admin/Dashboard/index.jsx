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
  const [lastmontMonthIncome, setLastmontMonthIncome] = useState([]);
  const [incomeGraph, setIncomeGraph] = useState();
  const [incomeComparison,setIncomeComparison] = useState()
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://book-rent-api-2.onrender.com/api/V1/users/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const mappedBooks = res.data.bookStatusData.map((book, index) => ({
          ...book,
          number: index + 1,
        }));
        console.log(mappedBooks);

        setBooks(mappedBooks);
        setAvailableBooks(res.data?.availableBooks);
        setCurrentMonthIncome(res?.data?.currentMonthIncome);
        setLastmontMonthIncome(res?.data?.lastMonthIncome);
        setIncomeGraph(res?.data?.incomeGraph);
        setIncomeComparison(res?.data?.incomeComparison)
      })
      .catch((err) => {});
  }, []);

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

 
  const isIncrease = incomeComparison > 0;

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className=" w-full min-h-screen pl-10 lg:pl-72 pr-4 pt-20 flex gap-4 flex-col md:flex-row">
        <div className="bg-white w-full lg:w-[300px] p-2 rounded-md s:h-fit lg:h-[650px] flex flex-col gap-10 justify-center text-[#525256] ">
          <div className="h-fit flex flex-col gap-6 pt-2">
            <div className="w-full flex flex-col px-2 align-middle">
              <p className="font-semibold">This Month Statistics</p>
              <p className="text-sm text-gray-400">
                {`${formattedDate}, ${formattedTime}`}
              </p>
            </div>

            <div className="w-full shadow-md p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center bg-white ">
                <p className="font-bold text-[#656575]">Income</p>
                <div className="bg-[#F4F5F7] px-2 p-1">This Month</div>
              </div>
              <hr />
              <div>
                <p className="font-bold flex gap-2 text-lg">
                  ETB { currentMonthIncome}{" "}
                 
                    <span
                      className={`flex items-center font-normal text-sm ${
                        isIncrease ? "text-[#00FF00]" : "text-[#FF2727]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill={isIncrease ? "#00FF00" : "#FF2727"}
                          d={
                            isIncrease
                              ? "M50.34 106.34l72-72a8 8 0 0 1 11.32 0l72 72a8 8 0 0 1-11.32 11.32L136 59.31V216a8 8 0 0 1-16 0V59.31L61.66 117.66a8 8 0 0 1-11.32-11.32z"
                              : "m205.66 149.66l-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32z"
                          }
                        />
                      </svg>
                      {`${Math.abs(incomeComparison?.toFixed(2))}%`}
                    </span>
              
                </p>
              </div>
              <p className="text-[#656575]">
                Compared to ETB {lastmontMonthIncome} last month
              </p>
              <div className="flex gap-2 font-bold text-[#525256]">
                <p>Last Month Income</p>
                <p>ETB {lastmontMonthIncome} </p>
              </div>
            </div>
          </div>

          <div className="shadow-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p>Availabele Books</p>
              <p className="px-2 py-1 bg-[#F8F7F1]">Today</p>
            </div>
            <div className="w-full px-4">
              <NewPieChart data={availableBooks} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-[100%] lg:w-3/4 h-fit px-2">
          <div className="bg-white w-full h-[51%] rounded-xl">
            <MaterialReactTableAdmin text="Live Book Status" rows={books} />
          </div>
          <div className="bg-white  w-full h-fit">
            <EarningsSummaryChart incomeGraph={incomeGraph} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
