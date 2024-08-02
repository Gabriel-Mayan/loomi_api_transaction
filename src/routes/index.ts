import "express-async-errors";
import { Router } from "express";

import { routes as authRoutes } from "./auth.routes";

const routes = Router();

routes.use("/api/auth", authRoutes);

export { routes };
