import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CookiesProvider, useCookies } from "react-cookie";
import StoreTable from "../components/StoreTable";
import AccessModal from "../components/AccessModal";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Vexio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    email: null,
    password: null,
  });

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Perform form submission logic here
      console.log("form", formData);

      try {
        // Make a GET request to your backend API
        const postData = {
          email: formData.email,
          password: formData.password,
        };

        const response = await fetch("http://localhost:4000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("111SSSSTTresponse", result.user.email);

        const response1 = await fetch(
          `http://localhost:4000/stores/getAllStores?email=${result.user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed
            },
          }
        );

        if (!response1.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
        }

        const storesData = await response1.json();
        console.log("Get All Stores response:", storesData);
        navigate("/access_shopify");
        setCookie("access_token", result.accessToken, { path: "/" });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log("Form submission prevented due to validation errors.");
    }
  };

  function validateEmail(email) {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    } else {
      return null; // No validation error
    }
  }

  // Function to validate the password
  function validatePassword(password) {
    // Implement your password validation logic here
    // For example, check if the password meets certain criteria
    if (!password.trim()) {
      return "Password is required.";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else {
      return null; // No validation error
    }
  }

  const handleInputChange = (fieldName) => (e) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (formData.email !== "" && formData.password !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
      }));
    }
  }, [formData.email, formData.password]);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange("email")}
              value={formData.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange("password")}
              value={formData.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.checkbox}
                      onChange={handleCheckboxChange}
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Remember me"
                /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                formData.email === "" ||
                formData.password === "" ||
                errors.email ||
                errors.password
              }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
