import {
  SimilarImage
} from '../types';

export const printResults = (similarImages: SimilarImage[]): void => {
  similarImages.forEach(similarImage => {
    let similarImages = '';
    const initialMessage = 'These images are the same: \n';

    similarImage.files.forEach(file => {
      similarImages += `- "${file.fileName}": "${file.filePath}"\n`;
    });

    console.log(`${initialMessage}${similarImages}`);
  });
}
