import express from "express";
import mainRouter from "./routes/mainRouter.js";
import { configDbSession } from "./config/setupSession.js";
import "./config/init-sequelize.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

configDbSession(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.listen(3002, () => {
  console.log("Connected to server.");
});