import { Router } from "express";
import ReservationController from "../controllers/reservation.ctrl";

const ReservationRouter = Router()

ReservationRouter.route("/")
//   .get(ReservationController.getByUser)
//   .get(ReservationController.getByDoctor)
  .post(ReservationController.createReservation)


// ReservationRouter.route("/:id")
// .patch(ReservationController.editById)
// .delete(ReservationController.deleteById)


export default ReservationRouter