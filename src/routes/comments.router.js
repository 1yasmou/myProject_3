const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Comment = require("../models/Comment.model");
const { handleNotFound } = require("../utils");

//ajouter un commentaire:

router.post(
  "/equipments/:equipmentId/comments",
  protectionMiddleware,
  async (req, res, next) => {
    try {
      console.log("checked!!!");
      const { comment, rating } = req.body;
      const equipmentId = req.params.equipmentId;

      const createdComment = await Comment.create({
        author: req.user.id,
        equipment: equipmentId,
        comment,
        rating,
      });

      res.json(createdComment);
    } catch (err) {
      next(err);
    }
  }
);

//supprimer un commentaire pour un equipement donné

router.delete(
  "/comments/:commentId",
  protectionMiddleware,
  async (req, res, next) => {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
      handleNotFound(res);
      return;
    }

    try {
      //si 1 commentaire par Equipment ID / user pas besoin de spécifier le comment ID.
      //await Comment.deleteMany({ equipment: equipmentId });
      //findOneAndDelete, differente de FindbyIDandDelete, la 2eme qd il y a un ID seul à supprimer, la premiere
      //c'est quand tu dois supprimer un id d'un specific equipment (2criteres)

      // CHECK IF isAdmin!! sinon supprimer que son commentaire s'il est author.
      //

      const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        author: req.user.id,
      });
      if (!deletedComment) {
        handleNotFound(res, "comment not found");
        return;
      }
      res.status(204).send("Comment deleted ...");
      console.log("comment is deleted?");
    } catch (err) {
      next(err);
    }
  }
);

//pour modifier un commentaire d'un EquipmentID:

router.put(
  "/comments/:commentId",
  protectionMiddleware,
  async (req, res, next) => {
    const { commentId } = req.params;
    const { comment, rating } = req.body;

    if (!mongoose.isValidObjectId(commentId)) {
      handleNotFound(res);
      return;
    }

    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, author: req.user.id },

        { comment, rating },
        { new: true }
      );
      if (!updatedComment) {
        handleNotFound(res, "comment not found");
        return;
      }
      res.status(204).send("Comment updated ...");
    } catch (err) {
      next(err);
    }
  }
);

//Récupérer tous les commentaires d'un equipement!

router.get(
  "/equipments/:equipmentId/comments",
  protectionMiddleware,
  async (req, res, next) => {
    const { equipmentId } = req.params;
    try {
      const comments = await Comment.find({ equipment: equipmentId }).populate({
        path: "author",
        select: "email _id",
      });
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }
);

//////////////////////////////////////////////////////////

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

//pour afficher tous les commentaires d'un utilisateur:

router.get(
  "/comments/:userId",
  protectionMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userComments = await Comment.find({ author: userId }).populate(
        "author"
      );
      res.json(userComments);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
/*
router.get("/comments", protectionMiddleware, async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});
*/
module.exports = router;
