var express = require("express");
var app = express();

//Serve static files from /public
let staticPath = __dirname + "/public";
app.use("/public", express.static(staticPath));

//Index page
app.get("/", (req, res) => {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", (req, res)=>{
    res.json({
        "message": "Hello json"
    });
});

module.exports = app;
