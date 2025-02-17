import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Mongo
import { mongoConnect } from "./database/mongo.js";

// Routes
import routes from "./routes/index.js";

dotenv.config();

mongoConnect();

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", routes);
server.use((req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

server.listen(process.env.PORT);
