import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/user";
import UserController from "../controllers/user.ctrl";


const router = Router();

const UserRouter = Router();

UserRouter.route("/")
  .get(UserController.getAll)


export default UserRouter;
