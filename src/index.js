import { readFileSync } from 'fs';
import uniq from 'lodash/uniq';

const getDiffs = (obj1, obj2) => {
  const getDiff = (sign, key, value) => `${sign} ${key}: ${value}`;
  const iter = ([...rez], [key, ...keys]) => {
    if (!key) {
      return `{\n${rez.join('\n')}\n}`;
    }

    if (obj1[key] !== obj2[key]) {
      if (obj2[key] !== undefined) {
        rez.push(getDiff('+', key, obj2[key]));
      }
      if (obj1[key] !== undefined) {
        rez.push(getDiff('-', key, obj1[key]));
      }
    } else {
      rez.push(getDiff(' ', key, obj1[key]));
    }

    return iter(rez, keys);
  };
  return iter([], uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
};

export default (pathToFile1, pathToFile2) => {
  try {
    const content1 = JSON.parse(readFileSync(pathToFile1, 'utf8'));
    const content2 = JSON.parse(readFileSync(pathToFile2, 'utf8'));
    return getDiffs(content1, content2);
  } catch (error) {
    console.log(error);
    return error;
  }
};
