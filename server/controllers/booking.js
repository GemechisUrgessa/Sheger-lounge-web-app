
let Booking = require('../models/Booking')

module.exports.getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getBooking = (req, res) => {
    Booking.findByIdAndRemove(req.params.id, (err, booking) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!booking) {
            return res
                .status(404)
                .json({ success: false, error: `Booking not found` });
        }
        return res.status(200).json({ success: true, data: {} });
    });
}
module.exports.createBooking = async (req, res) => {
    const booking = new Booking({
        bookingDate: req.body.bookingDate,
        userId: req.body.userId,
        roomNumber: req.body.roomNumber,
        totalPrice: req.body.totalPrice,
        paymentStatus: req.body.paymentStatus,
        dateDuration: req.body.dateDuration
    });
    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
            bookingDate: req.body.bookingDate,
            userId: req.body.userId,
            roomNumber: req.body.roomNumber,
            totalPrice: req.body.totalPrice,
            paymentStatus: req.body.paymentStatus,
            dateDuration: req.body.dateDuration

        });
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndRemove(req.params.id);
        res.json(deletedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

