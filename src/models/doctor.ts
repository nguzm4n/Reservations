import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./reservation";
import { Availability } from "./availability";

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialty: string;

    @Column()
    email: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @OneToMany(() => Reservation, (reservation) => reservation.doctor)
    reservations: Reservation[];

    @OneToMany(() => Availability, (reservationBlock) => reservationBlock.doctor)
    availabilities: Availability[]
    

}

