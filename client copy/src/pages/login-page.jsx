// Description: This component is the login page of the application
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
import { useSelector, useDispatch } from "react-redux";
import {  loginUser } from "../state/slices/login";
import { useSnackbar } from "notistack";
import {useNavigate, useLocation } from "react-router";

const LogInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState({ value: "", errorMessage: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
//   const { isRegistered } = useSelector((state) => state.register);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumberParam = searchParams.get("phoneNumber");
  const { enqueueSnackbar } = useSnackbar();
  console.log(phoneNumberParam.slice(0,3))
    const [phoneNumber, setPhoneNumber] = useState({
        value: phoneNumberParam[0] === "+" ? `+1${phoneNumberParam.slice(1)}` : `+251${phoneNumberParam.slice(4)}`,
        errorMessage: "",
    });
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
      default:
        break;
    }
  };
  // from handler which checks if every filed is valid or not
  // if valid then send the data to the server
  // else show the error message
  const fromHandler = () => {
    if (
      phoneNumber.value.length === 0 ||
      password.value.length === 0 ||
      phoneNumber.errorMessage.length !== 0 ||
      password.errorMessage.length !== 0 
    ) {
      const variant = "error";
      enqueueSnackbar("Please fill all the fields correctly", { variant });
    } else {
      dispatch(
        loginUser({
          phoneNumber: phoneNumber.value,
          password: password.value,
          enqueueSnackbar,
          navigate,
        })
      );
  };
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
        <h1 style={{ fontSize: "4em" }}>Login to Your Account</h1>
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
            <MuiTelInput
            InputProps={{
       style: {
           width: '43em'
       }
   }}
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
          Log IN
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
          Don't have an account? <Button variant="contained">SIgn UP</Button>
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


export default LogInPage;
