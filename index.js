const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");

/**
 * The latest published version.
 */
const LATEST_VERSION = process.env.LATEST_VERSION;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const undefinedEnvVars = [];

/**
 * Ensure that the environmental variables are not defined.
 */
function checkEnvironmentalVariables() {
  if (!LATEST_VERSION) undefinedEnvVars.push(LATEST_VERSION);
  if (!SALT_ROUNDS) undefinedEnvVars.push(SALT_ROUNDS);
  if (undefinedEnvVars.length > 0) {
    throw new Error(
      `The following environment variables are not defined: ${undefinedEnvVars.join(
        ","
      )}`
    );
  }
}

checkEnvironmentalVariables();

/*
PSEUDO CODE
{
  hasUpdates: false
}
{
  hasUpdates: true,
  latest: 0.4.9,
  releasePage: https://docs.theatrejs.com/releases/0.4.9
}

psuedocode:
latestVersion = process.env.LATEST_VERSION

app.get('/theatre/:version') {
  if (version !== latestVersion) say 'we got new version' otherwise 'no new version'

  const  ipHash = hash(request.ip)
  const stripppedIp = strip(request.ip)

  addToTale(ipHash)
  addToTable(stripppedIp)
}
  */

// Get the version of theatre
app.get("/theatre/:version", (req, res) => {
  // This might not be that accurate,
  // read more about the ip addresses:
  // https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
  // And the Express.js docs:
  // http://expressjs.com/en/guide/behind-proxies.html
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ipAddress); // Log ip address of the user

  // TODO: Should be async:
  // https://www.npmjs.com/package/bcrypt#usage
  const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
  const ipAddressHash = bcrypt.hashSync(ipAddress, salt);

  // TODO: Check the hash in the db, and increase the
  // visit count.

  let responseMessage = {
    hasUpdates: false,
  };

  if (req.params.version !== LATEST_VERSION) {
    responseMessage = {
      hasUpdates: true,
      latest: LATEST_VERSION,
      releasePage: "https://docs.theatrejs.com/releases/0.4.9",
    };
  }
  return res.send(responseMessage);
});

// Start the server
app.listen(port, () =>
  console.log(`sample-expressjs app listening on port ${port}!`)
);
