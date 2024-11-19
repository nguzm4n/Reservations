import { Router } from "express";
import AvailabilityController from "../controllers/availability.ctrl";
import { Availability } from "../models/availability";

const AvailabilityRouter = Router()

    AvailabilityRouter.route('/')
    .post(AvailabilityController.createSlotTime)

    AvailabilityRouter.route('/:id')
    .delete(AvailabilityController.deleteSlotTime)


export default AvailabilityRouter