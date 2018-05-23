const attach = (type, content) => {
  const attached = func => func(type, content);
  attached.attached = true;
  return attached;
};

const hasTag = attached => (typeof attached === 'function' && attached.attached === true);

const contents = (attached) => {
  if (!hasTag(attached)) {
    throw new Error('This has no attached type tag');
  }
  return attached((type, content) => content);
};

const typeTag = (attached) => {
  if (!hasTag(attached)) {
    throw new Error('This has no attached type tag');
  }
  return attached(type => type);
};

let defined = [];

const predicate = (searchType, searchName) =>
  ({ type, name }) => searchName === name && searchType === type;

const hasDefined = (type, name) => !!defined.find(predicate(type, name));

const registrate = (type, name, func) => {
  if (hasDefined(type, name)) {
    throw new Error(`You mathod ${name} for type ${type} has been already registated`);
  }
  defined = [...defined, { type, name, func }];
};

const getMethod = (attached, methodName) => {
  const typeName = typeTag(attached);
  if (!hasDefined(typeName, methodName)) {
    throw new Error(`You can't call mathod ${methodName} for ${typeTag(attached)} type`);
  }
  return defined.find(predicate(typeTag(attached), methodName)).func;
};

export {
  attach,
  contents,
  typeTag,
  registrate,
  getMethod,
  hasDefined,
};
