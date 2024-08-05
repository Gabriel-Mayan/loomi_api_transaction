import { z } from "zod";

import { depositSchema } from "src/validations/deposit.validation";

export type IDepositRequest = z.infer<typeof depositSchema>;
