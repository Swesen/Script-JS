/* Includes: */
var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function insertPhoneBook(start, end) {
    let data = fs.readFileSync('phone.lis');
    let lines = data.toString().split(/\r?\n/);
    let htmlLines = ""
    for (l of lines) {
        htmlLines += "<p>" + l + "</p>";
    }

    return start + htmlLines + end;
}

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    /* Split the file into two parts to insert data */
    var file = fs.readFileSync("index.html").toString();
    var file = file.split("%BREAKPOINT%");

    res.write(insertPhoneBook(file[0], file[1]));

    res.end();
});

app.get("/addform", (req, res) => {
    res.sendFile(__dirname + "/phonebook.html");
});

app.post("/append", (req, res) => {
    console.log("Got body: ", req.body);
    res.redirect("/");

    if (req.body.firstName != "" && req.body.address != "") {
        var infoToSave = `${req.body.firstName} ${req.body.lastName},${req.body.address},${req.body.telephone},${req.body.email}`;
        fs.appendFileSync("phone.lis", infoToSave + "\n");
    }
});

app.listen(8080);