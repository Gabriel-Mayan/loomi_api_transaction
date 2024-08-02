import { FindOptionsWhere, IsNull } from "typeorm";

import { User } from "../entities/user.entity";
import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
    getUserById({ id }: { id: string }) {
        return repository.findOne({ 
            where: { id, deletedAt: IsNull() },
            select: ['id', 'name', 'email', 'account']
        });
    },

    findUser(query: FindOptionsWhere<User>) {
        return repository.findOneBy({ deletedAt: undefined, ...query });
    },
};
