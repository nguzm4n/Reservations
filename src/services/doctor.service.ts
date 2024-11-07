import { Doctor } from "../models/doctor";
import { AppDataSource } from "../config/data-source";

export class DoctorService {
    private static repo = AppDataSource.getRepository(Doctor)

    //Get all users
    public static async GetAll(): Promise<Doctor[]> {
        return DoctorService.repo.find();
    }


    public static async GetById(doctorId: number): Promise<Doctor | null> {
        return DoctorService.repo.findOneBy({ id: doctorId });

    }

    public static async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const doctor = DoctorService.repo.create(doctorData)

        return await DoctorService.repo.save(doctor)

    }
}