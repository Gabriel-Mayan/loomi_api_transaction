import { FindOptionsWhere, IsNull, UpdateResult } from "typeorm";

import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";

import { IDatabaseUser } from "../interfaces/user.interface";

import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
    findUser(query: FindOptionsWhere<User>): Promise<IDatabaseUser | null> {
        return repository.findOneBy({ deletedAt: undefined, ...query });
    },
};
