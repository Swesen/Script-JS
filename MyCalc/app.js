var express = require('express');
var app = express();

var calc = 

// define routes here:

app.get('/', function (req, res) {
    res.send('<html><body><a href="/calc">MyCalc</a></body></html>');
    console.log('Serving ' + req.originalUrl);
});

app.get('/test', function (req, res) {
    res.send('<html><body><h1>Test</h1></body></html>');
    console.log('Serving test');
});

app.get('/calc', function (req, res) {
    res.sendFile('mycalc/MyCalc.html', {root: __dirname });
    console.log('Serving calc');
});

app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

var server = app.listen(5000, function () {
    console.log('Node server is running...');
});