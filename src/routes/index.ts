import "express-async-errors";
import { Router } from "express";

import { routes as transactionRoutes } from "./transaction.routes";

import { authentication } from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/api/transactions", authentication, transactionRoutes);

export { routes };
