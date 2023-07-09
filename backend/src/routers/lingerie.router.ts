import { Router } from "express";
import { sampleLingerie, sampleTags } from "../data";
import asyncHandler from "express-async-handler";
import { LingerieModel } from "../models/lingerie.model";

const router = Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const lingerieCount = await LingerieModel.countDocuments();
    if (lingerieCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await LingerieModel.create(sampleLingerie);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const lingeries = await LingerieModel.find();
    res.send(lingeries);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");

    const lingeries = await LingerieModel.find({
      name: { $regex: searchRegex },
    });

    res.send(lingeries);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await LingerieModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await LingerieModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(sampleTags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const lingeries = await LingerieModel.find({ tags: req.params.tagName });
    res.send(lingeries);
  })
);

router.get(
  "/:lingerieId",
  asyncHandler(async (req, res) => {
    const lingeries = await LingerieModel.findById(req.params.lingerieId);
    res.send(lingeries);
  })
);

export default router;
