import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TravelPackage } from '../../travel-packages/entities/travel-package.entity';

@Entity('Bookings')
export class Booking {
    @PrimaryGeneratedColumn('increment')
    bookingID: number;

    @Column()
    userID: number;

    @Column()
    packageID: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    bookingDate: Date;

    @Column()
    numberOfTravelers: number;

    @Column({ length: 50 })
    status: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user: User;

    @ManyToOne(() => TravelPackage)
    @JoinColumn({ name: 'packageID' })
    travelPackage: TravelPackage;
}
