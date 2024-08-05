import { Router } from "express";
import { getTransactionDetails, getUserTransactions, startTransaction } from "../controller/transaction.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { getTransactionDetailsSchema, startTransactionSchema } from "../validations/trasaction.validation";

const routes = Router();

routes.get("/user", getUserTransactions);
routes.get("/:transactionId", validateRequest(getTransactionDetailsSchema, "params"), getTransactionDetails);

routes.post("/", validateRequest(startTransactionSchema, "body"), startTransaction);

export { routes };
