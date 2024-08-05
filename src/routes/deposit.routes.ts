import { Router } from "express";
import { startTransaction } from "../controller/transaction.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { depositSchema } from "../validations/deposit.validation";

const routes = Router();

routes.post("/", validateRequest(depositSchema, "body"), startTransaction);

export { routes };
