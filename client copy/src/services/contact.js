import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

 export const postContact = async (fullName, email, subject, message) => {
    return axios.post(`${API_URL}/contact`, {
        fullName,
        email,
        subject,
        message,
    });

}
