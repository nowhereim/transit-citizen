const User = require("./schemas/user");

exports.unset = (value) => {
  User.updateOne(
    { nickname: value.name },
    { $unset: { location: "" } },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

exports.set = (value) => {
  User.updateOne(
    { nickname: value.name },
    { $set: { location: value.location } },
    (err, data) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
