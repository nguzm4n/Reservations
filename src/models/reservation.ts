import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, IntegerType, BeforeInsert } from "typeorm";
import { Doctor } from "./doctor";
import { User } from "./user";
import { Availability } from "./availability";
import { v4 as uuidv4 } from 'uuid'; // UUID library


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    appointmentDate: Date;

    @Column({ type: "text"})
    reservationCode: string;

    @Column({ default: false })
    isConfirmed: boolean;

    @ManyToOne(() => Doctor, (doctor) => doctor.reservations, { onDelete: 'CASCADE' })
    doctor: Doctor;

    @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Availability, { onDelete: 'CASCADE' })
    availability: Availability;

    @BeforeInsert()
    generateReservationCode() {
        this.reservationCode = uuidv4(); 
    }

}
