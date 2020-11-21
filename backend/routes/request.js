const express = require("express");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const dbClient = require('../middleware/database_connection');
const distanceCalculator = require('../middleware/distance_calculation');
const notification = require('../middleware/notification');
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
                query: 'INSERT INTO request_by_blood (requestid, doctorid, blood_group, state, geolocation, doctor_name, remark, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                params: [ id, doctorid, blood_group, state, geolocation, doctor_name, remark, current_time ]
              }, {
                query: 'INSERT INTO request_by_doctor (requestid, doctorid, blood_group, state, geolocation, remark, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [ id, doctorid, blood_group, state, geolocation, remark, current_time ]
              }
            ];

            dbClient.batch(queries, { prepare: true })
            .then(bresult => {

            	// Query for all donors in 10km range and send notification
            	dbClient.execute("SELECT * FROM donor_by_blood_group WHERE blood_group = ? AND state = ?", [blood_group, state], { prepare: true })
            	.then(donor_result => {
            		let number_of_donors = 0;
            		donor_result.rows.forEach((donor, index) => {
            			
            			if(distanceCalculator(latitude, longitude, donor.geolocation.latitude, donor.geolocation.longitude) <= 10) {
            				number_of_donors++;
            				notification.sendEmail(donor.email);
            			}
            		});
              		res.send({ message: `Request Created and ${number_of_donors} donor(s) informed`, data: id });

            	})
            	.catch(berror => {
	              console.error("Internal error in query execution: " + berror);
	                  return next(berror);
	            });


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

router.post("/search", (req, res, next) => {
  const { blood_group, state, latitude, longitude } = req.body;

  dbClient.execute("SELECT * FROM request_by_blood WHERE blood_group = ? AND state = ?", [blood_group, state], { prepare: true })
  .then(request_result => {

    let closest_request = [];

    request_result.rows.forEach((request, index) => {
      
      if(distanceCalculator(latitude, longitude, request.geolocation.latitude, request.geolocation.longitude) <= 10) {
        closest_request.push(request);
      }
    });
    res.send({ message: `Found ${closest_request.length} request(s)`, data: closest_request });

  })
  .catch(error => {
    console.error("Internal error in fetching request by blood: " + error);
        return next(error);
  });  

});



module.exports = router;
