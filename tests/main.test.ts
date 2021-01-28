import {
  main,
} from '../src/main';

describe('main.ts', () => {
  describe('', () => {

    let consoleLogSpy;
    let processExitSpy;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(global.console, 'log');
      processExitSpy = jest.spyOn(global.process, 'exit').mockImplementation();
    });

    afterEach(jest.clearAllMocks);

    // it('etc.', () => {
    //   const argumentArray = [
    //     '/cogent-take-home-test/node_modules/.bin/ts-node',
    //     '/cogent-take-home-test/src/index.ts'
    //   ];

    //   main(argumentArray);

    //   expect(consoleLogSpy).toBeCalledTimes(1);
    //   expect(consoleLogSpy).toBeCalledWith('');
    //   expect(processExitSpy).toBeCalledTimes(1);
    //   expect(processExitSpy).toBeCalledWith(0);
    // });

});

// * What if this same solution was used on a really large set of photos? What if it was a thousand photos? Or tens of thousands?

// * What if this was a three-way merge, with triplicates? Does your solution account for this?

// * Some of these files may have had their filename changed.

// * Some of these may have only their extension changed.
