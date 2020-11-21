const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
  console.log("inside verify", req.body);
  let FETCH_NUMBER = 1;
  const BASE_URL =
    "https://www.nmc.org.in/MCIRest/open/getPaginatedData?service=getPaginatedDoctor&order=asc&start=0&length=";

  const response = await fetch(
    BASE_URL + FETCH_NUMBER + "&registrationNo=" + req.body.docId,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());

  FETCH_NUMBER = response.recordsFiltered;

  const fullResponse = await fetch(
    BASE_URL + FETCH_NUMBER + "&registrationNo=" + req.body.docId,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
  //console.log(fullResponse);

  const findDoc = fullResponse.data.find(
    (item) => item[2] === req.body.docId && item
  );
  if (findDoc) {
    console.log(findDoc);
    if (
      findDoc[3] === req.body.medcouncil &&
      findDoc[4].includes(req.body.name)
    ) {
      req.verifyCode = 200;
    } else {
      req.verifyCode = 206;
    }
  } else {
    req.verifyCode = 404;
  }

  next();
};
