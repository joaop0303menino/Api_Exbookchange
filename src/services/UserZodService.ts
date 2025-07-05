import { z } from "zod";
import { UserSchema } from "../models/entities-zod/UserZod";
import { User } from "../models/entities/User";

export class UserZodService {
    private static readonly userZodSchema = UserSchema;

    static async validateUser(userData: Partial<Omit<User, "date_birth">>): Promise<z.SafeParseReturnType<Partial<User>, User>> {
        return await UserZodService.userZodSchema.safeParseAsync(userData)
        .then((result) => {return result})
        .catch((error) => {return error});
    };
};