import fs from 'fs';
import readChunk from 'read-chunk';
import imageType from 'image-type';
import sharp from 'sharp';
import { PNG } from 'pngjs';

import {
  File,
  ImageType,
} from '../types';

import {
  PNG_EXT,
  JPG_EXT,
  PIXEL_MATCH_SIZE,
} from './constants';

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

const sameImageFile = async (filePath: string, tmpFilePath: string): Promise<void> => {
  await sharp(filePath)
    .resize(PIXEL_MATCH_SIZE, PIXEL_MATCH_SIZE)
    .greyscale()
    .png()
    .toFile(tmpFilePath);
};

const saveImage = async (filePath: string, imageFileName: string, isFolder: boolean): Promise<void> => {
  const projectRoot = process.cwd();
  const legibleFilePath = filePath.slice(2);
  const tmpFilePath = `./tmp/${legibleFilePath}`;
  const tmpFilePathAbsolute = `${projectRoot}/${tmpFilePath.slice(2)}`;

  if (isFolder) {
    await fs.promises.mkdir(tmpFilePath, { recursive: true });

    imageFiles.push({
      filePath,
      fileName: imageFileName,
      imageBuffer: Buffer.alloc(10),
      isFolder: true,
    });
  } else {
    const tmpFilePathPNG = tmpFilePath.replace(/\.[^/.]+$/, '.png');
    await sameImageFile(filePath, tmpFilePathPNG);

    const fileContents = fs.readFileSync(tmpFilePathAbsolute.replace(/\.[^/.]+$/, '.png'));
    const imageBuffer = PNG.sync.read(fileContents);

    imageFiles.push({
      filePath,
      fileName: imageFileName,
      imageBuffer: imageBuffer.data,
      isFolder: false,
    });
  }
}

export const retrieveImages = async (imageFolderPath: string): Promise<{ imageFiles: File[] }> => {
  const imageFolderFiles = fs.readdirSync(imageFolderPath);
  const imageFolderFilesWithoutDSStore = imageFolderFiles.filter(item => !item.includes('.DS_Store'));

  for (const imageFileName of imageFolderFilesWithoutDSStore) {
    const filePath = `${imageFolderPath}/${imageFileName}`;

    const isDirectory = fs.lstatSync(filePath).isDirectory();
    if (isDirectory) {
      await saveImage(filePath, imageFileName, true);
      await retrieveImages(filePath);
    } else {
      const isImage = checkIfFileIsImage(filePath);
      if (isImage) {
        await saveImage(filePath, imageFileName, false);
      }
    }
  }
  return { imageFiles };
}
