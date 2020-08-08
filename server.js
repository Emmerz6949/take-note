const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            throw err;
        }
        let arr = JSON.parse(data);
        arr.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(arr), (err) => {
            if(err) {
                throw err;
            }
            res.json(newNote);
        });
    });    
});

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            throw err;
        }
        let arr = JSON.parse(data);
        arr = arr.filter(function( obj ) {
            return obj.id !== req.params.id;
        });
        fs.writeFile("./db/db.json", JSON.stringify(arr), (err) => {
            if(err) {
                throw err;
            }
            res.json(arr);
        });
    });
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
