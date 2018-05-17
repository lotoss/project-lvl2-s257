import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';

const beforeJsonPath = resolve(__dirname, './__fixtures__/before.json');
const afterJsonPath = resolve(__dirname, './__fixtures__/after.json');

const beforeYamlPath = resolve(__dirname, './__fixtures__/before.yml');
const afterYamlPath = resolve(__dirname, './__fixtures__/after.yml');

const sameFilesResult = readFileSync(resolve(__dirname, './__fixtures__/same.expect'), 'utf8').trim();
const differentFilesResult = readFileSync(resolve(__dirname, './__fixtures__/different.expect'), 'utf8').trim();

describe('gendiff tests', () => {
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
});
