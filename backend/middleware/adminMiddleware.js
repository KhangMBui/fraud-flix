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

}