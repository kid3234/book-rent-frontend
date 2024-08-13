import * as React from "react";
import { Box, Typography, Radio, FormControlLabel } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

export default function MaterialReactTableOwnerdashboard({
  rows = [],

  handleOpenedit,
  handleOpenRemove,
}) {



  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


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
        `https://book-rent-api-2.onrender.com/api/V1/books/filter?${new URLSearchParams(params)}`,
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
      accessorKey: "bName",
      header: "Book Name",
      Cell: ({ row }) => <Typography>{row.original.title}</Typography>,
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

    {
      accessorKey: "owneraction",
      header: "Action",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <EditIcon
              onClick={() => handleOpenedit(row)}
              sx={{ cursor: "pointer" }}
            />
            <DeleteIcon
              sx={{ color: "#FF0000", cursor: "pointer" }}
              onClick={() => handleOpenRemove(row)}
            />
          </Box>
        </Box>
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
