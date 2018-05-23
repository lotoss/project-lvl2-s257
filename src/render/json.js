import { getType, getKey, getChildren, getValue, getPrevValue, getNextValue } from '../ast';

const render = (node) => {
  const renders = {
    NotChangedNode: () => ({ type: getType(node), value: getValue(node) }),
    AddedNode: () => ({ type: getType(node), value: getValue(node) }),
    RemovedNode: () => ({ type: getType(node), value: getValue(node) }),
    ChangedNode: () => ({
      type: getType(node),
      before: getPrevValue(node),
      after: getNextValue(node),
    }),
    NestedNode: () => getChildren(node).reduce(
      (acc, child) => ({ ...acc, [getKey(child)]: render(child) }),
      {},
    ),
  };

  const renderNode = renders[getType(node)];
  if (!renderNode) {
    throw new Error(`Unknown node type: ${getType(node)}`);
  }

  return renderNode();
};

export default ast => JSON.stringify(render(ast));
