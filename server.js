var express = require('express');
var app = express();

app.use(express.static('src'));

app.get('/', function (req, res) {
    res.sendFile("src/index.html", {"root": __dirname});
});

var server = app.listen(8081, function () {
    console.log("Server listening at http://localhost:8081");
});