const { body, validationResult } = require("express-validator");

// Validation middleware for ride creation
exports.validateCreateRide = [
  body("pickupLocation.lat").isNumeric().withMessage("Pickup location latitude must be a number."),
  body("pickupLocation.long").isNumeric().withMessage("Pickup location longitude must be a number."),
  body("pickupLocation.address").notEmpty().withMessage("Pickup location address is required."),
  body("dropLocation.lat").isNumeric().withMessage("Drop location latitude must be a number."),
  body("dropLocation.long").isNumeric().withMessage("Drop location longitude must be a number."),
  body("dropLocation.address").notEmpty().withMessage("Drop location address is required."),
  body("passengerName").notEmpty().withMessage("Passenger name is required."),
  body("numberOfPassengers").isInt({ min: 1 }).withMessage("Number of passengers must be at least 1."),
];

// Validation middleware for ride update
exports.validateUpdateRide = [
  body("pickupLocation.lat").optional().isNumeric().withMessage("Pickup location latitude must be a number."),
  body("pickupLocation.long").optional().isNumeric().withMessage("Pickup location longitude must be a number."),
  body("pickupLocation.address").optional().notEmpty().withMessage("Pickup location address is required."),
  body("dropLocation.lat").optional().isNumeric().withMessage("Drop location latitude must be a number."),
  body("dropLocation.long").optional().isNumeric().withMessage("Drop location longitude must be a number."),
  body("dropLocation.address").optional().notEmpty().withMessage("Drop location address is required."),
  body("passengerName").optional().notEmpty().withMessage("Passenger name is required."),
  body("numberOfPassengers").optional().isInt({ min: 1 }).withMessage("Number of passengers must be at least 1."),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};
