import { useState, useEffect } from "react";
import mail from "../assets/mail.png";
import send from "../assets/send.png";
import Button from "@mui/material/Button";
import SendRequest from "../components/SendRequestModal";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useCookies } from "react-cookie";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Reviews() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [cookies, setCookie] = useCookies(["access_token"]);

  const [products, setProducts] = useState();
  const [isProductLoading, setIsProductsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  console.log(products, "state prpd");
  const getProducts = React.useCallback(async () => {
    try {
      setIsProductsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/stores/all-products?email=${userEmail}`
      );
      setProducts(response.data);
      console.log(response.data, "products here");
      setIsProductsLoading(false);
    } catch (err) {
      setIsProductsLoading(false);
      console.log(err);
    }
  }, [userEmail]);
  console.log(isProductLoading, "loading");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserEmail(result.email);
        console.log(result, "result here");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    if (open) {
      fetchData();
    }
    if (userEmail !== "") {
      getProducts();
    }
  }, [cookies.access_token, getProducts, open, userEmail]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
      className="flex flex-col p-5"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // flexDirection: "column",
          // padding: "20px",
        }}
        className="flex justify-between items-center"
      >
        <span
          style={{
            fontSize: "30px",
            color: "#012970",
            fontWeight: "500",
          }}
          className="text-[30px] text-[#012970] font-medium"
        >
          Reviews Overview
        </span>
        <Button
          onClick={() => {
            setOpen(true);
            // getProducts();
          }}
          variant="contained"
          style={{
            backgroundColor: "#FF4495",
          }}
        >
          + New Request
        </Button>
      </div>
      <div className="-mt-2">
        <span
          style={{
            fontSize: "14px",
            color: "gray",
          }}
          className="text-sm text-gray-500"
        >
          Get reviews overview at one place
        </span>
      </div>
      <div
        style={{
          marginTop: "60px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Customer Email</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => ( */}
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  dfgbfvdc
                </TableCell>
                <TableCell align="left">452</TableCell>
                <TableCell align="left">7452</TableCell>
                <TableCell align="left">sdfg</TableCell>
              </TableRow>
              {/* // ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Request a Review
          </Typography>
          <Box display="flex" gap="15px" alignItems="center" marginTop="20px">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Customer Name:
            </Typography>
            <TextField
              placeholder="Enter Customer name"
              id="outlined-basic"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box display="flex" gap="10px" alignItems="center" marginTop="20px">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Customer Email:
            </Typography>
            <TextField
              placeholder="Enter customer email"
              id="outlined-basic"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box display="flex" gap="10px" alignItems="center" marginTop="20px">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Product:
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              style={{
                width: "100%",
              }}
              size="small"
            >
              {isProductLoading ? (
                <Typography>Loading...</Typography>
              ) : products && products.count && products.count === 0 ? (
                <Typography>No Products</Typography>
              ) : (
                products &&
                products.data &&
                products.data.map((item) => {
                  <MenuItem>{item}</MenuItem>;
                })
              )}
            </TextField>
          </Box>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            style={{
              backgroundColor: "#FF4495",
              marginTop: "20px",
              borderRadius: "150px",
            }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
