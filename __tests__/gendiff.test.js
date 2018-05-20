import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';


describe('gendiff tests', () => {
  describe('plain config', () => {
    const beforeJsonPath = resolve(__dirname, './__fixtures__/before.json');
    const afterJsonPath = resolve(__dirname, './__fixtures__/after.json');

    const beforeYamlPath = resolve(__dirname, './__fixtures__/before.yml');
    const afterYamlPath = resolve(__dirname, './__fixtures__/after.yml');

    const beforeIniPath = resolve(__dirname, './__fixtures__/before.ini');
    const afterIniPath = resolve(__dirname, './__fixtures__/after.ini');

    const sameFilesPath = resolve(__dirname, './__fixtures__/same.expect');
    const differentFilesPath = resolve(__dirname, './__fixtures__/different.expect');

    const sameFilesResult = readFileSync(sameFilesPath, 'utf8').trim();
    const differentFilesResult = readFileSync(differentFilesPath, 'utf8').trim();

    describe('compare JSON', () => {
      test('compare same files', () => {
        expect(gendiff(beforeJsonPath, beforeJsonPath)).toBe(sameFilesResult);
      });

      test('compare different files', () => {
        expect(gendiff(beforeJsonPath, afterJsonPath)).toBe(differentFilesResult);
      });
    });

    describe('compare YAML', () => {
      test('compare same files', () => {
        expect(gendiff(beforeYamlPath, beforeYamlPath)).toBe(sameFilesResult);
      });

      test('compare different files', () => {
        expect(gendiff(beforeYamlPath, afterYamlPath)).toBe(differentFilesResult);
      });
    });

    describe('compare INI', () => {
      test('compare same files', () => {
        expect(gendiff(beforeIniPath, beforeIniPath)).toBe(sameFilesResult);
      });

      test('compare different files', () => {
        expect(gendiff(beforeIniPath, afterIniPath)).toBe(differentFilesResult);
      });
    });
  });

  describe('nesting config', () => {
    const beforeJsonPath = resolve(__dirname, './__fixtures__/nesting/before.json');
    const afterJsonPath = resolve(__dirname, './__fixtures__/nesting/after.json');

    const beforeYamlPath = resolve(__dirname, './__fixtures__/nesting/before.yml');
    const afterYamlPath = resolve(__dirname, './__fixtures__/nesting/after.yml');
    //
    // const beforeIniPath = resolve(__dirname, './__fixtures__/nesting/before.ini');
    // const afterIniPath = resolve(__dirname, './__fixtures__/nesting/after.ini');

    const sameFilesPath = resolve(__dirname, './__fixtures__/nesting/same.expect');
    const differentFilesPath = resolve(__dirname, './__fixtures__/nesting/different.expect');

    const sameFilesResult = readFileSync(sameFilesPath, 'utf8').trim();
    const differentFilesResult = readFileSync(differentFilesPath, 'utf8').trim();

    describe('compare JSON', () => {
      test('compare same files', () => {
        expect(gendiff(beforeJsonPath, beforeJsonPath)).toBe(sameFilesResult);
      });

      test('compare different files', () => {
        expect(gendiff(beforeJsonPath, afterJsonPath)).toBe(differentFilesResult);
      });
    });

    describe('compare YAML', () => {
      test('compare same files', () => {
        expect(gendiff(beforeYamlPath, beforeYamlPath)).toBe(sameFilesResult);
      });

      test('compare different files', () => {
        expect(gendiff(beforeYamlPath, afterYamlPath)).toBe(differentFilesResult);
      });
    });

    // describe.skip('compare INI', () => {
    //   test('compare same files', () => {
    //     expect(gendiff(beforeIniPath, beforeIniPath)).toBe(sameFilesResult);
    //   });
    //
    //   test('compare different files', () => {
    //     expect(gendiff(beforeIniPath, afterIniPath)).toBe(differentFilesResult);
    //   });
    // });
  });
});
