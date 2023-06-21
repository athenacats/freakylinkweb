import { Router } from "express";
import { sampleUsers } from "../data";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = sampleUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("Username or password is not valid!");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "xyz",
    { expiresIn: "30d" }
  );
  user.token = token;
  return user;
};

export default router;
