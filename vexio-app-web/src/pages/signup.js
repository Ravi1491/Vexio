import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const [cookies, setCookie] = useCookies(["access_token"]);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    checkbox: false,
  });
  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    checkbox: null,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const isFieldEmpty = (fieldName) => !formData[fieldName].trim();

  const validateForm = () => {
    const newErrors = {
      firstName: isFieldEmpty("firstName") ? "First name is required." : null,
      lastName: isFieldEmpty("lastName") ? "Last name is required." : null,
      username: isFieldEmpty("username") ? "Username is required." : null,
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      checkbox: formData.checkbox ? null : "Checkbox must be checked.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      checkbox: e.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Perform form submission logic here
      try {
        setIsLoading(true);
        // Make a GET request to your backend API
        const postData = {
          firstName: formData.firstName,
          lastName: formData.lastName,

          email: formData.email,
          password: formData.password,
          username: formData.username,
        };
        console.log("post", postData);
        const response = await fetch("http://localhost:4000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          console.log("reeeee", response);
          setErrorMessage("User already exists");
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            checkbox: false,
          });
          throw new Error(`User already exists`);
        }

        const result = await response.json();

        if (result.accessToken !== undefined) {
          setCookie("access_token", result.accessToken, { path: "/" });
          navigate("/access_shopify");
        }
        setIsLoading(false);
        //  setData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setErrorMessage(error.message);

        <Alert severity="error">{error.message}</Alert>;

        setIsLoading(false);
      }

      console.log(formData);
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
        checkbox: formData.checkbox ? null : "Checkbox must be checked.",
      }));
    }
  }, [formData.email, formData.password, formData.checkbox]);

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            id="signup-form"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange("firstName")}
                  value={formData.firstName}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange("lastName")}
                  value={formData.lastName}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleInputChange("username")}
                  value={formData.username}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange("email")}
                  value={formData.email}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange("password")}
                  value={formData.password}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.checkbox}
                      onChange={handleCheckboxChange}
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {console.log(" formData.email", formData.email)}
            <Button
              //   disabled={!isFormValid()}
              // disabled={!validateForm()}
              disabled={
                formData.email === "" ||
                formData.password === "" ||
                formData.firstName === "" ||
                formData.lastName === "" ||
                formData.username === "" ||
                !formData.checkbox ||
                errors.checkbox ||
                errors.email ||
                errors.firstName ||
                errors.lastName ||
                errors.password ||
                errors.username ||
                isLoading
              }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {errorMessage !== null && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
