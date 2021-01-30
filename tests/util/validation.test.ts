import {
  validateCommandlineArguments,
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
        '/cogent-coding-challenge/node_modules/.bin/ts-node',
        '/cogent-coding-challenge/src/index.ts',
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
        '/cogent-coding-challenge/node_modules/.bin/ts-node',
        '/cogent-coding-challenge/src/index.ts',
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
        '/cogent-coding-challenge/node_modules/.bin/ts-node',
        '/cogent-coding-challenge/src/index.ts',
        './tests/images_test'
      ];

      const { imageFolderPath } = validateCommandlineArguments(argumentArray);

      expect(imageFolderPath).toBe(argumentArray[2]);
      expect(consoleLogSpy).toBeCalledTimes(0);
      expect(processExitSpy).toBeCalledTimes(0);
    });
  });
});
