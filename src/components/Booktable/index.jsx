import * as React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

import StatusToggle from "../Toggle";

export default function MaterialReactTableBook({ rows = [], refreshList }) {
  const columns = [
    {
      header: "No.",
      accessorKey: "number",
    },

    {
      accessorKey: "author",
      header: "Author",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.author}</Box>
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
      header: "Category.",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.category}</Box>
      ),
    },
    {
      accessorKey: "bName",
      header: "Book Name",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2 }}>{row?.original.title}</Box>
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

  const updatedRows = rows.map(({ owner, ...rest }) => ({
    ...rest,
    ownerName: owner?.name,
    ownerImage: owner?.image,
  }));

  return (
    <Paper style={{ height: "82%", width: "100%" }}>
      <Box display="flex" flexDirection="column" padding={2}>
        <Typography variant="h6">List of Books</Typography>
        <Box
          sx={{
            overflow: "auto",
            height: 440,
            ".MuiTableCell-root": {
              padding: "4px 8px", // Adjust padding here
            },
            ".MuiTableRow-root": {
              borderBottom: "1px solid #ddd", // Adjust row border if needed
            },
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={updatedRows}
            enableColumnOrdering
            enableColumnFiltering
            enableSorting
          />
        </Box>
      </Box>
    </Paper>
  );
}
