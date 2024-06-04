const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  equip_nom: {
    type: String,
    //required: true,
  },
  equip_numero: {
    type: String,
    //required: true,
  },

  inst_nom: {
    type: String,
    // enum: ["Stade de foot", "gymnase", "salle de danse", "piscine", "other"],
    default: "other",
  },
  inst_cp: {
    type: String,
    // required: true,
    default: "other",
  },
  equip_type_name: {
    type: String,
    //  enum: ["disponible", "en construction", "en maintenance"],
    default: "other",
  },
  //ajoutes d'autres...
  inst_etat: {
    type: String, //Pas sur du data type
    //  enum: ["disponible", "en construction", "en maintenance"],
    default: "other",
  },
  inst_trans_type: {
    type: String,
    default: "other",
  },
  /* equip_numero: {
    type: String,
    default: "other",
  },
  equip_nom: {
    type: String,
    default: "other",
  },*/
  equip_type_code: {
    type: String,
    default: "other",
  },
  /*
  equip_type_name: {
    type: String,
    default: "other",
  },*/
  equip_type_famille: {
    type: String,
    default: "other",
  },
  equip_etat: {
    type: String,
    default: "other",
  },
  equip_x: {
    type: Number,
    default: null,
  },
  equip_y: {
    type: Number,
    default: null,
  },
  equip_douche: {
    type: String,
    default: "other",
  },
  equip_pmr_acc: {
    type: String,
    default: "other",
  },
  equip_eclair: {
    type: String,
    default: "other",
  },
  equip_sanit: {
    type: String,
    default: "other",
  },
  inst_date_creation: {
    type: Date,
    default: null, // pas besoin à supprimer
  },
  equip_nature: {
    type: String,
    default: "other",
  },
  inst_adresse: {
    type: String,
    default: "other",
  },
  inst_acc_handi_bool: {
    type: String,
    default: "other",
  },
  equip_url: {
    type: String,
    default: "other",
  },
  equip_service_date: {
    type: String,
    default: "other",
  },
  new_name: {
    type: String,
    default: "other",
  },
  inst_obs: {
    type: String,
    default: "other",
  },
});

const Equipment = mongoose.model("Equipment", equipmentSchema, "equipments");

module.exports = Equipment;
