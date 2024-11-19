import { Request, Response } from 'express';
import { AvailabilityService } from '../services/availability.service';


export default class AvailabilityController {
    constructor() {}


    public static async createSlotTime(req: Request, res: Response) {
        const { doctorId, startTime } = req.body;
    
        try {
            const slotTime = await AvailabilityService.createSlotTime(doctorId, new Date(startTime));
            res.status(201).json({ message: "Slot created successfully", slotTime });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
    
}