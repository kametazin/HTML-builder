const fs = require('fs').promises;
const path = require('path');

const stylesFolderPath = './05-merge-styles/styles';
const distFolderPath = './05-merge-styles/project-dist';
const outputFile = 'bundle.css';
const outputFilePath = path.join(distFolderPath, outputFile);

async function readStylesFolder() {
  try {
    const files = await fs.readdir(stylesFolderPath);
    return files;
  } catch (error) {
    console.error('Error of reading:', error.message);
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
      console.error(`Error reading file ${file}:`, error.message);
    }
  }
  return stylesArray;
  }

async function writeBundleFile(stylesArray) {
  try {
    await fs.mkdir(distFolderPath, { recursive: true });
    await fs.writeFile(outputFilePath, stylesArray.join('\n'), 'utf-8');
    console.log('Compilation completed successfully.');
  } catch (error) {
    console.error('Error writing bundle file:', error.message);
    throw error;
  }
}

async function compileStyles() {
  try {
    const files = await readStylesFolder();
    const stylesArray = await readStyleFiles(files);
    await writeBundleFile(stylesArray);
  } catch (error) {
    console.error('Error of compilation:', error.message);
  }
}
compileStyles();