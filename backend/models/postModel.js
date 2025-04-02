import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const postModel = sequelize.define("posts", {
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, defaultValue: "x" },
  place: { type: DataTypes.STRING, defaultValue: "Kaunas" },
  date: { type: DataTypes.STRING, defaultValue: null },
  picture: { type: DataTypes.TEXT("long"), defaultValue: null },
  status: { type: DataTypes.STRING, defaultValue: "Submited" },
});

export default postModel;