const keyValue = (key, value) => `${key ? `${key}: ` : ''}${value}`;
const prepended = (str, value) => str + value;
const spaced = count => str => str.split('\n').map(item => ' '.repeat(count) + item).join('\n');
const isUndefined = value => value === undefined;


const stringify = (value) => {
  const stringifyObject = (obj) => {
    const content = Object.entries(obj).map(([key, val]) => keyValue(key, stringify(val))).join('\n');
    return `{\n${spaced(6)(content)}\n${spaced(2)('}')}`;
  };

  if (typeof value === 'object') {
    return stringifyObject(value);
  }
  return JSON.stringify(value).replace(/"/gmi, '');
};

const notChanged = (key, prevValue) => prepended('  ', keyValue(key, stringify(prevValue)));
const added = (key, prevValue, nextValue) => prepended('+ ', keyValue(key, stringify(nextValue)));
const removed = (key, prevValue) => prepended('- ', keyValue(key, stringify(prevValue)));
const changed = (...args) => [removed(...args), added(...args)].join('\n');


const renders = [
  {
    predicate: (prevValue, nextValue) => prevValue === nextValue,
    render: notChanged,
  },
  {
    predicate: (prevValue, nextValue) => isUndefined(prevValue) && !isUndefined(nextValue),
    render: added,
  },
  {
    predicate: (prevValue, nextValue) => !isUndefined(prevValue) && isUndefined(nextValue),
    render: removed,
  },
  {
    predicate: (prevValue, nextValue) => prevValue !== nextValue,
    render: changed,
  },
];


const render = ({
  key,
  nextValue,
  children,
  prevValue,
}) => {
  const renderNode = () => `${key ? `${key}: ` : ''}{\n${children.map(render).join('\n')}\n}`;

  if (children.length > 0) {
    return spaced(key === '' ? 0 : 4)(renderNode());
  }

  try {
    const { render: renderLeaf } = renders.find(({ predicate }) => predicate(prevValue, nextValue));
    return spaced(2)(renderLeaf(key, prevValue, nextValue));
  } catch (err) {
    console.log(err);
    throw new Error(`Can't select render by values ${prevValue} and ${nextValue}`);
  }
};

export default render;
