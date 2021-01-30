import {
  retrieveImages,
} from '../../src/util/format';

describe('util/format.ts', () => {
  describe('retrieveImages', () => {
    it('should return only valid images and all folders', async () => {
      const imagePath = './tests/images_test/validation/retrieve_images_scenario';
      const { imageFiles } = await retrieveImages(imagePath);

      const retrieveFileName = (fileName: string) => imageFiles.find(file => file.fileName === fileName);

      // Ensure folders are added
      expect(retrieveFileName('image_folder')).toBeTruthy();
      expect(retrieveFileName('not_image_folder')).toBeTruthy();
      expect(retrieveFileName('some_image_folder')).toBeTruthy();

      // Ensure images are added
      expect(retrieveFileName('is_image_1.jpg')).toBeTruthy();
      expect(retrieveFileName('is_image_2.jpg')).toBeTruthy();
      expect(retrieveFileName('is_image_3.jpg')).toBeTruthy();

      // Ensure non-images are not added
      expect(retrieveFileName('not_image_1.txt')).toBeUndefined();
      expect(retrieveFileName('not_image_2.html')).toBeUndefined();
      expect(retrieveFileName('not_image_3.md')).toBeUndefined();
    });
  });
});
