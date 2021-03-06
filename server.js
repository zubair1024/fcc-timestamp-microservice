// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

/**
 * Here is the needed API service
 */
app.get("/api/:date?", (req, res) => {
  if (!req.params.date) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toGMTString(),
    });
  }

  let dateObj = new Date(
    isNaN(Number(req.params.date)) ? req.params.date : Number(req.params.date)
  );

  if (isNaN(dateObj.getTime())) {
    return res.json({
      error: "Invalid Date",
    });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toGMTString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
