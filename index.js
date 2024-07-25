const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./backend/config/database");
const Keys = require("./backend/keys/keys");
// let job = require("./services/common.services");

const indexRoute = require("./backend/v1/router/index.route");
const port = Keys.PORT || 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const { sendResponse } = require("./backend/services/common.services");
const constants = require("./backend/config/constants");

// applied cors on specific origin - environment wise
app.use(cors({ options: Keys.SERVER_CONFIG }));
app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Get api call" });
});

// Catch-all route handler for 404 errors
app.use((req, res, next) => {
  return sendResponse(
    res,
    constants.WEB_STATUS_CODE.NOT_FOUND,
    constants.STATUS_CODE.NOT_FOUND,
    "GENERAL.ROUTE_NOT_FOUND",
    null,
    req.headers.lang
  );
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
