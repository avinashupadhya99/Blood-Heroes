const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const passport = require("passport");
const verify = require("../middleware/users");
const dbClient = require('../middleware/database_connection');
const router = express.Router();

// Login Page
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: 'Invalid username or password.',
  }),
  (req, res) => {
    console.log("Login successful");
    res.send({ message: "authentication successful", user: req.user });
  }
);

// Register Page
router.post("/register", verify, (req, res, next) => {
  if (req.verifyCode !== 200) {
    res.send({ message: "Doctor info can't be verified" });
  } else {
    const { username, password, docId, name, hname, medcouncil, email } = req.body;

    dbClient.execute("SELECT * FROM doctor_credentials WHERE username = ?", [username], { prepare: true })
    .then(result => {

      if(result.rowLength > 0 ) {
        res.send({ message: "Username already exists" });
      } else {
        // Create new user here

        // Hashing Pass
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            const id = uuidv4();
            const newUser = {
              "_id": id,
              "username": username,
              "password": password,
              "docId": docId,
              "name": name,
              "hname": hname,
              "medcouncil": medcouncil,
              "email": email
            };

            const queries = [
              {
                query: 'INSERT INTO doctor (id, username, doctorid, name, hospital, medcouncil, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [ id, username, docId, name, hname, medcouncil, email ]
              }, {
                query: 'INSERT INTO doctor_credentials (id, username, password) VALUES (?, ?, ?)',
                params: [ id, username, hash ]
              }
            ];

            dbClient.batch(queries, { prepare: true })
            .then(result => {
              console.log(result);
              res.send({ message: "New User Created", data: newUser });
            })
            .catch(error => {
              console.error("Internal error:" + error);
                  return next(error);
            });
            
          })
        );
        


      }
    })
    .catch(error => {
      console.error("Internal error:" + error);
      return next(error);
    });
    // User.findOne({ username }).then((user) => {
    //   if (user) {
    //     res.send({ message: "Username already exists" });
    //   } else {
    //     const newUser = new User({
    //       username,
    //       password,
    //       docId,
    //       name,
    //       hname,
    //       medcouncil,
    //     });

    //     // Hashing Pass
    //     bcrypt.genSalt(10, (err, salt) =>
    //       bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) throw err;

    //         newUser.password = hash;
    //         newUser
    //           .save()
    //           .then((user) => {
    //             res.send({ message: "New User Created", data: user });
    //           })
    //           .catch((err) => console.log(err));
    //       })
    //     );
    //   }
    // });
  }
});

module.exports = router;
