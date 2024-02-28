// Create Web Server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get Comments
app.get('/listComments', function (req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

// Add Comments
app.post('/addComment', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["comment" + req.body.id] = req.body;
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

// Delete Comments
app.delete('/deleteComment', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        delete data["comment" + req.body.id];
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

// Update Comments
app.put('/updateComment', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        data["comment" + req.body.id] = req.body;
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Comments app listening at http://%s:%s", host, port)
})