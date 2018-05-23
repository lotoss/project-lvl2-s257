import flatten from 'lodash/flatten';
import { getType, getKey, getChildren, getValue, getPrevValue, getNextValue, isRoot } from '../ast';

const stringify = value => typeof value === 'object' ? 'complex value' : JSON.stringify(value).replace(/"/gmi, '\'');

const render = (parentKeys = []) => (node) => {
  const renderKey = () => [...parentKeys, getKey(node)].filter(str => str).join('.');
  const renders = {
    AddedNode: () => `Property '${renderKey()}' was added with value: ${stringify(getValue(node))}`,
    RemovedNode: () => `Property '${renderKey()}' was removed`,
    ChangedNode: () => `Property '${renderKey()}' was updated. From ${stringify(getPrevValue(node))} to ${stringify(getNextValue(node))}`,
    NotChangedNode: () => '',
    NestedNode: () => flatten(getChildren(node).map(render([...parentKeys, getKey(node)])).filter(str => str)),
  };

  const renderNode = renders[getType(node, getKey(node))];
  if (!renderNode) {
    throw new Error(`Unknown node type: ${getType(node)}`);
  }

  return isRoot(node) ? renderNode().join('\n') : renderNode();
};

export default render();
