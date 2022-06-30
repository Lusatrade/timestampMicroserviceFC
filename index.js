// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const dateAndTime =require("date-and-time")


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const PORT = process.env.PORT||4000
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

const parseDateTime = (dt)=>{
  const strFormat = "ddd, DD MMM YYYY HH:mm:ss [UTC]"
  
  try {
    const date = new Date(dt)
    if(!date.getTime()||undefined ===date.getTime()){
      throw new Error('Invalid date')
    }
    const fmt = dateAndTime.format(date,strFormat,true)
    return{
      unix: date.getTime(),
      utc: fmt
    }

  } catch (error) {
    return {error: "Invalid dateTime parameter",message:error}
  }
}
  parseDateTime('2015-12-32')

app.get('/api/:date_time',(req,res)=>{
  const result = parseDateTime(req.params.date_time)
  if(result.error){
    res.status(400).json({error:"Invalid request type"})
  }else{
    res.status(200).json(result)
  }
 
})

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
