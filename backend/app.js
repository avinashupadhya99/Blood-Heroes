const express = require("express");
var cors = require("cors");
var bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

const dbClient = require('./middleware/database_connection');


require("dotenv").config();

const app = express();

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (username) => {
    dbClient.execute("SELECT * FROM doctor_credentials WHERE username = ?", [username], { prepare: true })
    .then(result => {
      if(result.rowLength > 0 ) {
        const user = result.first();
        return user.username === username;
      } else {
        return false;
      }

    })
    .catch(error => {
      return false;
    });
  },
  (id) => {
    dbClient.execute("SELECT * FROM doctor WHERE id = ?", [id], { prepare: true })
    .then(result => {
      if(result.rowLength > 0 ) {
        const user = result.first();
        
        return user.id === id;
      } else {
        return false;
      }
    })
    .catch(error => {
      return false;
    });
  }
);


//const client = new cassandra.Client({
//  contactPoints: ['h1', 'h2'],
//  localDataCenter: 'datacenter1',
//  keyspace: 'ks1'
//});

// Build-in Middlewares
app.use(cors());
app.use(bodyparser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Routes
app.use("/", require("./routes/index"));
app.use("/doctor", require("./routes/doctor"));
app.use("/donor", require("./routes/donor"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on http://localhost:${PORT}`));
