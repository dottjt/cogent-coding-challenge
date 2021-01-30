import fs from 'fs';

export const validateCommandlineArguments =
  (argumentArray: string[]): { imageFolderPath: string } => {

    if (argumentArray.length !== 3) {
      console.log('Please provide expected arguments i.e. \`npm start ./images\`.');
      return process.exit(1);
    }

    const imageFolderPath = argumentArray[2];
    const isPathValidFolder = fs.existsSync(imageFolderPath) && fs.lstatSync(imageFolderPath).isDirectory()

    if (!isPathValidFolder) {
      console.log('Please provide a valid folder directory to the application.');
      return process.exit(1);
    }

    return {
      imageFolderPath,
    };
  };
