import { TravelPackage } from 'src/travel-packages/entities/travel-package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Images')
export class Image {
    @PrimaryGeneratedColumn('increment')
    imageID: number;

    @Column('text')
    image: String;

    @Column('text', { nullable: true })
    description: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => TravelPackage, travelPackage => travelPackage.images)
    @JoinColumn({ name: 'packageID' })
    package: TravelPackage;
}
