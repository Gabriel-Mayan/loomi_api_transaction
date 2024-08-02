import { Router } from "express";
import { getTransactionDetails, getUserTransactions, startTransaction } from "../controller/transaction.controller";
import { validateRequest } from "src/middlewares/validation.middleware";
import { getTransactionDetailsSchema, startTransactionSchema } from "src/validations/trasaction.validation";

const routes = Router();

routes.get("/user", getUserTransactions);
routes.get("/:transactionId", validateRequest(getTransactionDetailsSchema, "params"), getTransactionDetails);

routes.post("/", validateRequest(startTransactionSchema, "body"), startTransaction);

export { routes };
