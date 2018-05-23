import flatten from 'lodash/flatten';

import { getType, getKey, getChildren, getValue, getPrevValue, getNextValue, isRoot } from '../ast';

const renderKey = key => `${key ? `${key}: ` : ''}`;
const spaced = (count, skipFirstString) => (arg) => {
  if (!Array.isArray(arg)) {
    return `${' '.repeat(count)}${arg}`;
  }
  return arg.map((str, idx) => {
    if (skipFirstString && idx === 0) {
      return str;
    }
    return spaced(count)(str);
  });
};

const stringify = (value) => {
  const stringifyObject = (obj) => {
    const content = Object.entries(obj).map(([key, val]) => `${renderKey(key)}${stringify(val)}`);
    return ['{', ...flatten(spaced(4)(content)), '}'];
  };

  if (typeof value === 'object') {
    // return 'complex value';
    return flatten(stringifyObject(value));
  }
  return JSON.stringify(value).replace(/"/gmi, '');
};

const renderKeyValue = (key, value) => {
  if (Array.isArray(value)) {
    const [firstStr, ...rest] = value;
    return flatten([renderKeyValue(key, firstStr), ...rest]);
  }
  return [`${renderKey(key)}${value}`];
};


const render = (node) => {
  const renders = {
    NotChangedNode: () =>
      flatten([spaced(2)(renderKeyValue(getKey(node), stringify(getValue(node))))]),
    AddedNode: () => spaced(2, true)(flatten([renderKeyValue(`+ ${getKey(node)}`, stringify(getValue(node)))])),
    RemovedNode: () => spaced(2, true)(flatten([renderKeyValue(`- ${getKey(node)}`, stringify(getValue(node)))])),
    ChangedNode: () => flatten([
      spaced(2, true)(renderKeyValue(`- ${getKey(node)}`, stringify(getPrevValue(node)))),
      spaced(2, true)(renderKeyValue(`+ ${getKey(node)}`, stringify(getNextValue(node)))),
    ]),
    NestedNode: () => spaced(isRoot(node) ? 0 : 2)([`${getKey(node) ? `${getKey(node)}: ` : ''}{`, ...flatten(spaced(2)(getChildren(node).map(render))), '}']),
  };

  const renderNode = renders[getType(node)];
  if (!renderNode) {
    throw new Error(`Unknown node type: ${getType(node)}`);
  }

  return isRoot(node) ? renderNode().join('\n') : renderNode();
};

export default render;
