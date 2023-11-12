import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
