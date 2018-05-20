import union from 'lodash/union';

const isUndefined = value => value === undefined;

const states = [
  {
    predicate: (prevValue, nextValue) => prevValue === nextValue,
    value: 'notChanged',
  },
  {
    predicate: (prevValue, nextValue) => isUndefined(prevValue) && !isUndefined(nextValue),
    value: 'added',
  },
  {
    predicate: (prevValue, nextValue) => !isUndefined(prevValue) && isUndefined(nextValue),
    value: 'removed',
  },
  {
    predicate: () => true,
    value: 'changed',
  },
];

const makeNode = (key, {
  prevValue,
  nextValue,
  children = [],
}) => {
  const { value: state } = states.find(({ predicate }) => predicate(prevValue, nextValue));
  return {
    key,
    nextValue,
    children,
    prevValue,
    state,
  };
};

const getDiffAst = (prevValue, nextValue, key = '') => {
  if (typeof prevValue === 'object' && typeof nextValue === 'object') {
    const keysUnion = union(Object.keys(prevValue), Object.keys(nextValue));
    const children = keysUnion.reduce((acc, childKey) => ([
      ...acc,
      getDiffAst(prevValue[childKey], nextValue[childKey], childKey),
    ]), []);
    return makeNode(key, { children });
  }
  return makeNode(key, { prevValue, nextValue });
};

export default getDiffAst;
