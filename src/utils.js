export const  adaptToCamelCase = (obj) => {
  if (typeof (obj) !== `object`) {
    return obj;
  }
  // eslint-disable-next-line guard-for-in
  for (const oldName in obj) {
    const newName = oldName.replace(/([-_][a-z])/g,
    // eslint-disable-next-line indent
    (group) => group.toUpperCase().replace(`-`, ``).replace(`_`, ``));

    if (newName !== oldName) {

      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    // eslint-disable-next-line space-unary-ops
    if (typeof(obj[newName]) === `object`) {
      obj[newName] = adaptToCamelCase(obj[newName]);
    }
  }

  return obj;
};
