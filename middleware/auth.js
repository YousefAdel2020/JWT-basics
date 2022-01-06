const jwt = require("jsonwebtoken");
const {unauthenticated} = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unauthenticated("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };


  } catch (error) {
    throw new unauthenticated("Not authorized to access this route");
  }

  next();
};

module.exports = authMiddleware;
