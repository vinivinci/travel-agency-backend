import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn('increment')
    userID: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column('text')
    contactInfo: string;
}
