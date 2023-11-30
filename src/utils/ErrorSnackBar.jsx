import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, IconButton, Snackbar } from "@mui/material";

const ErrorSnackBar = ({ open, setOpen, Message }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        elevation={6}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {Message}
      </Alert>
    </Snackbar>
  );
};

ErrorSnackBar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  Message: PropTypes.string,
};

export default ErrorSnackBar;
