
// Description: This file is the entry point of the application
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const auth = require('./routes/auth');
const booking = require('./routes/booking')
const contact = require('./routes/contact')

dotenv.config();
db();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use('/bookApi',booking)
app.use('/user', auth);
// use contact route for contact form
app.use('/', contact);

