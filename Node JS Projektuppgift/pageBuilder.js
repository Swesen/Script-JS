var fs = require("fs");

var startPage = ['<!DOCTYPE html><html><head>', '</head><body>', '</body></html>'];
var pageHead = "";
var pageBody = "";

// add any string to the head of the page
function addToHead(stringToAdd) {
    pageHead += stringToAdd;
}

// add any string to the body of the page
function addToBody(stringToAdd) {
    pageBody += stringToAdd;
}

// add an array of files in order to the body
function addBlockToBody(filesToAdd) {
    if (typeof (filesToAdd) === typeof ([])) {
        for (let i = 0; i < filesToAdd.length; i++) {
            pageBody += fs.readFileSync(filesToAdd[i]);
        }
    } else if (typeof (filesToAdd) === typeof ("")) {
        pageBody += fs.readFileSync(filesToAdd);
    }
}

function bodyInsertAtKey(key, dataToInsert) {
    var splitBody = pageBody.split(key);
    pageBody = splitBody[0] + dataToInsert + splitBody[1];
}

function buildPage() {
    var finalPage = startPage[0] + pageHead + startPage[1] + pageBody + startPage[2];
    clearPage();
    return finalPage;
}

function clearPage() {
    pageHead = "";
    pageBody = "";
}

module.exports = {
    bodyInsertAtKey: bodyInsertAtKey
    ,
    clearPage: clearPage
    ,
    buildPage: buildPage
    ,
    addBlockToBody: addBlockToBody
    ,
    addToBody: addToBody
    ,
    addToHead: addToHead
}