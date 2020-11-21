const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const router = express.Router();

router.post("/new", (req, res, next) => {
    const { requestid, email, mobilenumber, blood_group, date_of_birth, weight, storeinfo, state, latitude, longitude } = req.body;

    dbClient.execute("SELECT * FROM request WHERE requestid = ? ", [requestid], { prepare: true })
    .then(result => {
    	if(result.rowLength > 0 ) {
    		if(storeinfo) {
    			// Store info
    		}

    		dbClient.execute("INSERT INTO donor_interest (interestid, donorid, requestid, created_date) VALUES (uuid(), ?, ?, dateof(now())", [donorid, requestid], { prepare: true })
    		.then(d_result => {
    			res.send({ message: "Donor interest notified", data: d_result })
    		})
    		.catch(d_error => {
		      console.error("Internal error in inserting interest:" + d_error);
		      return next(d_error);
		    });
    	} else {
    		res.send({ message: "Request is not present" });
    	}
    })
	.catch(error => {
      console.error("Internal error in checking request:" + error);
      return next(error);
    });


});

module.exports = router;