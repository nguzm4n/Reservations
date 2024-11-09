import { Router } from "express";
import DoctorController from "../controllers/doctor.ctrl";

const DoctorRouter = Router();


DoctorRouter.route("/")
  .get(DoctorController.getAll)
  .post(DoctorController.createDoctor)
  

  DoctorRouter.route("/:id")
  .get(DoctorController.getById)
  .patch(DoctorController.updateDoctor)
  .delete(DoctorController.deleteDoctor);

export default DoctorRouter;