const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const dbClient = require('./middleware/database_connection');

module.exports = function initializePassport(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username);

      dbClient.execute("SELECT * FROM doctor_credentials WHERE username = ?", [username], { prepare: true })
      .then(async (result) => {
        if(result.rowLength > 0 ) {
          const user = result.first();
          
          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Password Incorrect" });
          }
           return done(null, user);

        } else {
          return done(null, false, { message: "Username Incorrect" });
        }

      })
      .catch(error => {
        console.error("Internal error:" + error);
        return done(err);
      });
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    
    dbClient.execute("SELECT * FROM doctor WHERE id = ?", [id], { prepare: true })
    .then(result => {
      if(result.rowLength > 0 ) {
        const user = result.first();
        
        done(null, user);
      } else {
        done("No user", null);
      }
    })
    .catch(error => {
      done(error, null);
    });

  });
};

/*import { findEmail } from "../DB/tempDB";

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      findEmail(email).then((user) => {
        if (!user) {
          return done(null, false, { message: "Email not registered" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
      //.catch(err=>console.log(err))
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    findEmail();
  });
};
*/
