const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {

    // get token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401); // unauthorized
    }

    // Verify the token
    const jwtkey = process.env.JWT_KEY;
    jwt.verify(token, jwtkey, (err, payload) => {
      if (err) {
        return res.sendStatus(403); // forbidden
      }

      // Token is valid, set the id on the request object
      req.user_id = payload.user_id;
      next();
    });
  } catch (error) {
    res.sendStatus(500);
  }
};