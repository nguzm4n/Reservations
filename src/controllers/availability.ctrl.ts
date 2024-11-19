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
    
    
    public static async deleteSlotTime(req: Request, res: Response) {
        const { id } = req.params;

        
        try {
            const deleted = await AvailabilityService.deleteSlotTime(Number(id));
            
            if (!deleted) {
                res.status(404).json({ message: "Slot Time not found" });
                return;
            }
            
            res.status(200).json({ message: "Slot Time deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message || "Error deleting doctor" });
        }


    }
}