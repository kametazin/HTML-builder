const fs = require('fs').promises;
const path = require('path');

async function readSecretFolder() {
  try {
    const folderPath = './03-files-in-folder/secret-folder';
    const files = await fs.readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(folderPath, file.name);
    const fileStats = await fs.stat(filePath);

    if (fileStats.isFile()) {
      const fileExtension = path.extname(file.name).slice(1);
      const fileSizeKB = (fileStats.size / 1024).toFixed(3);

      console.log(`${file.name} - ${fileExtension} - ${fileSizeKB}kb`);
    } else {
    console.error(`Error: ${file.name} is not a file`);
    }
  }
  } catch (error) {
    console.error('Error: ', error.message);
  }
}
  
readSecretFolder();