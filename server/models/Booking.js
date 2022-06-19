
let mongoose  = require('mongoose')
const bookingSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    dateDuration: {
        type: Number,
        required: true
    }
});
const Booking = mongoose.model('Booking', bookingSchema);

module.exports= Booking