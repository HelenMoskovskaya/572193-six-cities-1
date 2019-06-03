export const  adaptToCamelCase = (obj) => {
  if (typeof (obj) !== `object`) {
    return obj;
  }

  for(const oldName in obj){
    const newName = oldName.replace(/([-_][a-z])/g,
    (group) => group.toUpperCase().replace('-', '').replace('_', ''));

    if (newName != oldName) {

      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    if (typeof(obj[newName]) == "object") {
      obj[newName] = adaptToCamelCase(obj[newName]);
    }
  }

  return obj;
};
