import "express-async-errors";
import { Router } from "express";

import { routes as depositRoutes } from "./deposit.routes";
import { routes as transactionRoutes } from "./transaction.routes";

import { authentication } from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/api/deposit", depositRoutes);
routes.use("/api/transactions", authentication, transactionRoutes);

export { routes };
