import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';

test('compare same files', () => {
  const pathToFile1 = resolve(__dirname, './__fixtures__/test1.f1.json');
  const pathToFile2 = resolve(__dirname, './__fixtures__/test1.f2.json');
  const rez = readFileSync(resolve(__dirname, './__fixtures__/test1.expect'), 'utf8').trim();
  expect(gendiff(pathToFile1, pathToFile2)).toBe(rez);
});

test('compare different files', () => {
  const pathToFile1 = resolve(__dirname, './__fixtures__/test2.f1.json');
  const pathToFile2 = resolve(__dirname, './__fixtures__/test2.f2.json');
  const rez = readFileSync(resolve(__dirname, './__fixtures__/test2.expect'), 'utf8').trim();
  expect(gendiff(pathToFile1, pathToFile2)).toBe(rez);
});
