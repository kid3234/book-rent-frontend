import * as React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusToggle from "../Toggle";
import axios from "axios";

export default function MaterialReactTableOwner({
  rows = [],
  refreshList,
  handleOpensee,
  handleOpenRemove,
  handleOwnerAproval,
}) {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Set initial data from parent
  React.useEffect(() => {
    const updatedRows = rows?.map(({ owner, ...rest }) => ({
      ...rest,
      ownerName: owner?.name,
      ownerImage: owner?.image,
    }));
    setData(updatedRows);
  }, [rows]);

  const fetchData = async (params) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://book-rent-api-2.onrender.com/api/V1/users/owner/filter?${new URLSearchParams(params)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedRows = response.data.map(({ owner, ...rest }) => ({
        ...rest,
        ownerName: owner?.name,
        ownerImage: owner?.image,
      }));
      setData(updatedRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (state) => {
    const filters =
      state?.columnFilters?.map((filter) => ({
        id: filter.id,
        value: filter.value,
      })) || [];

    const sort = state?.sorting?.[0]
      ? { id: state.sorting[0].id, desc: state.sorting[0].desc }
      : null;

    const params = {
      globalFilter: state?.globalFilter || "",
      filters: JSON.stringify(filters),
      sort: JSON.stringify(sort),
    };

    fetchData(params);
  };


  const columns = [
    {
      header: "No.",
      accessorKey: "number",
    },

    {
      accessorKey: "owner",
      header: "Owner",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={row.original.image} alt={row.original.ownerName} />
          <Typography>{row.original.name}</Typography>
        </Box>
      ),
    },
    {
      accessorKey: "booksCount",
      header: "Upload.",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.booksCount}</Box>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.location}</Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ row }) => (
        <StatusToggle
          checked={row.original.status}
          id={row.original.id}
          refreshList={refreshList}
        />
      ),
    },

    {
      accessorKey: "action",
      header: "Action",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <RemoveRedEyeIcon
              onClick={() => handleOpensee(row.original)}
              sx={{ cursor: "pointer" }}
            />
            <DeleteIcon
              sx={{ color: "#FF0000", cursor: "pointer" }}
              onClick={() => handleOpenRemove(row.original)}
            />
          </Box>

          <div
            onClick={() => handleOwnerAproval(row?.original.id)}
            className={
              row.original.approved
                ? "px-6 py-1 rounded  bg-[#00ABFF] text-white cursor-pointer"
                : "px-6 py-1 rounded  bg-[#AFAFAF] text-white cursor-pointer"
            }
          >
            {row.original.approved ? "Approved" : "Approve"}
          </div>
        </Box>
      ),
    },
  ];



  return (
    <Paper style={{ height: "82%", width: "100%" }}>
      <Box display="flex" flexDirection="column" padding={2}>
        <Typography variant="h6">List of Owner</Typography>
        <Box
          sx={{
            overflow: "auto",
            height: 400,
          }}
        >
          <MaterialReactTable
           columns={columns}
           data={data}
           enableColumnOrdering
           enableColumnFiltering
           enableSorting
           isLoading={loading}
           onStateChange={handleTableChange}
          />
        </Box>
      </Box>
    </Paper>
  );
}
