const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { TOKEN_SECRET } = require("../consts");
const protectionMiddleware = require("../middlewares/protection.middleware");
const User = require("../models/User.model");

////////////////////////////////////////////////////
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });
    delete createdUser._doc.password; //il faut changer
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isCorrectCredentials =
      user != null && (await bcrypt.compare(password, user.password));

    if (!isCorrectCredentials) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const authToken = jwt.sign({ email }, TOKEN_SECRET, {
      algorithm: "HS256",
      issuer: "WebDev804",
      expiresIn: "7d",
    });

    res.json({ authToken });
  } catch (err) {
    next(err);
  }
});
//ajouter check   if (req.user.isAdmin) { //only admin can see all users....!!!!!!!!!
router.get("/", async (req, res, next) => {
  //if (!req.user.isAdmin) {
  // return res.status(403).json({ message: "Access denied. You are not an administrator." });
  //}
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
router.use(protectionMiddleware); // 👇 all routes bellow are now protected

router.get("/me", (req, res, next) => {
  // `user` was stored in `req` in the `protectionMiddleware`
  res.json(req.user);
});

//delete accnt !!! c'est le plus important, modifier ...etc ce n'est pas important...

router.delete("/:userId", async (req, res, next) => {
  // CHECK IF isAdmin !!!!
  //si isAdmin you can delte sinon you can delete only id corresponds to user.id!!!!!!!!!!
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    //console.log(req.params.userId);
    //console.log(_id);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    res.status(200).json({ message: "User deleted..." });
  } catch (err) {
    next(err);
  }
});

////////////////////////////////////

//afficher le profil de l'utilisateur:
router.get("/profile", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

////////////////////////////////////

module.exports = router;

/*
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });

    // `createdUser` is readonly, the actual data is stored in `createdUser._doc`
    // directly mutating `._doc` is not particularly good practice, so use with caution
    delete createdUser._doc.password; // 👈 remove password from response

    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    
   // unlike encryption, hashing is a one-way process, meaning we can't decrypt. so to check if the password is correct, we need to hash the password we received from the client and compare it to the hashed password stored in the database
  
  //  that's what `bcrypt.compare` does
    
    const isCorrectCredentials =
      user != null && (await bcrypt.compare(password, user.password));

    if (!isCorrectCredentials) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const authToken = jwt.sign({ email }, TOKEN_SECRET, {
      algorithm: "HS256",
      issuer: "WebDev804",
      expiresIn: "7d",
    });

    res.json({ authToken });
  } catch (err) {
    next(err);
  }
});

router.use(protectionMiddleware); // 👇 all routes bellow are now protected

router.get("/me", (req, res, next) => {
  // `user` was stored in `req` in the `protectionMiddleware`
  res.json(req.user);
});
*/
