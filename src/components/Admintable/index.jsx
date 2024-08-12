import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";

export default function MaterialReactTableAdmin({ rows = [], refreshList }) {
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
          data={updatedRows}
          enableColumnOrdering
          enableColumnFiltering
          enableSorting
        />
      </Box>
    </Box>
  );
}
