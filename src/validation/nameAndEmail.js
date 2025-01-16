const validateNameEmail = (findUserEmail, findUserName, res) => {
  if (findUserEmail && findUserName) {
    return res
      .status(403)
      .json({ message: "Email and username already exists!" });
  }
  if (findUserEmail) {
    return res.status(403).json({ message: "Email already exists!" });
  }
  if (findUserName) {
    return res.status(403).json({ message: "Username already exists!" });
  }
};
export default validateNameEmail;
