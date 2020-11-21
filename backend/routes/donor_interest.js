const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const notification = require('../middleware/notification');
const router = express.Router();

router.post("/new", (req, res, next) => {
    const { requestid, donorid, blood_group, doctor_email } = req.body;

    dbClient.execute("SELECT * FROM request WHERE requestid = ? ", [requestid], { prepare: true })
    .then(result => {
    	if(result.rowLength > 0 ) {
    		dbClient.execute("INSERT INTO donor_interest (interestid, donorid, requestid, created_date) VALUES (uuid(), ?, ?, dateof(now())", [donorid, requestid], { prepare: true })
    		.then(d_result => {

                notification.sendEmail(doctor_email, `Urgent ${blood_group} blood required`, `Dear Donor,\nThere is a ${blood_group} blood requirement at ${hospital}. Please contact ${doctor_name} at ${doctor_email}.\nRegards,\nBlood Heroes`);

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