import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service';
import { Availability } from '../models/availability';

export default class ReservationController{
    constructor() {}


    public static async createReservation(req: Request, res: Response) {
        
        try {
            const { userId, doctorId, availabilityId, appointmentDate } = req.body
            const reservation = await ReservationService.createReservation(userId, doctorId, availabilityId, new Date(appointmentDate))
            res.status(200).json(reservation);
            
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }
    
}