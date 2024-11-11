import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service';

export default class ReservationController{
    constructor() {}


    public static async createReservation(req: Request, res: Response) {
        

        try {
            const { userId, doctorId, appointmentDate } = req.body
            const reservation = await ReservationService.createReservation(userId, doctorId, new Date(appointmentDate))
            res.status(200).json(reservation);
            
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }
    
}