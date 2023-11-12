import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TravelPackage } from '../../travel-packages/entities/travel-package.entity';
import { Image } from '../../images/entities/image.entity';

@Entity('PackageImages')
export class PackageImage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    packageID: number;

    @Column()
    imageID: number;

    @ManyToOne(() => TravelPackage)
    @JoinColumn({ name: 'packageID' })
    travelPackage: TravelPackage;

    @ManyToOne(() => Image)
    @JoinColumn({ name: 'imageID' })
    image: Image;
}
