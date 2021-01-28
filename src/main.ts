import { validateCommandlineArguments } from './util/validation';

export const main = (argumentArray: string[]) => {
  // Step 1 - Validate command line arguments
  const { imageFolderPath } = validateCommandlineArguments(argumentArray);

  // Step 2 - Retrieve all images into an array + validate if they are actual images

  // Step 3 - Check if images are the same

}
