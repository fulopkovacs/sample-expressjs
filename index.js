const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const startupMessage = `App started`;
const LATEST_VERSION = process.env.LATEST_VERSION;

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

//
app.get("/theatre/:version", (req, res) => {
  // Check the version
  let responseMessage = {
    hasUpdates: false,
  };
  if (req.params.version !== LATEST_VERSION) {
    responseMessage = {
      latest: "0.4.9",
      releasePage: "https://docs.theatrejs.com/releases/0.4.9",
    };
  }
  return res.send(responseMessage);
});

// Start the server
app.listen(port, () =>
  console.log(`sample-expressjs app listening on port ${port}!`)
);
