const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const donorMiddleware = require('../middleware/donor');
const router = express.Router();

// This request is for the voluntary form filled at the end of the donor page
router.post("/register", (req, res, next) => {
    const { name, email, mobilenumber, blood_group, dob, weight, state, latitude, longitude } = req.body;

    donorMiddleware.newDonor(req.body)
    .then(response => {
    	res.send(response);
    })
    .catch(err => {
    	return next(err);
    });
});



module.exports = router;
