import { Router } from "express";
import { sampleLingerie, sampleTags } from "../data";

const router = Router();

router.get("/", (req, res) => {
  res.send(sampleLingerie);
});

router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const lingeries = sampleLingerie.filter((Lingerie) =>
    Lingerie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(lingeries);
});

router.get("/tags", (req, res) => {
  res.send(sampleTags);
});

router.get("/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const lingeries = sampleLingerie.filter((lingerie) =>
    lingerie.tags?.includes(tagName)
  );
  res.send(lingeries);
});

router.get("/:lingerieId", (req, res) => {
  const lingerieId = req.params.lingerieId;
  const lingeries = sampleLingerie.find(
    (lingerie) => lingerie.id == lingerieId
  );
  res.send(lingeries);
});

export default router;
