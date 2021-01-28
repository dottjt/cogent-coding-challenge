import looksSame from 'looks-same';

const compareImages = (
  imagePath1: string,
  imagePath2: string
): Promise<boolean> => new Promise((resolve, reject) => {
  looksSame(imagePath1, imagePath2, function(error, { equal }) {
    // equal will be true, if images looks the same
    if (equal) resolve(equal);
  });
});
