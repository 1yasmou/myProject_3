const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Equipment = require("../models/Equipment.model");
const { handleNotFound } = require("../utils");

//router.use(protectionMiddleware); // all routes bellow are now protected

//////////////////////////

//KEEP ONLY afficher des equipements et afficher un equipement par ID.

router.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const cp = req.query.postalCode;
  console.log(`postal code: ****${cp}`);
  const limit = 20;
  const offset = limit * (page - 1);

  try {
    const allEquipments = await Equipment.find(cp ? { inst_cp: cp } : undefined)
      .limit(limit)
      .skip(offset);
    const totalCount = await Equipment.countDocuments(
      cp ? { inst_cp: cp } : undefined
    );

    const pageCount = Math.ceil(totalCount / limit);

    res.status(200).json({
      equipments: allEquipments,
      totalPages: pageCount,
      currentPage: page,
      postalCode: cp,
    });
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

//AS VERSION 2 , ajouter une page pour admin seulement pour tout le CRUD des équipements!!!!!!!!!

//Ajouter un équipement (POST /equipment) :
router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//Supprimer un équipement (DELETE /equipment/:equipmentId) :
router.delete("/:equipmentId", async (req, res, next) => {
  const equipmentId = req.params.id;
  try {
    // Ton code pour supprimer l'équipement avec l'identifiant spécifié
  } catch (err) {
    next(err);
  }
});

//Mettre à jour un équipement spécifique (PUT /equipment/:equipmentId) :
router.put("/:equipmentId", async (req, res, next) => {
  const equipmentId = req.params.id;
  try {
  } catch (err) {
    next(err);
  }
});

///////////////////////////

module.exports = router;
