function donor() {
	const dbClient = require('../middleware/database_connection');
	const { v4: uuidv4 } = require('uuid');


	this.newDonor = (reqObj) => {
		const { name, email, mobilenumber, blood_group, dob, weight, state, latitude, longitude } = reqObj;

		return new Promise((resolve, reject) => {
			dbClient.execute("SELECT * FROM donor WHERE email = ? ", [email], { prepare: true })
		    .then(result => {

			    if(result.rowLength > 0 ) {
			        resolve({ message: "Donor email is already registered" });
			    } else {
			      	dbClient.execute("SELECT * FROM donor_by_number WHERE mobile_number = ? ", [mobilenumber], { prepare: true })
				    .then(mresult => {

					    if(mresult.rowLength > 0 ) {
					        resolve({ message: "Donor mobile number is already registered" });
					    } else {
					        // Create new donor here

					        const id = uuidv4();
					        const geolocation = {
					        	latitude: latitude,
					        	longitude: longitude
					        };
					        const queries = [
				              {
				                query: 'INSERT INTO donor (donorid, name, email, mobile_number, blood_group, date_of_birth, weight, state, geolocation, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, toTimeStamp(now()))',
				                params: [ id, name, email, mobilenumber, blood_group, dob, weight, state, geolocation ]
				              }, {
				                query: 'INSERT INTO donor_by_number (donorid, name, email, mobile_number, blood_group, date_of_birth, weight, state, geolocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
				                params: [ id, name, email, mobilenumber, blood_group, dob, weight, state, geolocation ]
				              }, {
				              	query: 'INSERT INTO donor_by_blood_group (donorid, blood_group, state, email, mobile_number, geolocation) VALUES (?, ?, ?, ?, ?, ?)',
				                params: [ id, blood_group, state, email, mobilenumber, geolocation ]
				              }
				            ];

				            dbClient.batch(queries, { prepare: true })
				            .then(bresult => {
				              resolve({ message: "Donor Created", data: id });
				            })
				            .catch(berror => {
				              console.error("Internal error in donor insertion: " + berror);
				                  reject(berror);
				            });
				        }
				    })
			        .catch(merror => {
				      console.error("Internal error in checking mobile number:" + merror);
				      reject(merror);
				    });
			    }
			})
			.catch(error => {
		      console.error("Internal error in checking email:" + error);
		      reject(error);
		    });
		});
	};
}

module.exports = new donor();