const fs = require('fs');
const { Circle, Triangle, Square } = require('../lib/shapes');

const generateSVG = (text, textColor, shape, shapeColor) => {
  let shapeElement;
  let fileName;
  
  switch (shape) {
    case 'Circle':
      shapeElement = new Circle();
      fileName = 'circle.svg';
      break;
    case 'Triangle':
      shapeElement = new Triangle();
      fileName = 'triangle.svg';
      break;
    case 'Square':
      shapeElement = new Square();
      fileName = 'square.svg';
      break;
  }
  shapeElement.setColor(shapeColor);

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFileSync(`./dist/${fileName}`, svgContent.trim());
  console.log(`Generated ${fileName}`);
};

module.exports = generateSVG;
