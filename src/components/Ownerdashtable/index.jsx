import * as React from "react";
import { Box, Typography, Radio, FormControlLabel } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function MaterialReactTableOwnerdashboard({
  rows = [],

  handleOpenedit,
  handleOpenRemove,
}) {
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

  const updatedRows = rows.map(({ owner, ...rest }) => ({
    ...rest,
    ownerName: owner?.name,
    ownerImage: owner?.image,
  }));

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
          data={updatedRows}
          enableColumnOrdering
          enableColumnFiltering
          enableSorting
        />
      </Box>
    </Box>
  );
}
