// Description: This file contains the signup page component
import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import img from "../assets/images/My.jpg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {  useDispatch } from "react-redux";
import {  registerUser } from "../state/slices/register";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";



const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState({ value: "", errorMessage: "" });
  const [location, setLocation] = useState({ value: "", errorMessage: "" });
  const [phoneNumber, setPhoneNumber] = useState({
    value: "+251",
    errorMessage: "",
  });
  const [password, setPassword] = useState({ value: "", errorMessage: "" });
  const [email, setEmail] = useState({ value: "", errorMessage: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // handle phone number change
  const handlePhone = (newPhone) => {
    // validate the phone number using the matchIsValidTel function
    // check the documentation for more info https://www.npmjs.com/package/mui-tel-input
    //  if the phone number is valid set the value to the state
    //  else set the error message to the state
    if (matchIsValidTel(newPhone)) {
      setPhoneNumber({ value: newPhone, errorMessage: "" });
    } else {
      setPhoneNumber({
        value: newPhone,
        errorMessage: "Phone number is not valid",
      });
    }
  };
  // validator function to validate the form filed
  //  if all filed valid sets to values to the state
  //  else set the error message to the state
  const validator = (name, value) => {
    switch (name) {
      case "fullName":
        if (value.length < 3) {
          setFullName({
            value,
            errorMessage: "Full name must be at least 3 characters",
          });
        } else {
          setFullName({ value, errorMessage: "" });
          fullName.value = value;
        }
        break;
      case "location":
        if (value.length < 3) {
          setLocation({
            value,
            errorMessage: "Location must be at least 3 characters",
          });
        } else {
          setLocation({ value, errorMessage: "" });
          location.value = value;
        }
        break;
      case "password":
        if (value.length < 8) {
          setPassword({
            value,
            errorMessage: "Password must be at least 8 characters",
          });
        } else {
          setPassword({ value, errorMessage: "" });
          password.value = value;
        }
        break;
      case "email":
        // email validation using regex
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(value)) {
          setEmail({ value, errorMessage: "Email is not valid" });
        } else {
          setEmail({ value, errorMessage: "" });
          email.value = value;
        }
        break;
      default:
        break;
    }
  };
  // from handler which checks if every filed is valid or not
  // if valid then send the data to the server
  // else show the error message
  const fromHandler = () => {
    if (
      fullName.value.length === 0 ||
      location.value.length === 0 ||
      phoneNumber.value.length === 0 ||
      password.value.length === 0 ||
      email.value.length === 0 ||
      fullName.errorMessage.length !== 0 ||
      location.errorMessage.length !== 0 ||
      phoneNumber.errorMessage.length !== 0 ||
      password.errorMessage.length !== 0 ||
      email.errorMessage.length !== 0
    ) {
      const variant = "error";
      enqueueSnackbar("Please fill all the fields correctly", { variant });
    } 
    else {
      dispatch(
        registerUser({
          phoneNumber: phoneNumber.value,
          password: password.value,
          email: email.value,
          fullName: fullName.value,
          location: location.value,
          enqueueSnackbar,
          navigate,
        })
      );
      
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack
      direction="row"
      sx={{ flexWrap: "wrap", gap: 2, margin: "2em", marginTop: "8em" }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box component="from" sx={{ maxWidth: "60em" }}>
        <h1 style={{ fontSize: "4em" }}>Create Account</h1>
        <p>Sheger lounge. A place where feels like home.</p>
        <Box
          sx={{
            display: "flex",
            marginTop: "4em",
            gap: "1em",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => validator(e.target.name, e.target.value)}
              error={fullName.errorMessage}
              id="fullName"
              name="fullName"
              value={fullName.value}
              label="Full Name"
              placeholder="Enter your full name"
            />
            {fullName.errorMessage && (
              <span style={{ color: "red" }}>{fullName.errorMessage}</span>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => validator(e.target.name, e.target.value)}
              error={location.errorMessage}
              id="location"
              name="location"
              value={location.value}
              label="Location"
              placeholder="Enter your location"
            />
            {location.errorMessage && (
              <span style={{ color: "red" }}>{location.errorMessage}</span>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            flexWrap: "wrap",
            margin: "1.3em 0",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => validator(e.target.name, e.target.value)}
              error={email.errorMessage}
              id="email"
              name="email"
              value={email.value}
              label="Email"
              placeholder="Enter your email"
            />
            {email.errorMessage && (
              <span style={{ color: "red" }}>{email.errorMessage}</span>
            )}{" "}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MuiTelInput
              forceCallingCode
              value={phoneNumber.value}
              onChange={handlePhone}
            />
            {phoneNumber.errorMessage && (
              <span style={{ color: "red" }}>Country code error</span>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl
            sx={{ width: "100%", marginTop: "1em" }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              onChange={(e) => validator(e.target.name, e.target.value)}
              fullWidth
              error={password.errorMessage}
              name="password"
              id="password"
              value={password.value}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {password.errorMessage && (
            <span style={{ color: "red" }}>{password.errorMessage}</span>
          )}
        </Box>
        <Button
          sx={{ marginTop: "2em", width: "10em", height: "6em" }}
          variant="contained"
          onClick={fromHandler}
        >
          Sign Up
        </Button>
      </Box>
      <Box sx={{ width: "30em", height: "20em" }}>
        <p
          style={{
            position: "absolute",
            zIndex: 3,
            width: "20em",
            margin: "1em 0 0 1em",
          }}
        >
          Already have an account? <Button variant="contained">Login</Button>
        </p>
        <img
          src={img}
          alt="img"
          style={{
            width: 500,
            height: 600,
            position: "absolute",
            filter: "contrast(50%)",
          }}
        />
      </Box>
    </Stack>
  );
};

export default SignUpPage;
