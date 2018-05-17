import { readFileSync } from 'fs';
import { extname } from 'path';
import union from 'lodash/union';
import has from 'lodash/has';

const getDiffs = (obj1, obj2) => {
  const getDiff = (sign, key, value) => `${sign} ${key}: ${value}`;
  const iter = ([...rez], [key, ...keys]) => {
    if (!key) {
      return `{\n${rez.join('\n')}\n}`;
    }

    if (obj1[key] !== obj2[key]) {
      if (has(obj2, key)) {
        rez.push(getDiff('+', key, obj2[key]));
      }
      if (has(obj1, key)) {
        rez.push(getDiff('-', key, obj1[key]));
      }
    } else {
      rez.push(getDiff(' ', key, obj1[key]));
    }

    return iter(rez, keys);
  };
  const keysUnion = union(Object.keys(obj1), Object.keys(obj2));
  return iter([], keysUnion);
};

const getContent = (pathToFile) => {
  const type = extname(pathToFile);
  const content = readFileSync(pathToFile, 'utf8');

  switch (type) {
    case '.json':
      return JSON.parse(content);

    case '.yml':
      return JSON.parse(content);

    default:
      return content;
  }
};

export default (pathToFile1, pathToFile2) => {
  try {
    const content1 = getContent(pathToFile1);
    const content2 = getContent(pathToFile2);

    return getDiffs(content1, content2);
  } catch (error) {
    console.log(error);
    return error;
  }
};
