import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Bad auth!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Bad auth!" });
    }
    req.body.userName = decoded.name;
    req.body.userId = decoded.id;
    req.body.userEmail = decoded.email;

    next();
  });
};
export default auth;
