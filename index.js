// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;

  // If no date provided, return current time
  if (!dateString) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // If the param is all digits, treat it as unix milliseconds
  // (support large numbers like 1451001600000)
  let date;
  if (/^-?\d+$/.test(dateString)) {
    date = new Date(Number(dateString));
  } else {
    // otherwise treat as ISO-8601 date string
    date = new Date(dateString);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

