const fs = require('fs');
const prompt = require('prompt-sync')();
const { exec } = require('child_process');

function generateShape(shape, color) {
    const size = 100;  // Size for better visibility
    shape = shape.toLowerCase();  // Normalize the shape input to lowercase
    switch (shape) {
        case 'circle':
            return `<circle cx="150" cy="100" r="${size}" fill="${color}" />`;
        case 'square':
            return `<rect x="100" y="50" width="${size * 2}" height="${size * 2}" fill="${color}" />`;
        case 'triangle':
            return `<polygon points="150,10 250,190 50,190" fill="${color}" />`;
        default:
            throw new Error("Unsupported shape: " + shape);
    }
}

function modifyLogo() {
    // Gather user input
    const text = prompt("Enter the text for the logo: ");
    const textColor = prompt("Enter the text color: ");
    const shape = prompt("Enter the shape (circle, square, triangle): ");
    const shapeColor = prompt("Enter the shape color: ");

    const template = fs.readFileSync('template.svg', 'utf8');
    const shapeElement = generateShape(shape, shapeColor);
    const modified = template
        .replace('<!-- TEXT -->', text)
        .replace('<!-- TEXT_COLOR -->', textColor)
        .replace('<!-- SHAPE -->', shapeElement);
    fs.writeFileSync('output.svg', modified);

    console.log("Logo has been modified successfully.");

    // Open the file if requested
    const open = prompt("Do you want to open the file? (yes/no): ");
    if (open.toLowerCase() === 'yes') {
        exec('open output.svg', (err) => {
            if (err) {
                console.error("Failed to open the file:", err);
            }
        });
    }

    // Ask user if they want to modify another logo
    const repeat = prompt("Do you want to modify another logo? (yes/no): ");
    if (repeat.toLowerCase() === 'yes') {
        modifyLogo();
    }
}

modifyLogo();
