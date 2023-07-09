import { Router } from "express";
import { sampleUsers } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");

  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
});

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sampleUsers);
    res.send("Seed is done!");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password is not valid!");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, address, phoneNumber } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User already exists. Please login!");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      phoneNumber: phoneNumber,
      isAdmin: false,
    };
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const { id, name, email, address, phoneNumber } = req.body;
    console.log(id);
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
        },
        { new: true }
      ); // Return the updated user object);

      if (!user) {
        res.status(HTTP_BAD_REQUEST).send("User not found");
        return;
      }

      res.send(generateTokenResponse(user));
    } catch (error) {
      res.status(HTTP_BAD_REQUEST).send("Failed to update user");
    }
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
    phoneNumber: user.phoneNumber,
  };
};

export default router;
