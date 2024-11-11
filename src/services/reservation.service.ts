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
    public static async createReservation(userId: number, doctorId: number, availabilityId: number, appointmentDate: Date): Promise<Reservation | null> {
        const doctorRepo = AppDataSource.getRepository(Doctor)
        const userRepo = AppDataSource.getRepository(User)
        const availabilityRepo = AppDataSource.getRepository(Availability)

        const user = await userRepo.findOneBy({ id: userId });
        const doctor = await doctorRepo.findOneBy({ id: doctorId });
        const availability = await availabilityRepo.findOneBy({ id: availabilityId })
        

        if(!user || !doctor || !availability) {
            throw new Error("User or Doctor not Found")
        }

        //create

        const reservation = this.repo.create({
            doctor,
            user,
            availability,
            appointmentDate,
            isConfirmed: false,

        });

        
        return await ReservationService.repo.save(reservation);
    }
    
}