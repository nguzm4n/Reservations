import { Router } from "express";
import UserController from "../controllers/user.ctrl";


 
const UserRouter = Router();

UserRouter.route("/")
  .get(UserController.getAll)
  // .get(UserController.getById)
  .post(UserController.createUser)
  // .patch(UserController.editById)
  // .delete(UserController.deleteById)



export default UserRouter;
