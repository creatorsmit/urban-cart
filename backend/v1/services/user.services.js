const User = require("../../models/user.model");

exports.getUser = async (idOrEmail, fieldName = "_id") => {
  const data = await User.findOne({
    [fieldName]: `${idOrEmail}`,
    deleted_at: null,
  });
  return data;
};

exports.updateUser = async (conditionData, updateData) => {
  try {
    const { nModified } = await User.updateOne(
      conditionData,
      {
        $set: updateData,
      },
      {
        runValidators: true,
      }
    );

    return nModified;
  } catch (err) {
    throw err;
  }
};

exports.generateTRD = async () => {
  let newID = "";
  const user = await User.find().sort({ _id: -1 }).limit(1);
  if (!user) {
    return "TRD001";
  }

  const id = user[0].user_code.slice(3, user[0].user_code.length);
  let idNum = parseInt(id);
  if (id.match(/^[0][0][0-8]$/)) {
    idNum += 1;
    newID = `00${idNum}`;
  } else if (id.match(/^[0][0][9]$/)) {
    idNum += 1;
    newID = `0${idNum}`;
  } else if (id.match(/^[0][9][9]$/)) {
    newID = idNum + 1;
  } else if (id.match(/^[0][1-9][0-9]$/)) {
    idNum += 1;
    newID = `0${idNum}`;
  } else {
    newID = idNum + 1;
  }
  return `TRD${newID}`;
};
