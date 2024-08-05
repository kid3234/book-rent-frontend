import React from "react";
import Button from "@mui/material/Button";
import AddBook from "../../../components/AddBook";

function BookUpload() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1>Book Upload</h1>
      <Button onClick={handleOpen}>Open modal</Button>
      <AddBook open={open} handleClose={handleClose} />
    </div>
  );
}

export default BookUpload;
