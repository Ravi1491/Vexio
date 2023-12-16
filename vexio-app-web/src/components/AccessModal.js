import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

const AccessModal = ({ isOpen, onClose }) => {
  const [allowAccess, setAllowAccess] = useState(false);
  const navigate = useNavigate();
  const handleAllowAccess = () => {
    // Perform actions when access is allowed
    // e.g., send a request to the server, update state, etc.
    console.log("Access allowed");
    setAllowAccess(true);
    onClose(); // Close the modal after allowing access
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "800px",
            height: "70%", // Set your width here
          },
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={logo} alt="logo" width={100} height={100} />
          <Box
            sx={{
              width: "50%",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "24px",
              color: "#2d3748",
            }}
          >
            {" "}
            Allow Vexigo to access your Shopify Account?
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            //alignItems: "center",
            flexDirection: "column",
            px: "20%",
          }}
        >
          <p>
            Allow Vexio to access your account for integration. By clicking
            "Allow Access," you agree to the terms and conditions.
          </p>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "#A4A3A4",
            }}
          >
            https://
            <Box sx={{}}>
              <TextField id="outlined-basic" variant="outlined" />
            </Box>
            .myshopify.com
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              py: "32px",
            }}
          >
            <Box sx={{ color: "#FB7D63" }}>
              <Button
                onClick={onClose}
                sx={{
                  color: "white",
                  background: "#FB7D63",
                  ":hover": {
                    background: "#FB7D63",
                  },
                }}
              >
                Yes, Continue to shopify
              </Button>
            </Box>
            <Box sx={{ paddingLeft: "20px" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  color: "#A4A3A4",
                  border: "1px solid #A4A3A4",
                  "&.Mui-selected": {
                    border: "1px solid #A4A3A4",
                  },
                  "&.Mui-focusVisible": {
                    border: "1px solid #A4A3A4",
                  },
                  ":hover": {
                    border: "1px solid #A4A3A4  ",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AccessModal;
