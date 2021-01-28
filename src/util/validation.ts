import fs from 'fs';
import readChunk from 'read-chunk';
import imageType from 'image-type';
import {
  File,
  ImageType,
} from '../types';

export const validateCommandlineArguments =
  (argumentArray: string[]): { imageFolderPath: string } => {
    if (argumentArray.length !== 3) {
      console.log('Please provide expected arguments i.e. \`npm start ./images\`.');
      return process.exit(1);
    }

    const imageFolderPath = argumentArray[2];
    const isPathValidFolder = fs.lstatSync(imageFolderPath).isDirectory()

    if (!isPathValidFolder) {
      console.log('Please provide a valid folder directory to the application.');
      return process.exit(1);
    }

    return {
      imageFolderPath,
    };
  };

const PNG_EXT = 'png';
const JPG_EXT = 'jpg';

const checkIfFileIsImage = (imagePath: string): boolean => {
  const buffer = readChunk.sync(imagePath, 0, 12);
  const image: ImageType | null = imageType(buffer);
  if (
    image?.ext === PNG_EXT ||
    image?.ext === JPG_EXT
  ) {
    return true;
  }
  return false;
};

let imageFiles: File[] = [];

export const retrieveImages = (imageFolderPath: string): { imageFiles: File[] } => {
  const imageFolderFilesAwait = fs.readdirSync(imageFolderPath);
  const imageFolderFiles = imageFolderFilesAwait.filter(item => !item.includes('.DS_Store'));

  for (const imageFile of imageFolderFiles) {
    const filePath = `${imageFolderPath}/${imageFile}`;
    const isDirectory = fs.lstatSync(filePath).isDirectory()

    if (isDirectory) {
      imageFiles.push({ filePath, fileName: imageFile, isFolder: true, });
      retrieveImages(filePath);
    } else {
      const isImage = checkIfFileIsImage(filePath);

      if (isImage) {
        imageFiles.push({ filePath, fileName: imageFile, isFolder: false, });
      }
    }
  }
  return { imageFiles };
}

