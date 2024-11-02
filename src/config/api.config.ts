import { Router, Request, Response } from "express";
import UserRouter from "../routes/user.routes";

/**
 * Creates all routes for our API.
 * @returns Router
 */
export default function api(): Router {
  const api = Router();

  // Definir ruta para usuarios
  api.use('/user', UserRouter);

  // Ruta raíz para dar la bienvenida
  api.use('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API' });
  });

  return api;
}
