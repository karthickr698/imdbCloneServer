const genderTypes = require("../utils/genderEnum");

module.exports = function (value) {
  if (genderTypes.inList.indexOf(value) === -1) {
    throw new Error("Gender types does not match with given options");
  }
  return true;
};
