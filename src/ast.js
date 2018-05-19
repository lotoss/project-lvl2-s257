import union from 'lodash/union';


const makeNode = (key, {
  prevValue,
  nextValue,
  children = [],
}) => ({
  key,
  nextValue,
  children,
  prevValue,
});

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
