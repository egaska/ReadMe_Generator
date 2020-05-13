const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
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
        {
            type: "input",
            name: "screenshot",
            message: "Add a screenshot. This can be a pathway or a link: "
        }
    ]);
}

function generateMarkdown(answers) {
    return `
    #${answers.projectName}
    ${answers.description}

    ##To use
    ${answers.screenshot}
    ${answers.usage}

    ##Contributors
    ${answers.user}
    ${answers.contributors}
    
    ##License
    ${answers.license}
    `
}

promptUser()
    .then(function (answers) {
        const markdown = generateMarkdown(answers);

        return writeFileAsync("readMe.md", markdown);
    })
    .then(function () {
        console.log("Successfully wrote to readMe.md");
    })
    .catch(function (err) {
        console.log(err);
    });

// function init() {

// }

// init();
