import * as React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import StatusToggle from "../Toggle";
import axios from "axios";

export default function MaterialReactTableBook({ rows=[], refreshList }) {
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
      accessorKey: "author",
      header: "Author",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row.original.author}</Box>
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
      accessorKey: "category",
      header: "Category",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row.original.category}</Box>
      ),
    },
    {
      accessorKey: "bName",
      header: "Book Name",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row.original.title}</Box>
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
  ];

  return (
    <Paper style={{ height: "82%", width: "100%" }}>
      <Box display="flex" flexDirection="column" padding={2}>
        <Typography variant="h6">List of Books</Typography>
        <Box
          sx={{
            overflow: "auto",
            height: 440,
            ".MuiTableCell-root": {
              padding: "4px 8px",
            },
            ".MuiTableRow-root": {
              borderBottom: "1px solid #ddd",
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
    </Paper>
  );
}


