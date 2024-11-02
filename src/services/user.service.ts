import { User } from "../models/user";
import { AppDataSource } from "../config/data-source";

export class UserService {
    private static repo = AppDataSource.getRepository(User)

    //Get all users
    public static async GetAll(): Promise<User[]> {
        return UserService.repo.find();
    }
}