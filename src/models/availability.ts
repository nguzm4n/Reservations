import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Doctor } from "./doctor";

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, (doctor) => doctor.availabilities, { onDelete: 'CASCADE' })
    doctor: Doctor;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @Column({ default: true })
    isAvailable: boolean;
}
