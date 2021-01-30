import { validateCommandlineArguments } from './util/validation';
import { retrieveImages } from './util/format';
import { compareImageContents } from './util/algorithm';
import { printResults } from './util/print';

export const main = async (argumentArray: string[]) => {
  // Step 1 - Validate command line arguments
  const { imageFolderPath } = validateCommandlineArguments(argumentArray);

  // Step 2 - Retrieve all images into an array + validate if they are actual images
  console.log('Processing Images...');
  const { imageFiles } = await retrieveImages(imageFolderPath);

  // Step 3 - Check if images are the same + remove tmp image folder
  console.log('Comparing Images...');
  const { similarImages } = await compareImageContents(imageFiles);

  // Step 4 - Print results
  console.log('...aaaaaaand the results are in!\n');
  printResults(similarImages);
  process.exit(0);
}
