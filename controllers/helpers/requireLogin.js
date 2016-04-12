var requireLogin = function(req, res, next) {
  if (!req.session.isLoggedIn) { //if no user is signed in
 	req.session.reset();
    res.json({"error": "You must be logged in to perform this action. Did you log out in another tab?"});
  }
  else {
    next();
  }
};
module.exports = requireLogin;