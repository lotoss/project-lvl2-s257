import text from './text';
import plain from './plain';
import json from './json';

const formats = {
  text,
  plain,
  json,
};

export default (format) => {
  if (!formats[format]) {
    throw new Error(`Wrong render format: ${format}`);
  }
  return formats[format];
};
