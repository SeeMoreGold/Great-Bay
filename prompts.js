const inquirer = require("inquirer");

let prompts = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            name: "bid",
            choices: ["POST AN ITEM", "BID ON AN ITEM"]
        },
        {
            type: "input",
            name: "title",
            message: "Enter song title.",
            when: (answers) => answers.bid === "POST AN ITEM"
        },
        {
            type: "list",
            message: "Choose genre",
            name: "genre",
            choices: ["Pop", "R&B", "Rock"],
            when: (answers) => answers.bid === "BID ON AN ITEM"
        }
    ])
}

module.exports = prompts;