import * as React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusToggle from "../Toggle";

export default function MaterialReactTableOwner({
  rows = [],
  refreshList,
  handleOpensee,
  handleOpenRemove,
  handleOwnerAproval,
}) {
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
            data={rows}
            enableColumnOrdering
            enableColumnFiltering
            enableSorting
          />
        </Box>
      </Box>
    </Paper>
  );
}
