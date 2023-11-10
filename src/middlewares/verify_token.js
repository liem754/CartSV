const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(402).json({ mes: "Yêu cầu Token !" });
  const accesstoken = token.split(" ")[1];
  jwt.verify(accesstoken, process.env.JWT, (err, user) => {
    if (err) return res.status(402).json({ mes: "Token không hợp lệ !" });
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
