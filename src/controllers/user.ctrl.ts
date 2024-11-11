import { Request, Response } from 'express';
import { UserService } from '../services/user.service';


export default class UserController {
    constructor() { }


    public static async getAll(req: Request, res: Response) {
        try {
            const users = await UserService.GetAll();
            res.status(200).json(users);
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }

    public static async createUser(req: Request, res: Response) {

        try {
            const { name, email, phone } = req.body
            const newUser = await UserService.createUser(name, email, phone)
            res.status(201).json(newUser)
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }
}