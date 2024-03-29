import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./config/mongo";
import router from "./routes";
import mongoose from "mongoose";

mongoose.set('strictQuery', false);

// init
const app = express();
db().then(() => "Conexion ready");
// settings
const PORT = process.env.PORT || 8080;
app.set("port", PORT);

// middlewares
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PATH_STORAGE = `${process.cwd()}/public`;
app.use(express.static(PATH_STORAGE));

// routes
app.use(router);

export default app;
