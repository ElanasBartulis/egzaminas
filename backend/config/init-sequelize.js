import sequelize from "./sequelize.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

userModel.hasMany(postModel, { foreignKey: "userId" });
postModel.belongsTo(userModel, { foreignKey: "userId" });

// await sequelize.sync({ alter: true });

await sequelize.sync();