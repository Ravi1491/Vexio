import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import MuiAlert from "@mui/material/Alert";

import logo from "../assets/logo.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccessModal = ({ isOpen, onClose }) => {
  const [storeName, setStoreName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onClickHandler = async () => {
    console.log("val", storeName, responseData.email);

    try {
      // Make a GET request to your backend API
      setIsLoading(true);
      console.log("responseData", responseData.email);
      const response = await fetch(
        `http://localhost:4000/shopify/install?shop=${storeName}&&email=${responseData.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      window.location.href = result.authUrl;
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // setErrorMessage(error.message);

      <Alert severity="error">{error.message}</Alert>;

      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Function to call API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies.access_token}`,
            // Add any additional headers if needed
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Update state with API response
        setResponseData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        <Alert severity="error">{error.message}</Alert>;
        // Handle the error as needed
      }
    };

    // Call the API when the component mounts
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log("responseData", responseData, storeName);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "800px",
            height: "100%", // Set your width here
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
            Allow Vexio to access your Shopify Account?
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
            //px: "20%",
            px: "48px",
          }}
        >
          <Typography align="justify">
            Enter your Shopify username
            <span style={{ color: "#5CCDFB" }}>
              {" "}
              https://username.myshopify.com/{" "}
            </span>
            even if you use a custom domain like https://name-of-shop.com/. By
            using the Shopify app, you will be able to connect your Vexio
            account with your Shopify merchant account. As a reminder, your use
            of any Shopify services, including through Vexio, is subject to
            Shopify's terms, conditions, and other policies, including, among
            others, the Terms of Service located at Shopify Terms of Service
            and/or any other terms that you have agreed to with Shopify.
          </Typography>

          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#A4A3A4",
              p: "24px",
            }}
          >
            https://
            <Box sx={{}}>
              <TextField
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                id="outlined-basic"
                variant="outlined"
              />
            </Box>
            .myshopify.com
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: "32px",
            }}
          >
            <Box sx={{ color: "#FB7D63" }}>
              <Button
                onClick={onClickHandler}
                disabled={!(storeName.length > 1)}
                sx={{
                  color: "white",
                  background: "#FB7D63",
                  ":hover": {
                    background: "#FB7D63",
                  },
                }}
              >
                {isLoading ? "Connecting..." : "Yes, Continue to shopify"}
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
