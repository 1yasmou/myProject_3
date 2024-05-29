const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Favorite = require("../models/Favorite.model");
const { handleNotFound } = require("../utils");

//router.use(protectionMiddleware); // 👇 all routes bellow are now protected

// Afficher la liste des équipements favoris (GET /favorites)
router.get("/favorites", protectionMiddleware, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Ajouter un équipement aux favoris (POST /favorites/add)
router.post("/favorites/add", protectionMiddleware, async (req, res, next) => {
  const { equipmentId } = req.body;
  try {
  } catch (err) {
    next(err);
  }
});

// Supprimer un équipement des favoris (DELETE /favorites/remove/:equipmentId)
router.delete(
  "/favorites/remove/:equipmentId",
  protectionMiddleware,
  async (req, res, next) => {
    const { equipmentId } = req.params;
    try {
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
