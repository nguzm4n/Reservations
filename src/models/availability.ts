import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { Doctor } from "./doctor";

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, (doctor) => doctor.availabilities, { onDelete: 'CASCADE' })
    doctor: Doctor;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ default: true })
    isAvailable: boolean;

    @BeforeInsert()
    validateStartTime() {
        const startHour = this.startTime.getHours();
        const startMinutes = this.startTime.getMinutes();

        // Validación: debe estar entre 8:00 AM y 8:00 PM
        if (startHour < 8 || startHour >= 20) {
            throw new Error("Start time must be between 8:00 AM and 8:00 PM");
        }

        // Validación: debe estar alineado a las horas o medias horas exactas
        if (startMinutes !== 0 && startMinutes !== 30) {
            throw new Error("Start time must align to the hour or half-hour (e.g., 8:00, 8:30)");
        }
    }

    // Método para calcular el tiempo de finalización
    get endTime(): Date {
        const endTime = new Date(this.startTime);
        endTime.setMinutes(endTime.getMinutes() + 30); // Agrega 30 minutos
        return endTime;
    }
}
