exports.restrict = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({
      isLogin: false,
      message: req.session.error,
    });
  }
};
