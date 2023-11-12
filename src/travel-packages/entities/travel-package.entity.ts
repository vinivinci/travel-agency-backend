import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('TravelPackages')
export class TravelPackage {
    @PrimaryGeneratedColumn('increment')
    packageID: number;

    @Column({ length: 255 })
    packageName: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ length: 255 })
    destination: string;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;
}
