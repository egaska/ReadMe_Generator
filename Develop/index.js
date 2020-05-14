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
            type: "input",
            name: "license",
            message: "What type of Licence would you like?: ",
            default: ' '
        },
        {
            type: "input",
            name: "usage",
            message: "Please describe how your project is used: "
        },
        {
            type: "input",
            name: "screenshot",
            message: "Add a screenshot. This can be a pathway or a link: ",
            default: ' '
        },
        {
            type: 'Input',
            name: 'collaboratorName',
            message: 'Please enter collaborator names (Leave empty if n/a) : ',
            default: ' '
        },
        {
            type: 'Input',
            name: 'deployURL',
            message: 'What is the deployed URL?: ',
            default: ' '
        },
        {
            type: 'confirm',
            name: 'maintained',
            message: 'Is this repo maintained?: ',
            default: 'Y'
        }
    ]);
}

function generateMarkdown(answers) {
    return `    
# ${answers.projectName}
## Description
![maintained badge](https://img.shields.io/badge/Maintained%3F-${answers.maintained}-blue)
${answers.description}

## Deployed URL
${answers.deployURL}

## Getting Started
![Screenshot](${answers.screenshot})\n
${answers.usage}
    
## License
${answers.license}

### Authors 
----
${answers.user}
${answers.collaboratorName}
`
}

promptUser()
    .then(function (answers) {
        const markdown = generateMarkdown(answers);

        return writeFileAsync("README.md", markdown);
    })
    .then(function () {
        console.log("Successfully wrote to readMe.md");
    })
    .catch(function (err) {
        console.log(err);
    });