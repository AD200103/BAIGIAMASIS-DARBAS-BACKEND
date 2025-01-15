const validateNameEmail = (findUserEmail, findUserName, res) => {
  if (findUserEmail) {
    return res.status(403).json({ message: "Email exists!" });
  }
  if (findUserName) {
    return res.status(403).json({ message: "Username exists!" });
  }
};
export default validateNameEmail;
