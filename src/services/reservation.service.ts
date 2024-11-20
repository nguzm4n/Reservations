import { Reservation } from "../models/reservation";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../models/doctor";
import { User } from "../models/user";
import { Availability } from "../models/availability";

export class ReservationService {
    private static repo = AppDataSource.getRepository(Reservation)

    //Get all Reservations
    public static async GetAll(): Promise<Reservation[]> {
        return ReservationService.repo.find();
    }

    //Make a reservation
    public static async createReservation(userId: number, doctorId: number, availabilityId: number): Promise<Reservation | null> {
        const doctorRepo = AppDataSource.getRepository(Doctor)
        const userRepo = AppDataSource.getRepository(User)
        const availabilityRepo = AppDataSource.getRepository(Availability)

        const user = await userRepo.findOneBy({ id: userId });
        const doctor = await doctorRepo.findOneBy({ id: doctorId });
        const availability = await availabilityRepo.findOneBy({ id: availabilityId })
        

        if(!user || !doctor || !availability) {
            throw new Error("User or Doctor not Found")
        }


        if (!availability.isAvailable) {
            throw new Error("The selected slot is no longer available");
        }

        
        availability.isAvailable = false;
        await availabilityRepo.save(availability);

        //create

        const reservation = this.repo.create({
            doctor,
            user,
            availability,
            isConfirmed: false,

        });

        
        return await ReservationService.repo.save(reservation);
    }


    public static async deleteReservation(code: string): Promise<boolean> {
        const reservationRepo = AppDataSource.getRepository(Reservation);
    
        // Buscar la reserva únicamente con el código y cargar la disponibilidad relacionada
        const reservation = await reservationRepo.findOne({
            where: { reservationCode: code },
            relations: ["availability"],
        });
    
        if (!reservation) {
            throw new Error("Reservation not found or invalid code");
        }
    
        // Actualizar la disponibilidad a true
        if (reservation.availability) {
            reservation.availability.isAvailable = true;
            await AppDataSource.getRepository(Availability).save(reservation.availability);
        }
    
        // Eliminar la reserva
        const result = await reservationRepo.delete(reservation.id);
    
        // Retornar el resultado basado en si se afectaron registros
        return result.affected ? true : false;
    }


    
}