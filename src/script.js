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
        `https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=dep_code%3D${dept}&select=inst_cp%2Cinst_nom%2Cinst_adresse%2Cinst_etat%2Cinst_trans_type%2Cequip_numero%2Cequip_nom%2Cequip_type_code%2Cequip_type_name%2Cequip_type_famille%2Cequip_etat%2Cequip_x%2Cequip_y%2Cequip_douche%2Cequip_pmr_acc%2Cequip_eclair%2Cequip_sanit%2Cinst_date_creation%2Cequip_nature%2Cinst_acc_handi_bool%2Cequip_url%2Cequip_service_date%2Cnew_name%2Cinst_obs&limit=${limit}&offset=${offset}`
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
