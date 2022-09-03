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

const daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

app.get("/api/:date?", (req,res) => {
  let dategiven = req.params.date;

  if(!dategiven){
    return res.json(apiResoponseJson(new Date()));
  }

  if(dategiven.includes("%20")){
    dategiven.replace("%20", " ");
  }

  let stringvalidation = new Date(dategiven.toString());
  let isunix = /^\d+$/.test(dategiven);
  console.log("string : " + stringvalidation)
  if(stringvalidation != "Invalid Date" && !isunix){// String format validation
    console.log("string block");
    return res.status(200).json(apiResoponseJson(new Date(stringvalidation)));
  }

  let date = new Date(parseInt(dategiven)) // Unix timestamp format validation
  console.log("unix : " +date);
  if(date != "Invalid Date"){
    console.log("unix block");
    return res.status(200).json(apiResoponseJson(date));
  }

  return res.status(403).json({error: "Invalid Date"})
})

function apiResoponseJson( date ){
  return {
    unix: Math.floor(date.getTime())
    , 
    utc: date.toString()}
}

function myDateUTCFormat( date ){
  var day =  date.getUTCDate();
  day = day<10 ? "0"+day : day;
  var hours = date.getUTCHours();
  hours = hours<10 ? "0"+hours : hours;
  var minutes = date.getUTCMinutes();
  minutes = minutes<10 ? "0"+minutes : minutes;
  var seconds = date.getUTCSeconds();
  seconds = seconds<10 ? "0"+seconds : seconds;
  var time = hours+":"+minutes+":"+seconds;
  return ""+daysOfWeek[date.getUTCDay() - 1]+ ", " + day + " " +months[date.getUTCMonth()]+ " " + date.getUTCFullYear() + " " + time + " GMT";
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
