import { readFileSync } from 'fs';
import { extname } from 'path';

import union from 'lodash/union';
import has from 'lodash/has';

import getParser from './parsers';

const signs = {
  noChange: ' ',
  add: '+',
  remove: '-',
};

const makeDiff = (key, action, value) => ({ key, action, value });
const diffToString = ({ action, key, value }) => `${signs[action]} ${key}: ${value}`;


const getDiffs = (obj1, obj2) => {
  const hasNoChange = key => obj1[key] === obj2[key];
  const isAdded = key => has(obj2, key);
  const isRemoved = key => has(obj1, key);

  const getDiff = (key) => {
    if (hasNoChange(key)) {
      return [makeDiff(key, 'noChange', obj1[key])];
    }
    return [
      isAdded(key) ? makeDiff(key, 'add', obj2[key]) : undefined,
      isRemoved(key) ? makeDiff(key, 'remove', obj1[key]) : undefined,
    ].filter(val => val);
  };

  const keysUnion = union(Object.keys(obj1), Object.keys(obj2));

  return keysUnion.reduce((acc, key) => [...acc, ...getDiff(key)], []);
};


const loadDataFromFile = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  const parser = getParser(extname(pathToFile));
  return parser(data);
};

const render = (diffs = []) => `{\n${diffs.map(diffToString).join('\n')}\n}`;

export default (pathToFile1, pathToFile2) => {
  try {
    const content1 = loadDataFromFile(pathToFile1);
    const content2 = loadDataFromFile(pathToFile2);

    return render(getDiffs(content1, content2));
  } catch (error) {
    console.log(error);
    return error;
  }
};
