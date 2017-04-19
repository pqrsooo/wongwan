
exports.restrict = (req, res, next) => {
  if (!req.session.user) {
    res.status(403).json({
      isLogin: false,
      message: 'Access denied!',
    });
  } else {
    next();
  }
};

