const isNotLoggedIn = (req, res, next) => {
  if (!res.locals.user) {
    next();
  } else {
    res.status(400).send({ error: "잘못된 요청입니다" });
  }
};

module.exports = isNotLoggedIn;
