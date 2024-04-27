const fs = require('fs');
const prompt = require('prompt-sync')();

function generateShape(shape, color) {
    const size = 100;  // Size for better visibility
    shape = shape.toLowerCase();  // Normalize the shape input to lowercase
    switch (shape) {
        case 'circle':
            // Circle is centered at (150, 100) with a radius of size
            return `<circle cx="150" cy="100" r="${size}" fill="${color}" />`;
        case 'square':
            // Square is centered by adjusting x, y to start at 100, 50, with the total size being twice the "size"
            return `<rect x="100" y="50" width="${size * 2}" height="${size * 2}" fill="${color}" />`;
        case 'triangle':
            // Points adjusted to make the triangle visually centered
            return `<polygon points="150,10 250,190 50,190" fill="${color}" />`;
        default:
            throw new Error("Unsupported shape: " + shape);
    }
}

// Read user input
const text = prompt("Enter the text for the logo: ");
const textColor = prompt("Enter the text color: ");
const shape = prompt("Enter the shape (circle, square, triangle): ");
const shapeColor = prompt("Enter the shape color: ");

// Modify the logo and save it to output.svg
function modifyLogo(text, textColor, shape, shapeColor) {
    const template = fs.readFileSync('template.svg', 'utf8');
    const shapeElement = generateShape(shape, shapeColor);
    const modified = template
        .replace('<!-- TEXT -->', text)
        .replace('<!-- TEXT_COLOR -->', textColor)
        .replace('<!-- SHAPE -->', shapeElement);
    fs.writeFileSync('output.svg', modified);
}

console.log("Logo has been modified successfully.");


// Ask user if they want to open the file
const open = prompt("Do you want to open the file? (yes/no): ");
if (open.toLowerCase() === 'yes') {
    const { exec } = require('child_process');
    exec('open output.svg', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

// Ask user if they want to modify another logo
const repeat = prompt("Do you want to modify another logo? (yes/no): ");
if (repeat.toLowerCase() === 'yes') {
    modifyLogo();
}

