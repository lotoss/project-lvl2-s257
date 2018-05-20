const configs = {
  notChanged: prevValue => ({ value: prevValue }),
  added: (prevValue, nextValue) => ({ value: nextValue }),
  removed: prevValue => ({ value: prevValue }),
  changed: (prevValue, nextValue) => ({ before: prevValue, after: nextValue }),
};


const getOption = (state, prevValue, nextValue) => configs[state](prevValue, nextValue);

const renderNode = ({
  prevValue,
  nextValue,
  state,
  children,
}) => {
  if (children.length > 0) {
    return children.reduce(
      (acc, { key: itemKey, ...item }) => ({ ...acc, [itemKey]: renderNode(item) }),
      {},
    );
  }
  return {
    state,
    ...getOption(state, prevValue, nextValue),
  };
};

export default ast => JSON.stringify(renderNode(ast));
