// Description: This component is the login page of the application
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
// this function is used to login a user
export const login = async (phoneNumber, password) => {
    return axios.post(`${API_URL}/user/login`, {
        phoneNumber,
        password,
    });
};
