import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env["DB_NAME"],
  process.env["DB_USERNAME"],
  process.env["DB_PASSWORD"],
  {
    host: process.env["DB_HOST"],
    dialect: "mysql",
  }
);

try {
  await sequelize.authenticate();
  console.log("Sequelize connection successfull");
} catch (error) {
  console.log("Unable to connect to sequelize: ", error);
}

export default sequelize;