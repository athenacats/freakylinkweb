import express from "express";
import cors from "cors";
import { sampleLingerie } from "./data";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200/"],
  })
);

app.get("/api/lingeries", (req, res) => {
  res.send(sampleLingerie);
});

const port = 5000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
