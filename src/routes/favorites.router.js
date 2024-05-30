const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const User = require("../models/User.model");
const { handleNotFound } = require("../utils");

//router.use(protectionMiddleware); // 👇 all routes bellow are now protected

//KEEP ONLY ajouter des favoris / ID & supprimer des favoris /ID.

// Ajouter un équipement à la liste des favoris par userId
router.post("/:equipmentId", protectionMiddleware, async (req, res, next) => {
  try {
    console.log("checked!!!");
    const userId = req.user.id;
    const equipmentId = req.params.equipmentId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: equipmentId } },
      { new: true }
    ).populate("favorites");
    /*if (!user) {
        return handleNotFound(res, "User not found");
      }*/
    //res.json(updatedUser.favorites);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
// supprimer un équipement de la liste des favoris:
router.delete("/:equipmentId", protectionMiddleware, async (req, res, next) => {
  const userId = req.user.id;
  const equipmentId = req.params.equipmentId;

  if (!mongoose.isValidObjectId(equipmentId)) {
    handleNotFound(res);
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: equipmentId } },
      { new: true }
    ).populate("favorites");
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// Afficher la liste des favoris
router.get("/", protectionMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const fetchedUser = await User.findById(userId).populate("favorites");
    if (!fetchedUser) {
      return handleNotFound(res, "User not found");
    }

    //res.json(fetchedUser.favorites);

    res.json(fetchedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
