import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import express from "express";
import cors from "cors";
import lingerieRouter from "./routers/lingerie.router";
import usersRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import { dbConnect } from "./configs/database.config";
import axios from "axios";
import path from "path";

dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200" || "https://thefreakylink.onrender.com"],
  })
);

app.use("/api/lingeries", lingerieRouter);

app.use("/api/users", usersRouter);

app.use("/api/orders", orderRouter);

/*app.get(
  "/api/convert",
  asyncHandler(async (req, res) => {
    const { amount, from, to, access_key } = req.query as {
      amount: string;
      from: string;
      to: string;
      access_key: string;
    };
    const apiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}&base=${from}&symbols=${to}`;

    try {
      const response = await axios.get(apiUrl);
      const conversionRate = response.data.rates[to];
      const convertedAmount = parseFloat(amount) * conversionRate;
      console.log(convertedAmount);
      res.json({ result: convertedAmount });
    } catch (error) {
      console.error("Error while proxying request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
); would use it if i paid for base currency kes access*/

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
