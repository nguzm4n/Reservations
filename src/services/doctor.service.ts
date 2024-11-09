import { Doctor } from "../models/doctor";
import { AppDataSource } from "../config/data-source";

export class DoctorService {
    private static repo = AppDataSource.getRepository(Doctor)

    //Get all Doctors
    public static async GetAll(): Promise<Doctor[]> {
        return DoctorService.repo.find();
    }

    //Get Doctor By Id
    public static async GetById(doctorId: number): Promise<Doctor | null> {
        return DoctorService.repo.findOneBy({ id: doctorId });

    }

    //Create Doctor
    public static async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const doctor = DoctorService.repo.create(doctorData)

        return await DoctorService.repo.save(doctor)

    }
    
    //Update Doctor Info
    public static async updateDoctor(doctorId: number, doctorData: Partial<Doctor>): Promise<Doctor | null> {
        const doctor = await DoctorService.GetById(doctorId)
        if (!doctor) {
            return null
        }
        await DoctorService.repo.update(doctorId, doctorData);
        return DoctorService.GetById(doctorId)
    }

    //Delete Doctor
    public static async deleteById(doctorId: number): Promise<boolean> {
        const result = await DoctorService.repo.delete(doctorId);
        return result.affected !== 0; // Retorna true si se eliminó algún registro, false en caso contrario
    
    }

    
}