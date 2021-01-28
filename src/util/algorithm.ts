import looksSame from 'looks-same';
import readChunk from 'read-chunk';
import imageType from 'image-type';

export const compareImages = (
  imagePath1: string,
  imagePath2: string
): Promise<boolean> => new Promise((resolve, reject) => {
  looksSame(imagePath1, imagePath2, function(error, { equal }) {
    // equal will be true, if images looks the same
    if (equal) resolve(equal);
  });
});

const PNG_EXT = 'png';
const JPG_EXT = 'jpg';

export const checkIfFileIsImage = (imagePath: string): boolean => {
  const buffer = readChunk.sync(imagePath, 0, 12);
  const image = imageType(buffer); // {ext: 'png', mime: 'image/png'}
  if (
    image?.ext === PNG_EXT ||
    image?.ext === JPG_EXT
  ) {
    return true;
  }
  return false;
};
