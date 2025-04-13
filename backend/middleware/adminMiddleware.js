const jwt = require("jsonwebtoken");
const { User } = require("../models");
const SECRET = process.env.JWT_SECRET;

/**
 * Checks if the current user has system adminstrator priveleges.
 * @param {*} req incoming http request.
 * @param {*} res outgoing http response.
 * @param {*} next pass control to the next middleware function in the request-response chain.
 */
const verifyIsAdmin = (req, res, next) => {
  // initially check for a request from the user.
  if (!req.user) {
    return res.status(401).json({ error: "User Authentication Failed!" });
  }
  // then check that the user request has admin privileges.
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Must Have Administrator Priveleges!" });
  }
  next()
}

module.exports = verifyIsAdmin;