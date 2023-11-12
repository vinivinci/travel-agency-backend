import { TravelPackage } from 'src/travel-packages/entities/travel-package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Images')
export class Image {
    @PrimaryGeneratedColumn('increment')
    imageID: number;

    @Column('bytea')
    image: Buffer;

    @Column('text', { nullable: true })
    description: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => TravelPackage, travelPackage => travelPackage.images)
    package: TravelPackage;
}
