import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Doctor } from "./doctor";
import { User } from "./user";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    appointmentDate: Date;

    @Column({ default: false })
    isConfirmed: boolean;

    @ManyToOne(() => Doctor, (doctor) => doctor.reservations, { onDelete: 'CASCADE' })
    doctor: Doctor;

    @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
    user: User;
}
