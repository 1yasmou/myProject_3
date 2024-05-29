const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already used"],

    //ajouter une validation avec regex pour valider l'adresse email.
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Equipment" }],
});

const User = model("User", userSchema);

module.exports = User;
