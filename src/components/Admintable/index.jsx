import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";

export default function MaterialReactTableAdmin({ rows = [], refreshList }) {


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
        `https://book-rent-api-2.onrender.com/api/V1/books/filterall?${new URLSearchParams(params)}`,
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
      accessorKey: "bookNo",
      header: "Book no.",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.bookNumber}</Box>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={row.original.ownerImage} alt={row.original.ownerName} />
          <Typography>{row.original.ownerName}</Typography>
        </Box>
      ),
    },
    {
      accessorKey: "dashstatus",
      header: "Status.",
      Cell: ({ row }) => (
        <FormControlLabel
          control={
            <Radio
              sx={
                row.original.availability === "RENTED"
                  ? {
                      "&.Mui-checked": {
                        color: "#FF0000",
                      },
                    }
                  : {
                      "&.Mui-checked": {
                        color: "#00ABFF",
                      },
                    }
              }
              checked={true}
              onClick={console.log("clicked .......", row)}
            />
          }
          label={row.original.availability}
        />
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.price}</Box>
      ),
    },
  ];

  

  return (
    <Box display="flex" flexDirection="column" padding={2}>
      <Typography variant="h6">Live Book Status</Typography>
      <Box
        sx={{
          overflow: "auto",
          height: 300,
          ".MuiTableCell-root": {
            padding: "2px 4px", // Adjust padding here
          },
          ".MuiTableRow-root": {
            borderBottom: "1px solid #ddd", // Adjust row border if needed
          },
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
  );
}
