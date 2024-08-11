import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Sidebar";
import NaveBar from "../../../components/NaveBar";

import NewPieChart from "../../../components/PieChart";
import ReactVirtualizedTable from "../../../components/Table";
import EarningsSummaryChart from "../../../components/lineChart";
import axios from "axios";
import EditBook from "../../../components/EditBook";
import DeletePopup from "../../../components/DeletePopup";

function OwnewDashboard() {
  const [books, setBooks] = useState();
  const [openupdate, setOpenupdate] = useState(false);
  const [book, setBook] = useState();
  const [opendelete, Setdelete] = useState(false);
  const [availableBooks, setAvailableBooks] = useState();
  const handleOpenDelete = (data) => {
    console.log("oiuytrewq", opendelete);

    Setdelete(true);
    setBook(data);
  };

  const handleCloseDelete = () => {
    Setdelete(false);

    console.log("asdfghjkl", opendelete);
  };

  const handleOpenupdate = (data) => {
    console.log("edit data", data);

    setOpenupdate(true);
    setBook(data);
  };
  const handleCloseOpenupdate = () => setOpenupdate(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://book-rent-api-4.onrender.com/api/V1/users/owner/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const mappedBooks = res.data.bookStatusData.map((owner, index) => ({
          ...owner,
          number: index + 1,
        }));
        setBooks(mappedBooks);
        console.log("data available", res.data?.availableBooks);

        setAvailableBooks(res.data?.availableBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { width: 50, label: "No.", dataKey: "number" },
    { width: 80, label: "Book no.", dataKey: "bookNo" },
    { width: 120, label: "Book Name", dataKey: "bName" },
    { width: 120, label: "Status", dataKey: "dashstatus" },
    { width: 100, label: "Price", dataKey: "price" },
    { width: 100, label: "Action", dataKey: "owneraction" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F0F2FF]">
      <SideBar />
      <NaveBar />
      <div className="w-full min-h-screen pl-10 lg:pl-72 pr-4 pt-20 flex flex-col lg:flex-row gap-4">
        <div className="bg-white w-[100%] lg:w-[300px] p-2 rounded-md sm-h-fit lg:h-[660px] flex lg:flex-col flex-row gap-6 lg:justify-center justify-between sm:px-10 text-[#525256] relative">
          <div className="h-1/2 flex flex-col gap-10 pt-6">
            <div className="">
              <p className="font-semibold">This Month Statistics</p>
              <p className="text-sm text-gray-400">
                Tue, 14 Nov, 2024, 11:30 AM
              </p>
            </div>

            <div className="shadow-md p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center bg-white ">
                <p className="font-bold text-[#656575]">Income</p>
                <div className="bg-[#F4F5F7] px-2 p-1">This Month</div>
              </div>
              <hr />
              <div>
                <p className="font-bold flex gap-2 text-lg">
                  ETB 9460.00{" "}
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
          </div>

          <div className="s:w-1/2 shadow-md p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p>Availabele Books</p>
              <p className="px-2 py-1 bg-[#F8F7F1]">Today</p>
            </div>
            <div className="w-full px-2">
              <NewPieChart data={availableBooks} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[100%] lg:w-3/4 min-h-screen px-6">
          <div className="bg-white w-full h-[51%] rounded-xl">
            <ReactVirtualizedTable
              columns={columns}
              text="Live Book Status"
              rows={books}
              handleOpenedit={handleOpenupdate}
              handleOpenRemove={handleOpenDelete}
            />
          </div>
          <div className="bg-white w-full h-fit">
            <EarningsSummaryChart />
          </div>
        </div>
      </div>
      <EditBook
        open={openupdate}
        handleClose={handleCloseOpenupdate}
        data={book}
      />

      <DeletePopup
        handleClose={handleCloseDelete}
        open={opendelete}
        data={book}
      />
    </div>
  );
}

export default OwnewDashboard;
