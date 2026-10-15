import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

export default generateToken;
