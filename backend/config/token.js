import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

export default generateToken;
