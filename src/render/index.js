import pretty from './pretty';
import plain from './plain';
import json from './json';

const formats = {
  pretty,
  plain,
  json,
};

export default (format) => {
  if (!formats[format]) {
    throw new Error(`Wrong render format: ${format}`);
  }
  return formats[format];
};
