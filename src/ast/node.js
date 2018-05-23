import union from 'lodash/union';
import has from 'lodash/has';
import { attach, typeTag, contents, registrate, getMethod } from './type';

const make = (key, prevValue, nextValue) => {
  const types = {
    nested: {
      make: () => {
        const keysUnion = union(Object.keys(prevValue), Object.keys(nextValue));
        const children = keysUnion.map(childKey =>
          make(childKey, prevValue[childKey], nextValue[childKey]));

        return attach('NestedNode', key ? { key, children } : { children });
      },
      predicate: () => typeof prevValue === 'object' && typeof nextValue === 'object',
    },
    added: {
      make: () => attach('AddedNode', { key, value: nextValue }),
      predicate: () => prevValue === undefined && nextValue !== undefined,
    },
    removed: {
      make: () => attach('RemovedNode', { key, value: prevValue }),
      predicate: () => prevValue !== undefined && nextValue === undefined,
    },
    notChanged: {
      make: () => attach('NotChangedNode', { key, value: prevValue }),
      predicate: () => prevValue === nextValue,
    },
    changed: {
      make: () => attach('ChangedNode', { key, prevValue, nextValue }),
      predicate: () => prevValue !== nextValue,
    },
  };

  try {
    return Object.values(types).find(({ predicate }) => predicate(prevValue, nextValue))
      .make(key, prevValue, nextValue);
  } catch (error) {
    console.log(error);
    throw new Error(`Can't detect node type for values: ${prevValue} and ${nextValue}`);
  }
};

registrate('NestedNode', 'getChildren', node => contents(node).children);
registrate('AddedNode', 'getValue', node => contents(node).value);
registrate('RemovedNode', 'getValue', node => contents(node).value);
registrate('NotChangedNode', 'getValue', node => contents(node).value);
registrate('ChangedNode', 'getPrevValue', node => contents(node).prevValue);
registrate('ChangedNode', 'getNextValue', node => contents(node).nextValue);


const getType = node => typeTag(node);
const isRoot = node => !has(contents(node), 'key');
const getKey = node => contents(node).key;
const getValue = node => getMethod(node, 'getValue')(node);
const getPrevValue = node => getMethod(node, 'getPrevValue')(node);
const getNextValue = node => getMethod(node, 'getNextValue')(node);
const getChildren = node => getMethod(node, 'getChildren')(node);

export {
  make,
  isRoot,
  getKey,
  getValue,
  getType,
  getChildren,
  getPrevValue,
  getNextValue,
};
