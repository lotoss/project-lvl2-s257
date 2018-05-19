import { readFileSync } from 'fs';
import { extname } from 'path';
// import util from 'util';


import getParser from './parsers';
import render from './render';
import getDiffAst from './ast';

// const trace = (label, value) => {
//   console.log(label, util.inspect(value, { showHidden: false, depth: null }));
//   return value;
// };


const loadDataFromFile = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  const parse = getParser(extname(pathToFile));
  return parse(data);
};


export default (pathToFile1, pathToFile2) => {
  try {
    const content1 = loadDataFromFile(pathToFile1);
    const content2 = loadDataFromFile(pathToFile2);
    return render(getDiffAst(content1, content2));
  } catch (error) {
    console.log(error);
    return error;
  }
};
