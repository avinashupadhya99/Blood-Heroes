const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const router = express.Router();


router.post("/new", (req, res, next) => {
    const { docId, doctorid, blood_group, state, latitude, longitude, doctor_name, remark } = req.body;

    const id = uuidv4();
    const current_time = Date.now();
    const geolocation = {
    	latitude: latitude,
    	longitude: longitude
    };

    dbClient.execute("SELECT * FROM doctor WHERE doctorid =? AND id = ? ", [docId, doctorid], { prepare: true })
    .then(result => {

	    if(result.rowLength > 0 ) {
	        const queries = [
              {
                query: 'INSERT INTO request (requestid, doctorid, blood_group, state, geolocation, doctor_name, remark, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                params: [ id, doctorid, blood_group, state, geolocation, doctor_name, remark, current_time ]
              }, {
                query: 'INSERT INTO request_by_doctor (requestid, doctorid, blood_group, state, geolocation, remark, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [ id, doctorid, blood_group, state, geolocation, remark, current_time ]
              }
            ];

            dbClient.batch(queries, { prepare: true })
            .then(bresult => {
            	// Query for all donors in 10km range and send notification

              res.send({ message: "Request Created", data: id });
            })
            .catch(berror => {
              console.error("Internal error in query execution: " + berror);
                  return next(berror);
            });
	    } else {
	    	res.send({ message: "Doctor ID is invalid" });
	    }
	})
	.catch(error => {
      console.error("Internal error in verifying doctor:" + error);
      return next(error);
    });

});



module.exports = router;
