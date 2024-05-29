const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Comment = require("../models/Comment.model");
const { handleNotFound } = require("../utils");

// Ajouter un commentaire (POST /comments/add)
router.post("/comments/add", protectionMiddleware, async (req, res, next) => {
  const { equipmentId, comment } = req.body;
  try {
  } catch (err) {
    next(err);
  }
});

// Supprimer un commentaire (DELETE /comments/remove/:commentId)
router.delete(
  "/comments/remove/:commentId",
  protectionMiddleware,
  async (req, res, next) => {
    const { commentId } = req.params;
    try {
    } catch (err) {
      next(err);
    }
  }
);

// Mettre à jour un commentaire (PUT /comments/update/:commentId)
router.put(
  "/comments/update/:commentId",
  protectionMiddleware,
  async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
