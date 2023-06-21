import { Router } from "express";
import { sampleLingerie, sampleTags } from "../data";
import asyncHandler from "express-async-handler";
import { LIngerieModel } from "../models/lingerie.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const lingerieCount = await LIngerieModel.countDocuments();
    if (lingerieCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await LIngerieModel.create(sampleLingerie);
    res.send("Seed is done!");
  })
);

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
