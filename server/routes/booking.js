const express = require('express');
const router = express.Router();
let { createBooking,updateBooking, deleteBooking, getAllBooking, getBooking } = require('../controllers/booking')


router.get('/bookings', getAllBooking);
router.get('/bookings/:id',getBooking);
router.post('/bookings', createBooking);
router.put('/bookings/:id',updateBooking);
router.delete('/bookings/:id', deleteBooking);
module.exports = router