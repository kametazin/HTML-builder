const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  try {
    const sourcePath = './04-copy-directory/files';
    const destinationPath = './04-copy-directory/files-copy';

    await fs.mkdir(destinationPath, { recursive: true });

    const files = await fs.readdir(sourcePath);

    for (const file of files) {
      const sourceFilePath = path.join(sourcePath, file);
      const destinationFilePath = path.join(destinationPath, file);

      await fs.copyFile(sourceFilePath, destinationFilePath);
    }
    const existingFiles = new Set(files);

    const filesInDestination = await fs.readdir(destinationPath);
    for (const fileInDestination of filesInDestination) {
      if (!existingFiles.has(fileInDestination)) {
        const filePathToRemove = path.join(destinationPath, fileInDestination);
        await fs.unlink(filePathToRemove);
      }
    }
    console.log('Copy is finished');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

copyDir();