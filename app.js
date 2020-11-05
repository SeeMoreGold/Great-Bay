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
    database: "great_baydb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
});

let init = () => {
    prompts().then((answers) => {
        if (answers.bid === "POST AN ITEM") {
            postItem(answers);
        }
        if (answers.bid === "BID ON AN ITEM") {
            bidList();
            // bidItem(answers);
        }
        endConnection();
    })
}

function postItem(answers) {
    console.log("Inserting a new item...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            item: answers.item,
            lastBid: answers.lastBid,
            quantity: answers.quantity
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function bidList() {
    console.log("Selecting items...\n");
    connection.query("SELECT item FROM products", function (err, res) {
        if (err) throw err;

        var itemArray = [];
        res.forEach(element => {
            itemArray.push(element.item);
        })
        
        let itemprompts = (itemArray) => {
            return inquirer.prompt([
                {
                    type: "list",
                    message: "Choose an item:",
                    name: "itemChoice",
                    choices: itemArray
                }

            ])
        }
        itemprompts(itemArray);
    })
}



        function endConnection() {
            connection.end();
        }
