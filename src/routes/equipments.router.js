const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Equipment = require("../models/Equipment.model");
const { handleNotFound } = require("../utils");

//router.use(protectionMiddleware); // 👇 all routes bellow are now protected

//////////////////////////

//Afficher la liste des équipements (GET /equipment) :
//
router.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const limit = 20;
  const offset = limit * (page - 1);

  try {
    const allEquipments = await Equipment.find().limit(limit).skip(offset);

    //ajouter la pagination
    res.status(200).json(allEquipments);
  } catch (err) {
    next(err);
  }
});

//Voir les détails d'un équipement spécifique
router.get("/:equipmentId", async (req, res, next) => {
  const equipmentId = req.params.equipmentId;
  try {
    console.log("check!");
    const equipment = await Equipment.findOne({ _id: equipmentId });
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json(equipment);
  } catch (err) {
    next(err);
  }
});

//Ajouter un équipement (POST /equipment) :
router.post("/equipment", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//Supprimer un équipement (DELETE /equipment/:equipmentId) :
router.delete("/equipment/:equipmentId", async (req, res, next) => {
  const equipmentId = req.params.id;
  try {
    // Ton code pour supprimer l'équipement avec l'identifiant spécifié
  } catch (err) {
    next(err);
  }
});

//Mettre à jour un équipement spécifique (PUT /equipment/:equipmentId) :
router.put("/equipment/:equipmentId", async (req, res, next) => {
  const equipmentId = req.params.id;
  try {
  } catch (err) {
    next(err);
  }
});

///////////////////////////

module.exports = router;

/*
router.post("/", async (req, res, next) => {
  try {
    const { name, location } = req.body;

    const createdEquipment = await Journal.create({
      name,
      type,
      location,
      status,
    });

    res.json(createdEquipment);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // `user` was stored in `req` in the `protectionMiddleware`
    if (req.user.isAdmin) {
      const allJournals = await Journal.find();
      res.json(allJournals);
    } else {
      const userJournals = await Journal.find({ author: req.user.id });
      res.json(userJournals);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:journalId", async (req, res, next) => {
  const { journalId } = req.params;

  if (!mongoose.isValidObjectId(journalId)) {
    handleNotFound(res);
    return;
  }

  try {
    // `user` was stored in `req` in the `protectionMiddleware`
    if (req.user.isAdmin) {
      await Journal.findByIdAndDelete(journalId);
    } else {
      await Journal.findOneAndDelete({ _id: journalId, author: req.user.id });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});*/