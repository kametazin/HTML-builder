const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    const distFolderPath = './06-build-page/project-dist';
    await fs.mkdir(distFolderPath, { recursive: true });

    const templatePath = './06-build-page/template.html';
    let templateContent = await fs.readFile(templatePath, 'utf-8');

    const tagNames = templateContent.match(/{{(.*?)}}/g);

    if (tagNames) {
    for (const tagName of tagNames) {
      const componentName = tagName.slice(2, -2);
      const componentPath = `./06-build-page/components/${componentName}.html`;
      try {
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        templateContent = templateContent.replace(new RegExp(tagName, 'g'), componentContent);
      } catch (error) {
        console.error(`Error reading component file ${componentPath}: ${error.message}`);
      }
    }
    }
    const outputFilePath = path.join(distFolderPath, 'index.html');
    await fs.writeFile(outputFilePath, templateContent);

    const stylesFolderPath = './06-build-page/styles';
    const distStyleFolderPath = './06-build-page/project-dist';
    const outputFile = 'style.css';
    const outputStyleFilePath = path.join(distStyleFolderPath, outputFile);

    async function readStylesFolder() {
    try {
      const files = await fs.readdir(stylesFolderPath);
      return files;
    } catch (error) {
      console.error('Error reading styles folder:', error.message);
      throw error;
    }
    }

    async function readStyleFiles(files) {
    const styleFiles = files.filter(file => path.extname(file) === '.css');
    const stylesArray = [];
    for (const file of styleFiles) {
    const filePath = path.join(stylesFolderPath, file);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      stylesArray.push(content);
    } catch (error) {
      console.error(`Error reading style file ${file}:`, error.message);
    }
    }
    return stylesArray;
    }

    async function writeBundleFile(stylesArray) {
    try {
      await fs.mkdir(distStyleFolderPath, { recursive: true });
      await fs.writeFile(outputStyleFilePath, stylesArray.join('\n'), 'utf-8');
      console.log('Compilation of styles completed successfully.');
    } catch (error) {
      console.error('Error writing style file:', error.message);
      throw error;
    }
    }

    async function compileStyles() {
    try {
      const files = await readStylesFolder();
      const stylesArray = await readStyleFiles(files);
      await writeBundleFile(stylesArray);
    } catch (error) {
      console.error('Error compiling styles:', error.message);
    }
    }
    compileStyles();

    const sourcePath = './06-build-page/assets';
    const destinationPath = './06-build-page/project-dist/assets';
    await copyDir(sourcePath, destinationPath);

    console.log('Build is finished');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function copyDir(sourcePath, destinationPath) {
  try {
    await fs.mkdir(destinationPath, { recursive: true });

    const files = await fs.readdir(sourcePath);

    for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const destinationFilePath = path.join(destinationPath, file);
    const fileStat = await fs.stat(sourceFilePath);
    if (fileStat.isDirectory()) {
      await copyDir(sourceFilePath, destinationFilePath);
    } else {
      await fs.copyFile(sourceFilePath, destinationFilePath);
    }
    }
    console.log('Copy is finished');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

buildPage();