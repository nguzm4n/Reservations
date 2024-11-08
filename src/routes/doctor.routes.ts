import { Router } from "express";
import DoctorController from "../controllers/doctor.ctrl";

const DoctorRouter = Router();


DoctorRouter.route("/")
  .get(DoctorController.getAll)
  .get(DoctorController.getById)
  .post(DoctorController.createDoctor)
  
  // .delete(DoctorController.deleteById)

  DoctorRouter.route("/:id")
  .patch(DoctorController.updateDoctor)


export default DoctorRouter;