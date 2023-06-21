import express from "express";
import cors from "cors";
import { sampleLingerie, sampleTags, sampleUsers } from "./data";
import jwt from "jsonwebtoken";
import lingerieRouter from "./routers/lingerie.router";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/lingeries", lingerieRouter);

app.post("/api/users/login", (req, res) => {
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

const port = 5000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
