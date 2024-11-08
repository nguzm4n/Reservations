import { Router } from "express";
import UserController from "../controllers/user.ctrl";
// import DoctorController from "../controllers/doctor.ctrl";


 
const UserRouter = Router();

UserRouter.route("/")
  .get(UserController.getAll)
  // .get(UserController.getById)
  // .post(UserController.createUser)
  // .patch(UserController.editById)
  // .delete(UserController.deleteById)

// ReservationRouter.route("/")
//   .get(ReservationController.getByUser)
//   .get(ReservationController.getByDoctor)
//   .post(ReservationController.createReservation)
// .patch(ReservationController.editById)
// .delete(ReservationController.deleteById)



export default UserRouter;
