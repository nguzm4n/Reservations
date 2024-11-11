import { Router, Request, Response } from "express";
import UserRouter from "../routes/user.routes";
import DoctorRouter from "../routes/doctor.routes";
import ReservationRouter from "../routes/reservation.routes";
import AvailabilityRouter from "../routes/availability.routes";
/**
 * Creates all routes for our API.
 * @returns Router
 */
export default function api(): Router {
  const api = Router();

  // Definir ruta para usuarios
  api.use('/user', UserRouter);
  api.use('/doctor', DoctorRouter)
  api.use('/reservation', ReservationRouter)
  api.use('/book', AvailabilityRouter)
  
  // Ruta raíz para dar la bienvenida
  api.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API' });
  });

  return api;
}
