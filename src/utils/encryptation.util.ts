import { compare } from "bcryptjs";

export const comparePassword = async ({ password, comparePassword }: { password: string, comparePassword: string }) => {
    return await compare(password, comparePassword);
} 