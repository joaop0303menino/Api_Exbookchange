import { DeleteResult } from "typeorm";
import { ConflictError, NotFoundError } from "../helpers/APIErrors";
import { SQLiteAppDataSource } from "../models/data-source-sqlite";
import { UserPreference } from "../models/entities/UserPreference";
import { UserService } from "./UserService";

export class UserPreferenceService {
    private userPreferenceRepository: ReturnType<typeof SQLiteAppDataSource.getRepository<UserPreference>>;
    private userService: UserService;

    constructor() {
        this.userPreferenceRepository = SQLiteAppDataSource.getRepository(UserPreference);
        this.userService = new UserService();
    };

    async createUserPreference(userPreference: UserPreference): Promise<UserPreference> {
        const userExists = await this.userService.getUserById(userPreference.user.id);
        
        if (!userExists) {
            throw new NotFoundError("User not found");
        };

        // Validate if author exists
        
        const getUserPreference = await this.getUserPreferenceById(userPreference.id);

        if (getUserPreference) {
            throw new ConflictError("UserPreference already exists");
        };

        userPreference.user = userExists;

        const newUserPreference = await this.userPreferenceRepository.create(userPreference);
        await this.userPreferenceRepository.save(newUserPreference);

        return newUserPreference;
    };

    async getUserPreferenceById(id: number): Promise<UserPreference | null> {
        return await this.userPreferenceRepository.findOneBy({ id });
    };

    async getAllUserPreference(): Promise<UserPreference[]> {
        return await this.userPreferenceRepository.find();
    };

    async updateUserPreference(userPreferenceData: Partial<UserPreference>, userPreference: UserPreference): Promise<UserPreference | null> {
        const updatedUserPreference = this.userPreferenceRepository.merge(userPreference, userPreferenceData);
        await this.userPreferenceRepository.save(updatedUserPreference);
        
        return userPreference;
    };

    async deleteUserPreference(id: number): Promise<DeleteResult> {
        return await this.userPreferenceRepository.delete(id);
    };
};