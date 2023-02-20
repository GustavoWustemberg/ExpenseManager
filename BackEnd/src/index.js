import express from "express";
import routes from "./routes.js";
import cors from "cors"

const api = express();

api.use(cors());
api.use(express.json());

api.use('/', routes);

api.listen('3333', () => {
  console.log('Server is runing ...');
});