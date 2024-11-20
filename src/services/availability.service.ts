import { Availability } from "../models/availability";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../models/doctor";
import { Between } from "typeorm";
import moment from 'moment-timezone';


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



    public static async getAvailableSlots(specialty: string, date: string): Promise<any[]> {
    // Asegurarse de que la fecha se interprete en la zona horaria de Chile
    const chileDate = moment.tz(date, "America/Santiago");

    // Crear el rango de búsqueda para todo el día en la zona horaria de Chile
    const startDate = chileDate.clone().startOf('day');  // Empieza a las 00:00:00 del día
    const endDate = chileDate.clone().endOf('day');      // Termina a las 23:59:59 del día

    console.log("startDate: ", startDate.toISOString()); // Imprimir para depuración
    console.log("endDate: ", endDate.toISOString()); // Imprimir para depuración

    // Consulta para obtener las disponibilidades dentro del rango de fechas
    const slots = await this.repo.find({
        where: {
            doctor: { specialty },  // Filtra por especialidad del doctor
            isAvailable: true,      // Solo horarios disponibles
            startTime: Between(startDate.toDate(), endDate.toDate()),  // Rango de fechas
        },
        relations: ["doctor"],
        order: { startTime: "ASC" },  // Ordenar por hora
    });

    // Transformar los datos para enviar al frontend
    return slots.map((slot) => ({
        doctorId: slot.doctor.id,
        doctorName: slot.doctor.name,
        startTime: moment(slot.startTime).tz('America/Santiago').format(),  // Asegúrate de que la fecha esté en la zona horaria de Chile
    }));
    }

}