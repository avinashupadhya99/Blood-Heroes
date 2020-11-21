CREATE TABLE doctor (
  id     uuid,
  username  text,
  doctorid   text,
  name      text,
  hospital text,
  medcouncil text,
  email text,
  created_date timestamp,
  PRIMARY KEY(doctorid, id)
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
  name  text,
  email text,
  mobile_number bigint,
  date_of_birth date,
  weight smallint,
  blood_group  text,
  state text,
  geolocation geopoint,
  created_date timestamp,
  PRIMARY KEY(email)
);

CREATE TABLE donor_by_number (
  donorid   uuid,
  name  text,
  email text,
  mobile_number bigint,
  date_of_birth date,
  weight smallint,
  blood_group  text,
  state text,
  geolocation geopoint,
  PRIMARY KEY(mobile_number)
);

CREATE TABLE donor_by_blood_group (
  donorid   uuid,
  blood_group  text,
  state text,
  email text,
  geolocation geopoint,
  mobile_number bigint,
  PRIMARY KEY(blood_group, state)
);

CREATE TABLE request (
  requestid   uuid,
  doctorid  uuid,
  blood_group  text,
  state text,
  geolocation geopoint,
  doctor_name text,
  remark text,
  created_date timestamp,
  PRIMARY KEY(blood_group, state)
);

CREATE TABLE request_by_doctor (
  requestid   uuid,
  doctorid  uuid,
  blood_group  text,
  state text,
  geolocation geopoint,
  remark text,
  created_date timestamp,
  PRIMARY KEY(doctorid)
);