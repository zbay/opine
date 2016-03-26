var sanitize = require("mongo-sanitize");

function cleanBody(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

module.exports = cleanBody;