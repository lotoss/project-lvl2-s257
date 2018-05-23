import * as node from './node';

const {
  getType,
  isRoot,
  getChildren,
  getValue,
  getPrevValue,
  getNextValue,
  getKey,
} = node;

const getDiffAst = (prevValue, nextValue) => node.make(undefined, prevValue, nextValue);

export {
  getType,
  isRoot,
  getKey,
  getChildren,
  getValue,
  getPrevValue,
  getNextValue,
  getDiffAst as default,
};
