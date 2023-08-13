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
  const token = req.headers.authorization.includes("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization;
  tokenVerifier(token, process.env.SECRETE_KEY)
    .then((decoded) => {
      console.log(decoded);
      res.status(202).send("token verified");
    })
    .catch((err) => {
      res.status(401).send("invalid token " + err);
    });
  //   next();
};

module.exports = authToken;
