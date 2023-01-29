// Description: This file contains the contact us page of the website
import React, {useState} from 'react';
import { Box, Typography, TextField, Divider, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch } from 'react-redux';
import { contactUs } from '../state/slices/contact';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

const ContactUsPage = () => {
    const [fullName, setFullName] = useState({value: '', errorMessage: ''});
    const [email, setEmail] = useState({value: '', errorMessage: ''});
    const [subject , setSubject] = useState({value: '', errorMessage: ''});
    const [message, setMessage] = useState({value: '', errorMessage: ''});
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

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
      case "subject":
        if (value.length < 10) {
          setSubject({
            value,
            errorMessage: "Subject must be at lest 10 characters long",
          });
        } else {
          setSubject({ value, errorMessage: "" });
          subject.value = value;
        }
        break;
      case "message":
        if (value.length < 40) {
          setMessage({
            value,
            errorMessage: "message must be at least 40 characters",
          });
        } else {
          setMessage({ value, errorMessage: "" });
          message.value = value;
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
  const fromHandler = (e) => {
    e.preventDefault();
    if (
      fullName.value.length === 0 ||
      subject.value.length === 0 ||
      message.value.length === 0 ||
      email.value.length === 0 ||
      fullName.errorMessage.length !== 0 ||
      subject.errorMessage.length !== 0 ||
      message.errorMessage.length !== 0 ||
      email.errorMessage.length !== 0
    ) {
      const variant = "error";
      enqueueSnackbar("Please fill all the fields correctly", { variant });
    } 
    else {
      dispatch(
        contactUs({
        subject: subject.value,
        message : message.value,
        email: email.value,
        fullName: fullName.value,
        enqueueSnackbar,
        navigate,
        })
      );
      
    }
  };
    return (
        <Box sx={{backgroundColor: "rgb(235 235 235)", width: '100%', height: 'content-fit', marginBottom: '4em', position : 'absolute'}}>
            <Box sx={{backgroundColor: 'white', textAlign: 'center', marginTop: '2em', padding: '2em'}}>
                <Typography variant="h5" >
                    Love To Hear From You
                </Typography>
                <Typography variant="h4" >
                    Get <span style={{color: 'blue'}}>In</span> Touch
                </Typography>
                <Typography variant="p" sx={{ ml: 2 }}>
                    If you have any questions or concerns, please feel free to contact us.
                </Typography>
            </Box>
            <Box sx={{display: 'flex', flexWrap: "wrap", gap: "3em", justifyContent: 'center', marginTop: '2em', marginBottom: '4em'}}>
                <Box sx={{backgroundColor: 'white', textAlign: "left", display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30em',height: '20em', margin: '0 1em', padding: '1em'}}>
                    <Box>
                    <Typography sx={{textAlign:'center'}} variant="h4" bold >
                        Our Address
                    </Typography>
                    <p style={{margin:"0 0 0 1.3em"}}><Button><PhoneIcon /></Button>  +251956733424</p>
                    <p style={{margin:"0 0 0 1.3em"}}><Button><EmailIcon /></Button> shegerlounge@gmail.com</p>
                    <p style={{margin:"0 0 0 1.3em"}}><Button><AddLocationAltIcon /></Button> Addis Ababa, Ethiopia</p>
                    <Divider sx={{color : 'black', width: "10em", margin: "2em auto" }} />
                    <Typography sx={{textAlign:'center'}} variant="h4" bold >
                        Social Profile
                    </Typography>
                    <p style={{textAlign:'left'}}><Button><TelegramIcon/></Button> <Button ><InstagramIcon/></Button> <Button ><LinkedInIcon/></Button><Button><FacebookIcon/></Button><Button ><TwitterIcon/></Button></p>
                </Box></Box>
                <Box component="form" sx={{backgroundColor: 'white',  width: '50em', margin: '0 1em', padding: '2em'}}>
                    <Box sx={{ display: "flex", flexDirection: "column", margin: '2em' }}>
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
                    <Box sx={{ display: "flex", flexDirection: "column" , margin: '2em'}}>
                        <TextField
                        onChange={(e) => validator(e.target.name, e.target.value)}
                        error={email.errorMessage}
                        id="email"
                        name="email"
                        value={email.value}
                        label="Email Address"
                        placeholder="Enter your email address"
                        />
                        {email.errorMessage && (
                        <span style={{ color: "red" }}>{email.errorMessage}</span>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" , margin: '2em'}}>
                        <TextField
                        onChange={(e) => validator(e.target.name, e.target.value)}
                        error={subject.errorMessage}
                        id="subject"
                        name="subject"
                        value={subject.value}
                        label="subject"
                        placeholder="Enter your subject "
                        />
                        {subject.errorMessage && (
                        <span style={{ color: "red" }}>{subject.errorMessage}</span>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" , margin: '2em'}}>
                        <TextField
                        onChange={(e) => validator(e.target.name, e.target.value)}
                        error={message.errorMessage}
                        id="message"
                        multiline
                        rows={4}
                        name="message"
                        value={message.value}
                        label="message"
                        placeholder="Enter your message "
                        />
                        {message.errorMessage && (
                        <span style={{ color: "red" }}>{message.errorMessage}</span>
                        )}
                    </Box>
                    <Button onClick={fromHandler} type="submit"sx={{backgroundColor: 'blue', color: 'white', margin: '1em', float: 'right'}} variant="contained">Send Message</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactUsPage;

