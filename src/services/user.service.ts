import { User } from "../models/user";
import { AppDataSource } from "../config/data-source";

export class UserService {
    private static repo = AppDataSource.getRepository(User)

    //Get all users
    public static async GetAll(): Promise<User[]> {
        return UserService.repo.find();
    }

    public static async createUser(name: string, email: string, phone: string): Promise<User | null> {

        const newUser = this.repo.create({
            name: name,
            email: email,
            phone: phone
        })
        return await this.repo.save(newUser);
    }
}