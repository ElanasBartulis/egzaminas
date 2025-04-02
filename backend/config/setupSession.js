import session from "express-session";
import MySQLStore from "express-mysql-session";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const MySQLStoreInstance = MySQLStore(session);

const dbCongif = {
  host: process.env["DB_HOST"],
  user: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
};

const pool = mysql.createPool(dbCongif);

const sessionStore = new MySQLStoreInstance({}, pool);

export function configDbSession(app) {
  app.use(
    session({
      secret: "mySecretKey",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        httpOnly: true, 
        secure: false,
        sameSite: "lax", 
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
}

sessionStore
  .onReady()
  .then(() => {
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    console.log(error);
  });