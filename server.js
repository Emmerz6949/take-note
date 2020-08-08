const express = require("express");
const path = require("path");
const notesdb = require("./db/db.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    res.json(notesdb);
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    notesdb.push(newNote);
    console.log(notesdb);
    res.json(newNote);
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
