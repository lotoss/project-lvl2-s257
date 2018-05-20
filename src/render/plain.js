const stringifiers = {
  number: value => value,
  boolean: value => value,
  string: value => `'${value}'`,
  object: () => 'complex value',
};
const stringify = value => stringifiers[typeof value](value);

const renders = {
  added: (key, prevValue, nextValue) => `Property '${key}' was added with value: ${stringify(nextValue)}`,
  removed: key => `Property '${key}' was removed`,
  changed: (key, prevValue, nextValue) => `Property '${key}' was updated. From ${stringify(prevValue)} to ${stringify(nextValue)}`,
  notChanged: () => '',
};

const renderKey = (...keysArr) => keysArr.filter(key => key).join('.');

const render = (parentKey = []) => ({
  children,
  prevValue,
  nextValue,
  key,
  state,
}) => {
  if (children.length > 0) {
    return children.map(render([...parentKey, key])).filter(rez => rez).join('\n');
  }

  const renderLeaf = renders[state];
  return renderLeaf(renderKey(...parentKey, key), prevValue, nextValue);
};

export default render();
