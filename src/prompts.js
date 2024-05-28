const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter text for the logo (up to 5 characters):',
    validate: input => input.length <= 5 || 'Text must be 5 characters or less'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hex):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hex):'
  }
];

const promptUser = () => inquirer.prompt(questions);

module.exports = promptUser;
