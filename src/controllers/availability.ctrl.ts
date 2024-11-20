import { Request, Response } from 'express';
import { AvailabilityService } from '../services/availability.service';
import moment from 'moment-timezone';

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

    public static async getAvailableSlots(req: Request, res: Response): Promise<void> {
        try {
            const { specialty, date } = req.query;
    
            // Valida los parámetros
            if (!specialty || !date) {
                res.status(400).json({ message: "Specialty and date are required" });
                return;
            }
    
            // Llama al servicio para obtener los horarios disponibles
            const availableSlots = await AvailabilityService.getAvailableSlots(String(specialty), String(date));
    
            // Envía la respuesta
            res.status(200).json(availableSlots);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    


}