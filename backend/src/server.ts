import express from "express";
import cors from "cors";
import { sampleLingerie, sampleTags } from "./data";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/lingeries", (req, res) => {
  res.send(sampleLingerie);
});

app.get("/api/lingeries/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const lingeries = sampleLingerie.filter((Lingerie) =>
    Lingerie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(lingeries);
});

app.get("/api/lingeries/tags", (req, res) => {
  res.send(sampleTags);
});

app.get("/api/lingeries/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const lingeries = sampleLingerie.filter((lingerie) =>
    lingerie.tags?.includes(tagName)
  );
  res.send(lingeries);
});

app.get("/api/lingeries/:lingerieId", (req, res) => {
  const lingerieId = req.params.lingerieId;
  const lingeries = sampleLingerie.find(
    (lingerie) => lingerie.id == lingerieId
  );
  res.send(lingeries);
});
const port = 5000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
