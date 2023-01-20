const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
var notesData;

// Will read JSON file
app.get("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        notesData = JSON.parse(data);
    });
});

app.post("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
        notesData = JSON.parse(data);
  
        let newNote = req.body;
        let currentID = notesData.length;
  
        newNote.id = currentID + 1;
      
        notesData.push(newNote);
  
        notesData = JSON.stringify(notesData);
        // Will write to JSON file
        writeFileAsync("db/db.json", notesData).then(function (data) {
            console.log("Note has been added.");
        });
      res.json(notesData);
    });
});

module.exports = app;