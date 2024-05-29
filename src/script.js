const axios = require("axios");
const Equipment = require("./models/Equipment.model");
const mongoose = require("mongoose");
const connectDB = require("./db");

async function main() {
  connectDB();
  try {
    for (let i = 1; i <= 95; i++) {
      await populateDb(i);
      console.log(`****************dept: ${i} ******************`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

async function populateDb(dept) {
  try {
    let offset = 0;
    const limit = 100;
    let allFetched = false;

    while (!allFetched) {
      const response = await axios.get(
        `https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=dep_code%3D${dept}&select=inst_cp%2C%20inst_nom%2C%20inst_adresse%2C%20inst_cp%2C%20inst_etat%2C%20inst_trans_type%2C%20equip_numero%2C%20equip_nom%2C%20equip_type_code%2C%20equip_type_name%2C%20equip_type_famille%2C%20equip_etat%2C%20equip_x%2C%20equip_y%2C%20equip_douche%2C%20equip_pmr_acc%2C%20equip_eclair%2C%20equip_sanit%2C%20inst_date_creation%2C%20equip_nature&limit=${limit}&offset=${offset}`
      );

      const data = response.data.results;
      if (data.length < limit) {
        console.log(data.length);
        allFetched = true;
      }

      await Equipment.insertMany(data);
      offset = offset + limit;
      console.log(`offset: ${offset}, limit: ${limit}`);
    }
  } catch (error) {
    console.error(error);
    allFetched = true;
    throw error;
  }
}

main();
