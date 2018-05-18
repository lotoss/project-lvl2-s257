import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Unknown format: ${format}`);
  }
  return parser;
};
