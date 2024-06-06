const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../consts");
const User = require("../models/User.model");

async function protectionMiddleware(req, res, next) {
  try {
    // token is sent in the headers as `Bearer <token>`
    const token = req.headers.authorization?.split(" ")[1];
    //si pas de token
    if (!token) {
      res.status(401).json({ message: "Missing Bearer Token" });
      return;
    }
    // console.log(token);
    // verifies the token and returns the payload, decryptage du token recu p/r à la clé token_secret
    const { email } = jwt.verify(token, TOKEN_SECRET);

    const user = await User.findOne({ email: email }, { password: 0 });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // store the found user in the request object, so it's available in the next middleware
    req.user = user;
    next();
  } catch (err) {
    if (err.name.includes("Token")) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      next(err);
    }
  }
}

module.exports = protectionMiddleware;
