import fs from 'fs';
import pixelmatch from 'pixelmatch';

import {
  PIXEL_MATCH_SIZE,
} from './constants';

import {
  File,
  SimilarImage,
} from '../types';

const compareTwoImages = (
  imageBuffer1: Buffer,
  imageBuffer2: Buffer
): boolean => {
  const numDiffPixels = pixelmatch(imageBuffer1, imageBuffer2, null, PIXEL_MATCH_SIZE, PIXEL_MATCH_SIZE, {threshold: 0.1});
  return numDiffPixels === 0;
};

type UpdatedImagesAcc = {
  similarImage: SimilarImage;
  similarIndexes: number[];
}

const compareImagePair = (imageFiles: File[], imageIndex: number, similarIndexes: number[]): UpdatedImagesAcc => (
  imageFiles.reduce((acc: UpdatedImagesAcc, imageFile: File, accIndex: number): UpdatedImagesAcc => {
    const indexImageFile = imageFiles[imageIndex];

    const indexNotEqualToImageIndex = imageIndex !== accIndex;
    if (indexNotEqualToImageIndex) {

      const indexAlreadyFound = acc.similarIndexes.find(i => i === accIndex || i === imageIndex);
      if (!indexAlreadyFound) {

        const doesNotContainFolder = !imageFile.isFolder && !indexImageFile.isFolder;
        if (doesNotContainFolder) {

          const isSame = compareTwoImages(
            indexImageFile.imageBuffer,
            imageFile.imageBuffer,
          );

          if (isSame) {
            return {
              similarIndexes: [ ...acc.similarIndexes, accIndex ],
              similarImage: {
                files: acc.similarImage.files.concat(imageFile),
              },
            }
          }
        }
      }
    }

    return acc;
  }, {
    similarIndexes,
    similarImage: { files: [ imageFiles[imageIndex] ] },
  })
);

type ComparedImagesAcc = {
  imageIndex: number;
  similarImages: SimilarImage[];
  similarIndexes: number[];
}

export const compareImageContents = (imageFiles: File[]): { similarImages: SimilarImage[]; } => {
  const { similarImages } = imageFiles.reduce((acc: ComparedImagesAcc): ComparedImagesAcc => {

    if (acc.imageIndex === imageFiles.length) {
      return acc;
    }

    const indexAlreadyFound = acc.similarIndexes.find(i => i === acc.imageIndex);
    if (!indexAlreadyFound) {

      const {
        similarIndexes,
        similarImage,
      } = compareImagePair(imageFiles, acc.imageIndex, acc.similarIndexes);

      const hasSimilarImage = similarImage.files.length >= 2;

      if (hasSimilarImage) {
        return {
          imageIndex: acc.imageIndex + 1,
          similarIndexes,
          similarImages: hasSimilarImage ? acc.similarImages.concat(similarImage) : acc.similarImages,
        }
      }
    }

    return {
      ...acc,
      imageIndex: acc.imageIndex + 1,
    }
  }, {
    imageIndex: 0,
    similarIndexes: [],
    similarImages: [],
  });

  // Delete tmp image directory once iteration is complete
  const projectRootFolder = process.cwd();
  fs.rmdirSync(`${projectRootFolder}/tmp`, { recursive: true });

  return { similarImages };
}
