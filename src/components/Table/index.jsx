import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import { TableVirtuoso } from "react-virtuoso";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import {
  Avatar,
  Radio,
  FormControlLabel,
  Typography,
  Box,
  IconButton,
  SvgIcon,
  Stack,
  Switch,
} from "@mui/material";
import StatusToggle from "../Toggle";
import SeeMore from "../seeMore";

export default function ReactVirtualizedTable({
  text,
  columns,
  rows,
  handleOpensee,
  handleOpenedit
}) {
  console.log(columns, text);



  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    console.log("here 1", columns);

    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align={"left"}>
            {column.dataKey === "dashstatus" ? (
              <FormControlLabel
                control={
                  <Radio
                    sx={
                      row.availability === "RENTED"
                        ? {
                            "&.Mui-checked": {
                              color: "#FF0000", // Default fill color when checked
                            },
                          }
                        : {
                            "&.Mui-checked": {
                              color: "#00ABFF", // Default fill color when checked
                            },
                          }
                    }
                    checked={true}
                    onClick={console.log("clicked .......",row)}
                  />
                }
                label={row.availability}
              />
            ) : column.dataKey === "action" ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <RemoveRedEyeIcon
                    onClick={() => handleOpensee(row)}
                    sx={{ cursor: "pointer" }}
                  />
                  <DeleteIcon sx={{ color: "#FF0000", cursor: "pointer" }} />
                </Box>

                {/* <Button variant="contained" sx={{boxShadow: 'none'}}>Contained</Button>
                 */}
                <div className="px-6 py-1 rounded  bg-[#00ABFF] text-white">
                  Approved
                </div>
              </Box>
            ) : column.dataKey === "owneraction" ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <EditIcon
                    onClick={() => handleOpenedit(row)}
                    sx={{ cursor: "pointer" }}
                  />
                  <DeleteIcon sx={{ color: "#FF0000" }} />
                </Box>
              </Box>
            ) : column.dataKey === "owner" ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar src={row[column.dataKey].image} />
                <Typography>{row[column.dataKey].email}</Typography>
              </Box>
            ) : column.dataKey === "bName" ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{row.title}</Typography>
              </Box>
            ) : column.dataKey === "bookNo" ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{row.quantity}</Typography>
              </Box>
            ) : column.dataKey === "status" ? (
              <StatusToggle
                checked={row[column.dataKey]}
                label={row[column.dataKey]  ? "Active" : "Disabled"}
                onChange={column.dataKey}
                status={row[column.dataKey]}
                id={row.id}
              />
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  // Handlers for the functionalities
  const handleSearch = () => {
    console.log("Search functionality triggered.");
    // Add search functionality here
  };

  const handleFilterSort = () => {
    console.log("Filter/Sort functionality triggered.");
    // Add filter/sort functionality here
  };

  const handleListViewToggle = () => {
    console.log("List/Grid view toggle triggered.");
    // Add view toggle functionality here
  };

  const handleSettings = () => {
    console.log("Settings functionality triggered.");
    // Add settings functionality here
  };

  return (
    <Paper style={{ height: "82%", width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Typography variant="h6">{text}</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleSearch}>
            <SvgIcon>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              />
            </SvgIcon>
          </IconButton>
          <IconButton onClick={handleFilterSort}>
            <SvgIcon>
              <path d="M9 15.75C9 15.5511 9.07902 15.3603 9.21967 15.2197C9.36032 15.079 9.55109 15 9.75 15H14.25C14.4489 15 14.6397 15.079 14.7803 15.2197C14.921 15.3603 15 15.5511 15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H9.75C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75ZM6 11.25C6 11.0511 6.07902 10.8603 6.21967 10.7197C6.36032 10.579 6.55109 10.5 6.75 10.5H17.25C17.4489 10.5 17.6397 10.579 17.7803 10.7197C17.921 10.8603 18 11.0511 18 11.25C18 11.4489 17.921 11.6397 17.7803 11.7803C17.6397 11.921 17.4489 12 17.25 12H6.75C6.55109 12 6.36032 11.921 6.21967 11.7803C6.07902 11.6397 6 11.4489 6 11.25ZM3 6.75C3 6.55109 3.07902 6.36032 3.21967 6.21967C3.36032 6.07902 3.55109 6 3.75 6H20.25C20.4489 6 20.6397 6.07902 20.7803 6.21967C20.921 6.36032 21 6.55109 21 6.75C21 6.94891 20.921 7.13968 20.7803 7.28033C20.6397 7.42098 20.4489 7.5 20.25 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75Z" />
            </SvgIcon>
          </IconButton>
          <IconButton onClick={handleListViewToggle}>
            <SvgIcon>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75 4L6.75 20H5.25L5.25 4H6.75ZM12.75 4L12.75 20H11.25L11.25 4H12.75ZM18.75 20V4H17.25V20H18.75Z"
              />
              <path d="M6.75 20V21.5H8.25V20H6.75ZM6.75 4H8.25V2.5H6.75V4ZM5.25 20H3.75V21.5H5.25V20ZM5.25 4V2.5H3.75L3.75 4H5.25ZM12.75 20V21.5H14.25V20H12.75ZM12.75 4H14.25V2.5H12.75V4ZM11.25 20H9.75V21.5H11.25V20ZM11.25 4V2.5H9.75V4H11.25ZM18.75 4H20.25V2.5H18.75V4ZM18.75 20V21.5H20.25V20H18.75ZM17.25 4V2.5H15.75V4L17.25 4ZM17.25 20H15.75V21.5H17.25V20ZM8.25 20L8.25 4H5.25L5.25 20H8.25ZM5.25 21.5H6.75V18.5H5.25V21.5ZM3.75 4L3.75 20H6.75L6.75 4H3.75ZM6.75 2.5H5.25L5.25 5.5H6.75L6.75 2.5ZM14.25 20L14.25 4H11.25L11.25 20H14.25ZM11.25 21.5H12.75V18.5H11.25V21.5ZM9.75 4L9.75 20H12.75L12.75 4H9.75ZM12.75 2.5H11.25L11.25 5.5H12.75L12.75 2.5ZM17.25 4V20H20.25V4H17.25ZM17.25 5.5H18.75V2.5H17.25V5.5ZM18.75 20V4L15.75 4L15.75 20H18.75ZM18.75 18.5H17.25V21.5H18.75V18.5Z" />
            </SvgIcon>
          </IconButton>
          <IconButton onClick={handleSettings}>
            <SvgIcon>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 8.75H4V7.25H20V8.75ZM20 12.75H4V11.25H20V12.75ZM4 16.75H20V15.25H4V16.75Z"
              />
            </SvgIcon>
          </IconButton>
        </Stack>
      </Box>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

// function rowContentt(_index, row) {
//   return (
//     <React.Fragment>
//       {columns.map((column) => (
//         <TableCell key={column.dataKey} align={"left"}>
//           {column.dataKey === "action" ? (
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <RemoveRedEyeIcon
//                   onClick={handleOpensee}
//                   sx={{ cursor: "pointer" }}
//                 />
//                 <DeleteIcon sx={{ color: "#FF0000", cursor: "pointer" }} />
//               </Box>
//               <div className="px-6 py-1 rounded bg-[#00ABFF] text-white">
//                 Approved
//               </div>
//             </Box>
//           ) : (
//             row[column.dataKey]
//           )}
//         </TableCell>
//       ))}
//     </React.Fragment>
//   );
// }
