var mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const prompts = require("./prompts.js");
const logo = require('asciiart-logo');
const config = require('./package.json');

console.log(logo(config).render());

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "1026",
    database: "playlist_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
});

let init = () => {
    songPrompts().then((answers) => {
        createProduct(answers);
    })
}

function createProduct(answers) {
    console.log("Inserting a new artist...\n");
    var query = connection.query(
        "INSERT INTO songs SET ?",
        {
            artist: answers.artist,
            title: answers.title,
            genre: answers.genre
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            updateProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function updateProduct() {
    console.log("Updating all songs...\n");
    var query = connection.query(
        "UPDATE songs SET ? WHERE ?",
        [
            {
                artist: "Beatles"
            },
            {
                genre: "Rock"
            },
            {
                title: "Norwegian Wood"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " songs updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteProduct() {
    console.log("Deleting all artist...\n");
    connection.query(
        "DELETE FROM songs WHERE ?",
        {
            artist: "Bob Dylan"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " artist deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all songs...\n");
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        endConnection;
    });
}

function endConnection() {
    connection.end();
}
