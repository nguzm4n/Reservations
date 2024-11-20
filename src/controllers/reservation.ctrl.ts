import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service';
import { Availability } from '../models/availability';

export default class ReservationController{
    constructor() {}


    public static async createReservation(req: Request, res: Response) {
        
        try {
            const { userId, doctorId, availabilityId, appointmentDate } = req.body
            const reservation = await ReservationService.createReservation(userId, doctorId, availabilityId)
            res.status(200).json(reservation);
            
        } catch (e: any) {
            const msg = e.message || e;
            res.status(400).json(msg);
        }
    }


    public static async deleteReservation(req: Request, res: Response): Promise<void> {

        const { code } = req.body; // El código se envía en el cuerpo de la solicitud

        try {
            // Validar entrada
            if (!code) {
                res.status(400).json({ message: "Missing required parameters:  code" });
                return;
            }

            // Llamar al servicio para eliminar la reserva
            const isDeleted = await ReservationService.deleteReservation(
                String(code)
            );

            if (!isDeleted) {
                res.status(404).json({ message: "Reservation not found or invalid code" });
                return;
            }
            
            res.status(200).json({ message: "Reservation deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message || "An error occurred while deleting the reservation" });
        }
    }
    
}