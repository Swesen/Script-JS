/* Includes: */
var http = require('http');
var fs = require("fs");
var url = require("url");

/* Register server: */
http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);

    
    try {
        switch (parsedUrl.pathname) {
            case "/calc":
                fs.readFile("./webpages/mycalc.html", function (err, data) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                })
                break;

            case "/compute":
                res.writeHead(200, { "Content-Type": "text/html" });
                var query = parsedUrl.query;
                if (query == undefined) {
                    res.write(query);
                    res.end();
                    break;
                }
                var x = query.x * 1;
                var y = query.y * 1;

                res.write("<title>" + req.url + "</title>")
                res.write("<h1>")
                switch (query.op) {
                    case "plus":
                        res.write(x + "+" + y + "=" + (x + y));
                        break;

                    case "minus":
                        res.write(x + "-" + y + "=" + (x - y));
                        break;

                    case "times":
                        res.write(x + "*" + y + "=" + (x * y));
                        break;

                    case "divide":
                        res.write(x + "/" + y + "=" + (x / y));
                        break;

                    default:
                        break;
                }
                res.write("</h1>")
                res.end();
                break;

            default:
                fs.readFile("./webpages/calcform.html", function (err, data) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                })
                break;
        }
    } catch (e) {
        console.log(e);
    }
}).listen(8080);