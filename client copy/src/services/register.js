// Description: This file contains the function that sends a post request to the server to register a new user
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

// create function that takes in a phoneNumber , email, password, location and fullName and sends a post request to the server
// return response if successful and error if error
export const register = async (
  phoneNumber,
  email,
  password,
  location,
  fullName
) => {
  const data = {
    phoneNumber,
    email,
    password,
    location,
    fullName,
  };
  const serializedData = JSON.stringify(data);
  console.log(API_URL, phoneNumber, password, location, fullName);
  return axios.post(`${API_URL}/user/signup`, serializedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
