import { DeleteResult } from "typeorm";
import { SQLiteAppDataSource } from "../models/data-source-sqlite";
import { User } from "../models/entities/User";
import { ConflictError } from "../helpers/APIErrors";

export class UserService {
    private readonly userRepository = SQLiteAppDataSource.getRepository(User);

    async createUser(userData: User): Promise<User> {
        const userExists = await this.getUserByEmail(userData.email);
        
        if (userExists) {
            throw new ConflictError("User already exists");
        };

        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);

        return newUser;
    };

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        
        return users;
    };
    
    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id });

        return user || null;
    };
    
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });

        return user || null;
    };

    async updateUser(userData: Partial<User>, user: User): Promise<User | null> {
        const updateUser = await this.userRepository.merge(user, userData);
        await this.userRepository.save(updateUser);

        return updateUser;
    };

    async deleteUser(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    };
};