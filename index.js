//npm init -y
// npm i inquirer

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

//constant variable that tells us that the writeFile is asynchronous and it has to wait for the fs.writeFile to be done //
const writeFileAsync = util.promisify(fs.writeFile);

//Questions to ask user to fill out the README file//
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Provide a title for your project:"
        },
        {
            type: "list",
            name: "badge",
            message: "Please provide badges.",
            choices: ["MIT", "APACHE2.0", "GPL3.0", "none"] 
        },
        {
            type: "input",
            name: "license",
            message: "What license do you want for your project:"
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project:"
        },
        // {
        //     type: "input",
        //     name: "content",
        //     message: "Create a table of contents:"
        // },
        {
            type: "input",
            name: "install",
            message: "What is needed to be installed to run your project:"
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions on how you want users to use your project:"
        },
        {
            type: "input",
            name: "credit",
            message: "Give credit to those who helped you create this project, seperate them with commas:"
        },
        {
            type: "input",
            name: "test",
            message: "Write tests for your application:"
        },
        {
            type: "input",
            name: "email",
            message: "What is your Github email:"
        },
        {
            type: "input",
            name: "username",
            message: "What's your Github username:"
        },
        {
            type: "input",
            name: "picture",
            message: "Paste the URL for your Github profile picture:"
        }
    ]);
}

//Generate the README by creating a template and filling it in with user answers//
function generateReadMe(answer) {
    return `
# ${answer.title}

## Badge and License:
![*${answer.license}*](https://img.shields.io/badge/license-${answer.badge}-blue.svg)

## Project Description:
#### ${answer.description}

## Table of Contents:
### 1. [Installation](#installation)
### 2. [Usage](#usage)
### 3. [Contributing](#contributing)
### 4. [Test](#test)
### 5. [Github Project](#github-project)
### 6. [Live Link](#live-link)
### 7. [Github Email](#github-email)
### 8. [Profile Picture](#profile-picture)

## Installation:
#### ${answer.install}

## Usage:
#### ${answer.usage}

## Contributing:
#### ${answer.credit}

## Test:
#### ${answer.test}

## Github Project: 
#### https://github.com/${answer.username}/${answer.title.toLowerCase().split(" ").join("-")}

## Live Link: 
#### https://${answer.username}.github.io/${answer.title.toLowerCase().split(" ").join("-")}/

## Github Email: 
#### ${answer.email}

## Profile Picture: 
![*Picture*](${answer.picture})
`;
  }

  // Calling out the function called promptUser on line12 //
  promptUser()
  // A promise that states whatever is inside function userInput is going to run when it's ready //
  .then(function (userInput) {
    // Created a const variable that calls out whatever is inside the generatedReadMe function with userInput as argument?? //
    const readMe = generateReadMe(userInput); 
    console.log(readMe);
    // Return or print out a new file called readme.md // Not sure why it's returning this though
    return writeFileAsync("README.md", readMe);
  })
  .then(function () {
    // If it's successful, it would just say successful //
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) { // Why catch? //
    // If it's not successful, it would throw an error //
    console.log(err);
  });