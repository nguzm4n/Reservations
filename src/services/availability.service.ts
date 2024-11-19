import { Availability } from "../models/availability";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../models/doctor";

export class AvailabilityService {
    private static repo = AppDataSource.getRepository(Availability)


    //Create Slot Time
    public static async createSlotTime(doctorId: number, startTime: Date) {
        const doctorRepo = AppDataSource.getRepository(Doctor)


        const doctor = await doctorRepo.findOneBy({ id: doctorId });

        if (!doctor) {
            throw new Error("Doctor not Found")
        }

        const existingSlot = await this.repo.findOne({
            where: { doctor: { id: doctorId }, startTime },
        });
        if (existingSlot) {
            throw new Error("Slot already exists for this time");
        }


        const slotTime = this.repo.create({
            doctor,
            startTime,
            isAvailable: true
        })

        return await AvailabilityService.repo.save(slotTime);
    }


    public static async deleteSlotTime(availabilityId: number) {


        const result = await AvailabilityService.repo.delete(availabilityId);
        return result.affected ? true : false;
    }

}