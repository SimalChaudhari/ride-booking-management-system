// ride.model.js
const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    pickupLocation: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    dropLocation: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    passengerName: {
        type: String,
        required: true,
    },
    numberOfPassengers: {
        type: Number,
        required: true,
        min: 1,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
