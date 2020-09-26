const genderTypes = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHERS: "OTHERS",
};

Object.freeze(genderTypes);

exports.inList = Object.keys(genderTypes);


exports.enum = genderTypes;
