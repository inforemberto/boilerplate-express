//require('dotenv').config()
var express = require("express");
var app = express();

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

app.get("/json", (req, res)=>{
    const msg = "Hello json";
    res.json({
        "message": process.env.MESSAGE_STYLE == 'uppercase' ? msg.toLocaleUpperCase() : msg,
    });
});

module.exports = app;
