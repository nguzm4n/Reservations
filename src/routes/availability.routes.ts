import { Router } from "express";
import AvailabilityController from "../controllers/availability.ctrl";


const AvailabilityRouter = Router()

    AvailabilityRouter.route('/')
    //.get(AvailabilityController.getByDateAndSpecialty)
    .post(AvailabilityController.createSlotTime)

    AvailabilityRouter.route('/:id')
    .delete(AvailabilityController.deleteSlotTime)

    AvailabilityRouter.route('/getSlots')
    .get(AvailabilityController.getAvailableSlots)

export default AvailabilityRouter