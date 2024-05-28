const promptUser = require('./src/prompts');
const generateSVG = require('./src/generateSVG');

promptUser().then(answers => {
  generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
});
