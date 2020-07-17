function hasProperty(obj, propName) {
  return Object.hasOwnProperty.call(obj, propName);
}
module.exports = hasProperty;
