CREATE TABLE doctor (
  id     uuid,
  username  text,
  doctorid   text,
  name      text,
  hospital text,
  medcouncil text,
  email text,
  created_date timestamp,
  PRIMARY KEY(id)
);

CREATE TABLE doctor_credentials (
  id     uuid,
  username  text,
  password text,
  PRIMARY KEY(username)
);

CREATE TYPE geopoint (
   latitude double,
   longitude double,
);

CREATE TABLE donor (
  donorid   uuid,
  username  text,
  email text,
  mobile_number int,
  blood_group  text,
  state text,
  geolocation geopoint,
  created_date timestamp,
  PRIMARY KEY(donorid)
);

CREATE TABLE donor_by_blood_group (
  donorid   uuid,
  blood_group  text,
  state text,
  email text,
  geolocation geopoint,
  mobile_number int,
  PRIMARY KEY(blood_group, state)
);