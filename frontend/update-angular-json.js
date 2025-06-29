const fs = require('fs');
const path = require('path');

// Read the angular.json file
const angularJsonPath = path.join(__dirname, 'angular.json');
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));

// Modify the styles array
angularJson.projects.frontend.architect.build.options.styles = [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/primeicons/primeicons.css",
  "src/styles.scss"
];

// Add PrimeIcons fonts to assets
if (!angularJson.projects.frontend.architect.build.options.assets.some(asset => 
  typeof asset === 'object' && asset.input === 'node_modules/primeicons/fonts')) {
  angularJson.projects.frontend.architect.build.options.assets.push({
    "glob": "**/*",
    "input": "node_modules/primeicons/fonts",
    "output": "/assets/fonts"
  });
}

// Write the updated angular.json
fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2), 'utf8');

console.log('Angular.json has been updated with PrimeNG and Bootstrap styles!');
