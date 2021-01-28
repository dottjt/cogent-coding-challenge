import {
  validateCommandlineArguments,
  retrieveImages,
} from '../../src/util/validation';

describe('util/validation.ts', () => {
  describe('validateCommandlineArguments', () => {

    let consoleLogSpy;
    let processExitSpy;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(global.console, 'log');
      processExitSpy = jest.spyOn(global.process, 'exit').mockImplementation();
    });

    afterEach(jest.clearAllMocks);

    it('should throw error if argumentArray does not contain exact amount of valid arguments', () => {
      const argumentArray = [
        '/cogent-take-home-test/node_modules/.bin/ts-node',
        '/cogent-take-home-test/src/index.ts',
        './images',
        'hello stranger!'
      ];

      validateCommandlineArguments(argumentArray);

      expect(consoleLogSpy).toBeCalledTimes(1);
      expect(consoleLogSpy).toBeCalledWith('Please provide expected arguments i.e. \`npm start ./images\`.');
      expect(processExitSpy).toBeCalledTimes(1);
      expect(processExitSpy).toBeCalledWith(1);
    });

    it('should throw error if imageFolder Argument is not a valid folder', () => {
      const argumentArray = [
        '/cogent-take-home-test/node_modules/.bin/ts-node',
        '/cogent-take-home-test/src/index.ts',
        './tests/main.test.ts'
      ];

      validateCommandlineArguments(argumentArray);

      expect(consoleLogSpy).toBeCalledTimes(1);
      expect(consoleLogSpy).toBeCalledWith('Please provide a valid folder directory to the application.');
      expect(processExitSpy).toBeCalledTimes(1);
      expect(processExitSpy).toBeCalledWith(1);
    });

    it('should return valid folder path if arguments are formatted corrected', () => {
      const argumentArray = [
        '/cogent-take-home-test/node_modules/.bin/ts-node',
        '/cogent-take-home-test/src/index.ts',
        './tests/images_test'
      ];

      const { imageFolderPath } = validateCommandlineArguments(argumentArray);

      expect(imageFolderPath).toBe(argumentArray[2]);
      expect(consoleLogSpy).toBeCalledTimes(0);
      expect(processExitSpy).toBeCalledTimes(0);
    });
  });

  describe('retrieveImages', () => {
    it('should return only valid images and all folders', () => {
      const imagePath = './tests/images_test/validation/retrieve_images_scenario';
      const { imageFiles } = retrieveImages(imagePath);

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
