import { Router } from "express";
import ReservationController from "../controllers/reservation.ctrl";

const ReservationRouter = Router()

ReservationRouter.route("/")
//   .get(ReservationController.getByUser)
//   .get(ReservationController.getByDoctor)
  .post(ReservationController.createReservation)
  .delete(ReservationController.deleteReservation)

ReservationRouter.route("/:reservationId/")
// .patch(ReservationController.editById)



export default ReservationRouter