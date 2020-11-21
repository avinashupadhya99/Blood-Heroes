const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const donorMiddleware = require('../middleware/donor');
const router = express.Router();

router.post("/check/email", (req, res, next) => {
	const { email } = req.body;

	dbClient.execute("SELECT * FROM donor WHERE email = ? ", [email], { prepare: true })
    .then(result => {

	    if(result.rowLength > 0 ) {
	        res.send({ message: "Donor exists with that email", donor: result.first() })
	    } else {
	    	res.status(309);
	    	res.send({ message: "No donor with that email" })
	    }
    })
	.catch(error => {
      console.error("Internal error in checking email:" + error);
      reject(error);
    });

});


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
