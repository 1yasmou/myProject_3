require("dotenv").config();

//const MONGO_URI = process.env.MONGO_URI; //|| "mongodb://127.0.0.1:27017/db-equipements-sportifs";
const MONGO_URI =
  "mongodb+srv://1yasmou:Mou&&a3434@mongo-juice.1mgx4zs.mongodb.net/equipments-db?retryWrites=true&w=majority&appName=mongo-juice";
const PORT = process.env.PORT || 3000;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5174";

module.exports = { MONGO_URI, PORT, TOKEN_SECRET, CORS_ORIGIN };
