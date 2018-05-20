const isUndefined = value => value === undefined;

const stringifiers = {
  number: value => value,
  boolean: value => value,
  string: value => `'${value}'`,
  object: () => 'complex value',
};
const stringify = value => stringifiers[typeof value](value);

const renders = [
  {
    predicate: (prevValue, nextValue) => isUndefined(prevValue) && !isUndefined(nextValue),
    render: (key, prevValue, nextValue) => `Property '${key}' was added with value: ${stringify(nextValue)}`,
  },
  {
    predicate: (prevValue, nextValue) => !isUndefined(prevValue) && isUndefined(nextValue),
    render: key => `Property '${key}' was removed`,
  },
  {
    predicate: (prevValue, nextValue) => prevValue !== nextValue,
    render: (key, prevValue, nextValue) => `Property '${key}' was updated. From ${stringify(prevValue)} to ${stringify(nextValue)}`,
  },
  {
    predicate: () => true,
    render: () => '',
  },
];

const renderKey = (...keysArr) => keysArr.filter(key => key).join('.');

const render = (parentKey = []) => ({
  children,
  prevValue,
  nextValue,
  key,
}) => {
  if (children.length > 0) {
    return children.map(render([...parentKey, key])).filter(rez => rez).join('\n');
  }

  const { render: renderLeaf } = renders.find(({ predicate }) => predicate(prevValue, nextValue));
  return renderLeaf(renderKey(...parentKey, key), prevValue, nextValue);
};

export default render();
