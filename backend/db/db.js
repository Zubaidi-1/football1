import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "mysql", // 👈 REQUIRED
  logging: false, // optional, disables SQL logs
});

export default sequelize;
