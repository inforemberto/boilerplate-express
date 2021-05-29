//require('dotenv').config()
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//POST Data Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Logging Middleware
app.use((req, res, next)=>{
console.log(`${req.method} ${req.path} - ${req.ip}`);
next();
})

//Time Middleware
app.get("/now", (req, res, next)=>{
  req.time = new Date().toString();
  next();
},
(req, res, next)=>{
res.json({
  "time": req.time
});
})

//Serve static files from /public
let staticPath = __dirname + "/public";
app.use("/public", express.static(staticPath));

//Index page
app.get("/", (req, res) => {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

//Testing JSON response
app.get("/json", (req, res)=>{
    const msg = "Hello json";
    res.json({
        "message": process.env.MESSAGE_STYLE == 'uppercase' ? msg.toLocaleUpperCase() : msg,
    });
});

//API
app.get("/:word/echo", (req, res)=>{
  res.json({
    "echo": req.params.word
  })
})

app.get("/name", (req, res)=>{
  res.json({
    "name": `${req.query.first} ${req.query.last}`
  })
});

app.post("/name", (req, res)=>{
  res.json({
    "name": `${req.body.first} ${req.body.last}`
  });
});
module.exports = app;
