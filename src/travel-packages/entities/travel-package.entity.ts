import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Image } from '../../images/entities/image.entity';
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

    @OneToMany(() => Image, image => image.package)
    images: Image[];
}
