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
      //const deletedComment = await Comment.findByIdAndDelete(commentId);
      //si 1 commentaire par Equipment ID / user pas besoin de spécifier le comment ID.
      //await Comment.deleteMany({ equipment: equipmentId });
      //findOneAndDelete, differente de FindbyIDandDelete, la 2eme qd il y a un ID seul à supprimer, la premiere
      //c'est quand tu dois supprimer un id d'un specific equipment (2criteres)

      // CHECK IF isAdmin!! sinon supprimer que son commentaire s'il est author.
      //

      const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        author: req.user.id, //c'est l'identifiant unique de mon document
        //checks if author = req.user.id; //si pas admin!!!!!!
      });
      if (!deletedComment) {
        handleNotFound(res, "comment not found");
        return;
      }
      res.status(204).send("Comment deleted ..."); //pourquoi je ne recois pas ce msg?
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
        { _id: commentId, author: req.user.id }, //il faut que les 2 soit ok pour modifier commentaire; l'administrateur
        //ne peut pas modifier le commentaire.!!!
        { comment, rating },
        { new: true }
      );
      if (!updatedComment) {
        handleNotFound(res, "comment not found");
        return;
      }
      res.status(204).send("Comment updated ..."); //pourquoi je ne recois pas ce msg?
    } catch (err) {
      next(err);
    }
  }
);

//pour afficher tous les commentaires (juste pour test!!!à supprimer apres lors du déploiement!!!)

router.get("/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

//Récupérer tous les commentaires d'un equipement!!!!!!!
//router.get("/equipments/:equipmentId/comments".. c'est pour récupérer tous les commentaires d'un equipment.
// tu peux le faire par (regarde  screen shot) mais on peut avoir des pggees et des pages dde commentaire d ou la pagination

router.get("/equipments/:equipmentId/comments", async (req, res, next) => {
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
});

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

module.exports = router;
