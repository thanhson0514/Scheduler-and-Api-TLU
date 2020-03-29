module.exports = function(req, res, next) {
  if (req.headers["authorization"]) {
    req.token = req.headers["authorization"].split(" ")[1];
    return next();
  }
  res.status(401).json({
    success: false
  });
};
