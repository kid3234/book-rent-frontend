import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";
import NewPieChart from "../../../components/PieChart";

import EarningsSummaryChart from "../../../components/lineChart";
import axios from "axios";
import EditBook from "../../../components/EditBook";
import DeletePopup from "../../../components/DeletePopup";
import MaterialReactTableOwnerdashboard from "../../../components/Ownerdashtable";


function OwnewDashboard() {
  const [books, setBooks] = useState([]);
  const [openupdate, setOpenupdate] = useState(false);
  const [book, setBook] = useState(null);
  const [opendelete, Setdelete] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [currentMonthIncome, setCurrentMonthIncome] = useState([]);
  const [lastmontMonthIncome, setLastmontMonthIncome] = useState([]);
  const [incomeGraph,setIncomeGraph] = useState()
  const [incomeComparison,setIncomeComparison] = useState()
  const handleOpenDelete = (data) => {
    Setdelete(true);
    setBook(data);
  };

  const handleCloseDelete = () => {
    Setdelete(false);
    setBook(null);
  };

  const handleOpenupdate = (data) => {
    setOpenupdate(true);
    setBook(data);
  };

  const handleCloseOpenupdate = () => setOpenupdate(false);

  const refreshList = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://book-rent-api-2.onrender.com/api/V1/users/owner/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const mappedBooks = res.data.bookStatusData.map((owner, index) => ({
          ...owner,
          number: index + 1,
        }));
        setBooks(mappedBooks);
        setAvailableBooks(res.data?.availableBooks);
        setCurrentMonthIncome(res?.data?.currentMonthIncome)
        setLastmontMonthIncome(res?.data?.lastMonthIncome)
        setIncomeGraph(res?.data?.incomeGraph)
        setIncomeComparison(res?.data?.incomeComparison)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const date = new Date();


  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short', 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const isIncrease = incomeComparison > 0;
  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className="w-full min-h-screen pl-10 lg:pl-72 pr-4 pt-20 flex flex-col lg:flex-row gap-4">
        <div className="bg-white w-[100%] lg:w-[300px] p-2 rounded-md s:h-fit lg:h-[650px] flex lg:flex-col flex-row gap-4 lg:justify-center justify-between s:px-10 text-[#525256]">
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
                  ETB {currentMonthIncome}{" "}
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
              <p className="text-[#656575]">Compared to ETB {lastmontMonthIncome} last month</p>
              <div className="flex gap-2 font-bold text-[#525256]">
                <p>Last Month Income</p>
                <p>ETB {lastmontMonthIncome}</p>
              </div>
            </div>
          </div>

          <div className="s:w-1/2 w-full shadow-md p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p>Available Books</p>
              <p className="px-2 py-1 bg-[#F8F7F1]">Today</p>
            </div>
            <div className="w-full px-2">
              <NewPieChart data={availableBooks} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-[100%] lg:w-3/4 h-fit px-6">
          <div className="bg-white w-full h-[51%] rounded-xl">
            <MaterialReactTableOwnerdashboard
            
              text="Live Book Status"
              rows={books}
              handleOpenedit={handleOpenupdate}
              handleOpenRemove={handleOpenDelete}
            />
          </div>
          <div className="bg-white w-full h-fit">
            <EarningsSummaryChart incomeGraph={incomeGraph}/>
          </div>
        </div>
      </div>
      <EditBook
        open={openupdate}
        handleClose={handleCloseOpenupdate}
        data={book}
        refreshList={refreshList}
      />

      <DeletePopup
        handleClose={handleCloseDelete}
        open={opendelete}
        data={book}
        refreshList={refreshList}  
      />
    </div>
  );
}

export default OwnewDashboard;
