// ride.controller.js
const Ride = require("../models/ride.model");
const User = require("../models/user.model");

// Create a new ride
exports.createRide = async (req, res) => {
    const { pickupLocation, dropLocation, passengerName, numberOfPassengers } =
        req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const ride = new Ride({
            pickupLocation,
            dropLocation,
            passengerName,
            numberOfPassengers,
            user: user._id,
        });

        await ride.save();
        res.status(201).json({ message: "Ride booked successfully.", ride });
    } catch (err) {
        res.status(500).json({ message: "Failed to book the ride.", error: err });
    }
};

// Update a ride
exports.updateRide = async (req, res) => {
    const rideId = req.params.id;
    const { pickupLocation, dropLocation, passengerName, numberOfPassengers } =
        req.body;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        ride.pickupLocation = pickupLocation;
        ride.dropLocation = dropLocation;
        ride.passengerName = passengerName;
        ride.numberOfPassengers = numberOfPassengers;

        await ride.save();
        res.status(200).json({ message: "Ride updated successfully.", ride });
    } catch (err) {
        res.status(500).json({ message: "Failed to update the ride.", error: err });
    }
};

// Delete a ride
exports.deleteRide = async (req, res) => {
    const rideId = req.params.id;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        await ride.remove();
        res.status(200).json({ message: "Ride deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete the ride.", error: err });
    }
};

// Complete a ride
exports.completeRide = async (req, res) => {
    const rideId = req.params.id;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        ride.completed = true;
        await ride.save();
        res.status(200).json({ message: "Ride completed successfully.", ride });
    } catch (err) {
        res.status(500).json({ message: "Failed to complete the ride.", error: err });
    }
};

// Get a single ride
exports.getRide = async (req, res) => {
    const rideId = req.params.id;

    try {
        const ride = await Ride.findById(rideId).populate("user", "-password");
        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        res.status(200).json({ ride });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve the ride.", error: err });
    }
};

// Get all rides with filtering and sorting options
exports.getAllRides = async (req, res) => {
    try {
        const { status, sortBy, sortOrder } = req.query;

        // Create a filter object based on the provided criteria
        const filter = { user: req.userId };
        if (status) {
            filter.status = status;
        }

        // Create a sort object based on the provided criteria
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const rides = await Ride.find(filter)
            .sort(sort)
            .populate("user", "-password");

        res.status(200).json({ rides });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve rides.", error: err });
    }
};

// Duplicate a ride
exports.duplicateRide = (req, res) => {
    const { id } = req.params;
    Ride.findById(id, (err, ride) => {
        if (err) {
            return res.status(500).json({ message: "Error finding ride" });
        }
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        const duplicatedRide = new Ride({
            pickupLocation: ride.pickupLocation,
            dropLocation: ride.dropLocation,
            passengerName: ride.passengerName,
            numberOfPassengers: ride.numberOfPassengers,
            user: req.userId,
            completed: ride.completed,
        });

        duplicatedRide.save((err, savedRide) => {
            if (err) {
                console.log({ err });
                return res.status(500).json({ message: "Error duplicating ride" });
            }

            res.status(200).json({ message: "Ride duplicated successfully", ride: savedRide });
        });
    });
};
