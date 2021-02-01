var express = require("express");
var fs = require("fs");
var url = require("url");
var pageBuilder = require("./pageBuilder");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

var webPageNavbar = "./pageBlocks/navbar.html";

app.get("/*", (req, res) => {
    var urlPath = url.parse(req.url, true).pathname;

    pageBuilder.addToHead('<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/css/style.css"></link>');

    pageBuilder.addBlockToBody(webPageNavbar);

    switch (urlPath) {
        case "/":
            pageBuilder.addToHead('<title>Länklådan</title><link rel="script" href="/JS/homed.js"/><link rel="icon" type="image/png" href="/favicon.png"/>');
            pageBuilder.addBlockToBody(["./pageBlocks/links.html", "./pageBlocks/footerbar.html"])
            var linkList = fs.readFileSync("./link.lis").toString().split("\n");
            var htmlList = "<ul>"
            for (let i = 0; i < linkList.length - 1; i++) {
                var parsedLink = JSON.parse(linkList[i]);
                htmlList += `<li><a target="_blank" href="${parsedLink.link}"><img src="https://${url.parse(parsedLink.link).hostname}/favicon.ico" alt="/link.png" onerror="this.src=this.alt"> - ${ parsedLink.title}</a></li>`;
            }
            htmlList += "</ul>"
            pageBuilder.bodyInsertAtKey("%linkList%", htmlList);
            break;

        case "/post":
            pageBuilder.addToHead('<title>Lägg till länk - Länklådan</title><link rel="script" href="/JS/post.js"></link>');
            pageBuilder.addBlockToBody(["./pageBlocks/postform.html", "./pageBlocks/footerbar.html"])
            break;

        default:
            res.sendStatus(404);
            pageBuilder.clearPage();
            return;
    }

    res.send(pageBuilder.buildPage()).end();

});

app.post("/post", (req, res) => {
    var link = { title: req.body.title, link: req.body.link };
    fs.appendFileSync("./link.lis", JSON.stringify(link) + "\n");
    res.redirect("/post");
});

app.listen(8080, "0.0.0.0");