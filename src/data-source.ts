import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { TravelPackage } from './travel-packages/entities/travel-package.entity';
import { Booking } from './bookings/entities/booking.entity';
import { Image } from './images/entities/image.entity';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User, TravelPackage, Booking, Image],
    synchronize: true,
});


