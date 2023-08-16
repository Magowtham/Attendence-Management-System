const { verify } = require("crypto");
const jwt = require("jsonwebtoken");
const util = require("util");
const veirfyJwt = util.promisify(jwt.verify);
const tokenVerifier = async (token, screteKey) => {
  try {
    const decoded = await veirfyJwt(token, screteKey);
    return decoded;
  } catch (err) {
    throw err;
  }
};
const authToken = async (req, res, next) => {
  const token = req.cookies.token;
  tokenVerifier(token, process.env.SECRETE_KEY)
    .then((decoded) => {
      res.status(202).json({ status: true });
      next();
    })
    .catch((err) => {
      console.log(false);
      res.status(401).json({ status: false });
    });
};

module.exports = authToken;
