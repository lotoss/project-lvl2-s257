import { readFileSync } from 'fs';
import { extname } from 'path';


import getParser from './parsers';
import render from './render';
import getDiffAst from './ast';


const loadDataFromFile = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  const parse = getParser(extname(pathToFile));
  return parse(data);
};


export default (pathToFile1, pathToFile2, format = 'text') => {
  const content1 = loadDataFromFile(pathToFile1);
  const content2 = loadDataFromFile(pathToFile2);
  return render(format)(getDiffAst(content1, content2));
};
