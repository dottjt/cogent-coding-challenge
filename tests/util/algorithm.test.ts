import { retrieveImages } from '../../src/util/format';
import { compareImageContents } from '../../src/util/algorithm';
import { File } from '../../src/types';

describe('util/algorithm.ts', () => {
  describe('compareImageContents', () => {
    it('should return only similar images', async () => {
      const imagePath = './tests/images_test/algorithm/compare_image_contents_scenario';
      const { imageFiles } = await retrieveImages(imagePath);
      const { similarImages } = await compareImageContents(imageFiles);

      const sameImagesA = similarImages[0].files; // 2 images - different folders
      const sameImagesB = similarImages[1].files; // 2 images - same folder
      const sameImagesC = similarImages[2].files; // 3 images - same folder
      const sameImagesD = similarImages[3].files; // 4 images - different folders

      // Ensure that the correct number of files have been retrieved for each
      expect(sameImagesA).toHaveLength(2);
      expect(sameImagesB).toHaveLength(2);
      expect(sameImagesC).toHaveLength(3);
      expect(sameImagesD).toHaveLength(4);

      // Ensure that the correct images have been grouped
      sameImagesA.forEach(image => {
        expect(image.fileName).toContain('a_image');
      });

      sameImagesB.forEach(image => {
        expect(image.fileName).toContain('b_image');
      });

      sameImagesC.forEach(image => {
        expect(image.fileName).toContain('c_image');
      });

      sameImagesD.forEach(image => {
        expect(image.fileName).toContain('d_image');
      });
    });
  });
});
