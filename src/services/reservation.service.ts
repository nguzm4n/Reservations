import { Reservation } from "../models/reservation";
import { AppDataSource } from "../config/data-source";


export class ReservationService {
    private static repo = AppDataSource.getRepository(Reservation)

    //Get all users
    public static async GetAll(): Promise<Reservation[]> {
        return ReservationService.repo.find();
    }
}