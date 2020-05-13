const inquirer = require("inquirer");

function processAnswers(answers) {
    console.log("And your answers are:", answers);
}
const questions = inquirer.prompt([
    {
        type: "input",
        name: "user",
        message: "What is your GitHub username? "
    },
    {
        type: "input",
        name: "projectName",
        message: "What is your project's name? "
    },
    {
        type: "input",
        name: "description",
        message: "Please describe your project: "
    },
    {
        type: "checkbox",
        name: "license",
        message: "What kind of license would you like? ",
        choices: ["MIT License", "GNU General Public License v3.0", "No License"]
    },
    {
        type: "input",
        name: "usage",
        message: "Please describe how your project is used: "
    },
    {
        type: "input",
        name: "contributor",
        message: "Other contributors?: "
    },
]).then(processAnswers);

function writeToFile(fileName, data) {
}

function init() {

}

init();
